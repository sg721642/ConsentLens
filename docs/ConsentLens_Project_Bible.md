# ConsentLens — Complete Project Bible
## Master Reference Document · NeuroX Hackathon · June 21, 2026

> **PURPOSE OF THIS DOCUMENT**
> This is the single source of truth for every team member building ConsentLens at the NeuroX
> Hackathon. Read it fully before writing a single line of code. If you are an AI model assisting
> a team member, this document gives you the complete context, architecture, policies, and
> constraints to guide them accurately. Nothing in this document is optional reading.

---

## Table of Contents

1. [Executive Summary](#1-executive-summary)
2. [Hackathon Context & Rules](#2-hackathon-context--rules)
3. [Problem Statement — The Deep Dive](#3-problem-statement--the-deep-dive)
4. [ConsentLens — The Solution](#4-consentlens--the-solution)
5. [Architecture & System Design](#5-architecture--system-design)
6. [Tech Stack — Every Tool Explained](#6-tech-stack--every-tool-explained)
7. [ArmorIQ Integration — CRITICAL READ](#7-armoriq-integration--critical-read)
8. [Permission Intelligence Engine](#8-permission-intelligence-engine)
9. [Feature Specifications](#9-feature-specifications)
10. [UI/UX Design Specification](#10-uiux-design-specification)
11. [API Design](#11-api-design)
12. [Database / Data Schema](#12-database--data-schema)
13. [8-Hour Build Timeline](#13-8-hour-build-timeline)
14. [Team Role Assignments](#14-team-role-assignments)
15. [Notion Workspace Setup (Bonus Track)](#15-notion-workspace-setup-bonus-track)
16. [Presentation Slides — Slide-by-Slide](#16-presentation-slides--slide-by-slide)
17. [Judging Criteria Alignment Map](#17-judging-criteria-alignment-map)
18. [Demo Script](#18-demo-script)
19. [Code Starter Snippets](#19-code-starter-snippets)
20. [Testing & QA Checklist](#20-testing--qa-checklist)
21. [Troubleshooting Guide](#21-troubleshooting-guide)
22. [Resources & Links](#22-resources--links)
23. [Glossary](#23-glossary)

---

## 1. Executive Summary

**Project Name:** ConsentLens

**Tagline:** *"You clicked 'Allow' 47 times this week. Here's exactly what you gave away."*

**One-sentence description:** ConsentLens is a zero-PII app permission reality checker — you
type in app names, and it tells you in plain, human language exactly what each app is harvesting
from your phone, scored by risk, powered by AI, and enforced by ArmorIQ policy so that no
personal data ever enters the pipeline.

**Track Selected:** Track 3 — Open Category: Reimagine Security  
*(Track 1 is also valid — see Section 2.2 for the justification of both)*

**Why this project wins:**
- The problem is universally relatable — every judge has a smartphone
- The ArmorIQ integration is architecturally meaningful, not cosmetic
- The privacy promise ("only app names enter the system") is provable and demonstrable live
- The AI output is visible, impressive, and immediately understandable
- It is completable in 8 hours with a clean, functional demo

**Core privacy guarantee:** Only app names (strings like "Instagram", "TikTok") are ever
processed. Zero credentials, zero account data, zero files, zero personal information enters
the system at any point. ArmorIQ policy enforcement makes this a technical guarantee, not
just a promise.

---

## 2. Hackathon Context & Rules

### 2.1 Event Details

| Field | Value |
|---|---|
| Event Name | NeuroX Hackathon |
| Date | Sunday, June 21, 2025 |
| Venue | Masters' Union CDS Campus, Gurugram |
| Duration | 8 hours |
| Total Cash Prize Pool | Up to ₹30,000 (run by HackBriven organizing team) |
| Notion Track Prizes | Hampers for Top 1–3 Notion setups + goodies for active users |
| Organizer Contacts | Atul Anand — LinkedIn, X (Twitter), atulanand.co |

### 2.2 Track Selection & Justification

**We are building for Track 3: Open Category — Reimagine Security.**

This track says: *"Use ArmorClaw and the ArmorIQ platform however you want — build something
that makes the internet safer, smarter, or easier to trust."*

ConsentLens fits Track 3 perfectly because:
- It makes the internet easier to **trust** by giving users transparent insight into what apps
  are doing with their data
- It is **creative** — it reframes security as a user-facing transparency tool rather than a
  developer/enterprise tool
- It is **impactful** — billions of smartphone users are affected by opaque app permissions

**Why Track 1 (Secure by Default) also works (backup argument):**
Track 1 says: *"Build any tool that helps developers, teams, or businesses catch and fix
security issues before they ship — making security invisible and automatic."*

ConsentLens can be framed for Track 1 as:
- A developer tool to audit what permissions their app is requesting vs. what competitors
  request, catching permission creep before shipping
- A CI/CD-integrated scanner that flags when a new app dependency requests unexpected
  permissions
- A compliance audit tool for businesses to vet third-party apps used by employees

**DECISION: We go with Track 3.** The consumer-facing angle is more compelling for a demo
and the judging criteria for Track 3 (creative + impactful) plays to our strengths.

### 2.3 Scoring Criteria

The ArmorIQ tracks are judged on general hackathon quality. Based on the event materials,
typical evaluation includes:

| Criterion | What They Look For |
|---|---|
| Problem clarity | Is the problem real, well-articulated, and understood? |
| Solution fit | Does the solution actually solve the problem? |
| Innovation | Is there something new or clever here? |
| Technical depth | Is the code real and working, not just a demo slide? |
| ArmorIQ integration | Is ArmorIQ/ArmorClaw meaningfully used, not bolted on? |
| Demo quality | Can you show it working in 2–3 minutes live? |
| Impact & feasibility | Could this actually work in the real world? |

### 2.4 Submission Requirements

Based on the hackathon materials, you need:
1. A **working project / prototype** you can demonstrate live
2. A **presentation (PPT/slides)** — 7 slides as specified (see Section 16)
3. **ArmorIQ/ArmorClaw integration** — at least one of the two must be meaningfully used
4. Optional: **Notion workspace** tracking your team's work (bonus prizes)

### 2.5 Notion Track (Optional but Recommended)

There is a separate Notion track with hamper prizes for the best team workspace setups.
Details are in Section 15. The key requirement is that you actually **use** Notion throughout
the day, not just set it up once. Judges look at your build log activity, task management,
and automation setup.

---

## 3. Problem Statement — The Deep Dive

### 3.1 The Core Problem

When you install any app on your phone, a permissions dialog appears. You tap "Allow All"
or "Continue" and move on. This happens hundreds of times per year per person, and almost
nobody understands what they are agreeing to.

**The average app requests 12 permissions.** Most users grant them all without reading them.

Here is what is actually happening in the background:

- **Instagram** knows your precise GPS location every time you open it, has access to your
  entire camera roll, can listen through your microphone, and has read access to your contacts.
- **TikTok** reads your clipboard content every time you switch to the app (caught and
  reported in 2020), collects your face geometry data, and tracks your precise location.
- **WhatsApp** reads your entire contact list (including people who are not on WhatsApp) and
  uploads it to Meta's servers.
- **Most games** request phone call state, contacts, and precise location — none of which
  have any relationship to gameplay.

The problem is **information asymmetry**:
- App developers know exactly what data they collect
- Users have no idea and no easy way to find out
- The permissions dialog is deliberately vague ("Access your location" — but when? always?
  only when using the app? at what precision? shared with whom?)

### 3.2 Who Is Affected

**Primary:** Every smartphone user — approximately 6.8 billion people globally as of 2025.
This is not a niche problem. This affects everyone in the room at the hackathon, every judge,
every mentor.

**Secondary:** Businesses whose employees install apps on work phones, creating data leakage
risk to corporate environments.

**Tertiary:** Parents who cannot monitor what apps their children install and what those apps
are collecting.

**Specific demographics most at risk:**
- Elderly users who are less tech-literate
- Teenagers using social apps
- People in sensitive professions (healthcare, law, government) who unknowingly give apps
  access to work contacts and location history

### 3.3 Current Solutions & Their Limitations

| Existing Solution | What It Does | Why It Falls Short |
|---|---|---|
| App Store privacy labels | Shows a text list of data types collected | Technical jargon, no context, no risk score, rarely updated |
| Exodus Privacy (Android) | Shows trackers and permissions per app | Developer-focused, requires knowing the app's APK, no plain language |
| DuckDuckGo App Tracking Protection | Blocks trackers at network level | Does not explain what is being blocked, reactive not informative |
| Manual privacy policy reading | Full legal text of what apps collect | 45+ pages of legalese per app, nobody reads it |
| iOS Privacy Report | Shows which apps accessed sensors | Requires iOS 15+, shows access events not data sold/shared |
| Permission managers (Android) | Lets you revoke permissions post-install | Requires knowing which to revoke; no education on why |

**The gap:** No tool exists that takes just an app name, requires zero account setup, and
tells you in plain human language exactly what that app is harvesting — scored by risk level
and explained in terms anyone can understand.

### 3.4 Why This Matters Now

- GDPR (EU), India's DPDP Act 2023, and California's CCPA all establish the legal right of
  users to know what data is collected about them. ConsentLens makes this right actionable.
- The average person has 80+ apps installed.
- App stores have been caught hosting apps that misuse permissions (stalkerware, adware).
- AI makes it possible to generate plain-language explanations at scale — this was not
  feasible before LLMs became accessible.

---

## 4. ConsentLens — The Solution

### 4.1 Core Concept

ConsentLens is a **web application** (works on desktop and mobile browser) that:

1. **Takes only app names as input** (e.g., "Instagram", "Candy Crush", "Truecaller")
2. **Queries a curated permission database** for known permissions of each app
3. **Enforces an ArmorIQ policy** that guarantees no personal data enters the pipeline
4. **Feeds the permission data into an AI model** (Claude via Anthropic API) to generate
   plain-language explanations
5. **Returns a risk-scored report** showing:
   - What sensors/data each app can access
   - What is actually done with that data
   - A risk score (LOW / MEDIUM / HIGH / CRITICAL)
   - Plain English "this means" explanations
   - Recommended actions for the user

### 4.2 How It Works — The Full User Journey

```
USER                            FRONTEND                    BACKEND                     ARMORIQ                    AI
  |                                |                             |                          |                        |
  |-- Types "Instagram, TikTok" -->|                             |                          |                        |
  |                                |-- POST /api/analyze ------->|                          |                        |
  |                                |   { apps: ["Instagram",     |                          |                        |
  |                                |            "TikTok"] }      |                          |                        |
  |                                |                             |-- verifyIntent() ------->|                        |
  |                                |                             |   (is this only           |                        |
  |                                |                             |    app names?             |                        |
  |                                |                             |    no PII?)               |                        |
  |                                |                             |<-- APPROVED + audit log --|                        |
  |                                |                             |                          |                        |
  |                                |                             |-- lookupPermissions() --->|  (internal DB query)   |
  |                                |                             |<-- raw permission data ---|                        |
  |                                |                             |                          |                        |
  |                                |                             |-- AI prompt ------------->|                        |
  |                                |                             |  (permissions + context)  |               -------->|
  |                                |                             |                          |               | explain|
  |                                |                             |<-- plain language --------|               | in     |
  |                                |                             |    + risk score           |               | plain  |
  |                                |                             |                          |               | English|
  |                                |<-- 200 OK + results --------|                          |               <--------|
  |<-- Renders permission cards ---|                             |                          |                        |
```

**Step-by-step in plain English:**

1. User types app name(s) into a clean search box on the website
2. Frontend sends a POST request to the backend with just the array of app names
3. Backend immediately calls ArmorIQ's `verifyIntent()` function — this checks that the
   input is only app names (strings), contains no patterns matching PII (emails, phone
   numbers, passwords, etc.), and logs the request to the ArmorIQ audit trail
4. If ArmorIQ approves, the backend looks up each app in the permission database and fetches
   the raw technical permission data
5. That raw data is formatted into a prompt and sent to Claude (AI) to generate plain-language
   explanations
6. The backend calculates a numerical risk score for each app
7. Everything is packaged into a JSON response and sent back to the frontend
8. The frontend renders a clean card for each app showing the results

### 4.3 Key Differentiators

| What We Do | Why It Matters |
|---|---|
| Zero personal data required | Users can check without creating an account or sharing anything |
| ArmorIQ enforced privacy | The "no PII" promise is a technical guarantee backed by policy, not just marketing |
| Plain language AI output | Not a list of technical permission names — actual explanations of impact |
| Risk scoring | Users immediately see RED/AMBER/GREEN without reading anything |
| Multi-app comparison | Check 5 apps at once and see which is worst |
| Actionable advice | Each result includes "What you can do about this" |

### 4.4 The Privacy Promise — Explained

This is the most important technical claim ConsentLens makes:

> **"Only app names are processed. Zero credentials, zero account data, zero files,
> zero personal information ever enters the pipeline."**

This is enforced at three levels:

1. **Frontend validation:** The input field only accepts text strings. No file upload. No
   login. No form that collects email or phone number.
2. **ArmorIQ intent verification:** Before any processing, ArmorIQ scans the incoming data
   against a policy that blocks any input matching PII patterns (email regex, phone number
   patterns, etc.). If PII is detected, the request is rejected and logged.
3. **Architectural isolation:** The only data that flows to the AI model is the app name +
   its known permissions from a static database. User input never reaches the AI prompt
   directly (it is sanitized and replaced by database lookups).

This means: even if a user accidentally types their email into the app name field, ArmorIQ
catches it and blocks it before it goes anywhere.

---

## 5. Architecture & System Design

### 5.1 High-Level Architecture

```
┌─────────────────────────────────────────────────────────────────────┐
│                        USER'S BROWSER                               │
│  ┌──────────────────────────────────────────────────────────────┐   │
│  │                   ConsentLens Frontend                        │   │
│  │              (React + Vite, Tailwind CSS)                    │   │
│  │  • App name input  • Results cards  • Risk visualizations   │   │
│  └──────────────────────┬───────────────────────────────────────┘   │
└─────────────────────────│───────────────────────────────────────────┘
                          │ HTTPS POST /api/analyze
                          │ { apps: ["Instagram", "TikTok"] }
                          ▼
┌─────────────────────────────────────────────────────────────────────┐
│                        BACKEND SERVER                               │
│              (Node.js + Express  OR  Python + FastAPI)              │
│                                                                     │
│  ┌─────────────────┐   ┌──────────────────┐   ┌────────────────┐  │
│  │ Input Validator  │──▶│  ArmorIQ Policy  │──▶│Permission      │  │
│  │ (sanitize,       │   │  Enforcement     │   │Lookup Service  │  │
│  │  type-check)     │   │  (SDK call)      │   │(DB query)      │  │
│  └─────────────────┘   └──────────────────┘   └───────┬────────┘  │
│                                                         │           │
│  ┌──────────────────────────────────────────────────────▼────────┐ │
│  │                   AI Analysis Service                          │ │
│  │  (Claude API — formats permission data into plain English)    │ │
│  └───────────────────────────────────────┬────────────────────── ┘ │
│                                           │                         │
│  ┌────────────────────────────────────────▼──────────────────────┐ │
│  │                   Risk Scoring Engine                          │ │
│  │  (weighted score per permission × data sensitivity factors)   │ │
│  └───────────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────────┘
                          │
             ┌────────────┴───────────┐
             │                        │
             ▼                        ▼
┌────────────────────┐    ┌──────────────────────┐
│   ArmorIQ Platform  │    │    Claude (Anthropic) │
│   (cloud service)   │    │    API                │
│                     │    │                       │
│ • Intent verify     │    │ • Generates plain     │
│ • Policy enforce    │    │   language reports    │
│ • Audit logging     │    │ • Contextualizes risk │
│ • PII detection     │    │ • Recommends actions  │
└────────────────────┘    └──────────────────────┘
```

### 5.2 Data Flow — Detailed

Every piece of data, at every step, with its type:

```
Step 1 — User Input
  IN:  string[]  e.g. ["Instagram", "TikTok", "Truecaller"]
  AT:  Browser / Frontend
  OUT: POST body { "apps": ["Instagram", "TikTok", "Truecaller"] }

Step 2 — Input Validation
  IN:  POST body from Step 1
  AT:  Backend / InputValidator middleware
  CHECKS:
    - Each item is a string
    - No item exceeds 100 characters
    - No item matches PII regex (email, phone, SSN)
    - Array length ≤ 10 apps per request
  OUT: Validated string[]  OR  400 error

Step 3 — ArmorIQ Intent Verification
  IN:  Validated string[]
  AT:  Backend / ArmorIQ SDK call
  CHECKS:
    - Policy: "only_metadata_allowed"
    - Input type must be: app_name_string
    - Blocked patterns: email_regex, phone_regex, password_patterns, PII_indicators
    - Logs to ArmorIQ audit trail: { timestamp, inputType, appCount, approved: true/false }
  OUT: { approved: boolean, auditId: string }  OR  403 blocked

Step 4 — Permission Database Lookup
  IN:  Validated app name string[]
  AT:  Backend / PermissionLookupService
  PROCESS:
    - Exact match lookup in apps_permissions.json
    - If exact match: return permission data
    - If no exact match: fuzzy match (lowercase, remove spaces)
    - If still no match: flag as "unknown app" and return empty
  OUT: PermissionData[] — structured objects per app (see schema in Section 12)

Step 5 — AI Plain Language Generation
  IN:  PermissionData[] from Step 4
  AT:  Backend / AIAnalysisService
  PROCESS:
    - Format permission data into a structured AI prompt (see Section 19)
    - Call Claude API (model: claude-sonnet-4-6)
    - Parse response into structured plain-language analysis per app
  OUT: AIAnalysis[] — plain English, per app

Step 6 — Risk Score Calculation
  IN:  PermissionData[] from Step 4
  AT:  Backend / RiskScoringEngine
  PROCESS:
    - Apply weighted scoring formula (see Section 8.2)
    - Assign LOW / MEDIUM / HIGH / CRITICAL label
  OUT: RiskScore[] — numerical score + label per app

Step 7 — Response Assembly & Return
  IN:  AIAnalysis[] + RiskScore[] + PermissionData[]
  AT:  Backend / route handler
  OUT: JSON response { results: AnalysisResult[] }  → sent to frontend

Step 8 — Frontend Rendering
  IN:  JSON response
  AT:  Browser / React components
  OUT: Rendered permission cards, risk badges, data harvest lists
       — all visible to the user
```

### 5.3 Component Breakdown

**Frontend Components (React):**

| Component | File | Purpose |
|---|---|---|
| `AppInput` | `components/AppInput.jsx` | Multi-app name search bar with chip/tag UI |
| `PermissionCard` | `components/PermissionCard.jsx` | Full analysis card for one app |
| `RiskBadge` | `components/RiskBadge.jsx` | Color-coded LOW/MED/HIGH/CRITICAL badge |
| `DataHarvestList` | `components/DataHarvestList.jsx` | List of data types the app collects |
| `PermissionTag` | `components/PermissionTag.jsx` | Small pill badge for each permission |
| `ComparisonTable` | `components/ComparisonTable.jsx` | Side-by-side view for multiple apps |
| `ActionableAdvice` | `components/ActionableAdvice.jsx` | "What to do" recommendations section |
| `PolicyBadge` | `components/PolicyBadge.jsx` | Shows ArmorIQ policy badge (trust indicator) |
| `LoadingState` | `components/LoadingState.jsx` | Animated skeleton while results load |
| `ErrorState` | `components/ErrorState.jsx` | Friendly error messages |
| `Header` | `components/Header.jsx` | App header with tagline |
| `AboutModal` | `components/AboutModal.jsx` | What is ConsentLens, how it works |

**Backend Services (Node.js/Express):**

| Service | File | Purpose |
|---|---|---|
| Route Handler | `routes/analyze.js` | POST /api/analyze — orchestrates the pipeline |
| Route Handler | `routes/health.js` | GET /api/health — uptime check |
| InputValidator | `middleware/inputValidator.js` | Sanitize and validate incoming data |
| ArmorIQGuard | `middleware/armoriqGuard.js` | ArmorIQ policy check middleware |
| PermissionLookup | `services/permissionLookup.js` | Query the permission database |
| AIAnalysis | `services/aiAnalysis.js` | Call Claude API, parse response |
| RiskScoring | `services/riskScoring.js` | Calculate weighted risk scores |
| AuditLogger | `services/auditLogger.js` | Log all requests + ArmorIQ decisions |

### 5.4 Project Directory Structure

```
consentlens/
│
├── frontend/                           # React application
│   ├── public/
│   │   └── favicon.ico
│   ├── src/
│   │   ├── components/                 # UI components (list in 5.3 above)
│   │   ├── pages/
│   │   │   ├── Home.jsx                # Landing page + input
│   │   │   ├── Results.jsx             # Results display
│   │   │   └── About.jsx               # About page
│   │   ├── services/
│   │   │   └── api.js                  # Axios/fetch calls to backend
│   │   ├── utils/
│   │   │   ├── riskColors.js           # Color mapping for risk levels
│   │   │   └── formatters.js           # Data formatting helpers
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css                   # Tailwind base styles
│   ├── package.json
│   ├── vite.config.js
│   └── tailwind.config.js
│
├── backend/                            # Node.js/Express server
│   ├── src/
│   │   ├── routes/
│   │   │   ├── analyze.js
│   │   │   └── health.js
│   │   ├── middleware/
│   │   │   ├── inputValidator.js
│   │   │   └── armoriqGuard.js
│   │   ├── services/
│   │   │   ├── permissionLookup.js
│   │   │   ├── aiAnalysis.js
│   │   │   ├── riskScoring.js
│   │   │   └── auditLogger.js
│   │   ├── data/
│   │   │   └── app_permissions.json    # The core permission database
│   │   └── app.js                      # Express app entry point
│   ├── .env.example                    # Template for env vars (NEVER commit .env)
│   └── package.json
│
├── .gitignore
└── README.md
```

---

## 6. Tech Stack — Every Tool Explained

### 6.1 Frontend

| Tool | Version | Why We Use It |
|---|---|---|
| React | 18.x | Component-based UI, fast to build, widely known |
| Vite | 5.x | Faster than Create React App, simpler setup |
| Tailwind CSS | 3.x | Utility-first styling, no custom CSS needed for MVP |
| Axios | 1.x | Clean HTTP client for API calls to backend |
| Lucide React | 0.383.0 | Icon library (already available in Claude artifacts) |

**Setup commands:**
```bash
npm create vite@latest consentlens-frontend -- --template react
cd consentlens-frontend
npm install
npm install tailwindcss @tailwindcss/vite axios lucide-react
```

### 6.2 Backend

**Primary choice: Node.js + Express (recommended — faster to build)**

| Tool | Version | Why We Use It |
|---|---|---|
| Node.js | 20.x LTS | JavaScript runtime, same language as frontend |
| Express | 4.x | Minimal web framework, easy routing |
| CORS | 2.x | Allow frontend to call backend (different ports in dev) |
| dotenv | 16.x | Load environment variables from .env file |
| @anthropic-ai/sdk | latest | Official Claude API SDK |

**Setup commands:**
```bash
mkdir consentlens-backend && cd consentlens-backend
npm init -y
npm install express cors dotenv @anthropic-ai/sdk
```

**Alternative: Python + FastAPI**

| Tool | Version | Why (if Python preferred) |
|---|---|---|
| Python | 3.11+ | Team preference |
| FastAPI | 0.110+ | Auto-generates OpenAPI docs, async support |
| Uvicorn | 0.29+ | ASGI server for FastAPI |
| httpx | 0.27+ | Async HTTP client |
| anthropic | latest | Official Anthropic Python SDK |

**Setup commands (Python path):**
```bash
pip install fastapi uvicorn httpx anthropic python-dotenv
```

### 6.3 AI Layer

| Tool | Details |
|---|---|
| Model | Claude claude-sonnet-4-6 (via Anthropic API) |
| Purpose | Generate plain-language permission explanations |
| Input | App name + technical permission list |
| Output | Structured plain-English analysis + risk context |
| Fallback | If API call fails, use pre-written template explanations from the DB |

**Environment variable needed:**
```
ANTHROPIC_API_KEY=sk-ant-xxxxxxxxxxxxxxx
```

### 6.4 Security Layer (ArmorIQ — REQUIRED FOR QUALIFICATION)

| Tool | Purpose |
|---|---|
| ArmorIQ SDK (TypeScript/Python) | Intent verification, policy enforcement, audit logging |
| ArmorClaw (optional addition) | Security scanning of inputs if time allows |
| ArmorIQ Platform | Dashboard at platform.armoriq.ai for policy management |

**Environment variables needed:**
```
ARMORIQ_API_KEY=your-armoriq-api-key
ARMORIQ_POLICY_ID=consent_lens_data_policy
ARMORIQ_AGENT_ID=consentlens-backend-v1
```

### 6.5 Deployment (During Hackathon — Keep It Simple)

For a hackathon demo, use the simplest possible deployment:

| Option | How |
|---|---|
| **Option A (easiest):** Run both locally | `npm run dev` for frontend (port 5173), `node app.js` for backend (port 3001) — works on same laptop for demo |
| **Option B:** Deploy frontend to Vercel | Push to GitHub, connect Vercel, auto-deploys |
| **Option C:** Deploy backend to Railway | Push to GitHub, Railway auto-deploys Node.js |

**Recommended for demo day:** Option A — keep it local, no deployment issues.

---

## 7. ArmorIQ Integration — CRITICAL READ

> **IMPORTANT:** ArmorIQ is a **required** component for the hackathon tracks. Without it,
> the project does not qualify. Read this section fully before starting backend development.

### 7.1 What ArmorIQ Is

ArmorIQ is a security platform that provides:
- **Policy enforcement** — define rules about what data your system is allowed to process
- **Intent verification** — verify that an AI agent or user action matches a declared intent
- **Audit logging** — immutable log of all security decisions made by your system
- **SDK** — TypeScript and Python libraries to integrate these capabilities

For ConsentLens, ArmorIQ does the most important job: it **technically enforces** the claim
that "no personal data enters the pipeline." Without ArmorIQ, this is just a promise. With
ArmorIQ, it is a verifiable, audited, policy-enforced guarantee.

### 7.2 Which ArmorIQ Tool to Use

We use the **ArmorIQ SDK** (TypeScript/Node.js or Python). The reason we prefer the SDK
over ArmorClaw:

- ArmorClaw is primarily for **code/file security scanning** (good for CI/CD pipelines)
- The SDK is for **runtime policy enforcement** — checking data as it flows through our app
- Our use case (checking inputs at request time) is exactly what the SDK is built for

**We can optionally add ArmorClaw** as a bonus feature to scan app permission descriptions
for suspicious patterns — this would demonstrate both tools and strengthen our story.

### 7.3 ArmorIQ SDK Setup (Node.js / TypeScript)

**Step 1 — Install the SDK**
```bash
npm install @armoriq/sdk
# (check docs.armoriq.ai for the exact package name — it may be different)
```

**Step 2 — Create your account**
- Go to: `platform.armoriq.ai`
- Sign up, create a workspace
- Get your API key from the dashboard
- Register a new "Agent" called `consentlens-backend-v1`

**Step 3 — Initialize the client**
```javascript
// src/services/armoriqClient.js
const { ArmorIQ } = require('@armoriq/sdk');

const armor = new ArmorIQ({
  apiKey: process.env.ARMORIQ_API_KEY,
  agentId: process.env.ARMORIQ_AGENT_ID,
  auditLogging: true,
  environment: 'production' // or 'development'
});

module.exports = armor;
```

**Step 4 — Configure the policy on the platform**
Log into `platform.armoriq.ai` and create a policy named `consent_lens_data_policy` with
these rules:

```json
{
  "policy_name": "consent_lens_data_policy",
  "version": "1.0",
  "description": "ConsentLens only processes app names — never personal data",
  "rules": [
    {
      "rule_id": "only_metadata_allowed",
      "description": "Only app name strings are allowed",
      "allowed_input_types": ["string", "array_of_strings"],
      "max_input_length_chars": 100,
      "max_array_length": 10,
      "blocked_patterns": [
        "email_address",
        "phone_number",
        "social_security_number",
        "credit_card_number",
        "password",
        "api_key_or_token",
        "ip_address",
        "physical_address"
      ],
      "action_on_match": "block_and_audit"
    },
    {
      "rule_id": "no_pii_in_response",
      "description": "Responses must not contain personal information",
      "action": "scan_and_flag"
    },
    {
      "rule_id": "rate_limiting",
      "max_requests_per_minute": 60,
      "max_apps_per_request": 10,
      "action_on_exceed": "throttle_and_log"
    }
  ]
}
```

### 7.4 How to Call ArmorIQ in the Request Pipeline

This is the critical code. Every incoming request must pass through this before any
data processing happens:

```javascript
// src/middleware/armoriqGuard.js
const armor = require('../services/armoriqClient');

async function armoriqGuard(req, res, next) {
  try {
    const { apps } = req.body;

    // Call ArmorIQ intent verification
    const verificationResult = await armor.verifyIntent({
      action: 'app_permission_lookup',
      inputs: apps,
      policy: 'consent_lens_data_policy',
      context: {
        requestId: req.id,           // unique request identifier
        timestamp: new Date().toISOString(),
        inputType: 'app_name_array',
        inputCount: apps.length
      }
    });

    if (!verificationResult.approved) {
      // ArmorIQ blocked this request
      return res.status(403).json({
        error: 'Request blocked by security policy',
        reason: verificationResult.blockReason,
        auditId: verificationResult.auditId
      });
    }

    // Store audit ID for later reference
    req.armoriqAuditId = verificationResult.auditId;

    // Proceed to next middleware
    next();

  } catch (armorError) {
    console.error('ArmorIQ verification failed:', armorError);
    // Fail-safe: if ArmorIQ is unreachable, block the request
    return res.status(503).json({
      error: 'Security verification temporarily unavailable'
    });
  }
}

module.exports = armoriqGuard;
```

### 7.5 Using ArmorIQ in the Route Handler

```javascript
// src/routes/analyze.js
const express = require('express');
const router = express.Router();
const armoriqGuard = require('../middleware/armoriqGuard');
const inputValidator = require('../middleware/inputValidator');
const permissionLookup = require('../services/permissionLookup');
const aiAnalysis = require('../services/aiAnalysis');
const riskScoring = require('../services/riskScoring');

// Order matters: validate first, then ArmorIQ, then business logic
router.post('/analyze', inputValidator, armoriqGuard, async (req, res) => {
  const { apps } = req.body;

  try {
    // Step 1: Look up permissions for each app
    const permissionData = await permissionLookup.getPermissions(apps);

    // Step 2: Generate AI analysis
    const aiResults = await aiAnalysis.analyzeApps(permissionData);

    // Step 3: Calculate risk scores
    const riskScores = riskScoring.scoreAll(permissionData);

    // Step 4: Assemble and return results
    const results = apps.map((appName, i) => ({
      appName,
      permissions: permissionData[i]?.permissions || [],
      dataCollected: permissionData[i]?.dataCollected || [],
      plainEnglishSummary: aiResults[i]?.summary || 'Analysis unavailable',
      whatThisMeans: aiResults[i]?.whatThisMeans || [],
      recommendedActions: aiResults[i]?.actions || [],
      riskScore: riskScores[i]?.score || 0,
      riskLevel: riskScores[i]?.level || 'UNKNOWN',
      armoriqAuditId: req.armoriqAuditId,
      foundInDatabase: permissionData[i]?.found || false
    }));

    return res.status(200).json({ results });

  } catch (err) {
    console.error('Analysis error:', err);
    return res.status(500).json({ error: 'Analysis failed', details: err.message });
  }
});

module.exports = router;
```

### 7.6 What to Show Judges About ArmorIQ

When presenting to judges, show these things on the ArmorIQ platform dashboard:
1. **The policy definition** — show the `consent_lens_data_policy` rule set
2. **The audit log** — show a live log of requests being processed and approved
3. **A blocked request example** — type an email into the app name field, show ArmorIQ
   block it in real time and log the block event
4. **Agent registration** — show `consentlens-backend-v1` registered as an agent

This is the difference between a project that "mentions ArmorIQ" and one that
"demonstrates ArmorIQ working." Judges will check for this.

### 7.7 Python SDK Alternative

If your backend is Python:

```python
# armoriq_client.py
from armoriq import ArmorIQ  # check exact import from docs.armoriq.ai

import os

armor = ArmorIQ(
    api_key=os.getenv("ARMORIQ_API_KEY"),
    agent_id=os.getenv("ARMORIQ_AGENT_ID"),
    audit_logging=True
)

async def verify_intent(apps: list[str]) -> dict:
    result = await armor.verify_intent(
        action="app_permission_lookup",
        inputs=apps,
        policy="consent_lens_data_policy",
        context={
            "input_type": "app_name_array",
            "input_count": len(apps)
        }
    )
    return result
```

---

## 8. Permission Intelligence Engine

This is the "brain" of ConsentLens — the data that makes the AI analysis possible.

### 8.1 The App Permission Database

The database (`app_permissions.json`) is a curated JSON file containing known permissions
and data collection practices for popular apps. It is populated manually before the hackathon
using publicly available information from:
- Google Play Store privacy labels
- Apple App Store privacy nutrition labels
- Exodus Privacy database (reports.exodus-privacy.eu.org)
- App privacy policies (published data, not crawled)

**Populate this database BEFORE the event.** Aim for at least 50 well-known apps.
Priority list:

| Priority | Apps |
|---|---|
| P0 (Must have) | Instagram, TikTok, WhatsApp, Facebook, Snapchat, Twitter/X, YouTube, Google Maps, Gmail, Uber |
| P1 (Should have) | Spotify, Netflix, LinkedIn, Truecaller, PhonePe, Google Pay, Paytm, PUBG Mobile, Candy Crush, Zomato, Swiggy |
| P2 (Nice to have) | Meesho, ShareIt, UC Browser, Shazam, Tinder, Bumble, Discord, Telegram, Signal, Zoom |

### 8.2 Database Schema (Per App Entry)

```json
{
  "apps": [
    {
      "id": "instagram",
      "name": "Instagram",
      "aliases": ["insta", "ig"],
      "developer": "Meta Platforms",
      "category": "Social Media",
      "platforms": ["android", "ios"],
      "permissions": {
        "android": [
          "android.permission.CAMERA",
          "android.permission.RECORD_AUDIO",
          "android.permission.ACCESS_FINE_LOCATION",
          "android.permission.READ_CONTACTS",
          "android.permission.READ_EXTERNAL_STORAGE",
          "android.permission.WRITE_EXTERNAL_STORAGE",
          "android.permission.INTERNET"
        ],
        "ios": [
          "NSCameraUsageDescription",
          "NSMicrophoneUsageDescription",
          "NSLocationWhenInUseUsageDescription",
          "NSContactsUsageDescription",
          "NSPhotoLibraryUsageDescription"
        ]
      },
      "data_collected": [
        {
          "category": "Location",
          "specifics": "Precise GPS coordinates when app is open",
          "purpose": "Location tagging in posts, Stories, geofilters",
          "shared_with": ["Meta advertising network", "Third-party advertisers"],
          "retained_for": "Indefinitely / per account lifetime"
        },
        {
          "category": "Contacts",
          "specifics": "Full contact list including names, phone numbers, emails",
          "purpose": "Friend discovery ('People You May Know')",
          "shared_with": ["Meta Platforms", "Facebook"],
          "retained_for": "Until account deletion requested"
        },
        {
          "category": "Camera & Microphone",
          "specifics": "Full camera and microphone access when in use",
          "purpose": "Posts, Stories, Reels, Direct Messages",
          "shared_with": ["Meta's servers", "CDN networks"],
          "retained_for": "Content stored until manually deleted"
        },
        {
          "category": "Device & Usage Data",
          "specifics": "Device model, OS version, screen time, tap patterns",
          "purpose": "Personalization, ad targeting, algorithm training",
          "shared_with": ["Meta advertising partners", "Analytics providers"],
          "retained_for": "Indefinitely"
        }
      ],
      "known_trackers": [
        "Meta Audience Network",
        "Facebook Analytics",
        "AppsFlyer",
        "Crashlytics"
      ],
      "risk_factors": [
        "Part of Meta ecosystem — data shared with Facebook, WhatsApp, Messenger",
        "Facial recognition technology used in photo suggestions",
        "Behavioral profiling for ad targeting",
        "Contact list used to build 'shadow profiles' of non-users"
      ],
      "plain_risk_summary": "Instagram collects a comprehensive profile of who you are, where you go, who you know, and what you like. This data is shared across Meta's advertising network.",
      "risk_score_base": 38,
      "risk_level": "CRITICAL",
      "last_updated": "2025-01"
    }
  ]
}
```

### 8.3 Risk Scoring Formula

Every app gets a numerical risk score based on this formula. The AI analysis also uses this
context to calibrate its language.

```
Risk Score = (Permission Score) + (Data Sharing Multiplier) + (Ecosystem Penalty)

PERMISSION SCORES (additive):
  Precise Location (ACCESS_FINE_LOCATION):   +8 points
  Approximate Location:                       +3 points
  Camera access:                              +6 points
  Microphone access:                          +6 points
  Contacts list:                              +5 points
  SMS read/send:                              +6 points
  Biometric data:                             +10 points
  Full storage access:                        +4 points
  Call logs:                                  +5 points
  Clipboard access:                           +4 points
  Phone state (IMEI, call state):             +5 points
  Bluetooth (device tracking):               +2 points

DATA SHARING MULTIPLIER:
  Data sold to third-party brokers:          ×2.0
  Data shared with advertising networks:     ×1.5
  Data shared within same corporate family:  ×1.3
  Data stored in country with weak privacy:  +5 bonus points
  Data retained indefinitely:               +3 bonus points

ECOSYSTEM PENALTY (flat addition):
  Part of a data-broker ecosystem:           +5
  Known history of data violations:         +5
  GDPR fines or consent violations:          +3

RISK LEVELS:
  Score 0–9:   LOW      (green)   — minimal data collection
  Score 10–19: MEDIUM   (yellow)  — moderate data, standard for the category
  Score 20–34: HIGH     (orange)  — significant data collection, review carefully
  Score 35+:   CRITICAL (red)     — extensive data collection and sharing
```

### 8.4 Reference Permission Database — Quick Cheat Sheet

Use this to populate `app_permissions.json` fast:

| App | Key Permissions | Primary Risk | Risk Level |
|---|---|---|---|
| Instagram | Camera, Mic, Location, Contacts, Storage | Meta ad ecosystem, facial recognition | CRITICAL |
| TikTok | Camera, Mic, Clipboard, Location, Face data | Government risk concerns, clipboard snooping | CRITICAL |
| Facebook | Camera, Mic, Location, Contacts, BT, NFC | Data broker, shadow profiles, behavioral profiling | CRITICAL |
| WhatsApp | Camera, Mic, Contacts, SMS, Storage | Meta ecosystem, contact list upload | HIGH |
| Truecaller | Phone state, Contacts, SMS, Call logs | Entire phonebook uploaded, call metadata | HIGH |
| Snapchat | Camera, Mic, Location, Biometric, Contacts | Facial geometry capture, location sharing | HIGH |
| Google Maps | Location (always), Camera, Mic, Contacts | Permanent location history, Google ecosystem | HIGH |
| Uber | Location (always), Camera, Contacts, SMS | Always-on location, driver/rider profiling | HIGH |
| Twitter/X | Camera, Mic, Location, Contacts, Storage | Behavioral data, DM content metadata | MEDIUM-HIGH |
| Spotify | Mic, Storage, Contacts | Listening history, contact list | MEDIUM |
| LinkedIn | Camera, Contacts, Location, Storage | Professional network data, contact graph | MEDIUM |
| Netflix | Camera (limited), Storage | Viewing habits, payment data | LOW-MEDIUM |
| Signal | Camera, Mic, Contacts, SMS | Minimal — privacy-first design | LOW |
| Telegram | Camera, Mic, Contacts, Storage | Cloud storage of messages, contact access | MEDIUM |
| Discord | Camera, Mic, Storage | Voice data, server metadata | MEDIUM |
| Google Pay / PhonePe | Camera (QR), NFC, Contacts, Location | Payment patterns, financial data | HIGH |
| PUBG Mobile | Camera, Mic, Location, Storage | Voice chat capture, location | MEDIUM-HIGH |
| Zomato/Swiggy | Location (precise), Camera, Contacts | Location history, payment data | MEDIUM |
| UC Browser | Full browsing history, Location, Storage | Known for data exfiltration concerns | CRITICAL |
| ShareIt | Storage, Contacts, Camera, Location | File access, no encryption concerns | HIGH |

---

## 9. Feature Specifications

### 9.1 Core Features (MVP — Must Have for Demo)

These features must work during the demo. Prioritize these above everything else.

**Feature 1: Multi-App Input**
- Text input that accepts one or more app names
- Supports comma-separated input ("Instagram, TikTok, WhatsApp")
- Supports chip-based input (type one, press Enter, type another)
- Maximum 5 apps per search (for demo; limit to 3 for speed if needed)
- Clear button to reset
- Example suggestions shown on empty state ("Try: Instagram, TikTok, WhatsApp")

**Feature 2: Permission Analysis Results**
- One card per app
- App name as the card title
- Risk badge prominently displayed (color-coded)
- List of permissions in human-readable form (not Android permission strings)
  - BAD: `android.permission.ACCESS_FINE_LOCATION`
  - GOOD: `📍 Your precise GPS location, tracked in real-time`
- List of data types collected

**Feature 3: AI Plain-Language Explanation**
- 2–3 sentence plain English summary per app
- Generated by Claude via the Anthropic API
- Explains what the app does with the data (not just what it collects)
- Examples:
  - "Instagram can see exactly where you are every time you open the app, and shares this
     with Meta's advertising network to show you location-targeted ads."
  - "TikTok reads whatever you copy to your clipboard — including passwords you copy from
     a password manager — every time you switch to the app."

**Feature 4: Risk Score Display**
- Visual risk meter or badge per app
- Color coding: Green (LOW) → Yellow (MEDIUM) → Orange (HIGH) → Red (CRITICAL)
- Numeric score and label

**Feature 5: "What This Means" Section**
- 3 bullet points per app explaining real-world implications in plain terms
- Example for Instagram:
  - "Meta knows everywhere you go, building a map of your life"
  - "Your friends' contact details were uploaded to Meta's servers, even if they don't use Instagram"
  - "Everything you do in the app is tracked and used to predict your behavior"

**Feature 6: ArmorIQ Policy Badge**
- Prominent trust badge on the results page: "🔒 Secured by ArmorIQ — Only app names processed"
- Small info icon that explains what ArmorIQ is and what the policy enforces
- Audit ID shown for transparency

### 9.2 Enhanced Features (Build If Time Allows)

**Feature 7: App Comparison View**
- Side-by-side table comparing 2–5 apps on the same permissions
- Highlight which app requests the most sensitive permissions
- "Winner" for least invasive app in a category

**Feature 8: Category Insights**
- When multiple apps of the same type are searched ("Instagram, TikTok, Snapchat"),
  show a summary: "Social media apps on average request 8 permissions and share your
  data with 4+ advertising networks."

**Feature 9: Recommended Alternatives**
- For HIGH/CRITICAL risk apps, suggest lower-risk alternatives
- Example: Instagram (CRITICAL) → try Pixelfed (LOW) if privacy matters to you

**Feature 10: Share Results**
- Generate a shareable link or image card for results
- "I checked my 5 most-used apps — here's what they're collecting 👀" social share

### 9.3 Bonus Features (Competitive Edge, If Ahead of Schedule)

**Feature 11: Permission Timeline**
- Show how an app's permission requests have grown over time (if data available)
- "WhatsApp requested 5 permissions in 2015, now requests 14"

**Feature 12: "Permission Audit" Mode**
- User pastes a comma-separated list of all 80+ apps on their phone
- System scores the entire library and shows the top 5 riskiest

---

## 10. UI/UX Design Specification

### 10.1 Design Principles

1. **Clarity over completeness** — A user should understand the risk of an app in under
   5 seconds from looking at a result card
2. **Trust signals** — The ArmorIQ badge must be visible and prominent to build trust
3. **Actionable** — Every piece of information should answer: "So what do I do?"
4. **Mobile-friendly** — The site must work on a phone because the problem is about phones

### 10.2 Color System

| Risk Level | Color | Hex | Tailwind Class |
|---|---|---|---|
| LOW | Green | #22C55E | `text-green-500 bg-green-50` |
| MEDIUM | Yellow/Amber | #F59E0B | `text-amber-500 bg-amber-50` |
| HIGH | Orange | #F97316 | `text-orange-500 bg-orange-50` |
| CRITICAL | Red | #EF4444 | `text-red-500 bg-red-50` |
| Neutral | Slate | #64748B | `text-slate-500` |
| Background | Near-white | #F8FAFC | `bg-slate-50` |
| Card | White | #FFFFFF | `bg-white` |

**Primary brand color:** Deep blue — `#1E40AF` (trust, security, technology)

### 10.3 Page Layout

**Home Page:**
```
┌────────────────────────────────────────┐
│  🔍 ConsentLens                  [?]   │  ← Header
│  "Know what your apps really know"     │
├────────────────────────────────────────┤
│                                        │
│  ┌──────────────────────────────────┐  │
│  │  Type app names, e.g:            │  │
│  │  Instagram  ×  TikTok  ×        │  │
│  │  [___________________________]   │  │
│  │                                  │  │
│  │         [ Analyze Apps →]        │  │
│  └──────────────────────────────────┘  │
│                                        │
│  🔒 Only app names enter the system.   │
│  Secured by ArmorIQ policy.            │
│                                        │
│  Popular checks:                       │
│  [Instagram] [TikTok] [WhatsApp]       │
│  [Truecaller] [Snapchat] [Facebook]    │
└────────────────────────────────────────┘
```

**Results Page:**
```
┌────────────────────────────────────────┐
│  ← Back    Results for 3 apps    [?]  │
│  🔒 Audit ID: ARM-2025-XXXXX          │
├────────────────────────────────────────┤
│                                        │
│  ┌──────────────────────────────────┐  │
│  │ Instagram           [CRITICAL 🔴] │  │
│  │ Meta Platforms · Social Media    │  │
│  ├──────────────────────────────────┤  │
│  │ What it can access:              │  │
│  │ 📍 Precise location  🎤 Mic      │  │
│  │ 📷 Camera  👥 Contacts  📁 Files │  │
│  ├──────────────────────────────────┤  │
│  │ In plain English:                │  │
│  │ "Instagram knows exactly where   │  │
│  │ you are, who you know, and what  │  │
│  │ you look like. All of this goes  │  │
│  │ to Meta's ad network."           │  │
│  ├──────────────────────────────────┤  │
│  │ What this means for you:         │  │
│  │ • Your location history is...    │  │
│  │ • Your contacts were uploaded... │  │
│  │ • [+ 1 more]                     │  │
│  ├──────────────────────────────────┤  │
│  │ What you can do:                 │  │
│  │ → Go to Settings → Apps →       │  │
│  │   Instagram → Permissions →      │  │
│  │   Disable Location               │  │
│  └──────────────────────────────────┘  │
│                                        │
│  [TikTok card — CRITICAL]              │
│  [WhatsApp card — HIGH]                │
│                                        │
│  [Compare all three →]                 │
└────────────────────────────────────────┘
```

### 10.4 Typography

- **Headings:** `font-bold text-slate-900` — strong, readable
- **Body:** `text-slate-700 text-sm` — comfortable reading size
- **Risk labels:** `font-bold uppercase tracking-wider` — unmistakable
- **Code/permissions:** `font-mono text-xs bg-slate-100 px-1 rounded` — technical feel

---

## 11. API Design

### 11.1 Endpoints

**POST /api/analyze**

Purpose: Core endpoint — analyzes app permissions.

Request:
```json
{
  "apps": ["Instagram", "TikTok", "WhatsApp"]
}
```

Validation rules:
- `apps` must be an array
- Length: 1 to 10 items
- Each item: string, 1 to 100 characters
- No item can match PII patterns (ArmorIQ enforces this too, but we validate first)

Success response (200 OK):
```json
{
  "results": [
    {
      "appName": "Instagram",
      "foundInDatabase": true,
      "permissions": [
        {
          "name": "Precise Location",
          "icon": "📍",
          "technical": "ACCESS_FINE_LOCATION",
          "severity": "high"
        },
        {
          "name": "Camera",
          "icon": "📷",
          "technical": "CAMERA",
          "severity": "medium"
        }
      ],
      "dataCollected": [
        {
          "category": "Location",
          "plain": "Your precise GPS location every time the app is open"
        },
        {
          "category": "Contacts",
          "plain": "Your entire contact list, including people not on Instagram"
        }
      ],
      "plainEnglishSummary": "Instagram can see exactly where you are, who you know, and what you look like. All this data flows into Meta's global advertising network to build a detailed profile of you.",
      "whatThisMeans": [
        "Meta builds a real-time map of everywhere you go",
        "Your friends' numbers were uploaded to Meta even if they never joined Instagram",
        "Your face geometry is stored from tagged photos"
      ],
      "recommendedActions": [
        "Disable Location permission: Settings → Apps → Instagram → Permissions → Location → Deny",
        "Revoke Contacts access: same path, set Contacts to Deny",
        "Periodically check Activity Log to review shared data"
      ],
      "riskScore": 42,
      "riskLevel": "CRITICAL",
      "riskColor": "#EF4444",
      "armoriqAuditId": "ARM-2025-06-21-00042",
      "trackers": ["Meta Audience Network", "Facebook Analytics", "AppsFlyer"]
    }
  ],
  "meta": {
    "appsAnalyzed": 3,
    "processedAt": "2025-06-21T10:30:00Z",
    "policyApplied": "consent_lens_data_policy",
    "armoriqAuditId": "ARM-2025-06-21-00042"
  }
}
```

Error responses:
```json
// 400 Bad Request
{ "error": "Invalid input", "details": "apps must be a non-empty array of strings" }

// 403 Forbidden (ArmorIQ blocked)
{ "error": "Request blocked", "reason": "PII detected in input", "auditId": "ARM-..." }

// 404 App Not Found (partial — included in results array)
{ "appName": "SomeUnknownApp123", "foundInDatabase": false, "riskLevel": "UNKNOWN" }

// 429 Too Many Requests
{ "error": "Rate limit exceeded", "retryAfter": 60 }

// 500 Internal Server Error
{ "error": "Analysis failed" }
```

---

**GET /api/health**

Purpose: Uptime check. Useful for demo to show the system is live.

Response (200 OK):
```json
{
  "status": "ok",
  "service": "ConsentLens API",
  "version": "1.0.0",
  "armoriqConnected": true,
  "timestamp": "2025-06-21T10:30:00Z"
}
```

---

**GET /api/apps/search?q=inst**

Purpose: Autocomplete — return matching app names from the database.

Response:
```json
{
  "suggestions": ["Instagram", "Instacart", "InShot"],
  "query": "inst"
}
```

---

## 12. Database / Data Schema

### 12.1 app_permissions.json Structure

This is the full schema for the permission database file. Build this in advance.

```json
{
  "version": "1.0",
  "last_updated": "2025-06-20",
  "app_count": 50,
  "apps": [
    {
      "id": "string — lowercase, no spaces (e.g. 'instagram')",
      "name": "string — display name (e.g. 'Instagram')",
      "aliases": ["string — alternative names/spellings"],
      "developer": "string — company name",
      "category": "string — (Social Media | Maps & Navigation | Messaging | Entertainment | Finance | Productivity | Games | Health | Shopping | Utilities)",
      "platforms": ["android", "ios"],
      "permissions": {
        "android": ["array of android.permission.X strings"],
        "ios": ["array of NSXxxUsageDescription strings"]
      },
      "data_collected": [
        {
          "category": "string — data category (Location | Contacts | Camera | Microphone | etc.)",
          "specifics": "string — detailed description of what is collected",
          "purpose": "string — stated purpose per privacy policy",
          "shared_with": ["array of entities data is shared with"],
          "retained_for": "string — retention period"
        }
      ],
      "known_trackers": ["array of tracker/SDK names"],
      "risk_factors": ["array of specific risk descriptions"],
      "plain_risk_summary": "string — 1–2 sentence summary of the risk profile",
      "risk_score_base": "number — pre-calculated base score (0–100)",
      "risk_level": "LOW | MEDIUM | HIGH | CRITICAL",
      "sources": ["URLs of privacy policy / data sources used"],
      "last_updated": "YYYY-MM string"
    }
  ]
}
```

---

## 13. 8-Hour Build Timeline

### Overview

| Time | Phase | Goal |
|---|---|---|
| 0:00–0:30 | Setup | Environment, repos, accounts |
| 0:30–1:00 | Data | Build permission database |
| 1:00–2:30 | Backend Core | API + ArmorIQ + DB lookup |
| 2:30–4:00 | Frontend | UI, input, results cards |
| 4:00–5:00 | AI Integration | Claude API for plain English |
| 5:00–5:30 | Connect | Wire frontend to backend |
| 5:30–6:30 | Testing & Polish | Fix bugs, improve UI |
| 6:30–7:00 | Notion / PPT | Update build log, finish slides |
| 7:00–8:00 | Demo rehearsal + buffer | Practice pitch |

---

### Hour 0:00–0:30 — Setup

**All team members do simultaneously:**

- [ ] Create GitHub repo: `consentlens`
- [ ] Set up Notion workspace (paste Startup OS template, duplicate it)
- [ ] Everyone clones the repo
- [ ] Create project structure (folders from Section 5.4)
- [ ] Create `.env.example` file with all needed variables:
  ```
  ANTHROPIC_API_KEY=
  ARMORIQ_API_KEY=
  ARMORIQ_AGENT_ID=
  ARMORIQ_POLICY_ID=consent_lens_data_policy
  PORT=3001
  FRONTEND_URL=http://localhost:5173
  ```
- [ ] Person responsible for ArmorIQ: log into platform.armoriq.ai, create workspace,
      register agent, get API key, create policy
- [ ] Person responsible for Claude: log into console.anthropic.com, get API key
- [ ] Person responsible for frontend: `npm create vite@latest consentlens-frontend -- --template react && npm install tailwindcss axios`

---

### Hour 0:30–1:00 — Build the Permission Database

**Who does this:** 1–2 team members working in parallel

- [ ] Create `backend/src/data/app_permissions.json` with the schema from Section 12.1
- [ ] Add at least 20 apps using the cheat sheet from Section 8.4
- [ ] Priority order: Instagram, TikTok, WhatsApp, Facebook, Snapchat, Google Maps, Uber,
      Twitter, Truecaller, Spotify, then fill in more
- [ ] Each entry needs at minimum: `name`, `permissions`, `data_collected`, `risk_level`,
      `risk_score_base`, `plain_risk_summary`
- [ ] Commit to GitHub

---

### Hour 1:00–2:30 — Backend Core

**Who does this:** 1–2 backend-focused team members

**Deliverables by end of this block:**
- [ ] Express server running on port 3001
- [ ] `GET /api/health` returns 200
- [ ] `POST /api/analyze` reads from the permission DB and returns raw data (AI integration
      comes later)
- [ ] ArmorIQ middleware wired in and calling the SDK
- [ ] Input validation working

**Build order:**
1. `app.js` — basic Express setup with CORS and JSON middleware
2. `routes/health.js` — simple health check
3. `routes/analyze.js` — stub that just returns the DB data for the requested apps
4. `middleware/inputValidator.js` — validate the request body
5. `services/permissionLookup.js` — read from the JSON file, match app names
6. `middleware/armoriqGuard.js` — integrate ArmorIQ SDK
7. `services/riskScoring.js` — apply the scoring formula from Section 8.2
8. Test with curl or Postman

---

### Hour 2:30–4:00 — Frontend Build

**Who does this:** 1–2 frontend-focused team members

**Deliverables by end of this block:**
- [ ] Home page with app name input (chip/tag style preferred)
- [ ] Results page layout with card components
- [ ] RiskBadge component with color coding
- [ ] PermissionCard component skeleton
- [ ] API call set up in `src/services/api.js` (can use mock data initially)
- [ ] ArmorIQ policy badge visible on results page
- [ ] Responsive layout (works on both desktop and mobile)

**Build order:**
1. `src/App.jsx` — basic routing (Home ↔ Results)
2. `src/pages/Home.jsx` — input form
3. `src/services/api.js` — axios call to backend (use hardcoded mock initially)
4. `src/components/RiskBadge.jsx` — the color badge
5. `src/components/PermissionCard.jsx` — full app result card
6. `src/pages/Results.jsx` — renders list of PermissionCards
7. Mobile responsiveness check

---

### Hour 4:00–5:00 — AI Integration (Claude)

**Who does this:** Backend developer

**Deliverables:**
- [ ] `services/aiAnalysis.js` calling Claude API with structured prompts
- [ ] Plain-English summaries returning in the API response
- [ ] "What this means" bullet points AI-generated
- [ ] Fallback to pre-written text if API fails

**The key AI prompt (see full prompt in Section 19.2)**

---

### Hour 5:00–5:30 — Integration

**Who does this:** Whoever finishes first helps

- [ ] Connect frontend `api.js` to real backend (change from mock to real endpoint)
- [ ] Test full flow: type app name → see real results
- [ ] Fix any CORS issues
- [ ] Fix any data format mismatches between backend and frontend

---

### Hour 5:30–6:30 — Testing, Debugging, Polish

- [ ] Test all 5 priority apps from the P0 list
- [ ] Test unknown app name (graceful "App not found" state)
- [ ] Test invalid input (numbers, symbols, email address)
- [ ] Verify ArmorIQ audit log has entries in the platform dashboard
- [ ] Polish: loading spinner, error messages, empty states
- [ ] Mobile layout final check
- [ ] Screenshot results for the presentation slides

---

### Hour 6:30–7:00 — Notion + Slides

- [ ] Update Notion build log with all completed features
- [ ] Complete all 7 presentation slides (see Section 16)
- [ ] Add demo screenshots to Slide 7

---

### Hour 7:00–8:00 — Demo Rehearsal

- [ ] Run the demo end-to-end 3 times
- [ ] Practice the 2-minute pitch (see Section 18)
- [ ] Make sure the laptop running the demo is charged
- [ ] Prepare for the "how does ArmorIQ work" question
- [ ] Decide who does the demo and who answers technical questions

---

## 14. Team Role Assignments

Assign one person per role. Multiple roles can be combined for smaller teams.

| Role | Primary Responsibilities | Skills Needed |
|---|---|---|
| **Backend Lead** | Express server, API routes, permission lookup service, risk scoring, deployment | Node.js/Python, REST APIs |
| **ArmorIQ Integration Lead** | ArmorIQ platform setup, SDK integration, policy configuration, audit log demo | Can be any developer — follow Section 7 step by step |
| **Frontend Lead** | React components, UI, input/results pages, API integration | React, Tailwind CSS, basic JS |
| **Data & AI Lead** | Build permission database, design Claude prompts, AI analysis service | Research, JSON, any language |
| **Presentation & PM** | Slides, Notion workspace, demo rehearsal, pitch delivery | Communication, organization |

**For a 3-person team, suggested splits:**
- Person A: Backend Lead + ArmorIQ
- Person B: Frontend Lead
- Person C: Data + AI + Presentation

**For a 4-person team:**
- Person A: Backend Lead
- Person B: ArmorIQ + AI Integration
- Person C: Frontend Lead
- Person D: Data + Presentation

---

## 15. Notion Workspace Setup (Bonus Track)

This section is for winning the Notion hamper prize. Setting up Notion properly takes about
30 minutes and must be done at the start of the day.

### 15.1 One-Time Setup (Hour 0)

1. One team member goes to the Startup OS template URL provided in the event materials
2. Click **Duplicate** → rename to "ConsentLens — NeuroX 2025"
3. Share the workspace with all team members (invite by email)
4. Everyone joins on their laptop or phone

### 15.2 Projects Database — Set Up ConsentLens

Create one project in the Projects database:

| Field | Value |
|---|---|
| Project Name | ConsentLens v1 |
| Status | In Progress |
| Repo URL | (your GitHub repo URL — needed for Relay/GitHub automation) |
| Problem | Users have no idea what apps collect about them |
| Users | All smartphone users; 6.8B+ globally |
| Scope | Web app analyzing top 50 apps; ArmorIQ policy; AI explanations |
| Milestone 1 | Permission database complete |
| Milestone 2 | Backend API + ArmorIQ integration |
| Milestone 3 | Frontend complete |
| Milestone 4 | AI integration |
| Milestone 5 | Demo-ready end-to-end |

### 15.3 Tasks Database — Pre-populate

Create these tasks linked to the ConsentLens project:

| Task | Owner | Priority | Status |
|---|---|---|---|
| Set up GitHub repo | [Person A] | High | To Do |
| Create app_permissions.json with 20+ apps | [Person C] | High | To Do |
| Set up ArmorIQ account + policy | [Person B] | High | To Do |
| Build Express server + routes | [Person A] | High | To Do |
| Build React frontend | [Person C] | High | To Do |
| ArmorIQ SDK integration | [Person B] | High | To Do |
| Claude AI integration | [Person A/B] | High | To Do |
| Connect frontend to backend | [Person C] | Medium | To Do |
| Polish UI | [Person C] | Medium | To Do |
| Write PPT slides | [Person D] | Medium | To Do |
| Build log entries (ongoing) | All | Low | Ongoing |
| Demo rehearsal | All | High | To Do |

**Move cards through the board as you complete them.** Judges look at activity through
the day, not just the final state.

### 15.4 Build Log — Update Every 30–45 Minutes

Create a build log page (or database) and add entries throughout the day:

```
10:00 — Environment setup complete. GitHub repo created. Team members added.
10:30 — app_permissions.json: 20 apps added. TikTok, Instagram, WhatsApp, Facebook done.
11:00 — Express server running. /api/health returning 200. ArmorIQ account created.
11:45 — ArmorIQ policy configured: consent_lens_data_policy. SDK integrated.
12:30 — POST /api/analyze returning permission data for known apps.
13:00 — React frontend running. Home page input working. Risk badge components done.
...
```

**This is crucial.** Judges explicitly look for build logs with real-time updates, not
one entry at the end.

### 15.5 Automation (Bonus Points on Notion Track)

If time allows after the main project is working, set up the GitHub → Build Log automation
using Relay.app as described in the hackathon Notion materials. This is worth extra points
in the Notion track.

---

## 16. Presentation Slides — Slide-by-Slide

The hackathon specifies exactly 7 slides. Here is the complete content for each:

---

### Slide 1 — Title

**Project Title:** ConsentLens

**Subtitle:** App permission reality checker — Know what your apps really know about you.

**Team Name & ID:** [your team name and ID]

**College Name:** [your college name]

**Visual suggestion:** Full-width dark background, large bold "ConsentLens" text in white,
a subtle lock icon or eye icon as a logo, tagline below in smaller text.

---

### Slide 2 — Problem + Existing Gap

**What is the problem?**
The average app requests 12 permissions. You tap "Allow All" without knowing what you
agreed to. Apps track your location, upload your contact list, access your microphone,
and sell this data — and you have no way to find out without reading 50 pages of legalese.

**Who is affected?**
Every smartphone user. 6.8 billion people globally. Especially non-technical users,
teenagers, elderly users, and professionals handling sensitive data.

**Current solutions (if any):**
App Store privacy labels exist but use technical jargon and are never read. Exodus Privacy
exists but requires developer knowledge. No tool makes this accessible to regular users.

**Key gaps / limitations:**
- No plain-language explanation of impact
- No risk scoring that non-technical users can act on
- No zero-setup tool (current tools require accounts, app downloads, or technical knowledge)
- No privacy guarantee for the tool itself

---

### Slide 3 — Proposed Solution

**Your idea in simple terms:**
ConsentLens: type in any app name, get back an instant plain-language report of exactly
what that app is harvesting — no login, no data uploaded, nothing collected about you.
Enforced by ArmorIQ policy: only app names enter the system.

**How it solves the problem:**
Users type app names → ArmorIQ verifies only metadata is processed → permission database
is queried → Claude AI generates plain-English explanations → risk-scored results appear
in seconds.

**What makes it better:**
1. Zero personal data required — total privacy from the privacy tool itself
2. AI-generated human explanations, not technical jargon
3. Immediate risk scoring (CRITICAL/HIGH/MEDIUM/LOW)
4. Actionable steps to reduce exposure
5. Enforced by ArmorIQ audit trail — the privacy promise is verifiable

---

### Slide 4 — Architecture + Tech Stack

**System flow:**
```
Input (App Names) → ArmorIQ Policy Check → Permission DB Lookup
     → Claude AI Analysis → Risk Scoring → Results Dashboard
```

**Components:**
- **Frontend:** React + Vite + Tailwind CSS
- **Backend:** Node.js + Express
- **AI:** Claude claude-sonnet-4-6 (Anthropic API) — plain language generation
- **Security:** ArmorIQ SDK — intent verification, policy enforcement, audit logging
- **Database:** JSON permission database — curated data for 50+ apps

**Tech Stack table:**

| Layer | Technology |
|---|---|
| Frontend | React 18, Vite, Tailwind CSS |
| Backend | Node.js, Express |
| AI/ML | Anthropic Claude API |
| Security | ArmorIQ TypeScript SDK, platform.armoriq.ai |
| Data | Curated JSON + Exodus Privacy data |
| Deployment | Localhost (demo) / Vercel + Railway |

---

### Slide 5 — Key Features

1. **Zero-PII Architecture** — Only app names enter the system. ArmorIQ policy enforced
   at the API level — if you accidentally type an email address, it is blocked and logged.

2. **AI Plain-Language Reports** — Claude translates technical permission strings into
   sentences a 12-year-old can understand: "Instagram can see exactly where you are and
   shares it with Meta's ad network."

3. **Risk Scoring Engine** — Weighted formula across 15+ permission types, data-sharing
   practices, and ecosystem factors. Results in LOW / MEDIUM / HIGH / CRITICAL scores with
   color coding.

4. **Multi-App Comparison** — Analyze up to 5 apps simultaneously and compare them
   side-by-side to see which is most invasive.

5. **Actionable Advice** — Every result includes specific Settings navigation paths to
   revoke unnecessary permissions on Android and iOS.

---

### Slide 6 — Impact + Feasibility

**Who will benefit:**
- Primary: All 500M+ smartphone users in India (and 6.8B globally)
- Secondary: Enterprises auditing apps on employee devices
- Tertiary: Parents monitoring apps their children use

**Real-world impact:**
- Empowers users to make informed consent decisions (fulfills India's DPDP Act 2023)
- Reduces passive data exposure without requiring any technical knowledge
- Can process thousands of app queries per day with no user data retained

**Scalability:**
- Permission database can grow to 10,000+ apps via community contributions
- AI analysis cost: ~$0.002 per query (Claude API pricing), viable at scale
- Can integrate with Google Play API / Apple App Store API for automatic permission updates
- B2B: Enterprise plan for IT teams auditing corporate device app libraries

**Basic feasibility:**
- MVP built in 8 hours with 4 team members
- Database expandable via public app store APIs (no manual curation needed at scale)
- Monthly operating cost for 10,000 queries/day: < $200
- No app install required — web-based, works on any device

---

### Slide 7 — Demo + Conclusion

**Demo:**
[Live demo URL or QR code if deployed, or "Live on laptop" instruction]

Screenshots:
1. The input box — type "TikTok, WhatsApp, Instagram"
2. Loading state with ArmorIQ audit badge
3. Results: TikTok CRITICAL card with plain-language explanation
4. ArmorIQ platform dashboard showing the audit log with real entries

**One-line strong conclusion:**
"In a world where you click Allow without thinking, ConsentLens gives you five seconds of
clarity that changes what you click next."

**Why this should be selected:**
- Solves a real, universal problem that every person in this room has personally experienced
- ArmorIQ integration is architecturally meaningful — the security is the product
- Working demo with real AI-generated explanations and live audit logging
- Immediately deployable with a clear path to production scale

---

## 17. Judging Criteria Alignment Map

This table shows exactly how ConsentLens scores against each judging dimension. Use this
when preparing for Q&A.

| Criterion | How ConsentLens Addresses It | Evidence to Show |
|---|---|---|
| **Problem clarity** | Data privacy of apps is universally understood and affects everyone | Stat: average app requests 12 permissions; India DPDP Act context |
| **Solution fit** | Input: app names. Output: plain-language risk report. Direct mapping. | Live demo |
| **Innovation** | AI for permission translation + ArmorIQ as privacy guarantee for the privacy tool | Show ArmorIQ blocking a PII input in real time |
| **Technical depth** | Real backend, real API, real ArmorIQ calls, real Claude responses | GitHub repo open for inspection |
| **ArmorIQ integration** | Intent verification middleware on every request, policy-gated pipeline, live audit log | ArmorIQ dashboard with live audit entries |
| **Demo quality** | Clean UI, loads in 3 seconds, shows CRITICAL result for TikTok clearly | Practice demo 3x before presenting |
| **Impact** | 6.8B potential users, India DPDP Act alignment, enterprise extension path | Slide 6 content |
| **Feasibility** | Web app, no installs, expandable DB, low API cost | Cost analysis on slide 6 |

---

## 18. Demo Script

Practice this until it is smooth. Total time: under 3 minutes.

### The Pitch (90 seconds)

> "How many of you have installed more than 20 apps on your phone?"
> [pause for hands]
>
> "How many of you know which of those apps can access your microphone right now?"
> [fewer hands]
>
> "That gap — between what apps know about you and what you know about what apps know —
> is exactly the problem ConsentLens solves."
>
> "Here's how it works in about five seconds."

### The Live Demo (60 seconds)

1. Open the browser to `localhost:5173` (or your deployed URL)
2. Type `TikTok` into the search box
3. Click Analyze
4. Point to the red CRITICAL badge while saying:
   > "TikTok gets a CRITICAL rating because it reads your clipboard every time you switch
   > to the app — which means if you copied a password from your password manager, TikTok
   > could read it."
5. Point to the plain language summary:
   > "Here's exactly what it means in plain English — no technical jargon."
6. Point to the ArmorIQ badge:
   > "And notice this — ArmorIQ is enforcing a policy that means only the app name,
   > TikTok, ever entered our system. No personal data, no account information, nothing.
   > We can prove it — here's the live audit log."
7. Switch tab to platform.armoriq.ai, show the audit log with the real entry
8. Back to the app: add `Instagram` and `WhatsApp` to show comparison

### The Close (30 seconds)

> "ConsentLens makes privacy transparency instant, requires nothing from the user,
> and is backed by ArmorIQ's policy enforcement so the privacy promise is provable,
> not just a marketing claim."
>
> "We built this in 8 hours. The permission database can expand to 10,000 apps.
> And every smartphone user in India has a reason to use it today."

---

## 19. Code Starter Snippets

### 19.1 Backend — app.js Entry Point (Node.js + Express)

```javascript
// backend/src/app.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');

const analyzeRouter = require('./routes/analyze');
const healthRouter = require('./routes/health');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors({ origin: process.env.FRONTEND_URL || 'http://localhost:5173' }));
app.use(express.json());

// Request ID middleware (useful for ArmorIQ audit linking)
app.use((req, res, next) => {
  req.id = `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  next();
});

// Routes
app.use('/api', healthRouter);
app.use('/api', analyzeRouter);

// Start
app.listen(PORT, () => {
  console.log(`ConsentLens API running on http://localhost:${PORT}`);
  console.log(`ArmorIQ Agent: ${process.env.ARMORIQ_AGENT_ID}`);
});
```

---

### 19.2 Backend — AI Analysis Service with Claude

```javascript
// backend/src/services/aiAnalysis.js
const Anthropic = require('@anthropic-ai/sdk');

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY
});

/**
 * Takes an array of permission data objects and returns AI-generated
 * plain-language analysis for each app.
 * 
 * @param {Array} permissionDataArray - Array of app permission objects from DB
 * @returns {Array} Array of AI analysis objects, one per app
 */
async function analyzeApps(permissionDataArray) {
  const results = [];

  for (const appData of permissionDataArray) {
    if (!appData.found) {
      results.push({
        appName: appData.name,
        summary: 'This app was not found in our database. We cannot provide an analysis.',
        whatThisMeans: [],
        actions: []
      });
      continue;
    }

    try {
      const analysis = await generateAnalysisForApp(appData);
      results.push(analysis);
    } catch (err) {
      console.error(`AI analysis failed for ${appData.name}:`, err);
      // Fallback to pre-written summary from database
      results.push({
        appName: appData.name,
        summary: appData.plain_risk_summary || 'Analysis temporarily unavailable.',
        whatThisMeans: appData.risk_factors || [],
        actions: []
      });
    }
  }

  return results;
}

async function generateAnalysisForApp(appData) {
  const permissionsFormatted = appData.data_collected
    .map(d => `- ${d.category}: ${d.specifics} (shared with: ${d.shared_with.join(', ')})`)
    .join('\n');

  const prompt = `
You are a privacy expert explaining app data collection to an ordinary person with no technical background.

App: ${appData.name}
Developer: ${appData.developer}
Category: ${appData.category}
Risk Level: ${appData.risk_level}

Data this app collects:
${permissionsFormatted}

Known data-sharing practices:
${appData.risk_factors.join('\n')}

Please respond with a JSON object (no markdown, no code fences) with exactly these fields:
{
  "summary": "2-3 sentences in plain English. Explain what the app knows about you and where that information goes. Avoid technical terms. Be direct, not alarmist.",
  "whatThisMeans": [
    "Bullet 1: one specific real-world consequence for the user",
    "Bullet 2: another specific consequence",
    "Bullet 3: another specific consequence"
  ],
  "actions": [
    "Specific action 1 the user can take to reduce exposure, with Settings navigation path",
    "Specific action 2"
  ]
}

Important: The summary must be understandable by a 14-year-old. The whatThisMeans items must be concrete, not abstract. The actions must be actionable today.
`.trim();

  const response = await anthropic.messages.create({
    model: 'claude-sonnet-4-6',
    max_tokens: 600,
    messages: [{ role: 'user', content: prompt }]
  });

  const responseText = response.content[0].text;

  // Parse the JSON response
  try {
    const parsed = JSON.parse(responseText);
    return {
      appName: appData.name,
      summary: parsed.summary,
      whatThisMeans: parsed.whatThisMeans || [],
      actions: parsed.actions || []
    };
  } catch (parseErr) {
    // If Claude didn't return clean JSON, extract the text
    return {
      appName: appData.name,
      summary: responseText.substring(0, 300),
      whatThisMeans: [],
      actions: []
    };
  }
}

module.exports = { analyzeApps };
```

---

### 19.3 Backend — Permission Lookup Service

```javascript
// backend/src/services/permissionLookup.js
const fs = require('fs');
const path = require('path');

// Load the database once at startup
const DB_PATH = path.join(__dirname, '../data/app_permissions.json');
let permissionsDB = null;

function loadDatabase() {
  if (!permissionsDB) {
    try {
      const raw = fs.readFileSync(DB_PATH, 'utf8');
      permissionsDB = JSON.parse(raw);
      console.log(`Loaded ${permissionsDB.apps.length} apps from permission database`);
    } catch (err) {
      console.error('Failed to load permission database:', err);
      permissionsDB = { apps: [] };
    }
  }
  return permissionsDB;
}

/**
 * Find an app in the database by name (case-insensitive, fuzzy match)
 */
function findApp(appName) {
  const db = loadDatabase();
  const normalized = appName.toLowerCase().trim().replace(/\s+/g, '');

  // Try exact match first
  let found = db.apps.find(a =>
    a.name.toLowerCase().replace(/\s+/g, '') === normalized
  );

  // Try alias match
  if (!found) {
    found = db.apps.find(a =>
      a.aliases && a.aliases.some(alias =>
        alias.toLowerCase().replace(/\s+/g, '') === normalized
      )
    );
  }

  // Try partial match (app name contains the search term)
  if (!found) {
    found = db.apps.find(a =>
      a.name.toLowerCase().includes(appName.toLowerCase()) ||
      appName.toLowerCase().includes(a.name.toLowerCase())
    );
  }

  return found;
}

/**
 * Get permission data for an array of app names.
 * Returns an array of the same length; unfound apps have found: false.
 */
function getPermissions(appNames) {
  return appNames.map(name => {
    const app = findApp(name);
    if (!app) {
      return {
        found: false,
        name: name,
        risk_level: 'UNKNOWN',
        risk_score_base: 0
      };
    }
    return { ...app, found: true };
  });
}

/**
 * Return all app names for autocomplete
 */
function getAllAppNames() {
  const db = loadDatabase();
  return db.apps.map(a => a.name);
}

module.exports = { getPermissions, getAllAppNames };
```

---

### 19.4 Backend — Risk Scoring Engine

```javascript
// backend/src/services/riskScoring.js

const PERMISSION_WEIGHTS = {
  'ACCESS_FINE_LOCATION': 8,          // Precise GPS
  'ACCESS_COARSE_LOCATION': 3,        // Approximate location
  'CAMERA': 6,                        // Camera access
  'RECORD_AUDIO': 6,                  // Microphone
  'READ_CONTACTS': 5,                 // Contact list
  'WRITE_CONTACTS': 5,
  'READ_SMS': 6,                      // SMS access
  'SEND_SMS': 6,
  'READ_CALL_LOG': 5,                 // Call history
  'READ_PHONE_STATE': 4,              // IMEI, call state
  'USE_BIOMETRIC': 10,                // Fingerprint/face
  'READ_EXTERNAL_STORAGE': 4,        // Storage access
  'WRITE_EXTERNAL_STORAGE': 4,
  'ACCESS_BACKGROUND_LOCATION': 5,   // Always-on location
  'BLUETOOTH': 2,                     // Device discovery
  'NFC': 3,                           // NFC (payment risk)
};

const DATA_SHARING_PENALTIES = {
  'sells_to_data_brokers': 15,
  'shares_with_advertisers': 8,
  'indefinite_retention': 3,
  'foreign_jurisdiction': 5,
  'part_of_ad_ecosystem': 6,
  'known_violations': 5
};

const RISK_LEVELS = [
  { max: 9,   level: 'LOW',      color: '#22C55E', emoji: '🟢' },
  { max: 19,  level: 'MEDIUM',   color: '#F59E0B', emoji: '🟡' },
  { max: 34,  level: 'HIGH',     color: '#F97316', emoji: '🟠' },
  { max: 999, level: 'CRITICAL', color: '#EF4444', emoji: '🔴' }
];

function scoreApp(appData) {
  if (!appData.found) {
    return { score: 0, level: 'UNKNOWN', color: '#94A3B8', emoji: '⚪' };
  }

  // Use pre-calculated base score if available
  let score = appData.risk_score_base || 0;

  // Determine risk level
  const levelObj = RISK_LEVELS.find(l => score <= l.max) || RISK_LEVELS[3];

  return {
    score,
    level: levelObj.level,
    color: levelObj.color,
    emoji: levelObj.emoji
  };
}

/**
 * Score an array of app data objects
 */
function scoreAll(permissionDataArray) {
  return permissionDataArray.map(scoreApp);
}

module.exports = { scoreAll, scoreApp };
```

---

### 19.5 Frontend — Main App.jsx with Routing

```jsx
// frontend/src/App.jsx
import { useState } from 'react';
import Home from './pages/Home';
import Results from './pages/Results';
import { analyzeApps } from './services/api';

export default function App() {
  const [page, setPage] = useState('home');
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleAnalyze = async (appNames) => {
    setLoading(true);
    setError(null);
    try {
      const data = await analyzeApps(appNames);
      setResults(data);
      setPage('results');
    } catch (err) {
      setError(err.message || 'Analysis failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    setPage('home');
    setResults(null);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {page === 'home' && (
        <Home onAnalyze={handleAnalyze} loading={loading} error={error} />
      )}
      {page === 'results' && results && (
        <Results results={results} onBack={handleBack} />
      )}
    </div>
  );
}
```

---

### 19.6 Frontend — RiskBadge Component

```jsx
// frontend/src/components/RiskBadge.jsx

const RISK_STYLES = {
  LOW:      { bg: 'bg-green-100',  text: 'text-green-700',  border: 'border-green-300',  emoji: '🟢' },
  MEDIUM:   { bg: 'bg-amber-100',  text: 'text-amber-700',  border: 'border-amber-300',  emoji: '🟡' },
  HIGH:     { bg: 'bg-orange-100', text: 'text-orange-700', border: 'border-orange-300', emoji: '🟠' },
  CRITICAL: { bg: 'bg-red-100',    text: 'text-red-700',    border: 'border-red-300',    emoji: '🔴' },
  UNKNOWN:  { bg: 'bg-slate-100',  text: 'text-slate-700',  border: 'border-slate-300',  emoji: '⚪' }
};

export default function RiskBadge({ level, score }) {
  const style = RISK_STYLES[level] || RISK_STYLES.UNKNOWN;

  return (
    <span className={`
      inline-flex items-center gap-1 px-3 py-1 rounded-full
      text-sm font-bold uppercase tracking-wider border
      ${style.bg} ${style.text} ${style.border}
    `}>
      {style.emoji} {level} {score !== undefined && `(${score})`}
    </span>
  );
}
```

---

### 19.7 Frontend — API Service

```javascript
// frontend/src/services/api.js
import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

/**
 * Analyze a list of app names.
 * @param {string[]} appNames - Array of app name strings
 * @returns {Object} - { results: [...], meta: {...} }
 */
export async function analyzeApps(appNames) {
  try {
    const response = await axios.post(`${API_BASE}/analyze`, {
      apps: appNames
    });
    return response.data;
  } catch (error) {
    if (error.response) {
      const msg = error.response.data?.error || 'Analysis failed';
      throw new Error(msg);
    }
    throw new Error('Cannot connect to server. Make sure the backend is running.');
  }
}

/**
 * Get autocomplete suggestions
 */
export async function searchApps(query) {
  try {
    const response = await axios.get(`${API_BASE}/apps/search`, {
      params: { q: query }
    });
    return response.data.suggestions;
  } catch {
    return [];
  }
}
```

---

## 20. Testing & QA Checklist

Run through every item in this checklist before the demo.

### Backend Testing (use curl or Postman)

```bash
# Test 1: Health check
curl http://localhost:3001/api/health
# Expected: { "status": "ok", "armoriqConnected": true }

# Test 2: Valid single app
curl -X POST http://localhost:3001/api/analyze \
  -H "Content-Type: application/json" \
  -d '{"apps": ["Instagram"]}'
# Expected: 200 with result containing riskLevel "CRITICAL"

# Test 3: Multiple apps
curl -X POST http://localhost:3001/api/analyze \
  -H "Content-Type: application/json" \
  -d '{"apps": ["Instagram", "WhatsApp", "Signal"]}'
# Expected: 200 with 3 results, Signal should be LOW

# Test 4: Unknown app
curl -X POST http://localhost:3001/api/analyze \
  -H "Content-Type: application/json" \
  -d '{"apps": ["MadeUpApp12345"]}'
# Expected: 200 with foundInDatabase: false for that app

# Test 5: PII injection (ArmorIQ should block this)
curl -X POST http://localhost:3001/api/analyze \
  -H "Content-Type: application/json" \
  -d '{"apps": ["john.doe@gmail.com"]}'
# Expected: 403 blocked by ArmorIQ policy (this is the KEY demo feature)

# Test 6: Empty array (should fail validation)
curl -X POST http://localhost:3001/api/analyze \
  -H "Content-Type: application/json" \
  -d '{"apps": []}'
# Expected: 400 validation error

# Test 7: Too many apps
curl -X POST http://localhost:3001/api/analyze \
  -H "Content-Type: application/json" \
  -d '{"apps": ["a","b","c","d","e","f","g","h","i","j","k"]}'
# Expected: 400 — maximum 10 apps per request
```

### Frontend Testing

- [ ] Home page loads without errors
- [ ] Can type a single app name and click Analyze
- [ ] Loading spinner appears while waiting for results
- [ ] Results page renders at least one card
- [ ] Risk badge shows correct color for CRITICAL apps
- [ ] ArmorIQ audit badge visible on results page
- [ ] Back button returns to home page
- [ ] Works on mobile viewport (375px wide)
- [ ] Empty state shows helpful suggestions
- [ ] Error state shows friendly message if backend is down

### ArmorIQ Verification

- [ ] policy `consent_lens_data_policy` visible on platform.armoriq.ai
- [ ] Agent `consentlens-backend-v1` registered and active
- [ ] After running Test 2 above: audit log has a new entry
- [ ] After running Test 5 (PII injection): audit log shows a "BLOCKED" entry
- [ ] Audit log timestamps match your test times

---

## 21. Troubleshooting Guide

### Problem: ArmorIQ SDK import fails

**Cause:** Package name may differ from `@armoriq/sdk`

**Fix:** Go to `docs.armoriq.ai` and get the exact npm package name from the docs.
If the SDK is not available as npm package, use their REST API directly with fetch/axios.

**REST API fallback:**
```javascript
// If SDK doesn't work, call ArmorIQ REST API directly
async function verifyIntentREST(apps) {
  const response = await axios.post('https://api.armoriq.ai/v1/verify-intent', {
    agent_id: process.env.ARMORIQ_AGENT_ID,
    action: 'app_permission_lookup',
    inputs: apps,
    policy_id: process.env.ARMORIQ_POLICY_ID
  }, {
    headers: { 'Authorization': `Bearer ${process.env.ARMORIQ_API_KEY}` }
  });
  return response.data;
}
```

---

### Problem: Claude API returns non-JSON text

**Cause:** The model added explanation text around the JSON

**Fix:** Already handled in `aiAnalysis.js` with `JSON.parse` in try-catch. The fallback
returns the raw text if parsing fails. Additionally, strengthen the prompt:
```
// Add to the end of your prompt:
"CRITICAL: Your response must be only the JSON object. No explanation before or after.
No markdown code fences. No 'Here is the JSON:' prefix. Start with { and end with }."
```

---

### Problem: CORS error in browser

**Cause:** Frontend (port 5173) can't reach backend (port 3001)

**Fix:** Make sure `FRONTEND_URL` in `.env` is `http://localhost:5173` and
the CORS middleware in `app.js` uses it:
```javascript
app.use(cors({ origin: process.env.FRONTEND_URL }));
```

---

### Problem: App not found in database

**Cause:** Spelling mismatch (e.g., user typed "Whatsapp" vs database has "WhatsApp")

**Fix:** The `findApp()` function normalizes to lowercase. If still not matching, add
the variant as an alias in the database entry.

---

### Problem: ArmorIQ platform dashboard shows no entries

**Cause:** SDK calls are failing silently (check error logs)

**Fix:** Wrap the `armor.verifyIntent()` call in a more verbose try-catch and log the
full error. Check that `ARMORIQ_API_KEY` and `ARMORIQ_AGENT_ID` are correctly set in `.env`.

---

### Problem: Demo is slow (taking 5+ seconds per request)

**Cause:** Sequential Claude API calls (one per app)

**Fix:** Use `Promise.all()` to call Claude for all apps in parallel:
```javascript
const aiResults = await Promise.all(
  permissionDataArray.map(app => generateAnalysisForApp(app))
);
```

---

### Problem: Vite proxy to avoid CORS in development

**Alternative fix for CORS issues:** Configure Vite to proxy API requests:
```javascript
// vite.config.js
export default {
  server: {
    proxy: {
      '/api': 'http://localhost:3001'
    }
  }
}
```
Then change `API_BASE` in `api.js` to just `/api`.

---

## 22. Resources & Links

### ArmorIQ

| Resource | URL |
|---|---|
| ArmorIQ Platform (dashboard, API keys, policies) | https://platform.armoriq.ai |
| ArmorIQ SDK Documentation | https://docs.armoriq.ai/docs |
| ArmorClaw Documentation | https://docs-openclaw.armoriq.ai/docs |
| ArmorClaw Tool | https://claw.armoriq.ai |

### Anthropic / Claude

| Resource | URL |
|---|---|
| Anthropic API Console (get API key) | https://console.anthropic.com |
| Anthropic API Documentation | https://docs.anthropic.com |
| Node.js SDK on npm | https://www.npmjs.com/package/@anthropic-ai/sdk |

### Public Permission Data Sources

| Resource | URL | What It Has |
|---|---|---|
| Exodus Privacy | https://reports.exodus-privacy.eu.org | Android app tracker + permission reports |
| App Store Privacy Labels | https://developer.apple.com/app-store/app-privacy-details | iOS permission standard |
| Google Play Data Safety | https://play.google.com | Android data safety labels |

### Hackathon Specific

| Resource | URL/Location |
|---|---|
| Notion Startup OS Template | Provided in hackathon materials (see "Step 2" in Notion section) |
| Relay.app (for GitHub → Notion automation) | https://relay.app |
| Event WhatsApp Group | Ask Atul Anand's contacts (LinkedIn/X: atulanand.co) |

### Development Tools

| Tool | URL |
|---|---|
| Vite (frontend build tool) | https://vitejs.dev |
| Tailwind CSS | https://tailwindcss.com |
| Railway (backend deployment) | https://railway.app |
| Vercel (frontend deployment) | https://vercel.com |
| Postman (API testing) | https://www.postman.com |

---

## 23. Glossary

| Term | Definition |
|---|---|
| **App Permission** | A declaration by an app of what device resources it needs access to (camera, location, contacts, etc.) — granted by the user |
| **PII (Personally Identifiable Information)** | Any data that can identify a specific person: name, email, phone, SSN, location history, biometrics |
| **ArmorIQ** | The security platform used in this project for policy enforcement, intent verification, and audit logging |
| **ArmorClaw** | ArmorIQ's open-source security scanning tool for pipelines |
| **Intent Verification** | An ArmorIQ feature that checks whether an incoming action matches a declared, approved intent before allowing it to proceed |
| **Audit Log** | An immutable record of every security decision made by the system — who requested what, when, and whether it was approved or blocked |
| **Policy Enforcement** | The act of applying a set of rules (a "policy") to block, allow, or modify actions in real time |
| **Plain-Language Output** | AI-generated text that explains technical information in everyday words, understandable without any background knowledge |
| **Risk Score** | A numerical value (0–100) assigned to an app representing the cumulative risk of its data collection and sharing practices |
| **Data Broker** | A company that collects personal data from multiple sources and sells it to other companies, typically for advertising purposes |
| **Shadow Profile** | A profile built by a platform about a person who has never signed up, using data (like contact lists) uploaded by people who have |
| **Tracker / SDK Tracker** | A third-party analytics or advertising library embedded in an app that collects data and sends it to a remote server |
| **DPDP Act 2023** | India's Digital Personal Data Protection Act — establishes users' rights to know what data is collected about them |
| **GDPR** | General Data Protection Regulation — EU law requiring transparent data collection practices |
| **Fuzzy Match** | A search technique that finds approximate matches rather than requiring exact spelling (e.g., "Insta" matching "Instagram") |
| **React** | A JavaScript library for building user interfaces using reusable components |
| **Express** | A minimal Node.js web framework for building API servers |
| **Vite** | A modern, fast build tool and development server for frontend JavaScript projects |
| **Tailwind CSS** | A utility-first CSS framework that provides pre-built styling classes (no custom CSS needed) |
| **REST API** | A web API that communicates using standard HTTP methods (GET, POST, etc.) and returns JSON data |
| **CORS** | Cross-Origin Resource Sharing — a browser security feature that blocks requests from different domains unless the server explicitly allows them |
| **Environment Variable** | A configuration value stored outside the code (in a .env file) — used for secrets like API keys |
| **MVP (Minimum Viable Product)** | The smallest version of the product that works for the demo — build this first, then add features if time allows |
| **Chip/Tag Input** | A UI pattern where you type a value, press Enter, and it appears as a removable "chip" — used for multi-app input |

---

## Appendix A — Pre-Hackathon Checklist (Do This Before June 21)

- [ ] Read this entire document
- [ ] Create accounts: ArmorIQ (platform.armoriq.ai), Anthropic (console.anthropic.com), GitHub
- [ ] Get API keys: ANTHROPIC_API_KEY, ARMORIQ_API_KEY — store them safely
- [ ] Install: Node.js 20+, npm, Git, VS Code (or preferred editor)
- [ ] Clone/create the project repo structure
- [ ] Start building `app_permissions.json` with at least the P0 apps
- [ ] Install Notion on laptop, duplicate the Startup OS template
- [ ] Watch the Notion walkthrough video (5 min) linked in the event materials
- [ ] Watch the ArmorIQ walkthrough video linked in the event materials
- [ ] Test that a basic Express server runs on your laptop
- [ ] Test that you can call the Claude API and get a response
- [ ] Charge your laptop, pack your charger

---

## Appendix B — One-Sentence Summaries for Each Major App

Use these as fallback `plain_risk_summary` values in the database if you run out of time
to write detailed entries:

| App | One-sentence summary |
|---|---|
| Instagram | Collects your location, contacts, camera, and microphone data for Meta's global advertising ecosystem. |
| TikTok | Reads your clipboard, tracks precise location, captures facial data, and has drawn scrutiny for data handling practices. |
| Facebook | Comprehensive behavioral tracking including location history, social graph, biometrics, and third-party browsing data. |
| WhatsApp | Uploads your full contact list to Meta and collects call metadata, though message content is end-to-end encrypted. |
| Snapchat | Captures facial geometry for lenses, shares location with Snap's social graph, and stores content on cloud servers. |
| Google Maps | Builds a permanent location history linked to your Google account and shares it within Google's advertising ecosystem. |
| Uber | Tracks your precise location at all times the app is running and builds a travel history profile. |
| Truecaller | Uploads your entire contacts database to identify unknown callers, giving Truecaller access to millions of people's numbers. |
| Twitter / X | Collects browsing behavior, location, and contact data for behavioral advertising. |
| Spotify | Accesses microphone and contacts; listening history is used for personalization and third-party music analytics. |
| LinkedIn | Collects professional network data, contact list, and browsing behavior within the Microsoft ecosystem. |
| Signal | Privacy-first design — encrypted, minimal data collection, no ads, no trackers. |
| Google Pay / PhonePe | Collects payment patterns, contacts, and location; subject to RBI and partner financial data regulations. |
| Zomato / Swiggy | Tracks precise location history, stores payment data, and builds delivery behavior profiles. |
| UC Browser | Has a history of allegations regarding unauthorized data collection and transmission. |
| ShareIt | Requests broad file and contact access with no encryption guarantees on data transfers. |

---

*Document version: 1.0 · Prepared for NeuroX Hackathon · June 21, 2025*
*Last updated: Day-before event*
*If you have questions about anything in this document, raise them in the team WhatsApp before the event.*
