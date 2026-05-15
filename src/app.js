const express = require('express');
// const validateEmailSyntax = require("./utils/emailValidator");
// const getMXRecords = require("./services/mxLookup");
// const verifyMailbox = require("./services/smtpVerifier");
// const getDidYouMean = require("./services/typoDetection");
const verifyEmail = require("./services/verifyEmail");

const app = express();

app.use(express.json());

// Basic route for testing
app.get("/", (req, res) => {
    res.json({
        message: "Welcome to Email Verifier API"
    });
});

// Verify email endpoint (full flow)
app.post("/verify", async (req, res) => {

    try {
        const { email } = req.body;
        
        if (!email) {
            return res.status(400).json({
                error: "Email is required"
            });
        }

        const result = await verifyEmail(email);

        res.json(result);
    } catch (error) {

        res.status(500).json({
            error: error.message
        });
    }
});

/* ####################### Individual Endpoints ####################### */

// // Email verification endpoint
// app.post("/validate", (req, res) => {
//     const { email } = req.body;
//     const result = validateEmailSyntax(email);

//     res.json(result);
// });

// // MX record lookup endpoint
// app.post("/mx-check", async (req, res) => {
//     try {
        
//         const { email } = req.body;

//         if (!email) {
//             return res.status(400).json({
//                 error: "Email is required"
//             });
//         }

//         const domain = email.split("@")[1];
//         const result = await getMXRecords(domain);

//         res.json({ domain, ...result });

//     } catch (error) {
//         res.status(500).json({
//             error: error.message
//         });        
//     }
// });

// // SMTP verification endpoint
// app.post("/smtp-check", async (req, res) => {
//     try {
//         const { email, mxRecord } = req.body;

//         if (!email || !mxRecord) {
//             return res.status(400).json({
//                 error: "Email and mxRecord are required"
//             });
//         }

//         const result = await verifyMailbox(mxRecord, email);

//         res.json(result);
//     } catch (error) {
//         res.status(500).json({
//             error: error.message
//         });
//     }
// });

// // Did You Mean endpoint
// app.post("/did-you-mean", (req, res) => {

//     try {
//         const { email } = req.body;
//         const suggestion = getDidYouMean(email);

//         res.json({
//             original: email,
//             didyoumean: suggestion
//         });
//     } catch (error) {
//         res.status(500).json({
//             error: error.message
//         });
//     }
// });

module.exports = app;