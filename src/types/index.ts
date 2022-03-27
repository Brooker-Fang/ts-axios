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
}