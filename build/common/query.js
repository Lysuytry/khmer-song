'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
const fliterQuery = exports.fliterQuery = req => {
  const { limit = 20, offset = 0, status = 'active' } = req.query;
  req.query.limit = limit > 20 ? 20 : +limit;
  req.query.offset = +offset;
  req.query.status = status;
};
//# sourceMappingURL=query.js.map