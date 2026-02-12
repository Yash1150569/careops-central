🧠 CareOps — Unified Operations Platform

CareOps is a single, unified operations platform designed to replace the chaos of disconnected tools used by service-based businesses.

Instead of using separate tools for leads, bookings, email, forms, inventory, and reports — CareOps brings everything into one operational system.

🚀 Problem Statement

Most service businesses today operate using disconnected tools:

One tool for leads

Another for bookings

Another for email/SMS

Another for forms

Another for inventory

No unified dashboard

This causes:

Missed leads

Delayed follow-ups

Lost bookings

Incomplete forms

Inventory shortages

No real-time visibility

CareOps solves this by creating one operational control center.

🏗 System Architecture
4
⚙️ Tech Stack
Frontend

Next.js (React)

Axios

Responsive UI

Backend

FastAPI

SQLAlchemy

PostgreSQL

Gmail SMTP Integration

Database

PostgreSQL

Deployment

Railway (Backend + DB)

Vercel (Frontend)

👥 Roles
Business Owner (Admin)

Workspace setup

Integrations configuration

Monitor dashboard

View alerts

Add staff

Staff

Manage inbox

Reply to customers

Track bookings

Track form status

Update booking status

Customers do not log in.

🔁 Core Features
✅ Unified Dashboard

Today’s bookings

Upcoming bookings

Lead overview

Pending forms

Inventory alerts

Actionable alerts

✅ Inbox (Single Conversation Rule)

One contact → one conversation

Email + SMS thread

Automation stops when staff replies

Full message history

✅ Public Contact Flow

Customer submits form →
System:

Creates contact

Starts conversation

Sends welcome email

✅ Public Booking Flow

Customer books service →
System:

Creates booking

Sends confirmation

Sends forms

Schedules reminders

Tracks status

✅ Post-Booking Forms

Automatically sent after booking

Submissions stored in DB

Email confirmation sent to customer

Status tracking

✅ Inventory Management

Track resource usage

Low-stock alerts

Dashboard visibility

Alert logging

⚙️ Automation Engine (Event-Based)

Strict, predictable rules:

New contact → Welcome message

Booking created → Confirmation

Before booking → Reminder

Pending form → Reminder

Inventory below threshold → Alert

Staff reply → Automation stops

No hidden logic. No magic conditions.

📂 Project Structure
careops/
 ├── backend/
 │    ├── main.py
 │    ├── db.py
 │    ├── automation.py
 │    ├── email_service.py
 │    └── requirements.txt
 │
 └── frontend/
      ├── pages/
      ├── public/
      └── components/

🖥 Local Development
1️⃣ Backend
cd backend
pip install -r requirements.txt
uvicorn main:app --reload


Backend runs at:

http://localhost:8000


Swagger docs:

http://localhost:8000/docs

2️⃣ Frontend
cd frontend
npm install
npm run dev


Frontend runs at:

http://localhost:3000

🌍 Deployment
Backend

Deployed on:
Railway

Start command:

uvicorn main:app --host 0.0.0.0 --port $PORT

Frontend

Deployed on:
Vercel

Environment variable:

NEXT_PUBLIC_API_URL=https://your-backend-url.up.railway.app

🔐 Environment Variables

Backend:

DATABASE_URL=
GMAIL=
APP_PASSWORD=


Frontend:

NEXT_PUBLIC_API_URL=

📊 Why CareOps Is Different

Unlike CRMs that focus only on sales, CareOps focuses on operations:

Lead intake

Booking lifecycle

Form compliance

Communication tracking

Inventory visibility

Real-time operational alerts

All in one system.

🎯 Hackathon Alignment

CareOps directly satisfies:

✔ Unified operations platform
✔ Single dashboard visibility
✔ Event-based automation
✔ Public customer flows
✔ Staff role separation
✔ Integration abstraction
✔ Inventory alerts
✔ Communication logging

🚀 Future Improvements

AI response suggestions

Sentiment detection

No-show prediction

Analytics dashboard

Webhook integrations

Multi-workspace support


