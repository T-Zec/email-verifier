const verifyEmail = require("../src/services/verifyEmail");

describe("Final Email Verification Flow", () => {

    test("Invalid syntax should return invalid", async () => {
        const result = await verifyEmail("abc@@gmail.com");

        expect(result.result).toBe("invalid");
    });

    test("Typo email should detect suggestion", async () => {
        const result = await verifyEmail("user@gmial.com");

        expect(result.subresult).toBe("typo_detected");
    });

    test("Valid structure should include timestamp", async () => {

        const result = await verifyEmail("test@gmail.com");

        expect(result).toHaveProperty("timestamp");
    });
    
});