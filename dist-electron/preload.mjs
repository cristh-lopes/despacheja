"use strict";
const electron = require("electron");
electron.contextBridge.exposeInMainWorld("api", {
  onNewTransfer(callback) {
    electron.ipcRenderer.on("menu:new-transfer", () => callback());
  },
  startAutomation(data) {
    electron.ipcRenderer.send("automation:start", data);
  },
  getStatus() {
    return electron.ipcRenderer.invoke("automation:status");
  }
});
