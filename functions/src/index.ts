// import * as functions from 'firebase-functions';

const functions = require('firebase-functions');
const cors = require('cors')({ origin: true});

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

exports.uploadFile = functions.https.onRequest((req: any, res: any) => {
    if (req.method !== 'POST') {
        return req.status(500).json({
            messgae: 'Not Allowed'
        });
    }
    res.status(200).json({
        message: 'It worked'
    })
});