import Image from 'next/image';
import logo from '../../public/logo.png';

// The UnicornTail logo mark (unicorn + laurel + code brackets). Square asset;
// `size` sets both dimensions in px.
export function Logo({
  size = 28,
  className,
}: {
  size?: number;
  className?: string;
}) {
  return (
    <Image
      src={logo}
      alt="UnicornTail logo"
      width={size}
      height={size}
      className={className}
    />
  );
}
