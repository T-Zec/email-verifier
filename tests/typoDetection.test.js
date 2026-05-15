const getDidYouMean = require("../src/services/typoDetection");

describe("Did You Mean Detection", () => {

    test("gmial.com should suggest gmail.com", () => {
        const result = getDidYouMean("user@gmial.com");

        expect(result).toBe("user@gmail.com");
    });

    test("yahooo.com should suggest yahoo.com", () => {
        const result = getDidYouMean("user@yahooo.com");

        expect(result).toBe("user@yahoo.com");
    });

    test("correct domain should return null", () => {
        const result = getDidYouMean("user@outlook.com");

        expect(result).toBeNull();
    });

    test("invalid email format should return null", () => {
        const result = getDidYouMean("invalid-email");

        expect(result).toBeNull();
    });
});