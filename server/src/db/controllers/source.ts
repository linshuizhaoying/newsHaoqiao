
const Source = require('../models/source');

interface SourceData  {
  sourceTitle: String,
  url: String,
  type: String, // spider rss email
  code: String,
  lang: String,
}

export const AddSource = async(source: SourceData) => {
  const {sourceTitle, url, lang, type, code} = source
  const result = new Source({sourceTitle, url, lang, type, code});
  console.log(result.save(), '添加咨询源成功');
}

export const RemoveSource = async(id: String) => {
  console.log(id)
  const result = await Source.findByIdAndRemove({_id: id})
  console.log('删除咨询源成功');
}
export const UpdateSource = async(id: String, source: SourceData) => {
  console.log(id)
  console.log(source)
  const result = await Source.findByIdAndUpdate({_id: id}, {...source})
  console.log(result)
  console.log('更新咨询源成功');
}

export const AllSources = async() => {
  return await Source.find({})
}