// These labels are used by platform services and must never be claimed by a tenant.
export const RESERVED_SUBDOMAINS: readonly string[] = Object.freeze([
  'admin',
  'api',
  'app',
  'assets',
  'auth',
  'blog',
  'cdn',
  'dashboard',
  'docs',
  'help',
  'mail',
  'static',
  'status',
  'support',
  'www',
]);
