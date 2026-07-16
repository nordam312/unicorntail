'use client';

// Loads the open page into the Craft document once, on mount. Lives INSIDE the
// <Editor> so it can call actions.deserialize. Renders nothing.

import { useEffect } from 'react';
import { useEditor } from '@craftjs/core';
import { fetchPage } from '@/lib/editor/pages-api';
import { useEditorSession } from '@/lib/editor/session-store';
import { isCraftTree, type CraftTree } from '@/lib/craft/types';
import { normalizeSerializedTree } from '@/lib/editor/normalize';

export function EditorLoader({ pageId }: { pageId: string | null }) {
  const { actions } = useEditor();
  const { startLoad, loaded, loadFailed } = useEditorSession();

  useEffect(() => {
    startLoad(pageId);
    if (!pageId) return; // local mode: keep the starter document

    let cancelled = false;
    fetchPage(pageId)
      .then((page) => {
        if (cancelled) return;
        // Only replace the starter doc if the stored content is a real Craft
        // tree; otherwise keep the starter so a blank/legacy page is editable.
        if (isCraftTree(page.content)) {
          try {
            const normalized = normalizeSerializedTree(
              page.content as CraftTree,
            );
            actions.deserialize(
              normalized as Parameters<typeof actions.deserialize>[0],
            );
          } catch (err) {
            console.warn('Could not deserialize page content:', err);
          }
        }
        loaded({
          title: page.title,
          slug: page.slug,
          isPublished: page.isPublished,
          site: page.site,
        });
      })
      .catch((err: unknown) => {
        if (!cancelled) {
          loadFailed(err instanceof Error ? err.message : 'Failed to load page');
        }
      });

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageId]);

  return null;
}
