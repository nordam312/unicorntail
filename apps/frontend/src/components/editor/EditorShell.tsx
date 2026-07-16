'use client';

// Client root of the editor. Hosts the Craft.js <Editor> context so every
// panel (palette, canvas, inspector) shares the same document, and lays them
// out with the ported Obsidian Prism chrome.

import { Editor } from '@craftjs/core';
import { EDITOR_RESOLVER } from '@/lib/editor/user-components';
import { TopBar } from './TopBar';
import { ComponentPalette } from './ComponentPalette';
import { Canvas } from './Canvas';
import { Inspector } from './Inspector';

export function EditorShell() {
  return (
    <Editor resolver={EDITOR_RESOLVER}>
      <div className="h-screen flex flex-col overflow-hidden">
        <TopBar />
        <div className="flex-1 flex pt-14 h-full overflow-hidden">
          <ComponentPalette />
          <Canvas />
          <Inspector />
        </div>
      </div>
    </Editor>
  );
}
