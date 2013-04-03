
//     easypostjs
//     Copyright (c) 2013- Teelaunch, LLC. <support@teelaunch.com> (https://teelaunch.com)
//     MIT Licensed

// # test - address

var vows         = require('vows')
  , assert       = require('assert')
  , fs           = require('fs')
  , path         = require('path')
  , apiKey       = process.env.EASYPOST

if (!apiKey)
  throw new Error('missing EASYPOST apiKey')

var easypost = require('../')(apiKey)

vows.describe('address').addBatch({

  'verify an address': {

    topic: function() {
      var that = this
      easypost.address.verify({
        address: {
            street1: 'PO Box 835'
          , street2: ''
          , city: 'Greensburg'
          , state: 'PA'
          , zip: '15601'
        }
      }, that.callback)
    }, 'returns response': function(err, response) {
      console.log('err', err)
      console.log('response', response)
      assert.isNull(err);
      assert.isDefined(response);
      //assert.isDefined(response.id);
    }

  }

}).export(module, { error: false })
