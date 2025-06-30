// src/dto/create-album.dto.ts
import {
  IsNotEmpty,
  IsString,
  IsOptional,
  IsDateString,
  IsEnum,
  IsNumber,
} from 'class-validator';
import { AlbumType } from '../entities/album.entity';

export class CreateAlbumDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsOptional()
  @IsString()
  coverImage?: string;

  @IsDateString()
  @IsNotEmpty()
  releaseDate: Date;

  @IsOptional()
  @IsEnum(AlbumType)
  type?: AlbumType;

  @IsOptional()
  @IsString()
  description?: string;

  @IsNumber()
  @IsNotEmpty()
  artistId: number;
}
