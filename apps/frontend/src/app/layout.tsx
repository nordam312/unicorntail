import type { Metadata } from 'next';
import { Geist, JetBrains_Mono } from 'next/font/google';
import './globals.css';

// Geist drives display/headline/body; JetBrains Mono drives the mono label
// styles. Exposed as CSS variables consumed by tailwind.config.ts fontFamily.
const geist = Geist({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-geist',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'UnicornTail | Build Visually. Own Your Code.',
  description:
    'Design beautiful landing pages visually and export them as production-ready Next.js & Tailwind CSS projects directly to your GitHub.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`dark ${geist.variable} ${jetbrainsMono.variable}`}
    >
      <head>
        {/* Material Symbols icon font (variable axes set in globals.css). */}
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-background text-on-surface font-body-md antialiased selection:bg-primary-fixed-dim/30">
        {children}
      </body>
    </html>
  );
}
