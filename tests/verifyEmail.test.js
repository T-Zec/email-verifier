const validateEmailSyntax = require("../src/utils/emailValidator");

describe("Email Syntax Validation", () => {
    
    test("Valid email should pass", () => {
        const result = validateEmailSyntax("test@gmail.com");

        expect(result.valid).toBe(true);
    });

    test("Missing @ should fail", () => {
        const result = validateEmailSyntax("tetsgmail.com");

        expect(result.valid).toBe(false);
    });

    test("Multiple @ should fail", () => {
        const result = validateEmailSyntax("test@@gmail.com");

        expect(result.valid).toBe(false);
    });

    test("Double dots should fail", () => {
        const result = validateEmailSyntax("test..abcgmail.com");

        expect(result.valid).toBe(false);
    });

    test("Empty string should fail", () => {
        const result = validateEmailSyntax("");

        expect(result.valid).toBe(false);
    });

    test("Null email should fail", () => {
        const result = validateEmailSyntax(null);

        expect(result.valid).toBe(false);
    });

    test("Undefined email should fail", () => {
        const result = validateEmailSyntax(undefined);

        expect(result.valid).toBe(false);
    });

    test("Email with spaces should fail", () => {
        const result = validateEmailSyntax("test @gmail.com");

        expect(result.valid).toBe(false);
    });
});