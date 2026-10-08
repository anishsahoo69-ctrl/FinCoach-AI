# FinCoach AI

FinCoach AI is a React web app for exploring everyday personal-finance workflows. It includes a dashboard, budgeting and expense tools, financial analytics, goal tracking, an investment overview, and a rule-based finance coach. The current project is a frontend prototype and uses sample data and browser storage rather than a backend service.

## Features

- **Dashboard:** At-a-glance finance overview with links to the app's main sections.
- **Budget planner:** Enter weekly income and category spending to see totals, remaining balance, and savings rate.
- **Expense tracker:** Add and remove expenses, and compare them with entered income.
- **Analytics:** View income, expense, category, and savings charts built with Recharts. The current charts use sample values.
- **AI finance coach:** Review finance summaries, rule-based insights, tips, and responses to common questions. No external AI model or API is connected.
- **Investments:** Add and remove investments and see portfolio summaries and charts.
- **Financial goals:** Create, edit, delete, and update savings goals, with progress summaries and charts.
- **Profile:** Edit profile and financial preference fields, and reset the saved finance data.
- **Client-side navigation:** React Router handles page transitions without full-page reloads.
- **Browser persistence:** Shared finance data is stored in `localStorage` on the current browser and device.

## Routes

| Route | Page |
| --- | --- |
| `/` | Landing page |
| `/login` | Demo login form |
| `/signup` | Demo signup form |
| `/dashboard` | Dashboard |
| `/budget-planner` | Weekly budget planner |
| `/expense-tracker` | Expense tracker |
| `/analytics` | Financial analytics |
| `/ai-finance-coach` | Rule-based finance coach |
| `/investments` | Investment portfolio |
| `/financial-goals` | Financial goals |
| `/profile` | Profile and preferences |

Unknown routes display a 404 message.

## Getting Started

### Requirements

- Node.js (a current LTS release is recommended)
- npm

### Install and run

```bash
npm install
npm run dev
```

Open the local URL printed by Vite in your terminal.

## Available Scripts

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the Vite development server |
| `npm run build` | Create a production build in `dist/` |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint |

## Technology

- React 19 and Vite
- React Router for client-side routes
- Context API and browser `localStorage` for shared finance state
- Recharts for data visualizations
- Lucide React for icons
- Plain CSS for page and component styling

## Data and Prototype Notes

- The app starts with example finance data. Shared income, expenses, budget, investments, goals, and profile state is persisted in the browser under the `fincoach-finance-state` key.
- Data is local to the browser; there is no server synchronization, database, or cross-device account storage.
- Login and signup are demonstration flows and do not authenticate or create server-side accounts.
- The finance coach generates responses from local rules and current finance state; it is not connected to a generative AI service.
- Analytics charts currently display predefined sample data.
- The budget planner and expense tracker maintain their own page-level state; their entries are not currently synchronized with the shared finance context.
- Currency formatting and example data are primarily INR-focused.

## Project Structure

```text
src/
  components/       Reusable UI and expense-tracker components
  context/          Shared finance state and persistence
  pages/            Route-level screens and page styles
  App.jsx           Route definitions
  main.jsx          React, router, and finance-provider setup
```
