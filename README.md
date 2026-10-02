# Aradhy Bajpai — Developer Portfolio

Source code for my personal developer portfolio website (`aradhy-portfolio`), engineered with React.js, Vite, and Tailwind CSS to showcase my software projects, technical stack, competitive programming metrics, certifications, and resume.

## Overview

This repository contains the client-side architecture for my developer portfolio. The application is structured as a fast, interactive single-page web platform that separates structured portfolio data (`src/data/portfolio.js`) from UI presentation and physics-based interaction wrappers. It provides recruiters, engineers, and collaborators with a direct, scannable overview of my technical background, project implementations, and downloadable resume.

## Features

- **Clean Visual Design:** Structured layout and typography focused on readability, visual hierarchy, and scannable engineering documentation.
- **Interactive Components:** Custom magnetic button physics (`MagneticButton.jsx`), 3D surface tilt containers (`TiltSurface.jsx`), and real-time pointer tracking (`useMousePosition.js`).
- **Smooth Animations:** Responsive, fluid UI animations implemented via Motion and modern CSS3 transitions.
- **Responsive Layouts:** Adaptive component styling built with Tailwind CSS to maintain visual consistency across desktop, tablet, and mobile viewports.
- **Data-Driven Content:** Centralized portfolio state in `src/data/portfolio.js` allowing streamlined updates to projects, skills, and achievements without altering component trees.
- **Fast Production Builds:** Powered by Vite and `pnpm` for instant hot module replacement (HMR) during local development and optimized static asset bundling for production.

## Tech Stack

### Portfolio Architecture

| Category | Technologies |
| :--- | :--- |
| **Frontend** | React.js, JavaScript (ES6+), HTML5, CSS3 |
| **Build Tooling** | Vite, `pnpm` |
| **Styling** | Tailwind CSS |
| **Animation & Interaction** | Motion, Custom React Components, Magnetic & Tilt Effects, Mouse-Based Interactions |
| **Developer Workflow** | Git, GitHub, VS Code, Docker, Jupyter Notebook, Google Colab |

## Featured Projects

The portfolio showcases four primary engineering projects across full-stack web development, AI/RAG systems, and IoT:

### 1. ExamShelf
An educational platform designed to help students access and organize academic resources such as notes, previous-year questions, and study material.

- **Key Highlights:** Production web application serving **400+ logged-in users**, featuring authentication and user management, organized academic resource directories, a responsive user interface, and live deployment.
- **Tech Stack:** Next.js, React, Tailwind CSS, Supabase, PostgreSQL, Vercel
- **Links:** [Repository](https://github.com/ExamshelfHQ/ExamShelf) | [Live Website](https://www.examshelf.in/)

### 2. DeltaRAG (Documentation Change Impact Analysis)
A research-oriented system focused on detecting changes in technical documentation and analyzing their potential downstream impact using Retrieval-Augmented Generation and agentic AI concepts.

- **Tech Stack:** Python, RAG, ChromaDB, LLMs, Git, Agentic AI

### 3. Mock.AI
An AI-powered mock interview application designed to provide an interactive interview preparation experience.

- **Tech Stack:** React, TypeScript, Gemini API, Firebase, Clerk, Vite

### 4. Smart Drainage Monitoring System
An IoT-based drainage monitoring system designed to monitor water flow using multiple sensors and provide connected monitoring capabilities.

- **Tech Stack:** ESP32, Flow Sensors, Firebase, Node.js, IoT

## Technical Skills

The portfolio documents my broader technical capabilities across software engineering and computer science:

- **Programming Languages:** Java, Python, C, JavaScript, SQL
- **Frontend:** React.js, Next.js, HTML, CSS, Tailwind CSS
- **Backend:** Node.js, Express.js, REST APIs
- **Databases / Backend Services:** Firebase, Firestore, Supabase, PostgreSQL
- **AI / Machine Learning:** Generative AI, Retrieval-Augmented Generation, Large Language Models, Agentic AI, Machine Learning
- **Core Computer Science:** Data Structures & Algorithms, Object-Oriented Programming, Database Management Systems, Operating Systems, Computer Networks
- **Developer Tools:** Git, GitHub, VS Code, Jupyter Notebook, Google Colab, Docker

## Achievements

- Solved **500+ problems** on LeetCode
- **LeetCode Contest Rating:** 1670+
- Secured **6th position among 150 teams** at Tech Expo — Student Project Exhibition 2025
- **Smart Drainage Monitoring System** was featured in a newspaper
- **Technical Lead — Community Developer**, AWS Student Builder Group, PSIT

## Certifications

- **AWS Cloud Solutions Architect** — *Coursera / AWS*
- **Agentic AI Certified Foundations Associate** — *Oracle*
- **AWS Academy Machine Learning Foundations** — *AWS*

## Getting Started

### Prerequisites

Ensure the following tools are installed on your system before setting up the project locally:

- **Node.js**
- **pnpm**
- **Git**

### Installation & Local Development

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/Aradhy2005/aradhy-portfolio.git](https://github.com/Aradhy2005/aradhy-portfolio.git)
   cd aradhy-portfolio
   ```
   Clones the remote repository to your local machine and moves into the project root directory.

2. **Install dependencies:**
   ```bash
   pnpm install
   ```
   Resolves and installs all project dependencies specified in `package.json` using the `pnpm-lock.yaml` lockfile.

3. **Run the development server:**
   ```bash
   pnpm dev
   ```
   Starts the local Vite development server with instant hot module replacement for active development.

4. **Build for production:**
   ```bash
   pnpm build
   ```
   Compiles, minifies, and bundles the application and static assets into the `dist/` directory.

5. **Preview the production build:**
   ```bash
   pnpm preview
   ```
   Spins up a local static web server to inspect and test the compiled production build from `dist/`.

## Project Structure

```text
aradhy-portfolio/
│
├── public/
│   ├── images/
│   │   └── profile.jpg
│   │
│   └── resume/
│       └── Aradhy_Bajpai_Resume.pdf
│
├── src/
│   ├── components/
│   │   ├── MagneticButton.jsx
│   │   └── TiltSurface.jsx
│   │
│   ├── data/
│   │   └── portfolio.js
│   │
│   ├── hooks/
│   │   └── useMousePosition.js
│   │
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
│
├── index.html
├── package.json
├── pnpm-lock.yaml
├── tsconfig.json
├── vite.config.js
├── .gitignore
└── .gitattributes
```

## Design & Development

- **Separation of Data and UI:** All portfolio copy, project metadata, skill arrays, and certification records reside in `src/data/portfolio.js`. This keeps component logic in `src/App.jsx` focused strictly on layout and rendering.
- **Reusable Interaction Primitives:** Cursor-based interactions are abstracted into `src/hooks/useMousePosition.js` and consumed by modular presentation wrappers (`src/components/MagneticButton.jsx` and `src/components/TiltSurface.jsx`).
- **Static Asset Management:** Public assets, including profile imagery (`public/images/profile.jpg`) and the PDF resume, are served directly from the `public/` directory to maintain clean import paths.

## Production Build

Executing `pnpm build` runs Vite's production build pipeline and outputs optimized static files into the `dist/` directory.

- `dist/` is generated automatically during the build step and is excluded from version control via `.gitignore`.
- `node_modules/` is managed via `pnpm` and is ignored by Git.

## Deployment

This project compiles down to standard static assets (`HTML`, `CSS`, `JavaScript`, and media files) inside `dist/`. It can be deployed to any static web hosting platform by configuring the build command as `pnpm build` and setting the publish directory to `dist`.

## Repository

- **GitHub Repository:** [https://github.com/Aradhy2005/aradhy-portfolio](https://github.com/Aradhy2005/aradhy-portfolio)

## Connect With Me

- **GitHub:** [https://github.com/Aradhy2005](https://github.com/Aradhy2005)
- **LinkedIn:** [LinkedIn Profile]
- **LeetCode:** [LeetCode Profile]

## Resume

The repository includes my current resume stored at:

```text
public/resume/Aradhy_Bajpai_Resume.pdf
```

It is bundled with the static assets and is accessible directly via the portfolio interface or within the repository directory tree.

## License

This repository is maintained as a personal developer portfolio. All personal data, resume documents, and biographical content are proprietary; please contact the author before reusing code or assets.

© 2026 Aradhy Bajpai
