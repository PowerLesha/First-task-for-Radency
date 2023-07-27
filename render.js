import { getAllNotes } from "./data.js";

function renderNotesTable() {
  const notesTableBody = document.querySelector("#notes-table-body");
  notesTableBody.innerHTML = "";

  const notes = getAllNotes();
  notes.forEach((note) => {
    if (!note.archived) {
      const row = createTableRow(note);
      notesTableBody.appendChild(row);
    }
  });
}

function renderArchivedNotesTable() {
  const archivedNotesTableBody = document.querySelector(
    "#archived-notes-table-body"
  );
  archivedNotesTableBody.innerHTML = "";

  const notes = getAllNotes();
  notes.forEach((note) => {
    if (note.archived) {
      const row = createTableRow(note, true);
      archivedNotesTableBody.appendChild(row);
    }
  });
}

function renderSummaryTable() {
  const summaryTableBody = document.querySelector("#summary-table-body");
  summaryTableBody.innerHTML = "";

  const categories = ["Task", "Random Thought", "Idea"];
  categories.forEach((category) => {
    const activeCount = countActiveNotesByCategory(category);
    const archivedCount = countArchivedNotesByCategory(category);

    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${category}</td>
      <td>${activeCount}</td>
      <td>${archivedCount}</td>
    `;

    summaryTableBody.appendChild(row);
  });
}

function createTableRow(note, isArchived = false) {
  const row = document.createElement("tr");

  const createdAtCell = document.createElement("td");
  createdAtCell.textContent = note.createdAt.toLocaleString();
  row.appendChild(createdAtCell);

  const contentCell = document.createElement("td");
  contentCell.textContent = note.content;
  row.appendChild(contentCell);

  const categoryCell = document.createElement("td");
  categoryCell.textContent = note.category;
  row.appendChild(categoryCell);

  const datesCell = document.createElement("td");
  const datesList = extractDatesFromString(note.content);
  const datesListText = datesList.join(", ");

  const datesInput = document.createElement("input");
  datesInput.type = "text";
  datesInput.value = datesListText;
  datesCell.appendChild(datesInput);

  row.appendChild(datesCell);

  const actionsCell = document.createElement("td");
  const editBtn = document.createElement("button");
  editBtn.textContent = "Edit";
  editBtn.classList.add("edit-btn");
  editBtn.dataset.noteId = note.id;
  actionsCell.appendChild(editBtn);

  if (!isArchived) {
    const archiveBtn = document.createElement("button");
    archiveBtn.textContent = "Archive";
    archiveBtn.classList.add("archive-btn");
    archiveBtn.dataset.noteId = note.id;
    actionsCell.appendChild(archiveBtn);
  } else {
    const unarchiveBtn = document.createElement("button");
    unarchiveBtn.textContent = "Unarchive";
    unarchiveBtn.classList.add("unarchive-btn");
    unarchiveBtn.dataset.noteId = note.id;
    actionsCell.appendChild(unarchiveBtn);
  }

  const removeBtn = document.createElement("button");
  removeBtn.textContent = "Remove";
  removeBtn.classList.add("remove-btn");
  removeBtn.dataset.noteId = note.id;
  actionsCell.appendChild(removeBtn);

  row.appendChild(actionsCell);

  return row;
}

function extractDatesFromString(content) {
  const dateRegex = /\d{1,2}\/\d{1,2}\/\d{4}/g;
  return content.match(dateRegex) || [];
}

function countActiveNotesByCategory(category) {
  const notes = getAllNotes();
  return notes.filter((note) => note.category === category && !note.archived)
    .length;
}

function countArchivedNotesByCategory(category) {
  const notes = getAllNotes();
  return notes.filter((note) => note.category === category && note.archived)
    .length;
}

export { renderNotesTable, renderArchivedNotesTable, renderSummaryTable };
