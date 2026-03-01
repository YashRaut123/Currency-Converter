const BASE_URL =
  "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";

const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");


for (let select of dropdowns) {
  for (let currCode in countryList) {
    let option = document.createElement("option");
    option.value = currCode;
    option.innerText = currCode;

    if (select.name === "from" && currCode === "USD") {
      option.selected = true;
    }
    if (select.name === "to" && currCode === "INR") {
      option.selected = true;
    }

    select.append(option);
  }

  select.addEventListener("change", (e) => {
    updateFlag(e.target);
  });
}

const updateExchangeRate = async () => {
  let amount = document.querySelector(".amount input");
  let amtVal = amount.value || 1;

  const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}.json`;

  try {
    const response = await fetch(URL);
    const data = await response.json();

    const rate =
      data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()];

    const finalAmount = (amtVal * rate).toFixed(2);
    msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
  } catch (err) {
    msg.innerText = "Error fetching exchange rate ❌";
    console.error(err);
  }
};

// Update flag
const updateFlag = (element) => {
  let currCode = element.value;
  let countryCode = countryList[currCode];
  let img = element.parentElement.querySelector("img");
  img.src = `https://flagsapi.com/${countryCode}/flat/64.png`;
};

btn.addEventListener("click", (e) => {
  e.preventDefault();
  updateExchangeRate();
});

window.addEventListener("load", updateExchangeRate);
