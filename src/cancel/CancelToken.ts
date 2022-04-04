import { CancelExecutor, Cancelr, CancelTokenSource } from "../types"


interface ResolvePromise {
  (reason?: string): void
}
export default class CancelToken {
  promise: Promise<string>
  reason?: string

  constructor(executor: CancelExecutor) {
    let resolvePromise: ResolvePromise

    this.promise = new Promise<string>(res => {
      resolvePromise = res as any
    })

    executor((message) => {
      if(this.reason) {
        return
      }
      this.reason = message
      resolvePromise(this.reason)
    })
  }
  static source(): CancelTokenSource {
    let cancel!:Cancelr
    const token = new CancelToken(c => {
      cancel = c
    })
    return {
      cancel,
      token
    }
  }
}