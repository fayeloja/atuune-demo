# ATUUNE Demo — Node.js + Firebase Backend

A full-stack demo project built to practice real-world backend deployment. Features Firebase Authentication and Realtime Database via the Admin SDK, a vanilla JS frontend, and a complete deployment pipeline to AWS Lightsail using PM2 and Nginx.

---

## Tech Stack

- **Runtime:** Node.js (v20)
- **Framework:** Express.js
- **Authentication:** Firebase Auth (Admin SDK)
- **Database:** Firebase Realtime Database
- **Process Manager:** PM2
- **Reverse Proxy:** Nginx
- **Hosting:** AWS Lightsail (Ubuntu 22.04)
- **Frontend:** Vanilla HTML/CSS/JS + Firebase Client SDK

---

## Features

- User registration via Firebase Auth
- Login with Firebase ID token generation
- Protected routes using JWT token verification middleware
- Per-user data write and read on Firebase Realtime Database
- User profile endpoint
- Frontend test UI for the full auth and data flow
- Production deployment with PM2 and Nginx reverse proxy

---

## Project Structure

```
atuune-demo/
├── backend/
│   ├── middleware/
│   │   └── verifyToken.js       # Firebase ID token verification
│   ├── routes/
│   │   ├── auth.js              # Register + profile endpoints
│   │   └── data.js              # Realtime DB read/write endpoints
│   ├── .env                     # Environment variables (not committed)
│   ├── server.js                # Express app entry point
│   └── package.json
└── frontend/
    └── index.html               # Test UI (Firebase Client SDK)
```

---

## API Endpoints

| Method | Endpoint             | Auth Required | Description                              |
| ------ | -------------------- | ------------- | ---------------------------------------- |
| GET    | `/`                  | No            | Health check                             |
| POST   | `/api/auth/register` | No            | Create a new user                        |
| GET    | `/api/auth/profile`  | Yes           | Get authenticated user profile           |
| POST   | `/api/data/write`    | Yes           | Write a key/value to Realtime DB         |
| GET    | `/api/data/read`     | Yes           | Read all data for the authenticated user |

Protected endpoints require a `Bearer` token in the `Authorization` header — obtained by logging in via the Firebase Client SDK on the frontend.

---

## Local Setup

**Prerequisites:**

- Node.js v20+
- A Firebase project with Auth (Email/Password) and Realtime Database enabled
- A downloaded service account key (`serviceAccountKey.json`)

**Steps:**

```bash
# Clone the repo
git clone https://github.com/YOUR_USERNAME/atuune-demo.git
cd atuune-demo/backend

# Install dependencies
npm install

# Create your .env file
cp .env.example .env
# Fill in your FIREBASE_DATABASE_URL

# Place your serviceAccountKey.json in the backend/ folder

# Start the dev server
npm run dev
```

Open `frontend/index.html` in your browser and point `BACKEND` to `http://localhost:3000`.

---

## Environment Variables

Create a `.env` file in the `backend/` folder:

```env
PORT=3000
FIREBASE_DATABASE_URL=https://your-project-id-default-rtdb.firebaseio.com
```

> Never commit `serviceAccountKey.json` or `.env` to version control.

---

## Deployment (AWS Lightsail / Any Ubuntu VPS)

```bash
# On the server — install Node.js 20
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs

# Install PM2
sudo npm install -g pm2

# Install Nginx
sudo apt install -y nginx

# Upload project and install production dependencies
npm install --omit=dev

# Start with PM2
pm2 start server.js --name atuune-backend
pm2 save && pm2 startup

# Configure Nginx as reverse proxy (port 80 → localhost:3000)
# Then reload Nginx
sudo nginx -t && sudo systemctl reload nginx
```

Full deployment guide available in [DEPLOYMENT.md](./DEPLOYMENT.md) _(coming soon)_.

---

## Security Notes

- `serviceAccountKey.json` is listed in `.gitignore` — never commit it
- Token verification is handled server-side on every protected route
- Realtime Database rules should be tightened before going to production — test mode is used here for demo purposes only

---

## Author

**Fatai Ayeloja (Iyanda)** — Backend Engineer & DevOps  
[@fayeloja.dev](https://instagram.com/fayeloja.dev) · [X/Twitter](https://x.com/fayeloja)

---

## License

MIT
