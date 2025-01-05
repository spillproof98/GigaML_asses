from flask import Flask # type: ignore
from flask_socketio import SocketIO, emit # type: ignore
import random

app = Flask(__name__)
socketio = SocketIO(app)

game_state = {
    "ball": {"x": 250, "y": 250, "dx": 2, "dy": 2},
    "paddles": {"player1": 200, "player2": 200},
    "obstacles": [{"x": random.randint(50, 400), "y": random.randint(50, 400)} for _ in range(2)],
    "scores": {"player1": 0, "player2": 0}
}

@socketio.on('connect')
def on_player_connect():
    print("New player connected!")
    emit('game_state', game_state)

@socketio.on('update_paddle')
def on_paddle_update(data):
    player = data.get("player")
    position = data.get("position")
    if player in game_state["paddles"]:
        game_state["paddles"][player] = position
        print(f"Updated {player}'s paddle to position {position}")
        emit('game_state', game_state, broadcast=True)

if __name__ == "__main__":
    print("Starting the game server...")
    socketio.run(app, debug=True, host="0.0.0.0", port=5000)
