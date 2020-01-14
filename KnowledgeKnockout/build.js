const fs = require('fs');
const path = require('path');

if (fs.existsSync('./dist/public')) {
    fs.rmdirSync('./dist/public');
}
if (fs.existsSync('./dist/views')) {
    fs.rmdirSync('./dist/views');
}

function copyFolderSync(from, to) { // https://stackoverflow.com/questions/13786160/copy-folder-recursively-in-node-js#answer-52338335
    fs.mkdirSync(to);
    fs.readdirSync(from).forEach(element => {
        if (fs.lstatSync(path.join(from, element)).isFile()) {
            fs.copyFileSync(path.join(from, element), path.join(to, element));
        } else {
            copyFolderSync(path.join(from, element), path.join(to, element));
        }
    });
}

copyFolderSync('./public', './dist/public');
copyFolderSync('./views', './dist/views');