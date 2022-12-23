import { Controller, Get } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { HealthService } from './health.service';
import { HealthSwaggerModel } from './swagger-models/health.swagger-model';

@ApiTags('Healthcheck')
@Controller('health')
export class HealthController {
  constructor(private readonly healthService : HealthService) {}

  @Get()
  @ApiResponse({ status: 200, description: 'Healthcheck status returned', type: HealthSwaggerModel })
  check() {
    return this.healthService.check();
  }
}
