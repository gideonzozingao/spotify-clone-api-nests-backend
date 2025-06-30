import {
  IsDateString,
  IsMilitaryTime,
  IsNotEmpty,
  IsString,
} from 'class-validator';

export class UpdateteSongDTO {
  @IsString()
  @IsNotEmpty()
  readonly title: string;

  @IsString()
  // @IsArray()
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
