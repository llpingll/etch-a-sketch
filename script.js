// Slider properties
const sliderProperties = {
    value: "16",
    min: "1",
    max: "64"
};

// Toggle for mouseup and mousedown
let mouseDown = 0;
document.body.onmousedown = function() { 
  ++mouseDown;
}
document.body.onmouseup = function() {
  --mouseDown;
}


// Get elements
const slider = document.getElementById("myRange");
const gridDisplay = document.getElementById("grid");
const colorPicker = document.querySelector(".color-picker");
const grid = document.querySelector(".display");
const buttons = document.querySelectorAll(".controls .toggle");
const clear = document.querySelector("#clear");


// Functions definitions
function setAttributes(el, attr) {
    for(const key in attr) {
        el.setAttribute(key, attr[key]);
    }
}

function addGrid(numberOfBlocks) {
    grid.style.gridTemplateColumns = `repeat(${numberOfBlocks}, 1fr)`;
    grid.style.gridTemplateRows = `repeat(${numberOfBlocks}, 1fr)`;
    
    numberOfBlocks2 = numberOfBlocks * numberOfBlocks;
    for (let i = 0; i < numberOfBlocks2; i++) {
        let div = document.createElement("div");
        div.classList.add("gridElement");
        grid.insertAdjacentElement("beforeend", div);
    }
}

function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

function addDivEventListener() {
    const divs = document.querySelectorAll(".display div");
    divs.forEach(el => el.addEventListener("mouseover", function() {
        if (mouseDown === 1) {
            el.style.backgroundColor = "black";
        }
    }));
    divs.forEach(el => el.addEventListener("mousedown", () => el.style.backgroundColor = "black"));
}

// Set initial slider properties and grid
setAttributes(slider, sliderProperties);
addGrid(slider.value);
addDivEventListener();

// Slider event
slider.onchange = function() {
    removeAllChildNodes(grid);
    addGrid(this.value);
    addDivEventListener();
}
slider.oninput = (e) => {
    slider.setAttribute("value", e.target.value);
    gridDisplay.textContent = `Grid size: ${e.target.value} x ${e.target.value}`;
}

// Add event listener for each button
buttons.forEach(btn => btn.addEventListener("click", function() {
    if (btn.value === "off") {
        buttons.forEach(btn => {
            btn.value = "off";
            btn.classList.remove("on");
        });
        btn.value = "on";
        btn.classList.add("on");
    }
}));

// Add event listener to clear button
clear.addEventListener("click", () => {
    const divs = document.querySelectorAll(".display div");
    divs.forEach(el => el.style.backgroundColor = "white");
});