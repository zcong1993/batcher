import { Batcher, Sender } from '../src'

const delay = (t: number) => new Promise(resolve => setTimeout(resolve, t))

it('batcher should works well', async () => {
  const mockSender = jest.fn<number, string[][]>(
    (batch: string[]) => batch.length
  )
  const bs = new Batcher<string>(30, 500, mockSender)

  Array(100)
    .fill('nasjxkajsnxkjanskxnksanxkjsnakxs')
    .forEach(s => bs.dispatch(s))

  await delay(500)
  bs.stop()

  expect(mockSender.mock.calls.length).toBe(4)
})

it('length getter should works well', async () => {
  const mockSender = jest.fn<number, string[][]>(
    (batch: string[]) => batch.length
  )
  const bs = new Batcher<string>(
    1000,
    500,
    mockSender,
    (str: string) => str.length
  )

  Array(100)
    .fill('nasjxkajsnxkjanskxnksanxkjsnakxs')
    .forEach(s => bs.dispatch(s))

  await delay(500)
  bs.stop()

  expect(mockSender.mock.calls.length).toBe(4)
})

it('should console error log when error occurred', async () => {
  global.console.log = jest.fn()

  const mockSender = jest.fn<number, string[][]>((batch: string[]) => {
    throw new Error('test error')
  })
  const bs = new Batcher<string>(30, 500, mockSender)

  Array(1)
    .fill('nasjxkajsnxkjanskxnksanxkjsnakxs')
    .forEach(s => bs.dispatch(s))

  await delay(500)
  bs.stop()

  expect(global.console.log).toBeCalled()
})
