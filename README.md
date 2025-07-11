# 💻 CodeBuddy Frontend

Welcome to the **frontend** of **CodeBuddy**, a mentorship platform designed to connect students (mentees) with experienced peers (mentors) across different academic disciplines.

This frontend is built with **React.js** and styled with **Tailwind CSS**, providing a clean, responsive, and dynamic user interface.

---

## 🚀 Project Overview

The frontend serves as the user-facing interface for the CodeBuddy application, enabling:

- 📅 **User Registration & Authentication**
- 🡩‍🏫 **Mentees to browse, search, and request mentorship**
- 🡩‍🏫 **Mentors to manage mentee requests and respond accordingly**
- 📱 **Responsive Design** optimized for desktop and mobile use

---

## 🖠️ Tech Stack

| Technology     | Description                          |
|----------------|--------------------------------------|
| React.js       | Frontend JavaScript library          |
| Tailwind CSS   | Utility-first CSS framework          |
| React Router   | Declarative routing for navigation   |
| Axios          | Promise-based HTTP client            |
| Context API    | Global state management (auth/user)  |

---

## 📁 Folder Structure

```
codebuddy-frontend/
├── public/
│   └── index.html
├── src/
│   ├── assets/             # Static images, icons, etc.
│   ├── components/         # Shared UI components
│   ├── context/            # Auth/User Context API setup
│   ├── pages/              # Route-level components (Signup, Login, Dashboards)
│   ├── App.jsx             # Root component with routing
│   ├── main.jsx            # ReactDOM entry point
│   └── index.css           # Tailwind base styles
└── package.json
```

---

## 🔐 Route Protection

Certain routes (e.g., `/mentor-dashboard`, `/mentee-dashboard`) are protected using `PrivateRoute` components. Only authenticated users with appropriate roles can access their respective dashboards.

---

## 🧪 Features in Progress / TODO

- 🔄 API integration with real backend for request/response data
- ✅ Enhanced form validation
- 🔔 Notification system
- 🧠 AI-based mentor suggestion (future roadmap)
- 📂 Pagination and search improvements

---

## ⚙️ Setup & Installation

> **Prerequisites**: Node.js & npm installed

1. **Clone the repo**:
   ```bash
   git clone https://github.com/your-username/codebuddy-frontend.git
   ```

2. **Navigate into the project**:
   ```bash
   cd codebuddy-frontend
   ```

3. **Install dependencies**:
   ```bash
   npm install
   ```

4. **Start the development server**:
   ```bash
   npm run dev
   ```

5. Open in browser:
   ```
   http://localhost:5173
   ```

---

## 🌐 Environment Variables

If required, create a `.env` file at the root:

```env
VITE_API_BASE_URL=http://localhost:5000/api
```

---

## 👥 Contributors

- **Absolom Orianga.** — absolomjr100@gmail.com
- **Isaac Nabasa.** - nabasaisaac16@gmail.com
- Open for collaboration! 🚀

---

## 📄 License

This project is licensed under the **MIT License** — feel free to use, modify, and distribute responsibly.

---

## 🙌 Acknowledgements

- React Docs
- Tailwind CSS Team

