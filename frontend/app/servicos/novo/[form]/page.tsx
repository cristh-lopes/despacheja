"use client";

import TransferForm from "@/components/ui/form/transfer";
import { useParams } from "next/navigation";

export default function Page() {
  const { form } = useParams();
  switch (form) {
    case "transferencia":
      return <TransferForm />;
    default:
      return (
        <div className="w-full h-[calc(100dvh-7rem)] flex items-center justify-center text-center">
          <span>404 - to do</span>
        </div>
      );
  }
}
