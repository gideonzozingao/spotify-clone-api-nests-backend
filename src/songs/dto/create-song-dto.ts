import {
  IsArray,
  IsDateString,
  IsInt,
  IsMilitaryTime,
  IsNotEmpty,
  IsString,
} from 'class-validator';

export class CreateSongDTo {
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
