var DOMProjects = document.getElementById("projects");
var items = [];
/**
 * Add to array project
 * @param {object} Object {name: File.name,path: File.path, main: File.file}
 */
function addItem(Object) {
    Object["DOM"] = document.createElement("pre");
    Object["DOM"].innerHTML = Object.name;
    Object["DOM"].addEventListener('click', function () {
        Start(Object.name, Object.path, Object.main);
    })
    items[items.length] = Object;
    addToDOM(Object.DOM);
}
/**
 * add DOM item into to DOM
 * @param {DOM} DOMitem DOM
 */
function addToDOM(DOMitem) {
    setTimeout(DOMProjects.appendChild(DOMitem), 1000);
}
/**
 * Update array and DOM from JSON file
 */
function update() {
    for (var Objects in global.__projects) {
        addItem({
            name: Objects,
            path: global.__projects[Objects].path,
            main: global.__projects[Objects].main
        });
    }
}
