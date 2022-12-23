import {
  IsOptional,
  IsISO8601,
  IsString,
  IsArray,
} from 'class-validator';

export class UpdateQuestionDTO {
  @IsISO8601()
  @IsOptional()
    date: string;

  @IsString()
  @IsOptional()
    theme: string;

  @IsString()
  @IsOptional()
    clue: string;

  @IsString()
  @IsOptional()
    label: string;

  @IsArray()
  @IsOptional()
  @IsString({ each: true })
    answers: Array<string>;
}
