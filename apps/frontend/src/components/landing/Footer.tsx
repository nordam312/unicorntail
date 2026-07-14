import { Brand } from '@/components/Brand';
import { FOOTER_LINKS } from '@/lib/nav';

export function Footer() {
  return (
    <footer className="w-full bg-background border-t border-outline-variant">
      <div className="flex flex-col md:flex-row justify-between items-center py-12 px-margin-desktop max-w-[1440px] mx-auto">
        <div className="flex flex-col items-center md:items-start mb-8 md:mb-0">
          <Brand
            href={null}
            textClassName="font-headline-md text-primary font-bold"
            className="mb-2"
          />
          <p className="text-on-surface-variant text-label-sm">
            © 2026 UnicornTail Inc. Built for developers.
          </p>
        </div>
        <div className="flex gap-8">
          {FOOTER_LINKS.map((label) => (
            <a
              key={label}
              className="text-label-sm text-on-surface-variant hover:text-secondary-fixed-dim transition-colors"
              href="#"
            >
              {label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
