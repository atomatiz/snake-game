import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from 'app.module';

describe('AppController (e2e)', () => {
    let app: INestApplication;

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    it('/game/start (POST)', () => {
        return request(app.getHttpServer())
            .post('/game/start')
            .send({ width: 5, height: 5 })
            .expect(201)
            .expect((res) => {
                expect(res.body.snake).toBeDefined();
                expect(res.body.bait).toBeDefined();
                expect(res.body.gameOver).toBe(false);
            });
    });

    it('/game/move (POST)', async () => {
        // First start a game
        const startResponse = await request(app.getHttpServer())
            .post('/game/start')
            .send({ width: 5, height: 5 })
            .expect(201);

        // Then move the snake
        return request(app.getHttpServer())
            .post('/game/move')
            .send({ direction: 'right' })
            .expect(201)
            .expect((res) => {
                expect(res.body.snake).toBeDefined();
                expect(res.body.bait).toBeDefined();
                expect(res.body.gameOver).toBeDefined();

                // Check that the snake has moved
                const head = res.body.snake[0];
                expect(head).toBeDefined();
            });
    });

    afterEach(async () => {
        await app.close();
    });
});
