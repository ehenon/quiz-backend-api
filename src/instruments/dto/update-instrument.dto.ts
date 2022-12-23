import {
  IsOptional,
  IsBoolean,
  IsISO8601,
  IsString,
  IsArray,
} from 'class-validator';

export class UpdateInstrumentDTO {
  @IsString()
  @IsOptional()
    name?: string;

  @IsString()
  @IsOptional()
    classification?: string;

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
  @IsOptional()
    stillProduced?: boolean;

  @IsArray()
  @IsOptional()
  @IsString({ each: true })
    comments?: Array<string>;
}
