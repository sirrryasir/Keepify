import { Trash2 } from "lucide-react";

export default function NoteCard({ note, onDelete, onEdit }) {
  return (
    <div
      onClick={onEdit}
      className="bg-white p-4 rounded-xl shadow hover:shadow-md 
                 transition-all duration-200 border border-gray-200 
                 break-words whitespace-pre-wrap relative group cursor-pointer"
    >
      {/* Delete Button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onDelete(note._id);
        }}
        className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 
                   text-gray-500 hover:text-red-500 transition"
      >
        <Trash2 size={18} />
      </button>

      <h2 className="text-md font-semibold text-gray-800">{note.title}</h2>

      <p className="text-sm text-gray-700 mt-2 leading-relaxed">
        {note.content}
      </p>
    </div>
  );
}
