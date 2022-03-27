import { AxiosConfig } from "./types";
import xhr from "./xhr";

function axios(config: AxiosConfig):void {
  xhr(config)
}

export default axios