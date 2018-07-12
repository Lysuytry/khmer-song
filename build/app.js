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

var _admin = require('./api/admin/admin');

var _admin2 = _interopRequireDefault(_admin);

var _artist = require('./api/artist/artist.route');

var _artist2 = _interopRequireDefault(_artist);

var _auth = require('./api/auth/auth.route');

var _auth2 = _interopRequireDefault(_auth);

var _production = require('./api/production/production.route');

var _production2 = _interopRequireDefault(_production);

var _playlist = require('./api/playlist/playlist.route');

var _playlist2 = _interopRequireDefault(_playlist);

var _song = require('./api/song/song.route');

var _song2 = _interopRequireDefault(_song);

var _query = require('./common/query');

var _admin3 = require('./api/admin/admin.middleware');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const app = (0, _express2.default)();
//checkfunction is from admin middleware to check token user admin


const { ENDPOINT } = process.env;

app.use((0, _morgan2.default)('dev'));
app.use(_bodyParser2.default.json());
app.use(_bodyParser2.default.urlencoded({ extended: false }));

app.use((req, res, next) => {
  //bind query
  (0, _query.fliterQuery)(req);
  //for response success
  res.success = (data, options, code = 200) => {
    return typeof data === 'object' ? options ? res.status(code).json({ data, options }) : res.status(code).json(data) : res.status(code).json({ message: data });
  };
  //for response error
  res.fail = (message, code = 500) => {
    console.log(message.statck);
    return res.status(code).json({ message });
  };
  //parse to next
  next();
});

app.use(`${ENDPOINT}/`, _auth2.default);
app.use(`${ENDPOINT}/admin`, _admin3.checkToken, _admin2.default);
app.use(`${ENDPOINT}/songs`, _song2.default);
app.use(`${ENDPOINT}/artists`, _artist2.default);
app.use(`${ENDPOINT}/playlist`, _admin3.checkTokenForGuest, _playlist2.default);
app.use(`${ENDPOINT}/productions`, _production2.default);

exports.default = app;
//# sourceMappingURL=app.js.map