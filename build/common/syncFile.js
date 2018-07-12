'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.readFile = undefined;

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const readFile = exports.readFile = path => {
  return _fs2.default.readFileSync(path, 'utf-8');
};
//# sourceMappingURL=syncFile.js.map