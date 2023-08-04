import { Color } from '@tiptap/extension-color';
import ListItem from '@tiptap/extension-list-item';
import TextStyle from '@tiptap/extension-text-style';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import React from 'react';
import styles from './TextEditor.module.scss';
import classNames from 'classnames';
import Table from '@tiptap/extension-table';
import TableRow from '@tiptap/extension-table-row';
import TableHeader from '@tiptap/extension-table-header';
import TableCell from '@tiptap/extension-table-cell';

type ViewEditorProps = {
  className?: string;
  content: string;
};

const ViewEditor = ({ className = '', content }: ViewEditorProps) => {
  const tableExtensions = [
    Table.configure({
      resizable: true,
    }),
    TableRow,
    TableHeader,
    TableCell,
  ];

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
      ...tableExtensions
    ],
    editable: false,
    content: content
  });

  return (
    <div className={`${className}`}>
      <EditorContent
        editor={editor}
        className={classNames("", styles.tableWrapper, styles.proseMirror, styles.viewEditor)}
      />
    </div>
  );
};

export default ViewEditor;
