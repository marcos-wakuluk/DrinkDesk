const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
const fs = require("fs");

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  win.maximize();

  win.loadURL("http://localhost:3000");
}

ipcMain.on("imprimir-ticket", (event, data) => {
  const { producto, cantidad, total } = data;
  const ticket = `
    --- TICKET ---
    Producto: ${producto}
    Cantidad: ${cantidad}
    Total: $${total}
    -----------------
  `;

  fs.writeFileSync("ticket.txt", ticket);
});

app.whenReady().then(createWindow);
