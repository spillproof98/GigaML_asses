from flask import Flask
from flask_socketio import SocketIO, emit
from flask_cors import CORS
import random

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "http://127.0.0.1:5500"}})
socketio = SocketIO(app, cors_allowed_origins=["http://127.0.0.1:5500"])

game_state = {
    "ball": {"x": 250, "y": 250, "dx": 2, "dy": 2},
    "paddles": {"player1": 200, "player2": 200},
    "obstacles": [{"x": random.randint(50, 400), "y": random.randint(50, 400)} for _ in range(2)],
    "scores": {"player1": 0, "player2": 0}
}

@app.route("/")
def index():
    return "Server is running!"

@app.route("/favicon.ico")
def favicon():
    return "", 204

@socketio.on("connect")
def on_player_connect():
    print("A player connected.")
    emit("game_state", game_state)

@socketio.on("update_paddle")
def on_paddle_update(data):
    player = data.get("player")
    position = data.get("position")
    if player in game_state["paddles"]:
        game_state["paddles"][player] = position
        emit("game_state", game_state, broadcast=True)

@socketio.on("update_ball")
def on_ball_update():
    ball = game_state["ball"]
    ball["x"] += ball["dx"]
    ball["y"] += ball["dy"]

    if ball["y"] <= 0 or ball["y"] >= 500:
        ball["dy"] *= -1

    if ball["x"] <= 30 and game_state["paddles"]["player1"] <= ball["y"] <= game_state["paddles"]["player1"] + 100:
        ball["dx"] *= -1
    elif ball["x"] >= 470 and game_state["paddles"]["player2"] <= ball["y"] <= game_state["paddles"]["player2"] + 100:
        ball["dx"] *= -1

    if ball["x"] <= 0:
        game_state["scores"]["player2"] += 1
        reset_ball()
    elif ball["x"] >= 500:
        game_state["scores"]["player1"] += 1
        reset_ball()

    emit("game_state", game_state, broadcast=True)

def reset_ball():
    game_state["ball"] = {"x": 250, "y": 250, "dx": 2, "dy": 2}

if __name__ == "__main__":
    socketio.run(app, host="127.0.0.1", port=5000, debug=True)
