import { ApiProperty } from '@nestjs/swagger';
import { IsInt, Min, Max } from 'class-validator';

export class StartDto {
    @ApiProperty({
        description: 'Dimension width of game board',
    })
    @IsInt({ message: 'Width must be an integer' })
    @Min(5, { message: 'Width must be at least 5' })
    @Max(25, { message: 'Width must not exceed 25' })
    width!: number;

    @ApiProperty({
        description: 'Dimension height of game board',
    })
    @IsInt({ message: 'Height must be an integer' })
    @Min(5, { message: 'Height must be at least 5' })
    @Max(25, { message: 'Height must not exceed 25' })
    height!: number;
}
