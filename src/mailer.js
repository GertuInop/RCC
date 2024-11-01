require('dotenv').config();
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
    }
});

const mailOption = {
    from: 'ksxw725@gmail.com',
    to: 'byckovivan1601@gmail.com',
    subject: 'Тест',
    text: 'Проверка Node.js'
}

// transporter.sendMail(mailOption);

// const mailer = message => {
//     transporter.sendMail(message, (err, info) => {
//         if (err) return console.log(err);
//         console.log('Email sent: ', info);
//     });
// };

// module.exports = mailer;