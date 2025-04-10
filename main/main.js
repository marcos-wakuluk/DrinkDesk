const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
const fs = require("fs");

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"), // 👈 importante
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  win.loadURL("http://localhost:3000"); // o la ruta de tu app
}

// Escuchar impresión
ipcMain.on("imprimir-ticket", (event, data) => {
  const { producto, cantidad, total } = data;
  const ticket = `
    --- TICKET ---
    Producto: ${producto}
    Cantidad: ${cantidad}
    Total: $${total}
    -----------------
  `;

  fs.writeFileSync("ticket.txt", ticket); // simula impresión real
});

app.whenReady().then(createWindow);
