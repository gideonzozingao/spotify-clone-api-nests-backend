// src/dto/create-artist.dto.ts
import {
  IsNotEmpty,
  IsString,
  IsOptional,
  IsArray,
  IsNumber,
} from 'class-validator';

export class CreateArtistDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsOptional()
  @IsString()
  biography?: string;

  @IsOptional()
  @IsString()
  avatar?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  genres?: string[];

  @IsOptional()
  @IsNumber()
  monthlyListeners?: number;
}
