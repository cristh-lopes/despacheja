import { useState } from "react";
import { z } from "zod";
import type { TransferenciaVeiculo } from "../shared/transfer";

// ===================================
// ZOD SCHEMA — VALIDACAO COMPLETA
// ===================================

const VendaSchema = z.object({
  valorDeclarado: z.number({ message: "Valor inválido" }).positive(),
  dataDeclarada: z.string().min(8, "Data inválida"),
});

const DetalhesVeiculoSchema = z.object({
  marcaModeloVersao: z.string().min(3),
  corPredominante: z.string().min(3),
  anoFabricacao: z.number().int(),
  anoModelo: z.number().int(),
  hodometro: z.number().int().nonnegative(),
});

const VeiculoSchema = z.object({
  placa: z.string().min(7, "Placa inválida"),
  renavam: z.string().min(9, "Renavam inválido"),
  chassi: z.string().min(10, "Chassi inválido"),
  numeroCrv: z.string().min(5),
  venda: VendaSchema,
  detalhes: DetalhesVeiculoSchema,
});

const RGSchema = z.object({
  numero: z.string().min(3),
  orgaoExpedidor: z.string().min(2),
  ufExpedidor: z.string().length(2),
});

const EnderecoSchema = z.object({
  logradouro: z.string().min(3),
  numero: z.string().min(1),
  bairro: z.string().min(2),
  municipio: z.string().min(2),
  uf: z.string().length(2),
  cep: z.string().min(8),
});

const CompradorSchema = z.object({
  nome: z.string().min(3),
  cpf: z.string().length(14),
  email: z.string().email(),
  rg: RGSchema,
  endereco: EnderecoSchema,
});

const VendedorSchema = z.object({
  nome: z.string().min(3),
  cpf: z.string().length(14),
  email: z.string().email(),
  endereco: EnderecoSchema.partial(),
});

const TransferSchema = z.object({
  veiculo: VeiculoSchema,
  comprador: CompradorSchema,
  vendedor: VendedorSchema,
});

type TransferFormData = z.infer<typeof TransferSchema>;

// ===================================
// COMPONENTE
// ===================================

export default function TransferForm() {
  const [form, setForm] = useState<TransferFormData>({
    veiculo: {
      placa: "",
      renavam: "",
      chassi: "",
      numeroCrv: "",
      venda: { valorDeclarado: 0, dataDeclarada: "" },
      detalhes: {
        marcaModeloVersao: "",
        corPredominante: "",
        anoFabricacao: 0,
        anoModelo: 0,
        hodometro: 0,
      },
    },
    comprador: {
      nome: "",
      cpf: "",
      email: "",
      rg: { numero: "", orgaoExpedidor: "", ufExpedidor: "" },
      endereco: {
        logradouro: "",
        numero: "",
        bairro: "",
        municipio: "",
        uf: "",
        cep: "",
      },
    },
    vendedor: {
      nome: "",
      cpf: "",
      email: "",
      endereco: {},
    },
  });

  function handleChange(path: string, value: string | number) {
    setForm((prev) => {
      const obj = structuredClone(prev) as Record<string, unknown>;
      const keys = path.split(".");
      let temp: Record<string, unknown> = obj;

      for (let i = 0; i < keys.length - 1; i++) {
        temp = temp[keys[i]] as Record<string, unknown>;
      }

      temp[keys[keys.length - 1]] = value;
      return obj as TransferFormData;
    });
  }

  function handleSubmit() {
    const result = TransferSchema.safeParse(form);

    if (!result.success) {
      alert(result.error.issues.map((i) => i.message).join("\n"));
      return;
    }

    const transferencia: TransferenciaVeiculo = result.data;

    window.api.startAutomation(transferencia);
    alert("✅ Dados enviados com sucesso!");
  }

  // ======================================================
  // RENDER
  // ======================================================

  return (
    <div
      style={{
        background: "#161925",
        border: "1px solid #252a41",
        borderRadius: 8,
        padding: 20,
        maxWidth: 900,
        margin: "0 auto",
      }}
    >
      <h1>Transferência de Veículo</h1>

      <section>
        <h2>Veículo</h2>
        <Input
          label="Placa"
          path="veiculo.placa"
          value={form.veiculo.placa}
          onChange={handleChange}
        />
        <Input
          label="Renavam"
          path="veiculo.renavam"
          value={form.veiculo.renavam}
          onChange={handleChange}
        />
        <Input
          label="Chassi"
          path="veiculo.chassi"
          value={form.veiculo.chassi}
          onChange={handleChange}
        />
        <Input
          label="CRV"
          path="veiculo.numeroCrv"
          value={form.veiculo.numeroCrv}
          onChange={handleChange}
        />
        <Input
          label="Valor Declarado"
          type="number"
          path="veiculo.venda.valorDeclarado"
          value={form.veiculo.venda.valorDeclarado}
          onChange={handleChange}
        />
        <Input
          label="Data da Venda"
          path="veiculo.venda.dataDeclarada"
          value={form.veiculo.venda.dataDeclarada}
          onChange={handleChange}
        />
      </section>

      <section>
        <h2>Comprador</h2>
        <Input
          label="Nome"
          path="comprador.nome"
          value={form.comprador.nome}
          onChange={handleChange}
        />
        <Input
          label="CPF"
          path="comprador.cpf"
          value={form.comprador.cpf}
          onChange={handleChange}
        />
        <Input
          label="Email"
          path="comprador.email"
          value={form.comprador.email}
          onChange={handleChange}
        />
        <Input
          label="RG"
          path="comprador.rg.numero"
          value={form.comprador.rg.numero}
          onChange={handleChange}
        />
        <Input
          label="Órgão Expedidor"
          path="comprador.rg.orgaoExpedidor"
          value={form.comprador.rg.orgaoExpedidor}
          onChange={handleChange}
        />
        <Input
          label="UF RG"
          path="comprador.rg.ufExpedidor"
          value={form.comprador.rg.ufExpedidor}
          onChange={handleChange}
        />
      </section>

      <section>
        <h2>Vendedor</h2>
        <Input
          label="Nome"
          path="vendedor.nome"
          value={form.vendedor.nome}
          onChange={handleChange}
        />
        <Input
          label="CPF"
          path="vendedor.cpf"
          value={form.vendedor.cpf}
          onChange={handleChange}
        />
        <Input
          label="Email"
          path="vendedor.email"
          value={form.vendedor.email}
          onChange={handleChange}
        />
      </section>

      <button style={{ marginTop: 20 }} onClick={handleSubmit}>Iniciar Transferência</button>
    </div>
  );
}

// =========================================
// COMPONENTE INPUT TIPADO
// =========================================

interface InputProps {
  label: string;
  path: string;
  value: string | number;
  type?: "text" | "number";
  onChange(path: string, value: string | number): void;
}

function Input({ label, path, value, type = "text", onChange }: InputProps) {
  return (
    <div style={{ marginBottom: 12 }}>
      <label>{label}</label>
      <br />
      <input
        type={type}
        value={value}
        onChange={(e) =>
          onChange(
            path,
            type === "number" ? Number(e.target.value) : e.target.value
          )
        }
        style={{ padding: 6, width: "100%" }}
      />
    </div>
  );
}
