var AWS = require('aws-sdk');
var camelCase = require('camel-case');

module.exports = Object.keys(
  AWS.apiLoader(
    AWS.S3.serviceIdentifier,
    '2006-03-01'
  ).operations
).map(camelCase);
