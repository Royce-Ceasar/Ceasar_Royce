const bingoBoard = document.getElementById("bingo-board");
const calledNumbers = new Set();
const bingoNumbers = {
    B: generateUniqueNumbers(1, 15),
    I: generateUniqueNumbers(16, 30),
    N: generateUniqueNumbers(31, 45),
    G: generateUniqueNumbers(46, 60),
    O: generateUniqueNumbers(61, 75)
};

// Generate unique numbers for each column
function generateUniqueNumbers(start, end) {
    const nums = [];
    while (nums.length < 5) {
        const num = Math.floor(Math.random() * (end - start + 1)) + start;
        if (!nums.includes(num)) nums.push(num);
    }
    return nums;
}

// Build the Bingo board
function buildBoard() {
    for (let row = 0; row < 5; row++) {
        const tr = document.createElement("tr");
        ["B", "I", "N", "G", "O"].forEach((letter, col) => {
            const td = document.createElement("td");
            td.classList.add("bingo-cell");
            td.style.cursor = "pointer";
            td.onclick = () => toggleMark(td);

            if (row === 2 && col === 2) {
                td.textContent = "★"; // Free space
                td.classList.add("marked");
            } else {
                td.textContent = bingoNumbers[letter][row];
            }

            tr.appendChild(td);
        });
        bingoBoard.appendChild(tr);
    }
}

// Toggle cell mark
function toggleMark(cell) {
    cell.classList.toggle("marked");
    checkForBingo();
}

// Call next number
function callNextNumber() {
    const allNumbers = Array.from({ length: 75 }, (_, i) => i + 1);
    const remaining = allNumbers.filter(n => !calledNumbers.has(n));

    if (remaining.length === 0) {
        alert("All numbers have been called!");
        return;
    }

    const next = remaining[Math.floor(Math.random() * remaining.length)];
    calledNumbers.add(next);

    const letter = getBingoLetter(next);
    alert(`Next number is: ${letter}${next}`);
}

// Determine Bingo letter
function getBingoLetter(num) {
    if (num <= 15) return "B";
    if (num <= 30) return "I";
    if (num <= 45) return "N";
    if (num <= 60) return "G";
    return "O";
}

// Check for Bingo
function checkForBingo() {
    const rows = bingoBoard.rows;
    let bingo = false;

    // Check rows
    for (let i = 0; i < 5; i++) {
        if ([...rows[i].cells].every(cell => cell.classList.contains("marked"))) {
            bingo = true;
        }
    }

    // Check columns
    for (let i = 0; i < 5; i++) {
        let colMarked = true;
        for (let j = 0; j < 5; j++) {
            if (!rows[j].cells[i].classList.contains("marked")) {
                colMarked = false;
                break;
            }
        }
        if (colMarked) bingo = true;
    }

    // Check diagonals
    const diag1 = [...Array(5).keys()].every(i => rows[i].cells[i].classList.contains("marked"));
    const diag2 = [...Array(5).keys()].every(i => rows[i].cells[4 - i].classList.contains("marked"));

    if (diag1 || diag2) bingo = true;

    if (bingo) {
        alert("🎉 BINGO! You win!");
    }
}

// Initialize game
buildBoard();
