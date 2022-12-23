import { ApiProperty } from '@nestjs/swagger';

class Probe {
  @ApiProperty()
    id: string;

  @ApiProperty()
    label: string;

  @ApiProperty()
    isVital: boolean;

  @ApiProperty({ enum: ['OK', 'CRITICAL'] })
    status: string;
}

export class HealthSwaggerModel {
  @ApiProperty({ required: false })
    name?: string;

  @ApiProperty({ required: false })
    version?: string;

  @ApiProperty({ required: false })
    description?: string;

  @ApiProperty()
    date: Date;

  @ApiProperty({ enum: ['OK', 'CRITICAL'] })
    globalStatus: string;

  @ApiProperty({ isArray: true, type: Probe })
    probes: Array<Probe>;
}
