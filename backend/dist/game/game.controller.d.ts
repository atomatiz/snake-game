import { StartDto, MoveDto } from './dtos';
import { GameService } from './game.service';
import { GameResponse } from './types';
export declare class GameController {
    private readonly gameService;
    constructor(gameService: GameService);
    startGame(body: StartDto): GameResponse;
    move(body: MoveDto): GameResponse;
}
