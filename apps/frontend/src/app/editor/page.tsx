import type { Metadata } from 'next';
import { EditorShell } from '@/components/editor/EditorShell';

export const metadata: Metadata = {
  title: 'UnicornTail | Workspace',
};

// The editor is a fully client-side surface (Craft.js drag-and-drop). This
// server page just mounts the client shell that hosts the <Editor> context.
export default function EditorPage() {
  return <EditorShell />;
}
