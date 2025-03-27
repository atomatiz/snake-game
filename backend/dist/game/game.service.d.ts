import { DIRECTION, GameResponse } from './types';
export declare class GameService {
    private width;
    private height;
    private snake;
    private bait;
    private direction;
    private gameOver;
    start(width: number, height: number): GameResponse;
    private generateBait;
    move(direction?: DIRECTION): GameResponse;
    private setDirection;
}
