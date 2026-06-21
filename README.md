<h1 align="center" id="title">ContractIQ</h1>

<p align="center"><img src="https://socialify.git.ci/0xashishtiwari/contractiq/image?font=Source+Code+Pro&amp;language=1&amp;name=1&amp;owner=1&amp;pattern=Brick+Wall&amp;stargazers=1&amp;theme=Light" alt="project-image"></p>

<p id="description">An AI-powered contract review platform that automates clause extraction risk assessment human review and final report generation using Trigger.dev workflows Cloudflare AI Gemini 2.5 Flash PostgreSQL and real-time streaming.</p>



<p align="center">
  <img
    src="https://raw.githubusercontent.com/0xashishtiwari/contractiq/main/docs/Contract_IQ_LANDING.png"
    alt="ContractIQ Landing Page"
    width="1000"
  />
</p>

<br/>

## System Architecture

<p align="center">
  <img
    src="https://raw.githubusercontent.com/0xashishtiwari/contractiq/main/docs/ContractIQ_ARCHITECHTURE.png"
    alt="ContractIQ Architecture"
    width="1000"
  />
</p>

<p align="center">
  <em>End-to-end workflow showing PDF ingestion, AI clause analysis, human review, Trigger.dev orchestration, and realtime summary streaming.</em>
</p>


## Features

- Secure email and password authentication
- PDF contract upload and text extraction
- AI-powered clause segmentation
- Risk assessment and ambiguity detection
- Clause-level recommendations
- Human review dashboard
- Approve, reject, and annotate clauses
- Durable workflow orchestration with Trigger.dev
- Waitpoint-based human-in-the-loop workflow
- Real-time summary streaming
- Executive summary generation
- Clause-by-clause risk reporting
- Automated email notifications
- PostgreSQL database with Prisma ORM
- Workflow logging and observability
- GPT-OSS-120B for clause extraction and analysis
- Gemini 2.5 Flash for final summary generation
- Persistent contract and review history
- Fault-tolerant background task execution



## Installation

### Prerequisites

Before running the project locally, ensure you have the following:

- Node.js 20+
- PostgreSQL
- Trigger.dev account
- Cloudflare AI API token
- Google Gemini API key
- Resend API key
- Vercel Blob Storage token

### Clone the Repository

```bash
git clone https://github.com/0xashishtiwari/contractiq.git
cd contractiq
````

### Install Dependencies

```bash
npm install
```

### Configure Environment Variables

Create a `.env.local` file in the project root:

```env
DATABASE_URL=
TRIGGER_SECRET_KEY=
TRIGGER_PROJECT_ID=
CLOUDFLARE_API_TOKEN=
GOOGLE_GENERATIVE_AI_API_KEY=
RESEND_API_KEY=
NEXTAUTH_SECRET=
NEXTAUTH_URL=
```

### Set Up the Database

Generate the Prisma client:

```bash
npx prisma generate
```

Run database migrations:

```bash
npx prisma migrate dev
```

### Start Trigger.dev

```bash
npx trigger.dev dev
```

### Start the Development Server

```bash
npm run dev
```

### Open the Application

Visit:

```text
http://localhost:3000
```

---

## Environment Variables

| Variable                       | Description                  |
| ------------------------------ | ---------------------------- |
| `DATABASE_URL`                 | PostgreSQL connection string |
| `TRIGGER_SECRET_KEY`           | Trigger.dev secret key       |
| `TRIGGER_PROJECT_ID`           | Trigger.dev project ID       |
| `CLOUDFLARE_API_TOKEN`         | Cloudflare AI API token      |
| `GOOGLE_GENERATIVE_AI_API_KEY` | Gemini API key               |
| `RESEND_API_KEY`               | Resend email API key         |
| `BLOB_READ_WRITE_TOKEN`        | Vercel Blob Storage token    |
| `NEXTAUTH_SECRET`              | Authentication secret        |
| `NEXTAUTH_URL`                 | Application URL              |

---

## Running Locally

Start Trigger.dev:

```bash
npx trigger.dev dev
```

In another terminal:

```bash
npm run dev
```

The application will be available at:

```text
http://localhost:3000
```
