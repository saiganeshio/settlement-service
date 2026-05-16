# Settlement Service

## Overview

This project implements a simplified settlement processing system for a booking platform.

When a booking is completed, the settlement-service:

- receives a `BookingCompleted` event
- calculates the final payable amount
- captures payment from a mock payment gateway
- persists settlement information
- exposes settlement retrieval APIs

The project also includes a lightweight mock payment gateway service with retry and idempotency behavior simulation.

---

# Tech Stack

## Settlement Service
- Node.js
- TypeScript
- Express
- TypeORM
- PostgreSQL
- Jest

## Payment Gateway Mock
- Node.js
- TypeScript
- Express

---

# Architecture

project-root/

├── settlement-service/
│ ├── src/
│ ├── tests/
│ └── package.json
│
├── payment-gateway-mock/
│ ├── src/
│ └── package.json
│
├── README.md
└── AI_USAGE.md

---

# Features

- BookingCompleted event ingestion
- Final charge calculation
- Payment capture integration
- Retry handling for flaky payment gateway
- Idempotent settlement processing
- Structured logging with trace IDs
- Immutable settlement persistence
- Unit testing
- Idempotency testing
---

# Mock Payment Gateway & Idempotency Strategy

The mock payment gateway implements idempotency using an in-memory JavaScript `Map`.

The `idempotencyKey` is used as the unique key:

const processedPayments =
  new Map<string, string>();

---

# Final Amount Calculation

Final amount is calculated using:

text
finalAmount = baseFare + usageOverage + lateFee