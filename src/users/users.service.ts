import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { AssignRoleDto } from './dto/assign-role.dto';
import * as bcryptjs from 'bcryptjs';


@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  /**
   * Creates a new user.
   * 
   * @param createUserDto The user data to create.
   * @returns The user created.
   */
  create(createUserDto: CreateUserDto) {
    return this.usersRepository.save(createUserDto);
  }

  /**
   * Find a user by its email and returns the user without the password.
   * 
   * @param email The user email.
   * @returns The user with the given email.
   */
  findOneByEmail(email: string) {
    return this.usersRepository.findOneBy({ email });
  }

  /**
   * Find a user by its email and returns the user with all its information (password included).
   * 
   * @param email The user email.
   * @returns The user with the given email.
   */
  findByEmailWithPassword(email: string) {
    return this.usersRepository.findOne({ 
      where: { email }, 
      select: ['id', 'name', 'email', 'password', 'role'] 
    });
  }

  /**
   * Find a user by its id.
   * 
   * @param id The user id.
   * @returns The user with the given id.
   */
  findOne(id: string) {
    return this.usersRepository.findOneBy({ id });
  }

  /**
   * Find all users in the database.
   * 
   * @returns All users in the database.
   */
  findAll() {
    return this.usersRepository.find();
  }
  
  /**
   * Assigns a role to a user.
   * 
   * Validates that the role is a valid Role enum value. If the user does not exist, it throws a NotFoundException.
   * 
   * @param userId The id of the user to assign the role.
   * @param assignRoleDto The role to assign.
   * @returns The user with the new role.
   */
  async assignRole(userId: string, assignRoleDto: AssignRoleDto) {
    const user = await this.findOne(userId);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return this.usersRepository.save({ ...user, role: assignRoleDto.role });
  }

  /**
   * Updates a user in the database.
   * 
   * @param id The id of the user to update.
   * @param updateUserDto The data to update.
   * @returns The user updated.
   */
  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.findOne(id);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (updateUserDto.password) {
      const password = await bcryptjs.hash(updateUserDto.password, 10);

      updateUserDto = { ...updateUserDto, password: password };
    }

    const updatedUser = await this.usersRepository.save({ ...user, ...updateUserDto });

    delete updatedUser.password;

    return updatedUser;
  }

  /**
   * Removes a user from the database.
   * 
   * @param id The id of the user to remove.
   * @returns The user removed.
   */
  async remove(id: string) {
    const user = await this.findOne(id);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return this.usersRepository.remove(user);
  }
}
