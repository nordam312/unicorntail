'use client';

// Client root of the editor. Hosts the Craft.js <Editor> context so every
// panel (palette, canvas, inspector) shares the same document, and lays them
// out with the ported Obsidian Prism chrome.

import { useEffect, useState } from 'react';
import { Editor } from '@craftjs/core';
import { EDITOR_RESOLVER } from '@/lib/editor/user-components';
import { useEditorSession } from '@/lib/editor/session-store';
import { TopBar } from './TopBar';
import { ComponentPalette } from './ComponentPalette';
import { Canvas } from './Canvas';
import { Inspector } from './Inspector';
import { EditorLoader } from './EditorLoader';

export function EditorShell() {
  // Resolve ?pageId on the client (avoids useSearchParams' Suspense/prerender
  // deopt on this fully client-side route). null until read.
  const [pageId, setPageId] = useState<string | null>(null);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    setPageId(new URLSearchParams(window.location.search).get('pageId'));
    setReady(true);
  }, []);

  if (!ready) {
    return (
      <div className="h-screen flex items-center justify-center bg-surface-container-lowest text-sm text-on-surface-variant">
        Loading workspace…
      </div>
    );
  }

  return (
    <Editor
      resolver={EDITOR_RESOLVER}
      onNodesChange={() => {
        // Mark unsaved only for real user edits — ignore the initial load /
        // deserialize (loadState is still 'loading'/'local' then).
        if (useEditorSession.getState().loadState === 'ready') {
          useEditorSession.getState().markDirty();
        }
      }}
    >
      <EditorLoader pageId={pageId} />
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
