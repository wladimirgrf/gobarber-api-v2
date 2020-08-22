import AppError from '@shared/errors/AppError';

import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';

import UpdateProfileService from './UpdateProfileService';

let fakeHashProvider: FakeHashProvider;
let fakeUsersRepository: FakeUsersRepository;
let updateProfile: UpdateProfileService;

describe('UpdateProfile', () => {
  beforeEach(() => {
    fakeHashProvider = new FakeHashProvider();
    fakeUsersRepository = new FakeUsersRepository();

    updateProfile = new UpdateProfileService(
      fakeUsersRepository,
      fakeHashProvider,
    );
  });

  it('should be able to update the profile', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Wladimir',
      email: 'wladimir@gmail.com',
      password: '12345678',
    });

    const updatedUser = await updateProfile.execute({
      userId: user.id,
      name: 'Wlad',
      email: 'wlad@gmail.com',
    });

    expect(updatedUser.name).toBe('Wlad');
    expect(updatedUser.email).toBe('wlad@gmail.com');
  });

  it('should not be able to update the profile with an another user email', async () => {
    await fakeUsersRepository.create({
      name: 'Wladimir',
      email: 'wladimir@gmail.com',
      password: '12345678',
    });

    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'john@gmail.com',
      password: '12345678',
    });

    await expect(
      updateProfile.execute({
        userId: user.id,
        name: 'John Doe',
        email: 'wladimir@gmail.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to update the password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Wladimir',
      email: 'wladimir@gmail.com',
      password: '12345678',
    });

    const updatedUser = await updateProfile.execute({
      userId: user.id,
      name: 'Wlad',
      email: 'wlad@gmail.com',
      password: '1234',
      oldPassword: '12345678',
    });

    expect(updatedUser.password).toBe('1234');
  });

  it('should not be able to update the password with wrong old password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Wladimir',
      email: 'wladimir@gmail.com',
      password: '12345678',
    });

    await expect(
      updateProfile.execute({
        userId: user.id,
        name: 'Wlad',
        email: 'wlad@gmail.com',
        password: '1234',
        oldPassword: 'wrong-old-password',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
