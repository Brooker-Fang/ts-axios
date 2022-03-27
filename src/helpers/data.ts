import { isPlainObject } from "./uitls";

export function transformRequest(data: any):any {
  if(isPlainObject(data)) {
    return JSON.stringify(data)
  }
}