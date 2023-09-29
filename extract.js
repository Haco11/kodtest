import fs from "fs";

export function formatMatrixData(filename) {
  const content = fs.readFileSync(filename, "utf8");
  const lines = content.trim().split("\r\n");
  const matrix = [];
  let board = [];

  for (let i = 0; i < lines.length; i++) {
    if (!lines[i].length || lines[i] == "\r\n" || lines[i] == "") {
      matrix.push(board);
      board = [];
    } else {
      const numbers = lines[i].match(/(\d+)/g).map(Number);
      board.push(numbers);
    }
  }

  board.length && matrix.push(board);

  return matrix;
}
