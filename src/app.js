const express = require('express');
const validateEmailSyntax = require("./utils/emailValidator");

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

module.exports = app;