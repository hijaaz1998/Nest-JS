import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-users.dto';
import { updatedUserDto } from './dto/update-user.dto';
import { NotFoundException } from '@nestjs/common';

@Injectable()
export class UsersService {
  private users = [
    {
      id: 1,
      name: 'Alice Johnson',
      email: 'alice.johnson@example.com',
      role: 'ADMIN',
    },
    {
      id: 2,
      name: 'Bob Smith',
      email: 'bob.smith@example.com',
      role: 'ENGINEER',
    },
    {
      id: 3,
      name: 'Charlie Brown',
      email: 'charlie.brown@example.com',
      role: 'INTERN',
    },
    {
      id: 4,
      name: 'Diana Prince',
      email: 'diana.prince@example.com',
      role: 'ADMIN',
    },
    {
      id: 5,
      name: 'Edward Stone',
      email: 'edward.stone@example.com',
      role: 'ENGINEER',
    },
    {
      id: 6,
      name: 'Fiona Black',
      email: 'fiona.black@example.com',
      role: 'INTERN',
    },
    {
      id: 7,
      name: 'George White',
      email: 'george.white@example.com',
      role: 'ENGINEER',
    },
    {
      id: 8,
      name: 'Hannah Green',
      email: 'hannah.green@example.com',
      role: 'ADMIN',
    },
    { id: 9, name: 'Ian Gold', email: 'ian.gold@example.com', role: 'INTERN' },
    {
      id: 10,
      name: 'Jackie Silver',
      email: 'jackie.silver@example.com',
      role: 'ENGINEER',
    },
  ];

  findAll(role?: 'INTERN' | 'ADMIN' | 'ENGINEER') {
    if (role) {
      const usersRoles = this.users.filter((user) => user.role === role);
      if (!usersRoles.length)
        throw new NotFoundException('user role not found');
      return usersRoles;
    }
    return this.users;
  }

  findOne(id: number) {
    const user = this.users.find((user) => user.id === id);

    if (!user) throw new NotFoundException('user not found');
    return user;
  }

  create(createUserDto: CreateUserDto) {
    const userByHighestId = [...this.users].sort((a, b) => b.id - a.id);
    const newUser = {
      id: userByHighestId[0].id + 1,
      ...createUserDto,
    };
    this.users.push(newUser);
    return newUser;
  }

  updateOne(id: number, updatedUserDto: updatedUserDto) {
    this.users = this.users.map((user) => {
      if (user.id === id) {
        return { ...user, ...updatedUserDto };
      }
      return user;
    });

    return this.findOne(id);
  }

  deleteOne(id: number) {
    const removedUser = this.findOne(id);
    this.users = this.users.filter((user) => user.id !== id);
    return removedUser;
  }
}
