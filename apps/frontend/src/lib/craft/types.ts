// Shape of a Craft.js serialized component tree.
//
// Craft.js serializes an editor document as a FLAT map keyed by node id, always
// containing a top-level "ROOT" node. Each node points at its children by id
// (`nodes`), so rendering is a depth-first walk starting from ROOT.
//
// This is the single source of truth for the `Page.content` JSONB coming back
// from the backend, and the same contract the Step-5 editor will serialize to.

export const ROOT_NODE_ID = 'ROOT';

export interface CraftNodeType {
  resolvedName: string;
}

export interface CraftNode {
  // Either a registered component name ({ resolvedName }) or a raw HTML tag.
  type: CraftNodeType | string;
  isCanvas?: boolean;
  props: Record<string, unknown>;
  displayName?: string;
  custom?: Record<string, unknown>;
  hidden?: boolean;
  // Child node ids, rendered in order.
  nodes?: string[];
  linkedNodes?: Record<string, string>;
}

export type CraftTree = Record<string, CraftNode>;

// Narrow arbitrary JSONB into something tree-shaped before we walk it.
export function isCraftTree(value: unknown): value is CraftTree {
  return (
    typeof value === 'object' &&
    value !== null &&
    ROOT_NODE_ID in (value as Record<string, unknown>)
  );
}

export function resolvedName(node: CraftNode): string | undefined {
  return typeof node.type === 'string' ? node.type : node.type?.resolvedName;
}
