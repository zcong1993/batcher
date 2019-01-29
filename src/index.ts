export type Sender<T> = (message: T[]) => void
export type LengthGetter<T> = (message: T) => number

export class Batcher<T> {
  private batchSize: number
  private batchWait: number
  private sender: Sender<T>
  private lengthGetter: LengthGetter<T>

  private timer: number | null
  private batch: T[]
  private currentBatchSize: number

  constructor(
    batchSize: number,
    batchWait: number,
    sender: Sender<T>,
    lengthGetter: LengthGetter<T> = (message: T) => 1
  ) {
    this.batchSize = batchSize
    this.batchWait = batchWait
    this.sender = sender
    this.lengthGetter = lengthGetter

    this.batch = []
    this.currentBatchSize = 0
    this.timer = null
    this.run()
  }

  private tick() {
    if (this.batch.length > 0) {
      try {
        this.sender(this.batch)
        this.batch = []
        this.currentBatchSize = 0
      } catch (err) {
        console.log(`ERROR: batcher invoke sender err: ${err}`)
      }
    }
  }

  private run() {
    this.timer = <any>setInterval(() => {
      this.tick()
    }, this.batchWait)
  }

  public dispatch(message: T) {
    const size = this.lengthGetter(message)
    if (this.currentBatchSize + size > this.batchSize) {
      this.tick()
    }

    this.batch.push(message)
    this.currentBatchSize += size
  }

  public stop() {
    this.tick()
    this.timer && clearInterval(this.timer)
  }
}
