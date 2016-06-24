'use strict';

// flint
const Flint = require('flint');

// AWS
var AWS = require('aws-sdk');
var s3Functions = require('./s3Functions');

var S3 = {
  name: 'S3',

  configure(config) {
    config = config || {};

    this.setState({
      s3Options: config.s3Options
    });
  },

  initialize(cb) {
    this.setState({
      _s3: new AWS.S3(this.s3Options)
    });

    cb();
  }
};

s3Functions.forEach((fnName) => {
  S3[fnName] = function(ctx, options /*, ...args*/) {
    let args = [];
    if (arguments.length > 2) {
      args = Array.prototype.slice.call(arguments, 2);
    }
    const s3 = this._s3;
    s3[fnName].apply(s3, args);
  }
});

module.exports = Flint.Component.define(S3);
