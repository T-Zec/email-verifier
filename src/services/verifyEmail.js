const validateEmailSyntax = require("../utils/emailValidator");
const getMXRecords = require("./mxLookup");
const verifyMailbox = require("./smtpVerifier");
const getDidYouMean = require("./typoDetection");

async function verifyEmail(email) {

    const startTime = Date.now();
    const timestamp = new Date().toISOString();

    try {

        // STEP 1 — syntax validation
        const syntaxCheck = validateEmailSyntax(email);

        if (!syntaxCheck.valid) {

            return {
                email,
                result: "invalid",
                resultcode: 6,
                subresult: "invalid_syntax",
                domain: null,
                mxRecords: [],
                didyoumean: null,
                executiontime: getExecutionTime(startTime),
                error: syntaxCheck.message,
                timestamp
            };
        }

        // STEP 2 — typo detection
        const suggestion = getDidYouMean(email);

        if (suggestion) {

            return {
                email,
                result: "invalid",
                resultcode: 6,
                subresult: "typo_detected",
                domain: email.split("@")[1],
                mxRecords: [],
                didyoumean: suggestion,
                executiontime: getExecutionTime(startTime),
                error: "Possible typo detected",
                timestamp
            };
        }

        // STEP 3 — extract domain
        const domain = email.split("@")[1];

        // STEP 4 — MX lookup
        const mxResult = await getMXRecords(domain);

        if (!mxResult.success) {

            return {
                email,
                result: "invalid",
                resultcode: 6,
                subresult: "mx_lookup_failed",
                domain,
                mxRecords: [],
                didyoumean: null,
                executiontime: getExecutionTime(startTime),
                error: mxResult.error,
                timestamp
            };
        }

        // STEP 5 — SMTP verification
        const smtpResult = await verifyMailbox(
            mxResult.mxRecords[0],
            email
        );

        // FINAL RESPONSE
        return {
            email,
            result: smtpResult.result,
            resultcode: smtpResult.resultcode,
            subresult: smtpResult.subresult,
            domain,
            mxRecords: mxResult.mxRecords,
            didyoumean: null,
            executiontime: getExecutionTime(startTime),
            error: smtpResult.error,
            timestamp
        };

    } catch (error) {

        return {
            email,
            result: "unknown",
            resultcode: 3,
            subresult: "internal_error",
            domain: null,
            mxRecords: [],
            didyoumean: null,
            executiontime: getExecutionTime(startTime),
            error: error.message,
            timestamp
        };
    }
}

function getExecutionTime(startTime) {

    return Number(((Date.now() - startTime) / 1000).toFixed(2));
}

module.exports = verifyEmail;