function validateEmailSyntax(email) {

    // null / undefined check
    if (!email || typeof email !== "string") {
        return {
            valid: false,
            message: "Email is required"
        };
    }

    // trim spaces
    email = email.trim();

    // length check
    if (email.length > 256) {
        return {
            valid: false,
            message: "Email is too long"
        };
    }

    // spaces check
    if (email.includes(" ")) {
        return {
            valid: false,
            message: "Email cannot contain spaces"
        };
    }

    // multiple @ check
    const atCount = (email.match(/@/g) || []).length;

    if (atCount !== 1) {
        return {
            valid: false,
            message: "Email must contain exactly one @ symbol"
        };
    }

    // double dots check
    if (email.includes("..")) {
        return {
            valid: false,
            message: "Email cannot contain consecutive dots"
        };
    }

    // regex validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
        return {
            valid: false,
            message: "Invalid email format"
        };
    }

    return {
        valid: true,
        message: "Valid email syntax"
    };
}

module.exports = validateEmailSyntax;