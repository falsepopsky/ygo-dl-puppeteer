import * as dotenv from 'dotenv';
import { resolve } from 'path';

dotenv.config({ path: resolve(__dirname, '../../../.env') });

import nodemailer from 'nodemailer';

let transporter = nodemailer.createTransport({
  host: 'smtp.ethereal.email',
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL_USER, // generated ethereal user
    pass: process.env.EMAIL_PASSWORD, // generated ethereal password
  },
});

let mailOptions = {
  from: 'no-reply@node-mailer.com',
  to: process.env.EMAIL_RECEIVER, // list of receivers
  subject: 'Data from the Box', // Subject line
  text: '', // plain text body
};

let info = transporter.sendMail(mailOptions, function (err, data) {
  if (err) {
    console.error(err);
  } else {
    console.log('email sent');
  }
});
