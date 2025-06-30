import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Playlist } from './playlist.entity';
import { Song } from './song.entity';
import { Album } from './album.entity';
import { Artist } from './artist.entity';

export enum UserRole {
  USER = 'user',
  ARTIST = 'artist',
  ADMIN = 'admin',
}

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ nullable: true })
  avatar: string;

  @Column({ type: 'date', nullable: true })
  dateOfBirth: Date;

  @Column({ type: 'enum', enum: UserRole, default: UserRole.USER })
  role: UserRole;

  @Column({ default: false })
  isPremium: boolean;

  @OneToMany(() => Playlist, (playlist) => playlist.user)
  playlists: Playlist[];

  @ManyToMany(() => Song)
  @JoinTable({ name: 'user_liked_songs' })
  likedSongs: Song[];

  @ManyToMany(() => Album)
  @JoinTable({ name: 'user_liked_albums' })
  likedAlbums: Album[];

  @ManyToMany(() => Artist)
  @JoinTable({ name: 'user_followed_artists' })
  followedArtists: Artist[];

  @ManyToMany(() => Playlist)
  @JoinTable({ name: 'user_followed_playlists' })
  followedPlaylists: Playlist[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
