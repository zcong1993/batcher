export class Batcher<T> {
  private batchSize: number
  private batchWait: number
  private sender: (message: T[]) => void

  private _interval: number | null
  private _batch: T[]
  private _batchSize: number

  constructor(
    batchSize: number,
    batchWait: number,
    sender: (message: T[]) => void
  ) {
    this.batchSize = batchSize
    this.batchWait = batchWait
    this.sender = sender

    this._batch = []
    this._batchSize = 0
    this._interval = null
    this.run()
  }

  private reset() {
    this._batch = []
    this._batchSize = 0
  }

  private run() {
    this._interval = <any>setInterval(() => {
      if (this._batch.length > 0) {
        this.sender(this._batch)
        this.reset()
      }
    }, this.batchWait)
  }

  public dispatch(message: T) {
    if (this._batchSize + 1 > this.batchSize) {
      this.sender(this._batch)
      this.reset()
    }

    this._batch.push(message)
    this._batchSize++
  }

  public stop() {
    if (this._batch.length > 0) {
      this.sender(this._batch)
    }
    this._interval && clearInterval(this._interval)
  }
}
