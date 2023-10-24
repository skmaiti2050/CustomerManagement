import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Club } from "../../common/entities/club.entity";

@Injectable()
export class ClubsService {
  constructor(
    @InjectRepository(Club)
    private readonly clubRepository: Repository<Club>
  ) {}

  async createClub(clubData: Partial<Club>): Promise<Club> {
    const club = this.clubRepository.create(clubData);
    return this.clubRepository.save(club);
  }

  async getClubById(clubId: number): Promise<Club> {
    const club = await this.clubRepository.findOne({ where: { id: clubId } });
    if (!club) {
      throw new NotFoundException(`Club with ID ${clubId} not found.`);
    }
    return club;
  }

  async getAllClubs(): Promise<Club[]> {
    return this.clubRepository.find();
  }

  async updateClub(clubId: number, clubData: Partial<Club>): Promise<Club> {
    await this.getClubById(clubId);
    await this.clubRepository.update(clubId, clubData);
    return this.getClubById(clubId);
  }

  async deleteClub(clubId: number): Promise<void> {
    await this.getClubById(clubId);
    await this.clubRepository.softDelete(clubId);
  }
}
