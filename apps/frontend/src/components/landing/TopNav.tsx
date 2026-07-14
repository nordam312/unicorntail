import Link from 'next/link';
import { Brand } from '@/components/Brand';
import { NAV_LINKS } from '@/lib/nav';

export function TopNav() {
  return (
    <nav className="w-full top-0 sticky bg-background border-b border-outline-variant z-50">
      <div className="flex justify-between items-center h-16 px-margin-desktop max-w-[1440px] mx-auto">
        <div className="flex items-center gap-8">
          <Brand
            href="/"
            textClassName="font-headline-md text-headline-md font-bold text-primary tracking-tight"
          />
          <div className="hidden md:flex items-center gap-6">
            {NAV_LINKS.map((label, i) => (
              <a
                key={label}
                className={
                  i === 0
                    ? 'text-body-md text-primary border-b-2 border-primary-fixed-dim pb-1 transition-colors duration-200'
                    : 'text-body-md text-on-surface-variant hover:text-primary transition-colors duration-200'
                }
                href="#"
              >
                {label}
              </a>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Link
            href="/login"
            className="text-body-md text-on-surface-variant hover:text-primary transition-colors duration-200 px-4 py-2"
          >
            Log In
          </Link>
          <button className="neon-gradient-bg text-on-primary-fixed px-5 py-2 rounded font-body-md font-semibold transition-transform active:scale-95">
            Sign Up
          </button>
        </div>
      </div>
    </nav>
  );
}
