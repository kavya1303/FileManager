const fs = require("fs");
const path = require("path");
function treeFn(dirPath) {
    if (dirPath == undefined) {
      console.log("please enter a valid Directory Path");
      return;
    } else {
      let doesExist = fs.existsSync(dirPath);
      if (doesExist == true) {
        treeHelper(dirPath, " ");
      }
      // else{
      //   console.log("Please enter a valid path");
      // }
    }
  }
  
  function treeHelper(targetPath, indent) {
    let isFile = fs.lstatSync(targetPath).isFile();
  
    if (isFile == true) {
      let fileName = path.basename(targetPath);
      console.log(indent + "├── " + fileName);
  
  
    } else {
  
  
      let dirName = path.basename(targetPath);
      console.log(indent + "└──" + dirName);
  
      let children = fs.readdirSync(targetPath);
  
      for (let i = 0; i < children.length; i++) {
        let childPath = path.join(targetPath, children[i]);
        treeHelper(childPath, indent + "\t");
      }
  
  
    }
  
  
  }

  
  module.exports={
      treeFunction:treeFn
  }