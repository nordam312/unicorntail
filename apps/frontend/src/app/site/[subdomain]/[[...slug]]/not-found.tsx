// Shown when a tenant page is missing or unpublished. Rendered inside the
// neutral SiteLayout, so it stays on the visitor's (light) surface rather than
// the UnicornTail app chrome.
export default function TenantNotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-3 px-6 text-center">
      <p className="text-sm font-medium uppercase tracking-widest text-slate-400">
        404
      </p>
      <h1 className="text-2xl font-semibold text-slate-900">Page not found</h1>
      <p className="max-w-md text-slate-500">
        This page doesn&apos;t exist or hasn&apos;t been published yet.
      </p>
    </div>
  );
}
