# Asterasia Café - Website Studio

Welcome to the **Asteraia Café** web application repository. This project is a modern, high-performance, and aesthetically driven website designed to provide a digital storefront for an elegant and artistic café.

This application is built with **Next.js 15**, utilizing the latest web technologies to ensure speed, SEO optimization, and a seamless user experience. It features smooth animations, a responsive design, and an integrated booking system.

## 🌟 Introduction

Asterasia Café is more than just a place to drink coffee; it's an experience. This website reflects that philosophy by offering a digital journey that mirrors the warmth and artistry of the physical location.

The website serves as a central hub for customers to:
- Explore the café's ambiance through a curated gallery.
- Browse the menu of artisanal coffees and pastries.
- Learn about the café's story and mission.
- Make table reservations seamlessly.
- Enjoy a vibe-curated experience with an integrated music widget.

## 🚀 Key Features

This project is packed with features designed for both user engagement and developer experience:

### 1. Dynamic Landing Page
The application uses a section-based architecture for a smooth single-page-like flow:
- **Hero Section**: Captures attention immediately with high-quality visuals and a clear value proposition.
- **About Section**: Tells the story of Asterasia, drawing users into the brand narrative.
- **Menu Section**: A clean, accessible display of offerings.
- **Gallery Section**: An interactive carousel showcasing the café's interior and products.
- **Booking Section**: A functional form for users to reserve tables directly.

### 2. Advanced UI/UX
- **Smooth Scrolling**: Implemented using **Lenis** to provide a luxurious, fluid scrolling experience that feels native and polished.
- **Animations**: Powered by **GSAP (GreenSock Animation Platform)** and **Tailwind CSS Animate** for complex, high-performance interactions that delight the user without compromising performance.
- **Theme Support**: Fully integrated Dark/Light mode toggle, respecting user system preferences while allowing manual override.
- **Responsive Design**: Mobile-first approach ensuring the site looks stunning on phones, tablets, and desktops.

### 3. Interactive Elements
- **Spotify Widget**: A custom widget that adds to the atmospheric vibe, showing currently playing tracks or playlists.
- **Theme Toggle**: A beautiful, animated sun/moon switch for theme management.
- **Back To Top**: A convenient utility that appears as the user scrolls down, allowing for easy navigation.
- **Toast Notifications**: Non-intrusive alerts for user actions (e.g., successful booking submissions).

## 🛠️ Tech Stack & Architecture

This project leverages a cutting-edge stack optimized for React server components and modern web standards:

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router) - The React Framework for the Web.
- **Language**: [TypeScript](https://www.typescriptlang.org/) - For type-safe, maintainable code.
- **Styling**:
  - [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework for rapid UI development.
  - [Styled Components](https://styled-components.com/) - Utilized via a registry for component-level styling needs.
- **UI Components**:
  - [Radix UI](https://www.radix-ui.com/) - Unstyled, accessible components for building high-quality design systems.
  - [Lucide React](https://lucide.dev/) - Beautiful, consistent icons.
  - [Embla Carousel](https://www.embla-carousel.com/) - A lightweight carousel library.
- **Forms**:
  - [React Hook Form](https://react-hook-form.com/) - Performant, flexible forms.
  - [Zod](https://zod.dev/) - TypeScript-first schema declaration and validation.
- **Backend / AI Services**:
  - [Firebase](https://firebase.google.com/) - Backend-as-a-Service for potential data persistence.
  - [Genkit](https://firebase.google.com/docs/genkit) - For AI-powered features.

## 📂 Project Structure

Here is an overview of the main directory structure to help you navigate the codebase:

```
src/
├── app/                  # Next.js App Router directory
│   ├── globals.css       # Global styles and Tailwind directives
│   ├── layout.tsx        # Root layout (Html, Body, Providers)
│   ├── page.tsx          # Main Landing Page (composes sections)
│   └── actions.ts        # Server Actions
├── components/           # Reusable UI components
│   ├── sections/         # Page-specific sections (Hero, About, etc.)
│   ├── ui/               # Usage-agnostic UI primitives (Buttons, Inputs)
│   ├── header.tsx        # Main Navigation
│   ├── footer.tsx        # Site Footer
│   ├── theme-toggle.tsx  # Dark mode switch
│   └── ...
├── lib/                  # Utilities and helper functions
│   ├── utils.ts          # CN (classname) helper and others
│   └── ...
```

## ⚡ Getting Started

Follow these steps to set up the project locally on your machine.

### Prerequisites
- **Node.js**: Version 18.17 or later (LTS recommended).
- **npm**: Comes with Node.js.

### Installation

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd studio-main
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    # or
    npm i
    ```

### Running Development Server

Start the local development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser. The page will auto-update as you edit files.

### Building for Production

To create an optimized production build:

```bash
npm run build
```

To start the production server after building:

```bash
npm start
```

## 🎨 Customization

### Themes & Colors
The project uses Tailwind CSS for valid styling. The design tokens (colors, fonts, radii) are defined in `src/app/globals.css` using CSS variables. You can adjust the "zinc" based color scheme here to match any brand identity.

### Fonts
Fonts are loaded via `next/font` (or Google Fonts standard loading in `layout.tsx`) including:
- **Sour Gummy**: For playful accents.
- **Cormorant Garamond**: For elegant headings.
- **Dancing Script**: For artistic, handwritten touches.

## 🤝 Contributing

We welcome contributions! Please follow these steps:
1.  Fork the project.
2.  Create your feature branch (`git checkout -b feature/AmazingFeature`).
3.  Commit your changes (`git commit -m 'Add some AmazingFeature'`).
4.  Push to the branch (`git push origin feature/AmazingFeature`).
5.  Open a Pull Request.

---
*Built with ❤️ by the Asterasia Dev Team.*
