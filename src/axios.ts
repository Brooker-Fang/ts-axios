import { transformRequest, transformResponse } from "./helpers/data";
import { processHeaders } from "./helpers/hearders";
import { buildURL } from "./helpers/url";
import { AxiosConfig, AxiosPromise, AxiosResponse } from "./types";
import xhr from "./xhr";

function axios(config: AxiosConfig):AxiosPromise {
  processConfig(config)
  return xhr(config).then((res) => {
    return transformResponseData(res)
  })
}

function processConfig(config: AxiosConfig):void {
  config.url = transformURL(config)
  config.headers = transformHeaders(config)
  config.data = transformRequestData(config)
  
}
function transformURL(config: AxiosConfig):string {
  const { url, params } = config
  return buildURL(url, params)
}
function transformRequestData(config:AxiosConfig): any {
  return transformRequest(config.data)
}
function transformHeaders(config: AxiosConfig): any {
  const {headers = {}, data} = config
  return processHeaders(headers, data) 
}
function transformResponseData(res: AxiosResponse):AxiosResponse {
  res.data = transformResponse(res.data)
  return res
}
export default axios