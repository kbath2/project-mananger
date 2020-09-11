import { Request, Response } from 'express';
import UseRepository from '../repositories/UseRepository';
import CreateUserService from '../services/CreateUserServices';

class UserController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body;

    const userRepository = new UseRepository();
    const createUser = new CreateUserService(userRepository);

    const user = await createUser.execute({
      name,
      email,
      password,
    });

    delete user.password;

    return response.json(user);
  }
}

export default UserController;
