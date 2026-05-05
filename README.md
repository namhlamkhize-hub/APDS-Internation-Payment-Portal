What the Minimal DevSecOps Pipeline Aims to Do

The pipeline implements three core security testing practices (the "basics" of DevSecOps) that run automatically whenever code is pushed or a pull request is opened:

1. SAST (Static Application Security Testing) - "Check for vulnerabilities in code"
Goal: Find security flaws in your actual JavaScript/TypeScript source code before the app ever runs

Why it matters: Catches issues like SQL injection, cross-site scripting (XSS), unsafe deserialization, and hardcoded secrets

2. SCA (Software Composition Analysis) - "Check vulnerabilities in dependencies"
Goal: Identify known security vulnerabilities in third-party packages (npm dependencies)

Why it matters: Modern apps are 80% open source code - you need to know if your dependencies have known CVEs

3. API Testing - "Test endpoints ensure app runs"
Goal: Verify the application starts successfully and APIs are responsive

Why it matters: Ensures basic functionality and that security middleware (like rate limiting) is working

Tool Declaration

The following list contains the tools used in the development of this project:
- React
- Node.js
- Visual Studio code
- MongoDB Atlas
- Github
- ChatGPT
- Claude ai
