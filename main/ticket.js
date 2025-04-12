const { BrowserWindow } = require("electron");
const path = require("path");
const fs = require("fs");

function renderTemplate(htmlPath, data) {
  let template = fs.readFileSync(htmlPath, "utf-8");

  for (const key in data) {
    template = template.replaceAll(`{{${key}}}`, data[key]);
  }

  return template;
}

async function printTicket({ producto, cantidad, total }) {
  const fecha = new Date().toLocaleString();
  const ticketHTML = renderTemplate(path.join(__dirname, "templates", "ticket.html"), {
    producto,
    cantidad,
    total,
    fecha,
  });

  const printWin = new BrowserWindow({
    width: 300,
    height: 600,
    show: false,
  });

  printWin.loadURL(`data:text/html;charset=utf-8,${encodeURIComponent(ticketHTML)}`);

  printWin.webContents.on("did-finish-load", () => {
    printWin.webContents.print({ silent: true }, (success, errorType) => {
      if (!success) console.error("Error al imprimir:", errorType);
      printWin.close();
    });
  });
}

module.exports = { printTicket };
