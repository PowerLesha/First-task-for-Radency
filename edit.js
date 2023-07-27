import { getAllNotes, updateNote } from "./data.js";
import { renderNotesTable, renderArchivedNotesTable } from "./render.js";

function handleEditNoteClick(event) {
  const noteId = event.target.dataset.noteId;
  const note = getAllNotes().find((note) => note.id == noteId);
  if (note) {
    const updatedNoteContent = prompt(
      "Enter updated note content:",
      note.content
    );
    if (updatedNoteContent !== null) {
      const updatedNote = { ...note, content: updatedNoteContent };
      updateNote(noteId, updatedNote);
      renderNotesTable();
      renderArchivedNotesTable();
    }
  }
}

export { handleEditNoteClick };
