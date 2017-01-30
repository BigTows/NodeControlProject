var fs = require('fs');
// Default path where store Files Application
const PATH_TO_WORK_DIR = (process.env.HOME || process.env.USERPROFILE) + "/NCP/";
// Create NCP folder
fs.existsSync(PATH_TO_WORK_DIR) || fs.mkdirSync(PATH_TO_WORK_DIR);

const PROJECT_FILE = "projects.json";
global.__dirname = PATH_TO_WORK_DIR + PROJECT_FILE;
fs.appendFile(PATH_TO_WORK_DIR + PROJECT_FILE, '');
global.__projects = fs.readFileSync(PATH_TO_WORK_DIR + PROJECT_FILE);
if (global.__projects.length == 0) global.__projects = '{}';
global.__projects = JSON.parse(global.__projects);
