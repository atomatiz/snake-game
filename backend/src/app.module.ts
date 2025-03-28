import { Module } from '@nestjs/common';
import { HealthController } from './health.controller';
import { GameModule } from '@game/game.module';
import { ConfigModule } from '@nestjs/config';
import { TerminusModule } from '@nestjs/terminus';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        TerminusModule,
        GameModule,
    ],
    controllers: [HealthController],
    providers: [],
})
export class AppModule {}
