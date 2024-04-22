import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Auth } from '../auth/decorators/auth.decorators';
import { Role } from '../common/enums/rol.enum';

@Controller('users')
export class UsersController {
  
  constructor(
    private readonly usersService: UsersService
  ) {}
  
  @Post()
  @Auth([ Role.ADMIN ])
  create(
    @Body() 
    createUserDto: CreateUserDto
  ) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @Auth([ Role.ADMIN ])
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  @Auth([ Role.ADMIN ])
  findOne(
    @Param('id') 
    id: string
  ) {
    return this.usersService.findOne(id);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
  //   return this.usersService.update(+id, updateUserDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   // return this.usersService.remove(+id);
  // }
}
