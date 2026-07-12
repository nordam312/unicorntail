import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Prisma } from '../../generated/prisma/client';
import { CreateSiteDto } from './dto/create-site.dto';
import { UpdateSiteDto } from './dto/update-site.dto';

@Injectable()
export class SitesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateSiteDto) {
    try {
      return await this.prisma.site.create({ data: { ...dto } });
    } catch (error) {
      throw this.translateError(error);
    }
  }

  findAll() {
    return this.prisma.site.findMany({ orderBy: { createdAt: 'desc' } });
  }

  async findOne(id: string) {
    const site = await this.prisma.site.findUnique({ where: { id } });
    if (!site) {
      throw new NotFoundException(`Site "${id}" not found`);
    }
    return site;
  }

  async update(id: string, dto: UpdateSiteDto) {
    await this.findOne(id); // 404 if missing
    try {
      return await this.prisma.site.update({ where: { id }, data: { ...dto } });
    } catch (error) {
      throw this.translateError(error);
    }
  }

  async remove(id: string) {
    await this.findOne(id); // 404 if missing
    await this.prisma.site.delete({ where: { id } });
  }

  // Map Prisma's unique-constraint violation to a clean 409 response.
  private translateError(error: unknown): unknown {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === 'P2002'
    ) {
      const target = (error.meta?.target as string[] | undefined)?.join(', ');
      return new ConflictException(
        `A site with this ${target ?? 'value'} already exists`,
      );
    }
    return error;
  }
}
