import axios from 'axios'
import frame from '../utils/frame';

export const requestFrame = async(ctx: any) => {
  let _body = ''
  console.log(ctx.params.link)
  await axios({
    method: 'get',
    url: decodeURIComponent(ctx.params.link),
    responseType: 'text'
  }).then(function (response) {
   _body = response.data
   _body += '<script>' + frame + '</script>'
  })
  return ctx.body = _body;
}