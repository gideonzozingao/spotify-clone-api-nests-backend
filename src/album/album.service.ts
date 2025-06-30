// src/services/album.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Album } from '../entities/album.entity';
import { CreateAlbumDto } from '../dto/create-album.dto';
import { Artist } from '../entities/artist.entity';

@Injectable()
export class AlbumService {
  constructor(
    @InjectRepository(Album)
    private albumRepository: Repository<Album>,
    @InjectRepository(Artist)
    private artistRepository: Repository<Artist>,
  ) {}

  async create(createAlbumDto: CreateAlbumDto): Promise<Album> {
    const artist = await this.artistRepository.findOne({
      where: { id: createAlbumDto.artistId },
    });

    if (!artist) {
      throw new NotFoundException('Artist not found');
    }

    const album = this.albumRepository.create({
      ...createAlbumDto,
      artist,
    });

    return this.albumRepository.save(album);
  }

  async findAll(): Promise<Album[]> {
    return this.albumRepository.find({
      relations: ['artist', 'songs'],
    });
  }

  async findOne(id: number): Promise<Album> {
    const album = await this.albumRepository.findOne({
      where: { id },
      relations: ['artist', 'songs', 'likedBy'],
    });

    if (!album) {
      throw new NotFoundException('Album not found');
    }

    return album;
  }

  async findByArtist(artistId: number): Promise<Album[]> {
    return this.albumRepository.find({
      where: { artist: { id: artistId } },
      relations: ['artist', 'songs'],
    });
  }

  async update(id: number, updateData: Partial<Album>): Promise<Album> {
    await this.albumRepository.update(id, updateData);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    const album = await this.findOne(id);
    await this.albumRepository.remove(album);
  }

  async getNewReleases(limit: number = 20): Promise<Album[]> {
    return this.albumRepository.find({
      order: { releaseDate: 'DESC' },
      take: limit,
      relations: ['artist', 'songs'],
    });
  }
}
