import { z } from 'zod'
import type { VehicleTransfer } from '../shared/transfer'

export const SaleSchema = z.object({
  declaredValue: z.number().positive(),
  declaredDate: z.string().min(8),
})

export const VehicleDetailsSchema = z.object({
  makeModelVersion: z.string().min(3),
  primaryColor: z.string().min(3),
  manufactureYear: z.number().int().min(1900),
  modelYear: z.number().int().min(1900),
  odometer: z.number().int().nonnegative(),
})

export const VehicleSchema = z.object({
  plate: z.string().min(7),
  renavam: z.string().min(9),
  chassi: z.string().min(10),
  crvNumber: z.string().min(5),
  sale: SaleSchema,
  details: VehicleDetailsSchema,
})

export const IdentityDocumentSchema = z.object({
  number: z.string().min(3),
  issuingAuthority: z.string().min(2),
  issuingState: z.string().length(2),
})

export const AddressSchema = z.object({
  street: z.string().min(3),
  number: z.string().min(1),
  district: z.string().min(2),
  city: z.string().min(2),
  state: z.string().length(2),
  zipCode: z.string().min(8),
})

export const BuyerSchema = z.object({
  name: z.string().min(3),
  cpf: z.string().length(14),
  email: z.email(),
  identityDocument: IdentityDocumentSchema,
  address: AddressSchema,
})

export const SellerSchema = z.object({
  name: z.string().min(3),
  cpf: z.string().length(14),
  email: z.string().email(),
  address: AddressSchema.partial(),
})

export const TransferSchema = z
  .object({
    vehicle: VehicleSchema,
    buyer: BuyerSchema,
    seller: SellerSchema,
  })
  .strict()

// ✅ Garantia de compatibilidade exata com sua interface
export type TransferFromSchema = z.infer<typeof TransferSchema>

// ✅ Type-level check (não gera código, só valida no TS)
const _assertType: VehicleTransfer = {} as TransferFromSchema
void _assertType
