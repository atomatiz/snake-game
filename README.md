# Snake Game

A modern implementation of the classic Snake game with a full-stack architecture.

- Play game at: https://atomatiz-snake-game.vercel.app

## Overview

Snake Game is a web-based implementation of the classic Snake game where players control a snake to eat bait and grow longer without colliding with walls or itself. This project features a responsive frontend built with Next.js and a robust backend API powered by NestJS.

## Features

- Interactive Snake game with customizable board dimensions
- Real-time game state management
- Responsive design for various screen sizes
- RESTful API for game state management
- API documentation with Swagger

## Tech Stack

### Frontend

- [Next.js](https://nextjs.org/) - React framework for building the UI
- [TypeScript](https://www.typescriptlang.org/) - Typed JavaScript
- [Redux](https://redux.js.org/) & [Redux Toolkit](https://redux-toolkit.js.org/) - State management
- [React Query](https://tanstack.com/query) - Data fetching
- [Material UI](https://mui.com/) - React component library implementing Material Design
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework

### Backend

- [NestJS](https://nestjs.com/) - Progressive Node.js framework
- [TypeScript](https://www.typescriptlang.org/) - Typed JavaScript
- [Swagger](https://swagger.io/) - API documentation

## Getting Started

### Prerequisites

- Node.js (v22 or higher)
- NPM (v11 or higher)
- npm or yarn

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/atomatiz/snake-game.git
   cd snake-game
   ```

2. Install backend dependencies:

   ```bash
   cd backend
   npm install or yarn
   ```

3. Install frontend dependencies:
   ```bash
   cd ../frontend
   npm install or yarn
   ```

### Running the Application

1. Start the backend server:

   ```bash
   cd backend
   npm run start:dev or yarn start:dev
   ```

   - The API will be available at http://localhost:3001/v1/api with API documentation at http://localhost:3001/api-docs
   - The port is configurable in `src/main.ts`

2. Start the frontend development server:
   ```bash
   cd frontend
   npm run dev or yarn dev
   ```
   - Open http://localhost:3000 in your browser to play the game
   - The port is configurable in `src/package.json` -> scripts or `.env*`

## Game Instructions

1. Set the board dimensions (width and height) and select movement difficulty level to start a new game
2. Click the Start Game button to start the game
3. Get started to make the snake's first move by hitting the direction button such as right, down
4. Control the snake using arrow keys such as up, down, left, and right
5. Eat bait to grow the snake and increase its length
6. Avoid collisions with walls and the snake's body
7. Completely fill the matrix with the snake's body to win
8. Click the Replay button to start a new game with the same dimensions and difficulty level of movement
9. Click the New Game button to change board dimensions and difficulty level of movement
10. Click the Exit Game button to exit the game and return to the main page

## API Endpoints

- `GET /health` - Health check
- `POST /v1/api/game/start` - Start a new game with specified dimensions
- `POST /v1/api/game/move` - Move the snake in a specified direction

For detailed API documentation, visit http://localhost:3001/api-docs when the backend server is running.

## Development

### Backend

```bash
# Run in development mode with hot-reload
npm run start:dev or yarn start:dev

# Run tests
npm run test or yarn test
npm run test:e2e or yarn test:e2e

# Build for production
npm run build or yarn build

# Start production build
npm run start or yarn start
```

### Frontend

```bash
# Run in development mode
npm run dev or yarn dev

# Run tests
npm run test or yarn test
npm run test:e2e or yarn test:e2e

# Build for production
npm run build or yarn build

# Start production build
npm run start or yarn start
```

## License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.

## Acknowledgements

- Inspired by the classic Snake game
- Built with modern web technologies
- Created by Atomatiz
