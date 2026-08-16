import { app, BrowserWindow } from "electron";
import { spawn } from "child_process";
import { fileURLToPath } from "url";
import path from "path";

// Recria __dirname e __filename no ESModule
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let backendProcess = null;
let frontendProcess = null;
let mainWindow = null;

const BACKEND_URL = "http://localhost:3001";
const FRONTEND_URL = "http://localhost:3000";

function startBackend() {
  backendProcess = spawn("npm", ["run", "start:dev"], {
    cwd: path.join(__dirname, "..", "backend"),
    shell: true,
    stdio: "inherit",
  });

  backendProcess.on("error", (error) => {
    console.error("Erro ao iniciar o backend:", error);
  });

  backendProcess.on("close", (code) => {
    console.log(`Backend finalizado com código ${code}`);
    backendProcess = null;
  });

  return backendProcess;
}

function startFrontend() {
  frontendProcess = spawn("npm", ["run", "dev"], {
    cwd: path.join(__dirname, "..", "frontend"),
    shell: true,
    stdio: "inherit",
  });

  frontendProcess.on("error", (error) => {
    console.error("Erro ao iniciar o frontend:", error);
  });

  frontendProcess.on("close", (code) => {
    console.log(`Frontend finalizado com código ${code}`);
    frontendProcess = null;
  });

  return frontendProcess;
}

async function waitForServer(url, timeout = 30_000) {
  const startTime = Date.now();

  while (Date.now() - startTime < timeout) {
    try {
      const response = await fetch(url);

      if (response.ok) {
        return true;
      }
    } catch {
      // Servidor ainda não está disponível
    }

    await new Promise((resolve) => setTimeout(resolve, 500));
  }

  throw new Error(`Servidor não iniciou dentro de ${timeout / 1000}s: ${url}`);
}

async function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1400,
    height: 900,

    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      nodeIntegration: false,
      contextIsolation: true,
      sandbox: true,
    },
  });

  await waitForServer(FRONTEND_URL);

  await mainWindow.loadURL(FRONTEND_URL);
}

function stopProcess(process) {
  if (!process || process.killed) {
    return;
  }

  process.kill();
}

app.whenReady().then(async () => {
  try {
    startBackend();
    startFrontend();

    await createWindow();
  } catch (error) {
    console.error("Erro ao iniciar a aplicação:", error);

    app.quit();
  }
});

app.on("window-all-closed", () => {
  stopProcess(frontendProcess);
  stopProcess(backendProcess);

  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("before-quit", () => {
  stopProcess(frontendProcess);
  stopProcess(backendProcess);
});
