# 🛒 GizmoGrid | Next-Gen Tech Gadgets Marketplace

Welcome to **GizmoGrid**, a cutting-edge, highly secure, and feature-rich full-stack technology and smart devices marketplace. Built on the modern **Next.js 16 (App Router)** architecture, GizmoGrid bridges the gap between tech enthusiasts, buyers, and sellers with an immersive, dark-themed, ultra-fast interface and robust multi-role authentication.

🔗 **Live Application Link:** [https://gizmogrid-kohl.vercel.app/](https://gizmogrid-kohl.vercel.app/)

---

## 🌟 Key Features & Highlights

* **Premium Tech Aesthetics:** Styled with **HeroUI (v3)** and **Tailwind CSS v4** for a futuristic, responsive, and adaptive dark/light interface.
* **Next-Gen Web Performance:** Powered by **Next.js 16** and React 19, ensuring lightning-fast server-side rendering (SSR), dynamic filtering, and optimized image loading.
* **Immersive Micro-interactions:** Smooth layouts and dynamic data visualizations powered by **Framer Motion**, **React CountUp**, and **Recharts** dashboards.
* **Fully Integrated Toasters:** Interactive and rich notification system utilizing both `sonner` and `react-hot-toast`.

---

## 🔒 Security & Robust Authentication

GizmoGrid is engineered with security-first practices, eliminating common vulnerabilities and offering a seamless login workflow:

1.  **Better Auth Integration (`v1.6.23`):**
    * Utilizes the next-generation TypeScript-first auth library **Better Auth** paired with `@better-auth/mongo-adapter` for bulletproof session and user management.
    * No-compromise, passwordless, and social logins integrating secure **Google OAuth** and **Facebook Login** setups fully configured with production-grade OAuth redirect flows.
2.  **State-of-the-Art Token & Session Security:**
    * Implements **Jose (`jose-cjs`)** for signing, encrypting, and parsing secure JSON Web Tokens (JWT) and cryptographic payloads.
3.  **Database Protection:**
    * Deep integration with **MongoDB** natively safeguarding customer records, catalog listings, and order sheets.
4.  **Role-Based Access Control (RBAC):**
    * Built-in route middleware and authorization gates.
    * Distinct portals, state managers, and data filters tailored for **Admins**, **Managers**, **Sellers**, and **Buyers** preventing unauthorized data exposure.

---

## 👥 Roles & Responsibilities Architecture

GizmoGrid is designed around a multi-tenant, role-oriented workflow to ensure operational excellence:

| Role | Primary Responsibilities & Portals | Key Protected Routes |
| :--- | :--- | :--- |
| **Admin** | Managing users, monitoring system health, reviewing platform-wide analytics using interactive **Recharts** dashboards, and supervising seller listings. | `/dashboard/admin/*` |
| **Manager** | Moderating platform activities, approving/rejecting product listings, managing content, and handling user disputes or reports. | `/dashboard/manager/*` |
| **Seller** | Adding new cutting-edge gadgets, managing inventory tracking, monitoring personal sales metrics, and updating item listings. | `/dashboard/seller/*` |
| **Buyer** | Exploring tech catalogs, searching with live dynamic category filtering, managing cart profiles, and purchasing smart devices. | `/dashboard/buyer/*` |

---

## 🛠 Tech Stack

### Core Frontend & Backend Framework
* **Next.js 16.2.10 (App Router)** - React 19.2.4 integration.
* **TypeScript** - Bulletproof type safety across the application.

### Database & Authentication
* **Better Auth & Better Auth Mongo Adapter** - Production-grade secure auth.
* **MongoDB & MongoDB Native Driver** - Ultra-reliable NoSQL database management.
* **Jose-cjs** - Lightweight, secure cryptographic tokens.

### Styling & UI Components
* **Tailwind CSS v4** - Dynamic modern utility classes.
* **HeroUI v3** - Accessible, sleek components matching next-gen tech styles.
* **Lucide React, React Icons & Gravity UI Icons** - Unified icon suites.
* **Next Themes** - System-aware dark mode switching.

### Data Visualization & Motion
* **Recharts** - Beautiful interactive charts for admin/seller analytics dashboards.
* **Framer Motion** - Silky-smooth layout transitions and hardware-accelerated animations.
* **React CountUp** - Engaging stats counter.

---

## 📁 File Structure Overview

```bash
gizmo-client/
├── public/                 # Favicons, Custom Logo (metadataImg.png), Icons
├── src/
│   ├── app/                # Next.js App Router (pages, APIs, layout.tsx)
│   │   ├── api/auth/       # Better Auth backend callbacks (Google/Facebook)
│   │   ├── dashboard/      # Role-based dashboard interfaces
│   │   ├── globals.css     # Global styles & Tailwind directives
│   │   └── layout.tsx      # App Root Layout (Theme Provider, Toaster, Metadata)
│   ├── components/         # Reusable UI Blocks (ThemeProvider, LayoutWrapper)
│   └── lib/                # Database connections, Auth configurations
├── package.json            # Scripts & Dependency management
└── vercel.json             # Vercel-specific deployments (optional)

🚀 Commands & Development Workflow
Local Development
To spin up the development server locally with live reload:

Bash
npm run dev
# or
yarn dev
Production Build & Launch
To generate an optimized production build and launch the server:

Bash
# Build the project
npm run build

# Start the built production server
npm run start
Deployment (Manual)
Since this project is deployed natively, use the following commands to redeploy directly to production via the Vercel CLI from your terminal:

Bash
# General production deployment
vercel --prod

# Clean build cache and force redeploy
vercel --prod --force
🛡 Security Best Practices Checklist Implemented
[x] Production Redirect URIs locked inside Google and Meta Developer Consoles.

[x] Environment variables securely loaded within Vercel.

[x] Strict route segmentation matching designated Roles (Admin/Manager/Seller/Buyer).

[x] Custom metadata image and modern branding customized via layout files.

Created and maintained with ❤️ by S.B.Himel.