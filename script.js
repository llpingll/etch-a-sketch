// Slider properties
const sliderProperties = {
    value: "16",
    min: "1",
    max: "100"
};


// Get elements
const slider = document.getElementById("myRange");
const gridDisplay = document.getElementById("grid");
const colorPicker = document.querySelector(".color-picker");


// Functions definitions
function setAttributes(el, attr) {
    for(const key in attr) {
        el.setAttribute(key, attr[key]);
    }
}


// Set slider properties
setAttributes(myRange, sliderProperties)
// Event
slider.oninput = function() {
  slider.setAttribute("value", this.value)
  gridDisplay.textContent = `Grid size: ${this.value} x ${this.value}`;
}