import { contextBridge, ipcRenderer } from "electron";
import { VehicleTransfer } from "../src/shared/transfer";

contextBridge.exposeInMainWorld("api", {
  onNewTransfer(callback: () => void): void {
    ipcRenderer.on("menu:new-transfer", () => callback());
  },

  startAutomation(data: VehicleTransfer): void {
    ipcRenderer.send("automation:start", data);
  },

  getStatus(): Promise<{ status: string; message: string }> {
    return ipcRenderer.invoke("automation:status");
  },
});
