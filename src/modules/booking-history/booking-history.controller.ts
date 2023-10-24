import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from "@nestjs/common";
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags } from "@nestjs/swagger";
import { BookingHistory } from "../../common/entities/booking-history.entity";
import { BookingHistoryService } from "./booking-history.service";
import { CreateBookingHistoryDto } from "./dto/create-booking-history.dto";
import { UpdateBookingHistoryDto } from "./dto/update-booking-history.dto";

@ApiTags("Booking History")
@ApiBearerAuth("access-token")
@Controller("booking-history")
export class BookingHistoryController {
  constructor(private readonly bookingHistoryService: BookingHistoryService) {}

  @ApiOperation({ summary: "Create a new booking history" })
  @ApiBody({ type: CreateBookingHistoryDto })
  @Post()
  async createBookingHistory(@Body() bookingData: CreateBookingHistoryDto): Promise<BookingHistory> {
    return this.bookingHistoryService.createBookingHistory(bookingData);
  }

  @ApiOperation({ summary: "Get all booking histories" })
  @Get()
  async getAllBookingHistory(): Promise<BookingHistory[]> {
    return this.bookingHistoryService.getAllBookingHistory();
  }

  @ApiOperation({ summary: "Get booking history by customer" })
  @ApiQuery({ name: "customerId", type: Number, description: "Customer ID" })
  @ApiResponse({ status: 200, description: "OK", type: [BookingHistory] })
  @Get("by-customer")
  async getBookingHistoryByCustomer(@Query("customerId") customerId: number): Promise<BookingHistory[]> {
    return this.bookingHistoryService.getBookingHistoryByCustomer(customerId);
  }

  @ApiOperation({ summary: "Get booking history for a specific club" })
  @ApiQuery({ name: "clubId", required: true, type: Number, description: "Club ID" })
  @Get("by-club")
  async getBookingHistoryByClub(@Query("clubId") clubId: number): Promise<BookingHistory[]> {
    return this.bookingHistoryService.getBookingHistoryByClub(clubId);
  }

  @ApiOperation({ summary: "Get a specific booking history by ID" })
  @ApiParam({ name: "id", type: "number", description: "Booking History ID" })
  @Get(":id")
  async getBookingHistoryById(@Param("id") id: number): Promise<BookingHistory> {
    return this.bookingHistoryService.getBookingHistoryById(id);
  }

  @ApiOperation({ summary: "Update a specific booking history by ID" })
  @ApiParam({ name: "id", type: "number", description: "Booking History ID" })
  @ApiBody({ type: UpdateBookingHistoryDto })
  @Patch(":id")
  async updateBookingHistory(
    @Param("id") id: number,
    @Body() bookingData: UpdateBookingHistoryDto
  ): Promise<BookingHistory> {
    return this.bookingHistoryService.updateBookingHistory(id, bookingData);
  }

  @ApiOperation({ summary: "Delete a specific booking history by ID" })
  @ApiParam({ name: "id", type: "number", description: "Booking History ID" })
  @Delete(":id")
  async deleteBookingHistory(@Param("id") id: number): Promise<void> {
    return this.bookingHistoryService.deleteBookingHistory(id);
  }
}
