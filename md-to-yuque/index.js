const { updateDoc, addDoc } = require('./api');
const { getFolderText } = require('./file');
const { generateData } = require('./json-helper');
/**
 * 思路
 * - 读取目录下的所有文件
 * - 遍历所有文件
 * - 对每个文件做json解析，解析出单独的key-value，即为一个独立的snippet
 * - 解析snippet为文本格式
 * - 组装为markdown
 * - 提交数据到语雀
 */

function genFolderMd({ type, title }) {
  return getFolderText(type)
    .then(item => generateData(item, { type, title }));
}

function generatorDoc() {
  const text = [
    { type: 'md', title: '文档模板' },
    { type: 'page', title: '页面模板' },
    { type: 'code', title: '代码片段'}
  ];

  Promise.all(text.map(item => genFolderMd(item)))
    .then(ctx => {
      const defaultStr = '## **>>此文档是脚本自动生成，请不要手动编辑<<**\n';
      const str = ctx.reduce(((total, item) => total + item), defaultStr);

      updateDoc(str);
    });
}

// addDoc();
generatorDoc();
