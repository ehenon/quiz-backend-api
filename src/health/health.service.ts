import { Injectable } from '@nestjs/common';
import { Connection } from 'mongoose';
import { InjectConnection } from '@nestjs/mongoose';

@Injectable()
export class HealthService {
  constructor(@InjectConnection() private connection: Connection) {}

  /**
   * Return the state of the service.
   * @returns Healthcheck plain JS object.
   */
  check() {
    const OK = 'OK';
    const CRITICAL = 'CRITICAL';
    const healthCheck = {
      name: process.env.npm_package_name || null,
      version: process.env.npm_package_version || null,
      description: process.env.npm_package_description || null,
      date: new Date().toISOString(),
      globalStatus: OK,
      probes: [
        {
          id: 'MongoDB probe',
          label: 'Check MongoDB connection',
          isVital: true,
          status: OK,
        },
      ],
    };
    if (this.connection.readyState !== 1) {
      healthCheck.probes[0].status = CRITICAL;
      healthCheck.globalStatus = CRITICAL;
    }
    return healthCheck;
  }
}
