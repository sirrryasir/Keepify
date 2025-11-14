import React, { useState, useRef, useEffect } from "react";

export default function NoteInput({ onAdd }) {
  const [expanded, setExpanded] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const wrapperRef = useRef(null);

  const submit = async () => {
    const hasContent = title.trim() || content.trim();
    if (hasContent) {
      await onAdd({ title: title.trim(), content: content.trim() });
    }
    setTitle("");
    setContent("");
    setExpanded(false);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        expanded &&
        wrapperRef.current &&
        !wrapperRef.current.contains(e.target)
      ) {
        submit();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [expanded, title, content]);

  return (
    <div ref={wrapperRef} className="w-full max-w-3xl mx-auto mb-6">
      {!expanded ? (
        <div
          role="button"
          onClick={() => setExpanded(true)}
          className="bg-white rounded-xl shadow p-4 cursor-text 
                     flex items-center space-x-3 hover:shadow-md 
                     transition-all duration-200"
        >
          <input
            value={title ?? ""}
            readOnly
            placeholder="Take a note..."
            className="flex-1 bg-transparent outline-none placeholder-gray-500 text-gray-700"
          />
          <div className="text-gray-500 text-xl font-bold">+</div>
        </div>
      ) : (
        <div
          className="bg-white rounded-xl shadow-md p-5 
                     transition-all duration-200"
        >
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
            className="w-full mb-2 text-lg font-medium outline-none"
          />
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Take a note..."
            rows={3}
            className="w-full mb-3 resize-none outline-none text-sm"
          />

          <div className="flex justify-end">
            <button
              type="button"
              onClick={submit}
              className="px-4 py-1.5 bg-blue-500 text-white rounded-lg 
                         text-sm font-medium hover:bg-blue-600 
                         transition"
            >
              Done
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
