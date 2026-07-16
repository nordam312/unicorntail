'use client';

// Left palette. Each tile is a Craft.js drag source (`connectors.create`): drag
// it onto the canvas to insert a real node. Canvas-type components (Section,
// Grid) are created as droppable <Element canvas>; leaves are inserted directly.

import type { ReactElement } from 'react';
import { Element, useEditor } from '@craftjs/core';
import { Icon } from '@/components/Icon';
import {
  Button,
  Grid,
  Heading,
  Image,
  Section,
  Text,
} from '@/lib/editor/user-components';

type Accent = 'primary' | 'secondary';

type PaletteItem = { icon: string; label: string; create: ReactElement };
type PaletteGroup = {
  title: string;
  icon: string;
  accent: Accent;
  items: PaletteItem[];
};

const ACCENT_BORDER: Record<Accent, string> = {
  primary: 'hover:border-primary-fixed-dim',
  secondary: 'hover:border-secondary-fixed-dim',
};
const ACCENT_ICON: Record<Accent, string> = {
  primary: 'group-hover:text-primary-fixed-dim',
  secondary: 'group-hover:text-secondary-fixed-dim',
};

const GROUPS: PaletteGroup[] = [
  {
    title: 'Typography',
    icon: 'title',
    accent: 'primary',
    items: [
      { icon: 'text_fields', label: 'Heading', create: <Element is={Heading} /> },
      { icon: 'subject', label: 'Text', create: <Element is={Text} /> },
      { icon: 'smart_button', label: 'Button', create: <Element is={Button} /> },
    ],
  },
  {
    title: 'Layout',
    icon: 'grid_view',
    accent: 'secondary',
    items: [
      {
        icon: 'view_quilt',
        label: 'Section',
        create: <Element canvas is={Section} />,
      },
      { icon: 'apps', label: 'Grid', create: <Element canvas is={Grid} /> },
    ],
  },
  {
    title: 'Media',
    icon: 'perm_media',
    accent: 'primary',
    items: [{ icon: 'image', label: 'Image', create: <Element is={Image} /> }],
  },
];

export function ComponentPalette() {
  const { connectors } = useEditor();

  return (
    <aside className="fixed left-0 top-14 bottom-0 w-64 z-40 flex flex-col bg-surface-container-low border-r border-outline-variant">
      <div className="p-4 border-b border-outline-variant">
        <h2 className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-widest text-[10px]">
          Components
        </h2>
      </div>

      <nav className="flex-1 overflow-y-auto custom-scrollbar p-2 space-y-4">
        {GROUPS.map((group) => (
          <section key={group.title}>
            <div className="px-2 mb-2 flex items-center gap-2">
              <Icon name={group.icon} className="text-xs text-on-surface-variant" />
              <span className="font-label-sm text-label-sm text-on-surface-variant">
                {group.title}
              </span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {group.items.map((item) => (
                <div
                  key={item.label}
                  ref={(ref) => {
                    if (ref) connectors.create(ref, item.create);
                  }}
                  className={`p-3 bg-surface-container border border-outline-variant rounded cursor-grab active:scale-95 transition-all group ${ACCENT_BORDER[group.accent]}`}
                >
                  <div className="h-6 w-full bg-surface-container-high rounded flex items-center justify-center mb-1">
                    <Icon
                      name={item.icon}
                      className={`text-sm ${ACCENT_ICON[group.accent]}`}
                    />
                  </div>
                  <p className="text-[10px] font-label-md text-center">
                    {item.label}
                  </p>
                </div>
              ))}
            </div>
          </section>
        ))}
      </nav>

      <div className="p-4 border-t border-outline-variant space-y-2">
        <button className="w-full py-2 bg-surface-container-high text-primary-fixed-dim font-label-sm text-label-sm rounded border-r-2 border-primary-fixed-dim flex items-center justify-center gap-2">
          <Icon name="widgets" className="text-sm" />
          Components
        </button>
        <button className="w-full py-2 text-on-surface-variant hover:bg-surface-container-highest hover:text-on-surface font-label-sm text-label-sm rounded transition-all flex items-center justify-center gap-2">
          <Icon name="layers" className="text-sm" />
          Layers
        </button>
      </div>
    </aside>
  );
}
