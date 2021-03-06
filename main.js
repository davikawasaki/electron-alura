// Destructuring
// Controls application life cycle
const { app, BrowserWindow, ipcMain, Tray, Menu, globalShortcut } = require('electron');
const data = require('./data');
const templateGenerator = require('./template');

let tray = null;
let mainWindow = null;

app.on('ready', () => {
    console.log('Application started!');
    // Renderer process
    mainWindow = new BrowserWindow({
        width: 600,
        height: 400
    });

    tray = new Tray(`${__dirname}/app/img/icon-tray.png`);
    let template = templateGenerator.generateTrayMenu(mainWindow);
    let trayMenu = Menu.buildFromTemplate(template);
    tray.setContextMenu(trayMenu);

    let templateMenu = templateGenerator.generateMainMenuTemplate(app);
    let mainMenu = Menu.buildFromTemplate(templateMenu);
    Menu.setApplicationMenu(mainMenu);

    // mainWindow.openDevTools();
    globalShortcut.register('CmdOrCtrl+Shift+S', () => {
        mainWindow.send('shortcut-start-stop');
    });

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

ipcMain.on('added-course', (event, course) => {
    let newTemplate = templateGenerator.addCourseTray(course, mainWindow); 
    let newTrayMenu = Menu.buildFromTemplate(newTemplate);
    tray.setContextMenu(newTrayMenu);
});