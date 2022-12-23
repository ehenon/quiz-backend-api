import {
  IsNotEmpty,
  IsISO8601,
  IsString,
  IsArray,
} from 'class-validator';

export class CreateQuestionDTO {
  @IsISO8601()
  @IsNotEmpty()
    date: string;

  @IsString()
  @IsNotEmpty()
    theme: string;

  @IsString()
  @IsNotEmpty()
    clue: string;

  @IsString()
  @IsNotEmpty()
    label: string;

  @IsArray()
  @IsNotEmpty()
  @IsString({ each: true })
    answers: Array<string>;
}
