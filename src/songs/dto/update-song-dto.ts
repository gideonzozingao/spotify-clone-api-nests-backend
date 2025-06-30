import {
  IsArray,
  IsDateString,
  IsMilitaryTime,
  IsNotEmpty,
  IsString,
  IsInt,
} from 'class-validator';

export class UpdateteSongDTO {
  @IsInt()
  @IsNotEmpty()
  readonly id: number;

  @IsInt()
  @IsNotEmpty()
  readonly artistId: number;
  @IsString()
  @IsNotEmpty()
  readonly title: string;

  @IsArray()
  @IsString({ each: true })
  @IsNotEmpty()
  readonly artist: string[];

  @IsDateString()
  @IsNotEmpty()
  readonly releaseDate: Date;

  @IsMilitaryTime()
  @IsNotEmpty()
  readonly duration: Date;

  @IsString()
  @IsNotEmpty()
  readonly genre: string;
}
