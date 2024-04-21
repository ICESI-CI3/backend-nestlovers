import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  create(createUserDto: CreateUserDto) {
    return this.usersRepository.save(createUserDto);
  }

  findOneByEmail(email: string) {
    return this.usersRepository.findOneBy({ email });
  }

  findByEmailWithPassword(email: string) {
    return this.usersRepository.findOne({ 
      where: { email }, 
      select: ['id', 'name', 'email', 'password', 'role'] 
    });
  }

  findOne(id: number) {
    return this.usersRepository.findOneBy({ id: id.toString() });
  }
}
