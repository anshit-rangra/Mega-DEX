# Mega-DEX

A full-stack decentralized exchange (DEX) simulation platform where users can create token pools, buy/sell tokens, claim daily airdrops, and manage their portfolios — all with a virtual currency system.

🌐 **Live Demo:** [https://mega-dex-eosin.vercel.app/](https://mega-dex-eosin.vercel.app/)

## Features

- **User Authentication** — Register with avatar selection and login with secure JWT-based authentication
- **Token Pools** — Browse and interact with token liquidity pools
- **Buy & Sell Tokens** — Trade tokens at dynamic prices with quantity selection
- **Create Pools** — Authenticated users can create new token pools with custom images
- **Daily Airdrops** — Claim free virtual currency every day
- **User Profiles** — View your account details, balance, and token holdings
- **Find Users** — Search and view other users' profiles and portfolios
- **Responsive Design** — Mobile-friendly UI with hamburger menu navigation

## Tech Stack

### Frontend
- **React 19** with TypeScript
- **Vite** — Fast build tool and dev server
- **Redux Toolkit** — State management for auth and token data
- **React Router DOM** — Client-side routing with lazy loading
- **Axios** — HTTP client for API communication
- **React Toastify** — Toast notifications
- **Vercel** — Frontend deployment

### Backend
- **Express 5** with TypeScript
- **MongoDB** with Mongoose — Database for users and token pools
- **Redis** — Caching layer
- **JWT** — JSON Web Token authentication
- **bcrypt** — Password hashing
- **Multer** — File upload handling
- **ImageKit** — Cloud image storage for token images
- **Zod** — Request validation

## Project Structure

```
Mega-DEX/
├── backend/
│   ├── index.ts                    # Entry point - server startup
│   ├── src/
│   │   ├── app.ts                  # Express app configuration
│   │   ├── config/
│   │   │   ├── multer.config.ts    # File upload configuration
│   │   │   └── imagekit.config.ts  # ImageKit cloud storage
│   │   ├── controller/             # Route handlers
│   │   ├── db/
│   │   │   ├── db.ts              # MongoDB connection
│   │   │   └── redis.ts           # Redis connection
│   │   ├── middlewares/            # Auth middleware
│   │   ├── models/                 # Mongoose schemas
│   │   ├── routes/
│   │   │   ├── auth.routes.ts     # Authentication routes
│   │   │   └── token.routes.ts    # Token/pool routes
│   │   └── validation/            # Zod validators
│   ├── package.json
│   └── tsconfig.json
├── frontend/
│   ├── src/
│   │   ├── App.tsx                 # Root component with routing
│   │   ├── main.tsx               # React entry point
│   │   ├── api/                   # API service functions
│   │   ├── components/
│   │   │   ├── Navbar.tsx         # Navigation bar
│   │   │   └── Loader.tsx         # Loading spinner
│   │   ├── pages/
│   │   │   ├── Home.tsx           # Token pools listing
│   │   │   ├── Login.tsx          # Login form
│   │   │   ├── Register.tsx       # Registration with avatar
│   │   │   ├── Pool.tsx           # Buy/sell token page
│   │   │   ├── MyAccount.tsx      # User dashboard
│   │   │   ├── CreatePool.tsx     # Create new token pool
│   │   │   └── UserAccount.tsx    # Search & view users
│   │   ├── store/                 # Redux store & slices
│   │   └── index.css              # Global styles
│   ├── package.json
│   └── vite.config.ts
```

## API Endpoints

### Authentication (`/api/auth`)
| Method | Endpoint     | Auth | Description           |
|--------|-------------|------|-----------------------|
| POST   | `/register` | No   | Register a new user   |
| POST   | `/login`    | No   | Login and get token   |
| GET    | `/me`       | Yes  | Get current user info |
| GET    | `/user/:id` | No   | Get user by ID        |

### Tokens (`/api/token`)
| Method | Endpoint            | Auth | Description             |
|--------|---------------------|------|-------------------------|
| GET    | `/fetch/pools`      | No   | Get all token pools     |
| GET    | `/get/price/:id`    | No   | Get token price         |
| POST   | `/create/pool`      | Yes  | Create a new token pool |
| DELETE | `/delete/pool/:pool`| Yes  | Delete a token pool     |
| POST   | `/buy`              | Yes  | Buy tokens              |
| POST   | `/sell`             | Yes  | Sell tokens             |
| GET    | `/drop`             | Yes  | Claim daily airdrop     |

## Getting Started

### Prerequisites
- Node.js (v18+)
- MongoDB instance
- Redis instance
- ImageKit account (for image uploads)

### Environment Variables

**Backend** (`backend/.env`):
```env
PORT=3000
MONGO_URI=your_mongodb_connection_string
REDIS_URL=your_redis_url
JWT_SECRET=your_jwt_secret
FRONTEND_URL=http://localhost:5173
IMAGEKIT_PUBLIC_KEY=your_imagekit_public_key
IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key
IMAGEKIT_URL_ENDPOINT=your_imagekit_url_endpoint
```

**Frontend** (`frontend/.env`):
```env
VITE_BACKEND_URL=http://localhost:3000
```

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/anshit-rangra/Mega-DEX.git
   cd Mega-DEX
   ```

2. **Setup Backend**
   ```bash
   cd backend
   npm install
   npm run dev
   ```

3. **Setup Frontend**
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

4. Open [http://localhost:5173](http://localhost:5173) in your browser.

## License

This project is open source and available for personal and educational use.
