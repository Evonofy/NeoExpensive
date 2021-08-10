import {
  app,
  BrowserWindow,
  Menu,
  MenuItemConstructorOptions,
  nativeImage,
  shell
} from 'electron';

import { autoUpdater } from 'electron-updater';

import { getWindowBounds, setWindowBounds } from '../src/hooks';

import path from 'path';
import url from 'url';

let mainWindow: Electron.BrowserWindow;

const createWindow = () => {
  const icon = nativeImage.createFromPath(
    `${app.getAppPath()}/assets/icon-1024x.png`
  );

  /** When in system dock */
  app.dock && app.dock.setIcon(icon);

  mainWindow = new BrowserWindow({
    /** Returns the window bounds */
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

  const isDev = process.env.NODE_ENV === 'development';
  const next_url = process.env.NEXT_URL;

  /** if the app is in development, load the next.js app via url */
  mainWindow.loadURL(
    'https://esquemaflorescer.github.io/neo-expensive/packages/web/'
  );
  // isDev
  //   ? mainWindow.loadURL(next_url)
  //   : /** if not in development, load the static html file */
  //     mainWindow.loadURL(
  //       url.format({
  //         pathname: path.join(__dirname, 'renderer/index.html'),
  //         protocol: 'file:',
  //         slashes: true
  //       })
  //     );

  mainWindow.on('close', () => setWindowBounds(mainWindow?.getBounds()));

  mainWindow.on('closed', () => (mainWindow = null));
};

const createMenu = async () => {
  const template: MenuItemConstructorOptions[] = [
    {
      role: 'help',
      submenu: [
        {
          label: 'Learn More',
          click: () => {
            shell.openExternal(
              'https://github.com/EsquemaFlorescer/neo-expensive'
            );
          }
        }
      ]
    }
  ];

  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
};

app.on('ready', () => {
  createWindow();
  autoUpdater.checkForUpdatesAndNotify();
  createMenu();
});

app.allowRendererProcessReuse = true;
