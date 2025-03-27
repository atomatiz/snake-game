import { Test, TestingModule } from '@nestjs/testing';
import { GameService } from '@game/game.service';
import { Coordinate } from '@common/types/global';
import { MIN_DIMENSION } from '@game/constants';

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
            ).toThrow('Width and Height must be at least 5');
        });

        it('should throw an error if height is less than MIN_DIMENSION', () => {
            expect(() =>
                service.start(MIN_DIMENSION, MIN_DIMENSION - 1),
            ).toThrow('Width and Height must be at least 5');
        });

        it('should initialize the game with correct values', () => {
            const width = 10;
            const height = 10;
            const result = service.start(width, height);

            expect(result.snake).toHaveLength(3);
            expect(result.snake).toEqual([
                { x: 2, y: 0 },
                { x: 1, y: 0 },
                { x: 0, y: 0 },
            ]);
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
            const result = service.move();
            expect(result.gameOver).toBe(true);
            expect(result.board).toBe('You lose');
        });

        it('should move the snake right by default', () => {
            const result = service.move();
            expect(result.snake).toEqual([
                { x: 3, y: 0 },
                { x: 2, y: 0 },
                { x: 1, y: 0 },
            ]);
            expect(result.gameOver).toBe(false);
        });

        it('should change direction and move accordingly', () => {
            const result = service.move('down');
            expect(result.snake).toEqual([
                { x: 2, y: 1 },
                { x: 2, y: 0 },
                { x: 1, y: 0 },
            ]);
            expect(service['direction']).toBe('down');
            expect(result.gameOver).toBe(false);
        });

        it('should not allow opposite direction change', () => {
            const afterFirstMove = service.move();
            expect(afterFirstMove.snake).toEqual([
                { x: 3, y: 0 },
                { x: 2, y: 0 },
                { x: 1, y: 0 },
            ]);
            expect(service['direction']).toBe('right');

            const afterAttemptedLeft = service.move('left');
            expect(service['direction']).toBe('right');
            expect(afterAttemptedLeft.snake).toEqual([
                { x: 4, y: 0 },
                { x: 3, y: 0 },
                { x: 2, y: 0 },
            ]);

            const result = service.move();
            expect(result.snake).toEqual([
                { x: 5, y: 0 },
                { x: 4, y: 0 },
                { x: 3, y: 0 },
            ]);
        });

        it('should end game when snake hits the border', () => {
            service['snake'] = [
                { x: 9, y: 5 },
                { x: 8, y: 5 },
                { x: 7, y: 5 },
            ];
            service['direction'] = 'right';
            const result = service.move();
            expect(result.gameOver).toBe(true);
            expect(result.board).toBe('You lose');
            expect(result.snake).toEqual([
                { x: 9, y: 5 },
                { x: 8, y: 5 },
                { x: 7, y: 5 },
            ]);
        });

        it('should end game when snake hits itself', () => {
            service['snake'] = [
                { x: 7, y: 5 },
                { x: 7, y: 6 },
                { x: 8, y: 6 },
                { x: 8, y: 5 },
            ];
            service['direction'] = 'right';
            const result = service.move();
            expect(result.gameOver).toBe(true);
            expect(result.board).toBe('You lose');
            expect(result.snake).toEqual([
                { x: 7, y: 5 },
                { x: 7, y: 6 },
                { x: 8, y: 6 },
                { x: 8, y: 5 },
            ]);
        });

        it('should grow the snake and generate new bait when it eats the bait', () => {
            service['snake'] = [
                { x: 2, y: 0 },
                { x: 1, y: 0 },
                { x: 0, y: 0 },
            ];
            service['bait'] = { x: 3, y: 0 };
            service['direction'] = 'right';

            const result = service.move();
            expect(result.snake).toHaveLength(4);
            expect(result.snake).toEqual([
                { x: 3, y: 0 },
                { x: 2, y: 0 },
                { x: 1, y: 0 },
                { x: 0, y: 0 },
            ]);
            expect(result.bait).not.toEqual({ x: 3, y: 0 });
            expect(result.gameOver).toBe(false);
        });

        it('should end game with win when snake fills the board', () => {
            const width = 5;
            const height = 5;
            service.start(width, height);

            const snake: Coordinate[] = [];
            for (let y = 0; y < height; y++) {
                for (let x = 0; x < width; x++) {
                    if (snake.length < width * height - 1) {
                        snake.push({ x, y });
                    }
                }
            }
            service['snake'] = snake;
            service['bait'] = { x: 4, y: 4 };
            service['direction'] = 'right';
            service['snake'][0] = { x: 3, y: 4 };

            const result = service.move();
            expect(result.snake).toHaveLength(width * height);
            expect(result.gameOver).toBe(true);
            expect(result.board).toBe('You win');
        });
    });
});
