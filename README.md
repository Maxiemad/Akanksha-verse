# Akanksha Verse

Interactive 3D portfolio experience built with React + Three.js.

## Features

- Five scene sections (Hero, About, Work, Skills, Contact)
- Smooth scroll-based navigation with right-side dot navigation
- Contact form that opens a prefilled email draft to `akanksha.k@adypu.edu.in`
- Modern UI styling (Tailwind) + subtle motion (Framer Motion)

## Tech stack

- React + TypeScript
- Vite
- Tailwind CSS
- Three.js + `@react-three/fiber`
- Framer Motion

## Getting started

Install dependencies:

```bash
npm install
```

Run locally:

```bash
npm run dev
```

Build:

```bash
npm run build
```

Preview build:

```bash
npm run preview
```

## Links

- GitHub: `https://github.com/Maxiemad`
- LinkedIn: `https://www.linkedin.com/in/akanksha-sharma-741283317/?skipRedirect=true`

## Notes

- The contact form uses `mailto:` (opens the visitor’s email app). If you want server-side email delivery, add a form backend (EmailJS/Formspree/Web3Forms) and update `src/components/ContactOverlay.tsx`.
