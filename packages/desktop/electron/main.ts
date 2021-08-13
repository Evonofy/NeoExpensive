import { app, BrowserWindow, nativeImage } from 'electron';

import { autoUpdater } from 'electron-updater';

import {
  getWindowBounds,
  setWindowBounds
} from '../src/utils/windowBoundsController';

export let mainWindow: Electron.BrowserWindow | null;
let splash: Electron.BrowserWindow | null;

function createWindow() {
  /** 1024x icon */
  const icon = nativeImage.createFromPath(
    `${app.getAppPath()}/assets/bigsur-logo.png`
  );

  if (app.dock) {
    app.dock.setIcon(icon);
  }

  /** Main app window */
  mainWindow = new BrowserWindow({
    ...getWindowBounds(),
    icon,
    minWidth: 1000,
    minHeight: 600,
    frame: false,
    transparent: true,
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true
    }
  });

  /* TODO: apply custom tray */

  /** Splash Screen */
  splash = new BrowserWindow({
    width: 286,
    height: 286,
    icon,
    show: true,
    transparent: true,
    frame: false,
    resizable: false,
    alwaysOnTop: true
  });

  /** Load react app via URL to get custom titlebar */
  splash.loadURL('http://localhost:3000/splash');
  mainWindow.loadURL('http://localhost:4000');

  mainWindow.on('close', () => {
    setWindowBounds(mainWindow?.getBounds());
  });

  /* Quit app when all windows are closed */
  app.on('window-all-closed', () => {
    /* If in MacOS, app remains active until client closes it with CMD + Q */
    if (process.platform !== 'darwin') {
      app.quit();
    }
  });

  /* When app closes, remove the old instance */
  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  /* Allow for iframes to work */
  mainWindow.webContents.session.webRequest.onHeadersReceived(
    { urls: ['*://*/*'] },
    ({ responseHeaders }, callback) => {
      if (responseHeaders!['X-Frame-Options']) {
        delete responseHeaders!['X-Frame-Options'];
      } else if (responseHeaders!['x-frame-options']) {
        delete responseHeaders!['x-frame-options'];
      }

      callback({ cancel: false, responseHeaders });
    }
  );
}

app.on('ready', () => {
  createWindow();
  autoUpdater.checkForUpdatesAndNotify();
});

app.allowRendererProcessReuse = true;
