import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { RESERVED_SUBDOMAINS } from '../constants/reserved-subdomains';

@ValidatorConstraint({ name: 'isNotReservedSubdomain', async: false })
export class IsNotReservedSubdomainConstraint
  implements ValidatorConstraintInterface
{
  validate(value: unknown): boolean {
    // Let the DTO's type and format validators report non-string values.
    return (
      typeof value !== 'string' ||
      !RESERVED_SUBDOMAINS.includes(value.toLowerCase())
    );
  }

  defaultMessage(args: ValidationArguments): string {
    return `${args.property} "${args.value}" is reserved and cannot be used`;
  }
}

/** Reject subdomains used by UnicornTail's own platform routes. */
export function IsNotReservedSubdomain(
  validationOptions?: ValidationOptions,
) {
  return (object: object, propertyName: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      validator: IsNotReservedSubdomainConstraint,
    });
  };
}
