'use client';

// Right inspector. Reflects the currently selected Craft node: renders that
// component's own `related.settings` panel (which binds to the node via
// useNode) and offers delete. Shows an empty state when nothing is selected.

import type { ComponentType } from 'react';
import { useEditor } from '@craftjs/core';
import { Icon } from '@/components/Icon';

export function Inspector() {
  const { selectedId, displayName, settings, isDeletable, actions } = useEditor(
    (state, query) => {
      const [id] = state.events.selected;
      if (!id || !state.nodes[id]) return {};
      const node = state.nodes[id];
      return {
        selectedId: id,
        displayName:
          (node.data.custom?.displayName as string | undefined) ??
          node.data.displayName ??
          node.data.name,
        settings: node.related?.settings as ComponentType | undefined,
        isDeletable: query.node(id).isDeletable(),
      };
    },
  );

  const Settings = settings;

  return (
    <aside className="fixed right-0 top-14 bottom-0 w-72 z-40 flex flex-col bg-surface-container-low border-l border-outline-variant">
      <div className="p-4 border-b border-outline-variant flex items-center justify-between">
        <div>
          <h2 className="font-label-sm text-label-sm text-on-surface">
            Properties
          </h2>
          <p className="text-[10px] font-label-md text-on-surface-variant">
            {selectedId ? displayName : 'No selection'}
          </p>
        </div>
        {selectedId ? (
          <button
            type="button"
            onClick={() => actions.selectNode(undefined)}
            aria-label="Deselect"
          >
            <Icon
              name="close"
              className="text-on-surface-variant cursor-pointer hover:text-on-surface"
            />
          </button>
        ) : null}
      </div>

      {selectedId && Settings ? (
        <>
          <div className="flex-1 overflow-y-auto custom-scrollbar p-4 space-y-6">
            <Settings />
          </div>
          <div className="p-4 border-t border-outline-variant">
            <button
              type="button"
              disabled={!isDeletable}
              onClick={() => isDeletable && actions.delete(selectedId)}
              className="w-full py-2 bg-secondary-fixed-dim/10 text-secondary-fixed-dim border border-secondary-fixed-dim/30 font-label-sm text-label-sm rounded hover:bg-secondary-fixed-dim/20 transition-all disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              <Icon name="delete" className="text-sm" />
              Delete element
            </button>
          </div>
        </>
      ) : (
        <div className="flex-1 flex flex-col items-center justify-center gap-3 p-6 text-center">
          <Icon
            name="ads_click"
            className="text-3xl text-on-surface-variant/50"
          />
          <p className="text-[11px] font-label-md text-on-surface-variant max-w-[180px]">
            Select an element on the canvas to edit its properties.
          </p>
        </div>
      )}
    </aside>
  );
}
