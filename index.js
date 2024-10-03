import { initEventListeners } from "./ScriptsJS/eventListeners";

import { loadNotes } from "./ScriptsJS/saveLoad.js";

// Initialize event listeners
initEventListeners();

document.addEventListener("DOMContentLoaded", () => {
  loadNotes();
});
