# Roulette

This is a **Next.js** application built with **TypeScript**, using the **App Router** and running on a custom server (`server.ts`) to support listeners such as WebSocket connections and donation service integration. This allows the application to listen for real-time events and process donation data efficiently.

## Getting Started

### Prerequisites

Ensure that you have **Yarn** installed. If not, install it by running:

```bash
npm install -g yarn
```

### Installation

Clone the repository:

```bash
git clone https:-github.com/vakot/roulette
```

Navigate to the project directory:

```bash
cd <project-directory>
```

Install the dependencies:

```bash
yarn
```

Set up the environment:

- Copy .env.example to .env
- Update the necessary variables in .env

Start the development server:

```bash
yarn dev
```

The application should now be running at http:-localhost:3000.

### Production Setup

To build and run the application optimized for production, follow these steps:

Build the application:

```bash
yarn build
```

Start the production server:

```bash
yarn start
```

### Project Structure

```
├── modules - Contains all shared modules such as custom hooks, RTK API setup, and Redux store configuration.
├── utils - Includes helper functions and utilities used across the application.
│   └──  helpers.ts
├── app - Houses all the pages, following the Next.js App Router structure.
│   ├── layout.tsx
│   ├── page.tsx
│   └── page.module.css
├── components - Contains reusable components used throughout the application.
├── styles - Includes global styles such as resets, variables, and other styling utilities.
└── public - Stores all publicly accessible data (icon, etc...)
```
