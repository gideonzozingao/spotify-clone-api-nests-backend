// src/dto/create-song.dto.ts
import {
  IsNotEmpty,
  IsString,
  IsOptional,
  IsMilitaryTime,
  IsBoolean,
  IsNumber,
} from 'class-validator';

export class CreateSongDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsMilitaryTime()
  @IsNotEmpty()
  duration: string;

  @IsOptional()
  @IsString()
  audioUrl?: string;

  @IsOptional()
  @IsString()
  coverImage?: string;

  @IsOptional()
  @IsString()
  lyrics?: string;

  @IsOptional()
  @IsBoolean()
  isPublic?: boolean;

  @IsNumber()
  @IsNotEmpty()
  artistId: number;

  @IsOptional()
  @IsNumber()
  albumId?: number;
}
