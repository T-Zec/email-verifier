const getMXRecords = require("../src/services/mxLookup");

describe("MX Lookup", () => {

    test("gmail.com should have MX records", async () => {

        const result = await getMXRecords("gmail.com");

        expect(result.success).toBe(true);
        expect(result.mxRecords.length).toBeGreaterThan(0);
    });

    test("fake domain shoul fail", async () => {
        const result = await getMXRecords("fakexyz123.com");

        expect(result.success).toBe(false);
    });
});