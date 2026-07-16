import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Prisma } from '../../generated/prisma/client';
import { CreatePageDto } from './dto/create-page.dto';
import { UpdatePageDto } from './dto/update-page.dto';

@Injectable()
export class PagesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(siteId: string, dto: CreatePageDto) {
    await this.ensureSiteExists(siteId);
    try {
      return await this.prisma.page.create({
        data: {
          title: dto.title,
          slug: dto.slug,
          content: dto.content ?? {},
          siteId,
        },
      });
    } catch (error) {
      throw this.translateError(error);
    }
  }

  async findAllBySite(siteId: string) {
    await this.ensureSiteExists(siteId);
    return this.prisma.page.findMany({
      where: { siteId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string) {
    // Include the parent site so the editor can build the public preview URL
    // (subdomain / custom domain + slug) without a second request.
    const page = await this.prisma.page.findUnique({
      where: { id },
      include: { site: true },
    });
    if (!page) {
      throw new NotFoundException(`Page "${id}" not found`);
    }
    return page;
  }

  async update(id: string, dto: UpdatePageDto) {
    await this.findOne(id); // 404 if missing
    try {
      return await this.prisma.page.update({ where: { id }, data: { ...dto } });
    } catch (error) {
      throw this.translateError(error);
    }
  }

  async remove(id: string) {
    await this.findOne(id); // 404 if missing
    await this.prisma.page.delete({ where: { id } });
  }

  publish(id: string) {
    return this.setPublished(id, true);
  }

  unpublish(id: string) {
    return this.setPublished(id, false);
  }

  // Public resolver for the Next.js renderer. `host` is the tenant identifier
  // resolved by the frontend middleware: a wildcard subdomain label
  // (e.g. "acme") or a full custom domain (e.g. "acme.com"). We match either.
  async findPublished(host: string, slug: string) {
    const site = await this.prisma.site.findFirst({
      where: { OR: [{ subdomain: host }, { customDomain: host }] },
    });
    if (!site) {
      throw new NotFoundException(`Site "${host}" not found`);
    }
    const page = await this.prisma.page.findFirst({
      where: { siteId: site.id, slug, isPublished: true },
    });
    if (!page) {
      throw new NotFoundException(
        `Published page "${slug}" not found for "${host}"`,
      );
    }
    return page;
  }

  private async setPublished(id: string, isPublished: boolean) {
    await this.findOne(id); // 404 if missing
    return this.prisma.page.update({
      where: { id },
      data: {
        isPublished,
        publishedAt: isPublished ? new Date() : null,
      },
    });
  }

  private async ensureSiteExists(siteId: string) {
    const site = await this.prisma.site.findUnique({ where: { id: siteId } });
    if (!site) {
      throw new NotFoundException(`Site "${siteId}" not found`);
    }
  }

  // Map Prisma's unique-constraint violation (siteId, slug) to a clean 409.
  private translateError(error: unknown): unknown {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === 'P2002'
    ) {
      return new ConflictException(
        'A page with this slug already exists for this site',
      );
    }
    return error;
  }
}
