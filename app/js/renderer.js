// Inter-process communication with main.js
const { ipcRenderer } = require('electron');

let aboutLink = document.querySelector('#link-about');

aboutLink.addEventListener('click', function() {
    ipcRenderer.send('open-about-window');
});
