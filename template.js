const data = require('./data');
const { ipcMain } = require('electron');

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
    generateMainMenuTemplate(app) {
        let templateMenu = [
            {
                label: 'View',
                submenu: [
                    {
                        role: 'reload'
                    },
                    {
                        role: 'toggledevtools'
                    }
                ]
            },
            {
                label: 'Window',
                submenu: [
                    {
                        role: 'minimize'
                    },
                    {
                        role: 'close'
                    }
                ]
            },
            {
                label: 'About',
                submenu: [
                    {
                        label: 'Alura Timer',
                        click: () => {
                            ipcMain.emit('open-about-window');
                        }
                    }
                ]
            }
        ];
    
        if(process.platform == 'darwin') {
            templateMenu.unshift({
                label: app.getName(),
                subMenu: [
                    {
                        label: 'Rodando em um MacOS'
                    }
                ]
            });
        }

        return templateMenu;
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