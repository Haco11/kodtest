import { formatMatrixData } from "./extract.js";

// Define the number sequence as an array of integers
const numberSequence =
  "1,76,38,96,62,41,27,33,4,2,94,15,89,25,66,14,30,0,71,21,48,44,87,73,60,50,77,45,29,18,5,99,65,16,93,95,37,3,52,32,46,80,98,63,92,24,35,55,12,81,51,17,70,78,61,91,54,8,72,40,74,68,75,67,39,64,10,53,9,31,6,7,47,42,90,20,19,36,22,43,58,28,79,86,57,49,83,84,97,11,85,26,69,23,59,82,88,34,56,13"
    .split(",")
    .map((num) => parseInt(num));

// Load and format the matrix data from a file
const boards = formatMatrixData("./data.txt");

// Check if a player has won on a board
function checkWin(board) {
  for (let i = 0; i < 5; i++) {
    if (board[i].every((num) => typeof num === "string")) return true;
    if (board.map((row) => row[i]).every((num) => typeof num === "string"))
      return true;
  }
  return false;
}

const wonBoards = [];

// Calculate points for a player on a board
function calculatePoints(board, drawnNumber) {
  const unmarkedSumPoints = board
    .flatMap((row) => row)
    .filter((num) => typeof num === "number")
    .reduce((acc, curr) => acc + curr, 0);

  return unmarkedSumPoints * drawnNumber;
}

for (let i = 0; i < numberSequence.length; i++) {
  const drawnNumber = numberSequence[i];
  for (let j = 0; j < boards.length; j++) {
    for (let k = 0; k < boards[j].length; k++) {
      boards[j][k] = boards[j][k].map((num) =>
        num === drawnNumber ? "X" : num
      );
    }
    if (
      !wonBoards.some((boardData) => boardData.board === boards[j]) &&
      checkWin(boards[j])
    ) {
      wonBoards.push({
        boardNumber: j + 1,
        board: boards[j],
        points: calculatePoints(boards[j], drawnNumber),
      });
    }
  }

  if (wonBoards.length === boards.length) {
    const lastBoardWin = wonBoards[wonBoards.length - 1];
    console.log(
      `Board number ${lastBoardWin.boardNumber} wins last with ${lastBoardWin.points} points!`
    );
    break;
  }
}
