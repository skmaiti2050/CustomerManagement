import { BadRequestException, ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { hashSync } from "bcryptjs";
import { generate } from "generate-password";
import { QueryFailedError, Repository } from "typeorm";
import { User } from "../../common/entities/user.entity";
import { sendEmail } from "../../common/utility/send-email";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    public userRepo: Repository<User>
  ) {}

  async createUser(createUserDto: CreateUserDto) {
    try {
      const password = generate({ length: 15, numbers: true });
      const hashedPassword = hashSync(password);
      createUserDto.password = hashedPassword;
      const result = await this.userRepo.save(createUserDto);

      await sendEmail(
        createUserDto.email,
        "Welcome",
        "",
        `<h3>Hello ${createUserDto.firstName}!</h3>
         <p>Thank you for joining our app. Here is the generated password: ${password}</p>
         <p>For security reasons, please change your password as soon as possible.</p>
         <p>Regards,</p>
         <p>Sujit Maiti</p>`
      );

      return result;
    } catch (error) {
      if (
        error instanceof QueryFailedError &&
        error.message.includes("duplicate key value violates unique constraint")
      ) {
        throw new ConflictException(`User with this email ${createUserDto.email} already exists.`);
      } else {
        throw error;
      }
    }
  }

  async findAll(filters: UpdateUserDto) {
    try {
      const query = this.userRepo.createQueryBuilder("user");
      if (filters.email) {
        query.andWhere("user.email ILIKE :email", {
          email: `%${filters.email}%`
        });
      }
      if (filters.firstName) {
        query.andWhere("user.firstName ILIKE :firstName", {
          firstName: `%${filters.firstName}%`
        });
      }
      if (filters.lastName) {
        query.andWhere("user.lastName ILIKE :lastName", {
          lastName: `%${filters.lastName}%`
        });
      }

      const users = await query.getMany();
      return users;
    } catch (error) {
      throw error;
    }
  }

  async getUser(email: string) {
    const user = await this.userRepo.findOne({ where: { email } });
    if (!user) {
      throw new NotFoundException(`User with email ${email} not found.`);
    }
    return user;
  }

  async updateUser(updateUserDto: UpdateUserDto) {
    if (!updateUserDto.email) {
      throw new BadRequestException("Email is required for updating a user.");
    }

    const email = updateUserDto.email;
    const existingUser = await this.userRepo.findOne({ where: { email } });

    if (!existingUser) {
      throw new NotFoundException(`User with email ${email} not found.`);
    }

    await this.userRepo.update(existingUser.id, updateUserDto);
    const updatedUser = await this.userRepo.findOne({ where: { id: existingUser.id } });
    return updatedUser;
  }

  async removeUser(email: string, requestingUser: User) {
    if (email === requestingUser.email) {
      throw new BadRequestException("A user cannot delete their own account.");
    }

    const userToDelete = await this.userRepo.findOne({ where: { email } });
    if (!userToDelete) {
      throw new NotFoundException(`User with email ${email} not found.`);
    }

    return this.userRepo.softDelete({ email });
  }
}
