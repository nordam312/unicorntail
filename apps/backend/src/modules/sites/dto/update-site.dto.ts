import { OmitType, PartialType } from '@nestjs/mapped-types';
import { CreateSiteDto } from './create-site.dto';

// All fields optional, except ownership cannot be reassigned via update.
export class UpdateSiteDto extends PartialType(
  OmitType(CreateSiteDto, ['ownerId'] as const),
) {}
