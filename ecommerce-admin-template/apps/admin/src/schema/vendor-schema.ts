import { z } from "zod";

export const createVendorSchema = z.object({
  name: z.string().min(1, "Vendor name is required"),
  company: z.string().optional(),
  email: z
    .union([z.string().email("Invalid email address"), z.literal("")])
    .optional(),
  phone: z.string().optional(),
  address: z.string().optional(),
  isActive: z.boolean().optional(),
});

export const updateVendorSchema = createVendorSchema.extend({
  id: z.string().min(1, "ID is required"),
});

export type CreateVendorSchema = z.infer<typeof createVendorSchema>;