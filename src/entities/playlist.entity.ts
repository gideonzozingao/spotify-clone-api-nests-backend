import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { User } from './user.entity';
import { Song } from './song.entity';

@Entity('playlists')
export class Playlist {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ nullable: true })
  coverImage: string;

  @Column({ default: false })
  isPublic: boolean;

  @ManyToOne(() => User, (user) => user.playlists, { eager: true })
  user: User;

  @ManyToMany(() => Song, (song) => song.playlists, { eager: true })
  @JoinTable({ name: 'playlist_songs' })
  songs: Song[];

  @ManyToMany(() => User, (user) => user.followedPlaylists)
  followers: User[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
