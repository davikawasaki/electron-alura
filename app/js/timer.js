const moment = require('moment');

let seconds;
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

    stop() {
        clearInterval(timer);
    },

    seconds2time(sec) {
        return moment().startOf('day').seconds(sec).format("HH:mm:ss");
    }

}