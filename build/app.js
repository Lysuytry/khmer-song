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

var _query = require('./common/query');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const app = (0, _express2.default)();

app.use((0, _morgan2.default)('dev'));
app.use(_bodyParser2.default.json());
app.use(_bodyParser2.default.urlencoded({ extended: false }));

app.use((req, res, next) => {
    //bind query
    (0, _query.fliterQuery)(req);
    //for response success
    res.success = (data, options, code = 200) => {
        return typeof data === 'object' ? res.status(code).json({ data, options }) : res.status(code).json(data);;
    };
    //for response error
    res.fail = (message, code = 500) => {
        return res.status(code).json(message);
    };
    //parse to next
    next();
});

app.get('/', (req, res) => {
    console.log('hello from route 1');
    return res.json({ something: 'sssss' });
});

exports.default = app;
//# sourceMappingURL=app.js.map