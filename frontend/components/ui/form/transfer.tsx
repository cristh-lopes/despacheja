"use client";

import { Controller, Form, useForm, useWatch } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Field, FieldLabel, FieldError } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FileUploader } from "@/components/file-uploader";
import {
  maskCPF,
  maskCEP,
  maskPlate,
  maskRENAVAM,
  maskDate,
  maskNumberOnly,
} from "@/utils/masks";

import {
  autoCompleteTransferSchema,
  VehicleTransferSchema,
} from "@/schemas/vehicle-transfer-schema";

const STATES = [{ label: "Minas Gerais", value: "MG" }];

const CITIES = [
  { label: "Ipatinga", value: "Ipatinga" },
  { label: "Santana do Paraíso", value: "Santana do Paraíso" },
];

type VehicleTransfer = z.infer<typeof VehicleTransferSchema>;

export default function TransferForm() {
  const form = useForm<VehicleTransfer>({
    resolver: zodResolver(VehicleTransferSchema),
    defaultValues: {} as VehicleTransfer,
  });

  const autoCompleteForm = useForm({
    resolver: zodResolver(autoCompleteTransferSchema),
  });

  // ----------------------------------------------------
  // AUTOCOMPLETE → PREENCHE O FORM PRINCIPAL
  // ----------------------------------------------------
  function autoComplete() {
    const autoFilled: VehicleTransfer = {
      buyer: {
        name: "GUILHERME HENRIQUE FAUSTINO BATISTA",
        cpf: "153.831.476-24",
        email: "NAOTEM@GMAIL.COM",

        identityDocument: {
          number: "MG-21.455.842",
          issuingAuthority: "PC",
          issuingState: "MG",
        },

        address: {
          street: "Rua Piauí",
          number: "17",
          district: "Granjas Vagalume",
          city: "Ipatinga",
          state: "MG",
          zipCode: "35164-016",
        },
      },

      seller: {
        name: "JULIO DA SILVA BARROS",
        cpf: "006.412.816-41",
        email: "NAOTEM@GMAIL.COM",

        address: {
          city: "Ipatinga",
          state: "MG",
        },
      },

      vehicle: {
        plate: "KBY9C70",
        renavam: "00988799995",
        chassi: "9BHFA664082253010",
        documentNumber: "254499269741",
        details: {
          makeModelVersion: "HONDA/CIVIC LXS FLEX",
          primaryColor: "PRETA",
          manufactureYear: 2008,
          modelYear: 2008,
          odometer: 166000,
        },
        sale: {
          declaredValue: 46000,
          declaredDate: "11/11/2025",
        },
      },
    };
    form.reset(autoFilled);
    toast.success("Formulário preenchido automaticamente!");
  }

  function onSubmit(payload: { data: VehicleTransfer }) {
    toast.success("Formulário enviado!");
    console.log(payload.data);
  }

  const watchedFiles = useWatch({
    control: autoCompleteForm.control,
    name: "files",
  });

  return (
    <>
      <Form
        className="space-y-10 max-w-4xl mx-auto pt-10 w-full"
        onSubmit={autoComplete}
        {...autoCompleteForm}
      >
        <div className="border p-4 rounded-xl space-y-4">
          <div>
            <h2 className="text-xl font-medium mb-0">
              Completar automaticamente
            </h2>
            <span className="text-primary">
              Envie os arquivos para completar automaticamente.
            </span>
          </div>

          <FileUploader
            value={watchedFiles}
            onChange={(files) =>
              autoCompleteForm.setValue("files", files, {
                shouldValidate: true,
              })
            }
            maxFiles={5}
            maxSize={4 * 1024 * 1024}
          />

          <FieldError>
            {autoCompleteForm.formState.errors.files?.message as string}
          </FieldError>

          <Button type="submit" className="w-full">
            Auto completar formulário
          </Button>
        </div>
      </Form>
      <Form
        className="space-y-10 max-w-4xl mx-auto pb-10 w-full"
        onSubmit={onSubmit}
        {...form}
      >
        <div className="border p-6 rounded-xl">
          <h2 className="text-xl font-semibold mb-4">Dados do veículo</h2>

          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-4">
              <Field>
                <FieldLabel>Placa *</FieldLabel>
                <Input
                  placeholder="ABC1D23"
                  {...form.register("vehicle.plate", {
                    onChange: (e) =>
                      (e.target.value = maskPlate(e.target.value)),
                  })}
                  required
                />
                <FieldError>
                  {form.formState.errors.vehicle?.plate?.message}
                </FieldError>
              </Field>
            </div>

            <div className="col-span-4">
              <Field>
                <FieldLabel>RENAVAM</FieldLabel>
                <Input
                  placeholder="Somente números"
                  {...form.register("vehicle.renavam", {
                    onChange: (e) =>
                      (e.target.value = maskRENAVAM(e.target.value)),
                  })}
                />
                <FieldError>
                  {form.formState.errors.vehicle?.renavam?.message}
                </FieldError>
              </Field>
            </div>

            <div className="col-span-4">
              <Field>
                <FieldLabel>Chassi</FieldLabel>
                <Input
                  placeholder="Número do chassi"
                  {...form.register("vehicle.chassi")}
                />
                <FieldError>
                  {form.formState.errors.vehicle?.chassi?.message}
                </FieldError>
              </Field>
            </div>
          </div>

          <div className="grid grid-cols-12 gap-4 mt-4">
            <div className="col-span-6">
              <Field>
                <FieldLabel>Valor declarado</FieldLabel>
                <Input
                  placeholder="35000"
                  {...form.register("vehicle.sale.declaredValue", {
                    onChange: (e) =>
                      (e.target.value = maskNumberOnly(e.target.value)),
                  })}
                />
                <FieldError>
                  {form.formState.errors.vehicle?.sale?.declaredValue?.message}
                </FieldError>
              </Field>
            </div>

            <div className="col-span-6">
              <Field>
                <FieldLabel>Data da venda</FieldLabel>
                <Input
                  placeholder="dd/mm/aaaa"
                  {...form.register("vehicle.sale.declaredDate", {
                    onChange: (e) =>
                      (e.target.value = maskDate(e.target.value)),
                  })}
                />
                <FieldError>
                  {form.formState.errors.vehicle?.sale?.declaredDate?.message}
                </FieldError>
              </Field>
            </div>
          </div>
        </div>

        <div className="border p-6 rounded-xl">
          <h2 className="text-xl font-semibold mb-4">Dados do vendedor</h2>
          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-6">
              <Field>
                <FieldLabel>Nome completo</FieldLabel>
                <Input {...form.register("seller.name")} placeholder="Nome" />
                <FieldError>
                  {form.formState.errors.seller?.name?.message}
                </FieldError>
              </Field>
            </div>

            <div className="col-span-6">
              <Field>
                <FieldLabel>CPF</FieldLabel>
                <Input {...form.register("seller.cpf")} />
                <FieldError>
                  {form.formState.errors.seller?.cpf?.message}
                </FieldError>
              </Field>
            </div>
          </div>

          <div className="mt-4">
            <Field>
              <FieldLabel>Email</FieldLabel>
              <Input
                placeholder="email@exemplo.com"
                {...form.register("seller.email")}
              />
              <FieldError>
                {form.formState.errors.seller?.email?.message}
              </FieldError>
            </Field>
          </div>
        </div>

        <div className="space-y-4 border p-6 rounded-xl">
          <h2 className="text-xl font-semibold mb-4">Dados do comprador</h2>

          <div>
            <Field>
              <FieldLabel>Nome completo</FieldLabel>
              <Input {...form.register("buyer.name")} placeholder="Nome" />
              <FieldError>
                {form.formState.errors.buyer?.name?.message}
              </FieldError>
            </Field>
          </div>

          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-6">
              <Field>
                <FieldLabel>CPF</FieldLabel>
                <Input
                  placeholder="000.000.000-00"
                  {...form.register("buyer.cpf", {
                    onChange: (e) => (e.target.value = maskCPF(e.target.value)),
                  })}
                />
                <FieldError>
                  {form.formState.errors.buyer?.cpf?.message}
                </FieldError>
              </Field>
            </div>
            <div className="col-span-6">
              <Field>
                <FieldLabel>Email</FieldLabel>
                <Input
                  placeholder="email@exemplo.com"
                  {...form.register("buyer.email")}
                />
                <FieldError>
                  {form.formState.errors.buyer?.email?.message}
                </FieldError>
              </Field>
            </div>
          </div>

          <div className="grid grid-cols-12 gap-4 ">
            <div className="col-span-4">
              <Field>
                <FieldLabel>Número Registro Geral</FieldLabel>
                <Input {...form.register("buyer.identityDocument.number")} />
                <FieldError>
                  {
                    form.formState.errors.buyer?.identityDocument?.number
                      ?.message
                  }
                </FieldError>
              </Field>
            </div>
            <div className="col-span-4">
              <Field>
                <FieldLabel>Órgão Identificador</FieldLabel>
                <Input
                  {...form.register("buyer.identityDocument.issuingAuthority")}
                />
                <FieldError>
                  {
                    form.formState.errors.buyer?.identityDocument
                      ?.issuingAuthority?.message
                  }
                </FieldError>
              </Field>
            </div>
            <div className="col-span-4">
              <Field>
                <FieldLabel>Estado Identificador</FieldLabel>
                <Input
                  {...form.register("buyer.identityDocument.issuingState")}
                />
                <FieldError>
                  {
                    form.formState.errors.buyer?.identityDocument?.issuingState
                      ?.message
                  }
                </FieldError>
              </Field>
            </div>
          </div>

          <div className="mt-6">
            <h3 className="font-medium mb-2">Endereço</h3>

            <div className="grid grid-cols-12 gap-4">
              <div className="col-span-4">
                <Field>
                  <FieldLabel>CEP</FieldLabel>
                  <Input
                    placeholder="00000-000"
                    {...form.register("buyer.address.zipCode", {
                      onChange: (e) =>
                        (e.target.value = maskCEP(e.target.value)),
                    })}
                  />
                  <FieldError>
                    {form.formState.errors.buyer?.address?.zipCode?.message}
                  </FieldError>
                </Field>
              </div>

              <div className="col-span-4">
                <Field>
                  <FieldLabel>Rua</FieldLabel>
                  <Input {...form.register("buyer.address.street")} />
                  <FieldError>
                    {form.formState.errors.buyer?.address?.street?.message}
                  </FieldError>
                </Field>
              </div>
              <div className="col-span-4">
                <Field>
                  <FieldLabel>Número</FieldLabel>
                  <Input {...form.register("buyer.address.number")} />
                  <FieldError>
                    {form.formState.errors.buyer?.address?.number?.message}
                  </FieldError>
                </Field>
              </div>
            </div>

            <div className="grid grid-cols-12 gap-4 mt-4">
              <div className="col-span-4">
                <Field>
                  <FieldLabel>Bairro</FieldLabel>
                  <Input {...form.register("buyer.address.district")} />
                  <FieldError>
                    {form.formState.errors.buyer?.address?.street?.message}
                  </FieldError>
                </Field>
              </div>
              <div className="col-span-4">
                <Field>
                  <FieldLabel>Cidade</FieldLabel>
                  <Controller
                    control={form.control}
                    name="buyer.address.city"
                    render={({ field }) => (
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {CITIES.map((op) => (
                            <SelectItem key={op.value} value={op.value}>
                              {op.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  />
                  <FieldError>
                    {form.formState.errors.buyer?.address?.city?.message}
                  </FieldError>
                </Field>
              </div>

              <div className="col-span-4">
                <Field>
                  <FieldLabel>Estado</FieldLabel>
                  <Controller
                    control={form.control}
                    name="buyer.address.state"
                    render={({ field }) => (
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {STATES.map((op) => (
                            <SelectItem key={op.value} value={op.value}>
                              {op.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  />
                  <FieldError>
                    {form.formState.errors.buyer?.address?.city?.message}
                  </FieldError>
                </Field>
              </div>
            </div>
          </div>
        </div>

        <Button type="submit" className="w-full h-10 text-md">
          Enviar dados
        </Button>
      </Form>
    </>
  );
}
