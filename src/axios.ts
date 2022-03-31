import Axios from "./core/Axios"
import mergeConfig from "./core/mergeConfig"
import defaults from "./default"
import { extend } from "./helpers/uitls"
import { AxiosConfig, AxiosInstance, AxiosStatic } from "./types"

function createInstance(config: AxiosConfig):AxiosStatic {
  const context = new Axios(config)

  const instance = Axios.prototype.request.bind(context)

  extend(instance, context)
  return instance  as AxiosStatic
}
const axios = createInstance(defaults)
axios.create = function(config?: AxiosConfig) {
  return createInstance(mergeConfig(defaults, config))
}
export default axios