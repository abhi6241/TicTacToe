// Tic-Tac-Toe: PvP + Vs Computer (random AI)
// State
let board = Array(9).fill("");
let currentPlayer = "X";
let gameActive = true;
let vsAI = false;
let scores = { X: 0, O: 0, draws: 0 };

const WIN_COMBOS = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // cols
  [0, 4, 8], [2, 4, 6]             // diagonals
];

// DOM
const cells = document.querySelectorAll(".cell");
const statusEl = document.getElementById("status");
const scoreXEl = document.getElementById("scoreX");
const scoreOEl = document.getElementById("scoreO");
const scoreDrawEl = document.getElementById("scoreDraw");
const resetBtn = document.getElementById("resetBtn");
const resetScoreBtn = document.getElementById("resetScoreBtn");
const pvpBtn = document.getElementById("pvpBtn");
const aiBtn = document.getElementById("aiBtn");

cells.forEach((cell) => cell.addEventListener("click", onCellClick));
resetBtn.addEventListener("click", resetRound);
resetScoreBtn.addEventListener("click", resetScores);

pvpBtn.addEventListener("click", () => setMode(false));
aiBtn.addEventListener("click", () => setMode(true));

function setMode(aiMode) {
  vsAI = aiMode;
  pvpBtn.classList.toggle("active", !aiMode);
  aiBtn.classList.toggle("active", aiMode);
  resetRound();
}

function onCellClick(e) {
  const index = Number(e.target.dataset.index);
  if (!gameActive || board[index] !== "") return;

  // In AI mode, human is always X
  if (vsAI && currentPlayer === "O") return;

  makeMove(index, currentPlayer);

  if (!gameActive) return;

  if (vsAI && currentPlayer === "O") {
    // Small delay so computer move feels natural
    setTimeout(aiMove, 350);
  }
}

function makeMove(index, player) {
  board[index] = player;
  const cell = cells[index];
  cell.textContent = player;
  cell.classList.add(player.toLowerCase());
  cell.disabled = true;

  const winCombo = checkWinner(board);
  if (winCombo) {
    endGame(player, winCombo);
    return;
  }

  if (board.every((c) => c !== "")) {
    endGame("draw", null);
    return;
  }

  currentPlayer = player === "X" ? "O" : "X";
  updateStatus();
}

function aiMove() {
  if (!gameActive) return;
  const empty = board
    .map((v, i) => (v === "" ? i : null))
    .filter((v) => v !== null);
  if (empty.length === 0) return;

  // Try to win, else block, else random
  const move = findBestMove() ?? empty[Math.floor(Math.random() * empty.length)];
  makeMove(move, "O");
}

function findBestMove() {
  // 1. Winning move for O
  for (const [a, b, c] of WIN_COMBOS) {
    const line = [board[a], board[b], board[c]];
    if (line.filter((v) => v === "O").length === 2 && line.includes("")) {
      return [a, b, c][line.indexOf("")];
    }
  }
  // 2. Block X win
  for (const [a, b, c] of WIN_COMBOS) {
    const line = [board[a], board[b], board[c]];
    if (line.filter((v) => v === "X").length === 2 && line.includes("")) {
      return [a, b, c][line.indexOf("")];
    }
  }
  // 3. Center
  if (board[4] === "") return 4;
  return null;
}

function checkWinner(b) {
  for (const combo of WIN_COMBOS) {
    const [a, c1, c2] = combo;
    if (b[a] && b[a] === b[c1] && b[a] === b[c2]) return combo;
  }
  return null;
}

function endGame(result, winCombo) {
  gameActive = false;
  if (winCombo) winCombo.forEach((i) => cells[i].classList.add("win"));

  if (result === "draw") {
    scores.draws++;
    statusEl.textContent = "It's a draw!";
    statusEl.className = "status draw";
  } else {
    scores[result]++;
    if (vsAI) {
      statusEl.textContent = result === "X" ? "You win!" : "Computer wins!";
    } else {
      statusEl.textContent = `Player ${result} wins!`;
    }
    statusEl.className = `status win-${result.toLowerCase()}`;
  }
  updateScores();
}

function updateStatus() {
  statusEl.className = "status";
  if (vsAI) {
    statusEl.textContent = currentPlayer === "X" ? "Your turn (X)" : "Computer's turn (O)";
  } else {
    statusEl.textContent = `Player ${currentPlayer}'s turn`;
  }
}

function updateScores() {
  scoreXEl.textContent = scores.X;
  scoreOEl.textContent = scores.O;
  scoreDrawEl.textContent = scores.draws;
}

function resetRound() {
  board = Array(9).fill("");
  currentPlayer = "X";
  gameActive = true;
  cells.forEach((cell) => {
    cell.textContent = "";
    cell.className = "cell";
    cell.disabled = false;
  });
  updateStatus();
}

function resetScores() {
  scores = { X: 0, O: 0, draws: 0 };
  updateScores();
  resetRound();
}
