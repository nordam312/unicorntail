'use client';

// ---------------------------------------------------------------------------
// Editor user-components (Craft.js)
//
// These are the DRAG-AND-DROP editable twins of the server-side registry in
// `src/lib/craft/registry.tsx`. They MUST serialize to the exact same prop
// names + resolvedName strings, so a page rendered in this editor looks
// identical when published through the on-demand renderer.
//
// `src/lib/craft/registry.tsx` is the source of truth for the class maps below;
// they are mirrored here (not imported) because these components are client
// components that attach Craft connectors/refs, whereas the registry renders
// neutral Server Components. Keep the two in sync.
// ---------------------------------------------------------------------------

import type { CSSProperties, ReactNode } from 'react';
import { useNode, type UserComponent } from '@craftjs/core';
import {
  ColorField,
  ControlGroup,
  NumberField,
  SelectField,
  TextField,
  ToggleField,
} from './controls';

// --- shared style maps (mirror of registry.tsx) ----------------------------
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
const HEADING_SIZE: Record<number, string> = {
  1: 'text-4xl md:text-5xl font-bold tracking-tight',
  2: 'text-3xl md:text-4xl font-bold tracking-tight',
  3: 'text-2xl md:text-3xl font-semibold',
  4: 'text-xl md:text-2xl font-semibold',
  5: 'text-lg font-semibold',
  6: 'text-base font-semibold uppercase tracking-wide',
};
const BUTTON_VARIANT: Record<string, string> = {
  primary: 'bg-slate-900 text-white hover:bg-slate-700',
  secondary:
    'bg-white text-slate-900 ring-1 ring-inset ring-slate-300 hover:bg-slate-50',
};

// User-friendly presets that map onto the Tailwind class strings the SSR
// renderer expects for `padding` / `gap`.
const PADDING_OPTIONS = [
  { label: 'None', value: 'px-0 py-0' },
  { label: 'Small', value: 'px-4 py-6' },
  { label: 'Medium', value: 'px-6 py-12' },
  { label: 'Large', value: 'px-8 py-20' },
  { label: 'X-Large', value: 'px-8 py-32' },
] as const;
const GAP_OPTIONS = [
  { label: 'Tight', value: 'gap-2' },
  { label: 'Snug', value: 'gap-4' },
  { label: 'Normal', value: 'gap-6' },
  { label: 'Roomy', value: 'gap-8' },
  { label: 'Wide', value: 'gap-12' },
] as const;
const ALIGN_OPTIONS = [
  { label: 'Left', value: 'left' },
  { label: 'Center', value: 'center' },
  { label: 'Right', value: 'right' },
] as const;
const MAX_WIDTH_OPTIONS = [
  { label: 'Small', value: 'sm' },
  { label: 'Medium', value: 'md' },
  { label: 'Large', value: 'lg' },
  { label: 'X-Large', value: 'xl' },
  { label: 'Full', value: 'full' },
] as const;

const str = (v: unknown, fallback = ''): string =>
  typeof v === 'string' ? v : fallback;
const cx = (...parts: Array<string | false | undefined>): string =>
  parts.filter(Boolean).join(' ');
const colorStyle = (background?: string, color?: string): CSSProperties => {
  const style: CSSProperties = {};
  if (background) style.background = background;
  if (color) style.color = color;
  return style;
};

// Selection/hover outline shared by every editable node.
function useOutline() {
  const { selected, hovered } = useNode((node) => ({
    selected: node.events.selected,
    hovered: node.events.hovered,
  }));
  return cx(
    'transition-shadow',
    selected
      ? 'outline outline-2 outline-secondary-fixed-dim'
      : hovered
        ? 'outline-dashed outline-1 outline-primary-fixed-dim/60'
        : 'outline-none',
  );
}

// Placeholder shown inside an empty canvas so there is a drop target.
function EmptyDrop({ label }: { label: string }) {
  return (
    <div className="pointer-events-none flex min-h-[72px] items-center justify-center rounded-md border-2 border-dashed border-slate-300 text-xs text-slate-400">
      {label}
    </div>
  );
}

function useIsEmpty() {
  const { empty } = useNode((node) => ({
    empty: node.data.nodes.length === 0,
  }));
  return empty;
}

// ============================ Container (ROOT) =============================
type ContainerProps = {
  align: string;
  maxWidth: string;
  padding: string;
  background: string;
  color: string;
  children?: ReactNode;
};
export const Container: UserComponent<Partial<ContainerProps>> = ({
  align = 'left',
  maxWidth = 'lg',
  padding = 'px-6 py-12',
  background = '',
  color = '',
  children,
}) => {
  const {
    connectors: { connect, drag },
  } = useNode();
  const outline = useOutline();
  const empty = useIsEmpty();
  return (
    <div
      ref={(ref) => {
        if (ref) connect(drag(ref));
      }}
      className={cx(
        'mx-auto w-full',
        MAX_WIDTH_CLASS[maxWidth] ?? MAX_WIDTH_CLASS.lg,
        ALIGN_CLASS[align],
        padding,
        outline,
      )}
      style={colorStyle(background, color)}
    >
      {empty ? <EmptyDrop label="Drop components here" /> : children}
    </div>
  );
};
Container.craft = {
  displayName: 'Container',
  props: {
    align: 'left',
    maxWidth: 'lg',
    padding: 'px-6 py-12',
    background: '',
    color: '',
  },
  related: { settings: ContainerSettings },
};
function ContainerSettings() {
  const {
    align,
    maxWidth,
    padding,
    background,
    color,
    actions: { setProp },
  } = useNode((node) => ({
    align: str(node.data.props.align, 'left'),
    maxWidth: str(node.data.props.maxWidth, 'lg'),
    padding: str(node.data.props.padding, 'px-6 py-12'),
    background: str(node.data.props.background),
    color: str(node.data.props.color),
  }));
  return (
    <>
      <ControlGroup title="Layout">
        <SelectField
          label="Max width"
          value={maxWidth}
          options={MAX_WIDTH_OPTIONS}
          onChange={(v) => setProp((p: ContainerProps) => (p.maxWidth = v))}
        />
        <SelectField
          label="Padding"
          value={padding}
          options={PADDING_OPTIONS}
          onChange={(v) => setProp((p: ContainerProps) => (p.padding = v))}
        />
        <SelectField
          label="Align"
          value={align}
          options={ALIGN_OPTIONS}
          onChange={(v) => setProp((p: ContainerProps) => (p.align = v))}
        />
      </ControlGroup>
      <ControlGroup title="Style">
        <ColorField
          label="Background"
          value={background}
          onChange={(v) => setProp((p: ContainerProps) => (p.background = v))}
        />
        <ColorField
          label="Text"
          value={color}
          onChange={(v) => setProp((p: ContainerProps) => (p.color = v))}
        />
      </ControlGroup>
    </>
  );
}

// ================================ Section =================================
type SectionProps = {
  padding: string;
  background: string;
  color: string;
  children?: ReactNode;
};
export const Section: UserComponent<Partial<SectionProps>> = ({
  padding = 'px-6 py-16',
  background = '',
  color = '',
  children,
}) => {
  const {
    connectors: { connect, drag },
  } = useNode();
  const outline = useOutline();
  const empty = useIsEmpty();
  return (
    <section
      ref={(ref) => {
        if (ref) connect(drag(ref));
      }}
      className={cx('w-full', padding, outline)}
      style={colorStyle(background, color)}
    >
      {empty ? <EmptyDrop label="Empty section" /> : children}
    </section>
  );
};
Section.craft = {
  displayName: 'Section',
  props: { padding: 'px-6 py-16', background: '', color: '' },
  related: { settings: SectionSettings },
};
function SectionSettings() {
  const {
    padding,
    background,
    color,
    actions: { setProp },
  } = useNode((node) => ({
    padding: str(node.data.props.padding, 'px-6 py-16'),
    background: str(node.data.props.background),
    color: str(node.data.props.color),
  }));
  return (
    <>
      <ControlGroup title="Layout">
        <SelectField
          label="Padding"
          value={padding}
          options={PADDING_OPTIONS}
          onChange={(v) => setProp((p: SectionProps) => (p.padding = v))}
        />
      </ControlGroup>
      <ControlGroup title="Style">
        <ColorField
          label="Background"
          value={background}
          onChange={(v) => setProp((p: SectionProps) => (p.background = v))}
        />
        <ColorField
          label="Text"
          value={color}
          onChange={(v) => setProp((p: SectionProps) => (p.color = v))}
        />
      </ControlGroup>
    </>
  );
}

// ================================== Grid ==================================
type GridProps = { columns: number; gap: string; children?: ReactNode };
export const Grid: UserComponent<Partial<GridProps>> = ({
  columns = 2,
  gap = 'gap-6',
  children,
}) => {
  const {
    connectors: { connect, drag },
  } = useNode();
  const outline = useOutline();
  const empty = useIsEmpty();
  const cols = Math.min(4, Math.max(1, Number(columns) || 2));
  return (
    <div
      ref={(ref) => {
        if (ref) connect(drag(ref));
      }}
      className={cx('grid', GRID_COLS[cols], gap, outline)}
    >
      {empty ? <EmptyDrop label="Empty grid" /> : children}
    </div>
  );
};
Grid.craft = {
  displayName: 'Grid',
  props: { columns: 2, gap: 'gap-6' },
  related: { settings: GridSettings },
};
function GridSettings() {
  const {
    columns,
    gap,
    actions: { setProp },
  } = useNode((node) => ({
    columns: Number(node.data.props.columns) || 2,
    gap: str(node.data.props.gap, 'gap-6'),
  }));
  return (
    <ControlGroup title="Grid">
      <NumberField
        label="Columns"
        value={columns}
        min={1}
        max={4}
        onChange={(v) =>
          setProp((p: GridProps) => (p.columns = Math.min(4, Math.max(1, v))))
        }
      />
      <SelectField
        label="Gap"
        value={gap}
        options={GAP_OPTIONS}
        onChange={(v) => setProp((p: GridProps) => (p.gap = v))}
      />
    </ControlGroup>
  );
}

// ================================ Heading =================================
type HeadingProps = {
  text: string;
  level: number;
  align: string;
  color: string;
  background: string;
};
export const Heading: UserComponent<Partial<HeadingProps>> = ({
  text = 'Heading',
  level = 2,
  align = 'left',
  color = '',
  background = '',
}) => {
  const {
    connectors: { connect, drag },
  } = useNode();
  const outline = useOutline();
  const lvl = Math.min(6, Math.max(1, Number(level) || 2));
  const Tag = `h${lvl}` as 'h1';
  return (
    <Tag
      ref={(ref: HTMLHeadingElement | null) => {
        if (ref) connect(drag(ref));
      }}
      className={cx(HEADING_SIZE[lvl], ALIGN_CLASS[align], outline)}
      style={colorStyle(background, color)}
    >
      {text || 'Heading'}
    </Tag>
  );
};
Heading.craft = {
  displayName: 'Heading',
  props: { text: 'Heading', level: 2, align: 'left', color: '', background: '' },
  related: { settings: HeadingSettings },
};
function HeadingSettings() {
  const {
    text,
    level,
    align,
    color,
    actions: { setProp },
  } = useNode((node) => ({
    text: str(node.data.props.text, 'Heading'),
    level: Number(node.data.props.level) || 2,
    align: str(node.data.props.align, 'left'),
    color: str(node.data.props.color),
  }));
  return (
    <>
      <ControlGroup title="Content">
        <TextField
          label="Text"
          value={text}
          onChange={(v) => setProp((p: HeadingProps) => (p.text = v))}
        />
        <SelectField
          label="Level"
          value={level}
          options={[1, 2, 3, 4, 5, 6].map((n) => ({
            label: `H${n}`,
            value: n,
          }))}
          onChange={(v) => setProp((p: HeadingProps) => (p.level = v))}
        />
        <SelectField
          label="Align"
          value={align}
          options={ALIGN_OPTIONS}
          onChange={(v) => setProp((p: HeadingProps) => (p.align = v))}
        />
      </ControlGroup>
      <ControlGroup title="Style">
        <ColorField
          label="Text color"
          value={color}
          onChange={(v) => setProp((p: HeadingProps) => (p.color = v))}
        />
      </ControlGroup>
    </>
  );
}

// ================================== Text ==================================
type TextProps = {
  text: string;
  align: string;
  color: string;
  background: string;
};
export const Text: UserComponent<Partial<TextProps>> = ({
  text = '',
  align = 'left',
  color = '',
  background = '',
}) => {
  const {
    connectors: { connect, drag },
  } = useNode();
  const outline = useOutline();
  return (
    <p
      ref={(ref: HTMLParagraphElement | null) => {
        if (ref) connect(drag(ref));
      }}
      className={cx('leading-relaxed', ALIGN_CLASS[align], outline)}
      style={colorStyle(background, color)}
    >
      {text || 'Edit this text in the inspector.'}
    </p>
  );
};
Text.craft = {
  displayName: 'Text',
  props: {
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    align: 'left',
    color: '',
    background: '',
  },
  related: { settings: TextSettings },
};
function TextSettings() {
  const {
    text,
    align,
    color,
    actions: { setProp },
  } = useNode((node) => ({
    text: str(node.data.props.text),
    align: str(node.data.props.align, 'left'),
    color: str(node.data.props.color),
  }));
  return (
    <>
      <ControlGroup title="Content">
        <TextField
          label="Text"
          value={text}
          multiline
          onChange={(v) => setProp((p: TextProps) => (p.text = v))}
        />
        <SelectField
          label="Align"
          value={align}
          options={ALIGN_OPTIONS}
          onChange={(v) => setProp((p: TextProps) => (p.align = v))}
        />
      </ControlGroup>
      <ControlGroup title="Style">
        <ColorField
          label="Text color"
          value={color}
          onChange={(v) => setProp((p: TextProps) => (p.color = v))}
        />
      </ControlGroup>
    </>
  );
}

// ================================= Button =================================
type ButtonProps = { text: string; href: string; variant: string };
export const Button: UserComponent<Partial<ButtonProps>> = ({
  text = 'Button',
  href = '#',
  variant = 'primary',
}) => {
  const {
    connectors: { connect, drag },
  } = useNode();
  const outline = useOutline();
  const cls = BUTTON_VARIANT[variant] ?? BUTTON_VARIANT.primary;
  return (
    // A real <a> would navigate away inside the editor; span keeps it inert.
    <span
      ref={(ref: HTMLSpanElement | null) => {
        if (ref) connect(drag(ref));
      }}
      className={cx(
        'inline-block cursor-pointer rounded-md px-5 py-2.5 text-sm font-medium transition-colors',
        cls,
        outline,
      )}
    >
      {text || 'Button'}
    </span>
  );
};
Button.craft = {
  displayName: 'Button',
  props: { text: 'Get started', href: '#', variant: 'primary' },
  related: { settings: ButtonSettings },
};
function ButtonSettings() {
  const {
    text,
    href,
    variant,
    actions: { setProp },
  } = useNode((node) => ({
    text: str(node.data.props.text, 'Button'),
    href: str(node.data.props.href, '#'),
    variant: str(node.data.props.variant, 'primary'),
  }));
  return (
    <ControlGroup title="Button">
      <TextField
        label="Label"
        value={text}
        onChange={(v) => setProp((p: ButtonProps) => (p.text = v))}
      />
      <TextField
        label="Link (href)"
        value={href}
        onChange={(v) => setProp((p: ButtonProps) => (p.href = v))}
      />
      <SelectField
        label="Variant"
        value={variant}
        options={[
          { label: 'Primary', value: 'primary' },
          { label: 'Secondary', value: 'secondary' },
        ]}
        onChange={(v) => setProp((p: ButtonProps) => (p.variant = v))}
      />
    </ControlGroup>
  );
}

// ================================= Image ==================================
type ImageProps = {
  src: string;
  alt: string;
  width: string;
  rounded: boolean;
};
export const Image: UserComponent<Partial<ImageProps>> = ({
  src = '',
  alt = '',
  width = '',
  rounded = false,
}) => {
  const {
    connectors: { connect, drag },
  } = useNode();
  const outline = useOutline();
  const style: CSSProperties = {};
  if (width) style.width = /^\d+$/.test(width) ? `${width}px` : width;
  if (!src) {
    return (
      <div
        ref={(ref) => {
          if (ref) connect(drag(ref));
        }}
        className={cx(
          'flex h-40 w-full items-center justify-center rounded-md border-2 border-dashed border-slate-300 text-xs text-slate-400',
          outline,
        )}
      >
        Set an image URL in the inspector
      </div>
    );
  }
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      ref={(ref: HTMLImageElement | null) => {
        if (ref) connect(drag(ref));
      }}
      src={src}
      alt={alt}
      style={style}
      className={cx('h-auto max-w-full', rounded && 'rounded-lg', outline)}
    />
  );
};
Image.craft = {
  displayName: 'Image',
  props: { src: '', alt: '', width: '', rounded: false },
  related: { settings: ImageSettings },
};
function ImageSettings() {
  const {
    src,
    alt,
    width,
    rounded,
    actions: { setProp },
  } = useNode((node) => ({
    src: str(node.data.props.src),
    alt: str(node.data.props.alt),
    width: str(node.data.props.width),
    rounded: Boolean(node.data.props.rounded),
  }));
  return (
    <ControlGroup title="Image">
      <TextField
        label="Source URL"
        value={src}
        placeholder="https://…"
        onChange={(v) => setProp((p: ImageProps) => (p.src = v))}
      />
      <TextField
        label="Alt text"
        value={alt}
        onChange={(v) => setProp((p: ImageProps) => (p.alt = v))}
      />
      <TextField
        label="Width (px or CSS)"
        value={width}
        placeholder="auto"
        onChange={(v) => setProp((p: ImageProps) => (p.width = v))}
      />
      <ToggleField
        label="Rounded"
        value={rounded}
        onChange={(v) => setProp((p: ImageProps) => (p.rounded = v))}
      />
    </ControlGroup>
  );
}

// The resolver Craft uses to map serialized `resolvedName` -> component.
// Keys MUST match the SSR registry names.
export const EDITOR_RESOLVER = {
  Container,
  Section,
  Grid,
  Heading,
  Text,
  Button,
  Image,
};
