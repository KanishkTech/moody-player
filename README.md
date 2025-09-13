# Moody Player 🎵😊

Moody Player is an AI-powered music player that detects your mood from your facial expressions and recommends songs accordingly. Built during my backend learning journey, it combines computer vision, cloud storage, and database management.

## Features
- Real-time mood detection using `face-api.js`
- Personalized song recommendations based on mood
- Song storage and management with `ImageKit`
- MongoDB integration for efficient data storage

## Tech Stack
- Node.js
- Express.js
- MongoDB
- ImageKit
- face-api.js
- JavaScript

## How It Works
1. User opens the app and allows camera access.
2. `face-api.js` detects facial expressions.
3. Mood is analyzed and matched with songs stored in MongoDB.
4. Recommended songs are displayed for the user to play.

## Installation
1. Clone this repo: `git clone <repo-link>`
2. Install dependencies: `npm install`
3. Configure `.env` with MongoDB and ImageKit credentials
4. Run the server: `npm start`
5. Open the frontend to start using Moody Player

## Future Enhancements
- Add more moods and songs
- Improve UI/UX for better user experience
- Integrate Spotify API for dynamic song recommendations

---

## Contributing
Feel free to open issues or submit pull requests!

## License
MIT License
