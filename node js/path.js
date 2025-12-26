// =============== NODE JS BUILT-IN MODULES [PATH] ================
// ========== PATH MODULE ==========
const path = require("path");

/* =================================================================
This module is used to handle the file and folder paths 

KEY METHODS: 
    1. path.join(...strings) => joins two or more paths correctly
    2. path.resolve(...strings) => joins and returns the absolute path
    3. path.basename(path) => returns the filename along with extension
    4. path.dirname(path) => returns the directory path
    5. path.extname(path) => returns the file extension names

GLOBAL METHODS:
    1. __dirname => returns the absolute path of the current folder
    2. __filename => returns the current file name
================================================================= */

let p1 = "allusers";
let p2 = "users/siva.js";

const newPath = path.join(p1, p2);
console.log(newPath);
// Output:- allusers/users/siva.js

const absolutePath = path.resolve(p1, p2);
console.log(absolutePath);
// Output:- /Users/sivanandareddy/Desktop/mern/node js/path-module/allusers/users/siva.js

const filename = path.basename(absolutePath);
console.log(filename);
// Output:- siva.js

const dirPath = path.dirname(absolutePath);
console.log(dirPath);
// Output:- /Users/sivanandareddy/Desktop/mern/node js/path-module/allusers/users

const extensionName = path.extname(absolutePath);
console.log(extensionName);
// Output:- .js

console.log(__dirname);

console.log(__filename);