import { useState } from "react";

export default function NoteEditor({ note, onSave, onClose }) {
  const [title, setTitle] = useState(note.title);
  const [content, setContent] = useState(note.content);

  const save = () => {
    onSave(note._id, { title, content });
    onClose();
  };

  return (
    <div
      className="fixed inset-0 bg-black/40 flex items-center 
                    justify-center z-50"
    >
      <div className="bg-white w-full max-w-md p-5 rounded-xl shadow-xl">
        <input
          value={title}
          placeholder="Title"
          onChange={(e) => setTitle(e.target.value)}
          className="w-full mb-3 text-lg font-semibold outline-none"
        />
        <textarea
          value={content}
          placeholder="Content"
          onChange={(e) => setContent(e.target.value)}
          rows={5}
          className="w-full outline-none resize-none"
        />

        <div className="flex justify-end space-x-3 mt-4">
          <button onClick={onClose} className="px-3">
            Cancel
          </button>
          <button
            onClick={save}
            className="px-4 py-1.5 bg-blue-600 text-white rounded"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
