// Editor "session" state that lives OUTSIDE the Craft.js document tree: which
// page is open, its metadata, and save/publish status. Craft owns the component
// tree; this store owns everything around it. Shared across TopBar, loader, and
// any future panels — the sanctioned cross-component state lib (Zustand).

import { create } from 'zustand';
import type { EditorSite } from './pages-api';

export type LoadState = 'local' | 'loading' | 'ready' | 'error';
export type SaveState = 'idle' | 'saving' | 'saved' | 'error';

interface EditorSession {
  pageId: string | null;
  loadState: LoadState;
  saveState: SaveState;
  // Whether the document changed since the last successful save/load.
  dirty: boolean;
  // Page metadata (populated once loaded).
  title: string | null;
  slug: string | null;
  isPublished: boolean;
  site: EditorSite | null;
  error: string | null;

  // --- actions ---
  startLoad: (pageId: string | null) => void;
  loaded: (meta: {
    title: string;
    slug: string;
    isPublished: boolean;
    site?: EditorSite;
  }) => void;
  loadFailed: (message: string) => void;
  markDirty: () => void;
  startSave: () => void;
  saved: () => void;
  saveFailed: (message: string) => void;
  setPublished: (isPublished: boolean) => void;
}

export const useEditorSession = create<EditorSession>((set) => ({
  pageId: null,
  loadState: 'local',
  saveState: 'idle',
  dirty: false,
  title: null,
  slug: null,
  isPublished: false,
  site: null,
  error: null,

  startLoad: (pageId) =>
    set({
      pageId,
      loadState: pageId ? 'loading' : 'local',
      error: null,
    }),
  loaded: ({ title, slug, isPublished, site }) =>
    set({
      loadState: 'ready',
      title,
      slug,
      isPublished,
      site: site ?? null,
      dirty: false,
      error: null,
    }),
  loadFailed: (message) => set({ loadState: 'error', error: message }),
  markDirty: () => set({ dirty: true, saveState: 'idle' }),
  startSave: () => set({ saveState: 'saving', error: null }),
  saved: () => set({ saveState: 'saved', dirty: false }),
  saveFailed: (message) => set({ saveState: 'error', error: message }),
  setPublished: (isPublished) => set({ isPublished }),
}));
