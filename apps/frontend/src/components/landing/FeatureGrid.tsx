import { Icon } from '@/components/Icon';

type Feature = {
  icon: string;
  title: string;
  body: string;
  // Tailwind classes for the accent used on hover border + icon chip.
  accentBorder: string;
  accentBar: string;
  chipBg: string;
  chipBorder: string;
  iconColor: string;
};

const FEATURES: Feature[] = [
  {
    icon: 'drag_pan',
    title: 'Visual Drag & Drop',
    body: 'Advanced layout engine that translates visual movements into clean React components.',
    accentBorder: 'hover:border-primary-fixed-dim/50',
    accentBar: 'from-primary-fixed-dim',
    chipBg: 'bg-primary-fixed-dim/10',
    chipBorder: 'border-primary-fixed-dim/20',
    iconColor: 'text-primary-fixed-dim',
  },
  {
    icon: 'terminal',
    title: 'Next.js Compilation',
    body: 'Optimized output for Next.js App Router, leveraging Server Components by default.',
    accentBorder: 'hover:border-secondary-fixed-dim/50',
    accentBar: 'from-secondary-fixed-dim',
    chipBg: 'bg-secondary-fixed-dim/10',
    chipBorder: 'border-secondary-fixed-dim/20',
    iconColor: 'text-secondary-fixed-dim',
  },
  {
    icon: 'sync',
    title: 'GitHub OAuth Sync',
    body: 'Continuous delivery pipeline that pushes PRs directly to your repository on save.',
    accentBorder: 'hover:border-secondary/50',
    accentBar: 'from-secondary',
    chipBg: 'bg-secondary/10',
    chipBorder: 'border-secondary/20',
    iconColor: 'text-secondary',
  },
  {
    icon: 'public',
    title: 'Public Development',
    body: 'Transparent roadmap and open source core ensure your data and projects are always yours.',
    accentBorder: 'hover:border-surface-bright/50',
    accentBar: 'from-surface-bright',
    chipBg: 'bg-surface-bright/10',
    chipBorder: 'border-surface-bright/20',
    iconColor: 'text-on-surface-variant',
  },
];

export function FeatureGrid() {
  return (
    <section className="py-24 px-margin-mobile md:px-margin-desktop max-w-[1440px] mx-auto border-t border-outline-variant">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-gutter">
        {FEATURES.map((f) => (
          <div
            key={f.title}
            className={`group p-6 rounded-lg border border-outline-variant bg-surface-container-low transition-all duration-300 relative overflow-hidden ${f.accentBorder}`}
          >
            <div
              className={`absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r to-transparent opacity-0 group-hover:opacity-100 transition-opacity ${f.accentBar}`}
            />
            <div
              className={`w-12 h-12 rounded flex items-center justify-center mb-6 border ${f.chipBg} ${f.chipBorder}`}
            >
              <Icon name={f.icon} className={f.iconColor} />
            </div>
            <h3 className="font-headline-md text-primary mb-3">{f.title}</h3>
            <p className="text-body-md text-on-surface-variant leading-relaxed">
              {f.body}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
