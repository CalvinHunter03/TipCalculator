import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "Tip Calculator";
document.title = gameName;

const prompt = document.createElement("h2");
prompt.innerHTML = `Enter total amount`;
app.append(prompt);

const totalInput = document.createElement("input");
totalInput.type = "number";
app.append(totalInput);

//spacers
app.append(document.createElement("div"));

const calculateButton = document.createElement("button");
calculateButton.innerHTML = "Calculate";
app.append(calculateButton);

const percentageSlider = document.createElement("input");
percentageSlider.type = "range";
percentageSlider.min = "0";
percentageSlider.max = "100";
app.append(percentageSlider);

calculateButton.addEventListener("click", () => {
  if (totalInput.value === ``) {
    alert("Enter your total");
  }
});
