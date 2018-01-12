const { ipcRenderer } = require('electron');
const moment = require('moment');

let seconds = 0;
let timer;

module.exports = {
    
    start(el) {
        let time = moment.duration(el.textContent);
        seconds = time.asSeconds();
        
        clearInterval(timer);
        timer = setInterval(() => {
            seconds++;
            el.textContent = this.seconds2time(seconds);
            console.log(el);
        }, 1000);
    },

    stop(course) {
        clearInterval(timer);

        let studiedTime = this.seconds2time(seconds);
        ipcRenderer.send('stopped-course', course, studiedTime);
    },

    seconds2time(sec) {
        return moment().startOf('day').seconds(sec).format("HH:mm:ss");
    },

    getActualFormattedDate() {
        return moment().format("DD/MM/YYYY hh:mm:ss");
    }

}