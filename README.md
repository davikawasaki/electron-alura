# Electron Course

This repository covers code from [Alura Electron Main Course](https://cursos.alura.com.br/course/electron).

## Topics

1\. [Main and Renderer Processes](https://codeburst.io/deep-dive-into-electrons-main-and-renderer-processes-7a9599d5c9e2?gi=28f3c515c99a)

2\. [Accelerators](https://github.com/electron/electron/blob/master/docs/api/accelerator.md)

3\. [Shell](https://github.com/electron/electron/blob/master/docs/api/shell.md)

4\. [Tray](https://github.com/electron/electron/blob/master/docs/api/tray.md)

5\. [Notifications](https://electronjs.org/docs/tutorial/notifications)

6\. [Electron Packager](https://github.com/electron-userland/electron-packager)

## Steps to run and build

1\. Install dependencies with NPM:

```bash
$ npm install
```

2\. Install globally electron-packager for builds:

```bash
$ npm install -g electron-packager
```

3\. Run without building:

```bash
$ npm start
```

4\. Build for all platforms in x64 architecture:

```bash
$ cd ..
$ electron-packager electron-alura/ alura-timer --platform=linux,win32,darwin --arch=x64 --icon=electron-alura/icon/icon
```