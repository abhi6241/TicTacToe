# Tic-Tac-Toe 🎮

A simple, fully functional Tic-Tac-Toe game built with only **HTML, CSS, and JavaScript**.

## Features

- 2 game modes: **2 Players** and **Vs Computer**
- Win detection (rows, columns, diagonals) with winning-cell highlight
- Draw detection
- Scoreboard (X wins / O wins / Draws)
- New Round + Reset Scores buttons
- Responsive design (works on mobile and desktop)
- Computer AI: tries to win, blocks your win, takes center, else random

## Project Structure

```
.
├── index.html
├── style.css
├── script.js
└── README.md
```

## How to Run / Play

No build step or dependencies needed.

**Option 1 — Open directly:**

1. Download/clone this repository.
2. Double-click `index.html` to open it in your browser.

**Option 2 — VS Code Live Server:**

1. Open the folder in VS Code.
2. Right-click `index.html` → "Open with Live Server".

**Option 3 — Terminal:**

```bash
# Python 3
python3 -m http.server 8000
# then open http://localhost:8000
```

## How to Play

1. X always goes first.
2. Click any empty cell to place your mark.
3. Get 3 in a row (horizontal, vertical, diagonal) to win.
4. If all 9 cells fill with no winner, it's a draw.
5. Use **2 Players** for local multiplayer, or **Vs Computer** to play against the AI (you are X).
6. Click **New Round** to clear the board, **Reset Scores** to zero the scoreboard.
