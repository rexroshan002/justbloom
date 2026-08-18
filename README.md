# JustBloom 🌸

**JustBloom** is a modern, high-performance web application and digital agency landing page built with **React 19** and **Vite**. It features modern UI design, dynamic animations, smooth navigation, and interactive component sections.

---

## 🌟 Features

- **Hero & Navigation Bar (`HeaderAndHero`):**
  - Sleek top navigation with smooth scrolling (`react-scroll`) to sections.
  - Engaging call-to-action (CTA) buttons and visual branding.

- **About & Founders (`AboutAndFounders`):**
  - Highlights company vision, values, leadership, and team story.

- **Services Showcase (`OurServices`):**
  - Detailed service cards covering digital solutions, design, and growth strategy.
  - Interactive hover animations and clean visual icon cards.

- **Stats & Metrics Banner (`StatsBanner`):**
  - Key performance metrics, client satisfaction counts, and business impact counters.

- **Portfolio & Recent Projects (`RecentProjects`):**
  - Interactive project gallery highlighting recent client work, case studies, and modern UI cards.

- **Contact & Footer (`Footer`):**
  - Contact form integration, quick navigation links, social media handles, and footer details.

- **Error Boundary Guard (`ErrorBoundary`):**
  - React error boundary component providing reliable runtime fallback UI.

---

## 🛠️ Tech Stack

- **Frontend Library:** [React 19](https://react.dev/)
- **Build Tool / Bundler:** [Vite 8](https://vitejs.dev/)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Smooth Scroll:** [React Scroll](https://github.com/fabe/react-scroll)
- **Styling:** Custom CSS with responsive breakpoints and glassmorphism styling
- **Linting:** ESLint 10

---

## 📁 Project Structure

```text
justbloom/
├── public/                 # Static assets
├── src/
│   ├── assets/             # Images, logos, and media files
│   ├── components/         # Reusable UI components & section styles
│   │   ├── AboutAndFounders.jsx / .css
│   │   ├── ErrorBoundary.jsx
│   │   ├── Footer.jsx / .css
│   │   ├── HeaderAndHero.jsx / .css
│   │   ├── OurServices.jsx / .css
│   │   ├── RecentProjects.jsx / .css
│   │   └── StatsBanner.jsx / .css
│   ├── data/               # Static project data & mock content
│   ├── App.jsx             # Main Application layout
│   ├── index.css           # Global CSS variables and resetting rules
│   └── main.jsx            # React root entrypoint
├── index.html              # HTML template
├── package.json            # Project dependencies & scripts
├── vite.config.js          # Vite configuration
└── README.md               # Project documentation
```

---

## 🚀 Getting Started

### Prerequisites

Ensure you have **Node.js** (v18 or higher recommended) and **npm** installed on your system.

### Installation

1. **Clone or open the repository:**
   ```bash
   git clone <repository-url>
   cd justbloom
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173` (or the URL output in your terminal).

---

## 📜 Available Scripts

In the project directory, you can run:

- `npm run dev`: Runs the app in development mode with Hot Module Replacement (HMR).
- `npm run build`: Builds the app for production to the `dist` folder.
- `npm run preview`: Locally previews the production build.
- `npm run lint`: Runs ESLint to check for code quality and syntax issues.

---

## 📄 License

This project is created for **JustBloom**. All rights reserved.
