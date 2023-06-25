import { Color } from '@tiptap/extension-color';
import ListItem from '@tiptap/extension-list-item';
import TextStyle from '@tiptap/extension-text-style';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import React from 'react';

type ViewEditorProps = {
  className?: string;
  content: string;
};

const ViewEditor = ({ className = '', content }: ViewEditorProps) => {
  const editor = useEditor({
    extensions: [
      Color.configure({ types: [TextStyle.name, ListItem.name] }),
      TextStyle,
      StarterKit.configure({
        bulletList: {
          keepMarks: true,
          keepAttributes: false,
          HTMLAttributes: {
            class: 'list-disc ml-4'
          }
        },
        orderedList: {
          keepMarks: true,
          keepAttributes: false,
          HTMLAttributes: {
            class: 'list-decimal ml-4'
          }
        },
      }),
      Link.configure({
        openOnClick: true,
      }),
    ],
    content: content
  });

  return (
    <div className={`border-2 border-gray-300 rounded-md ${className}`}>
      <EditorContent
        editor={editor}
        className="p-2 border-t-[1px] border-gray-200 overflow-y-scroll h-96"
      />
    </div>
  );
};

export default ViewEditor;
