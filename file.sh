# Full setup from scratch
npm create vite@latest task-management-app -- --template react-ts
cd task-management-app
npm install
npm install lucide-react date-fns framer-motion recharts clsx tailwind-merge class-variance-authority
npm install -D tailwindcss @tailwindcss/vite @types/node
npx shadcn@latest init
npx shadcn@latest add button input textarea select label card avatar radio-group dialog
npm run dev