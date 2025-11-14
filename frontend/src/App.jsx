import React, { useState, useEffect } from "react";
import NoteInput from "./components/NoteInput";
import NoteCard from "./components/NoteCard";
import NoteEditor from "./components/NoteEditor";
import {
  getNotes,
  createNote,
  deleteNote,
  updateNote,
} from "./lib/api/note.js";

function App() {
  const [notes, setNotes] = useState([]);
  const [editingNote, setEditingNote] = useState(null);

  useEffect(() => {
    loadNotes();
  }, []);

  const loadNotes = async () => {
    try {
      const data = await getNotes();
      setNotes(data);
    } catch (error) {
      console.error("Error loading notes:", error);
    }
  };

  const addNote = async (noteData) => {
    try {
      const newNote = await createNote(noteData);
      setNotes((prev) => [newNote, ...prev]);
    } catch (error) {
      console.error("Error creating note:", error);
    }
  };

  const removeNote = async (id) => {
    try {
      await deleteNote(id);
      setNotes((prev) => prev.filter((note) => note._id !== id));
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };

  const editNote = async (id, noteData) => {
    try {
      const updatedNote = await updateNote(id, noteData);
      setNotes((prev) =>
        prev.map((note) => (note._id === id ? updatedNote : note))
      );
    } catch (error) {
      console.error("Error updating note:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      {/* Header */}
      <header className="w-full max-w-4xl flex items-center justify-center mb-6">
        <div className="flex items-center">
          <img src="/image.png" alt="Keepify Logo" className="w-12 h-12 mr-3" />
          <h1 className="text-2xl font-semibold">Keepify</h1>
        </div>
      </header>

      <NoteInput onAdd={addNote} />

      <main className="w-full max-w-5xl">
        <div
          className="
      grid 
      grid-cols-1 
      sm:grid-cols-2 
      md:grid-cols-3 
      lg:grid-cols-4
      gap-4
  "
        >
          {!notes.length && (
            <p className="text-center col-span-full text-gray-500">
              No notes available. Start by adding a new note!
            </p>
          )}

          {notes.map((note) => (
            <NoteCard
              key={note._id}
              note={note}
              onDelete={() => removeNote(note._id)}
              onEdit={() => setEditingNote(note)}
            />
          ))}
        </div>

        {editingNote && (
          <NoteEditor
            note={editingNote}
            onSave={editNote}
            onClose={() => setEditingNote(null)}
          />
        )}
      </main>
    </div>
  );
}

export default App;
