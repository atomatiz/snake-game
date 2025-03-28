"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const global_1 = require("./common/constants/global");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const core_1 = require("@nestjs/core");
const swagger_1 = require("@nestjs/swagger");
const app_module_1 = require("./app.module");
async function bootstrap() {
    const logger = new common_1.Logger();
    const app = await core_1.NestFactory.create(app_module_1.AppModule, {
        logger: logger,
    });
    const configService = app.get(config_1.ConfigService);
    app.setGlobalPrefix(global_1.API_PREFIX);
    app.useGlobalPipes(new common_1.ValidationPipe({
        transform: true,
        whitelist: true,
        forbidNonWhitelisted: true,
    }));
    app.use((req, res, next) => {
        res.header('Access-Control-Allow-Origin', configService.get('SNAKE_GAME_URL') ?? '*');
        res.header('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
        res.header('Access-Control-Allow-Headers', 'Content-Type,Authorization,Accept');
        if (req.method === 'OPTIONS') {
            return res.status(204).end();
        }
        next();
    });
    app.enableCors({
        origin: (origin, callback) => {
            const og = configService.get('SNAKE_GAME_URL') ?? '*';
            if (origin === og)
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
        const apiDocConfig = new swagger_1.DocumentBuilder()
            .setTitle('Snake Game API')
            .setDescription('API for the Snake Game')
            .setVersion('1.0')
            .addTag('Snack Game')
            .build();
        const document = swagger_1.SwaggerModule.createDocument(app, apiDocConfig);
        swagger_1.SwaggerModule.setup(`/api-docs`, app, document);
    }
    const port = configService.get('PORT') || 3001;
    await app.listen(port, async () => {
        logger.log(`Application is running -mode ${configService.get('NODE_ENV') || 'development'} -endpoint ${await app.getUrl()}`);
    });
}
bootstrap().catch((err) => {
    console.error('Failed to start application:', err);
    process.exit(1);
});
//# sourceMappingURL=main.js.map