"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameService = void 0;
const common_1 = require("@nestjs/common");
const constants_1 = require("./constants");
let GameService = class GameService {
    width = 0;
    height = 0;
    snake = [];
    bait = { x: 0, y: 0 };
    direction = 'right';
    gameOver = true;
    start(width, height) {
        if (width < constants_1.MIN_DIMENSION || height < constants_1.MIN_DIMENSION) {
            throw new Error('Width and Height must be at least 5');
        }
        this.width = width;
        this.height = height;
        this.snake = [
            { x: 2, y: 0 },
            { x: 1, y: 0 },
            { x: 0, y: 0 },
        ];
        this.direction = 'right';
        this.gameOver = false;
        this.bait = this.generateBait();
        return {
            snake: this.snake,
            bait: this.bait,
            gameOver: false,
        };
    }
    generateBait() {
        let newBait;
        do {
            newBait = {
                x: Math.floor(Math.random() * this.width),
                y: Math.floor(Math.random() * this.height),
            };
        } while (this.snake.some((segment) => segment.x === newBait.x && segment.y === newBait.y));
        return newBait;
    }
    move(direction) {
        if (this.gameOver) {
            return {
                snake: this.snake,
                bait: this.bait,
                gameOver: true,
                board: this.snake.length === this.width * this.height
                    ? 'You win'
                    : 'You lose',
            };
        }
        if (direction)
            this.setDirection(direction);
        const head = { x: this.snake[0].x, y: this.snake[0].y };
        switch (this.direction) {
            case 'up':
                head.y--;
                break;
            case 'down':
                head.y++;
                break;
            case 'left':
                head.x--;
                break;
            case 'right':
                head.x++;
                break;
        }
        if (head.x < 0 ||
            head.x > this.width - 1 ||
            head.y < 0 ||
            head.y > this.height - 1) {
            this.gameOver = true;
            return {
                snake: this.snake,
                bait: this.bait,
                gameOver: true,
                board: 'You lose',
            };
        }
        if (this.snake.some((segment) => segment.x === head.x && segment.y === head.y)) {
            this.gameOver = true;
            return {
                snake: this.snake,
                bait: this.bait,
                gameOver: true,
                board: 'You lose',
            };
        }
        this.snake.unshift(head);
        const ateBait = head.x === this.bait.x && head.y === this.bait.y;
        if (ateBait) {
            this.bait = this.generateBait();
        }
        else {
            this.snake.pop();
        }
        if (this.snake.length === this.width * this.height) {
            this.gameOver = true;
            return {
                snake: this.snake,
                bait: this.bait,
                gameOver: true,
                board: 'You win',
            };
        }
        return { snake: this.snake, bait: this.bait, gameOver: false };
    }
    setDirection(direction) {
        const opposites = {
            up: 'down',
            down: 'up',
            left: 'right',
            right: 'left',
        };
        if (direction !== opposites[this.direction]) {
            this.direction = direction;
        }
    }
};
exports.GameService = GameService;
exports.GameService = GameService = __decorate([
    (0, common_1.Injectable)()
], GameService);
//# sourceMappingURL=game.service.js.map