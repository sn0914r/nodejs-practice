const { log } = console;
// =============== NODE JS BUILT-IN MODULES [FS] ===============
// ========== FS MODULE ==========

/*======================================================================
1. This module is used to READ, WRITE, MODIFY, and DELETE files & folders.
2. We can perform the operations in both sync and async way

KEY METHODS (ASYNC):
    FILES
    1. fs.writeFile("file_path", data, callback(error)) => creates and writes into the file
    2. fs.readFile("file_path", callback(error, data)) => reads the data from the given file
    3. fs.appendFile("file_path", data, callback(err)) => appends the content
    4. fs.unlink("file_path", callback(err)) => deletes the given file

    FOLDERS
    1. fs.mkdir("folder_path", callback(err)) => creates the folder at the given path
    2. fs.readdir("folder_path", callback(err, files)) => returns the list of folder contents
    3. fs.rmdir("folder_path", callback(err)) => removes the given folder
======================================================================*/

const fs = require("fs");

function writeFile_() {
  fs.writeFile(
    "fs-sample.txt",
    "this is data added with 'writeFile' method\n",
    (err) => {
      if (err) return log(err.message);
      log("data written successfully");
    }
  );
}

// writeFile_();

function readFile_() {
  fs.readFile("fs-sample.txt", (err, data) => {
    if (err) log(err.message);
    log("data:", data.toString());
  });
}

// readFile_();

function appendFile_() {
  fs.appendFile("fs-sample.txt", "this is new data appended", (err) => {
    if (err) return log(err.message);
    log("successfully appended the content");
  });
}

// appendFile_();

function unlink_() {
  fs.unlink("fs-sample.txt", (err) => {
    if (err) return log(err.message);
    log("successfully deleted the file");
  });
}
// unlink_();

function mkdir_() {
  fs.mkdir("fs-sample", (err) => {
    if (err) return log(err.message);
    log("successfully created the folder");
  });
}

// mkdir_()

function readdir_() {
  fs.readdir(__dirname, (err, files) => {
    if (err) return log(err.message);
    log("data:", files);
  });
}
// readdir_()

function rmdir_() {
  fs.rmdir("fs-sample", (err) => {
    if (err) return log(err.message);
    log("file deleted successfully");
  });
}

// rmdir_()
