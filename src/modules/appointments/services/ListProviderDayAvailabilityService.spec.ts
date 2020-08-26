import FakeAppointmentRepository from '../repositories/fakes/FakeAppointmentsRepository';

import ListProviderDayAvailabilityService from './ListProviderDayAvailabilityService';

let fakeAppointmentRepository: FakeAppointmentRepository;
let listProviderDayAvailability: ListProviderDayAvailabilityService;

describe('ListProviderDayAvailability', () => {
  beforeEach(() => {
    fakeAppointmentRepository = new FakeAppointmentRepository();
    listProviderDayAvailability = new ListProviderDayAvailabilityService(
      fakeAppointmentRepository,
    );
  });

  it('should be able to list the month availability from provider', async () => {
    await fakeAppointmentRepository.create({
      providerId: 'provider',
      date: new Date(2020, 7, 20, 8, 0, 0),
    });

    const availability = await listProviderDayAvailability.execute({
      providerId: 'provider',
      day: 20,
      month: 8,
      year: 2020,
    });

    expect(availability).toEqual(
      expect.arrayContaining([
        { hour: 8, available: false },
        { hour: 9, available: true },
        { hour: 10, available: true },
      ]),
    );
  });
});
