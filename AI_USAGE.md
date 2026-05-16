# AI_USAGE.md

# AI Usage Disclosure

AI tools were used during the development of this assignment to assist with:

- architecture discussions
- distributed systems concepts
- TypeScript implementation patterns
- retry and idempotency reasoning
- testing strategies
- linting and tooling setup
- documentation refinement

All AI-generated suggestions were manually reviewed, validated, tested locally, and adapted before being integrated into the final solution.

---

# AI Tools Used

- ChatGPT
- GitHub Copilot

---

# Prompts That Worked Well

## 1. Distributed Systems & Idempotency

Prompt:

Explain how idempotency works in distributed payment systems using simple Node.js examples.

# 2. Where AI Was Wrong

During the implementation of settlement amount calculation, AI initially suggested rounding late-return fees to the nearest full hour using `Math.ceil()`.

Example assumption:
1.5 hours late → charge for 2 full hours