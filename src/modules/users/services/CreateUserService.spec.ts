import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import CreateUserService from './CreateUserService';

describe('CreateUser', () => {
  it('should be able to create a new user', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const createUser = new CreateUserService(fakeUsersRepository);

    const user = await createUser.execute({
      name: 'Wladimir',
      email: 'wladimir@gmail.com',
      password: '12345678',
    });

    expect(user).toHaveProperty('id');
    expect(user).not.toHaveProperty('password');
  });

  it('should not be able to create a new user with an email already registered', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const createUser = new CreateUserService(fakeUsersRepository);

    await createUser.execute({
      name: 'Wladimir',
      email: 'wladimir@gmail.com',
      password: '12345678',
    });

    expect(
      createUser.execute({
        name: 'Wladimir',
        email: 'wladimir@gmail.com',
        password: '12345678',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
