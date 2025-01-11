const {Engine, World, Bodies, Render, Runner} = Matter;

const cells = 3;
const width = 600;
const height = 600;

const engine = Engine.create();
const {world} = engine;
const render = Render.create({
  element: document.body,
  engine,
  options: {
    wireframes: false,
    width,
    height,
  },
});

Render.run(render);
Runner.run(Runner.create(), engine);

// Walls
const walls = [
  Bodies.rectangle(width / 2, 0, width, 40, {isStatic: true}),
  Bodies.rectangle(width / 2, height, width, 40, {isStatic: true}),
  Bodies.rectangle(0, height / 2, 40, height, {isStatic: true}),
  Bodies.rectangle(width, height / 2, 40, height, {isStatic: true}),
];

World.add(world, walls);

const shuffle = (arr) => {
  let counter = arr.length;
  while (counter > 0) {
    const index = Math.floor(Math.random() * counter);
    counter--;
    const temp = arr[counter];
    arr[counter] = arr[index];
    arr[index] = temp;
  }
  return arr;
};

// Maze generation
const grid = new Array(cells)
  .fill(null)
  .map(() => new Array(cells).fill(false));

const verticals = new Array(cells)
  .fill(null)
  .map(() => new Array(cells - 1).fill(false));
const horizontals = new Array(cells - 1)
  .fill(null)
  .map(() => new Array(cells).fill(false));

const startRow = Math.floor(Math.random() * cells);
const startColumn = Math.floor(Math.random() * cells);

const stepThroughCell = (row, column) => {
  // If we have visited the cell at [row, column], then return
  if (grid[row][column]) {
    return;
  }
  // Mark this cell as visited
  grid[row][column] = true;
  // Assemble randomly-ordered list of neighbors
  const neighbors = shuffle([
    [row - 1, column],
    [row, column + 1],
    [row + 1, column],
    [row, column - 1],
  ]);
  console.log(neighbors);
  // See if neighbor is out of bounds

  // If we have visited the neighbor, continue to next neighbor

  // Remmove a wall from row or column

  // Visit that next cell
};

stepThroughCell(1, 1);
// console.log(grid);
