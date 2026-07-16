'use client';

// Shared, styled inspector controls used by every component's settings panel.
// They keep the Obsidian Prism look of the original static Inspector while
// being fully controlled (value + onChange), so each Craft component can bind
// them to its props via `setProp`.

import type { ReactNode } from 'react';

function FieldLabel({ children }: { children: ReactNode }) {
  return (
    <label className="text-[10px] font-label-sm text-on-surface-variant uppercase tracking-widest">
      {children}
    </label>
  );
}

export function TextField({
  label,
  value,
  onChange,
  placeholder,
  multiline = false,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  multiline?: boolean;
}) {
  const shared =
    'w-full bg-surface-container-lowest border border-outline-variant rounded px-2 py-1.5 text-[12px] font-label-md text-on-surface focus:border-primary-fixed-dim focus:ring-0 outline-none transition-colors';
  return (
    <div className="space-y-1.5">
      <FieldLabel>{label}</FieldLabel>
      {multiline ? (
        <textarea
          rows={3}
          value={value}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
          className={`${shared} resize-none custom-scrollbar`}
        />
      ) : (
        <input
          type="text"
          value={value}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
          className={shared}
        />
      )}
    </div>
  );
}

export function NumberField({
  label,
  value,
  onChange,
  min,
  max,
}: {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
}) {
  return (
    <div className="space-y-1.5">
      <FieldLabel>{label}</FieldLabel>
      <input
        type="number"
        value={value}
        min={min}
        max={max}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full bg-surface-container-lowest border border-outline-variant rounded px-2 py-1.5 text-[12px] font-label-md text-on-surface focus:border-primary-fixed-dim focus:ring-0 outline-none transition-colors"
      />
    </div>
  );
}

export function SelectField<T extends string | number>({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: T;
  options: readonly { label: string; value: T }[];
  onChange: (value: T) => void;
}) {
  return (
    <div className="space-y-1.5">
      <FieldLabel>{label}</FieldLabel>
      <select
        value={value}
        onChange={(e) => {
          const raw = e.target.value;
          const match = options.find((o) => String(o.value) === raw);
          if (match) onChange(match.value);
        }}
        className="w-full bg-surface-container-lowest border border-outline-variant rounded px-2 py-1.5 text-[12px] font-label-md text-on-surface focus:border-primary-fixed-dim focus:ring-0 outline-none transition-colors"
      >
        {options.map((o) => (
          <option key={String(o.value)} value={String(o.value)}>
            {o.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export function ColorField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  // An empty value means "inherit" — the SSR renderer only applies a colour
  // when the prop is a non-empty string, so we treat "" as unset.
  const swatch = value || '#00000000';
  return (
    <div className="flex items-center justify-between">
      <FieldLabel>{label}</FieldLabel>
      <div className="flex items-center gap-2">
        <input
          type="text"
          value={value}
          placeholder="inherit"
          onChange={(e) => onChange(e.target.value)}
          className="w-24 bg-surface-container-lowest border border-outline-variant rounded px-2 py-1 text-[11px] font-label-md text-on-surface focus:border-primary-fixed-dim focus:ring-0 outline-none text-right"
        />
        <label
          className="relative h-6 w-6 shrink-0 rounded border border-outline overflow-hidden cursor-pointer"
          style={{ background: swatch }}
        >
          <input
            type="color"
            value={/^#[0-9a-fA-F]{6}$/.test(value) ? value : '#000000'}
            onChange={(e) => onChange(e.target.value)}
            className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
          />
        </label>
      </div>
    </div>
  );
}

export function ToggleField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: boolean;
  onChange: (value: boolean) => void;
}) {
  return (
    <div className="flex items-center justify-between">
      <FieldLabel>{label}</FieldLabel>
      <button
        type="button"
        role="switch"
        aria-checked={value}
        onClick={() => onChange(!value)}
        className={`relative h-5 w-9 rounded-full transition-colors ${
          value ? 'bg-primary-fixed-dim' : 'bg-surface-container-highest'
        }`}
      >
        <span
          className={`absolute top-0.5 h-4 w-4 rounded-full bg-surface-container-lowest transition-transform ${
            value ? 'translate-x-4' : 'translate-x-0.5'
          }`}
        />
      </button>
    </div>
  );
}

// Groups a labelled block of controls with the divider styling the Inspector
// uses between sections.
export function ControlGroup({
  title,
  children,
}: {
  title?: string;
  children: ReactNode;
}) {
  return (
    <div className="space-y-3 border-t border-outline-variant pt-4 first:border-t-0 first:pt-0">
      {title ? (
        <p className="text-[10px] font-label-sm text-on-surface-variant uppercase tracking-widest">
          {title}
        </p>
      ) : null}
      {children}
    </div>
  );
}
