import Link from 'next/link';
import { Icon } from '@/components/Icon';
import { GithubIcon } from '@/components/GithubIcon';

const WORKSPACE_TABS = [
  { label: 'Drafts', active: true },
  { label: 'Templates', active: false },
  { label: 'Team', active: false },
];

export function TopBar() {
  return (
    <header className="fixed top-0 left-0 w-full h-14 z-50 flex items-center justify-between px-6 bg-surface-container-lowest border-b border-outline-variant">
      <div className="flex items-center gap-8">
        <Link
          href="/"
          className="font-headline-md text-headline-md font-bold text-primary-fixed-dim tracking-tighter flex items-center gap-2"
        >
          <span>🦄 UnicornTail</span>
        </Link>
        <div className="flex items-center gap-4 font-label-md">
          <nav className="flex items-center gap-6">
            {WORKSPACE_TABS.map((tab) => (
              <a
                key={tab.label}
                href="#"
                className={
                  tab.active
                    ? 'text-on-surface border-b-2 border-primary-fixed-dim pb-1'
                    : 'text-on-surface-variant hover:text-on-surface transition-colors'
                }
              >
                {tab.label}
              </a>
            ))}
          </nav>
          <span className="px-2 py-0.5 bg-surface-container-highest rounded text-[10px] text-primary-fixed-dim border border-primary-fixed-dim/20">
            DRAFT
          </span>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button className="flex items-center gap-2 px-3 py-1.5 rounded border border-outline-variant text-on-surface-variant hover:bg-surface-container-low transition-all active:scale-95 duration-200">
          <Icon name="terminal" className="text-sm" />
          <span className="font-label-sm text-label-sm">Preview</span>
        </button>
        <button className="flex items-center gap-2 px-4 py-1.5 rounded neon-gradient-btn text-on-primary-fixed font-bold text-label-sm active:scale-95 duration-200">
          <span>Publish</span>
        </button>
        <button className="flex items-center gap-2 px-3 py-1.5 rounded border border-outline-variant text-on-surface-variant hover:bg-surface-container-low transition-all active:scale-95 duration-200">
          <GithubIcon className="w-4 h-4 fill-current" />
          <span className="font-label-sm text-label-sm">Export</span>
        </button>
        <div className="w-8 h-8 rounded-full border border-outline-variant overflow-hidden ml-2 bg-surface-container-highest flex items-center justify-center">
          <Icon name="person" filled className="text-on-surface-variant text-lg" />
        </div>
      </div>
    </header>
  );
}
