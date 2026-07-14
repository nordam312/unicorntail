import Link from 'next/link';
import { Logo } from './Logo';

// Brand lockup = logo mark + "UnicornTail" wordmark. Used across the navbar,
// footers and editor top bar. Wordmark styling varies per screen, so it's
// passed in via `textClassName`; pass `href={null}` for a non-linked lockup
// (e.g. in footers), and `showWordmark={false}` for the mark alone.
export function Brand({
  href = '/',
  size = 28,
  textClassName,
  showWordmark = true,
  className,
}: {
  href?: string | null;
  size?: number;
  textClassName?: string;
  showWordmark?: boolean;
  className?: string;
}) {
  const inner = (
    <>
      <Logo size={size} />
      {showWordmark && <span className={textClassName}>UnicornTail</span>}
    </>
  );
  const cls = `flex items-center gap-2${className ? ` ${className}` : ''}`;

  return href ? (
    <Link href={href} className={cls}>
      {inner}
    </Link>
  ) : (
    <span className={cls}>{inner}</span>
  );
}
