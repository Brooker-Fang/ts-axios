import { transformRequest } from "./helpers/data";
import { processHeaders } from "./helpers/hearders";
import { buildURL } from "./helpers/url";
import { AxiosConfig } from "./types";
import xhr from "./xhr";

function axios(config: AxiosConfig):void {
  processConfig(config)
  xhr(config)
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
export default axios