import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "Add 'em up!";
document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

let milkCounter: number = 0;
let cookieCounter: number = 0;

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

//auto click cookie button
const autoCookieButtonName = "Auto Click 🍪";
const autoCookieButton = document.createElement("button");
autoCookieButton.innerHTML = autoCookieButtonName;
app.append(autoCookieButton);

setInterval(() => {
  milkCounter += 1;
  if (milkCounter === 1) {
    milkDivText.textContent = `${milkCounter} glass of milk`;
  } else {
    milkDivText.textContent = `${milkCounter} glasses of milk`;
  }
}, 1000);
