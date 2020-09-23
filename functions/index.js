const functions = require('firebase-functions');
const nodemailer = require("nodemailer");

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'tsonthaliaWebsite@gmail.com',
        pass: 'tanay1234'
    }
});

exports.sendEmail = functions.firestore.document('/emails/{documentId}')
    .onCreate((snapshot, context) => {
        // Grab the current value of what was written to Cloud Firestore.
        console.log(snapshot.data());

        let mailOptions = {
            from: snapshot.data().from,
            to: snapshot.data().to,
            subject: snapshot.data().message.subject,
            html: "Name: " + snapshot.data().name + "<br>" + snapshot.data().message.text,
            // html: "Message ID: " + snapshot.id + "<br>Name: " + snapshot.data().name + "<br>Email: " + snapshot.data().from + "<br>" + snapshot.data().message.text,
        };

        transporter.sendMail(mailOptions, function(error, info){
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });
    });
