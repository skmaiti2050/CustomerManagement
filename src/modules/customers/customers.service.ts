import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Customer } from "../../common/entities/customer.entity";

@Injectable()
export class CustomersService {
  constructor(
    @InjectRepository(Customer)
    private readonly customerRepository: Repository<Customer>
  ) {}

  async createCustomer(customerData: Partial<Customer>): Promise<Customer> {
    const customer = this.customerRepository.create(customerData);
    return this.customerRepository.save(customer);
  }

  async getCustomerById(customerId: number): Promise<Customer> {
    const customer = await this.customerRepository.findOne({ where: { id: customerId } });
    if (!customer) {
      throw new NotFoundException(`Customer with ID ${customerId} not found.`);
    }
    return customer;
  }

  async getAllCustomers(): Promise<Customer[]> {
    return this.customerRepository.find();
  }

  async updateCustomer(customerId: number, customerData: Partial<Customer>): Promise<Customer> {
    await this.getCustomerById(customerId);
    await this.customerRepository.update(customerId, customerData);
    return this.getCustomerById(customerId);
  }

  async deleteCustomer(customerId: number): Promise<void> {
    await this.getCustomerById(customerId);
    await this.customerRepository.softDelete(customerId);
  }
}
