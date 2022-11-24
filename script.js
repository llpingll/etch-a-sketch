// Slider properties
const sliderProperties = {
    value: "16",
    min: "1",
    max: "64"
};

let activeButton = "color";

// Toggle for mouseup and mousedown
let mouseDown = false;
document.body.onmousedown = () => mouseDown = true;
document.body.onmouseup = () => mouseDown = false;


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
    removeAllChildNodes(grid);
    grid.style.gridTemplateColumns = `repeat(${numberOfBlocks}, 1fr)`;
    grid.style.gridTemplateRows = `repeat(${numberOfBlocks}, 1fr)`;
    for (let i = 0; i < numberOfBlocks * numberOfBlocks; i++) {
        let div = document.createElement("div");
        div.classList.add("gridElement");
        grid.appendChild(div);
    }
    addDivEventListener();
}

function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

function returnColor() {
    if (activeButton === "color") {
        return colorPicker.value;
    }
    else if (activeButton === "rainbow") {
        return "#" + Math.floor(Math.random()*16777215).toString(16).padStart(6, '0').toUpperCase();
    }
    else if (activeButton === "erase") {
        return "white";
    }
}


function addDivEventListener() {
    const divs = document.querySelectorAll(".display div");
    divs.forEach(el => el.addEventListener("mouseover", () => {
        if (mouseDown === true) {
            el.style.backgroundColor = returnColor();
        }
    }));
    divs.forEach(el => el.addEventListener("mousedown", () => el.style.backgroundColor = returnColor()));
}

// Set initial slider properties and grid
setAttributes(slider, sliderProperties);
addGrid(slider.value);

// Slider event
slider.onchange = (e) => addGrid(e.target.value);
slider.oninput = (e) => gridDisplay.textContent = `Grid size: ${e.target.value} x ${e.target.value}`;

// Add event listener for each button
buttons.forEach(btn => btn.addEventListener("click", function() {
    if (btn.class !== "on") {
        buttons.forEach(btn => {
            btn.classList.remove("on");
        });
        btn.classList.add("on");
        activeButton = btn.id;
    }
}));

// Add event listener to clear button
clear.addEventListener("click", () => {
    const divs = document.querySelectorAll(".display div");
    divs.forEach(el => el.style.backgroundColor = "white");
});