import Axios from "./core/Axios"
import defaults from "./default"
import { extend } from "./helpers/uitls"
import { AxiosConfig, AxiosInstance } from "./types"

function createInstance(config: AxiosConfig) {
  const context = new Axios(config)

  const instance = Axios.prototype.request.bind(context)

  extend(instance, context)
  return instance  as AxiosInstance
}
const axios = createInstance(defaults)
export default axios