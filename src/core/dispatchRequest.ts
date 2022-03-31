import { transformRequest, transformResponse } from "../helpers/data";
import { flattenHeaders, processHeaders } from "../helpers/hearders";
import { buildURL } from "../helpers/url";
import { AxiosConfig, AxiosPromise, AxiosResponse } from "../types";
import transform from "./transform";
import xhr from "./xhr";

function dispatchRequest(config: AxiosConfig):AxiosPromise {
  processConfig(config)
  return xhr(config).then((res) => {
    return transformResponseData(res)
  })
}

function processConfig(config: AxiosConfig):void {
  config.url = transformURL(config)
  config.data = transform(config.data, config.headers, config.transformRequest)
  config.headers = flattenHeaders(config.headers, config.method!)
}
function transformURL(config: AxiosConfig):string {
  const { url, params } = config
  return buildURL(url!, params)
}
function transformResponseData(res: AxiosResponse):AxiosResponse {
  res.data = transform(res.data, res.headers, res.config.transformResponse)
  return res
}
export default dispatchRequest