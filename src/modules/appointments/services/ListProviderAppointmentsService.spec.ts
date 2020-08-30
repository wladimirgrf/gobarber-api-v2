import FakeAppointmentRepository from '../repositories/fakes/FakeAppointmentsRepository';

import ListProviderAppointmentsService from './ListProviderAppointmentsService';

let fakeAppointmentRepository: FakeAppointmentRepository;
let listProviderAppointmetns: ListProviderAppointmentsService;

describe('ListProviderAppointments', () => {
  beforeEach(() => {
    fakeAppointmentRepository = new FakeAppointmentRepository();
    listProviderAppointmetns = new ListProviderAppointmentsService(
      fakeAppointmentRepository,
    );
  });

  it('should be able to list the provider appointments on a specific day', async () => {
    const appointment1 = await fakeAppointmentRepository.create({
      date: new Date(2020, 9, 7, 13, 0, 0),
      userId: 'user',
      providerId: 'provider',
    });

    const appointment2 = await fakeAppointmentRepository.create({
      date: new Date(2020, 9, 7, 14, 0, 0),
      userId: 'user',
      providerId: 'provider',
    });

    const appointments = await listProviderAppointmetns.execute({
      providerId: 'provider',
      day: 7,
      month: 10,
      year: 2020,
    });

    expect(appointments).toEqual(
      expect.arrayContaining([appointment1, appointment2]),
    );
  });
});
