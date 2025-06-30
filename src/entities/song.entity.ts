// src/entities/song.entity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  ManyToMany,
} from 'typeorm';
import { Artist } from './artist.entity';
import { Album } from './album.entity';
import { User } from './user.entity';
import { Playlist } from './playlist.entity';

@Entity('songs')
export class Song {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ type: 'time' })
  duration: Date; // HH:MM:SS format

  @Column({ nullable: true })
  audioUrl: string;

  @Column({ nullable: true })
  coverImage: string;

  @Column({ type: 'text', nullable: true })
  lyrics: string;

  @Column({ default: 0 })
  playCount: number;

  @Column({ type: 'boolean', default: true })
  isPublic: boolean;

  @ManyToOne(() => Artist, (artist) => artist.songs, { eager: true })
  artist: Artist;

  @ManyToOne(() => Album, (album) => album.songs, {
    eager: true,
    nullable: true,
  })
  album: Album;

  @ManyToMany(() => User, (user) => user.likedSongs)
  likedBy: User[];

  @ManyToMany(() => Playlist, (playlist) => playlist.songs)
  playlists: Playlist[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
