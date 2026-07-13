'use client';

import { useState } from 'react';

// Visual-only inspector tabs (matches the Stitch design, which restyles the
// active tab on click without swapping panel content).
const TABS = ['Layout', 'Style', 'Effects', 'Events'];

export function InspectorTabs() {
  const [active, setActive] = useState('Layout');

  return (
    <div className="flex border-b border-outline-variant px-2">
      {TABS.map((tab) => (
        <button
          key={tab}
          onClick={() => setActive(tab)}
          className={
            active === tab
              ? 'flex-1 py-3 text-[11px] font-label-sm text-secondary-fixed-dim font-bold border-b border-secondary-fixed-dim transition-opacity'
              : 'flex-1 py-3 text-[11px] font-label-sm text-on-surface-variant hover:text-on-surface'
          }
        >
          {tab}
        </button>
      ))}
    </div>
  );
}
