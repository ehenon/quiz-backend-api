import { ApiProperty } from '@nestjs/swagger';

export class Instrument {
  @ApiProperty()
    _id: string;

  @ApiProperty()
    createdAt: Date;

  @ApiProperty()
    updatedAt: Date;

  @ApiProperty()
    identifier: string;

  @ApiProperty()
    name: string;

  @ApiProperty()
    classification: string;

  @ApiProperty({ required: false })
    origin?: string;

  @ApiProperty({ required: false })
    creationDate?: Date;

  @ApiProperty({ required: false })
    description?: string;

  @ApiProperty()
    stillProduced: boolean;

  @ApiProperty({ isArray: true, type: String, required: false })
    comments?: Array<string>;
}
