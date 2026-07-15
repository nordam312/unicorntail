import type { CSSProperties } from 'react';

// Thin wrapper around a Material Symbols Outlined glyph. `name` is the ligature
// (e.g. "arrow_forward", "bolt"); `className` controls colour (and can size via
// `text-*`). Because Material Symbols is an icon *font*, glyph size is driven by
// font-size — use the numeric `size` prop (px) for predictable sizing rather
// than `w-/h-` utilities. `filled` switches the glyph to its solid (FILL 1) variant.
export function Icon({
  name,
  className,
  filled = false,
  size,
  style,
}: {
  name: string;
  className?: string;
  filled?: boolean;
  size?: number;
  style?: CSSProperties;
}) {
  const composed: CSSProperties = {
    ...(filled ? { fontVariationSettings: "'FILL' 1" } : {}),
    ...(size !== undefined ? { fontSize: size } : {}),
    ...style,
  };

  return (
    <span
      className={`material-symbols-outlined${className ? ` ${className}` : ''}`}
      style={composed}
    >
      {name}
    </span>
  );
}
