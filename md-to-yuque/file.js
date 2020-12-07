const fs = require('fs-extra');
const path = require('path');

/**
 * 读取文件内容
 */
function readFileText(filePath) {
  return fs.readJsonSync(filePath);
}

/**
 * 读取文件列表
 */
function readFiles(path) {
  return fs.readdir(path);
}

/**
 * 组装文件夹下的内容
 */
function getFolderText(type) {
  const path = `snippets/${type}`;

  return readFiles(path)
    .then(res => {
      const filePaths = res.map(item => `${path}/${item}`);

      return filePaths.map(filePath => readFileText(filePath));
    });
}

module.exports = {
  getFolderText
};
