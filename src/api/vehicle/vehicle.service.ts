import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class VehicleService {
  constructor(private readonly prisma: PrismaService) {
    this.prisma = prisma;
  }

  async create(create: CreateVehicleDto) {
    const user = await this.findByUser(create.id_user);
    if (!user) {
      throw new ConflictException('User already has a vehicle');
    }
    return this.prisma.vehicle.create({ data: { ...create } });
  }

  findAll() {
    return this.prisma.vehicle.findMany({
      include: { 
        model: {
          include: { brand: true }
        }, 
        users: true
       }
    });
  }

  async findOne(id: number) {
    const model = await this.prisma.vehicle.findUnique({ where: { id }, include: { model: true, users: true } });

    if (!model) {
      throw new NotFoundException('Brand not found');
    }
    return model;
  }

  async update(id: number, update: UpdateVehicleDto) {
    await this.findOne(id);

    return this.prisma.vehicle.update({ where: { id }, data: update });
  }

  async remove(id: number) {
    await this.findOne(id);

    return this.prisma.vehicle.update({ where: { id }, data: { state: 0 } });
  }

  async findByUser(id_user: number) {
    return this.prisma.user.findFirst({
      where: {
        id: id_user
      }
    });
  }

  async findByModel(id_model: number) {
    return this.prisma.model.findFirst({
      where: {
        id: id_model
      }
    });
  }
}
