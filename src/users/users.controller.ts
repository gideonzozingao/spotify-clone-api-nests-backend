// src/controllers/user.controller.ts
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  //   HttpStatus,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from '../dto/create-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.userService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: Partial<CreateUserDto>,
  ) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.userService.remove(id);
  }

  @Post(':id/like-song/:songId')
  likeSong(
    @Param('id', ParseIntPipe) userId: number,
    @Param('songId', ParseIntPipe) songId: number,
  ) {
    return this.userService.likeSong(userId, songId);
  }

  @Delete(':id/like-song/:songId')
  unlikeSong(
    @Param('id', ParseIntPipe) userId: number,
    @Param('songId', ParseIntPipe) songId: number,
  ) {
    return this.userService.unlikeSong(userId, songId);
  }
}
