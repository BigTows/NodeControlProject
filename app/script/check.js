function package(file) {
    var Object = {
        good: false,
        name: undefined,
        path: undefined,
        file: undefined
    }
    if (file.name.toLowerCase() == "package.json") {
        var fs = require('fs');
        var checkedFile = fs.readFileSync(file.path);
        checkedFile = JSON.parse(checkedFile);
        if (checkedFile.name != undefined && checkedFile.main != undefined) {
            Object.good = true;
            Object.name = checkedFile.name;
            Object.path = file.path.substring(0, file.path.length - "package.json".length);
            Object.file = checkedFile.main;
        }
    }

    return Object;
}
