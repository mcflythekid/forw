const { SMTPServer } = require('smtp-server');
const nodeMailer = require('nodemailer');
const moment = require('moment');

const { host, port, username, password } = require('./config').smtp;
const { receiver, hotword, sender, from, to } = require('./config').alert;

const send = ()=>{
    const content = `${moment().format()}`;
    const mailOptions = {
        from: `"${sender}" <${from}>`,
        to, // list of receivers
        subject: `${hotword}`, // Subject line
        text: content, // plain text body
        html: `<b>${content}</b>` // html body
    };
    
    const transporter = nodeMailer.createTransport({ 
        sendmail: true,
        newline: 'unix',
        path: '/usr/sbin/sendmail'
    });

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error(error);
        } else {
            console.log('Email dispatched!');
        }
    });
};

(new SMTPServer({
    // disable STARTTLS to allow authentication in clear text mode
    disabledCommands: ['STARTTLS', 'AUTH'],
    logger: false,
    onData(stream, session, callback){
        stream.pipe(process.stdout); // print message to console
        stream.on('end', callback);
    },
    onRcptTo(address, session, callback) {
        if (receiver === address.address) {
            send();
            return callback();
        };
        return callback(
            new Error(`Only ${forwards} is allowed to forward`)
        );
      }
})).listen(port);
