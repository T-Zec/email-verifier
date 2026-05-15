const { SMTPClient } = require("smtp-client");

async function verifyMailbox(mxRecord, email) {
    
    const client = new SMTPClient({
        host: mxRecord,
        port: 25,
        timeout: 10000
    });

    try {

        // connect to SMTP server
        console.log("Connecting to SMTP server...");
        await client.connect();
        console.log("SMTP connection successful");

        // intorduce
        await client.greet({
            hostname: "localhost"
        });

        // fake sender email
        await client.mail({
            from: "verify@example.com"
        });

        // check recipient 
        console.log("Checking recipient...");
        await client.rcpt({
            to: email
        });

        // success if mailbox exists
        await client.quit();

        return {
            result: "valid",
            resultcode: 1,
            subresult: "mailbox_exists",
            error: null
        };
    
    } catch (error) {

        // SMTP resposne code
        const code = error.code || 0;

        // mailbox doesn't exists
        if (code === 550) {
            return {
                result: "invalid",
                resultcode: 6,
                subresult: "mailbox_does_not_exist",
                error: error.message
            };
        }

        // grelisted / temp failure
        if (code === 450 || code === 421) {
            return {
                result: "unknown",
                resultcode: 3,
                subresult: "greylisted",
                error: error.message
            };
        }

        // timeout or connection error
        return {
            result: "unknown",
            resultcode: 3,
            subresult: "connection_error",
            error: error.message
        };
    } finally {
        try {
            await client.quit();
        } catch (e) {}
    }
}

module.exports = verifyMailbox;