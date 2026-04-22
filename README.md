🚀 TaskFlow — Task Management App

A modern Kanban-style task management application built with React, TypeScript, Tailwind CSS, and shadcn/ui.

🔗 Live Demo

https://task-management-app-three-rho.vercel.app/

📋 Features

Kanban board (Backlog, In Progress, In Review, Done)
Create, edit, delete tasks
Drag & drop task movement
Search and filter (assignee, priority)
Activity log for task updates
LocalStorage persistence
Responsive UI

🛠 Tech Stack

React + TypeScript
Vite
Tailwind CSS
shadcn/ui
Framer Motion
Lucide Icons

📁 Project Structure

src/
├── components/   # UI components (Task, Board, Modal, etc.)
├── utils/
│   ├── useTaskStore.ts   # state management (custom hook)
│   ├── helpers.ts
│   └── constants.ts
├── types/        # TypeScript types
├── lib/utils.ts  # cn helper
├── App.tsx
└── main.tsx

⚙️ Setup

git clone https://github.com/Rishabh7006/task-management-app.git
cd task-management-app
npm install
npm run dev

🧠 Architecture

Custom hook (useTaskStore) handles all state + CRUD logic
LocalStorage used for persistence (no backend)
Component-based modular structure
Native drag & drop for task movement
Strong TypeScript type system

🤖 AI Usage

Used AI for:
Debugging Vite/Tailwind build issues
Fixing deployment errors (Vercel + TypeScript)
README structuring support

All logic, architecture, and implementation decisions were done manually and fully understood.

👨‍💻 Author

Rishabh Khandelwal
Senior Frontend Developer