import { handleEditNoteClick } from "./edit.js";
import { addNewNote, archiveNote, unarchiveNote, removeNote } from "./data.js";
import {
  renderNotesTable,
  renderArchivedNotesTable,
  renderSummaryTable,
} from "./render.js";

// Function to handle the "Add Note" form submission
function handleAddNoteFormSubmit(event) {
  event.preventDefault();

  const content = document.querySelector("#content").value;
  const category = document.querySelector("#category").value;

  // Create a new note object with the form data
  const newNote = {
    id: Date.now(), // A simple way to generate a unique ID (not suitable for production)
    createdAt: new Date(),
    content,
    category,
    archived: false,
  };

  // Add the new note to the data
  addNewNote(newNote);

  // Clear the form fields
  document.querySelector("#content").value = "";
  document.querySelector("#category").value = "Task";

  // Render the updated notes table and summary
  renderNotesTable();
  renderArchivedNotesTable();
  renderSummaryTable();
}

// Function to handle the "Archive" and "Unarchive" buttons
function handleActionButtonClick(event, action) {
  const noteId = event.target.dataset.noteId;

  switch (action) {
    case "archive":
      archiveNote(noteId);
      break;
    case "unarchive":
      unarchiveNote(noteId);
      break;
    case "remove":
      removeNote(noteId);
      break;
    default:
      return;
  }

  // Render the updated notes table and summary
  renderNotesTable();
  renderArchivedNotesTable();
  renderSummaryTable();
}

// Attach event listeners
document.addEventListener("DOMContentLoaded", () => {
  const addNoteForm = document.querySelector("#add-note-form");
  addNoteForm.addEventListener("submit", handleAddNoteFormSubmit);

  const notesTable = document.querySelector("#notes-table");
  notesTable.addEventListener("click", (event) => {
    if (event.target.classList.contains("edit-btn")) {
      handleEditNoteClick(event);
    } else if (event.target.classList.contains("archive-btn")) {
      handleActionButtonClick(event, "archive");
    } else if (event.target.classList.contains("unarchive-btn")) {
      handleActionButtonClick(event, "unarchive");
    } else if (event.target.classList.contains("remove-btn")) {
      handleActionButtonClick(event, "remove");
    }
  });

  // Add event listener for the "Unarchive" button in archived notes table
  const archivedNotesTable = document.querySelector("#archived-notes-table");
  archivedNotesTable.addEventListener("click", (event) => {
    if (event.target.classList.contains("unarchive-btn")) {
      handleActionButtonClick(event, "unarchive");
    }
  });

  // Initial rendering of notes table and summary on page load
  renderNotesTable();
  renderArchivedNotesTable();
  renderSummaryTable();
});
