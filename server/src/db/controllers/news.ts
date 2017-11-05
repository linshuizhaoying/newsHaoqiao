const News = require('../models/news');

interface NewsData {
  title: String,
  enTitle: String,
  url: String,
  sourceTitle: String,
  sourceLink: String,
  type: String, // spider rss email
  tagList: String,
  read: Number,
  score: Number,
  CreateDate: Date
}
function GetDateStr(AddDayCount: any) {
  const dd = new Date()
  dd.setDate( dd.getDate() + AddDayCount) // 获取AddDayCount天后的日期
  const y = dd.getFullYear()
  const m = dd.getMonth() + 1 // 获取当前月份的日期
  const d = dd.getDate()
  return y + '-' + m + '-' + d
}

export const ExistNews  = async() => {
  const start = new Date(GetDateStr(-7)) // 过去 七天
  const end = new Date(GetDateStr(1)) // 明天 0点
  console.log(start)
  console.log(end)
  return await News.find({'CreateDate': {'$gte': start, '$lt': end}}).sort({CreateDate: -1})
}

export const HoursNews = async() => {
   const start = new Date(GetDateStr(0)) // 今天 0点
   const end = new Date(GetDateStr(1)) // 明天 0点
   console.log(start)
   console.log(end)
   return await News.find({'CreateDate': {'$gte': start, '$lt': end}}).sort({CreateDate: -1})
}

export const WeeksNews = async() => {
  const start = new Date(GetDateStr(-7)) // 一个星期前
  const end = new Date(GetDateStr(0)) // 明天 0点
  console.log(start)
  console.log(end)
  return await News.find({'CreateDate': {'$gte': start, '$lt': end}}).sort({CreateDate: -1})
}
export const MouthsNews = async() => {
  const start = new Date(GetDateStr(-31)) // 一个月前
  const end = new Date(GetDateStr(-7)) // 明天 0点
  console.log(start)
  console.log(end)
  return await News.find({'CreateDate': {'$gte': start, '$lt': end}}).sort({CreateDate: -1})
}
export const saveToNews = async(item: NewsData) => {
  const { title, enTitle, url, sourceTitle, sourceLink, type, tagList, read, score} = item
  const duplicate = {'title': title}
  News.findOneAndUpdate( duplicate, {...item}, {upsert: true, new: false}, (err: any, doc: any) => {
      // console.log('无重复插入成功!')
  })
}

export const AllNews = async() => {
  return await News.find({})
}