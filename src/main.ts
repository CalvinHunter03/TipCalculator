import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "Add 'em up!";
document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

let milkCounter: number = 0;
let cookieCounter: number = 0;
let lastTimestamp: number | null = null; // To track the time of the last frame

//Milk button
const milkButtonName = "🥛";
const milkButton = document.createElement("button");
milkButton.innerHTML = milkButtonName;
app.append(milkButton);

//cookie button
const cookieButtonName = "🍪";
const cookieButton = document.createElement("button");
cookieButton.innerHTML = cookieButtonName;
app.append(cookieButton);

//Milk text
const milkDiv = document.createElement("div");
const milkDivText = document.createTextNode("0 glasses of milk");
milkDiv.appendChild(milkDivText);
app.append(milkDiv);

//cookie text
const cookieDiv = document.createElement("div");
const cookieDivText = document.createTextNode("0 cookies");
cookieDiv.appendChild(cookieDivText);
app.append(cookieDiv);

//milk button counter
milkButton.addEventListener("click", () => {
  milkCounter += 1;
  if (milkCounter === 1) {
    milkDivText.textContent = `${milkCounter} glass of milk`;
  } else {
    milkDivText.textContent = `${milkCounter} glasses of milk`;
  }
  if (milkCounter < 10) {
    autoMilkButton.disabled = true;
  } else {
    autoMilkButton.disabled = false;
  }
});

//cookie button counter
cookieButton.addEventListener("click", () => {
  if (milkCounter != 0) {
    cookieCounter += 1;
    if (cookieCounter === 1) {
      cookieDivText.textContent = `${cookieCounter} cookie`;
    } else {
      cookieDivText.textContent = `${cookieCounter} cookies`;
    }
  }
});

//auto click milk button
const autoMilkButtonName = "Auto Click 🥛";
const autoMilkButton = document.createElement("button");
autoMilkButton.innerHTML = autoMilkButtonName;
app.append(autoMilkButton);

/*
setInterval(() => {
  milkCounter += 1;
  if (milkCounter === 1) {
    milkDivText.textContent = `${milkCounter} glass of milk`;
  } else {
    milkDivText.textContent = `${milkCounter} glasses of milk`;
  }
}, 1000);
*/

function updateCounter(timestamp: number) {
  // milk auto clicker
  if (lastTimestamp === null) {
    lastTimestamp = timestamp;
  }

  // Calculate the time difference between frames (in seconds)
  const deltaTime = (timestamp - lastTimestamp) / 1000; // Convert to seconds
  lastTimestamp = timestamp;

  // Increment the counter by the amount that should have passed in the elapsed time
  milkCounter += deltaTime; // This ensures 1 unit increase per second

  // Update the display
  if (milkCounter === 1) {
    milkDivText.textContent = `${milkCounter} glass of milk`;
  } else {
    milkDivText.textContent = `${milkCounter} glasses of milk`;
  }
  // Request the next animation frame
  requestAnimationFrame(updateCounter);
}

// Start the animation loop
//requestAnimationFrame(updateCounter);

//auto milk clicker button working
autoMilkButton.addEventListener("click", () => {
  if (milkCounter >= 10) {
    autoMilkButton.disabled = false;
    milkCounter -= 10;
    if (milkCounter === 1) {
      milkDivText.textContent = `${milkCounter} glass of milk`;
    } else {
      milkDivText.textContent = `${milkCounter} glasses of milk`;
    }
    requestAnimationFrame(updateCounter);
  }
});

autoMilkButton.disabled = true;
