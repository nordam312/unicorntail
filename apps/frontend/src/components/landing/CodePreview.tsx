'use client';

import { useEffect, useRef } from 'react';

// The hero's faux editor window. It tilts in 3D toward the cursor with a
// glare/spotlight that tracks the pointer. Motion is smoothed with a
// requestAnimationFrame lerp (spring-like easing) rather than snapping on every
// mousemove, and is fully disabled under prefers-reduced-motion.
const MAX_TILT = 6; // degrees
const HOVER_SCALE = 1.015;
const EASE = 0.12; // 0..1 — higher = snappier

type Motion = { rx: number; ry: number; mx: number; my: number; s: number; glow: number };

const REST: Motion = { rx: 0, ry: 0, mx: 50, my: 50, s: 1, glow: 0 };

export function CodePreview() {
  const cardRef = useRef<HTMLDivElement>(null);
  const target = useRef<Motion>({ ...REST });
  const current = useRef<Motion>({ ...REST });
  const frame = useRef<number | null>(null);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;

    const prefersReduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;
    if (prefersReduced) return;

    const tick = () => {
      const c = current.current;
      const t = target.current;
      c.rx += (t.rx - c.rx) * EASE;
      c.ry += (t.ry - c.ry) * EASE;
      c.mx += (t.mx - c.mx) * EASE;
      c.my += (t.my - c.my) * EASE;
      c.s += (t.s - c.s) * EASE;
      c.glow += (t.glow - c.glow) * EASE;

      el.style.transform = `perspective(1400px) rotateX(${c.rx.toFixed(3)}deg) rotateY(${c.ry.toFixed(3)}deg) scale(${c.s.toFixed(4)})`;
      el.style.setProperty('--spot-x', `${c.mx.toFixed(2)}%`);
      el.style.setProperty('--spot-y', `${c.my.toFixed(2)}%`);
      el.style.setProperty('--spot-opacity', c.glow.toFixed(3));

      frame.current = requestAnimationFrame(tick);
    };
    frame.current = requestAnimationFrame(tick);

    return () => {
      if (frame.current !== null) cancelAnimationFrame(frame.current);
    };
  }, []);

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    if (!el) return;
    const { left, top, width, height } = el.getBoundingClientRect();
    const px = (e.clientX - left) / width; // 0..1
    const py = (e.clientY - top) / height; // 0..1
    target.current = {
      ry: (px - 0.5) * 2 * MAX_TILT,
      rx: (0.5 - py) * 2 * MAX_TILT,
      mx: px * 100,
      my: py * 100,
      s: HOVER_SCALE,
      glow: 1,
    };
  };

  const handleLeave = () => {
    target.current = { ...REST };
  };

  return (
    <div
      className="mt-16 [perspective:1400px]"
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
    >
      <div
        ref={cardRef}
        style={
          {
            transformStyle: 'preserve-3d',
            willChange: 'transform',
            '--spot-x': '50%',
            '--spot-y': '50%',
            '--spot-opacity': '0',
          } as React.CSSProperties
        }
        className="group relative w-full max-w-4xl mx-auto rounded-t-lg border-x border-t border-outline-variant bg-surface-container-lowest p-2 shadow-2xl transition-shadow duration-300 hover:shadow-[0_30px_80px_-20px_rgba(133,211,220,0.25)]"
      >
        {/* Title bar */}
        <div className="flex items-center gap-2 px-4 py-3 border-b border-outline-variant mb-2">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-surface-bright" />
            <div className="w-3 h-3 rounded-full bg-surface-bright" />
            <div className="w-3 h-3 rounded-full bg-surface-bright" />
          </div>
          <div className="mx-auto font-label-md text-label-sm text-on-tertiary-container">
            components/HeroSection.tsx
          </div>
        </div>

        {/* Code body */}
        <div className="relative p-6 text-left font-label-md text-body-md overflow-hidden bg-background/50 rounded-lg">
          <pre className="text-on-surface-variant leading-relaxed">
            <span className="text-secondary-fixed-dim">export default function</span>{' '}
            <span className="text-primary-fixed-dim">Hero</span>() {'{'}
            {'\n  '}
            <span className="text-secondary-fixed-dim">return</span> (
            {'\n    '}&lt;<span className="text-secondary">section</span>{' '}
            <span className="text-primary-fixed-dim">className</span>=
            <span className="text-on-surface">&quot;relative flex flex-col items-center&quot;</span>&gt;
            {'\n      '}&lt;<span className="text-secondary">h1</span>&gt;Build visually, deploy
            code.&lt;/<span className="text-secondary">h1</span>&gt;
            {'\n      '}&lt;<span className="text-secondary">Button</span>&gt;Get
            Started&lt;/<span className="text-secondary">Button</span>&gt;
            {'\n    '}&lt;/<span className="text-secondary">section</span>&gt;
            {'\n  '})
            {'\n'}
            {'}'}
          </pre>
        </div>

        {/* Cursor-tracking spotlight glare (driven by CSS vars from the rAF loop) */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-lg mix-blend-soft-light transition-opacity duration-300"
          style={{
            opacity: 'var(--spot-opacity)',
            background:
              'radial-gradient(600px circle at var(--spot-x) var(--spot-y), rgba(161,239,248,0.18), transparent 45%)',
          }}
        />

        {/* Fade the code into the page background */}
        <div className="absolute -bottom-1 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent z-20" />
      </div>
    </div>
  );
}
