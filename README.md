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

🧠 Key Learnings & Challenges
## Архітектурні та інженерні рішення
* **Map замість array,** тому що найчастіша операція - пошук по індексу
* **Доступ виключно із:** для обмеження

## Продуктові та дизайнерські рішення
* **Керування виключно з клавіатури:** значно пришвидшує взаємодію з мозком через зовнішній інтерфейс, враховуючи високу частоту введення.
* **Демо без авторизації:** спробувати завжди в пріорітеті
* **Режим концентрації:** керування клавіатурою виключає потребу у ui елементах
* **Guide writing animation:** Знижує когнітивне навантаження, привертає увагу, виглядає сучасно як у chatGPT
* **Bento style (модульний UI):** Сучасний дизайн інтерфейсів характерний для Google та Apple
* **Авторизація та віддалене зберігання:** незалежність від пристрою
* **Markdown export:** Можливість використовувати зовнішні інструменти (як от LLMs для аналізу)

👤 Author

    Your Name - GitHub | LinkedIn
