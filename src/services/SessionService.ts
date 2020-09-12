import { Response } from 'express';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import IUserRepository from '../repositories/IUserRepository';
import UseRepository from '../repositories/UserRepository';
import User from '../models/User';
import AppError from '../errors/AppError';

interface Request {
  email: string;
  password: string;
}

interface Response {
  token: string;
  user: User;
}

class CreateUserService {
  private userRepository: IUserRepository;

  constructor(userRepository: UseRepository) {
    this.userRepository = userRepository;
  }

  public async execute({ email, password }: Request): Promise<Response> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new AppError('Credenciais inválidas', 401);
    }

    const passwordCompare = await compare(password, user.password);

    if (!passwordCompare) {
      throw new AppError('Credenciais inválidas', 401);
    }

    const token = sign(user.id, process.env.APP_SECRET as string, {
      expiresIn: '1d',
    });

    delete user.password;

    return {
      token,
      user,
    };
  }
}

export default CreateUserService;