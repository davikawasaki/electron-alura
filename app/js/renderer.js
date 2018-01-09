// Inter-process communication with main.js
const { ipcRenderer } = require('electron');
const timer = require('./timer');
const data = require('../../data');

let aboutLink = document.querySelector('#link-about');
let playButton = document.querySelector('.play-button');
let timerSpan = document.querySelector('.time');
let courseSpan = document.querySelector('.course');
let addButton = document.querySelector('.add-button');
let addField = document.querySelector('.add-field');

window.onload = () => {
    data.getData(courseSpan.textContent)
        .then(data => timerSpan.textContent = data.time)
        .catch(err => console.error(err));
};

aboutLink.addEventListener('click', function() {
    ipcRenderer.send('open-about-window');
});

let imgs = ['img/play-button.svg', 'img/stop-button.svg'];
let play = false;

playButton.addEventListener('click', function() {
    if(play) {
        timer.stop(courseSpan.textContent);
        play = false;
    } else {
        timer.start(timerSpan);
        play = true;
    }

    imgs = imgs.reverse();
    playButton.src = imgs[0];
});

ipcRenderer.on('changed-course', (event, course) => {
    courseSpan.textContent = course;
    data.getData(course)
        .then(data => timerSpan.textContent = data.time);
});

addButton.addEventListener('click', function() {
    let newCourse = addField.value;
    courseSpan.textContent = newCourse;
    timerSpan.textContent = '00:00:00';
    addField.value = '';
    ipcRenderer.send('added-course', newCourse);
});
