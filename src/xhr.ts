import { AxiosConfig } from "./types";

export default function xhr(config: AxiosConfig) :void {
  const { data, url, method = 'get', headers } = config

  const request = new XMLHttpRequest()

  request.open(method.toUpperCase(), url, true)
  Object.keys(headers).forEach((name) => {
    if(data === null && name.toLocaleLowerCase() === 'content-type') {
      delete headers[name]
      return
    } 
    request.setRequestHeader(name, headers[name])
  })
  request.send(data)
}