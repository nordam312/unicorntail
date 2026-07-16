// Browser-side client for the Pages API (editor load/save/publish). Runs in the
// client, so it targets the PUBLIC base URL the browser can reach.

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3001';

export interface EditorSite {
  id: string;
  subdomain: string;
  customDomain: string | null;
}

export interface EditorPage {
  id: string;
  title: string;
  slug: string;
  isPublished: boolean;
  content: unknown;
  site?: EditorSite;
}

async function json<T>(res: Response): Promise<T> {
  if (!res.ok) {
    let detail = '';
    try {
      const body = (await res.json()) as { message?: string | string[] };
      detail = Array.isArray(body.message)
        ? body.message.join(', ')
        : (body.message ?? '');
    } catch {
      /* non-JSON error body */
    }
    throw new Error(detail || `${res.status} ${res.statusText}`);
  }
  return res.json() as Promise<T>;
}

export function fetchPage(id: string): Promise<EditorPage> {
  return fetch(`${API_URL}/pages/${id}`, { cache: 'no-store' }).then((r) =>
    json<EditorPage>(r),
  );
}

export function savePageContent(
  id: string,
  content: unknown,
): Promise<EditorPage> {
  return fetch(`${API_URL}/pages/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ content }),
  }).then((r) => json<EditorPage>(r));
}

export function setPagePublished(
  id: string,
  publish: boolean,
): Promise<EditorPage> {
  return fetch(`${API_URL}/pages/${id}/${publish ? 'publish' : 'unpublish'}`, {
    method: 'POST',
  }).then((r) => json<EditorPage>(r));
}
