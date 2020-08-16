import AppError from '@shared/errors/AppError';

import FakeMailProvider from '@shared/container/providers/MailProvider/fakes/FakeMailProvider';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeUserTokensRepository from '../repositories/fakes/FakeUserTokensRepository';

import SendForgotPasswordEmailService from './SendForgotPasswordEmailService';

let fakeUsersRepository: FakeUsersRepository;
let fakeUserTokensRepository: FakeUserTokensRepository;

let fakeMailProvider: FakeMailProvider;

let sendForgotPasswordEmail: SendForgotPasswordEmailService;

describe('SendForgotPassowrdEmail', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeUserTokensRepository = new FakeUserTokensRepository();
    fakeMailProvider = new FakeMailProvider();

    sendForgotPasswordEmail = new SendForgotPasswordEmailService(
      fakeMailProvider,
      fakeUsersRepository,
      fakeUserTokensRepository,
    );
  });

  it('should be able to recover the password using the email', async () => {
    const sendMailFunction = jest.spyOn(fakeMailProvider, 'sendMail');

    await fakeUsersRepository.create({
      name: 'Wladimir',
      email: 'wladimir@gmail.com',
      password: '12345678',
    });

    await sendForgotPasswordEmail.execute({
      email: 'wladimir@gmail.com',
    });

    expect(sendMailFunction).toHaveBeenCalled();
  });

  it('should not be able to recover a non-existing user password', async () => {
    await expect(
      sendForgotPasswordEmail.execute({
        email: 'wladimir@gmail.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should generate a forgot password token', async () => {
    const generateTokenFunction = jest.spyOn(
      fakeUserTokensRepository,
      'generate',
    );

    const user = await fakeUsersRepository.create({
      name: 'Wladimir',
      email: 'wladimir@gmail.com',
      password: '12345678',
    });

    await sendForgotPasswordEmail.execute({
      email: 'wladimir@gmail.com',
    });

    expect(generateTokenFunction).toHaveBeenCalledWith(user.id);
  });
});
