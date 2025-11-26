import { VehicleTransfer } from "../shared/transfer";

export {};

declare global {
  interface Window {
    api: {
      onNewTransfer(callback: () => void): void;
      startAutomation(data: VehicleTransfer): void;
      getStatus(): Promise<{
        status: string;
        message: string;
      }>;
    };
  }
}
