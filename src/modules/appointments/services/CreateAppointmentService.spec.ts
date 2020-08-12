import AppError from '@shared/errors/AppError';

import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import CreateAppointmentService from './CreateAppointmentService';

describe('CreateAppointment', () => {
  it('should be able to create a new appointment', async () => {
    const fakeAppointmentsRepository = new FakeAppointmentsRepository();
    const createAppointment = new CreateAppointmentService(
      fakeAppointmentsRepository,
    );

    const appointment = await createAppointment.execute({
      date: new Date(),
      providerId: '95ca23ee-0570-47ff-a889-0ac5de86b0df',
    });

    expect(appointment).toHaveProperty('id');
    expect(appointment.providerId).toBe('95ca23ee-0570-47ff-a889-0ac5de86b0df');
  });

  it('should not be able to create two appointments on the same time', async () => {
    const fakeAppointmentsRepository = new FakeAppointmentsRepository();
    const createAppointment = new CreateAppointmentService(
      fakeAppointmentsRepository,
    );

    const appointmentDate = new Date();

    await createAppointment.execute({
      date: appointmentDate,
      providerId: '95ca23ee-0570-47ff-a889-0ac5de86b0df',
    });

    expect(
      createAppointment.execute({
        date: appointmentDate,
        providerId: '95ca23ee-0570-47ff-a889-0ac5de86b0df',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
