const dns = require("dns").promises;

async function getMXRecords(domain) {

    try {
        const records = await dns.resolveMx(domain);

        // sort by priority
        records.sort((a, b) => a.priority - b.priority);

        return {
            success: true,
            mxRecords: records.map(record => record.exchange)
        };

    } catch (error) {

        return {
            success: false,
            mxRecords: [],
            error: error.message
        };
    }
}

module.exports = getMXRecords;