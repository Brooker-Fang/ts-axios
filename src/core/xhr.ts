import { createError } from "../helpers/error";
import { parseHeaders } from "../helpers/hearders";
import { AxiosConfig, AxiosPromise, AxiosResponse } from "../types";

export default function xhr(config: AxiosConfig) :AxiosPromise {
  return new Promise((resolve, reject) => {
    const { data, url, method = 'get', headers, responseType, timeout } = config

  const request = new XMLHttpRequest()

  if(responseType) {
    request.responseType = responseType
  }
  if(timeout) {
    request.timeout = timeout
  }
  request.open(method.toUpperCase(), url!, true)
  function handleResponse(response: AxiosResponse) {
    if(response.status >= 200 && response.status < 300) {
      resolve(response)
    } else {
      reject(createError(`Request failed with status code ${response.status}`, config, null, request, response))
    }
    
  }
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
    handleResponse(response)
  }
  request.onerror = function handleError() {
    reject(createError('Network Error', config, null, request))
  }
  request.ontimeout =() => {
    console.log('ontimeout')
    reject(createError(`Timeout of ${timeout}`, config, 'ECONNABORTED', request))
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