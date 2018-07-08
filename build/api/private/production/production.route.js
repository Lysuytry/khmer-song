'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _production = require('./production.api');

var _production2 = require('./production.middleware');

const routeProduction = (0, _express.Router)();

routeProduction.get('/', _production.getProductionList);
routeProduction.post('/', _production2.validateProductionCreating, _production.createProduction);
routeProduction.get('/:id', _production.getProductionById);
routeProduction.put('/:id', _production2.validateProductionUpdating, _production.updateProductionById);
routeProduction.delete('/:id', _production.deleteProductionById);

exports.default = routeProduction;
//# sourceMappingURL=production.route.js.map