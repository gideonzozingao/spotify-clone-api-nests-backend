import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Album } from 'src/entities/album.entity';
import { Playlist } from 'src/entities/playlist.entity';
import { Song } from 'src/entities/song.entity';
import { User } from 'src/entities/user.entity';

export const databaseConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT) || 5432,
  username: process.env.DB_USERNAME || 'admin_user',
  password: process.env.DB_PASSWORD || 'mYpassW0rd2025',
  database: process.env.DB_NAME || 'spotify_clone',
  entities: [Song, User, Album, Playlist],
  synchronize: process.env.NODE_ENV !== 'production',
  logging: process.env.NODE_ENV === 'development',
};
