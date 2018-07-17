'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sendEMail = undefined;

var _nodemailer = require('nodemailer');

var _nodemailer2 = _interopRequireDefault(_nodemailer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const { PASSWORD, EMAIL } = process.env;

const sendEMail = exports.sendEMail = async data => {
  const auth = { user: EMAIL, pass: PASSWORD };
  const { to, code } = data;
  // create reusable transport method (opens pool of SMTP connections)
  const transporter = _nodemailer2.default.createTransport({
    service: 'gmail',
    auth
  });

  // setup e-mail data with unicode symbols
  var mailOptions = {
    from: `Khmer-Song.com <suytry.ly@gmail.com>`, // sender address
    to, // list of receivers
    subject: `Register Code`, // Subject line
    text: `Khmer-Song Registration Verify`, // plaintext body
    html: `Your register code is ${code} please copy it.` // html body
  };
  const verify = await transporter.verify();
  console.log(verify);
  // send mail with defined transport object
  await transporter.sendMail(mailOptions);
};
//# sourceMappingURL=send-mail.js.map