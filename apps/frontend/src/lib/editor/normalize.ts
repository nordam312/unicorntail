// Normalizes a stored Craft tree into a fully-formed Craft SerializedNodes map
// before deserialize. Page content can come from a real editor save (already
// complete) OR from hand-authored / legacy JSONB (missing `parent`, `isCanvas`,
// `linkedNodes`, defaults). We backfill everything so `actions.deserialize`
// never chokes and nodes land under the right parent.

import { ROOT_NODE_ID, resolvedName, type CraftNode } from '@/lib/craft/types';

// Components that can contain children (mirror of the editor resolver).
const CANVAS_NAMES = new Set(['Container', 'Section', 'Grid']);

// Loose shape matching Craft's SerializedNode (kept permissive on purpose).
interface SerializedNode {
  type: CraftNode['type'];
  isCanvas: boolean;
  props: Record<string, unknown>;
  displayName: string;
  custom: Record<string, unknown>;
  parent: string | null;
  hidden: boolean;
  nodes: string[];
  linkedNodes: Record<string, string>;
}

export function normalizeSerializedTree(
  tree: Record<string, CraftNode>,
): Record<string, SerializedNode> {
  // 1) Derive parent links from every node's children + linked nodes.
  const parentOf: Record<string, string> = {};
  for (const [id, node] of Object.entries(tree)) {
    for (const childId of node.nodes ?? []) parentOf[childId] = id;
    for (const linkedId of Object.values(node.linkedNodes ?? {})) {
      parentOf[linkedId] = id;
    }
  }

  // 2) Backfill defaults per node.
  const out: Record<string, SerializedNode> = {};
  for (const [id, node] of Object.entries(tree)) {
    const name = resolvedName(node) ?? 'Container';
    const nodes = node.nodes ?? [];
    const isCanvas =
      typeof node.isCanvas === 'boolean'
        ? node.isCanvas
        : CANVAS_NAMES.has(name) || nodes.length > 0;

    out[id] = {
      type: node.type,
      isCanvas,
      props: node.props ?? {},
      displayName: node.displayName ?? name,
      custom: node.custom ?? {},
      parent: id === ROOT_NODE_ID ? null : (parentOf[id] ?? ROOT_NODE_ID),
      hidden: node.hidden ?? false,
      nodes,
      linkedNodes: node.linkedNodes ?? {},
    };
  }

  return out;
}
