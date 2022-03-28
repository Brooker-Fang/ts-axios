export type MethodType = 
  'get' | 'GET' | 
  'delete' | 'Delete' | 
  'head' | 'HEAD' | 
  'post' | 'POST' |
  'put' | 'PUT' |
  'patch' | 'PATCH' |
  'options' | 'OPTIONS'

export interface AxiosConfig {
  url: string,
  method?: MethodType,
  data?: any,
  params?: any
  headers?: any
  responseType?: XMLHttpRequestResponseType
}

export interface AxiosResponse {
  data: any
  status: number
  statusText: string
  headers: any
  config: AxiosConfig
  request: any
}

export interface AxiosPromise extends Promise<AxiosResponse> {}