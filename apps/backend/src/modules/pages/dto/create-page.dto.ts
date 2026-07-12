import {
  IsObject,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { Prisma } from '../../../generated/prisma/client';

export class CreatePageDto {
  @IsString()
  @MinLength(1)
  @MaxLength(200)
  title: string;

  // URL-safe kebab-case slug, unique per site (e.g. "about-us").
  @IsString()
  @Matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
    message: 'slug must be lowercase kebab-case (e.g. "about-us")',
  })
  slug: string;

  // The Craft.js serialized component tree (JSONB). Optional on create.
  @IsOptional()
  @IsObject()
  content?: Prisma.InputJsonValue;
}
