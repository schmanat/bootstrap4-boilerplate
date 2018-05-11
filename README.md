# Bootstrap4 Boilerplate

This repo provides a small Bootstrap4 Boilerplate with the following features:

## features:
- Gulp
- Server with Livereload
- SASS Support (with autoprefixer)
- concatenate Scripts (JS and CSS)
- build task with minified versions of JS, CSS and HTML

## System Requirements
To use this boilerplate make sure you have [Node.js with NPM installed](https://nodejs.org/en/download/) and [gulp](https://gulpjs.com/).

## How to use it
1) Clone this repositority:
`git clone ###REPO_PATH###`

2) Go into the created folder
`cd ###REPO_PATH###`

3) Install dependencies
`npm install`

4) Start the server
`gulp`

5) Go to localhost:8080 and you will see a welcome Page

6) Start building your site. You will find all source file in the [src](src) directory

## Tasks
The following tasks are available:

### default
The default Task starts the server (with livereload), compile SASS to css files and watch changes in the **src** directory

```bash
gulp
```

### build
For production use the build task. This task minified all files (html, css, js) and copy the files to the **dist** directory.

```bash
gulp build
```

### clean
To clean up use this task. This will delete the **build** and **tmp** direcotory.

```bash
gulp clean
```