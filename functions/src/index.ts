
// import * as functions from 'firebase-functions';
const functions = require('firebase-functions');
const cors = require('cors')({ origin: true});
const https = require('https');
const bent = require('bent')

// load environment files
require('dotenv').config();


/* TODO: https://stackoverflow.com/questions/42755131/enabling-cors-in-cloud-functions-for-firebase */
exports.reCaptcha = functions.https.onRequest(async (req: any, res: any) => {
    res.set('Access-Control-Allow-Origin', '*');
    if (req.method !== 'POST') {
        return res.status(500).json({
            message: 'Not Allowed'
        })
    }
    const params = req.url
    const response = params.substring(params.indexOf("=") + 1, params.length);

    const post = bent(
        `https://recaptcha.google.com/recaptcha/api/siteverify?secret=${process.env.API_KEY}&response=${response}`,
        'POST',
        'json',
        200
    );
    const postResp = await post('');

    res.status(200).json(postResp);
});


