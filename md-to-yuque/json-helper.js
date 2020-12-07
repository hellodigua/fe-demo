/**
 * 二维数组扁平化
 */
function flatten(arr, result = []) {
  for (let item of arr) {
      if (Array.isArray(item))
          {flatten(item, result);}
      else
          {result.push(item);};
  }
  return result;
}

/**
 * 二维对象扁平化
 */
function getArrJson(data) {
  const temp = data.map(item => {
    const keys = Object.keys(item);

    const data = keys.map(key => {return { name: key, ...item[key] };});

    return data;
  });

  let arr = flatten(temp);

  return arr;
}

/**
 * 将snippet转回文本格式
 */
function reconvertSnippets(ctx) {
  // 加入换行符
  let arr = ctx.map(item => `${item}${'\n'}`);
  // 拼接字符串
  let str = ''.concat(arr);
  // 移除行首的,
  str = str.replace(/^,+/gm, '');

  return str;
}


/**
 * 将snippet对象转为md格式
 */
function getMd(arr) {
  return arr.map(item => {
    const md = `
### ${item.name}: ${item.prefix}
描述: ${item.description}
prefix: \`${item.prefix}\`
代码示例:
\`\`\`
${reconvertSnippets(item.body)}
\`\`\`
`;

    return md;
  });
}

/**
 * 生成md格式数据
 */
function generateData(json, { type, title }) {
  const arr = getArrJson(json);
  const markdowns = getMd(arr);
  const defaultMd = `## ${title}-${type}`;
  const md = markdowns.reduce(((total, item) => total + item), defaultMd);

  return md;
}


module.exports = {
  generateData
};
