const { app, BrowserWindow } = require('electron')

function createWindow () {
  const win = new BrowserWindow({
    width: 550,
    height: 350,
    x: 810,
    y: 0,
    alwaysOnTop: true,
    frame: true,
    transparent: true,
    webPreferences: {
      nodeIntegration: true
    },
  })

  win.loadURL("https://esquemaflorescer.github.io/neo-expensive/packages/web/")
}

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})