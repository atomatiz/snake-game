import { API_PREFIX } from '@common/constants/global';
import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
    const logger: Logger = new Logger();
    const app = await NestFactory.create<NestExpressApplication>(AppModule, {
        logger: logger,
    });

    const configService = app.get(ConfigService);

    app.setGlobalPrefix(API_PREFIX);

    app.useGlobalPipes(
        new ValidationPipe({
            transform: true,
            whitelist: true,
            forbidNonWhitelisted: true,
        }),
    );

    app.use((req, res, next) => {
        res.header(
            'Access-Control-Allow-Origin',
            `${configService.get('SNAKE_GAME_URL')}`,
        );
        res.header('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
        res.header(
            'Access-Control-Allow-Headers',
            'Content-Type,Authorization,Accept',
        );
        if (req.method === 'OPTIONS') {
            return res.status(204).end();
        }
        next();
    });

    app.enableCors({
        origin: (origin, callback) => {
            if (origin === `${configService.get('SNAKE_GAME_URL')}`)
                callback(null, true);
        },
        methods: ['GET', 'POST', 'OPTIONS'],
        allowedHeaders: 'Content-Type,Authorization,Accept',
        exposedHeaders: 'Content-Type',
        credentials: true,
        preflightContinue: false,
        optionsSuccessStatus: 204,
    });

    const NODE_ENV = configService.get('NODE_ENV');
    const devEnvs = ['development', 'test', 'staging'];

    if (devEnvs.includes(NODE_ENV)) {
        const apiDocConfig = new DocumentBuilder()
            .setTitle('Snake Game API')
            .setDescription('API for the Snake Game')
            .setVersion('1.0')
            .addTag('Snack Game')
            .build();
        const document = SwaggerModule.createDocument(app, apiDocConfig);
        SwaggerModule.setup(`/api-docs`, app, document);
    }
    const port: number = configService.get('PORT') || 3001;
    await app.listen(port, async () => {
        logger.log(
            `Application is running -mode ${configService.get('NODE_ENV') || 'development'} -endpoint ${await app.getUrl()}`,
        );
    });
}
bootstrap().catch((err) => {
    console.error('Failed to start application:', err);
    process.exit(1);
});
