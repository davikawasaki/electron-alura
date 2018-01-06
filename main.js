// Destructuring
// Controls application life cycle
const { app, BrowserWindow, ipcMain, Tray, Menu } = require('electron');
const data = require('./data');
const templateGenerator = require('./template');

let tray = null;

app.on('ready', () => {
    console.log('Application started!');
    // Renderer process
    let mainWindow = new BrowserWindow({
        width: 600,
        height: 400
    });

    let tray = new Tray(`${__dirname}/app/img/icon-tray.png`);
    let template = templateGenerator.generateTrayMenu(mainWindow);
    let trayMenu = Menu.buildFromTemplate(template);
    tray.setContextMenu(trayMenu);

    // File protocol + folder dirname
    mainWindow.loadURL(`file://${__dirname}/app/index.html`);
});

app.on('window-all-closed', () => {
    app.quit();
});

let aboutWindow = null;

ipcMain.on('open-about-window', () => {

    if(!aboutWindow) {
        aboutWindow = new BrowserWindow({
            width: 300,
            height: 220,
            alwaysOnTop: true,
            frame: false
        });

        aboutWindow.loadURL(`file://${__dirname}/app/about.html`);

        aboutWindow.on('closed', () => {
            aboutWindow = null;
        });
    }
});

ipcMain.on('close-about-window', () => {
    if(aboutWindow !== null) aboutWindow.close();
});

ipcMain.on('stopped-course', (event, course, studiedTime) => {
    data.saveData(course, studiedTime);
});