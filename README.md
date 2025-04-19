# Coding Challenge: Sales Dashboard with Next.js & FastAPI

## Introduction
This web application provides an interactive dashboard to explore your sales representatives' data, enhanced with an AI question-answering feature.

### What It Does

Visualize sales rep data in an organized, responsive grid and chart.

Ask natural language questions about your sales team (e.g., "Who has the highest sales?" or "Show me the top performer").

Receive AI-generated insights and automatically highlight relevant reps in the grid.

Smooth loading states and user experience, including an AI overlay while your answer is generated.

### Tech Stack

Frontend: NextJS + Tailwind CSS

Backend API: FastAPI

AI Logic: Custom service powered by Gemini/OpenAI-style model

Data Source: Mock/dummy data loaded from a JSON file

## Installation

### Backend
```
change directory to /backend

cp .env.example .env (put the the key for gemini api key)

py -m venv venv (optional to contained environment)

venv/Script/activate (optional  to contained environment)

pip install -r requirement

python main.py
```

### Frontend
```
change directory to /frontend

cp .env.example .env (put the url http://localhost:8000)

npm install

npm run dev

open http://localhost:3000
```

### FastApi
```
open
http://localhost:8000/docs

or

http://localhost:8000/redoc
```