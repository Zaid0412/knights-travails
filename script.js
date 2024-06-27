class Graph {
  constructor() {
    this.chessBoard = new Map();
  }

  addVertices = (size = 8) => {
    for (let i = 0; i < size; i += 1) {
      for (let j = 0; j < size; j += 1) {
        this.chessBoard.set(`${[i, j]}`, []);
      }
    }
  };

  addEdges = (board = this.chessBoard) => {
    for (const [pos] of board) {
      const posArr = pos.split(",");
      const x = Number(posArr[0]);
      const y = Number(posArr[1]);

      const direction = {
        1: [x + 1, y + 2],
        2: [x + 2, y + 1],
        4: [x + 2, y - 1],
        5: [x + 1, y - 2],
        7: [x - 1, y - 2],
        8: [x - 2, y - 1],
        10: [x - 2, y + 1],
        11: [x - 1, y + 2],
      };

      for (const clock in direction) {
        const move = direction[clock].toString();

        if (board.has(move) && !board.get(pos).includes(move)) {
          this.chessBoard.get(pos).push(move);
        }
      }
    }
  };

  knightMoves(start, end) {
    const paths = [];
    const visited = new Set();
    const q = [];

    q.push([start, [start]]);

    while (q.length > 0) {
      let [current, path] = q.shift();
      visited.add(current);
      if (current == end) {
        paths.push(path);
      }
      const nbs = this.chessBoard.get(current);
      for (const pos of nbs) {
        if (!visited.has(pos)) {
          q.push([pos, [...path, pos]]);
        }
      }
    }

    console.log(`${start}, ${end}`);
    paths.forEach((element) => console.log(element));
  }
}

const chessBoardGraph = new Graph();
chessBoardGraph.addVertices();
chessBoardGraph.addEdges();

chessBoardGraph.knightMoves("3,3", "4,3");
