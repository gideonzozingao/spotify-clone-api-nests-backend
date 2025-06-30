// src/services/artist.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Artist } from '../entities/artist.entity';
import { CreateArtistDto } from '../dto/create-artist.dto';

@Injectable()
export class ArtistsService {
  constructor(
    @InjectRepository(Artist)
    private artistRepository: Repository<Artist>,
  ) {}

  async create(createArtistDto: CreateArtistDto): Promise<Artist> {
    const artist = this.artistRepository.create(createArtistDto);
    return this.artistRepository.save(artist);
  }

  async findAll(): Promise<Artist[]> {
    return this.artistRepository.find({
      relations: ['albums', 'songs'],
    });
  }

  async findOne(id: number): Promise<Artist> {
    const artist = await this.artistRepository.findOne({
      where: { id },
      relations: ['albums', 'songs', 'followers'],
    });

    if (!artist) {
      throw new NotFoundException('Artist not found');
    }

    return artist;
  }

  async update(id: number, updateData: Partial<Artist>): Promise<Artist> {
    await this.artistRepository.update(id, updateData);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    const artist = await this.findOne(id);
    await this.artistRepository.remove(artist);
  }

  async getTopArtists(limit: number = 10): Promise<Artist[]> {
    return this.artistRepository.find({
      order: { monthlyListeners: 'DESC' },
      take: limit,
      relations: ['albums', 'songs'],
    });
  }

  async searchArtists(query: string): Promise<Artist[]> {
    return this.artistRepository
      .createQueryBuilder('artist')
      .where('artist.name ILIKE :query', { query: `%${query}%` })
      .leftJoinAndSelect('artist.albums', 'albums')
      .leftJoinAndSelect('artist.songs', 'songs')
      .getMany();
  }
}
