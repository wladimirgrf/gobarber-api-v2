import { getRepository, Repository, Between } from 'typeorm';
import { startOfMonth, endOfMonth, startOfDay, endOfDay } from 'date-fns';

import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';

import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO';
import IFindAllInMonthFromProviderDTO from '@modules/appointments/dtos/IFindAllInMonthFromProviderDTO';
import IFindAllInDayFromProviderDTO from '@modules/appointments/dtos/IFindAllInDayFromProviderDTO';

import Appointment from '../entities/Appointment';

class AppointmentsRepository implements IAppointmentsRepository {
  private ormRepository: Repository<Appointment>;

  constructor() {
    this.ormRepository = getRepository(Appointment);
  }

  public async create({
    providerId,
    userId,
    date,
  }: ICreateAppointmentDTO): Promise<Appointment> {
    const appointment = this.ormRepository.create({ providerId, userId, date });

    await this.ormRepository.save(appointment);

    return appointment;
  }

  public async findByDate(date: Date): Promise<Appointment | undefined> {
    const findAppointment = await this.ormRepository.findOne({
      where: { date },
    });

    return findAppointment;
  }

  public async findAllInMonthFromProvider({
    providerId,
    month,
    year,
  }: IFindAllInMonthFromProviderDTO): Promise<Appointment[]> {
    const chosenDate = new Date(year, month - 1);
    const firstDayOfTheMonth = startOfMonth(chosenDate);
    const lastDayOfTheMonth = endOfMonth(chosenDate);

    const appointments = await this.ormRepository.find({
      where: {
        providerId,
        date: Between(firstDayOfTheMonth, lastDayOfTheMonth),
      },
    });

    return appointments;
  }

  public async findAllInDayFromProvider({
    providerId,
    day,
    month,
    year,
  }: IFindAllInDayFromProviderDTO): Promise<Appointment[]> {
    const chosenDate = new Date(year, month - 1, day);
    const firstHourOfTheDay = startOfDay(chosenDate);
    const lastHourOfTheDay = endOfDay(chosenDate);

    const appointments = await this.ormRepository.find({
      where: {
        providerId,
        date: Between(firstHourOfTheDay, lastHourOfTheDay),
      },
    });

    return appointments;
  }
}

export default AppointmentsRepository;
