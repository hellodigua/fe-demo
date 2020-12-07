/**
 * yuque-api: https://www.yuque.com/yuque/developer/api
 * yuque-yyago api: https://yyago.github.io/yuque-yyago/global.html
 */
const yuque = require('yuque-yyago');

const token = '1gN0OYtE3VbyvhWLXqe1ndBtDTh6ZaI2zz5X3F0E';
const api = new yuque(token);

function addDoc() {
  /**
   * 创建文档，通过接口才能创建markdown格式的文档
   * @book_id 知识库id
   */
  api.docs_creat(344483, {
    title: 'yw-snippets API文档',
    slug: 'yw-snippets-api',
    public: 1,
    format: 'markdown',
    body: '## 文档二级标题'
  }).then(res=>{
      console.log(`${JSON.stringify(res)}`);
    }).catch(e=>{
      console.log(`${JSON.stringify(e.error)}`);
    });
}

function updateDoc(mdContent) {
  /**
   * 修改文档，只有markdown格式的文档才能通过接口修改，所以务必先调创建接口创建一个文档
   * @book_id 知识库id（接口里取）
   * @id 文档id（接口里取）
   * @option { title: 文章标题, slug: 文章键名（域名最后一截的代码）, public: 是否公有, body: md格式内容体 }
   */
  api.docs_update(344483, 9377089, {
    title: 'yw-snippets API文档',
    slug: 'yw-snippets-api',
    public: 1,
    body: mdContent
  }).then(res=>{
    if (res.data) {
      console.log('文档已成功部署至语雀');
    } else {
      console.log(`${JSON.stringify(res)}`);
    }
  }).catch(e=>{
    console.log(`${JSON.stringify(e.error)}`);
  });
}

module.exports = {
  updateDoc,
  addDoc
};
