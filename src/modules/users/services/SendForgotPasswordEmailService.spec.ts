import FakeMailProvider from '@shared/container/providers/MailProvider/fakes/FakeMailProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';

import SendForgotPasswordEmailService from './SendForgotPasswordEmailService';

describe('SendForgotPassowrdEmail', () => {
  it('should be able to recover the passowrd using the email', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeMailProvider = new FakeMailProvider();

    const sendMailFunction = jest.spyOn(fakeMailProvider, 'sendMail');

    const sendForgotPasswordEmail = new SendForgotPasswordEmailService(
      fakeUsersRepository,
      fakeMailProvider,
    );

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
});
