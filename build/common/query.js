'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
const fliterQuery = exports.fliterQuery = req => {
  const { limit, offset, status } = req.body;
  req.body.limit = limit > 20 ? 20 : +limit;
  req.body.offset = offset ? 0 : +offset;
  req.body.status = status ? status : 'active';
};
//# sourceMappingURL=query.js.map