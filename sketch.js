const defaultSize = 16;

const grid = document.querySelector(".grid-container");
const resizeBtn = document.querySelector("#resize-btn");
const resizeInput = document.querySelector("#resize-input");
const colorSelector = document.querySelector("#color-selector");

const colorSquare = (square) => {
  square.style.backgroundColor = colorSelector.value;
}

const clearSquare = (square) => {
  square.style.backgroundColor = "white";
}


const createGrid = (size) => {
  for (let i = 1; i < (size)*(size)+1; i++) {
    const square = document.createElement("div");
    square.style.width = `calc(640px / ${size})`;
    square.classList.add("square");
    // Add right border to last element of each row
    if (i % size == 0) {
      square.classList.add("border-right");
    }
    // Add bottom border to all elements of last row
    if (i > (size*(size-1))) {
      square.classList.add("border-bottom");
    }

    const controller = new AbortController();

    square.addEventListener("mouseenter", () => colorSquare(square), { signal: controller.signal });
    square.addEventListener("mouseleave", () => clearSquare(square), { signal: controller.signal });

    square.addEventListener("click", () => {
      controller.abort();
      colorSquare(square);
    });

    grid.appendChild(square);
  }
}


const resizeGrid = () => {
  const size = resizeInput.value;
  if (!size || size < 0) {
    alert("Please enter a valid size for the new grid.");
    return;
  } else if (size > 100) {
    alert("The size of the grid can't be greater than 100.")
    return;
  }
  grid.replaceChildren();
  createGrid(size);
}

resizeBtn.addEventListener("click", () => {
  resizeGrid()
});


createGrid(defaultSize);