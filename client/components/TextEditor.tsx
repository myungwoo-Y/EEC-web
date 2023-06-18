import {
  ArrowLeftCircleIcon,
  ArrowRightCircleIcon,
  LinkIcon,
} from '@heroicons/react/24/outline';
import { Color } from '@tiptap/extension-color';
import ListItem from '@tiptap/extension-list-item';
import TextStyle from '@tiptap/extension-text-style';
import { EditorContent, useEditor, Editor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import React, { useCallback } from 'react';
import BoldIcon from 'remixicon-react/BoldIcon';
import ItalicIcon from 'remixicon-react/ItalicIcon';
import StrikethroughIcon from 'remixicon-react/StrikethroughIcon';
import H1Icon from 'remixicon-react/H1Icon';
import H2Icon from 'remixicon-react/H2Icon';
import ListCheckIcon from 'remixicon-react/ListCheckIcon';
import ListOrderedIcon from 'remixicon-react/ListOrderedIcon';

type TextEditorProps = {
  className?: string;
  setContent: (param: string) => any;
};

const MenuBar = ({ editor }: { editor: Editor | null }) => {
  if (!editor) {
    return null;
  }

  const setLink = useCallback(() => {
    const previousUrl = editor.getAttributes('link').href;
    const url = window.prompt('URL', previousUrl);

    // cancelled
    if (url === null) {
      return
    }

    // empty
    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink()
        .run()

      return
    }

    // update link
    editor.chain().focus().extendMarkRange('link').setLink({ href: url })
      .run()
  }, [editor])

  return (
    <div className="p-2 flex items-center">
      <button 
        onClick={setLink}
        className="w-8 h-8 text-center text-gray-500 disabled:text-gray-300 hover:bg-gray-100 p-1 rounded-md  flex items-center"
      >
        <LinkIcon width={20} />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        className="w-8 h-8 text-center text-gray-500 hover:bg-gray-100 p-1 rounded-md"
      >
        <BoldIcon className="w-5" />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        disabled={!editor.can().chain().focus().toggleItalic().run()}
        className="w-8 h-8 text-center text-gray-500 hover:bg-gray-100 p-1 rounded-md"
      >
        <ItalicIcon className="w-5" />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleStrike().run()}
        disabled={!editor.can().chain().focus().toggleStrike().run()}
        className="w-8 h-8 text-center text-gray-500 hover:bg-gray-100 p-1 rounded-md"
      >
        <StrikethroughIcon className="w-5" />
      </button>
      <div className="w-[1px] h-6 bg-gray-200 mx-1"></div>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        className="w-8 h-8 text-center text-gray-500 hover:bg-gray-100 p-1 rounded-md"
      >
        <H1Icon className="w-5" />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className="w-8 h-8 text-center text-gray-500 hover:bg-gray-100 p-1 rounded-md"
      >
        <H2Icon className="w-5" />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className="w-8 h-8 text-center text-gray-500 hover:bg-gray-100 p-1 rounded-md"
      >
        <ListCheckIcon className="w-5" />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className="w-8 h-8 text-center text-gray-500 hover:bg-gray-100 p-1 rounded-md"
      >
        <ListOrderedIcon className="w-5" />
      </button>
      <div className="w-[1px] h-6 bg-gray-200 mx-1"></div>
      <button
        onClick={() => editor.chain().focus().undo().run()}
        disabled={!editor.can().chain().focus().undo().run()}
        className="w-8 h-8 text-center text-gray-500 disabled:text-gray-300 hover:bg-gray-100 p-1 rounded-md flex items-center"
      >
        <ArrowLeftCircleIcon width={24} />
      </button>
      <button
        onClick={() => editor.chain().focus().redo().run()}
        disabled={!editor.can().chain().focus().redo().run()}
        className="w-8 h-8 text-center text-gray-500 disabled:text-gray-300 hover:bg-gray-100 p-1 rounded-md  flex items-center"
      >
        <ArrowRightCircleIcon width={24} />
      </button>
    </div>
  );
};

const TextEditor = ({ className = '', setContent }: TextEditorProps) => {
  const editor = useEditor({
    onUpdate: ({ editor }) => {
      setContent(editor.getHTML());
    },
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
    content: ''
  });

  return (
    <div className={`border-2 border-gray-300 rounded-md ${className}`}>
      <MenuBar editor={editor} />
      <EditorContent
        editor={editor}
        className="p-2 border-t-[1px] border-gray-200 overflow-y-scroll h-96"
      />
    </div>
  );
};

export default TextEditor;
