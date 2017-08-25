ipbase
-----------

# [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Coverage Status][coverage-image]][coverage-url]

IP common function

## 使用方法

### 白名单判断

```js
console.log(ipbase.ipInList('127.0.0.1', '127.0.0.1'));
// > true

console.log(ipbase.ipInList('127.0.0.1', ['127.0.0.1', '10.10.110.10']));
// > true
```

### 获取客户端地址

```js
var req = {
  headers: {
    'x-real-ip': '198.168.100.54'
  }
}
console.log(ipbase.getClientAddress(req));
// > 198.168.100.54
```

## License

MIT © [zswang](http://weibo.com/zswang)

[npm-url]: https://npmjs.org/package/ipbase
[npm-image]: https://badge.fury.io/js/ipbase.svg
[travis-url]: https://travis-ci.org/zswang/ipbase
[travis-image]: https://travis-ci.org/zswang/ipbase.svg?branch=master
[coverage-url]: https://coveralls.io/github/zswang/ipbase?branch=master
[coverage-image]: https://coveralls.io/repos/zswang/ipbase/badge.svg?branch=master&service=github