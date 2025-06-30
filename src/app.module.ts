import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SongsModule } from './songs/songs.module';
import { ArtistsModule } from './artists/artists.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [SongsModule, ArtistsModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
