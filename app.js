const { app, BrowserWindow, ipcMain, IpcMessageEvent } = require("electron");
const url = require("url");
const path = require("path");
// const { app, BrowserWindow,  } from "electron";

let appWindow;
function initWindow() {
  appWindow = new BrowserWindow({
    width: 1000,
    height: 800,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });
  // Electron Build Path
  appWindow.loadURL(
    url.format({
      pathname: path.join(__dirname, `/dist/index.html`),
      protocol: "file:",
      slashes: true,
    })
  );
  // Initialize the DevTools.
  appWindow.webContents.openDevTools();
  appWindow.on("closed", function () {
    appWindow = null;
  });
}

app.on("ready", initWindow);

// Close when all windows are closed.
app.on("window-all-closed", function () {
  // On macOS specific close process
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", function () {
  if (win === null) {
    initWindow();
  }
});

tasks = [];
ipcMain.on("db:add-task", (event, newTask) => {
  console.log("db:add-task", newTask);
  tasks.push(newTask);
  event.sender.send("db:task-added", tasks);
});
