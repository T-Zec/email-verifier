const express = require('express');
const verifyEmail = require("./services/verifyEmail");

const app = express();

app.use(express.json());

// Basic route for testing
app.get("/", (req, res) => {
    res.json({
        message: "Email Verification API Running"
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

module.exports = app;