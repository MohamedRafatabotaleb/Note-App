import {
  AddNotesButtonElement,
  AddNotesButtonCircleElement,
  pinnedListContainer,
  notesListContainer,
  rightColumnTitle,
  rightColumnContent,
  rightColumnDate,
  rightColumnAuthor,
  emptyListElement,
  deleteButtonSelector,
  pinneddeleteAllButton,
  notesdeleteAllButton,
  submitAddNotePinnedButton,
  submitAddNoteButton,
  taskContentMain,
  searchButtonElement,
  searchInputElement,
  NotesButtonElement,
  burgerMenuButton,
  headerElement,
  middleColumnClass,
  leftColumnClass,
  closeMenuButton,
  headerSearchButton,
  headerSearchElement,
  headerSearchInputElement,
  rightColumnClass,
  headerSearchImg,
  rightColumnAddNoteClass,
  screenWidth,
} from "./elements.js";

import {
  checkListEmpty,
  clearRightColumnData,
  handleAddNotesClick,
  handleNotesClick,
  hideElements,
  submitAddNote,
  translateX,
} from "./utils.js";

import { deleteAllNotes, loadNotes } from "./saveLoad.js";

let searchMenuOpen = false;
let showMiddleColumn = true;
let showLeftColumn = true;
let showRightColumn = true;
let showRightAddNoteColumn = true;

const varMain = () => {
  if (window.innerWidth <= 650) {
    searchMenuOpen = false;
    showMiddleColumn = true;
    showLeftColumn = false;
    showRightColumn = false;
    showRightAddNoteColumn = false;
  }
};

// Add event listeners for the AddNotes buttons
AddNotesButtonElement.addEventListener("click", () => {
  if (window.innerWidth <= 940) {
    console.log("MainWidth");

    searchMenuOpen = true;
    headerSearchImg.src = "assets/close_icon.png";
  }
  handleAddNotesClick();
});

AddNotesButtonCircleElement.addEventListener("click", handleAddNotesClick);

NotesButtonElement.addEventListener("click", () => {
  headerSearchImg.src = "assets/Search_icon.svg";
  searchMenuOpen = false;

  if (screenWidth >= 650) {
    handleNotesClick();
    hideElements(rightColumnAddNoteClass);

    rightColumnClass.style.display = "inline-block";
    emptyListElement.style.display = "inline-block";
  } else if (screenWidth < 650) {
    handleNotesClick();
    hideElements(rightColumnAddNoteClass, rightColumnClass);
  }
  clearRightColumnData();
});

document.addEventListener("DOMContentLoaded", () => {
  // Load saved notes on page load
  loadNotes(".notes_list");
  loadNotes(".pinned_list");

  submitAddNote(submitAddNoteButton, ".notes_list");
  submitAddNote(submitAddNotePinnedButton, ".pinned_list");

  checkListEmpty(pinnedListContainer, pinneddeleteAllButton);
  checkListEmpty(notesListContainer, notesdeleteAllButton);

  rightColumnAddNoteClass.style.display = "none";
});

const handleTaskSelection = () => {
  document.addEventListener("DOMContentLoaded", () => {
    // Function to handle click events and update the right-column
    const handleTaskClick = (event) => {
      if (
        event.target &&
        (event.target.classList.contains("taskContent_content") ||
          event.target.classList.contains("taskContent_title"))
      ) {
        const taskContent = event.target.closest(".taskContent");

        const titleElement = taskContent.querySelector(".taskContent_title");
        const contentElement = taskContent.querySelector(
          ".taskContent_content"
        );
        const dateElement = taskContent.querySelector(".taskContent_date");
        const authorElement = taskContent.querySelector(".taskContent_author");

        if (titleElement && contentElement && dateElement && authorElement) {
          const title = titleElement.innerText;
          const content = contentElement.innerText;
          const date = dateElement.innerText;
          const author = authorElement.innerText;

          if (rightColumnTitle && rightColumnContent && rightColumnDate) {
            rightColumnTitle.innerText = title;
            rightColumnContent.innerText = content;
            rightColumnAuthor.innerText = author;
            rightColumnDate.innerText = date;

            /* Remove Empty List Photo */
            hideElements(emptyListElement);
          } else {
            console.error(
              'One or more elements in "right-column" are missing.'
            );
          }
        } else {
          console.error('One or more elements in "taskContent" are missing.');
        }

        // Check the screen width and log message if it's smaller than 322px
        if (screenWidth <= 650) {
          // rightColumnClass.style.paddingTop = "80px";
          //  rightColumnClass.style.paddingLeft = "15px";

          hideElements(middleColumnClass);

          searchMenuOpen = true;
          headerSearchElement.style.transform = "translateY(-130px)";

          headerSearchImg.src = "assets/close_icon.png";
        }
        rightColumnClass.style.display = "inline-block";
      }
    };

    const taskContainers = [pinnedListContainer, notesListContainer];
    taskContainers.forEach((container) => {
      if (container) {
        container.addEventListener("click", handleTaskClick);
      }
    });
  });
};

// Delete Button Listener
const addDeleteButtonListener = (listItem, listSelector, saveNotes) => {
  const deleteButton = listItem.querySelector(deleteButtonSelector);

  deleteButton.addEventListener("click", () => {
    const userConfirmed = confirm("Are you sure you want to delete this task?");
    if (userConfirmed) {
      listItem.remove();
      saveNotes(listSelector); // Save the updated list to localStorage

      checkListEmpty(pinnedListContainer, pinneddeleteAllButton);
      checkListEmpty(notesListContainer, notesdeleteAllButton);
    }
  });
};

const deleteAllPinnedFUN = () => {
  pinneddeleteAllButton.addEventListener("click", () => {
    deleteAllNotes(
      ".pinned_list",
      "Are you sure you want to delete all the pinned notes?"
    );
    checkListEmpty(pinnedListContainer, pinneddeleteAllButton);
  });
};

const deleteAllNotesFUN = () => {
  notesdeleteAllButton.addEventListener("click", () => {
    deleteAllNotes(
      ".notes_list",
      "Are you sure you want to delete all the notes?"
    );
    checkListEmpty(notesListContainer, notesdeleteAllButton);
  });
};

/*************************************************** */

// Define the search function
function searchFunction() {
  // Get the search input values and combine them
  const combinedSearchValue = (
    searchInputElement.value +
    " " +
    headerSearchInputElement.value
  )
    .toLowerCase()
    .trim();

  // Get all taskContent elements
  const taskContents = document.querySelectorAll(".taskContent");

  // If combined search value is empty, reset the styles of all taskContents
  if (combinedSearchValue === "") {
    taskContents.forEach((taskContent) => {
      taskContent.style.backgroundColor = ""; // Remove the background color
      taskContent.style.border = ""; // Remove the border
      taskContent.style.borderRadius = ""; // Remove the border radius
    });
    console.log("All task styles have been reset.");
    return; // Exit the function early since no search is needed
  }

  // Counter for matching titles
  let matchCount = 0;

  // Loop through the taskContent NodeList and check for matches in the title
  taskContents.forEach((taskContent) => {
    const title = taskContent
      .querySelector(".taskContent_title")
      .textContent.toLowerCase();

    // Reset the styles before applying new highlights
    taskContent.style.backgroundColor = ""; // Remove the background color
    taskContent.style.border = ""; // Remove the border
    taskContent.style.borderRadius = ""; // Remove the border radius

    // Check if the title includes the combined search value
    if (title.includes(combinedSearchValue)) {
      matchCount++;

      // Apply the new styles for matching taskContent
      taskContent.style.backgroundColor = "var(--color-Line-LightGray)"; // Set background color
      taskContent.style.border = "1px solid var(--color-font-title)"; // Set border
      taskContent.style.borderRadius = "8px"; // Set rounded corners
    }
  });

  // Log the result
  console.log(`${matchCount} matching tasks found`);
}

// Add click event listener to the search button
searchButtonElement.addEventListener("click", searchFunction);

// Optionally, you might want to handle the "input" event on the search input field to reset highlights dynamically
searchInputElement.addEventListener("input", searchFunction);
headerSearchInputElement.addEventListener("input", searchFunction);

/********************************************************** */

/* burger Menu */

burgerMenuButton.addEventListener("click", () => {
  translateX(
    headerElement,
    200,
    middleColumnClass,
    200,
    rightColumnClass,
    200,
    rightColumnAddNoteClass,
    200,
    leftColumnClass,
    0
  );

  headerSearchElement.style.transform = "translateY(-130px)";

  if (screenWidth < 650) {
    if (window.getComputedStyle(rightColumnClass).display === "none") {
      if (
        window.getComputedStyle(rightColumnAddNoteClass).display ===
        "inline-block"
      ) {
        headerSearchImg.src = "assets/close_icon.png";
      } else if (
        window.getComputedStyle(rightColumnAddNoteClass).display === "none"
      ) {
        headerSearchImg.src = "assets/Search_icon.svg";
        searchMenuOpen = false;
      }
    }
  }

  if (screenWidth > 650) {
    if (window.getComputedStyle(rightColumnAddNoteClass).display === "none") {
      if (searchMenuOpen === true) {
        headerSearchImg.src = "assets/Search_icon.svg";
        searchMenuOpen = false;
        console.log("close Search bar");
      }
    }
  }
});

closeMenuButton.addEventListener("click", () => {
  translateX(
    headerElement,
    0,
    middleColumnClass,
    0,
    rightColumnClass,
    0,
    rightColumnAddNoteClass,
    0,
    leftColumnClass,
    -200
  );
});
/* End burger Menu */

/* Header search */

headerSearchButton.addEventListener("click", () => {
  if (searchMenuOpen) {
    searchMenuOpen = false;

    if (window.getComputedStyle(rightColumnAddNoteClass).display != "none") {
      rightColumnClass.style.display = "inline-block";
      clearRightColumnData();
    }

    headerSearchElement.style.transform = "translateY(-130px)";
    headerSearchImg.src = "assets/Search_icon.svg";

    searchInputElement.value = " ";
    headerSearchInputElement.value = "";
    middleColumnClass.style.display = "inline-block";

    if (screenWidth < 650) {
      hideElements(rightColumnClass);
    }

    hideElements(rightColumnAddNoteClass);
    showRightAddNoteColumn = false;

    searchFunction();

    handleNotesClick();

    console.log("search close");
  } else {
    searchMenuOpen = true;

    headerSearchElement.style.transform = "translateY(0)";
    headerSearchImg.src = "assets/close_icon.png";
    console.log("search open");
  }
});

/* End Header search */

// Initialize event listeners
const initEventListeners = () => {
  deleteAllPinnedFUN();
  deleteAllNotesFUN();
  handleTaskSelection();

  // Log it to the console
  console.log("Screen width is: " + screenWidth + "px");

  varMain();
};

export { initEventListeners, addDeleteButtonListener, taskContentMain };
