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
    app.enableCors({
        origin: '*',
        methods: ['POST', 'OPTIONS', 'GET'],
        allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
        credentials: true,
    });
    const apiDocConfig = new swagger_1.DocumentBuilder()
        .setTitle('Snake Game API')
        .setDescription('API for the Snake Game')
        .setVersion('1.0')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, apiDocConfig);
    swagger_1.SwaggerModule.setup(`${global_1.API_PREFIX}/api-docs`, app, document);
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