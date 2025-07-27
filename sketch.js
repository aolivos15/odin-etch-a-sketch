const defaultSize = 16;

const colorSquare = (square) => {
  square.style.backgroundColor = "turquoise";
}

const clearSquare = (square) => {
  square.style.backgroundColor = "white";
}

const grid = document.querySelector(".grid-container");

const createGrid = (size) => {
  for (let i = 0; i < (size-1)*(size-1); i++) {
    const square = document.createElement("div");
    square.style.width = `calc(100% / ${size})`;
    square.classList.add("square");

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

createGrid(defaultSize);