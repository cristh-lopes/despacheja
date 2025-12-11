export function maskCPF(value: string) {
  return value
    .replace(/\D/g, "")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d{1,2})$/, "$1-$2")
    .substring(0, 14);
}

export function maskPlate(v: string) {
  return v.replace(/[^A-Za-z0-9]/g, "").toUpperCase().substring(0, 7);
}

export function maskRENAVAM(v: string) {
  return v.replace(/\D/g, "").substring(0, 11);
}

export function maskCEP(v: string) {
  return v
    .replace(/\D/g, "")
    .replace(/(\d{5})(\d)/, "$1-$2")
    .substring(0, 9);
}

export function maskDate(v: string) {
  return v
    .replace(/\D/g, "")
    .replace(/(\d{2})(\d)/, "$1/$2")
    .replace(/(\d{2})(\d)/, "$1/$2")
    .substring(0, 10);
}

export function maskNumberOnly(v: string) {
  return v.replace(/\D/g, "");
}
