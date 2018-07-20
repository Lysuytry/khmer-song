'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _firebaseAdmin = require('firebase-admin');

var _firebaseAdmin2 = _interopRequireDefault(_firebaseAdmin);

var _myMessage925b6FirebaseAdminsdkZwbecC21bfefd = require('./my-message-925b6-firebase-adminsdk-zwbec-c21bfefd00.json');

var _myMessage925b6FirebaseAdminsdkZwbecC21bfefd2 = _interopRequireDefault(_myMessage925b6FirebaseAdminsdkZwbecC21bfefd);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const { DBURL } = process.env;

_firebaseAdmin2.default.initializeApp({
  credential: _firebaseAdmin2.default.credential.cert(_myMessage925b6FirebaseAdminsdkZwbecC21bfefd2.default),
  databaseURL: DBURL
});

exports.default = _firebaseAdmin2.default;
//# sourceMappingURL=fcm.js.map