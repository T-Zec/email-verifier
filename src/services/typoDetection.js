const levenshtein = require("fast-levenshtein");

const COMMON_DOMAINS = [
    "gmail.com",
    "yahoo.com",
    "hotmail.com",
    "outlook.com",
    "icloud.com",
    "protonmail.com"
];

function getDidYouMean(email) {
    
    if (!email || typeof email !== "string") {
        return null;
    }

    const parts = email.split("@");
    if (parts.length !== 2) {
        return null;
    }

    const [localPart, domain] = parts;
    let closestDomain = null;
    let minDistance = Infinity;

    for (const validDomain of COMMON_DOMAINS) {
        const distance = levenshtein.get(domain, validDomain);

        if (distance < minDistance) {
            minDistance = distance;
            closestDomain = validDomain;
        }
    }

    // Suggest only if typo is small (e.g., distance of 1 or 2)
    if (minDistance <= 2 && closestDomain !== domain) {
        return `${localPart}@${closestDomain}`;
    }

    return null;
}

module.exports = getDidYouMean;