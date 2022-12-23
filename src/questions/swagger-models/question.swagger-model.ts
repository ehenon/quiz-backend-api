import { ApiProperty } from '@nestjs/swagger';

export class Question {
  @ApiProperty()
    _id: string;

  @ApiProperty()
    createdAt: Date;

  @ApiProperty()
    updatedAt: Date;

  @ApiProperty()
    identifier: string;

  @ApiProperty()
    date: Date;

  @ApiProperty()
    theme: string;

  @ApiProperty()
    clue: string;

  @ApiProperty()
    label: string;

  @ApiProperty({ isArray: true, type: String, required: true })
    answers: Array<string>;
}
