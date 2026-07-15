// Server-side data access for the on-demand renderer.
//
// Inside Docker the browser-facing NEXT_PUBLIC_API_URL (localhost:3001) is NOT
// reachable from the frontend container, so server fetches use API_INTERNAL_URL
// (the compose service name, http://backend:3001). Falls back to the public URL
// for host-only dev.
const API_URL =
  process.env.API_INTERNAL_URL ??
  process.env.NEXT_PUBLIC_API_URL ??
  'http://localhost:3001';

export interface PublishedPage {
  id: string;
  title: string;
  slug: string;
  content: unknown; // Craft.js serialized tree (JSONB)
  isPublished: boolean;
  publishedAt: string | null;
  siteId: string;
}

// Fetch a published page by tenant (subdomain or custom domain) + slug.
// Returns null on 404 so callers can render a not-found page.
export async function getPublishedPage(
  tenant: string,
  slug: string,
): Promise<PublishedPage | null> {
  const res = await fetch(
    `${API_URL}/public/sites/${encodeURIComponent(tenant)}/pages/${encodeURIComponent(slug)}`,
    { next: { revalidate: 30 } },
  );

  if (res.status === 404) return null;
  if (!res.ok) {
    throw new Error(
      `Renderer fetch failed (${res.status}) for ${tenant}/${slug}`,
    );
  }
  return (await res.json()) as PublishedPage;
}
