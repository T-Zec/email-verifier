const verifyMailbox = require("../src/services/smtpVerifier");

jest.mock("smtp-client", () => {
    return {
        SMTPClient: jest.fn().mockImplementation(() => ({
            connect: jest.fn().mockResolvedValue(),
            greet: jest.fn().mockResolvedValue(),
            mail: jest.fn().mockResolvedValue(),
            rcpt: jest.fn().mockResolvedValue(),
            quit: jest.fn().mockResolvedValue()
        }))
    };
});

describe("SMTP Verification", () => {

    test("Valid mailbox should return valid result", async () => {

        const result = await verifyMailbox(
            "gmail-smtp-in.l.google.com",
            "test@gmail.com"
        );

        expect(result.result).toBe("valid");
    });

});