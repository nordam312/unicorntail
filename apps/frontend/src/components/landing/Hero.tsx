import { Icon } from '@/components/Icon';
import { CodePreview } from './CodePreview';

export function Hero() {
  return (
    <main className="relative min-h-[800px] flex flex-col items-center justify-center overflow-hidden pt-16 md:pt-24 px-margin-mobile md:px-margin-desktop">
      {/* Background decorations */}
      <div className="absolute inset-0 grid-pattern opacity-40 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] hero-glow pointer-events-none" />

      <div className="relative z-10 max-w-[900px] text-center space-y-6">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-outline-variant bg-surface-container-low backdrop-blur-sm mb-4">
          <span className="flex h-2 w-2 rounded-full bg-primary-fixed-dim animate-pulse" />
          <span className="font-label-md text-label-sm text-primary-fixed-dim uppercase tracking-wider">
            v2.0 Beta Released
          </span>
        </div>

        <h1 className="font-display text-4xl md:text-6xl font-extrabold tracking-tight text-primary leading-tight">
          Build Visually. Own Your Code.
          <br />
          <span className="bg-gradient-to-r from-primary-fixed-dim via-secondary-fixed-dim to-secondary bg-clip-text text-transparent">
            Zero Vendor Lock-in.
          </span>
        </h1>

        <p className="font-body-lg text-lg md:text-xl text-on-surface-variant max-w-[700px] mx-auto leading-relaxed">
          Design beautiful landing pages visually and export them as
          production-ready Next.js &amp; Tailwind CSS projects directly to your
          GitHub.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6">
          <button className="neon-gradient-bg px-8 py-4 rounded-lg font-body-lg font-bold text-on-primary-fixed flex items-center gap-2 group transition-all duration-300 hover:shadow-[0_0_30px_rgba(161,239,248,0.25)] active:scale-95">
            Start Building for Free
            <Icon
              name="arrow_forward"
              className="transition-transform group-hover:translate-x-1"
            />
          </button>
          <button className="bg-surface-container-high border border-outline-variant hover:border-on-surface-variant px-8 py-4 rounded-lg font-body-lg font-semibold text-primary transition-all active:scale-95">
            View Demo
          </button>
        </div>

        <CodePreview />
      </div>
    </main>
  );
}
