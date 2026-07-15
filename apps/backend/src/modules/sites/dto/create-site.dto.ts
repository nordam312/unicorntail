import {
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { IsNotReservedSubdomain } from '../validators/is-not-reserved-subdomain.validator';

export class CreateSiteDto {
  @IsString()
  @MinLength(1)
  @MaxLength(120)
  name: string;

  // A wildcard subdomain label: lowercase alphanumeric with optional hyphens.
  @IsString()
  @Matches(/^[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?$/, {
    message:
      'subdomain must be lowercase alphanumeric, may contain hyphens, and cannot start/end with a hyphen',
  })
  @IsNotReservedSubdomain()
  subdomain: string;

  @IsOptional()
  @IsString()
  @MaxLength(253)
  customDomain?: string;

  // TEMPORARY: supplied by the client until GitHub OAuth (NextAuth) wires the
  // owner from the authenticated session in a later step.
  @IsString()
  ownerId: string;
}
