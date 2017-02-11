var gui = require("nw.gui");
var terminalWin = gui.Window;
const spawn = require('child_process').spawn;
const exec = require('child_process').exec;
var fs = require('fs');
/**
 * recursive function to calculate size of directory
 * @param   {string} path Text path
 * @returns {number} folder size
 */
function getSumDir(path) {
    var DIR = fs.readdirSync(path);
    var Sum = 0;
    for (var File in DIR) {
        var NewPath = path + DIR[File];
        try {
            var stats = fs.statSync(NewPath);
            if (stats.isDirectory()) Sum += getSumDir(NewPath + "/")
            else Sum += stats.size;
        } catch (err) {

        }
    }
    return Sum;
}
/**
 * Start Node process
 * @param   {string} path Path to main file
 * @param   {string} main Name main file
 * @param   {object} body document on DOM
 * @returns {object} spawn object
 */
function startNode(path, main, body) {
    var node = spawn("cd " + path + " && /usr/local/bin/node " + main, {
        shell: true
    });
    node.stdout.on('data', (data) => {
        body.innerHTML += data + "<br>";
    });
    node.stderr.on('data', (data) => {
        body.innerHTML += data + "<br>";
    });
    node.on('close', (code) => {
        body.innerHTML += "Process finished with exit code: " + code + "<br>";
    });
    return node;
}

/**
 * Crate GUI with process node
 * @param {string} name Name project
 * @param {string} path Path to project folder
 * @param {string} main Name file 'starter'
 */
function Start(name, path, main) {
    terminalWin.open('views/terminal.html', {
        title: name,
        focus: true
    }, function (cWindows) {
        var node;
        var IntervalID;
        cWindows.on('loaded', function () {
            var body = cWindows.window.document.body;
            node = startNode(path, main, body);
            var Command = "node";
            var dirSum = getSumDir(path);
            IntervalID = setInterval(function () {
                if (dirSum != getSumDir(path)) {
                    dirSum = getSumDir(path);
                    body.innerHTML += "Reload...<br>";
                    exec('kill ' + (node.pid + 1));
                    node = startNode(path, main, body);
                    body.innerHTML += "cd " + path + " && /usr/local/bin/node " + main;
                }
            }, 1500);
        });
        cWindows.on('close', function () {
            exec('kill ' + (node.pid + 1));
            cWindows.close();
            this.close(true);
            this.hide();
        });
    });
}
