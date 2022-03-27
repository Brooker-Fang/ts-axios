import { AxiosConfig } from "./types";

export default function xhr(config: AxiosConfig) :void {
  const { data, url, method = 'get' } = config

  const request = new XMLHttpRequest()

  request.open(method.toUpperCase(), url, true)
  request.send(data)
}