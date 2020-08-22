import AppError from '@shared/errors/AppError';

import FakeStorageProvider from '@shared/container/providers/StorageProvider/fakes/FakeStorageProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';

import UpdateUserAvatarService from './UpdateUserAvatarService';

let fakeStorageProvider: FakeStorageProvider;
let fakeUsersRepository: FakeUsersRepository;
let updateUserAvatar: UpdateUserAvatarService;

describe('UpdateUserAvatar', () => {
  beforeEach(() => {
    fakeStorageProvider = new FakeStorageProvider();
    fakeUsersRepository = new FakeUsersRepository();

    updateUserAvatar = new UpdateUserAvatarService(
      fakeUsersRepository,
      fakeStorageProvider,
    );
  });

  it('should be able to update avatar', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Wladimir',
      email: 'wladimir@gmail.com',
      password: '12345678',
    });

    await updateUserAvatar.execute({
      userId: user.id,
      avatarFileName: 'avatar.jpg',
    });

    expect(user.avatar).toBe('avatar.jpg');
  });

  it('should not be able to update avatar from non existing user', async () => {
    await expect(
      updateUserAvatar.execute({
        userId: 'non-existing-user',
        avatarFileName: 'avatar.jpg',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should delete old avatar when updating new one', async () => {
    const deleteFileFunction = jest.spyOn(fakeStorageProvider, 'deleteFile');

    const user = await fakeUsersRepository.create({
      name: 'Wladimir',
      email: 'wladimir@gmail.com',
      password: '12345678',
    });

    await updateUserAvatar.execute({
      userId: user.id,
      avatarFileName: 'avatar.jpg',
    });

    await updateUserAvatar.execute({
      userId: user.id,
      avatarFileName: 'new_avatar.jpg',
    });

    expect(deleteFileFunction).toHaveBeenCalledWith('avatar.jpg');
    expect(user.avatar).toBe('new_avatar.jpg');
  });
});
