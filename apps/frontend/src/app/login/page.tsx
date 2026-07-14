import type { Metadata } from 'next';
import { Icon } from '@/components/Icon';
import { Brand } from '@/components/Brand';
import { AuthCard } from '@/components/login/AuthCard';
import { NAV_LINKS, FOOTER_LINKS } from '@/lib/nav';

export const metadata: Metadata = {
  title: 'Sign In | UnicornTail',
};

export default function LoginPage() {
  return (
    <div className="bg-background flex flex-col min-h-screen font-body-md text-on-background">
      {/* Header */}
      <header className="w-full top-0 sticky bg-background border-b border-outline-variant z-50">
        <div className="flex justify-between items-center h-16 px-margin-desktop max-w-container-max mx-auto">
          <Brand
            href="/"
            textClassName="font-headline-md text-headline-md font-bold text-on-surface tracking-tight"
          />
          <nav className="hidden md:flex gap-8 items-center">
            {NAV_LINKS.map((label) => (
              <a
                key={label}
                className="text-on-surface-variant hover:text-primary-fixed-dim transition-colors duration-200"
                href="#"
              >
                {label}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-4">
            <button className="text-on-surface-variant hover:text-primary-fixed-dim transition-colors">
              Log In
            </button>
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="flex-grow flex items-center justify-center px-margin-mobile md:px-margin-desktop relative overflow-hidden bg-surface">
        {/* Atmospheric background */}
        <div className="absolute inset-0 z-0 pointer-events-none opacity-10 bg-[radial-gradient(circle_at_50%_50%,#85d3dc22_0%,transparent_50%)]" />

        <AuthCard />

        {/* Contextual visual detail */}
        <div className="absolute bottom-12 right-12 hidden lg:block opacity-60">
          <div className="bg-surface-container border border-outline-variant p-4 rounded-xl flex items-center gap-md shadow-lg">
            <div className="w-10 h-10 rounded-full bg-surface-container-highest overflow-hidden border border-outline flex items-center justify-center">
              <Icon name="person" filled className="text-on-surface-variant" />
            </div>
            <div>
              <p className="font-label-sm text-primary-fixed-dim">Recent Magic</p>
              <p className="text-on-surface font-medium">
                New SaaS template deployed
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full bg-background border-t border-outline-variant">
        <div className="flex flex-col md:flex-row justify-between items-center py-8 px-margin-desktop max-w-container-max mx-auto gap-4">
          <Brand
            href={null}
            textClassName="font-headline-md text-headline-md text-on-surface font-bold tracking-tight"
          />
          <p className="text-sm text-on-surface-variant text-center md:text-left">
            © 2026 UnicornTail Inc. Built for developers.
          </p>
          <div className="flex gap-6">
            {FOOTER_LINKS.map((label) => (
              <a
                key={label}
                className="text-sm text-on-surface-variant hover:text-secondary-fixed-dim transition-colors"
                href="#"
              >
                {label}
              </a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
