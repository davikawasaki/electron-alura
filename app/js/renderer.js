// Inter-process communication with main.js
const { ipcRenderer } = require('electron');
const timer = require('./timer');

let aboutLink = document.querySelector('#link-about');
let playButton = document.querySelector('.play-button');
let timerSpan = document.querySelector('.time');

aboutLink.addEventListener('click', function() {
    ipcRenderer.send('open-about-window');
});

let imgs = ['img/play-button.svg', 'img/stop-button.svg'];
let play = false;

playButton.addEventListener('click', function() {
    if(play) {
        timer.stop();
        play = false;
    } else {
        timer.start(timerSpan);
        play = true;
    }

    imgs = imgs.reverse();
    playButton.src = imgs[0];
});