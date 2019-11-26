import http from './../../../base/api/public'
import querystring from 'querystring'

let sysConfig = require('@/../config/sysConfig')

let apiUrl = sysConfig.xcApiUrlPre;
//页面查询
export const page_list = (page, size, params) => {
  let par = querystring.stringify(params);
  return http.requestQuickGet(apiUrl + "/cms/page/list/" + page + "/" + size + "?" + par)
}

//页面添加
export const page_add = params => {
  return http.requestPost(apiUrl + "/cms/page/add", params);
}

//根据id查页面
export const page_findById = pageId => {
  return http.requestQuickGet(apiUrl + '/cms/page/findById/' + pageId);
}

//页面修改
export const page_edit = (pageId,params) => {
  return http.requestPut(apiUrl + '/cms/page/update/' + pageId, params)
}

//页面删除
export function page_del(pageId) {
  return http.requestDelete(apiUrl + '/cms/page/del/' + pageId);
}
