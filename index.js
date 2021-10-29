let largerThan50 = document.getElementById("largerThan50");
largerThan50.style.display = "none";
let loading = document.getElementById("loading");
loading.style.display = "none";
const button = document.getElementById("is");
const inputNumber = document.getElementById("inputNumber");
const resultOutput = document.getElementById("resultOutput");
const loading2 = document.getElementById("loading2");
loading2.style.display = "block";
const listOfResults = document.getElementById("listOfResults");
const checkBox = document.getElementById("save");
window.addEventListener("load", getFiboResults);

/* function fiboRecursion(x) {
  if ((x = 1)) {
    return x;
  } else if (x < 1) {
    return "number can't be smaller than 1";
  } else if (x > 50) {
    return "Number can't be larger than 50";
  } else {
    let y = fiboRecursion(x - 1) + fiboRecursion(x - 2);
    return y;
  }
} */

function serverOrLocal() {
  if (!checkBox.checked) {
    let x = parseInt(document.getElementById("inputNumber").value);
    function fibonacci(x) {
      let fiboArray = [0, 1];
      let y;
      if (x >= 1 && x <= 50) {
        for (let i = 1; i <= x; i++) {
          fiboArray[i + 1] = fiboArray[i] + fiboArray[i - 1];
          resultOutput.style.textDecoration = "underline";
          resultOutput.style.fontWeight = "bold";
          resultOutput.style.fontSize = "x-large";
          resultOutput.style.color = "#000";
          resultOutput.innerHTML = fiboArray[x];
        }
      } else if (x > 50) {
        largerThan50.style.display = "block";
        loading.style.display = "none";
        inputNumber.style.borderColor = "#D9534F";
        inputNumber.style.color = "#D9534F";
        resultOutput.style.fontSize = "medium";
        resultOutput.style.fontWeight = "normal";
      } else if (x < 1) {
        largerThan50.style.display = "none";
        loading.style.display = "none";
        inputNumber.style.borderColor = "#D9534F";
        inputNumber.style.color = "#D9534F";
        resultOutput.innerHTML = "number can't be smaller than 1";
        resultOutput.style.color = "#D9534F";
        resultOutput.style.fontSize = "medium";
        resultOutput.style.textDecoration = "none";
        resultOutput.style.fontWeight = "normal";
      }
    }
    fibonacci(x);
  } else {
    callFiboServer();
  }
}

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
        resultOutput.style.color = "#000";
        loading2.style.display = "block";
        getFiboResults();
      })
      .catch((error) => {
        loading.style.display = "none";
        resultOutput.innerHTML = "Server Error: " + error.message;
        resultOutput.style.color = "#D9534F";
        resultOutput.style.textDecoration = "none";
        resultOutput.style.fontSize = "medium";
      });
  }
}

function getFiboResults() {
  let resultsURL = "http://localhost:5050/getFibonacciResults";
  fetch(resultsURL)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      let fullResults = data["results"];
      listOfResults.innerHTML = "";
      for (let i = 0; i < fullResults.length; i++) {
        let singleResult = fullResults[i];
        let date = new Date(singleResult["createdDate"]);
        let inputNumber = singleResult["number"];
        let resultOutput = singleResult["result"];
        let fullSentence = `The fibonacci of <b>${inputNumber}</b> is <b>${resultOutput}</b>. Calculated at: ${date}`;
        const element = `<li class="resultSentence">${fullSentence}</li>`;
        listOfResults.innerHTML += element;
      }
      loading2.style.display = "none";
    });
}

function onClickField() {
  inputNumber.style.color = "#000";
  inputNumber.style.borderColor = "#CCCCCC";
  largerThan50.style.display = "none";
  resultOutput.innerHTML = "";
  inputNumber.value = "";
}
