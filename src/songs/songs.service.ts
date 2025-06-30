// src/services/song.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Song } from '../entities/song.entity';
import { CreateSongDto } from '../dto/create-song.dto';
import { Artist } from '../entities/artist.entity';
import { Album } from '../entities/album.entity';

@Injectable()
export class SongsService {
  constructor(
    @InjectRepository(Song)
    private songRepository: Repository<Song>,
    @InjectRepository(Artist)
    private artistRepository: Repository<Artist>,
    @InjectRepository(Album)
    private albumRepository: Repository<Album>,
  ) {}

  async create(createSongDto: CreateSongDto): Promise<Song> {
    const artist = await this.artistRepository.findOne({
      where: { id: createSongDto.artistId },
    });

    if (!artist) {
      throw new NotFoundException('Artist not found');
    }

    let album = null;
    if (createSongDto.albumId) {
      album = await this.albumRepository.findOne({
        where: { id: createSongDto.albumId },
      });

      if (!album) {
        throw new NotFoundException('Album not found');
      }
    }

    const song = this.songRepository.create({
      ...createSongDto,
      artist,
      album,
    });

    return this.songRepository.save(song);
  }

  async findAll(): Promise<Song[]> {
    return this.songRepository.find({
      where: { isPublic: true },
      relations: ['artist', 'album'],
    });
  }

  async findOne(id: number): Promise<Song> {
    const song = await this.songRepository.findOne({
      where: { id },
      relations: ['artist', 'album', 'likedBy'],
    });

    if (!song) {
      throw new NotFoundException('Song not found');
    }

    return song;
  }

  async findByArtist(artistId: number): Promise<Song[]> {
    return this.songRepository.find({
      where: { artist: { id: artistId }, isPublic: true },
      relations: ['artist', 'album'],
    });
  }

  async findByAlbum(albumId: number): Promise<Song[]> {
    return this.songRepository.find({
      where: { album: { id: albumId } },
      relations: ['artist', 'album'],
      order: { id: 'ASC' },
    });
  }

  async update(id: number, updateData: Partial<Song>): Promise<Song> {
    await this.songRepository.update(id, updateData);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    const song = await this.findOne(id);
    await this.songRepository.remove(song);
  }

  async incrementPlayCount(id: number): Promise<Song> {
    await this.songRepository.increment({ id }, 'playCount', 1);
    return this.findOne(id);
  }

  async getPopularSongs(limit: number = 50): Promise<Song[]> {
    return this.songRepository.find({
      where: { isPublic: true },
      order: { playCount: 'DESC' },
      take: limit,
      relations: ['artist', 'album'],
    });
  }

  async searchSongs(query: string): Promise<Song[]> {
    return this.songRepository
      .createQueryBuilder('song')
      .leftJoinAndSelect('song.artist', 'artist')
      .leftJoinAndSelect('song.album', 'album')
      .where('song.isPublic = true')
      .andWhere(
        '(song.title ILIKE :query OR artist.name ILIKE :query OR album.title ILIKE :query)',
        { query: `%${query}%` },
      )
      .getMany();
  }
}
