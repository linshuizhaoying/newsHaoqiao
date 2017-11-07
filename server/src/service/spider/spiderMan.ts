import * as tjs from 'translation.js';
import axios from 'axios';
import { AllSources } from '../../db/controllers/index';
import { saveToNews, ExistNews } from '../../db/controllers/news';
import { AllTags } from '../../db/controllers/tag';
import * as schedule from 'node-schedule'
import * as _ from 'lodash';
const cheerio = require('cheerio');
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
const config = {
  interval: 120, // 抓取间隔 分钟
  use_redis: false, // 是否存入redis数据库，暂时不
  error_try: true, // 出错后是否加入队列再次尝试
}

// 设置定时爬取任务
const rule = new schedule.RecurrenceRule();
rule.dayOfWeek = [0, 1, 2, 3, 4, 5, 6, 7];
rule.hour = Array.from(new Set(Array.from(new Array( Math.ceil(24 / (config.interval / 60))), (val, index) => Math.ceil(index * config.interval / 60) % 24)))
rule.minute = 30;

console.log(rule)

schedule.scheduleJob(rule, function() {
  spiderInitial();
  console.log('任务正在执行中...' + 'hour');
});

interface SourceData {
  sourceTitle: string,
  url: string,
  type: string,
  lang: string,
  code: string
}

let dataQueueList: any[] = [] // 从数据库中获取咨询源加入队列
let tagList: any[] = [] // 从数据库中获取标签列表
const errorQueueList: any[] = [] // 爬取失败的咨询源队列
const todaySpiderResult: any[] = []
let todaySpiderNum = 0

const getTagList = async() => {
  const temp = await AllTags()
  let result: any[] = []
  const final: any[] = []
  result = temp.filter( (item: any) => {return item.status === '活跃'})
  result.forEach( (item: any) => { final.push(item.tagTitle)})
  return final
}

const getSourceList = async() => {
  const result = await AllSources()

  return result
}

export const spiderInitial = async() => {
  console.log('爬虫初始化')
  dataQueueList = await getSourceList()
  tagList = await getTagList()

  console.log('获取咨询源列表')
  console.log(dataQueueList)

  console.log('分批爬取ing...')
  const promises: any[] = []
  dataQueueList.forEach(async (item: any, index: any) => {
    promises.push(new Promise(function (resolve, reject) {
      const {sourceTitle, url, lang, code, type} = item
      setTimeout( async () => {
        await spiderSingleUrl({sourceTitle, url, lang, code, type}, index)
        resolve()
      }, 0)
    }))
  })
  Promise.all(promises).then( async () => {
    console.log('今日爬取数量:')
    console.log(todaySpiderNum)
    await insertTodayNews(todaySpiderResult)
    console.log('爬取失败资源数量:')
    console.log(errorQueueList.length)
    errorQueueList.forEach( (item: any) => {
      console.log(item.url + ' 爬取失败')
    })
  });
}

function compare ( a: any, b: any ) {
  return a.title === b.title
}


const insertTodayNews = async(array: any[]) => {
  const temp = {
    title: '',
    enTitle: '',
    url: '',
    sourceTitle: '',
    sourceLink: '',
    type: '', // spider rss email
    tagList: '',
    read: 0,
    score: 0,
  }
  const existNews = await ExistNews()
  const flattenArr = await _.flattenDeep(array)
  console.log(existNews.length)
  console.log(flattenArr.length)
  const result = _.differenceWith( flattenArr, existNews, compare)
  console.log(result)
  result.forEach( async (item: any) => {
     const ok = Object.assign(temp, item)
     console.log('正在插入:')
     console.log(ok)
     await saveToNews(ok)
  })
  // array.forEach( async (arr: any[]) => {
  //   arr.forEach( async (item: any) => {
  //     // let flag = true
  //     // existNews.forEach(async (oldItem: any) => {
  //     //    if (oldItem.title.trim() == item.title.trim()) {
  //     //      flag = false
  //     //      console.log('咨询已存在')
  //     //    }
  //     // });
  //     // if ( !flag ) {
  //     //   console.log('新资讯:')
  //     //   console.log(item)
  //     // } else {
  //     //   console.log('-1')
  //     // }

  //     //  const result = Object.assign(temp, item)
  //     //  console.log('正在插入:')
  //     //  console.log(result)
  //     //  await saveToNews(result)
  //   })
  // })
}

const spiderSingleUrl = async(item: SourceData, index: any) => {
  console.log('正在处理:', item)
  try {
    const {sourceTitle, url, lang, code, type} = item
    let _body = ''
    const result: any[] = []
    const node = code
    await axios({method: 'get', url: decodeURIComponent(url), responseType: 'text'})
    .then(function (response) {
      _body = response.data
    })
    let strArr = ''
    const $ = await cheerio.load(_body); // 获取文本
    $(node).map(async (index: any, element: any) => {
      const item = {
        title: '',
        enTitle: '',
        url: '',
        sourceTitle: sourceTitle,
        sourceLink: url,
        type: 'spider',
        tagList: '',
        CreateDate: Date()
      }
      const ele = $(element);
      item.title = ele.text().trim()
      item.url = ele.attr('href');
      // console.log(item)
      if (lang === 'en') {
          strArr = strArr +  '$$' + item.title
      }
      if (item.title.length > 0) {
        result.push(item)
      }
    })
    const r = await translate(strArr)
    const arr = r.split('$$')
    // console.log(result)
    result.map( (item, key) => {
      item.enTitle = arr[key + 1]
      item.tagList = tagList.filter( (tag: any) => { return item.title.toLowerCase().includes(tag.toLowerCase()) }).toString()
    })
    console.log(result[0])
    if (result.length > 0 ) {
      todaySpiderResult.push(result)
      todaySpiderNum += result.length
    } else {
      console.log('爬取出错!')
      errorQueueList.push(item)
    }
    console.log('第' + index + '条咨询源爬取结束')
    return todaySpiderResult
  } catch (e) {
    console.log('爬取出错!')
    errorQueueList.push(item)
    return
  }
}