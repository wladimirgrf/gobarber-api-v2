import AppError from '@shared/errors/AppError';

import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import CreateAppointmentService from './CreateAppointmentService';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let createAppointment: CreateAppointmentService;

describe('CreateAppointment', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    createAppointment = new CreateAppointmentService(
      fakeAppointmentsRepository,
    );
  });

  it('should be able to create a new appointment', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 7, 10, 12).getTime();
    });

    const appointment = await createAppointment.execute({
      date: new Date(2020, 7, 10, 13),
      userId: 'user',
      providerId: 'provider',
    });

    expect(appointment).toHaveProperty('id');
    expect(appointment.providerId).toBe('provider');
  });

  it('should not be able to create two appointments on the same time', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 7, 10, 12).getTime();
    });

    const appointmentDate = new Date(2020, 7, 10, 13);

    await createAppointment.execute({
      date: appointmentDate,
      userId: 'user',
      providerId: 'provider',
    });

    await expect(
      createAppointment.execute({
        date: appointmentDate,
        userId: 'user',
        providerId: 'provider',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create an appointment on a past date', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 7, 10, 12).getTime();
    });

    await expect(
      createAppointment.execute({
        date: new Date(2020, 6, 10, 11),
        userId: 'user',
        providerId: 'provider',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create an appointment with same user as provider', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 7, 10, 12).getTime();
    });

    await expect(
      createAppointment.execute({
        date: new Date(2020, 7, 10, 13),
        userId: 'provider',
        providerId: 'provider',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create an appointment before 8:00 and after 17:00', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 7, 10, 12).getTime();
    });

    await expect(
      createAppointment.execute({
        date: new Date(2020, 7, 11, 7),
        userId: 'user',
        providerId: 'provider',
      }),
    ).rejects.toBeInstanceOf(AppError);

    await expect(
      createAppointment.execute({
        date: new Date(2020, 7, 11, 18),
        userId: 'user',
        providerId: 'provider',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
