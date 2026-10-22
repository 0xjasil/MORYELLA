const { chromium } = require('@playwright/test');
const fs = require('fs');

async function scrapeBanners(page) {
  await page.goto('https://www.nykaa.com/', { waitUntil: 'domcontentloaded', timeout: 60000 });
  await page.waitForTimeout(8000);
  for (let i = 0; i < 12; i++) { await page.mouse.wheel(0, 1500); await page.waitForTimeout(1000); }
  await page.waitForTimeout(4000);
  const banners = await page.evaluate(() => {
    const out = [];
    document.querySelectorAll('.banner-container, [class*="banner-container"]').forEach(bc => {
      const a = bc.querySelector('a');
      const img = bc.querySelector('img');
      const callouts = Array.from(bc.querySelectorAll('[class*="callout-text"]')).map(e => e.innerText.trim()).filter(Boolean);
      if (img && img.src) {
        out.push({
          title: (a && a.getAttribute('aria-label')) ? a.getAttribute('aria-label').trim() : (img.alt || ''),
          image: img.src,
          link: a ? a.href : null,
          callout: callouts.join(' | '),
          alt: img.alt || ''
        });
      }
    });
    const seen = new Set();
    return out.filter(b => { if (seen.has(b.image)) return false; seen.add(b.image); return true; });
  });
  return banners.map((b, i) => ({ id: `banner-${i + 1}`, ...b }));
}

async function scrapeProducts(page) {
  await page.goto('https://www.nykaa.com/makeup/c/12', { waitUntil: 'domcontentloaded', timeout: 60000 });
  await page.waitForTimeout(8000);
  for (let i = 0; i < 8; i++) { await page.mouse.wheel(0, 1500); await page.waitForTimeout(1000); }
  await page.waitForTimeout(4000);
  const products = await page.evaluate(() => {
    const cards = [];
    document.querySelectorAll('[class*="product"], [class*="Product"], [class*="card"]').forEach(c => {
      const img = c.querySelector('img');
      const text = (c.innerText || '').trim();
      if (!img || !img.src || !/₹/.test(text) || text.length < 20 || text.length > 400) return;
      const nameEl = c.querySelector('[class*="name"], [class*="title"], h3, h2');
      const name = (nameEl ? nameEl.innerText.trim() : img.alt || '').replace(/\s+/g, ' ').trim();
      const priceMatch = text.match(/₹\s*([\d,]+)/);
      const origMatch = text.match(/Regular price\s*₹\s*([\d,]+)/i);
      const discMatch = text.match(/(\d+)%\s*Off/i);
      if (!name) return;
      cards.push({
        name: name.slice(0, 140),
        price: priceMatch ? parseInt(priceMatch[1].replace(/,/g, ''), 10) : null,
        originalPrice: origMatch ? parseInt(origMatch[1].replace(/,/g, ''), 10) : (priceMatch ? parseInt(priceMatch[1].replace(/,/g, ''), 10) : null),
        discount: discMatch ? parseInt(discMatch[1], 10) : null,
        image: img.src,
        brand: name.split(' ')[0]
      });
    });
    const seen = new Set();
    return cards.filter(c => { if (seen.has(c.image)) return false; seen.add(c.image); return true; });
  });
  return products.map((p, i) => ({ id: `prod-${i + 1}`, category: 'makeup', rating: 4.5, reviewCount: 0, ...p }));
}

(async () => {
  const browser = await chromium.launch({ channel: 'chrome', headless: true, args: ['--no-sandbox', '--disable-setuid-sandbox'] });
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 }, userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36' });
  const page = await context.newPage();

  console.log('Scraping banners...');
  const banners = await scrapeBanners(page);
  console.log('Banners:', banners.length);

  console.log('Scraping products...');
  const products = await scrapeProducts(page);
  console.log('Products:', products.length);

  const data = { banners, products };
  fs.writeFileSync('nykaa.json', JSON.stringify(data, null, 2));
  fs.writeFileSync('banners.json', JSON.stringify(banners, null, 2));
  fs.writeFileSync('products.json', JSON.stringify(products, null, 2));
  console.log('Written nykaa.json, banners.json, products.json');

  await browser.close();
})();