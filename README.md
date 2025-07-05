# 💰 Personal Finance Visualizer

A simple and modern web app to **track personal finances**, built with **Next.js**, **React**, **shadcn/ui**, **MongoDB**, and **Recharts**. Designed to help users visualize their monthly spending, categorize expenses, and manage budgets easily.

---

## 🚀 Features

### ✅ Stage 1: Transaction Tracking

- Add / Edit / Delete transactions
- Transaction table view
- Monthly expenses bar chart using **Recharts**
- Form validation with **Zod**
- Styled with **shadcn/ui** components

### ✅ Stage 2: Categories (in progress)

- Fixed predefined categories
- Category-wise pie chart
- Dashboard summary cards:
  - Total expenses
  - Most used category
  - Recent transactions

### 🔜 Stage 3: Budgeting (coming soon)

- Monthly budgets by category
- Budget vs actual charts
- Spending insights and alerts

---

## 🛠 Tech Stack

| Tech         | Description                            |
|--------------|----------------------------------------|
| **Next.js**  | Fullstack React framework              |
| **MongoDB**  | Document database (via Mongoose)       |
| **shadcn/ui**| Beautiful component library (Radix UI) |
| **Zod**      | Type-safe form validation              |
| **Recharts** | Data visualization library             |
| **Axios**    | HTTP client for frontend API calls     |

---

## 📁 Folder Structure

.
├── app/
│ ├── dashboard/ → Main dashboard
│ ├── edit/[id]/ → Edit transaction page
│ └── api/transactions/ → Route handlers (GET, POST, PUT, DELETE)
├── components/
│ ├── transaction-form.tsx → Add/edit form (modal or full)
│ ├── transaction-table.tsx → Transaction list
│ └── monthly-expense-chart.tsx → Bar chart visualization
├── lib/
│ ├── types.ts → Shared types
│ ├── validators.ts → Zod schemas
│ └── constants.ts → Fixed category list
└── README.md

## 🧪 Local Setup

### 1. Clone the Repo

```bash
git clone https://github.com/Pranavaaaa/
cd finance-visualizer
```

# Install dependencies

```bash
npm install
```

# Configure .env

```bash
MONGODB_URI=mongodb+srv://<your-mongodb-uri>
NEXT_PUBLIC_APP_URL=http://localhost:3000
```
