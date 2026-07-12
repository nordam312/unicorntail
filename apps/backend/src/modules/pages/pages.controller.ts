import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { PagesService } from './pages.service';
import { CreatePageDto } from './dto/create-page.dto';
import { UpdatePageDto } from './dto/update-page.dto';

@Controller()
export class PagesController {
  constructor(private readonly pagesService: PagesService) {}

  @Post('sites/:siteId/pages')
  create(@Param('siteId') siteId: string, @Body() dto: CreatePageDto) {
    return this.pagesService.create(siteId, dto);
  }

  @Get('sites/:siteId/pages')
  findAllBySite(@Param('siteId') siteId: string) {
    return this.pagesService.findAllBySite(siteId);
  }

  @Get('pages/:id')
  findOne(@Param('id') id: string) {
    return this.pagesService.findOne(id);
  }

  @Patch('pages/:id')
  update(@Param('id') id: string, @Body() dto: UpdatePageDto) {
    return this.pagesService.update(id, dto);
  }

  @Delete('pages/:id')
  @HttpCode(204)
  remove(@Param('id') id: string) {
    return this.pagesService.remove(id);
  }

  @Post('pages/:id/publish')
  publish(@Param('id') id: string) {
    return this.pagesService.publish(id);
  }

  @Post('pages/:id/unpublish')
  unpublish(@Param('id') id: string) {
    return this.pagesService.unpublish(id);
  }

  // Consumed by the Next.js on-demand renderer (multi-tenant resolution).
  @Get('public/sites/:subdomain/pages/:slug')
  findPublished(
    @Param('subdomain') subdomain: string,
    @Param('slug') slug: string,
  ) {
    return this.pagesService.findPublished(subdomain, slug);
  }
}
