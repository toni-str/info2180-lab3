document.addEventListener('DOMContentLoaded', function() {
    const squares = document.querySelectorAll('#board div');
    const statusDiv = document.getElementById('status');
    const newGameButton = document.querySelector('.btn');

    let currentPlayer = 'X';
    let gameState = ["", "", "", "", "", "", "", "", ""];
    let gameActive = true;

    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6]             // Diagonals
    ];

    function checkWinner() {
        // winner condition
        for (let [a, b, c] of winningCombinations) {
            if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
                gameActive = false;
                const winner = gameState[a];
                statusDiv.textContent = `Congratulations! ${winner} is the Winner!`;
                statusDiv.classList.add('you-won');
                return;
            }
        }

        // draw condition
        if (!gameState.includes("") && gameActive) {
            gameActive = false;
            statusDiv.textContent = "🤝It's a draw! 🤝 Try again?";
            statusDiv.classList.remove('you-won'); // Ensure no winner color
            return;
        }
    }

    function resetGame() {
        currentPlayer = 'X';
        gameState = ["", "", "", "", "", "", "", "", ""];
        gameActive = true;

        statusDiv.textContent = "Move your mouse over a square and click to play an X or an O.";
        statusDiv.classList.remove('you-won');

        squares.forEach(square => {
            square.textContent = '';
            square.classList.remove('X', 'O');
        });
    }

    newGameButton.addEventListener('click', resetGame);

    squares.forEach((square, index) => {
        square.classList.add('square');

        square.addEventListener('click', () => {
            if (gameState[index] === "" && gameActive) {
                square.textContent = currentPlayer;
                square.classList.add(currentPlayer);
                gameState[index] = currentPlayer;

                checkWinner();

                if (gameActive) {
                    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
                }
            }
        });

        square.addEventListener('mouseover', () => {
            if (gameState[index] === "" && gameActive) {
                square.classList.add('hover');
            }
        });

        square.addEventListener('mouseout', () => {
            square.classList.remove('hover');
        });
    });
});
