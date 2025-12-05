import { app, BrowserWindow } from "electron";
import { spawn } from "child_process";
import { fileURLToPath } from "url";
import path from "path";
import fetch from "node-fetch";

// Recria __dirname e __filename no ESModule
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function startBackend() {
  const apiProcess = spawn("npm", ["run", "start:dev"], {
    cwd: path.join(__dirname, "..", "backend"),
    shell: true,
    stdio: "inherit",
  });

  apiProcess.on("close", (code) => {
    console.log("Backend finalizado com código", code);
  });

  return apiProcess;
}

function startFrontend() {
  const frontendProcess = spawn("npm", ["run", "dev"], {
    cwd: path.join(__dirname, "..", "frontend"),
    shell: true,
    stdio: "inherit",
  });

  frontendProcess.on("close", (code) => {
    console.log("Frontend finalizado com código", code);
  });

  return frontendProcess;
}

async function waitForFrontend() {
  return new Promise((resolve) => {
    const interval = setInterval(async () => {
      try {
        const res = await fetch("http://localhost:3000");
        if (res.ok) {
          clearInterval(interval);
          resolve(true);
        }
      } catch (err) {}
    }, 500);
  });
}

async function createWindow() {
  const win = new BrowserWindow({
    width: 1400,
    height: 900,
    webPreferences: {
      nodeIntegration: false,
    },
  });

  await waitForFrontend();
  win.loadURL("http://localhost:3000");
}

app.whenReady().then(async () => {
  startBackend();
  startFrontend();
  await createWindow();
});
