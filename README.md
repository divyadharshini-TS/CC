# CareConnect - Healthcare Support Web Application

CareConnect is a complete MERN Stack web application designed for NGOs to efficiently manage patient support requests and volunteer registrations. It features an automated AI-simulated summary generator and priority detection system.

## Tech Stack

- **Frontend**: React.js (Vite), Tailwind CSS, React Router, Axios, Lucide React
- **Backend**: Node.js, Express.js, MongoDB Atlas, Mongoose
- **Deployment Ready**: Frontend (Vercel), Backend (Render)

## Features

- Modern SaaS UI with Dark/Light mode toggle.
- Patient Support Request form with form validation.
- Volunteer Registration form.
- Automated generation of patient summaries.
- Smart priority detection (HIGH/MEDIUM/LOW) based on medical concerns.
- Floating AI FAQ Chatbot using keyword matching.
- Admin Dashboard with live statistics and filtering.

## Getting Started

### Prerequisites
- Node.js (v16+)
- MongoDB (Local or Atlas URI)

### Backend Setup

1. Navigate to the `backend` directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file based on `.env.example`:
   ```bash
   cp .env.example .env
   ```
   *Note: Set your `MONGODB_URI` in the `.env` file.*
4. Start the server:
   ```bash
   npm start
   ```

### Frontend Setup

1. Navigate to the `frontend` directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

## Deployment Instructions

### Deploying the Backend (Render)
1. Push your code to GitHub.
2. Go to [Render](https://render.com/) and create a new **Web Service**.
3. Connect your GitHub repository.
4. Set the Root Directory to `backend`.
5. Build Command: `npm install`
6. Start Command: `node server.js`
7. Add Environment Variables:
   - `MONGODB_URI`: Your MongoDB Atlas connection string.
   - `PORT`: `5000` (or leave default).

### Deploying the Frontend (Vercel)
1. Push your code to GitHub.
2. Go to [Vercel](https://vercel.com/) and click **Add New Project**.
3. Import your GitHub repository.
4. Set the Framework Preset to **Vite**.
5. Set the Root Directory to `frontend`.
6. Add Environment Variables if needed (e.g., `VITE_API_URL` pointing to your Render backend URL, though you might need to update the axios base URL in the frontend code).
7. Click **Deploy**.

## Polish Recommendations
- Add your personal NGO name and logo.
- Update placeholder texts or images.
- Take high-quality screenshots and add them to this README!
