import { type } from "os";
import { isPlainObject } from "./uitls";

export function transformRequest(data: any):any {
  if(isPlainObject(data)) {
    return JSON.stringify(data)
  }
}

export function transformResponse(data: any): any {
  if(typeof data === 'string') {
    try {
      data = JSON.parse(data)
    } catch (error) {
      
    }
  }
  return data
}