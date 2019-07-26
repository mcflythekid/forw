const nodeMailer = require('nodemailer');

let transporter = nodeMailer.createTransport({
    host: 'localhost',
    port: 26,
    secure: false,  //true for 465 port, false for other ports
});

// setup email data with unicode symbols
let mailOptions = {
    from: '"VBoss" <odopoc@gmail.com>', // sender address
    to: 'odopoc@mservice', // list of receivers
    subject: 'Hello ✔', // Subject line
    text: 'Hello world?', // plain text body
    html: '<b>Hello world?</b>' // html body
};

transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        console.log(error);
    } else {
        res.status(200).send({success: true});
    }
});