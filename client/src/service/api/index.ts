// 定义测试接口地址
const baseUrl = "http://localhost:8866"
// 用户操作
export const REG_API = baseUrl + '/api/reg';
export const LOGIN_API = baseUrl +  '/api/login';
export const LOGOUT_API = baseUrl + '/api/logout';
export const USERINFO_API = baseUrl + '/api/userInfo';
export const TOKEN_API = baseUrl + '/api/token';
export const TAGLIST_API = baseUrl + '/api/tagList';

// 管理员操作
export const FRAME_API = baseUrl + '/api/requestFrame';
export const ONLINETEST_API =  baseUrl + '/api/onlineTest';

export const ADDSOURCE_API =  baseUrl + '/api/addSource';
export const ALLSOURCES_API =  baseUrl + '/api/allSources';
export const REMOVESOURCE_API =  baseUrl + '/api/removeSource';
export const UPDATESOURCE_API =  baseUrl + '/api/updateSource';
