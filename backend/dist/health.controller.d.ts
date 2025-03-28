import { HealthCheckService, HealthCheckResult } from '@nestjs/terminus';
export declare class HealthController {
    private readonly health;
    private readonly logger;
    constructor(health: HealthCheckService);
    check(): Promise<HealthCheckResult>;
}
