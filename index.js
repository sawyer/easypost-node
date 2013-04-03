
//     easypostjs
//     Copyright (c) 2013- Teelaunch, LLC. <support@teelaunch.com> (https://teelaunch.com)
//     MIT Licensed

// # easypostjs

// Here are the `easypost` methods returned from using `require('easypostjs')`.
//
// You _must_ pass `your-api-key` string from <https://www.geteasypost.com/user>.
//  (e.g. `var easypost = require('easypostjs')('your-api-key')`)
//
// All methods returned use a callback (`cb`), as their last parameter.
//  This `cb` is called with an error code (if any) and then the response.
//
// You _must_ refer to <https://www.geteasypost.com/docs> for your `data` objects.

var querystring = require('querystring')
  , path        = require('path')
  , version     = require('./package').version
  , https       = require('https')

function responseHandler(req, callback) {

  if (typeof callback !== "function")
    return console.error('missing callback')

  req.on('response', function(res) {
    var response = ''
    res.setEncoding('utf8')
    res.on('data', function(chunk) {
      response += chunk
    })
    res.on('end', function() {
      var err = 200 === res.statusCode ? null : res.statusCode
      try {
        response = JSON.parse(response)
      }
      catch(e) {
        err = 1
        response = { error : { message : "easypost - invalid json response" } }
      }
      if (err) err = { statusCode: err, response: response }
      callback(err, response)
    })
  })
}

module.exports = function(apiKey) {

  if (typeof apiKey !== 'string')
    return console.error('easypost - `apiKey` not defined')

  function prepareRequest(method, path, data, cb) {

    if (typeof cb !== 'function')
      return console.error('easypost - missing callback')

    Object.keys(data).forEach(function(key) {
      if (typeof data[key] === 'object' && data[key] !== null) {
        var o = data[key];
        delete data[key]
        Object.keys(o).forEach(function(k) {
          var new_key = key + "[" + k + "]"
          data[new_key] = o[k]
        })
      }
    })

    // TODO: improve this with qs.stringify(data)
    var requestData = querystring.stringify(data)

    var headers = {
        'Accept'           : 'application/json'
      , 'User-Agent'       : 'easypostjs'
      , 'X-Node-EasyPost' : version
    }

    var post = false
    switch (method) {
      case 'POST':
        headers['Content-Length'] = requestData.length
        headers['Content-Type']   = 'application/x-www-form-urlencoded; charset=UTF-8'
        post = true
        break
      case 'GET':
        path = path + '?' + requestData
        break
    }

    var requestOptions = {
        host    : 'www.geteasypost.com'
      , port    : '443'
      , path    : path
      , auth    : apiKey + ':'
      , method  : method
      , headers : headers
    }

    var req = https.request(requestOptions)
    responseHandler(req, cb)
    if (post) req.write(requestData)
    req.end()

  }

  // # Methods
  var get = function(path, data, cb) {
    prepareRequest('GET', path, data, cb)
  }

  var post = function(path, data, cb) {
    prepareRequest('POST', path, data, cb)
  }

  return {

    // # Address
    address: {
      verify: function(data, cb) {
        get('/api/address/verify', data, cb)
      }
    },

    // # Postage
    postage: {
      rates: function(data, cb) {
        get('/api/postage/rates', data, cb)
      },
      buy: function(data, cb) {
        post('/api/postage/buy', data, cb)
      },
      get: function(data, cb) {
        get('/api/postage/get', data, cb)
      }
    }

    // TODO: iterate

  }

}
