import FakeAppointmentRepository from '../repositories/fakes/FakeAppointmentsRepository';

import ListProviderMonthAvailabilityService from './ListProviderMonthAvailabilityService';

let fakeAppointmentRepository: FakeAppointmentRepository;
let listProviderMonthAvailability: ListProviderMonthAvailabilityService;

describe('ListProviderMonthAvailability', () => {
  beforeEach(() => {
    fakeAppointmentRepository = new FakeAppointmentRepository();
    listProviderMonthAvailability = new ListProviderMonthAvailabilityService(
      fakeAppointmentRepository,
    );
  });

  it('should be able to list the month availability from provider', async () => {
    await fakeAppointmentRepository.create({
      providerId: 'provider',
      date: new Date(2020, 6, 20, 8, 0, 0),
    });

    await fakeAppointmentRepository.create({
      providerId: 'provider',
      date: new Date(2020, 7, 20, 8, 0, 0),
    });

    await fakeAppointmentRepository.create({
      providerId: 'provider',
      date: new Date(2020, 7, 20, 10, 0, 0),
    });

    await fakeAppointmentRepository.create({
      providerId: 'provider',
      date: new Date(2020, 7, 21, 10, 0, 0),
    });

    const availability = await listProviderMonthAvailability.execute({
      providerId: 'provider',
      year: 2020,
      month: 8,
    });

    expect(availability).toEqual([
      expect.arrayContaining([
        { day: 19, available: true },
        { day: 20, available: false },
        { day: 21, available: false },
        { day: 22, available: true },
      ]),
    ]);
  });
});
