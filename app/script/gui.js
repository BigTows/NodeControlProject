var gui = require("nw.gui");
var terminalWin = gui.Window;
const spawn = require('child_process').spawn;
const exec = require('child_process').exec;

/**
 * Crate GUI with process node
 * @param {String} name Name project
 * @param {String} path Path to project folder
 * @param {String} main Name file 'starter'
 */
function Start(name, path, main) {
    terminalWin.open('views/terminal.html', {
        title: name,
        focus: true
    }, function (cWindows) {
        var node;
        cWindows.on('loaded', function () {
            var body = cWindows.window.document.body;
            var Command = "node";
            node = spawn("cd " + path + " && /usr/local/bin/node " + main, {
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
        });
        cWindows.on('close', function () {
            exec('kill ' + (node.pid + 1));
            cWindows.close();
            this.close(true);
            this.hide();
        });
    });
}
