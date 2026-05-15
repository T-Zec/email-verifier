const express = require('express');
const validateEmailSyntax = require("./utils/emailValidator");
const getMXRecords = require("./services/mxLookup");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
    res.json({
        message: "Welcome to Email Verifier API"
    });
});

app.post("/validate", (req, res) => {
    const { email } = req.body;

    const result = validateEmailSyntax(email);

    res.json(result);
});

app.post("/mx-check", async (req, res) => {

    try {

        const { email } = req.body;

        if (!email) {
            return res.status(400).json({
                error: "Email is required"
            });
        }

        const domain = email.split("@")[1];

        const result = await getMXRecords(domain);

        res.json({ domain, ...result });

    } catch (error) {

        res.status(500).json({
            error: error.message
        });
        
    }
});

module.exports = app;