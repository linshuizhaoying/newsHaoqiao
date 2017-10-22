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

export const saveToNews = async(item: NewsData) => {
  const { title, enTitle, url, sourceTitle, sourceLink, type, tagList, read, score} = item
  const duplicate = {'title': title}
  News.findOneAndUpdate( duplicate, {...item}, {upsert: true}, (err: any, doc: any) => {
      // console.log('无重复插入成功!')
  })
}

export const AllNews = async() => {
  return await News.find({})
}