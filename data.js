let notes = [
  // Prepopulated notes (for demonstration purposes)
  {
    id: 1,
    createdAt: new Date("2023-07-26T10:30:00"),
    content: "This is a task note",
    category: "Task",
    archived: false,
  },
  {
    id: 2,
    createdAt: new Date("2023-07-25T14:45:00"),
    content: "I have a random thought",
    category: "Random Thought",
    archived: false,
  },
  {
    id: 3,
    createdAt: new Date("2023-07-24T20:15:00"),
    content: "An interesting idea came to mind",
    category: "Idea",
    archived: false,
  },
];

function getAllNotes() {
  return notes;
}

function addNewNote(note) {
  notes.push(note);
}

function archiveNote(noteId) {
  const note = notes.find((note) => note.id == noteId);
  if (note) {
    note.archived = true;
  }
}

function unarchiveNote(noteId) {
  const note = notes.find((note) => note.id == noteId);
  if (note) {
    note.archived = false;
  }
}

function removeNote(noteId) {
  notes = notes.filter((note) => note.id != noteId);
}

function updateNote(noteId, updatedNote) {
  const noteIndex = notes.findIndex((note) => note.id == noteId);
  if (noteIndex !== -1) {
    notes[noteIndex] = { ...updatedNote, id: noteId };
  }
}

export {
  getAllNotes,
  addNewNote,
  archiveNote,
  unarchiveNote,
  removeNote,
  updateNote,
};
