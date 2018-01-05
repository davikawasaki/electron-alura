const { ipcRenderer, shell } = require('electron');
const process = require('process');

let closeLink = document.querySelector('#link-close');
let personalLink = document.querySelector('#link-personal');
let electronVersion = document.querySelector('#electron-version');

window.onload = function() {
    electronVersion.textContent = process.versions.electron;
};

closeLink.addEventListener('click', function() {
    ipcRenderer.send('close-about-window'); 
});

personalLink.addEventListener('click', function() {
    shell.openExternal("http://www.davikawasaki.me");
});