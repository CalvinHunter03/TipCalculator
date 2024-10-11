import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "Add 'em up!";
document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

let milkCounter: number = 0;
let cookieCounter: number = 0;
let lastTime: number = performance.now();

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
  updateMilk();
  toggleAutoMilkButton();
});

//cookie button counter
cookieButton.addEventListener("click", () => {
  if (milkCounter !== 0) {
    cookieCounter += 1;
    updateCookie();
  }
});

//update milk text
function updateMilk() {
  if (milkCounter === 1) {
    milkDivText.textContent = `${milkCounter} glass of milk`;
  } else {
    milkDivText.textContent = `${milkCounter} glasses of milk`;
  }
}
//update cookie text
function updateCookie() {
  if (cookieCounter === 1) {
    cookieDivText.textContent = `${cookieCounter} cookie`;
  } else {
    cookieDivText.textContent = `${cookieCounter} cookies`;
  }
}

//auto click milk button
const autoMilkButtonName = "Auto Click 🥛";
const autoMilkButton = document.createElement("button");
autoMilkButton.innerHTML = autoMilkButtonName;
autoMilkButton.disabled = true;
app.append(autoMilkButton);

//toggel auto milk button on and off depending on how many milks are collected
function toggleAutoMilkButton() {
  autoMilkButton.disabled = milkCounter < 10;
}

//atuo milk clikc working
function animateAutoMilkButton() {
  const currentTime = performance.now();

  if (!autoMilkButton.disabled) {
    if (currentTime - lastTime >= 1000) {
      milkCounter += 1;
      updateMilk();
      lastTime = currentTime;
    }
  }

  requestAnimationFrame(animateAutoMilkButton);
}

autoMilkButton.addEventListener("click", () => {
  requestAnimationFrame(animateAutoMilkButton);
});
