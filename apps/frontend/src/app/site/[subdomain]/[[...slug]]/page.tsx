import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getPublishedPage } from '@/lib/api';
import { CraftRenderer } from '@/lib/craft/renderer';

// Path with no slug segment resolves to this page (the tenant's home page).
const HOME_SLUG = 'home';

type Params = { subdomain: string; slug?: string[] };

async function resolveParams(params: Promise<Params>) {
  const { subdomain, slug } = await params;
  return { subdomain, pageSlug: slug?.join('/') || HOME_SLUG };
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { subdomain, pageSlug } = await resolveParams(params);
  const page = await getPublishedPage(subdomain, pageSlug);
  return { title: page?.title ?? 'Page not found' };
}

export default async function TenantPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { subdomain, pageSlug } = await resolveParams(params);
  const page = await getPublishedPage(subdomain, pageSlug);
  if (!page) notFound();

  return <CraftRenderer content={page.content} />;
}
