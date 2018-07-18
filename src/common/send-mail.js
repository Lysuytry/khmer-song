import nodemailer from 'nodemailer';

const { PASSWORD, EMAIL } = process.env;

// export const sendEMail = async data => {
//   const auth = { user: EMAIL, pass: PASSWORD };
//   const { to, code } = data;
//   // create reusable transport method (opens pool of SMTP connections)
//   const transporter = nodemailer.createTransport({
//     service: 'gmail',
//     auth
//   });

//   // setup e-mail data with unicode symbols
//   var mailOptions = {
//     from: `Khmer-Song.com <suytry.ly@gmail.com>`, // sender address
//     to, // list of receivers
//     subject: `Register Code`, // Subject line
//     text: `Khmer-Song Registration Verify`, // plaintext body
//     html: `Your register code is ${code} please copy it.` // html body
//   };
//   const verify = await transporter.verify();
//   console.log(verify);
//   // send mail with defined transport object
//   await transporter.sendMail(mailOptions);
// };
