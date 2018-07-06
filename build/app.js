'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _morgan = require('morgan');

var _morgan2 = _interopRequireDefault(_morgan);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

require('dotenv/config');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const app = (0, _express2.default)();

app.use((0, _morgan2.default)('dev'));
app.use(_bodyParser2.default.json());
app.use(_bodyParser2.default.urlencoded({ extended: false }));

app.use((req, res, next) => {
    //1
    console.log('it is the first middleware that must go through before other');
    next();
});

app.get('/', (req, res) => {
    //2
    console.log('hello from route 1');
    return res.json({ something: 'sssss' });
    // return ....
});

exports.default = app;
//# sourceMappingURL=app.js.map