# The Learning Portal

<div align="center">
  <img src="https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white" alt="Next.js" />
  <img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React" />
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=black" alt="Firebase" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
</div>

## 📚 Project Overview

The Learning Portal is an education project that aims to build an educational landscape by facilitating seamless, efficient, and interactive communication between students and trainers. This platform connects learners with educational resources and expert instructors in a user-friendly environment.

### 🎯 Project Goal

The project's goal is to create a web application to consolidate knowledge and create a first portfolio project. The web application is responsive and works correctly on desktop computers, mobile phones, and tablets.

## ✨ Features

- **User Authentication** - Secure login and registration system using Firebase Auth
- **Profile Management** - Users can view and update their profile information
- **Course Discovery** - Students can search and apply for courses
- **Training Management** - Trainers can review student requests and manage courses
- **Responsive Design** - Optimized for all device sizes

## 🖥️ Main Screens/Pages

The application is based on five main screens/pages:

1. **Login** - Authentication portal for users
2. **Home** - Main landing page with featured courses and information
3. **My Account** - User profile and settings management
4. **Trainings** - Course catalog and management interface
5. **Join Us** - Registration page for new users

## 🛠️ Technology Stack

### Frontend
- **Next.js** - React framework for server-side rendering and static site generation
- **React** - UI library for building component-based interfaces
- **TypeScript** - Strongly typed programming language that builds on JavaScript
- **Tailwind CSS** - Utility-first CSS framework for rapid UI development
- **React Hook Form** - Form validation and handling

### Backend & Services
- **Firebase Authentication** - User authentication and management
- **Firebase Firestore** - NoSQL database for storing application data
- **Firebase Storage** - File storage for user uploads

### Development Tools
- **ESLint** - Code linting for identifying problematic patterns
- **Prettier** - Code formatting for consistent style
- **Husky** - Git hooks for pre-commit validation


## 🚀 Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm or yarn or bun

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/learn-app.git
cd learn-app
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
bun install
```

3. Set up environment variables:
Create a `.env.local` file in the root directory with your Firebase configuration:
```
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

4. Start the development server:
```bash
npm run dev
# or
yarn dev
# or
bun dev
```

5. Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.
