'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _category = require('./category.api');

const routeCategory = (0, _express.Router)();

routeCategory.get('/', _category.getCategoryList);

exports.default = routeCategory;
//# sourceMappingURL=category.route.js.map