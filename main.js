// Destructuring
// Controls application life cycle
const { app, BrowserWindow } = require('electron');

app.on('ready', () => {
    console.log('Application started!');
    // Renderer process
    let mainWindow = new BrowserWindow({
        width: 600,
        height: 400
    });

    // File protocol + folder dirname
    mainWindow.loadURL(`file://${__dirname}/app/index.html`);
});

app.on('window-all-closed', () => {
    app.quit();
});