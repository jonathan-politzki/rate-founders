# Rate Founders - README

## Project Overview

**Rate Founders** is a platform designed to allow users to rate startup founders in various categories such as **niceness**, **talent**, **intelligence**, and **experience**. The platform aggregates ratings to help users determine whether a founder is "Signal" or "Noise" — a measure of how genuinely productive or trustworthy they are within the startup ecosystem.

This platform draws inspiration from professional networks like LinkedIn, review platforms like Yelp, and social ranking features reminiscent of Zuckerberg's FaceMash. It aims to help people in the startup world filter between real, hardworking founders and those who are merely "playing startup" or acting unethically.

The platform features:
1. **Founder Search**: Users can search for founders via LinkedIn, X.com (formerly Twitter), or by name.
2. **Founder Profiles**: Founder profiles include their name, company, profile picture, and ratings from the community.
3. **User Ratings & Reviews**: Users can rate founders on various dimensions and leave written comments about their interactions.
4. **Signal/Noise Score**: An overall rating that classifies the founder as "Signal" or "Noise" based on community feedback.
5. **Automatic Founder Population**: In future iterations, the app will scrape data from LinkedIn and X.com to populate founder profiles.

---

## Tech Stack

The tech stack is designed for flexibility, scalability, and modern UIUX design.

### Frontend

- **React.js**: A popular JavaScript library for building user interfaces.
- **Material-UI**: A modern UI component library for React to create beautiful and responsive designs.
- **Axios**: Used for making HTTP requests to the backend API.
- **React Router**: For routing and navigation within the app.

### Backend

- **Node.js**: A runtime environment that allows you to run JavaScript on the server.
- **Express.js**: A web framework for Node.js used for building APIs.
- **MongoDB**: A NoSQL database for storing founder profiles and user ratings.

---

## Folder Structure

rate-founders/
├── backend/
│   ├── models/              # Mongoose models for MongoDB
│   ├── routes/              # Express routes for API endpoints
│   ├── server.js            # Entry point for the backend server
├── founder-rating-app/       # Frontend React app
│   ├── public/              # Public assets and index.html
│   ├── src/                 # React components and logic
│   ├── package.json         # React dependencies
├── README.md                # Project documentation
├── .gitignore               # Ignored files for Git

---

## Features

### Founder Search
- Users can search for founders by entering a name or LinkedIn/X.com URL.
- If a founder is not found in the database, users can submit their information manually.

### Founder Profile
- Displays a profile picture (sourced from LinkedIn or uploaded manually).
- Shows aggregate ratings for the founder on four key dimensions:
  1. Niceness
  2. Talent
  3. Intelligence
  4. Experience
- Displays an overall Signal or Noise score based on the ratings.

### Rating System
- Users can leave ratings from 1 to 5 in each category.
- Ratings are displayed using visual elements like progress bars and an overall score banner.

---

## Installation and Setup

### Prerequisites

- **Node.js**: Ensure you have Node.js installed (v14+ recommended).
- **MongoDB**: Install MongoDB on your machine or use a cloud MongoDB instance like MongoDB Atlas.

### Backend Setup

1. Navigate to the `backend` directory:
   ```bash
   cd backend


   