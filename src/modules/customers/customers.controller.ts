import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiTags } from "@nestjs/swagger";
import { Customer } from "../../common/entities/customer.entity";
import { CustomersService } from "./customers.service";
import { CreateCustomerDto } from "./dto/create-customer.dto";
import { UpdateCustomerDto } from "./dto/update-customer.dto";

@ApiTags("Customer")
@ApiBearerAuth("access-token")
@Controller("customers")
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}

  @ApiOperation({ summary: "Create a new customer" })
  @ApiBody({ type: CreateCustomerDto })
  @Post()
  async createCustomer(@Body() customerData: CreateCustomerDto): Promise<Customer> {
    return this.customersService.createCustomer(customerData);
  }

  @ApiOperation({ summary: "Get all customers" })
  @Get()
  async getAllCustomers(): Promise<Customer[]> {
    return this.customersService.getAllCustomers();
  }

  @ApiOperation({ summary: "Get a specific customer by ID" })
  @ApiParam({ name: "id", type: "number", description: "Customer ID" })
  @Get(":id")
  async getCustomerById(@Param("id") id: number): Promise<Customer> {
    return this.customersService.getCustomerById(id);
  }

  @ApiOperation({ summary: "Update a specific customer by ID" })
  @ApiParam({ name: "id", type: "number", description: "Customer ID" })
  @ApiBody({ type: UpdateCustomerDto })
  @Patch(":id")
  async updateCustomer(@Param("id") id: number, @Body() customerData: UpdateCustomerDto): Promise<Customer> {
    return this.customersService.updateCustomer(id, customerData);
  }

  @ApiOperation({ summary: "Delete a specific customer by ID" })
  @ApiParam({ name: "id", type: "number", description: "Customer ID" })
  @Delete(":id")
  async deleteCustomer(@Param("id") id: number): Promise<void> {
    return this.customersService.deleteCustomer(id);
  }
}
