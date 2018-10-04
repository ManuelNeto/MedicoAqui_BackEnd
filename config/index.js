'use strinct';

global.SALT_KEY = '9a1b3589-0084-46c3-a211-bf863ceaa7a7' 


var env = process.env.NODE_ENV || 'development';
var config = require(`./${env}`);

module.exports = config;