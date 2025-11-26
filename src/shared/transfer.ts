export interface Sale {
  declaredValue: number
  declaredDate: string
}

export interface VehicleDetails {
  makeModelVersion: string
  primaryColor: string
  manufactureYear: number
  modelYear: number
  odometer: number
}

export interface Vehicle {
  plate: string
  renavam: string
  chassi: string
  crvNumber: string
  sale: Sale
  details: VehicleDetails
}

export interface IdentityDocument {
  number: string
  issuingAuthority: string
  issuingState: string
}

export interface Address {
  street: string
  number: string
  district: string
  city: string
  state: string
  zipCode: string
}

export interface Buyer {
  name: string
  cpf: string
  email: string
  identityDocument: IdentityDocument
  address: Address
}

export interface Seller {
  name: string
  cpf: string
  email: string
  address: Partial<Address>
}

export interface VehicleTransfer {
  vehicle: Vehicle
  buyer: Buyer
  seller: Seller
}
