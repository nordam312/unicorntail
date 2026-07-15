require('ts-node/register');

const assert = require('node:assert/strict');
const test = require('node:test');
const { BadRequestException, ValidationPipe } = require('@nestjs/common');
const { validate } = require('class-validator');
const { CreateSiteDto } = require('../dto/create-site.dto');

function createSiteDto(subdomain) {
  return Object.assign(new CreateSiteDto(), {
    name: 'My site',
    subdomain,
    ownerId: 'owner-1',
  });
}

test('rejects standard reserved subdomains', async () => {
  for (const subdomain of ['admin', 'api', 'www', 'mail', 'docs', 'app']) {
    const errors = await validate(createSiteDto(subdomain));
    const subdomainError = errors.find((error) => error.property === 'subdomain');

    assert.equal(
      subdomainError?.constraints?.isNotReservedSubdomain,
      `subdomain "${subdomain}" is reserved and cannot be used`,
    );
  }
});

test('checks reserved subdomains case-insensitively', async () => {
  const errors = await validate(createSiteDto('API'));
  const subdomainError = errors.find((error) => error.property === 'subdomain');

  assert.equal(
    subdomainError?.constraints?.isNotReservedSubdomain,
    'subdomain "API" is reserved and cannot be used',
  );
});

test('allows tenant-owned subdomains', async () => {
  const errors = await validate(createSiteDto('my-portfolio'));

  assert.deepEqual(errors, []);
});

test('produces a clear HTTP 400 response for a reserved subdomain', async () => {
  const pipe = new ValidationPipe({ transform: true });

  await assert.rejects(
    () =>
      pipe.transform(
        {
          name: 'My site',
          subdomain: 'admin',
          ownerId: 'owner-1',
        },
        { type: 'body', metatype: CreateSiteDto },
      ),
    (error) => {
      assert.ok(error instanceof BadRequestException);
      assert.equal(error.getStatus(), 400);
      assert.ok(
        error
          .getResponse()
          .message.includes('subdomain "admin" is reserved and cannot be used'),
      );
      return true;
    },
  );
});
