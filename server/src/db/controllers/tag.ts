const Tag = require('../models/tag.js');

interface ITag  {
  tagTitle: string,
  status: string
}
export const AddTag = async(tag: ITag) => {
  const { tagTitle, status } = tag
  const result =  new Tag({tagTitle, status})
  console.log(result.save(), '添加标签成功');
}
export const UpdateTag = async(id: String, tag: ITag) => {

  const result = await Tag.findByIdAndUpdate({_id: id}, {...tag})
  console.log(result)
  console.log('更新标签成功');
}

export const AllTags = async() => {
  return await Tag.find({})
}