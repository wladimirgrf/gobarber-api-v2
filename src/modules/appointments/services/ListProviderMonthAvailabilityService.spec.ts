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
      date: new Date(2020, 7, 21, 8, 0, 0),
      userId: 'user',
      providerId: 'provider',
    });

    await fakeAppointmentRepository.create({
      date: new Date(2020, 7, 21, 9, 0, 0),
      userId: 'user',
      providerId: 'provider',
    });

    await fakeAppointmentRepository.create({
      date: new Date(2020, 7, 21, 10, 0, 0),
      userId: 'user',
      providerId: 'provider',
    });

    await fakeAppointmentRepository.create({
      date: new Date(2020, 7, 21, 11, 0, 0),
      userId: 'user',
      providerId: 'provider',
    });

    await fakeAppointmentRepository.create({
      date: new Date(2020, 7, 21, 12, 0, 0),
      userId: 'user',
      providerId: 'provider',
    });

    await fakeAppointmentRepository.create({
      date: new Date(2020, 7, 21, 13, 0, 0),
      userId: 'user',
      providerId: 'provider',
    });

    await fakeAppointmentRepository.create({
      date: new Date(2020, 7, 21, 14, 0, 0),
      userId: 'user',
      providerId: 'provider',
    });

    await fakeAppointmentRepository.create({
      date: new Date(2020, 7, 21, 15, 0, 0),
      userId: 'user',
      providerId: 'provider',
    });

    await fakeAppointmentRepository.create({
      date: new Date(2020, 7, 21, 16, 0, 0),
      userId: 'user',
      providerId: 'provider',
    });

    await fakeAppointmentRepository.create({
      date: new Date(2020, 7, 21, 17, 0, 0),
      userId: 'user',
      providerId: 'provider',
    });

    await fakeAppointmentRepository.create({
      date: new Date(2020, 7, 21, 18, 0, 0),
      userId: 'user',
      providerId: 'provider',
    });

    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 7, 20, 11).getTime();
    });

    const availability = await listProviderMonthAvailability.execute({
      providerId: 'provider',
      year: 2020,
      month: 8,
    });

    expect(availability).toEqual(
      expect.arrayContaining([
        { day: 20, available: true },
        { day: 21, available: false },
        { day: 22, available: true },
      ]),
    );
  });
});
