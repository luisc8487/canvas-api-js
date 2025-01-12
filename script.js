const {Engine, World, Bodies, Render, Runner, Body, Events} = Matter;

const cells = 3;
const width = window.innerWidth;
const height = window.innerHeight;
const unitLength = width / cells;

const engine = Engine.create();
engine.world.gravity.y = 0;

const {world} = engine;
const render = Render.create({
  element: document.body,
  engine,
  options: {
    wireframes: true,
    width,
    height,
  },
});

Render.run(render);
Runner.run(Runner.create(), engine);

// Walls
const walls = [
  Bodies.rectangle(width / 2, 0, width, 3, {isStatic: true}),
  Bodies.rectangle(width / 2, height, width, 3, {isStatic: true}),
  Bodies.rectangle(0, height / 2, 3, height, {isStatic: true}),
  Bodies.rectangle(width, height / 2, 3, height, {isStatic: true}),
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
    [row - 1, column, "up"],
    [row, column + 1, "right"],
    [row + 1, column, "down"],
    [row, column - 1, "left"],
  ]);
  // For each neighbor...
  for (let neighbor of neighbors) {
    const [nextRow, nextColumn, direction] = neighbor;

    // See if neighbor is out of bounds
    if (
      nextRow < 0 ||
      nextRow >= cells ||
      nextColumn < 0 ||
      nextColumn >= cells
    ) {
      continue;
    }

    // If we have visited the neighbor, continue to next neighbor
    if (grid[nextRow][nextColumn]) {
      continue;
    }

    // Remmove a wall from row or column
    if (direction === "left") {
      verticals[row][column - 1] = true;
    } else if (direction === "right") {
      verticals[row][column] = true;
    } else if (direction === "up") {
      horizontals[row - 1][column] = true;
    } else if (direction === "down") {
      horizontals[row][column] = true;
    }

    stepThroughCell(nextRow, nextColumn);
  }

  // Visit that next cell
};

stepThroughCell(startRow, startColumn);

horizontals.forEach((row, rowIndex) => {
  row.forEach((open, columnIndex) => {
    if (open) {
      return;
    }
    const wall = Bodies.rectangle(
      columnIndex * unitLength + unitLength / 2,
      rowIndex * unitLength + unitLength,
      unitLength,
      10,
      {label: "wall", isStatic: true, render: {fillStyle: "red"}}
    );
    World.add(world, wall);
  });
});

verticals.forEach((row, rowIndex) => {
  row.forEach((open, columnIndex) => {
    if (open) {
      return;
    }
    const wall = Bodies.rectangle(
      columnIndex * unitLength + unitLength,
      rowIndex * unitLength + unitLength / 2,
      10,
      unitLength,
      {label: "wall", isStatic: true, render: {fillStyle: "red"}}
    );
    World.add(world, wall);
  });
});

// Goal
const goal = Bodies.rectangle(
  width - unitLength / 2,
  height - unitLength / 2,
  unitLength * 0.7,
  unitLength * 0.7,
  {isStatic: true, label: "goal", render: {fillStyle: "green"}}
);
World.add(world, goal);

// Ball
const ball = Bodies.circle(unitLength / 2, unitLength / 2, unitLength / 4, {
  label: "ball",
  render: {fillStyle: "grey"},
});
World.add(world, ball);

document.addEventListener("keydown", (e) => {
  const {x, y} = ball.velocity;
  console.log(x, y);
  if (e.keyCode === 87) {
    Body.setVelocity(ball, {x, y: y - 5});
  }
  if (e.keyCode === 68) {
    Body.setVelocity(ball, {x: x + 5, y});
  }
  if (e.keyCode === 83) {
    Body.setVelocity(ball, {x, y: y + 5});
  }
  if (e.keyCode === 65) {
    Body.setVelocity(ball, {x: x - 5, y});
  }
});

// Win Condition
Events.on(engine, "collisionStart", (event) => {
  event.pairs.forEach((collision) => {
    const labels = ["ball", "goal"];

    if (
      labels.includes(collision.bodyA.label) &&
      labels.includes(collision.bodyB.label)
    ) {
      console.log(collision);
      world.gravity.y = 1;
      world.bodies.forEach((body) => {
        if (body.label === "wall") {
          Body.setStatic(body, false);
        }
      });
    }
  });
});
