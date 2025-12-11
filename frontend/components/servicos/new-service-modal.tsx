import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  IconCar,
  IconId,
  IconClipboardCheck,
  IconBan,
  IconChevronRight,
} from "@tabler/icons-react";
import { redirect } from "next/navigation";

const services = [
  {
    id: "transferencia",
    page: "transferencia",
    label: "Transferência",
    icon: IconCar,
  },
  {
    id: "primeiro-emplacamento",
    page: "primeiro-emplacamento",
    label: "1º Emplacamento",
    icon: IconId,
  },
  {
    id: "segunda-via",
    page: "segunda-via",
    label: "Segunda Via",
    icon: IconClipboardCheck,
  },
  {
    id: "cancelamento-atpve",
    page: "cancelamento-atpve",
    label: "Cancelamento ATPV-e",
    icon: IconBan,
  },
];

export function NewServiceModal({ children }: { children: React.ReactNode }) {
  const goTo = (page: string) => redirect(`/servicos/novo/${page}`);

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent className="sm:max-w-lg md:max-w-2xl p-8 rounded-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold tracking-tight">
            Novo Serviço
          </DialogTitle>
          <DialogDescription className="text-base opacity-80">
            Escolha o serviço que deseja iniciar.
          </DialogDescription>
        </DialogHeader>

        <div className="grid md:grid-cols-2 gap-5 py-6">
          {services.map((s) => (
            <button
              key={s.id}
              onClick={() => goTo(s.page)}
              className="group relative overflow-hidden rounded-xl p-6 bg-teal-100 dark:bg-teal-950 border border-border shadow-sm transition-all duration-200 hover:scale-[1.02] hover:shadow-md active:scale-[0.98]"
            >
              {/* Faixa diagonal */}
              <div className="pointer-events-none absolute inset-0 bg-radial from-primary/5 to-primary/20 dark:from-primary/70 dark:to-primary/10 -skew-y-6 opacity-80 transition-all duration-300 group-hover:from-primary-foreground" />

              {/* Borda luminosa leve */}
              <div className="pointer-events-none absolute inset-0 rounded-xl ring-0 ring-primary-foreground/0 group-hover:ring-2 group-hover:ring-primary-foreground/30 transition-all duration-200" />

              {/* Conteúdo */}
              <div className="relative z-10 flex flex-row items-center gap-3">
                <s.icon
                  size={46}
                  stroke={1.2}
                  className=" text-primary"
                />
                <span className="text-md font-semibold">{s.label}</span>
              </div>
            </button>
          ))}
        </div>

        <DialogFooter className="mt-6">
          <DialogClose asChild>
            <Button variant="secondary" className="rounded-xl px-6">
              Fechar
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
