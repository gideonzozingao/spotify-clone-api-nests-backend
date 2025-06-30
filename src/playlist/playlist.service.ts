// src/services/playlist.service.ts
import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Playlist } from '../entities/playlist.entity';
import { CreatePlaylistDto } from '../dto/create-playlist.dto';
import { User } from '../entities/user.entity';
import { Song } from '../entities/song.entity';

@Injectable()
export class PlaylistService {
  constructor(
    @InjectRepository(Playlist)
    private playlistRepository: Repository<Playlist>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Song)
    private songRepository: Repository<Song>,
  ) {}

  async create(createPlaylistDto: CreatePlaylistDto): Promise<Playlist> {
    const user = await this.userRepository.findOne({
      where: { id: createPlaylistDto.userId },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    let songs: Song[] = []; // Add explicit type annotation
    if (createPlaylistDto.songIds?.length) {
      songs = await this.songRepository.findByIds(createPlaylistDto.songIds);
    }

    const playlist = this.playlistRepository.create({
      ...createPlaylistDto,
      user,
      songs,
    });

    return this.playlistRepository.save(playlist);
  }

  async findAll(): Promise<Playlist[]> {
    return this.playlistRepository.find({
      where: { isPublic: true },
      relations: ['user', 'songs', 'songs.artist'],
    });
  }

  async findOne(id: number): Promise<Playlist> {
    const playlist = await this.playlistRepository.findOne({
      where: { id },
      relations: ['user', 'songs', 'songs.artist', 'songs.album'],
    });

    if (!playlist) {
      throw new NotFoundException('Playlist not found');
    }

    return playlist;
  }

  async findByUser(userId: number): Promise<Playlist[]> {
    return this.playlistRepository.find({
      where: { user: { id: userId } },
      relations: ['songs', 'songs.artist'],
    });
  }

  async update(
    id: number,
    userId: number,
    updateData: Partial<Playlist>,
  ): Promise<Playlist> {
    const playlist = await this.findOne(id);

    if (playlist.user.id !== userId) {
      throw new ForbiddenException('You can only update your own playlists');
    }

    await this.playlistRepository.update(id, updateData);
    return this.findOne(id);
  }

  async remove(id: number, userId: number): Promise<void> {
    const playlist = await this.findOne(id);

    if (playlist.user.id !== userId) {
      throw new ForbiddenException('You can only delete your own playlists');
    }

    await this.playlistRepository.remove(playlist);
  }

  async addSongToPlaylist(
    playlistId: number,
    songId: number,
    userId: number,
  ): Promise<Playlist> {
    const playlist = await this.findOne(playlistId);

    if (playlist.user.id !== userId) {
      throw new ForbiddenException('You can only modify your own playlists');
    }

    const song = await this.songRepository.findOne({ where: { id: songId } });
    if (!song) {
      throw new NotFoundException('Song not found');
    }

    const isAlreadyInPlaylist = playlist.songs.some((s) => s.id === songId);
    if (!isAlreadyInPlaylist) {
      playlist.songs.push(song);
      await this.playlistRepository.save(playlist);
    }

    return this.findOne(playlistId);
  }

  async removeSongFromPlaylist(
    playlistId: number,
    songId: number,
    userId: number,
  ): Promise<Playlist> {
    const playlist = await this.findOne(playlistId);

    if (playlist.user.id !== userId) {
      throw new ForbiddenException('You can only modify your own playlists');
    }

    playlist.songs = playlist.songs.filter((song) => song.id !== songId);
    await this.playlistRepository.save(playlist);

    return this.findOne(playlistId);
  }
}
