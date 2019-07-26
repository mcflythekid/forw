const { SMTPServer } = require('smtp-server');
const nodeMailer = require('nodemailer');

const { host, port, username, password } = require('./config').smtp;
const { forwards, hotword, sender, from, to } = require('./config').alert;

const send = initor=>{
    const content = 'This is a trigger email';
    const mailOptions = {
        from: `"${sender}" <${from}>`,
        to, // list of receivers
        subject: `${hotword}:${initor}`, // Subject line
        text: content, // plain text body
        html: `<b>${content}</b>` // html body
    };
    
    const transporter = nodeMailer.createTransport({ 
        host, 
        port,
        secure: false,  //true for 465 port, false for other ports
    });

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
        } else {
            res.status(200).send({success: true});
        }
    });
};

(new SMTPServer({
    // disable STARTTLS to allow authentication in clear text mode
    //disabledCommands: ['STARTTLS', 'AUTH'],
    //logger: false,
    onMailFrom(address, session, callback) {
        console.log(`New email arrived from: ${address.address}`)
        if (forwards.includes(address.address)) {
            send(address.address);
            return callback();
        };
        return callback(
            new Error(`Only ${forwards} is allowed to forward`)
        );
      }
})).listen(port);
