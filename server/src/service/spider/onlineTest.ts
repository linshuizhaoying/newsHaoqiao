import axios from 'axios'
const cheerio = require('cheerio');
import * as tjs from 'translation.js'

const translate = async (str: string) => {
  let data = ''

  await tjs.translate({
    text: str.toLowerCase(),
    from: 'en',
    to: 'zh-CN'
  }).then(async result => {
    data = await result.result.toString()
  }).catch( err => {
    console.log(err)
  })

  return data
}

export const onlineTest = async(ctx: any) => {
  let _body = ''
  const result: any[] = []
  const {source, parent, child, sourceLink, lang} = ctx.request.body;
  await axios({method: 'get', url: decodeURIComponent(sourceLink), responseType: 'text'})
  .then(function (response) {
    _body = response.data
  })

  let strArr = ''
  const node = parent + ' ' + child
  const $ = cheerio.load(_body); // 获取文本
  $(node).map(async (index: any, element: any) => {
    const item = {
      title: '',
      enTitle: '',
      link: sourceLink,
      source: source,
      sourceLink: sourceLink,
      type: 'spider'
    }
    const ele = $(element);
    item.title = ele.text().trim()
    item.link = ele.attr('href');
    if (lang === 'en') {
        strArr = strArr +  '$$' + item.title
    }
    result.push(item)
  })
  const r = await translate(strArr)
  const arr = r.split('$$')
  // console.log(result)
  result.map( (item, key) => {
    item.enTitle = arr[key + 1]
  })
  return ctx.body = JSON.parse(JSON.stringify(result))

}