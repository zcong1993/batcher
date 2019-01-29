# batcher

[![NPM version](https://img.shields.io/npm/v/@zcong/batcher.svg?style=flat)](https://npmjs.com/package/@zcong/batcher) [![NPM downloads](https://img.shields.io/npm/dm/@zcong/batcher.svg?style=flat)](https://npmjs.com/package/@zcong/batcher) [![CircleCI](https://circleci.com/gh/zcong1993/batcher/tree/master.svg?style=shield)](https://circleci.com/gh/zcong1993/batcher/tree/master) [![codecov](https://codecov.io/gh/zcong1993/batcher/branch/master/graph/badge.svg)](https://codecov.io/gh/zcong1993/batcher)

> A simple batch wrapper for JS

## Example

```ts
import { Batcher } from '@zcong/batcher'

const bs = new Batcher<string>(
  1000,
  10000,
  (batch: string[]) => {
    console.log(batch.length)
  },
  (str: string) => str.length
)

Array(100)
  .fill('nasjxkajsnxkjanskxnksanxkjsnakxs')
  .forEach(s => bs.dispatch(s))

setTimeout(() => bs.stop(), 9000)
// 31
// 31
// 31
// 7
```

## License

MIT &copy; zcong1993
