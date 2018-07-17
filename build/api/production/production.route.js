'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _production = require('./production.api');

const routeProduction = (0, _express.Router)();

routeProduction.get('/', _production.getProductionList);
routeProduction.get('/:id/albums', _production.getAlbumFromProductionById);

exports.default = routeProduction;
//# sourceMappingURL=production.route.js.map