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
    const appointment = await createAppointment.execute({
      date: new Date(),
      userId: 'user',
      providerId: 'provider',
    });

    expect(appointment).toHaveProperty('id');
    expect(appointment.providerId).toBe('provider');
  });

  it('should not be able to create two appointments on the same time', async () => {
    const appointmentDate = new Date();

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
});
