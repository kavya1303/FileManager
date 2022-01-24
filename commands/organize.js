const fs = require("fs");
const path = require("path");

let types = {
    media: ["mp4", "mkv", "mp3", "jpeg", "png", "jpg"],
    archives: ["zip", "7z", "rar", "tar", "gz", "ar", "iso", "xz"],
    documents: [
      "docx",
      "doc",
      "pdf",
      "xlsx",
      "xls",
      "odt",
      "ods",
      "odp",
      "odg",
      "odf",
      "txt",
      "ps",
      "tex",
    ],
    app: ["exe", "dmg", "pkg", "deb"],
  };
  
//organize function will organize all your target folder files in a different folder according to their extension
function organizeFn(dirPath) {
  //we need a directory path as parameter
  let destPath;
  if (dirPath == undefined) {
    console.log(`please enter a valid Directory Path`);
    return;
  } //check whether directory path is passed or not and if not simply return

  let doesExist = fs.existsSync(dirPath);

  // this doesExist will tell if dirPath exist or not

  if (doesExist == true) {
    destPath = path.join(dirPath, "organized_Files");

    //we created a path for organized_files folder

    //check whether in the given destPath does a folder exist with same name and if does not make a folder
    if (fs.existsSync(destPath) == false) {
      fs.mkdirSync(destPath);
    } else {
      console.log("Folder already exist");
    }
  } else {
    console.log("Please enter a valid path");
  }
  organizeHelper(dirPath, destPath);
}
function organizeHelper(src, dest) {
  let childNames = fs.readdirSync(src);
  //  console.log(childNames);

  for (let i = 0; i < childNames.length; i++) {
    let childAddress = path.join(src, childNames[i]);
    let isFile = fs.lstatSync(childAddress).isFile();

    if (isFile == true) {
      let fileCategory = getCategory(childNames[i]);
      //console.log(childNames[i]+' belong to file '+fileCategory);
      sendFiles(childAddress, dest, fileCategory);
    }
  }
}
function getCategory(fileName) {
  let ext = path.extname(fileName).slice(1);
  //we extracted extension name of the target files

  // console.log(ext);

  for (let key in types) {
    let cTypeArr = types[key];
    //we took out all the category type array
    //console.log(cTypeArr);

    for (let i = 0; i < cTypeArr.length; i++) {
      if (ext == cTypeArr[i]) {
        return key;
      }
    }
  }
  return "others";
}
function sendFiles(srcFilePath, dest, fileCategory) {
  // we will create path for each category type encountered to create folders of their name
  let catPath = path.join(dest, fileCategory);

  if (fs.existsSync(catPath) == false) {
    fs.mkdirSync(catPath);
  }

  let fileName = path.basename(srcFilePath);

  //we took out base name of all the files
  let destFilePath = path.join(catPath, fileName);
  fs.copyFileSync(srcFilePath, destFilePath);
  fs.unlinkSync(srcFilePath);

  console.log("files organized");
}

module.exports = {

    organizeFunction:organizeFn
};
