'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _category = require('./category.api');

var _category2 = require('./category.middleware');

const routeCategory = (0, _express.Router)();

routeCategory.get('/', _category.getCategoryList);
routeCategory.post('/', _category2.validatCategoryCreating, _category.createCategory);
routeCategory.get('/:id', _category.getCategoryById);
routeCategory.put('/:id', _category2.validatCategoryUpdating, _category.updateCategoryById);
routeCategory.delete('/:id', _category.deleteCategory);

exports.default = routeCategory;
//# sourceMappingURL=category.route.js.map