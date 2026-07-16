'use client';

import { useEditor } from '@craftjs/core';
import { Icon } from '@/components/Icon';
import { GithubIcon } from '@/components/GithubIcon';
import { Brand } from '@/components/Brand';
import { useEditorSession } from '@/lib/editor/session-store';
import { savePageContent, setPagePublished } from '@/lib/editor/pages-api';

const WORKSPACE_TABS = [
  { label: 'Drafts', active: true },
  { label: 'Templates', active: false },
  { label: 'Team', active: false },
];

// Public URL for the open page. Dev uses <subdomain>.localhost:3000; prod falls
// back to NEXT_PUBLIC_ROOT_DOMAIN. HOME_SLUG ("home") maps to "/".
function previewUrl(subdomain: string, slug: string): string {
  const host = window.location.host;
  const isLocal = host.includes('localhost') || host.startsWith('127.');
  const rootHost = isLocal
    ? host
    : (process.env.NEXT_PUBLIC_ROOT_DOMAIN ?? host);
  const path = slug === 'home' ? '/' : `/${slug}`;
  return `${window.location.protocol}//${subdomain}.${rootHost}${path}`;
}

export function TopBar() {
  const { query } = useEditor();
  const {
    pageId,
    loadState,
    saveState,
    dirty,
    isPublished,
    slug,
    site,
    error,
    startSave,
    saved,
    saveFailed,
    setPublished,
  } = useEditorSession();

  const hasPage = loadState === 'ready' && !!pageId;

  async function handleSave(): Promise<boolean> {
    if (!pageId) return false;
    startSave();
    try {
      const content = JSON.parse(query.serialize()) as Record<string, unknown>;
      await savePageContent(pageId, content);
      saved();
      return true;
    } catch (err) {
      saveFailed(err instanceof Error ? err.message : 'Save failed');
      return false;
    }
  }

  async function handlePublishToggle() {
    if (!pageId) return;
    // Persist current edits first so we publish exactly what's on screen.
    const ok = await handleSave();
    if (!ok) return;
    try {
      const next = !isPublished;
      await setPagePublished(pageId, next);
      setPublished(next);
    } catch (err) {
      saveFailed(err instanceof Error ? err.message : 'Publish failed');
    }
  }

  function handlePreview() {
    if (site && slug) window.open(previewUrl(site.subdomain, slug), '_blank');
  }

  const badge = !pageId
    ? { text: 'LOCAL', title: 'No page loaded — add ?pageId=<id> to save' }
    : isPublished
      ? { text: 'PUBLISHED', title: 'This page is live' }
      : { text: 'DRAFT', title: 'Not published yet' };

  const saveLabel =
    saveState === 'saving'
      ? 'Saving…'
      : saveState === 'error'
        ? 'Retry'
        : saveState === 'saved' && !dirty
          ? 'Saved'
          : 'Save';

  return (
    <header className="fixed top-0 left-0 w-full h-14 z-50 flex items-center justify-between px-6 bg-surface-container-lowest border-b border-outline-variant">
      <div className="flex items-center gap-8">
        <Brand
          href="/"
          size={24}
          textClassName="font-headline-md text-headline-md font-bold text-primary-fixed-dim tracking-tighter"
        />
        <div className="flex items-center gap-4 font-label-md">
          <nav className="flex items-center gap-6">
            {WORKSPACE_TABS.map((tab) => (
              <a
                key={tab.label}
                href="#"
                className={
                  tab.active
                    ? 'text-on-surface border-b-2 border-primary-fixed-dim pb-1'
                    : 'text-on-surface-variant hover:text-on-surface transition-colors'
                }
              >
                {tab.label}
              </a>
            ))}
          </nav>
          <span
            title={badge.title}
            className="px-2 py-0.5 bg-surface-container-highest rounded text-[10px] text-primary-fixed-dim border border-primary-fixed-dim/20"
          >
            {badge.text}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-3">
        {/* Save status hint */}
        <span className="text-[11px] font-label-md text-on-surface-variant min-w-0 max-w-[220px] truncate">
          {loadState === 'loading'
            ? 'Loading page…'
            : loadState === 'error'
              ? `Load failed: ${error ?? ''}`
              : saveState === 'error'
                ? `Save failed: ${error ?? ''}`
                : hasPage && dirty
                  ? 'Unsaved changes'
                  : hasPage && saveState === 'saved'
                    ? 'All changes saved'
                    : ''}
        </span>

        <button
          onClick={handleSave}
          disabled={!hasPage || saveState === 'saving'}
          className="flex items-center gap-2 px-3 py-1.5 rounded border border-outline-variant text-on-surface-variant hover:bg-surface-container-low transition-all active:scale-95 duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <Icon name="save" className="text-sm" />
          <span className="font-label-sm text-label-sm">{saveLabel}</span>
        </button>

        <button
          onClick={handlePreview}
          disabled={!hasPage || !isPublished}
          title={isPublished ? 'Open the live page' : 'Publish to preview'}
          className="flex items-center gap-2 px-3 py-1.5 rounded border border-outline-variant text-on-surface-variant hover:bg-surface-container-low transition-all active:scale-95 duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <Icon name="visibility" className="text-sm" />
          <span className="font-label-sm text-label-sm">Preview</span>
        </button>

        <button
          onClick={handlePublishToggle}
          disabled={!hasPage || saveState === 'saving'}
          className="flex items-center gap-2 px-4 py-1.5 rounded neon-gradient-btn text-on-primary-fixed font-bold text-label-sm active:scale-95 duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <span>{isPublished ? 'Unpublish' : 'Publish'}</span>
        </button>

        <button className="flex items-center gap-2 px-3 py-1.5 rounded border border-outline-variant text-on-surface-variant hover:bg-surface-container-low transition-all active:scale-95 duration-200">
          <GithubIcon className="w-4 h-4 fill-current" />
          <span className="font-label-sm text-label-sm">Export</span>
        </button>
        <div className="w-8 h-8 rounded-full border border-outline-variant overflow-hidden ml-2 bg-surface-container-highest flex items-center justify-center">
          <Icon name="person" filled className="text-on-surface-variant text-lg" />
        </div>
      </div>
    </header>
  );
}
