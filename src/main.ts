import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "Add 'em up!";
document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

const buttonName = "🥛";
const button = document.createElement("button");
button.innerHTML = buttonName;
app.append(button);