const ipbase = require('../');


describe("src/index.js", function () {
  var assert = require('should');
  var util = require('util');
  var examplejs_printLines;
  function examplejs_print() {
    examplejs_printLines.push(util.format.apply(util, arguments));
  }
  
  

  it("ipInList():base", function () {
    examplejs_printLines = [];
    ipbase.ipInList('127.0.0.1');
    ipbase.ipInList(null, '127.0.0.1');

    examplejs_print(ipbase.ipInList('127.0.0.1', '127.0.0.1'));
    assert.equal(examplejs_printLines.join("\n"), "true"); examplejs_printLines = [];

    examplejs_print(ipbase.ipInList('127.0.0.1', ['127.0.0.1', '10.10.110.10']));
    assert.equal(examplejs_printLines.join("\n"), "true"); examplejs_printLines = [];
  });
          
  it("ipInList():CIDR", function () {
    examplejs_printLines = [];
    examplejs_print(ipbase.ipInList('10.10.110.59', ['127.0.0.1', '10.10.110.0/24']));
    assert.equal(examplejs_printLines.join("\n"), "true"); examplejs_printLines = [];
  });
          
  it("getClientAddress():x-real-ip", function () {
    examplejs_printLines = [];
    var req = {
      headers: {
        'x-real-ip': '198.168.100.54'
      }
    }
    examplejs_print(ipbase.getClientAddress(req));
    assert.equal(examplejs_printLines.join("\n"), "198.168.100.54"); examplejs_printLines = [];
  });
          
  it("getClientAddress():x-forwarded-for", function () {
    examplejs_printLines = [];
    var req = {
      headers: {
        'x-forwarded-for': '198.168.100.54'
      }
    }
    examplejs_print(ipbase.getClientAddress(req));
    assert.equal(examplejs_printLines.join("\n"), "198.168.100.54"); examplejs_printLines = [];
  });
          
  it("getClientAddress():connection.remoteAddress", function () {
    examplejs_printLines = [];
    var req = {
      connection: {
        remoteAddress: '198.168.100.54'
      }
    }
    examplejs_print(ipbase.getClientAddress(req));
    assert.equal(examplejs_printLines.join("\n"), "198.168.100.54"); examplejs_printLines = [];
  });
          
  it("getClientAddress():socket.remoteAddress", function () {
    examplejs_printLines = [];
    var req = {
      socket: {
        remoteAddress: '198.168.100.54'
      }
    }
    examplejs_print(ipbase.getClientAddress(req));
    assert.equal(examplejs_printLines.join("\n"), "198.168.100.54"); examplejs_printLines = [];
  });
          
  it("getClientAddress():connection.socket.remoteAddress", function () {
    examplejs_printLines = [];
    var req = {
      connection: {
        socket: {
          remoteAddress: '198.168.100.54'
        }
      }
    }
    examplejs_print(ipbase.getClientAddress(req));
    assert.equal(examplejs_printLines.join("\n"), "198.168.100.54"); examplejs_printLines = [];
  });
          
  it("getClientAddress():null", function () {
    examplejs_printLines = [];
    var req = {}
    examplejs_print(ipbase.getClientAddress(req));
    assert.equal(examplejs_printLines.join("\n"), "undefined"); examplejs_printLines = [];
  });
          
});
         