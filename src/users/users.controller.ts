import { Controller, Get, Post, Body, Patch, Param, Delete, Req, ExecutionContext } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Auth } from '../common/decorators/auth.decorators';
import { Role } from '../common/enums/rol.enum';
import { AssignRoleDto } from './dto/assign-role.dto';
import { Request } from 'express';
import { UserActive } from 'src/common/decorators/user-active.decorator';
import { UserActiveI } from 'src/common/interfaces/user-active.interface';
// import { Request } from 'express';

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

  /**
   * Assigns a role to a user.
   * 
   * Validates that the role is a valid Role enum value. If the user does not exist, it throws a NotFoundException.
   * 
   * Only users with the SUPER_ADMIN role can assign roles.
   * 
   * @param userId The id of the user to assign the role.
   * @param assignRoleDto The role to assign.
   * @returns The user with the new role.
   */
  @Post('assignRole/:userId')
  @Auth([ Role.SUPER_ADMIN ])
  assignRole(
    @Param('userId') 
    userId: string,

    @Body() 
    assignRoleDto: AssignRoleDto
  ) {
    return this.usersService.assignRole(userId, assignRoleDto);
  }

  /**
   * Updates a user in the database.
   * 
   * Only a user with the SUPER_ADMIN role can update any user.
   * 
   * @param id The id of the user to update.
   * @param updateUserDto The data to update.
   * @returns The updated user.
   */
  @Patch('update/:id')
  @Auth([ Role.SUPER_ADMIN ])
  update(
    @Param('id') 
    id: string, 
    
    @Body() 
    updateUserDto: UpdateUserDto
  ) {
    return this.usersService.update(id, updateUserDto);
  }

  @Patch('updateMe')
  @Auth([ Role.ADMIN, Role.USER ])
  updateMe(    
    @Body() 
    updateUserDto: UpdateUserDto,

    @UserActive()
    user: UserActiveI
  ) {
    return this.usersService.update(user.id, updateUserDto);
  }

  /**
   * Removes a user from the database.
   * 
   * Only a user with the SUPER_ADMIN role can remove users.
   * 
   * @param id The id of the user to remove.
   * @returns The removed user.
   */
  @Delete('remove/:id')
  @Auth([ Role.SUPER_ADMIN ])
  remove(
    @Param('id') 
    id: string
  ) {
    return this.usersService.remove(id);
  }
}
