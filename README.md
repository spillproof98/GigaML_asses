
## Description
This is a real-time multiplayer Ping Pong game built using Flask-SocketIO for the backend and HTML5 Canvas for the frontend. Players can connect in different browser tabs and compete in real-time with dynamic obstacles and a scoring system.

---

## Features
- **Real-time gameplay** using WebSocket communication.
- **Dynamic obstacles** that enhance gameplay difficulty.
- **Scoring system** to track players' progress.
- **"Kid vs Man" difficulty mode** with adjustable paddle speeds for players.

---

## Setup Instructions

### **Backend**
1. Navigate to the `backend` directory:
   ```bash
   cd backend
=======
# Ping Pong Game

A simple interactive Ping Pong game built as a single-page application (SPA). The game features options for Player vs AI and Player vs Player modes with adjustable AI difficulty.

## Features

- **Modes**: 
  - Player vs AI
  - Player vs Player
- **Difficulty Levels**:
  - Easy
  - Medium
  - Hard
- **Scoreboard**: Displays the current score of Player 1 and Player 2.
- **Game Winner**: The game ends when a player scores 10 points, and the winner is displayed.
- **Dark Theme**: A visually appealing dark-themed interface.
- **AI Player**: Automatically plays when Player vs AI mode is selected.

## Requirements

### Backend:
- Python 3.8+
- Flask
- Flask-SocketIO
- Flask-CORS

### Frontend:
- Vanilla JavaScript
- HTML/CSS

## Installation and Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/PingPongGame.git
   cd PingPongGame

cd Backend
pip install -r requirements.txt
python app.py

cd Frontend
python -m http.server 5500

How to Play
Open the frontend in your browser.
Select the game mode (Player vs AI or Player vs Player).
Choose the AI difficulty level (Easy, Medium, Hard) if playing against AI.
Use the following keys to play:
Player 1: W (up) and S (down)
Player 2: Arrow Up (up) and Arrow Down (down)
The first player to score 10 points wins the game.
>>>>>>> 2235a1abd366ac9d0d1625b35a349ae57c4c115b
