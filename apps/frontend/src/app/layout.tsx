import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'UnicornTail',
  description: 'Build and export production-ready pages, visually.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
