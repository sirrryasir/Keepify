export const getNotes = async () => {
  const response = await fetch("http://localhost:3000/api/notes");
  return response.json();
};

export const createNote = async (noteData) => {
  const response = await fetch("http://localhost:3000/api/notes", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(noteData),
  });
  return response.json();
};

export const deleteNote = async (id) => {
  await fetch(`http://localhost:3000/api/notes/${id}`, {
    method: "DELETE",
  });
};

export const updateNote = async (id, noteData) => {
  const response = await fetch(`http://localhost:3000/api/notes/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(noteData),
  });
  return response.json();
};
