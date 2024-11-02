import { CreateUserDto } from './create-users.dto';
import { PartialType } from '@nestjs/mapped-types';

export class updatedUserDto extends PartialType(CreateUserDto) {}

