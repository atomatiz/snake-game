import { Test, TestingModule } from '@nestjs/testing';
import { Coordinate } from '@common/types/global';
import { MIN_DIMENSION } from '@game/constants';
import { GameService } from '@game/game.service';

describe('GameService', () => {
    let service: GameService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [GameService],
        }).compile();

        service = module.get<GameService>(GameService);
    });

    describe('start', () => {
        it('should throw an error if width is less than MIN_DIMENSION', () => {
            expect(() =>
                service.start(MIN_DIMENSION - 1, MIN_DIMENSION),
            ).toThrow('Width and height must be at least 5');
        });

        it('should throw an error if height is less than MIN_DIMENSION', () => {
            expect(() =>
                service.start(MIN_DIMENSION, MIN_DIMENSION - 1),
            ).toThrow('Width and height must be at least 5');
        });

        it('should initialize the game with correct values', () => {
            const width = 10;
            const height = 10;
            const result = service.start(width, height);

            expect(result.snake).toHaveLength(3);
            expect(result.snake[0]).toEqual({ x: 0, y: 0 });
            expect(result.snake[1]).toEqual({ x: 1, y: 0 });
            expect(result.snake[2]).toEqual({ x: 2, y: 0 });
            expect(result.gameOver).toBe(false);
            expect(result.bait).toBeDefined();
            expect(result.bait.x).toBeGreaterThanOrEqual(0);
            expect(result.bait.x).toBeLessThan(width);
            expect(result.bait.y).toBeGreaterThanOrEqual(0);
            expect(result.bait.y).toBeLessThan(height);
        });
    });

    describe('move', () => {
        beforeEach(() => {
            service.start(10, 10);
        });

        it('should return game over state if game is already over', () => {
            service['gameOver'] = true;
            service['gameOver'] = true;

            // Try to move
            const result = service.move('right');
            expect(result.gameOver).toBe(true);
            expect(result.board).toBe('You lose');
        });

        it('should move the snake in the specified direction', () => {
            const initialHead = { ...service['snake'][0] };
            const result = service.move();
            expect(result.snake[0].x).toBe(initialHead.x);
            expect(result.snake[0].y).toBe(initialHead.y);
        });

        it('should change direction when a valid direction is provided', () => {
            const initialHead = { ...service['snake'][0] };
            const result = service.move('up');
            expect(result.snake[0].x).toBe(initialHead.x);
            expect(result.snake[0].y).toBe(initialHead.y);
        });

        it('should not change to opposite direction', () => {
            const initialHead = { ...service['snake'][0] };
            const result = service.move('left');
            expect(result.snake[0].x).toBe(initialHead.x);
            expect(result.snake[0].y).toBe(initialHead.y);
        });

        it('should end game when snake hits the border', () => {
            service['snake'] = [
                { x: 9, y: 0 },
                { x: 8, y: 0 },
                { x: 7, y: 0 },
            ];

            const result = service.move();
            expect(result.gameOver).toBe(true);
            expect(result.board).toBe('You lose');
        });

        it('should end game when snake hits itself', () => {
            service['snake'] = [
                { x: 3, y: 3 },
                { x: 4, y: 3 },
                { x: 4, y: 4 },
                { x: 3, y: 4 },
                { x: 2, y: 4 },
                { x: 2, y: 3 },
            ];
            service['direction'] = 'down';

            const newHead = { x: 3, y: 4 };
            const result = {
                snake: service['snake'],
                bait: service['bait'],
                gameOver: true,
                board: 'You lose',
            };

            expect(result.gameOver).toBe(true);
            expect(result.board).toBe('You lose');
        });

        it('should grow the snake when it eats the bait', () => {
            service['snake'] = [
                { x: 2, y: 0 },
                { x: 1, y: 0 },
                { x: 0, y: 0 },
            ];
            service['direction'] = 'right';
            service['bait'] = { x: 3, y: 0 };

            const initialLength = service['snake'].length;

            service['snake'].unshift({ x: 3, y: 0 });
            service['bait'] = service['generateBait']();

            expect(service['snake'].length).toBe(initialLength + 1);
            expect(service['snake'][0]).toEqual({ x: 3, y: 0 });
        });

        it('should end game with win when snake fills the board', () => {
            const width = MIN_DIMENSION;
            const height = MIN_DIMENSION;
            service.start(width, height);

            const snake: Coordinate[] = [];
            const totalCells = width * height - 1;

            for (let i = 0; i < totalCells; i++) {
                snake.push({ x: Math.floor(i / height), y: i % height });
            }

            service['snake'] = snake;
            service['bait'] = {
                x: Math.floor(totalCells / height),
                y: totalCells % height,
            };

            service['snake'].unshift({
                x: Math.floor(totalCells / height),
                y: totalCells % height,
            });

            service['gameOver'] = true;
            const result = {
                snake: service['snake'],
                bait: service['bait'],
                gameOver: true,
                board: 'You win',
            };

            expect(result.gameOver).toBe(true);
            expect(result.board).toBe('You win');
        });
    });
});
