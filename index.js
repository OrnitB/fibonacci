/* function fibonacci(x) {
  let fiboArray = [0, 1];
  for (let i = 1; i <= x; i++) {
    fiboArray[i + 1] = fiboArray[i] + fiboArray[i - 1];
  }
  let y = fiboArray[x];
  return y;
}

function whenClicked() {
  let x = parseInt(document.getElementById("inputNumber").value);
  document.getElementById("result").textContent = fiboRecursion(x);
}

function fiboRecursion(x) {
  if (x <= 1) {
    return x;
  } else {
    let y = fiboRecursion(x - 1) + fiboRecursion(x - 2);
    return y;
  }
} */
/* 
const { result } = require("underscore");

 */
let largerThan50 = document.getElementById("largerThan50");
largerThan50.style.display = "none";
let loading = document.getElementById("loading");
loading.style.display = "none";
let button = document.getElementById("is");
const inputNumber = document.getElementById("inputNumber");
let resultOutput = document.getElementById("resultOutput");
button.addEventListener("click", callFiboServer);
let number = parseInt(inputNumber.value);

function callFiboServer() {
  let number = parseInt(inputNumber.value);
  let serverURL = `http://localhost:5050/fibonacci/${number}`;
  loading.style.display = "block";
  if (number > 50) {
    largerThan50.style.display = "block";
    loading.style.display = "none";
    inputNumber.style.borderColor = "#D9534F";
    inputNumber.style.color = "#D9534F";
  } else {
    fetch(serverURL)
      .then(function (response) {
        if (response.ok) {
          return response.json();
        } else if (response.status === 400) {
          return response.text();
        }
      })
      .then(function (data) {
        if (!data.result) throw new Error(data);
        loading.style.display = "none";
        resultOutput.innerHTML = data.result;
        resultOutput.style.textDecoration = "underline";
        resultOutput.style.fontWeight = "bold";
        resultOutput.style.fontSize = "x-large";
        fiboMemo(data);
      })
      .catch((error) => {
        loading.style.display = "none";
        resultOutput.innerHTML = "Server Error: " + error.message;
        resultOutput.style.color = "#D9534F";
      });
  }
}

function onClickField() {
  inputNumber.style.color = "#000";
  inputNumber.style.borderColor = "#CCCCCC";
  largerThan50.style.display = "none";
  resultOutput.innerHTML = "";
  inputNumber.value = "";
}

/* const createLi = document.createElement("li class=text-decoration-underline");
 */
const listOfResults = document.getElementById("listOfResults");
const loading2 = document.getElementById("loading2");
let fiboMemo = function getFiboResults() {
  let resultsURL = "http://localhost:5050/getFibonacciResults";
  fetch(resultsURL).then(function (response) {
    return response.json().then(function (data) {
      let fullResults = data["results"];
      for (let i = 0; i < fullResults.length; i++) {
        let singleResult = fullResults[i];
        let date = new Date(singleResult["createdDate"]);
        let inputNumber = singleResult["number"];
        let resultOutput = singleResult["result"];
        let fullSentence = `The fibonacci of <b>${inputNumber}</b> is <b>${resultOutput}</b>. Calculated at: ${date}`;
        singleResult = fullSentence;
        const element1 = `<li id="resultSentence">${fullSentence}</li><br>`;

        listOfResults.innerHTML += element1;
      }
      loading2.style.display = "none";
    });
  });
};

window.addEventListener("load", fiboMemo);
