import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
  ManyToMany,
} from 'typeorm';
import { Artist } from './artist.entity';
import { Song } from './song.entity';
import { User } from './user.entity';

export enum AlbumType {
  ALBUM = 'album',
  SINGLE = 'single',
  EP = 'ep',
}

@Entity('albums')
export class Album {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ nullable: true })
  coverImage: string;

  @Column({ type: 'date' })
  releaseDate: Date;

  @Column({ type: 'enum', enum: AlbumType, default: AlbumType.ALBUM })
  type: AlbumType;

  @Column({ type: 'text', nullable: true })
  description: string;

  @ManyToOne(() => Artist, (artist) => artist.albums, { eager: true })
  artist: Artist;

  @OneToMany(() => Song, (song) => song.album)
  songs: Song[];

  @ManyToMany(() => User, (user) => user.likedAlbums)
  likedBy: User[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
