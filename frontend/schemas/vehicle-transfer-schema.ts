import { z } from "zod";

export const SaleSchema = z.object({
  declaredValue: z.number().min(0, "Valor declarado inválido"),
  declaredDate: z.string().min(1, "Data declarada obrigatória"),
});

export const VehicleDetailsSchema = z.object({
  makeModelVersion: z.string().min(1, "Modelo obrigatório"),
  primaryColor: z.string().min(1, "Cor obrigatória"),
  manufactureYear: z.number(),
  modelYear: z.number(),
  odometer: z.number().min(0, "Hodômetro inválido"),
});

export const VehicleSchema = z.object({
  plate: z.string().min(1, "Placa obrigatória"),
  renavam: z.string().min(1, "RENAVAM obrigatório"),
  chassi: z.string().min(1, "Chassi obrigatório"),
  documentNumber: z.string().min(1, "Número do documento obrigatório"),
  sale: SaleSchema,
  details: VehicleDetailsSchema,
});

export const IdentityDocumentSchema = z.object({
  number: z.string().min(1, "Número do documento obrigatório"),
  issuingAuthority: z.string().min(1, "Órgão emissor obrigatório"),
  issuingState: z.string().min(1, "Estado emissor obrigatório"),
});

export const AddressSchema = z.object({
  street: z.string().min(1, "Rua obrigatória"),
  number: z.string().min(1, "Número obrigatório"),
  district: z.string().min(1, "Bairro obrigatório"),
  city: z.string().min(1, "Cidade obrigatória"),
  state: z.string().min(1, "Estado obrigatório"),
  zipCode: z.string().min(1, "CEP obrigatório"),
});

export const BuyerSchema = z.object({
  name: z.string().min(1, "Nome obrigatório"),
  cpf: z.string().min(11, "CPF inválido"),
  email: z.email("Email inválido"),
  identityDocument: IdentityDocumentSchema,
  address: AddressSchema,
});

export const SellerSchema = z.object({
  name: z.string().min(1, "Nome obrigatório"),
  cpf: z.string().min(11, "CPF inválido"),
  email: z.email("Email inválido"),
  address: AddressSchema.partial(),
});

export const VehicleTransferSchema = z.object({
  vehicle: VehicleSchema,
  buyer: BuyerSchema,
  seller: SellerSchema,
});

export const autoCompleteTransferSchema = z.object({
  files: z.array(z.instanceof(File)).min(1, "Selecione ao menos 1 arquivo").optional(),
});