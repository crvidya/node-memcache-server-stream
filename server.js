var net = require('net')
,lruCache = require('lru-cache')
,mc = require('./index.js')
;

module.exports = function(cache){

  cache = cache||lruCache(1000000,function (item) { return item.length });

  var server = net.createServer(function(con){
    
    con.pipe(mc(cache)).pipe(con);
    con.resume();
    
  });

  return server;
}






