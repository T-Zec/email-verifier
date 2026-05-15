# Email Verification Module

A Node.js email verification module built using SMTP protocol.

## Features

- Email syntax validation
- DNS MX record lookup
- SMTP mailbox verification
- Typo detection using Levenshtein distance
- Structured verification responses
- Jest unit testing

---

## Tech Stack

- Node.js
- Express.js
- smtp-client
- Jest

---

## Installation

```bash
npm install
```

---

## Run Development Server

```bash
npm run dev
```

---

## Run Tests

```bash
npm test
```

---

## API Endpoint

### POST /verify

Request:

```json
{
  "email": "user@gmail.com"
}
```

Response:

```json
{
  "email": "user@gmail.com",
  "result": "valid",
  "resultcode": 1,
  "subresult": "mailbox_exists",
  "domain": "gmail.com",
  "mxRecords": [],
  "executiontime": 1.2,
  "error": null,
  "timestamp": "2026-05-15T12:00:00.000Z"
}
```

---

## Test Coverage

Includes tests for:
- Syntax validation
- Typo detection
- MX lookup
- SMTP verification
- Edge cases

Minimum 15+ test cases implemented.