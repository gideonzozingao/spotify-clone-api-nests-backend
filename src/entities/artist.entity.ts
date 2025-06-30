import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToMany,
} from 'typeorm';
import { Album } from './album.entity';
import { Song } from './song.entity';
import { User } from './user.entity';

@Entity('artists')
export class Artist {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ type: 'text', nullable: true })
  biography: string;

  @Column({ nullable: true })
  avatar: string;

  @Column({ type: 'text', array: true, default: [] })
  genres: string[];

  @Column({ default: 0 })
  monthlyListeners: number;

  @OneToMany(() => Album, (album) => album.artist)
  albums: Album[];

  @OneToMany(() => Song, (song) => song.artist)
  songs: Song[];

  @ManyToMany(() => User, (user) => user.followedArtists)
  followers: User[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
