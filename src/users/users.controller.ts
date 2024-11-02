import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
  ParseIntPipe,
  ValidationPipe
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-users.dto';
import { updatedUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';

@Controller('users') // "/users" related routes
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get() // GET /users or /users?role=value

  // function to recieve req and send res
  // can be used the query with @Query
  findAll(@Query('role') role?: 'INTERN' | 'ADMIN' | 'ENGINEER') {
    return this.userService.findAll(role);
  }

  //! Always add the dynamic route below all the other routes
  @Get(':id') // GET /users/:id

  // inside the function has to specify the id inside @Param if there is param,
  // and no ":" in the @Param
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.userService.findOne(id);
  }

  @Post()
  create(
    @Body(ValidationPipe)
    createUserDto: CreateUserDto,
  ) {
    return this.userService.create(createUserDto);
  }

  @Patch(':id')
  updateOne(
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidationPipe)
    updatedUserDto: updatedUserDto
  ) {
    return this.userService.updateOne(id, updatedUserDto);
  }

  @Delete(':id')
  deleteOne(@Param('id', ParseIntPipe) id: number) {
    return this.userService.deleteOne(id);
  }
}
