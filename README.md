# 🚀 STRUKT: No chaos in the head
> A web application for storing text information that is easy to navigate regardless of scale

<img src="/public/strukt.gif" width="700">

## 🌐 Live Demo & Links
* **Live Site:** https://strukt.onrender.com
* **Backend API Base URL:** https://express-deploy-udgw.onrender.com
---

## ✨ Features
* **User Authentication:** Secure signup/login using JWT.
* **CRUD Operations:** Users can create, read, update, and delete.
* **Responsive Design:** Fully optimized for mobile, tablet, and desktop views.
* **State Management:** Handled via Zustand.
* **Server-side storage:** All information in the postgres tables.

---

## 🛠️ Tech Stack
| Layer | Technologies Used |
| :--- | :--- |
| **Frontend** | React.js, Tailwind CSS, TypeScript, Zustand |
| **Backend** | Node.js, Express.js |
| **Database** | Postgresql, Redis |
| **Deployment** | Render (Frontend, Backend), Neon (Postgres), Redis cloud |

---

## 📂 Architecture & Folder Structure
```text
my-fullstack-app/
├── client/                 # Frontend (React)
│   ├── src/
│   │   ├── components/     # UI Components
│   │   ├── pages/          # Page views
│   │   └── App.js
├── server/                 # Backend (Node/Express)
│   ├── config/             # Database connection
│   ├── controllers/        # Logic for routes
│   ├── models/             # Database schemas
│   ├── routes/             # API endpoints
│   └── server.js
└── README.md
```

# 🚀 Getting Started

Follow these steps to run the project locally on your machine.
Prerequisites

    Node.js installed (v18 or higher recommended)

    npm or yarn

    Postgresql

Installation & Setup

```
git clone https://github.com/VladProgrammerBot/Strukt.git
cd Strukt
npm install
npm run dev
```

🛣️ API Endpoints

    POST /api/auth/register - Register a new user

    POST /api/auth/login - Login user and return JWT

Data Routes (e.g., Posts)

    GET /api/posts - Get all posts

    POST /api/posts - Create a new post (Protected)

    DELETE /api/posts/:id - Delete a specific post (Protected)

---

## 📊Analytics dashboard 

<img src="/public/analytics1.png" width="700" alt="Usage Dashboard">

<img src="/public/analytics2.png" width="700" alt="Server Performance Metrics">

## 🧠 Key Learnings & Engineering Challenges

### Architectural & Engineering Decisions

* **Data Structure Optimization ($O(1)$ Lookups):** Utilized `Map` collections instead of standard arrays (`Array`). Since the most frequent operation in the system is looking up an item by its identifier, this reduced the algorithmic time complexity from $O(N)$ to $O(1)$, ensuring stable interface performance as the database scales.
* **Encapsulation & Access Control:** Implemented strict access restrictions to internal methods and component states. Data mutation and retrieval are permitted exclusively through a well-defined public API/interface, minimizing the risk of side effects and simplifying testing.

### Product & Design Decisions

* **Keyboard-Driven UI (Keyboard-First):** Full navigation and application control are mapped to hotkeys. This eliminates the need to constantly switch between mouse and keyboard, reduces cognitive load, and maximizes interaction speed during high-frequency data entry.
* **Frictionless Onboarding (Instant Demo):** Users can test the full functionality of the application in a single click without creating an account. This lowers the barrier to entry and optimizes product adoption metrics.
* **Focus Mode (Zen Mode):** Because the interface is entirely optimized for keyboard operation, unnecessary visual UI elements (buttons, toolbars) were removed. The user is left completely uninterrupted with their content.
* **Ergonomic Animation (Interactive Micro-interactions):** The integration of smooth guiding animations serves more than an aesthetic purpose; it anchors user focus to the current context, making dynamic content consumption feel seamless and natural.
* **Modular Interface (Bento Grid UI):** Information blocks are arranged using a modular grid system. This ensures responsiveness, a clear visual hierarchy of data, and highly efficient screen real estate utilization.
* **Cross-Platform Synchronization:** Implemented cloud authentication and remote state persistence, guaranteeing data integrity and freeing the user from device or local storage lock-in.
* **Ecosystem Compatibility (Markdown Export):** Native support for exporting data in Markdown format. This allows users to easily integrate the app into their legacy Personal Knowledge Management (PKM) workflows or pipe clean data into LLMs (Large Language Models) for analysis.

## Contact

- **Portfolio:** [yourportfolio.com](https://yourportfolio.com)
- **Email:** garbuz.vlada4@gmail.com
- **LinkedIn:** [linkedin.com/in/username](https://linkedin.com/in/username)
