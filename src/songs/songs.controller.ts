import {
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Body,
  Param,
  ParseIntPipe,
  Scope,
  Inject,
} from '@nestjs/common';
import { SongsService } from './songs.service';
import { CreateSongDTo } from './dto/create-song-dto';
import { UpdateteSongDTO } from './dto/update-song-dto';
import { Connection, connection } from '../common/constants/connection';

@Controller({ path: 'songs', scope: Scope.REQUEST })
export class SongsController {
  constructor(
    private songsService: SongsService,
    @Inject('CONNECTION')
    private connection: Connection,
  ) {
    console.log(
      `THIS IS CONNECTION STRING ${this.connection.CONNECTION_STRING}`,
    );
  }

  @Post()
  create(@Body() createSongDto: CreateSongDTo) {
    return this.songsService.create(createSongDto);
  }

  @Get()
  findAll() {
    try {
      return this.songsService.findAll();
    } catch (error) {
      console.log('I am in the catch block', error);
    }
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    try {
      return this.songsService.findOne(id);
    } catch (error) {
      console.log('I am in the catch block', error);
    }
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateSongDto: UpdateteSongDTO,
  ) {
    try {
      return this.songsService.update(id, updateSongDto);
    } catch (error) {
      console.log('I am in the catch block', error);
    }
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    try {
      return this.songsService.remove(id);
    } catch (error) {
      console.log('I am in the catch block', error);
    }
  }
}
