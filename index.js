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

let error42 = document.getElementById("error42");
error42.style.display = "none";
let largerThan50 = document.getElementById("largerThan50");
largerThan50.style.display = "none";
let loading = document.getElementById("loading");
loading.style.display = "none";
let button = document.getElementById("is");
const inputNumber = document.getElementById("inputNumber");
let resultOutput = document.getElementById("resultOutput");
button.addEventListener("click", callFiboServer);
let number = parseInt(inputNumber.value);

if (number > 50) {
  largerThan50.style.display = "block";
  loading.style.display = "none";
  inputNumber.style.borderColor = "#D9534F";
  inputNumber.style.color = "#D9534F";
  button.disabled = true;
}

function callFiboServer() {
  let number = parseInt(inputNumber.value);
  let serverURL = `http://localhost:5050/fibonacci/${number}`;
  loading.style.display = "block";
  if (number === 42) {
    error42.style.display = "block";
    resultOutput.style.display = "none";
    loading.style.display = "none";
  } else {
    fetch(serverURL)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        loading.style.display = "none";
        document.getElementById("resultOutput").innerHTML = data.result;
      });
  }
}
