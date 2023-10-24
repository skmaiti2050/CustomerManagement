import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { BookingHistory } from "../../common/entities/booking-history.entity";
import { Club } from "../../common/entities/club.entity";
import { Customer } from "../../common/entities/customer.entity";

@Injectable()
export class BookingHistoryService {
  constructor(
    @InjectRepository(BookingHistory)
    private readonly bookingHistoryRepository: Repository<BookingHistory>,
    @InjectRepository(Club)
    private readonly clubRepository: Repository<Club>,
    @InjectRepository(Customer)
    private readonly customerRepository: Repository<Customer>
  ) {}

  async createBookingHistory(bookingData: Partial<BookingHistory>): Promise<BookingHistory> {
    const booking = this.bookingHistoryRepository.create(bookingData);
    const customer = await this.customerRepository.findOne({ where: { id: bookingData["customerId"] } });
    const club = await this.clubRepository.findOne({ where: { id: bookingData["clubId"] } });

    if (customer && club) {
      booking.customer = customer;
      booking.club = club;
      if (bookingData.numberOfBookings) {
        customer.numberOfBookings += bookingData.numberOfBookings;
      } else {
        customer.numberOfBookings += 1;
      }

      customer.totalSpend = (parseFloat(customer.totalSpend || "0.00") + parseFloat(bookingData.bill)).toFixed(2);
      await this.customerRepository.save(customer);
      return await this.bookingHistoryRepository.save(booking);
    } else {
      throw new NotFoundException(`Customer or Club not found.`);
    }
  }

  async getBookingHistoryById(bookingId: number): Promise<BookingHistory> {
    const booking = await this.bookingHistoryRepository.findOne({
      where: { id: bookingId },
      relations: ["customer", "club"]
    });
    if (!booking) {
      throw new NotFoundException(`Booking History with ID ${bookingId} not found.`);
    }
    return booking;
  }

  async getBookingHistoryByCustomer(customerId: number): Promise<BookingHistory[]> {
    try {
      const bookingHistories = await this.bookingHistoryRepository.find({
        where: { customer: { id: customerId } }
      });

      if (!bookingHistories || bookingHistories.length === 0) {
        throw new NotFoundException(`No booking history found for customer with ID ${customerId}.`);
      }

      return bookingHistories;
    } catch (error) {
      throw new NotFoundException(`Error while fetching booking history for customer with ID ${customerId}.`);
    }
  }

  async getBookingHistoryByClub(clubId: number): Promise<BookingHistory[]> {
    try {
      const bookingHistories = await this.bookingHistoryRepository.find({
        where: { club: { id: clubId } }
      });

      if (!bookingHistories || bookingHistories.length === 0) {
        throw new NotFoundException(`No booking history found for club with ID ${clubId}.`);
      }

      return bookingHistories;
    } catch (error) {
      throw new NotFoundException(`Error while fetching booking history for club with ID ${clubId}.`);
    }
  }

  async getAllBookingHistory(): Promise<BookingHistory[]> {
    return this.bookingHistoryRepository.find();
  }

  async updateBookingHistory(bookingId: number, bookingData: Partial<BookingHistory>): Promise<BookingHistory> {
    const booking = await this.getBookingHistoryById(bookingId);
    const oldBill: number = booking.bill as unknown as number;
    const newBill: number = (bookingData.bill || 0) as number;
    const billDifference: number = newBill - oldBill;

    const numberOfBookingsDifference: number = (bookingData.numberOfBookings || 0) - (booking.numberOfBookings || 0);

    if (billDifference !== 0 || numberOfBookingsDifference !== 0) {
      const customer = await this.customerRepository.findOne({ where: { id: booking.customer.id } });
      if (customer) {
        customer.totalSpend = (parseFloat(customer.totalSpend || "0.00") + billDifference).toFixed(2);
        customer.numberOfBookings = (customer.numberOfBookings || 0) + numberOfBookingsDifference;
        await this.customerRepository.save(customer);
      }
    }

    await this.bookingHistoryRepository.update(bookingId, bookingData);
    return this.getBookingHistoryById(bookingId);
  }

  async deleteBookingHistory(bookingId: number): Promise<void> {
    const booking = await this.getBookingHistoryById(bookingId);
    const customer = await this.customerRepository.findOne({ where: { id: booking.customer.id } });

    if (customer) {
      const billReduction = -parseFloat(booking.bill || "0.00");
      customer.totalSpend = (parseFloat(customer.totalSpend || "0.00") + billReduction).toFixed(2);
      customer.numberOfBookings = customer.numberOfBookings - booking.numberOfBookings;
      await this.customerRepository.save(customer);
    }

    await this.bookingHistoryRepository.softDelete(bookingId);
  }
}
