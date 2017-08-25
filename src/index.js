const ip = require('ip');
/*<remove>*/
/*jshint esversion: 6 */
/*</remove>*/
/*<jdists encoding="ejs" data="../package.json">*/
/**
 * @file <%- name %>
 <% if (typeof repository != 'undefined') { %>
 * @url <%- repository.url %>
 <% } %>
 * <%- description %>
 * @author
     <% (author instanceof Array ? author : [author]).forEach(function (item) { %>
 *   <%- item.name %> (<%- item.url %>)
     <% }); %>
 * @version <%- version %>
     <% var now = new Date() %>
 * @date <%- [
      now.getFullYear(),
      now.getMonth() + 101,
      now.getDate() + 100
    ].join('-').replace(/-1/g, '-') %>
 * @license <%- license %>
 */
/*</jdists>*/

/**
 * 判断 IP 是否在名单中
 *
 * @param {String} address IP 地址
 * @param {Array|String} IP 名单
 * @return {Boolean} 返回名单
 * @example ipInList():base
  ```js
    ipbase.ipInList('127.0.0.1');
    ipbase.ipInList(null, '127.0.0.1');

    console.log(ipbase.ipInList('127.0.0.1', '127.0.0.1'));
    // > true

    console.log(ipbase.ipInList('127.0.0.1', ['127.0.0.1', '10.10.110.10']));
    // > true
  ```
 * @example ipInList():CIDR
  ```js
    console.log(ipbase.ipInList('10.10.110.59', ['127.0.0.1', '10.10.110.0/24']));
    // > true
  ```
 */
function ipInList(address, list) {
  if (!address || !list) {
    return;
  }

  if (!(list instanceof Array)) {
    list = [list];
  }

  return list.some(function (item) {
    if (item.indexOf('/') >= 0) { // CIDR
      return ip.cidrSubnet(item).contains(address);
    } else {
      return ip.isEqual(item, address);
    }
  });
}
exports.ipInList = ipInList;

/**
 * 获取客户端地址
 *
 * @param {HTTPRequest} req HTTP 请求
 * @return {String} 返回客户端 IP
 * @example getClientAddress():x-real-ip
  ```js
    var req = {
      headers: {
        'x-real-ip': '198.168.100.54'
      }
    }
    console.log(ipbase.getClientAddress(req));
    // > 198.168.100.54
  ```
 * @example getClientAddress():x-forwarded-for
  ```js
    var req = {
      headers: {
        'x-forwarded-for': '198.168.100.54'
      }
    }
    console.log(ipbase.getClientAddress(req));
    // > 198.168.100.54
  ```
 * @example getClientAddress():connection.remoteAddress
  ```js
    var req = {
      connection: {
        remoteAddress: '198.168.100.54'
      }
    }
    console.log(ipbase.getClientAddress(req));
    // > 198.168.100.54
  ```
 * @example getClientAddress():socket.remoteAddress
  ```js
    var req = {
      socket: {
        remoteAddress: '198.168.100.54'
      }
    }
    console.log(ipbase.getClientAddress(req));
    // > 198.168.100.54
  ```
 * @example getClientAddress():connection.socket.remoteAddress
  ```js
    var req = {
      connection: {
        socket: {
          remoteAddress: '198.168.100.54'
        }
      }
    }
    console.log(ipbase.getClientAddress(req));
    // > 198.168.100.54
  ```
 * @example getClientAddress():null
  ```js
    var req = {}
    console.log(ipbase.getClientAddress(req));
    // > undefined
  ```
 */
function getClientAddress(req) {
  // https://stackoverflow.com/questions/8107856/how-to-determine-a-users-ip-address-in-node
  return (req.headers && (req.headers['x-real-ip'] || req.headers['x-forwarded-for'])) ||
    (req.connection && req.connection.remoteAddress) ||
    (req.socket && req.socket.remoteAddress) ||
    (req.connection && req.connection.socket && req.connection.socket.remoteAddress);
}
exports.getClientAddress = getClientAddress;