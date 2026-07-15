import type { ComponentType, CSSProperties, ReactNode } from 'react';

// ---------------------------------------------------------------------------
// Component registry
//
// Maps a Craft.js `resolvedName` to a presentational, server-renderable React
// component. This is the shared contract between the on-demand renderer (this
// step) and the Step-5 drag-and-drop editor: whatever the editor lets a user
// drop must resolve to a component here, and both sides agree on prop names.
//
// IMPORTANT: these render the END USER'S published page, not the UnicornTail
// app chrome — so styling is intentionally neutral/portable Tailwind (no
// Obsidian Prism tokens). User-supplied colours go through inline styles;
// layout uses plain Tailwind utilities. Everything is a Server Component.
// ---------------------------------------------------------------------------

type CraftProps = Record<string, unknown> & { children?: ReactNode };

const ALIGN_CLASS: Record<string, string> = {
  left: 'text-left',
  center: 'text-center',
  right: 'text-right',
};

const MAX_WIDTH_CLASS: Record<string, string> = {
  sm: 'max-w-screen-sm',
  md: 'max-w-screen-md',
  lg: 'max-w-screen-lg',
  xl: 'max-w-screen-xl',
  full: 'max-w-none',
};

const GRID_COLS: Record<number, string> = {
  1: 'grid-cols-1',
  2: 'grid-cols-1 sm:grid-cols-2',
  3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
  4: 'grid-cols-2 lg:grid-cols-4',
};

const str = (v: unknown, fallback = ''): string =>
  typeof v === 'string' ? v : fallback;

const cx = (...parts: Array<string | false | undefined>): string =>
  parts.filter(Boolean).join(' ');

const colorStyle = (props: CraftProps): CSSProperties => {
  const style: CSSProperties = {};
  if (typeof props.background === 'string') style.background = props.background;
  if (typeof props.color === 'string') style.color = props.color;
  return style;
};

// --- Container / ROOT: the page shell -------------------------------------
function Container({ children, align, maxWidth, padding, ...rest }: CraftProps) {
  return (
    <div
      className={cx(
        'mx-auto w-full',
        MAX_WIDTH_CLASS[str(maxWidth, 'lg')] ?? MAX_WIDTH_CLASS.lg,
        ALIGN_CLASS[str(align)],
        str(padding, 'px-6 py-12'),
      )}
      style={colorStyle(rest)}
    >
      {children}
    </div>
  );
}

// --- Section: a full-width band -------------------------------------------
function Section({ children, padding, ...rest }: CraftProps) {
  return (
    <section
      className={cx('w-full', str(padding, 'px-6 py-16'))}
      style={colorStyle(rest)}
    >
      {children}
    </section>
  );
}

// --- Grid: responsive columns ---------------------------------------------
function Grid({ children, columns, gap }: CraftProps) {
  const cols = Math.min(4, Math.max(1, Number(columns) || 2));
  return (
    <div className={cx('grid', GRID_COLS[cols], str(gap, 'gap-6'))}>
      {children}
    </div>
  );
}

// --- Heading ---------------------------------------------------------------
const HEADING_SIZE: Record<number, string> = {
  1: 'text-4xl md:text-5xl font-bold tracking-tight',
  2: 'text-3xl md:text-4xl font-bold tracking-tight',
  3: 'text-2xl md:text-3xl font-semibold',
  4: 'text-xl md:text-2xl font-semibold',
  5: 'text-lg font-semibold',
  6: 'text-base font-semibold uppercase tracking-wide',
};

function Heading({ text, level, align, ...rest }: CraftProps) {
  const lvl = Math.min(6, Math.max(1, Number(level) || 2));
  const Tag = `h${lvl}` as 'h1';
  return (
    <Tag
      className={cx(HEADING_SIZE[lvl], ALIGN_CLASS[str(align)])}
      style={colorStyle(rest)}
    >
      {str(text, 'Heading')}
    </Tag>
  );
}

// --- Text (paragraph) ------------------------------------------------------
function Text({ text, align, ...rest }: CraftProps) {
  return (
    <p
      className={cx('leading-relaxed', ALIGN_CLASS[str(align)])}
      style={colorStyle(rest)}
    >
      {str(text)}
    </p>
  );
}

// --- Button (rendered as a link — published pages are static) --------------
const BUTTON_VARIANT: Record<string, string> = {
  primary: 'bg-slate-900 text-white hover:bg-slate-700',
  secondary:
    'bg-white text-slate-900 ring-1 ring-inset ring-slate-300 hover:bg-slate-50',
};

function Button({ text, href, variant }: CraftProps) {
  const cls = BUTTON_VARIANT[str(variant, 'primary')] ?? BUTTON_VARIANT.primary;
  return (
    <a
      href={str(href, '#')}
      className={cx(
        'inline-block rounded-md px-5 py-2.5 text-sm font-medium transition-colors',
        cls,
      )}
    >
      {str(text, 'Button')}
    </a>
  );
}

// --- Image -----------------------------------------------------------------
function Image({ src, alt, width, rounded }: CraftProps) {
  if (!str(src)) return null;
  const style: CSSProperties = {};
  if (typeof width === 'string' || typeof width === 'number') {
    style.width = typeof width === 'number' ? `${width}px` : width;
  }
  // eslint-disable-next-line @next/next/no-img-element
  return (
    <img
      src={str(src)}
      alt={str(alt)}
      style={style}
      className={cx('h-auto max-w-full', rounded ? 'rounded-lg' : undefined)}
    />
  );
}

// --- Fallback for unknown component names ----------------------------------
function Fallback({ children }: CraftProps) {
  return <div>{children}</div>;
}

const REGISTRY: Record<string, ComponentType<CraftProps>> = {
  ROOT: Container,
  Container,
  Section,
  Grid,
  Heading,
  Text,
  Button,
  Image,
};

export function resolveComponent(
  name: string | undefined,
): ComponentType<CraftProps> {
  return (name && REGISTRY[name]) || Fallback;
}
