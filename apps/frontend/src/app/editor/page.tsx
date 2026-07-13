import type { Metadata } from 'next';
import { TopBar } from '@/components/editor/TopBar';
import { ComponentPalette } from '@/components/editor/ComponentPalette';
import { Canvas } from '@/components/editor/Canvas';
import { Inspector } from '@/components/editor/Inspector';

export const metadata: Metadata = {
  title: 'UnicornTail | Workspace',
};

// Visual shell for the drag-and-drop editor. The Craft.js wiring (real
// palette drag, live canvas, bound inspector) lands in a later step; this is
// the ported layout/chrome.
export default function EditorPage() {
  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <TopBar />
      <div className="flex-1 flex pt-14 h-full overflow-hidden">
        <ComponentPalette />
        <Canvas />
        <Inspector />
      </div>
    </div>
  );
}
