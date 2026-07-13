import type { CSSProperties } from 'react';

// Thin wrapper around a Material Symbols Outlined glyph. `name` is the ligature
// (e.g. "arrow_forward", "terminal"); extra classes control colour/size.
// `filled` switches the glyph to its solid (FILL 1) variant.
export function Icon({
  name,
  className,
  filled = false,
  style,
}: {
  name: string;
  className?: string;
  filled?: boolean;
  style?: CSSProperties;
}) {
  return (
    <span
      className={`material-symbols-outlined${className ? ` ${className}` : ''}`}
      style={filled ? { fontVariationSettings: "'FILL' 1", ...style } : style}
    >
      {name}
    </span>
  );
}
