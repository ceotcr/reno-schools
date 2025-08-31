# Schools Directory 🏫

A modern web application for managing and discovering educational institutions. Built with Next.js, Prisma, and TypeScript.

## Features ✨

- **School Management**: Create, view, update, and delete school entries
- **Image Upload**: Upload and manage school images
- **Modern UI**: Polished user interface with animations and responsive design
- **Real-time Updates**: Instant updates using React Query
- **Form Validation**: Robust form validation using Zod and React Hook Form
- **Toast Notifications**: User-friendly notifications for actions

## Tech Stack 🛠️

- **Framework**: [Next.js 15](https://nextjs.org/) with App Router
- **Database**: PostgreSQL with [Prisma ORM](https://www.prisma.io/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) with [shadcn/ui](https://ui.shadcn.com/)
- **State Management**: [TanStack Query](https://tanstack.com/query/latest)
- **Form Handling**: [React Hook Form](https://react-hook-form.com/) with [Zod](https://zod.dev/)
- **Icons**: [Lucide React](https://lucide.dev/icons/)

## Getting Started 🚀

### Prerequisites

- Node.js 20 or later
- PostgreSQL database
- npm or yarn package manager

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/ceotcr/reno-schools.git
   cd reno-schools/project
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env.local` file in the project directory with your database URL:
   ```env
   DATABASE_URL="postgresql://user:password@localhost:5432/schools"
   ```

4. Initialize the database:
   ```bash
   npm run migrate:dev
   ```

5. Start the development server:
   ```bash
   npm run dev
   ```

The application should now be running at [http://localhost:3000](http://localhost:3000).

## Scripts 📝

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build the production application
- `npm run start` - Start the production server
- `npm run migrate:dev` - Run database migrations for development
- `npm run prisma:studio` - Open Prisma Studio to manage database
- `npm run prisma:generate` - Generate Prisma Client

## Database Schema 💾

```prisma
model School {
  id        Int      @id @default(autoincrement())
  name      String
  address   String
  city      String
  state     String
  contact   String
  image     String
  email_id  String   @unique
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```


## Acknowledgments 🙏

- [shadcn/ui](https://ui.shadcn.com/) for the beautiful components
- [Next.js](https://nextjs.org/) team for the amazing framework
- [Prisma](https://www.prisma.io/) team for the powerful ORM
- [TanStack](https://tanstack.com/) for React Query
