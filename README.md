# Campus Guardian 🛡️

Campus Guardian is a comprehensive safety platform designed for modern educational environments. It empowers students to report incidents safely and confidentially while providing tools for cyber awareness and efficient administrative management.

## 🚀 Key Features

- **Anonymous Reporting**: A secure and private way for students to report ragging or other campus incidents without fear of retaliation.
- **Cyber Awareness**: Educational modules and resources to help students navigate online threats and protect their digital identity.
- **Admin Dashboard**: A powerful interface for campus authorities to manage, track, and resolve complaints efficiently.
- **Real-time Updates**: Status tracking for submitted complaints to keep reporters informed.
- **Emergency Resources**: Quick access to helpline numbers and immediate support resources.

## 🛠️ Technology Stack

- **Frontend**: React with TypeScript
- **Styling**: Tailwind CSS & shadcn/ui
- **Animations**: Framer Motion
- **Build Tool**: Vite
- **Backend & Database**: Supabase
- **State Management**: TanStack Query (React Query)
- **Form Handling**: React Hook Form & Zod
- **Testing**: Vitest

## 💻 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or bun

### Local Development

1. **Clone the repository**

   ```sh
   git clone <YOUR_GIT_URL>
   cd campus-guardian
   ```

2. **Install dependencies**

   ```sh
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory and add your Supabase credentials:

   ```env
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Start the development server**
   ```sh
   npm run dev
   ```

The application will be available at `http://localhost:8080`.

## 📁 Project Structure

```text
src/
├── components/     # Reusable UI components (shadcn/ui + custom)
├── hooks/          # Custom React hooks
├── integrations/   # External service integrations (Supabase)
├── lib/            # Utility functions and shared logic
├── pages/          # Individual page components (Dashboard, Complaints, etc.)
├── types/          # TypeScript definitions
└── App.tsx         # Main application routing and structure
```

## 📜 Available Scripts

- `npm run dev`: Start development server
- `npm run build`: Build for production
- `npm run lint`: Run ESLint for code quality
- `npm run test`: Run the test suite with Vitest
- `npm run preview`: Preview the production build locally

## 🤝 Contributing

We welcome contributions! Please feel free to submit a Pull Request or open an issue for any bugs or feature requests.

---

_Built for safer campus environments._
