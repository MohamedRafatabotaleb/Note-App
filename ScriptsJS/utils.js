import {
  middleColumnClass,
  noteAuthorInput,
  noteContentInput,
  noteTitleInput,
  rightColumnClass,
  rightColumnAddNoteClass,
  emptyListElement,
  rightColumnTitle,
  rightColumnContent,
  rightColumnAuthor,
  rightColumnDate,
  pinnedListContainer,
  pinneddeleteAllButton,
  notesdeleteAllButton,
  notesListContainer,
  AddNotesButtonElement,
  NotesButtonElement,
  screenWidth,
} from "./elements";
import { addDeleteButtonListener } from "./eventListeners.js";

import { saveNotes } from "./saveLoad.js";

// Function to handle adding classes when AddNotes buttons are clicked
const handleAddNotesClick = () => {
  hideElements(middleColumnClass, rightColumnClass);

  // rightColumnAddNoteClass.classList.remove("deactive");

  rightColumnAddNoteClass.style.display = "inline-block";

  AddNotesButtonElement.style.borderLeft = "3px solid var(--color-font-title)";
  AddNotesButtonElement.style.color = "var(--color-font-Dark)";

  NotesButtonElement.style.borderLeft = "none";
  NotesButtonElement.style.color = "var(--color-Light-Gray)";
};

// Function to handle Notes buttons are clicked
const handleNotesClick = () => {
  AddNotesButtonElement.style.borderLeft = "none";
  AddNotesButtonElement.style.color = "var(--color-Light-Gray)";

  NotesButtonElement.style.borderLeft = "3px solid var(--color-font-title)";
  NotesButtonElement.style.color = "var(--color-Light-Dark)";

  middleColumnClass.style.display = "inline-block";

  clearFormFields();
};

// Function to handle removing classes when submit buttons are clicked
const handleSubmitClick = () => {
  middleColumnClass.style.display = "inline-block";
  rightColumnClass.style.display = "inline-block";

  // rightColumnAddNoteClass.classList.add("deactive");
  hideElements(rightColumnAddNoteClass);
};

/***************************************************************************** */

// add Item To List

const addListItem = (
  listSelector,
  noteTitle,
  noteContent,
  dateString,
  noteAuthor
) => {
  const list = document.querySelector(listSelector);
  const newListItem = document.createElement("li");
  newListItem.classList.add("taskContent");

  newListItem.innerHTML = `
    <p class="taskContent_title">${noteTitle}</p>
    <p class="taskContent_content">${noteContent}</p>
    <div class="taskContent_footer">
      <p class="taskContent_date">${dateString}</p>
      <p class="taskContent_author">${noteAuthor}</p>
      <button class="taskContent_buttonDelete">Delete</button>
    </div>
  `;

  list.appendChild(newListItem);

  // Add event listener for the delete button
  addDeleteButtonListener(newListItem, listSelector, saveNotes);

  saveNotes(listSelector); // Save the new note to localStorage
};

const getCurrentDate = () => {
  const today = new Date();
  const options = { year: "numeric", month: "short", day: "numeric" };
  return today.toLocaleDateString("en-US", options);
};

// Function to get note data
const getNoteData = () => {
  const noteTitle = noteTitleInput.value;
  const noteAuthor = noteAuthorInput.value;
  const noteContent = noteContentInput.value;
  const dateString = getCurrentDate();

  return { noteTitle, noteAuthor, noteContent, dateString };
};

const clearFormFields = () => {
  document.querySelector(".AddNotes_title").value = "";
  document.querySelector(".AddNotes_author").value = "";
  document.querySelector(".AddNotes_note").value = "";
};

const clearRightColumnData = () => {
  emptyListElement.style.display = "inline-block";

  rightColumnTitle.innerText = "";
  rightColumnContent.innerText = "";
  rightColumnAuthor.innerText = "";
  rightColumnDate.innerText = "";
};

// Function to check if the list is empty and toggle the delete button visibility
const checkListEmpty = (listContainer, butonDelAll) => {
  // Check if the list is empty
  if (listContainer.children.length === 0) {
    // Hide the delete button if the list is empty
    butonDelAll.style.display = "none";
    clearRightColumnData();
  } else {
    // Show the delete button if there are items in the list
    butonDelAll.style.display = "inline-block";
  }
};

// Checks if the title, author, and note content fields are filled in; returns false if any are empty.
const validateFields = () => {
  const title = document.querySelector(".AddNotes_title").value.trim();
  const author = document.querySelector(".AddNotes_author").value.trim();
  const note = document.querySelector(".AddNotes_note").value.trim();

  if (title === "") {
    alert("Please fill in the title.");
    return false;
  }
  if (author === "") {
    alert("Please fill in the author.");
    return false;
  }
  if (note === "") {
    alert("Please fill in the note content.");
    return false;
  }
  return true;
};

// Attaches a click event listener to add a note to the specified list when the button is clicked.
const submitAddNote = (BTN, listName) => {
  // Add event listener for the "Add Note" button
  BTN.addEventListener("click", (event) => {
    event.preventDefault();

    clearRightColumnData();

    if (!validateFields()) {
      return; // Exit if validation fails
    }
    // Get note data once
    const { noteTitle, noteContent, dateString, noteAuthor } = getNoteData();

    addListItem(listName, noteTitle, noteContent, dateString, noteAuthor);

    // Clear form fields
    clearFormFields();
    handleSubmitClick();

    checkListEmpty(pinnedListContainer, pinneddeleteAllButton);
    checkListEmpty(notesListContainer, notesdeleteAllButton);
    handleNotesClick();
    emptyListElement.style.display = "inline-block";

    if (screenWidth > 650) {
      rightColumnClass.style.display = "inline-block";
    }
  });
};

// Hide Elements
const hideElements = (...elements) => {
  elements.forEach((element) => (element.style.display = "none"));
};

// Translate 200px

const translateX = (...args) => {
  for (let i = 0; i < args.length; i += 2) {
    const element = args[i];
    const distance = args[i + 1];
    element.style.transform = `translateX(${distance}px)`;
  }
};

export {
  addListItem,
  getCurrentDate,
  getNoteData,
  handleAddNotesClick,
  handleSubmitClick,
  clearFormFields,
  clearRightColumnData,
  checkListEmpty,
  submitAddNote,
  handleNotesClick,
  hideElements,
  translateX,
};
