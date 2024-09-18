

// Declaring all global variables
const allImgCont = document.querySelectorAll(".img-container");
let allowed = true; // Set allowed to true by default
let dragSrcElem = null;

// Function to shuffle the puzzle pieces
function shufflePuzzle() {
  const container = document.querySelector('.piece-images');
  const itemsArray = Array.from(container.children);
  
  // Shuffle the array
  for (let i = itemsArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [itemsArray[i].innerHTML, itemsArray[j].innerHTML] = [itemsArray[j].innerHTML, itemsArray[i].innerHTML];
  }
  
  // Append the shuffled items back to the container
  itemsArray.forEach(item => container.appendChild(item));
}

// Images that will be dragged
function imgStartDrag(e) {
  if (allowed) {
    dragSrcElem = this;
    e.dataTransfer.setData("text/html", this.innerHTML);
    e.dataTransfer.effectAllowed = "move"; // Allow move effect
  }
}

// Where all images will be dropped
function imgDragOver(ev) {
  ev.preventDefault(); // Necessary to allow drop
  ev.dataTransfer.dropEffect = "move"; // Show move cursor
}

// When dropping occurs
function imgDropOn(evt) {
  evt.preventDefault(); // Prevent default action
  if (dragSrcElem !== this) {
    const srcHTML = dragSrcElem.innerHTML;
    dragSrcElem.innerHTML = this.innerHTML;
    this.innerHTML = srcHTML;
  }
  return false;
}

// Attach event listeners
allImgCont.forEach((item) => {
  item.addEventListener("dragstart", imgStartDrag);
  item.addEventListener("dragover", imgDragOver);
  item.addEventListener("drop", imgDropOn);
});

// Initialize the game
function initGame() {
  shufflePuzzle();
}

// Start the game on page load
window.addEventListener('load', initGame);
