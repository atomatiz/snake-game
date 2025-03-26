import {
    Controller,
    Post,
    Body,
    HttpException,
    HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { StartDto, MoveDto } from './dtos';
import { GameService } from './game.service';
import { GameResponse } from './types';

@ApiTags('Game')
@Controller('game')
export class GameController {
    constructor(private readonly gameService: GameService) {}

    @Post('start')
    @ApiOperation({ summary: 'Start a new game with specified dimensions' })
    @ApiResponse({ status: 200, description: 'Game started successfully' })
    @ApiResponse({ status: 400, description: 'Invalid dimensions' })
    startGame(@Body() body: StartDto): GameResponse {
        try {
            return this.gameService.start(body.width, body.height);
        } catch (error: unknown) {
            throw new HttpException(
                error instanceof Error ? error.message : '',
                HttpStatus.BAD_REQUEST,
            );
        }
    }

    @Post('move')
    @ApiOperation({ summary: 'Move the snake in the specified direction' })
    @ApiResponse({ status: 200, description: 'Move executed successfully' })
    move(@Body() body: MoveDto): GameResponse {
        return this.gameService.move(body.direction);
    }
}
