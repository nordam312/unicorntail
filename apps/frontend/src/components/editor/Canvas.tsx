'use client';

// The live editing surface. Renders a Craft.js <Frame> whose ROOT is a
// Container; dropping palette items appends real nodes here. Gated behind a
// mounted flag so Craft only initialises on the client (avoids SSR/hydration
// mismatch on the drag-and-drop tree).

import { useEffect, useState } from 'react';
import { Element, Frame } from '@craftjs/core';
import { Container, Heading, Text } from '@/lib/editor/user-components';

export function Canvas() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <main className="flex-1 ml-64 mr-72 bg-surface-container-lowest relative overflow-auto p-12 custom-scrollbar">
      <div className="max-w-5xl mx-auto min-h-full canvas-grid relative rounded-xl border border-outline-variant p-8 shadow-2xl bg-white text-slate-900">
        <div className="absolute -top-6 left-0 text-[10px] font-label-md text-on-surface-variant bg-surface-container-lowest px-2">
          Page Body [1440px]
        </div>

        {mounted ? (
          // Starter document — replaced by the loaded page in Step 5b.
          <Frame>
            <Element
              canvas
              is={Container}
              maxWidth="lg"
              padding="px-8 py-16"
              custom={{ displayName: 'Page' }}
            >
              <Element is={Heading} text="Welcome to your new page" level={1} />
              <Element
                is={Text}
                text="Drag components from the left panel to start building. Select any element to edit its properties on the right."
              />
            </Element>
          </Frame>
        ) : (
          <div className="flex min-h-[240px] items-center justify-center text-sm text-slate-400">
            Loading editor…
          </div>
        )}
      </div>
    </main>
  );
}
