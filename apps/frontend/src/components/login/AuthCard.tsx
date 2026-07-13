'use client';

import { useEffect, useRef } from 'react';
import { Icon } from '@/components/Icon';
import { GithubIcon } from '@/components/GithubIcon';

// Authentication card with a subtle 3D tilt that follows the cursor across the
// viewport. Motion is smoothed with a requestAnimationFrame lerp and disabled
// under prefers-reduced-motion.
const MAX_TILT = 5; // degrees
const EASE = 0.1;

export function AuthCard() {
  const cardRef = useRef<HTMLDivElement>(null);
  const target = useRef({ rx: 0, ry: 0 });
  const current = useRef({ rx: 0, ry: 0 });
  const frame = useRef<number | null>(null);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const onMove = (e: MouseEvent) => {
      const px = e.clientX / window.innerWidth; // 0..1
      const py = e.clientY / window.innerHeight;
      target.current.ry = (px - 0.5) * 2 * MAX_TILT;
      target.current.rx = (0.5 - py) * 2 * MAX_TILT;
    };
    const onLeave = () => {
      target.current = { rx: 0, ry: 0 };
    };

    const tick = () => {
      const c = current.current;
      const t = target.current;
      c.rx += (t.rx - c.rx) * EASE;
      c.ry += (t.ry - c.ry) * EASE;
      el.style.transform = `perspective(1200px) rotateX(${c.rx.toFixed(3)}deg) rotateY(${c.ry.toFixed(3)}deg)`;
      frame.current = requestAnimationFrame(tick);
    };

    window.addEventListener('mousemove', onMove);
    document.addEventListener('mouseleave', onLeave);
    frame.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseleave', onLeave);
      if (frame.current !== null) cancelAnimationFrame(frame.current);
    };
  }, []);

  return (
    <div
      ref={cardRef}
      style={{ willChange: 'transform' }}
      className="w-full max-w-md bg-surface-container border border-outline-variant p-8 md:p-12 rounded-xl shadow-2xl relative z-10"
    >
      {/* Top edge glow */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-primary-fixed-dim via-secondary-fixed-dim to-tertiary-fixed" />

      <div className="flex flex-col items-center text-center space-y-lg">
        {/* Brand anchor */}
        <div className="flex flex-col items-center gap-md">
          <div className="w-14 h-14 flex items-center justify-center rounded-full bg-surface-container-high border border-outline-variant shadow-inner">
            <Icon
              name="auto_fix_high"
              filled
              className="text-primary-fixed-dim text-3xl"
            />
          </div>
          <div className="space-y-sm">
            <h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight">
              Welcome to the Magic.
            </h1>
            <p className="text-on-surface-variant">Sign in to your account.</p>
          </div>
        </div>

        {/* Action area */}
        <div className="w-full pt-md">
          <button className="w-full flex items-center justify-center gap-3 bg-surface-container-lowest border border-outline-variant px-6 py-3 rounded-lg font-body-lg text-on-surface transition-all duration-200 hover:border-primary-fixed-dim hover:bg-surface-container-low active:scale-[0.98]">
            <GithubIcon className="w-5 h-5 fill-secondary-fixed-dim" />
            <span>Continue with GitHub</span>
          </button>

          {/* Divider */}
          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-outline-variant" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-surface-container px-2 text-on-surface-variant font-label-sm">
                Or use email
              </span>
            </div>
          </div>

          {/* Magic-link form */}
          <div className="space-y-md">
            <div className="text-left space-y-xs">
              <label
                htmlFor="email"
                className="font-label-sm text-on-surface-variant px-1"
              >
                Email Address
              </label>
              <input
                id="email"
                type="email"
                placeholder="dev@unicorntail.io"
                className="w-full bg-surface-container-lowest border border-outline-variant rounded-lg px-4 py-2.5 text-on-surface placeholder:text-on-tertiary-container focus:outline-none focus:border-primary-fixed-dim focus:ring-1 focus:ring-primary-fixed-dim transition-all"
              />
            </div>
            <button className="w-full py-2.5 rounded-lg bg-primary-fixed-dim text-on-primary-fixed font-semibold hover:opacity-90 transition-opacity">
              Send Magic Link
            </button>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="pt-md border-t border-outline-variant w-full">
          <p className="text-sm text-on-surface-variant leading-relaxed">
            By signing in, you grant UnicornTail secure OAuth access to deploy
            generated repositories to your GitHub profile.
          </p>
        </div>
      </div>
    </div>
  );
}
