// Slider properties
const sliderProperties = {
    value: "16",
    min: "1",
    max: "64"
};


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
        const div = document.createElement("div");
        grid.appendChild(div);
    }
}


// Set initial slider properties
setAttributes(slider, sliderProperties);
// Set initial grid
addGrid(slider.value);

// Slider event
slider.oninput = function() {
  slider.setAttribute("value", this.value)
  gridDisplay.textContent = `Grid size: ${this.value} x ${this.value}`;
  addGrid(this.value);
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
clear.addEventListener("click", addGrid(slider.value));