// src/dto/create-playlist.dto.ts
import {
  IsNotEmpty,
  IsString,
  IsOptional,
  IsBoolean,
  IsArray,
  IsNumber,
} from 'class-validator';

export class CreatePlaylistDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  coverImage?: string;

  @IsOptional()
  @IsBoolean()
  isPublic?: boolean;

  @IsNumber()
  @IsNotEmpty()
  userId: number;

  @IsOptional()
  @IsArray()
  @IsNumber({}, { each: true })
  songIds?: number[];
}
