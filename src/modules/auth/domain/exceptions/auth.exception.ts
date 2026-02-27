import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';

// domain/exceptions/auth.exceptions.ts
export class UserAlreadyExistsException extends ConflictException {
  constructor() {
    super('User already exists');
  }
}

export class DatabaseException extends InternalServerErrorException {
  constructor() {
    super('Database error');
  }
}
