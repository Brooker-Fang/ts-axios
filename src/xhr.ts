import { parseHeaders } from "./helpers/hearders";
import { AxiosConfig, AxiosPromise, AxiosResponse } from "./types";

export default function xhr(config: AxiosConfig) :AxiosPromise {
  return new Promise((resolve) => {
    const { data, url, method = 'get', headers, responseType } = config

  const request = new XMLHttpRequest()

  if(responseType) {
    request.responseType = responseType
  }
  request.open(method.toUpperCase(), url, true)

  request.onreadystatechange = function handleLoad () {
    if(request.readyState !== 4) {
      return
    }
    const responseHeaders = request.getAllResponseHeaders()
    const responseData = responseType !== 'text' ? request.response : request.responseText
    const response: AxiosResponse = {
      data: responseData,
      status: request.status,
      statusText: request.statusText,
      headers: parseHeaders(responseHeaders),
      config,
      request
    }
    resolve(response)
  }
  Object.keys(headers).forEach((name) => {
    if(data === null && name.toLocaleLowerCase() === 'content-type') {
      delete headers[name]
      return
    } 
    request.setRequestHeader(name, headers[name])
  })
  request.send(data)
  })
  
}