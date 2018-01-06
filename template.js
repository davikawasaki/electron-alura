const data = require('./data');

module.exports = {
    generateTrayMenu(win) {
        let template = [
            { label: 'Cursos' },
            { type: 'separator' }
        ];

        data.getCoursesName().forEach(course =>
            template.push({
                label: course,
                type: 'radio',
                click: () => {
                    win.send('changed-course', course);
                }
            })
        );

        return template;
    }
}