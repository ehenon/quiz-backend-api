import {
  IsNotEmpty,
  IsOptional,
  IsBoolean,
  IsISO8601,
  IsString,
  IsArray,
} from 'class-validator';

export class CreateInstrumentDTO {
  @IsString()
  @IsNotEmpty()
    name: string;

  @IsString()
  @IsNotEmpty()
    classification: string;

  @IsString()
  @IsOptional()
    origin?: string;

  @IsISO8601()
  @IsOptional()
    creationDate?: string;

  @IsString()
  @IsOptional()
    description?: string;

  @IsBoolean()
  @IsNotEmpty()
    stillProduced: boolean;

  @IsArray()
  @IsOptional()
  @IsString({ each: true })
    comments?: Array<string>;
}
