import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSongDTo } from './dto/create-song-dto';
import { UpdateteSongDTO } from './dto/update-song-dto';

export interface Song {
  id: number;
  title: string;
  artist: string[];
  duration?: Date;
  genre?: string;
  releaseDate?: Date;
}

@Injectable()
export class SongsService {
  private readonly songs: Song[] = [];
  private idCounter = 1;

  create(createSongDto: CreateSongDTo): Song {
    const newSong: Song = {
      id: this.idCounter++,
      ...createSongDto,
    };
    this.songs.push(newSong);
    return newSong;
  }

  findAll(): Song[] {
    return this.songs;
  }

  findOne(id: number): Song {
    const song = this.songs.find((song) => song.id === id);
    if (!song) {
      throw new NotFoundException(`Song with ID ${id} not found`);
    }
    return song;
  }

  update(id: number, updateSongDto: UpdateteSongDTO): Song {
    const songIndex = this.songs.findIndex((song) => song.id === id);
    if (songIndex === -1) {
      throw new NotFoundException(`Song with ID ${id} not found`);
    }

    this.songs[songIndex] = {
      ...this.songs[songIndex],
      ...updateSongDto,
    };

    return this.songs[songIndex];
  }

  remove(id: number): { message: string } {
    const songIndex = this.songs.findIndex((song) => song.id === id);
    if (songIndex === -1) {
      throw new NotFoundException(`Song with ID ${id} not found`);
    }

    this.songs.splice(songIndex, 1);
    return { message: `Song with ID ${id} has been deleted` };
  }
}
