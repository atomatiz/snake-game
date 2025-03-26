import { Coordinate } from '@common/types/global';
import { Injectable } from '@nestjs/common';
import { MIN_DIMENSION } from './constants';
import { DIRECTION, GameResponse } from './types';

@Injectable()
export class GameService {
    private width: number = 0;
    private height: number = 0;
    private snake: Coordinate[] = [];
    private bait: Coordinate = { x: 0, y: 0 };
    private direction: DIRECTION = 'right';
    private gameOver: boolean = true;

    start(width: number, height: number): GameResponse {
        if (width < MIN_DIMENSION || height < MIN_DIMENSION) {
            throw new Error('Width and height must be at least 5');
        }
        this.width = width;
        this.height = height;
        this.snake = [
            { x: 0, y: 0 },
            { x: 1, y: 0 },
            { x: 2, y: 0 },
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

    private generateBait(): Coordinate {
        let newBait: Coordinate;
        do {
            newBait = {
                x: Math.floor(Math.random() * this.width),
                y: Math.floor(Math.random() * this.height),
            };
        } while (
            this.snake.some(
                (segment) => segment.x === newBait.x && segment.y === newBait.y,
            )
        );
        return newBait;
    }

    move(direction?: DIRECTION): GameResponse {
        if (this.gameOver) {
            return {
                snake: this.snake,
                bait: this.bait,
                gameOver: true,
                board:
                    this.snake.length === this.width * this.height
                        ? 'You win'
                        : 'You lose',
            };
        }

        if (direction) this.setDirection(direction);
        const head = { ...this.snake[0] };
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

        if (
            head.x < 0 ||
            head.x >= this.width ||
            head.y < 0 ||
            head.y >= this.height
        ) {
            this.gameOver = true;
            return {
                snake: this.snake,
                bait: this.bait,
                gameOver: true,
                board: 'You lose',
            };
        }

        if (
            this.snake.some(
                (segment) => segment.x === head.x && segment.y === head.y,
            )
        ) {
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
        } else {
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

    private setDirection(direction: DIRECTION): void {
        const opposites: Record<DIRECTION, DIRECTION> = {
            up: 'down',
            down: 'up',
            left: 'right',
            right: 'left',
        };
        if (direction !== opposites[this.direction]) {
            this.direction = direction;
        }
    }
}
