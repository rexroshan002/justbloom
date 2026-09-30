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
- **Contact Form Delivery:**
  - Contact requests are validated by a Cloudflare Pages Function and delivered through Resend to `justbloom.team@gmail.com`.

- **Error Boundary Guard (`ErrorBoundary`):**
  - React error boundary component providing reliable runtime fallback UI.
- **Responsive Layout:**
  - Mobile-first layouts for navigation, social proof, forms, statistics, and content sections.
  - Touch-friendly mobile navigation links and stable header spacing while scrolling.

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
├── vite.config.js           # Vite configuration
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
- `npm test`: Runs the contact API endpoint tests.

## ✅ Validation

Before publishing changes, run the production build and lint checks:

```bash
npm run build
npm run lint
npm test
```

The project is configured for deployment to GitHub Pages through the
`Deploy to GitHub Pages` workflow. In the repository settings, set
**Pages → Build and deployment → Source** to **GitHub Actions**. Each push to
`main` then builds and publishes the site automatically.

### Contact form deployment

The contact form posts JSON to `/api/submit`, implemented by
`functions/api/submit.js`. Cloudflare Pages runs that function; the GitHub
Pages workflow only publishes the static frontend. The Cloudflare Pages project
`justbloom` is connected to this repository, so merging a change to its
production branch triggers a Pages deployment.

### Publishing the contact form fix

From the repository root, run the checks and push the code on a branch:

```bash
npm ci
npm test
npm run lint
npm run build
git add README.md eslint.config.js package.json src/components/ContactForm.jsx functions/api/submit.js tests/submit.test.js
git commit -m "Fix contact form email delivery"
git push -u origin agents/cloudflare-resend-form-fix
```

Then open a pull request on GitHub from `agents/cloudflare-resend-form-fix`
into `main`, review it, and merge it. `.env` is git-ignored: do not force-add
it, paste its contents into GitHub, or expose the key through a `VITE_` value.
The repository's GitHub Actions workflow deploys the static site; the connected
Cloudflare Pages project separately builds the Pages Function.

### Enabling live Resend delivery

The Pages Function sends from `hello@justbloom.com.co` and sets the lead's
email as `Reply-To`. Resend must verify `justbloom.com.co` before it can deliver
messages from this address.

1. In Cloudflare, open **Workers & Pages → justbloom → Settings → Variables
   and Secrets**. Under **Production**, add `RESEND_API_KEY` as an encrypted
   secret using the existing key from the ignored local `.env` file. Never
   paste it into a repository file or commit it. Add a Preview secret too only
   if previews should send actual emails.
2. Verify the Pages build settings are root directory `/`, build command
   `npm run build`, and output directory `dist`. Confirm the custom domain
   `justbloom.com.co` is attached to this Pages project, then redeploy the
   latest production deployment after the secret is saved.
3. Push and merge the code changes into the GitHub repository's production
   branch. Cloudflare Pages is connected to this repository and deploys it.
4. Submit a real test through `https://justbloom.com.co/contact`. Confirm the
   browser shows the success screen and the email arrives at
   `justbloom.team@gmail.com`. A success response is returned only when Resend
   accepts the send; failures are shown on the form instead.

Add the four Resend DNS records below in Cloudflare (**Websites →
justbloom.com.co → DNS → Records**). Set TTL to **Auto** and leave them
**DNS only** (not proxied), then click **Verify DNS Records** in Resend and
wait for **Verified** status. Until Resend verifies the domain, submissions
will return an error rather than report a false success.

   | Type | Name | Target / content | Priority |
   | --- | --- | --- | --- |
   | TXT | `resend._domainkey` | `p=MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQC35CqAmWfk7ydkuI/OuAGB9MQEv7+BS7q19hB+M+aqz9nVSoNxzrcseZ5SHQLT4yXVozE+zMcRy+0N/0p0tbdXWwhz4ftDAdmaiOJGr8/pSHUHRuEGK3pWh+o0XxKEiwM5KHLL9od7icUCRvC3pP4m8JSVq9EZld972ljToVCoRQIDAQAB` | — |
   | MX | `send` | `feedback-smtp.us-east-1.amazonses.com` | `10` |
   | TXT | `send` | `v=spf1 include:amazonses.com ~all` | — |
   | CNAME | `rsend` | `send.forge.rmta.net` | — |

   These records were generated for this Resend account. Do not replace
   existing root-domain mail records; the records use the `send` subdomain
   except for the DKIM selector.

---

## 📄 License

This project is created for **JustBloom**. All rights reserved.
