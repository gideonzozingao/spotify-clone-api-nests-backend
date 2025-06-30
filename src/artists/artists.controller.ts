// src/controllers/artist.controller.ts
import {
  Controller,
  Get,
  Post,
  Body,
  //   Patch,
  Param,
  //   Delete,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { ArtistsService } from './artists.service';
import { CreateArtistDto } from '../dto/create-artist.dto';

@Controller('artists')
export class ArtistsController {
  constructor(private readonly artistService: ArtistsService) {}

  @Post()
  create(@Body() createArtistDto: CreateArtistDto) {
    return this.artistService.create(createArtistDto);
  }

  @Get()
  findAll() {
    return this.artistService.findAll();
  }

  @Get('top')
  getTopArtists(@Query('limit') limit?: string) {
    return this.artistService.getTopArtists(limit ? parseInt(limit) : 10);
  }

  @Get('search')
  searchArtists(@Query('q') query: string) {
    return this.artistService.searchArtists(query);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.artistService.findOne(id);
  }

  // @Patch(':id')
  // update(@Param('id', ParseIntPipe))
}
