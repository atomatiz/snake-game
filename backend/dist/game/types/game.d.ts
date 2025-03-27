import { Coordinate } from '@common/types/global';
import { DIRECTIONS } from '@game/constants';
export interface GameResponse {
    board?: string;
    snake: Coordinate[];
    bait: Coordinate;
    gameOver: boolean;
}
export type DIRECTION = (typeof DIRECTIONS)[number];
