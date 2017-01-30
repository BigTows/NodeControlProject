var Panel = {
    AddButton: document.getElementById("add")
}
Panel.AddButton.addEventListener("click", function () {
    var fileSelector = document.createElement('input');
    fileSelector.setAttribute('type', 'file');
    fileSelector.addEventListener('change', function () {
        var File = package(fileSelector.files[0]);
        if (File.good) {
            global.__projects[File.name] = {
                path: File.path,
                main: File.file
            };
            var fs = require('fs');
            fs.writeFile(global.__dirname, JSON.stringify(global.__projects));
            addItem({
                name: File.name,
                path: File.path,
                main: File.file,
            });
        } else {
            alert('This file is not suitable');
        }
    });
    fileSelector.click();
});
