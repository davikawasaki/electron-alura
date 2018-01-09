const data = require('./data');

module.exports = {
    mainTemplate: null,
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

        this.mainTemplate = template;

        return template;
    },
    addCourseTray(course, win) {
        this.mainTemplate.push({
            label: course,
            type: 'radio',
            checked: true,
            click: () => {
                win.send('changed-course', course);
            }
        });

        return this.mainTemplate;
    }
}