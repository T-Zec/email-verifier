# Email Verification Module

A Node.js email verification service that validates email syntax, performs DNS MX lookup, checks mailbox existence using SMTP, and detects common email typos.

## Features

- Email syntax validation
- DNS MX record lookup
- SMTP mailbox verification
- Typo detection using Levenshtein distance
- Structured API responses
- Comprehensive Jest test coverage
- Error handling and timeout support

---

## Tech Stack

- Node.js
- Express.js
- SMTP Client
- DNS Promises API
- Jest

---

## Installation

Clone the repository:

```bash
git clone https://github.com/T-Zec/email-verifier
cd email-verifier
```

Install dependencies:

```bash
npm install
```

Create `.env` file:

```env
PORT=3000
SMTP_TIMEOUT=5000
```

Start development server:

```bash
npm run dev
```

---

## API Endpoint

### Verify Email

```http
POST /verify
```

### Request Body

```json
{
  "email": "user@gmail.com"
}
```

### Example Response

```json
{
  "email": "user@gmail.com",
  "result": "valid",
  "resultcode": 1,
  "subresult": "mailbox_exists",
  "domain": "gmail.com",
  "mxRecords": [
    "gmail-smtp-in.l.google.com"
  ],
  "didyoumean": null,
  "executiontime": 1.24,
  "error": null,
  "timestamp": "2026-05-15T10:30:00.000Z"
}
```

---

## Test Coverage

Run tests:

```bash
npm test
```

Includes:
- Syntax validation tests
- MX lookup tests
- SMTP verification tests
- Typo detection tests
- Integration tests

---

## Project Structure

```txt
src/
├── services/
├── utils/
├── app.js
└── server.js

tests/
```

---

## Notes

Some SMTP providers may block mailbox verification attempts or return temporary responses due to anti-spam policies. In such cases, the API returns an `unknown` result with appropriate error details.

---

## Author

Sagar Singh

## GitHub Repo

https://github.com/T-Zec/email-verifier

## Render Deployment URL

https://email-verifier-2c5a.onrender.com