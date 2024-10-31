const NotesButtonElement = document.querySelector(".notes-button");
const AddNotesButtonElement = document.querySelector(".AddNotes-button");
const AddNotesButtonCircleElement = document.querySelector(".circle-add");

const leftColumnClass = document.querySelector(".left-column");
const middleColumnClass = document.querySelector(".middle-column");
const rightColumnClass = document.querySelector(".right-column");
const rightColumnAddNoteClass = document.querySelector(
  ".right-column-AddNotes"
);

const noteTitleInput = document.querySelector(".AddNotes_title");
const noteAuthorInput = document.querySelector(".AddNotes_author");
const noteContentInput = document.querySelector(".AddNotes_note");

const submitAddNoteButton = document.querySelector(".submitAddNote");
const submitAddNotePinnedButton = document.querySelector(
  ".submitAddNotePinned"
);

// Task containers
const pinnedListContainer = document.querySelector(".pinned_list");
const notesListContainer = document.querySelector(".notes_list");

// Right column elements
const rightColumnTitle = document.querySelector(".right-column_title");
const rightColumnContent = document.querySelector(".right-column_content");
const rightColumnAuthor = document.querySelector(".right-column_author");
const rightColumnDate = document.querySelector(".right-column_date");

// Select the <div> with the class 'right-column'
const rightColumnDiv = document.querySelector(".right-column");

// Empty List Photo
const emptyListElement = document.querySelector(".EmptyList");

// Delete Button
const deleteButtonSelector = ".taskContent_buttonDelete";

const pinneddeleteAllButton = document.querySelector(".pinned_deleteAll");
const notesdeleteAllButton = document.querySelector(".notes_deleteAll");

let taskContentMain = "";

// Get the search button and input using class selectors
const searchButtonElement = document.querySelector(".search_Button");
const searchInputElement = document.querySelector(".search_Input");
const headerSearchInputElement = document.querySelector(".header_search_Input");

const taskTitles = document.querySelectorAll(".taskContent_title");

// Menu Burger

const burgerMenuButton = document.querySelector(".burger-menu");
const headerElement = document.querySelector(".header");
const closeMenuButton = document.querySelector(".close-menu");

// header search

const headerSearchButton = document.querySelector(".header_search_Button");
const headerSearchElement = document.querySelector(".header_search");
const headerSearchImg = document.querySelector(".header_search_Button_img");

// Get the screen width
const screenWidth = window.innerWidth;

export {
  AddNotesButtonElement,
  middleColumnClass,
  rightColumnClass,
  AddNotesButtonCircleElement,
  noteTitleInput,
  noteContentInput,
  submitAddNoteButton,
  submitAddNotePinnedButton,
  noteAuthorInput,
  rightColumnAddNoteClass,
  pinnedListContainer,
  notesListContainer,
  rightColumnTitle,
  rightColumnContent,
  rightColumnDate,
  rightColumnAuthor,
  rightColumnDiv,
  emptyListElement,
  deleteButtonSelector,
  pinneddeleteAllButton,
  notesdeleteAllButton,
  taskContentMain,
  searchButtonElement,
  searchInputElement,
  taskTitles,
  NotesButtonElement,
  burgerMenuButton,
  headerElement,
  leftColumnClass,
  closeMenuButton,
  headerSearchButton,
  headerSearchElement,
  headerSearchInputElement,
  headerSearchImg,
  screenWidth,
};
