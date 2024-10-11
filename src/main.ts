import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "Add 'em up!";
document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

let milkCounter: number = 1000;
let growthRate: number = 0;

let lastSmallMilkTime: number = performance.now();
let lastMedMilkTime: number = performance.now();
let lastLargeMilkTime: number = performance.now();

let smallButtonCounter: number = 0;
let medButtonCounter: number = 0;
let largeButtonCounter: number = 0;

//Milk button
const milkButtonName = "🥛";
const milkButton = document.createElement("button");
milkButton.innerHTML = milkButtonName;
app.append(milkButton);

//Milk text
const milkDiv = document.createElement("div");
const milkDivText = document.createTextNode("0 glasses of milk");
milkDiv.appendChild(milkDivText);
app.append(milkDiv);

//growth rate display
const growthRateDiv = document.createElement("div");
growthRateDiv.textContent = `Growth rate: ${growthRate} milk/sec`;
app.append(growthRateDiv);

//purchase counts display
const purchaseCountsDiv = document.createElement("div");
updatePurchaseCounts();
app.append(purchaseCountsDiv);

function updatePurchaseCounts() {
  purchaseCountsDiv.textContent = `Purchased:
  Small Milk x${smallButtonCounter},
  Med Milk x${medButtonCounter},
  Large Milk x${largeButtonCounter}`;
}

//milk button counter
milkButton.addEventListener("click", () => {
  milkCounter += 1;
  updateMilk();
  toggleButtons();
});

//update milk text
function updateMilk() {
  milkCounter = Math.round(milkCounter * 100) / 100;

  if (milkCounter === 1) {
    milkDivText.textContent = `${milkCounter} glass of milk`;
  } else {
    milkDivText.textContent = `${milkCounter} glasses of milk`;
  }
}

function updateGrowthRate() {
  growthRateDiv.textContent = `Growth rate: ${Math.round(growthRate * 100) / 100} milk/sec`;
}

function toggleButtons() {
  autoSmallMilkButton.disabled = milkCounter < 10;
  autoMedMilkButton.disabled = milkCounter < 100;
  autoLargeMilkButton.disabled = milkCounter < 1000;
}

const autoSmallMilkButtonName = "Small Milk (Cost: 10, 0.1/sec)";
const autoMedMilkButtonName = "Med Milk (Cost: 100, 2.0/sec)";
const autoLargeMilkButtonName = "Large Milk (Cost: 1000, 50/sec)";

const autoSmallMilkButton = createAutoMilkButton(
  autoSmallMilkButtonName,
  10,
  0.1,
  1
);
const autoMedMilkButton = createAutoMilkButton(
  autoMedMilkButtonName,
  100,
  2.0,
  2
);
const autoLargeMilkButton = createAutoMilkButton(
  autoLargeMilkButtonName,
  1000,
  50,
  3
);

function createAutoMilkButton(
  name: string,
  cost: number,
  rate: number,
  id: number
) {
  const button = document.createElement("button");
  button.innerHTML = name;
  button.disabled = true;
  app.append(button);

  button.addEventListener("click", () => {
    if (milkCounter >= cost) {
      milkCounter -= cost;
      growthRate += rate;
      updateMilk();
      updateGrowthRate();
      switch (id) {
        case 1:
          smallButtonCounter++;
          requestAnimationFrame(() => {
            animateMilk(rate, 1);
          });
          break;
        case 2:
          medButtonCounter++;
          requestAnimationFrame(() => {
            animateMilk(rate, 2);
          });
          break;
        case 3:
          largeButtonCounter++;
          requestAnimationFrame(() => {
            animateMilk(rate, 3);
          });
          break;
      }
      updatePurchaseCounts();
    }
  });
  return button;
}

function animateMilk(rate: number, id: number) {
  const currentTime = performance.now();
  let lastTime = 0;
  switch (id) {
    case 1:
      lastTime = lastSmallMilkTime;
      break;
    case 2:
      lastTime = lastMedMilkTime;
      break;
    case 3:
      lastTime = lastLargeMilkTime;
      break;
  }

  if (currentTime - lastTime >= 1000) {
    milkCounter += rate;
    updateMilk();
    switch (id) {
      case 1:
        lastSmallMilkTime = currentTime;
        break;
      case 2:
        lastMedMilkTime = currentTime;
        break;
      case 3:
        lastLargeMilkTime = currentTime;
        break;
    }
  }

  requestAnimationFrame(() => {
    animateMilk(rate, id);
  });
}
