'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _production = require('./production.api');

const routeProduction = (0, _express.Router)();

routeProduction.get('/', _production.getProductionList);

exports.default = routeProduction;
//# sourceMappingURL=production.route.js.map