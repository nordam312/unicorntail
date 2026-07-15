// Neutral canvas for rendered tenant pages. The app's root layout paints a dark
// (Obsidian Prism) chrome; published pages are the end user's content, so this
// layout resets to a clean, light, full-bleed surface that covers it.
//
// NOTE: a fuller isolation (separate <html> per tenant via route-group root
// layouts) can come later if per-tenant fonts/themes are needed.
export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-white font-sans text-slate-900 antialiased">
      {children}
    </div>
  );
}
