let chai = require('chai');

global.chai = chai;
global.sinon = require('sinon');
global.chai.use(require('sinon-chai'));
global.should = chai.should();

require('babel-core/register');
require('./setup')();
