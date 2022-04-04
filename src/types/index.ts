export type MethodType = 
  'get' | 'GET' | 
  'delete' | 'Delete' | 
  'head' | 'HEAD' | 
  'post' | 'POST' |
  'put' | 'PUT' |
  'patch' | 'PATCH' |
  'options' | 'OPTIONS'
  export interface AxiosTransformer {
    (data: any, headers?: any): any
  }
export interface AxiosConfig {
  url?: string,
  method?: MethodType,
  data?: any,
  params?: any
  headers?: any
  responseType?: XMLHttpRequestResponseType
  timeout?: number
  transformRequest?: AxiosTransformer | AxiosTransformer[]
  transformResponse?: AxiosTransformer | AxiosTransformer[]

  cancelToken?: CancelToken
  [propName: string]: any
}

export interface AxiosResponse<T = any> {
  data: T
  status: number
  statusText: string
  headers: any
  config: AxiosConfig
  request: any
}

export interface AxiosPromise<T = any> extends Promise<AxiosResponse<T>> {}

export interface AxiosError extends Error {
  config: AxiosConfig
  code?: string | null
  request?: any
  response?: AxiosResponse
  isAxiosError: boolean
}

export interface Axios {
  defaults: AxiosConfig
  interceptors: {
    request: AxiosInterceptorManager<AxiosConfig>
    response: AxiosInterceptorManager<AxiosResponse>
  }

  request<T = any>(config: AxiosConfig): AxiosPromise<T>

  get<T = any>(url: string, config?: AxiosConfig): AxiosPromise<T>

  delete<T = any>(url: string, config?: AxiosConfig): AxiosPromise<T>

  head<T = any>(url: string, config?: AxiosConfig): AxiosPromise<T>

  options<T = any>(url: string, config?: AxiosConfig): AxiosPromise<T>

  post<T = any>(url: string, data?: any, config?: AxiosConfig): AxiosPromise<T>

  put<T = any>(url: string, data?: any, config?: AxiosConfig): AxiosPromise<T>

  patch<T = any>(url: string, data?: any, config?: AxiosConfig): AxiosPromise<T>

  getUri(config?: AxiosConfig): string
}

export interface AxiosInstance extends Axios {
  <T = any>(config: AxiosConfig): AxiosPromise<T>

  <T = any>(url: string, config?: AxiosConfig): AxiosPromise<T>
}
export interface AxiosStatic extends AxiosInstance{
  create(config?: AxiosConfig): AxiosInstance
}
export interface AxiosInterceptorManager<T> {
  use(resolve: ResolveFn<T>, reject?: RejectFn):number
  eject(id: number): void
}

export interface ResolveFn<T> {
  (val: T): T | Promise<T>
}

export interface RejectFn {
  (error: any): any
}

export interface CancelToken {
  promise: Promise<string>
  reason?: string
}
export interface Cancelr {
  (message?: string): void
}

export interface CancelExecutor {
  (cancle: Cancelr): void
}

export interface CancelTokenSource {
  token: CancelToken
  cancel: Cancelr
}

export interface CancelTOkenStatic {
  new(executor: CancelExecutor):CancelToken

  source(): CancelTokenSource
}