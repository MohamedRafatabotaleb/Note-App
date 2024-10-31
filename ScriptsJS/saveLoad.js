// saveLoad.js
import { addListItem } from "./utils.js";

// Function to save notes to localStorage
const saveNotes = (listSelector) => {
  const listItems = document.querySelectorAll(`${listSelector} .taskContent`);
  const notes = Array.from(listItems).map((item) => {
    return {
      title: item.querySelector(".taskContent_title").textContent,
      content: item.querySelector(".taskContent_content").textContent,
      date: item.querySelector(".taskContent_date").textContent,
      author: item.querySelector(".taskContent_author").textContent,
    };
  });
  localStorage.setItem(listSelector, JSON.stringify(notes));
};

// Function to load notes from localStorage
const loadNotes = (listSelector) => {
  const savedNotes = JSON.parse(localStorage.getItem(listSelector)) || [];
  savedNotes.forEach((note) => {
    addListItem(listSelector, note.title, note.content, note.date, note.author);
  });
};

// Function to delete all notes from localStorage and clear the list
const deleteAllNotes = (listSelector, string) => {
  const userConfirmed = confirm(string);
  if (userConfirmed) {
    // Clear localStorage
    localStorage.removeItem(listSelector);

    // Clear the list on the page
    const list = document.querySelector(listSelector);

    while (list.firstChild) {
      list.removeChild(list.firstChild);
    }
    saveNotes(listSelector); // Save the updated list to localStorage
  }
};

export { saveNotes, loadNotes, deleteAllNotes };
