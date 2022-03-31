import {
  AxiosConfig,
  AxiosPromise,
  AxiosResponse,
  MethodType,
  ResolveFn,
  RejectFn
} from '../types'
import dispatchRequest from './dispatchRequest'
import InterceptorManager from './InterceptorManager'
import mergeConfig from './mergeConfig'
// import mergeConfig from './mergeConfig'

interface Interceptors {
  request: InterceptorManager<AxiosConfig>
  response: InterceptorManager<AxiosResponse>
}

interface PromiseChain<T> {
  resolved: ResolveFn<T> | ((config: AxiosConfig) => AxiosPromise)
  rejected?: RejectFn
}

export default class Axios {
  defaults: AxiosConfig
  interceptors: Interceptors

  constructor(initConfig: AxiosConfig) {
    this.defaults = initConfig
    this.interceptors = {
      request: new InterceptorManager<AxiosConfig>(),
      response: new InterceptorManager<AxiosResponse>()
    }
  }

  request(url: any, config?: any): AxiosPromise {
    if (typeof url === 'string') {
      if (!config) {
        config = {}
      }
      config.url = url
    } else {
      config = url
    }
    config = mergeConfig(this.defaults, config)
    // config.MethodType = config.MethodType.toLowerCase()

    const chain: PromiseChain<any>[] = [
      {
        resolved: dispatchRequest,
        rejected: undefined
      }
    ]

    this.interceptors.request.forEach(interceptor => {
      chain.unshift(interceptor)
    })

    this.interceptors.response.forEach(interceptor => {
      chain.push(interceptor)
    })

    let promise = Promise.resolve(config)

    while (chain.length) {
      const { resolved, rejected } = chain.shift()!
      promise = promise.then(resolved, rejected)
    }

    return promise
  }

  get(url: string, config?: AxiosConfig): AxiosPromise {
    return this._requestMethodTypeWithoutData('get', url, config)
  }

  delete(url: string, config?: AxiosConfig): AxiosPromise {
    return this._requestMethodTypeWithoutData('delete', url, config)
  }

  head(url: string, config?: AxiosConfig): AxiosPromise {
    return this._requestMethodTypeWithoutData('head', url, config)
  }

  options(url: string, config?: AxiosConfig): AxiosPromise {
    return this._requestMethodTypeWithoutData('options', url, config)
  }

  post(url: string, data?: any, config?: AxiosConfig): AxiosPromise {
    return this._requestMethodTypeWithData('post', url, data, config)
  }

  put(url: string, data?: any, config?: AxiosConfig): AxiosPromise {
    return this._requestMethodTypeWithData('put', url, data, config)
  }

  patch(url: string, data?: any, config?: AxiosConfig): AxiosPromise {
    return this._requestMethodTypeWithData('patch', url, data, config)
  }

  // getUri(config?: AxiosConfig): string {
  //   config = mergeConfig(this.defaults, config)
  //   return transformURL(config)
  // }

  _requestMethodTypeWithoutData(
    MethodType: MethodType,
    url: string,
    config?: AxiosConfig
  ): AxiosPromise {
    return this.request(
      Object.assign(config || {}, {
        MethodType,
        url
      })
    )
  }

  _requestMethodTypeWithData(
    MethodType: MethodType,
    url: string,
    data?: any,
    config?: AxiosConfig
  ): AxiosPromise {
    return this.request(
      Object.assign(config || {}, {
        MethodType,
        url,
        data
      })
    )
  }
}
