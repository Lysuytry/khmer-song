'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.readFileSyn = exports.readFile = undefined;

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const readFile = exports.readFile = path => {
  return _fs2.default.readFileSync(path, 'utf-8');
};

const readFileSyn = exports.readFileSyn = path => {
  return new Promise((resolve, reject) => {
    _fs2.default.readFile(path, 'utf-8', (err, data) => {
      err ? reject(err) : resolve(data);
    });
  });
};
//# sourceMappingURL=syncFile.js.map