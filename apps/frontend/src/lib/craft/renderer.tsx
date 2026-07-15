import { resolveComponent } from './registry';
import {
  ROOT_NODE_ID,
  isCraftTree,
  resolvedName,
  type CraftTree,
} from './types';

// Depth-first render of a Craft.js serialized tree, starting at ROOT. Each node
// resolves to a registered component; its `nodes` are rendered in order as
// children. Unknown/hidden nodes degrade gracefully so a malformed tree can
// never crash a published page.
export function CraftRenderer({ content }: { content: unknown }) {
  if (!isCraftTree(content)) {
    return <EmptyState />;
  }
  return <RenderNode tree={content} id={ROOT_NODE_ID} />;
}

function RenderNode({ tree, id }: { tree: CraftTree; id: string }) {
  const node = tree[id];
  if (!node || node.hidden) return null;

  const Component = resolveComponent(resolvedName(node));
  const childIds = node.nodes ?? [];
  const children = childIds.map((childId) => (
    <RenderNode key={childId} tree={tree} id={childId} />
  ));

  return (
    <Component {...node.props}>
      {children.length > 0 ? children : null}
    </Component>
  );
}

function EmptyState() {
  return (
    <div className="mx-auto max-w-screen-md px-6 py-24 text-center text-slate-500">
      <p className="text-lg">This page has no content yet.</p>
    </div>
  );
}
