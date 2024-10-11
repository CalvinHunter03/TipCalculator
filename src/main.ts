import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "Add 'em up!";
document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

let milkCounter: number = 0;
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

interface Item {
  name: string;
  cost: number;
  rate: number;
  description: string;
}

const availableItems: Item[] = [
  { name: "Cows 🐄", cost: 10, rate: 0.1, description: "Auto generate milk" },
  {
    name: "Goat 🐐",
    cost: 100,
    rate: 2.0,
    description: "Goats produce more milk!",
  },
  {
    name: "Buffalo 🐃",
    cost: 1000,
    rate: 50,
    description: "Buffalo gives the most milk!",
  },
  {
    name: "Alien 👽",
    cost: 2000,
    rate: 100,
    description: "Aliens with shower you in milk.",
  },
  {
    name: "Saturn 🪐",
    cost: 5000,
    rate: 500,
    description: "Planet full of milk?!",
  },
];

const autoMilkButtons: HTMLButtonElement[] = [];

availableItems.forEach((item, index) => {
  const button = createAutoMilkButton(item, index + 1);
  autoMilkButtons.push(button);
});

function toggleButtons() {
  availableItems.forEach((item, index) => {
    autoMilkButtons[index].disabled = milkCounter < item.cost;
  });
}

function createAutoMilkButton(item: Item, id: number) {
  let price = item.cost;
  const button = document.createElement("button");
  button.innerHTML = `${item.name} (Cost: ${price.toFixed(2)}) (Info: ${item.description})`;
  button.disabled = true;
  app.append(button);

  button.addEventListener("click", () => {
    if (milkCounter >= price) {
      milkCounter -= price;
      growthRate += item.rate;
      updateMilk();
      updateGrowthRate();

      price *= 1.15;
      price = Math.round(price * 100) / 100;
      button.innerHTML = `${item.name} (Cost: ${price.toFixed(2)})`;

      switch (id) {
        case 1:
          smallButtonCounter++;
          requestAnimationFrame(() => {
            animateMilk(item.rate, 1);
          });
          break;
        case 2:
          medButtonCounter++;
          requestAnimationFrame(() => {
            animateMilk(item.rate, 2);
          });
          break;
        case 3:
          largeButtonCounter++;
          requestAnimationFrame(() => {
            animateMilk(item.rate, 3);
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
