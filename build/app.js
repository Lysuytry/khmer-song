'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

require('dotenv/config');

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _morgan = require('morgan');

var _morgan2 = _interopRequireDefault(_morgan);

var _admin = require('./api/private/admin');

var _admin2 = _interopRequireDefault(_admin);

var _public = require('./api/public/public');

var _public2 = _interopRequireDefault(_public);

var _query = require('./common/query');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const app = (0, _express2.default)();

const { ENDPOINT } = process.env;

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

app.use(`${ENDPOINT}/admin`, _admin2.default);
app.use(`${ENDPOINT}/`, _public2.default);

exports.default = app;
//# sourceMappingURL=app.js.map