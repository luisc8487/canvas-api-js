# Maze Game Project [canvas-api-js]

## Project Overview

![maza-generator](https://github.com/user-attachments/assets/6ad7041c-2996-4e52-ad8e-4d48bf38efc1)
This project is a **Maze Game** created using **JavaScript, HTML, CSS,** and the **Matter.js** physics engine. The game automatically generates a new maze each time the browser is refreshed, providing a unique challenge with every playthrough. The objective of the game is to navigate a ball through the maze using the **WASD** keys and reach the green tile, which represents the goal.

### Key Features
1. **Auto-Generated Maze:**
    - A unique maze is generated every time the broswer is refreshed.
    - The maze is created using an alogrithm that ensures a solvable path from the starting point to the goal.
2. **User Controls:**
    - The player controls a ball trapped within the maze using the WASD keys.
    - Smooth movement and collison detection are handled using the **Matter.js** physics engine.
3. Wining Coniditon:
    - The goal is represented by a green tile.
    - When the ball reaches the green tile, the game registers a win and can prompt a congratulatory message or allow a new maze to be generated.
4. Customizable Maze Dimensions (Stretch Goal):
    - Users can alter width and height of the maze by adjusting the canvas dimensions.
    - This feature adds replayability and allows users to create larger or smaller mazes for varying difficulty.
## Technologies Used
- HTML: