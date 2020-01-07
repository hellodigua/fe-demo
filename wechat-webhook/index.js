const request = require('request')

const webhookURL = 'https://qyapi.weixin.qq.com/cgi-bin/webhook/send?key=a4f9056f-7892-4726-850d-1226fdc05e9d'

const text = `
# 一级标题
## 二级标题

- 列表1
- 列表2

[链接](https://google.com)
`

request.post({
  url: webhookURL,
  json: true,
  body: {
    'msgtype': 'markdown',
    "markdown": {
      "content": text
    }
  }
}, (e, r, body) => {
  console.log(e, r, body)
})
