import { PartialType } from '@nestjs/mapped-types';
import { CreatePageDto } from './create-page.dto';

// All fields optional. Publish state is changed via dedicated endpoints,
// not through a generic update.
export class UpdatePageDto extends PartialType(CreatePageDto) {}
