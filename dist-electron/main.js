import { app, BrowserWindow, ipcMain, Menu } from "electron";
import path from "node:path";
import { fileURLToPath } from "node:url";
const __filename$1 = fileURLToPath(import.meta.url);
const __dirname$1 = path.dirname(__filename$1);
let mainWindow = null;
function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 720,
    webPreferences: {
      preload: path.join(__dirname$1, "preload.mjs")
    }
  });
  if (process.env.VITE_DEV_SERVER_URL) {
    mainWindow.loadURL(process.env.VITE_DEV_SERVER_URL);
    mainWindow.webContents.openDevTools();
  } else {
    mainWindow.loadFile(path.join(__dirname$1, "../dist/index.html"));
  }
  buildMenu();
}
function buildMenu() {
  const menu = Menu.buildFromTemplate([
    {
      label: "Novo",
      submenu: [
        {
          label: "Transferência de Veículo",
          click: () => {
            mainWindow?.webContents.send("menu:new-transfer");
          }
        }
      ]
    }
  ]);
  Menu.setApplicationMenu(menu);
}
app.whenReady().then(createWindow);
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});
ipcMain.on("automation:start", (_event, data) => {
  console.log("🚗 Transferência recebida:");
  console.log("Comprador:", data.buyer.name);
  console.log("CPF:", data.buyer.cpf);
  console.log("Placa:", data.vehicle.plate);
  console.log("Valor:", data.vehicle.sale.declaredValue);
});
ipcMain.handle("automation:status", async () => {
  return {
    status: "idle",
    message: "Aguardando ação do usuário"
  };
});
