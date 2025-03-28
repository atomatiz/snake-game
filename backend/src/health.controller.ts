import { errorMessage } from '@common/utils/error-message.util';
import { Controller, Get, Logger } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import {
    HealthCheckService,
    HealthCheck,
    HealthCheckResult,
} from '@nestjs/terminus';

@ApiTags('Health')
@Controller('health')
export class HealthController {
    private readonly logger = new Logger(HealthController.name);
    constructor(private readonly health: HealthCheckService) {}

    @Get()
    @HealthCheck()
    async check(): Promise<HealthCheckResult> {
        try {
            return await this.health.check([
                () =>
                    Promise.resolve({
                        application: { status: 'up' },
                    }),
            ]);
        } catch (error: unknown) {
            this.logger.error(errorMessage('Health check failed', error));
            throw error;
        }
    }
}
