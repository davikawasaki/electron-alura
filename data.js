const jsonfile = require('jsonfile-promised');
const fs = require('fs');
const moment = require('moment');
const timer = require('./app/js/timer');

module.exports = {

    saveData(course, studiedTime) {
        let coursePath = `${__dirname}/data/${course}.json`;
        if(fs.existsSync(coursePath)) {
            this.addTimeToCourseFile(coursePath, studiedTime)
                .then(() => console.log(`[${timer.getActualFormattedDate()}] Curso ${course} com tempo ${studiedTime} atualizado com sucesso!`))
                .catch((err) => console.error(err));;
        } else {
            this.createCourseArchive(coursePath, {})
                .then(() => {
                    console.log(`[${timer.getActualFormattedDate()}] Arquivo referente ao curso ${course} criado com sucesso!`);
                    return this.addTimeToCourseFile(coursePath, studiedTime);
                })
                .then(() => console.log(`[${timer.getActualFormattedDate()}] Curso ${course} com tempo ${studiedTime} inserido com sucesso!`))
                .catch((err) => console.error(err));
        };
    },

    addTimeToCourseFile(fileFullPath, studiedTime) {
        let data = {
            lastSave: new Date().toString(),
            time: studiedTime
        };

        return jsonfile.writeFile(fileFullPath, data, {spaces: 2});
    },

    createCourseArchive(fileFullPath, fileContent) {
        return jsonfile.writeFile(fileFullPath, fileContent);
    },

    getData(course) {
        let coursePath = `${__dirname}/data/${course}.json`;
        return jsonfile.readFile(coursePath);
    },

    getCoursesName() {
        let files = fs.readdirSync(__dirname + '/data/');
        return files.map(file => file.substr(0,file.lastIndexOf('.')));
    }

}