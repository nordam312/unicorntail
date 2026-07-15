// Resolve an incoming Host header to a tenant identifier for the multi-tenant
// renderer. Returns:
//   - a subdomain label   ("acme")        for *.<ROOT_DOMAIN> and *.localhost
//   - a full custom domain ("acme.com")   for anything else
//   - null                                for the app's own domain (serve the
//                                         marketing site / editor instead)
//
// The backend's public resolver matches either a site.subdomain or a
// site.customDomain, so both identifier shapes work downstream.
const ROOT_DOMAIN = (
  process.env.NEXT_PUBLIC_ROOT_DOMAIN ?? 'unicorntail.com'
).toLowerCase();

export function resolveTenant(rawHost: string | null | undefined): string | null {
  if (!rawHost) return null;
  const host = rawHost.split(':')[0].trim().toLowerCase(); // strip port
  if (!host) return null;

  // The app's own domains → no tenant.
  if (host === 'localhost' || host === '127.0.0.1') return null;
  if (host === ROOT_DOMAIN || host === `www.${ROOT_DOMAIN}`) return null;

  // Wildcard subdomains of the root domain: acme.unicorntail.com → "acme".
  const rootSuffix = `.${ROOT_DOMAIN}`;
  if (host.endsWith(rootSuffix)) {
    const label = host.slice(0, -rootSuffix.length);
    return label && label !== 'www' ? label : null;
  }

  // Local dev subdomains: acme.localhost → "acme".
  if (host.endsWith('.localhost')) {
    const label = host.slice(0, -'.localhost'.length);
    return label || null;
  }

  // Otherwise treat the whole host as a custom domain mapped 1:1 to a site.
  return host;
}
