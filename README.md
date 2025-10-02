# Mood & Workout Angular App

## Overview
The **Mood & Workout** application is an Angular project designed to demonstrate dynamic form rendering based on user choices. Users can select a mood and then add workouts depending on mood. The application presents the flexibility of Angular forms and conditional rendering.

---

## Features
- **Mood Selection:** Choose from various moods upon entering the application.
- **Dynamic Workouts:** Add workouts that depending on the selected mood.
- **Workout Details:** Each workout can include:
  - **Category** (e.g., run, bike, swim, walk, stretch, sleep)
  - **Time**
  - **Distance** (only shows up for some categories e.g., run, bike, swim, walk)
- **Edit & Delete:** Update or remove workouts using Angular dialogs.
- **Single User:** Only one pre-configured user exists, and all actions are restricted to this account.
- **Local Database:** All data is stored locally in `db.json` for demonstration purposes.

---


## Application Routes
The app includes three main routes:

| Route                | Description                                 |
|----------------------|---------------------------------------------|
| `/`                  | Home page                                   |
| `/workout`           | Form to add a new workout                   |
| `/user/:id`          | Display workouts for a specific user        |

---

## Project Structure

<pre> 
src/
│
├── app/
│ ├── components/ # Angular components (Mood, Workout, User, Workout-edit-dialog)
│ ├── services/ # Services for data management
│ ├── models/ # TypeScript interfaces (Workout, User, Moodoptions, Mood)
│ ├── environments/ # Environment variables to manage urls and userId
│ └── db.json # Local database for demonstration
│
├── public/ # Photos
│ 
</pre>
---

## Technologies Used
- **Angular**
- **Angular Material** – for dialogs and UI components
- **JSON Server** – to simulate a local database (`db.json`)

---

## Installation & Setup
1. **Clone the repository**

```bash
git clone git@github.com:Dorkis/mood-and-workout-app.git
cd mood-workout-app
```

2. **Install dependencies**

```bash
npm install
```

3. **Run application**

```bash
npm start
```

This will start development server and run local JSON server.

Once the server is running, open your browser and navigate to `http://localhost:4200/`.
