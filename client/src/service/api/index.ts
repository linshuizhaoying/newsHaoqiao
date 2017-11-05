// 定义测试接口地址
 const baseUrl = "http://new.haoqiao.me:8866"
// const baseUrl = "http://localhost:8866"
// 用户操作
export const REG_API = baseUrl + '/api/reg';
export const LOGIN_API = baseUrl +  '/api/login';
export const LOGOUT_API = baseUrl + '/api/logout';
export const USERINFO_API = baseUrl + '/api/userInfo';
export const TOKEN_API = baseUrl + '/api/token';
export const TAGLIST_API = baseUrl + '/api/allTags';
export const NEWSLIST_API =  baseUrl + '/api/hoursNews';
export const WEEKNEWSLIST_API =  baseUrl + '/api/weeksNews';
export const MOUTHNEWSLIST_API =  baseUrl + '/api/mouthsNews';

// 管理员操作
export const FRAME_API = baseUrl + '/api/requestFrame';
export const ONLINETEST_API =  baseUrl + '/api/onlineTest';

export const ADDSOURCE_API =  baseUrl + '/api/addSource';
export const ALLSOURCES_API =  baseUrl + '/api/allSources';
export const REMOVESOURCE_API =  baseUrl + '/api/removeSource';
export const UPDATESOURCE_API =  baseUrl + '/api/updateSource';

export const ADDTAG_API =  baseUrl + '/api/addTag';
export const ALLTAGS_API =  baseUrl + '/api/allTags';
export const UPDATETAG_API =  baseUrl + '/api/updateTag';