function generateRandomNumber() {
  return Math.floor(Math.random() * 100 + 1);
}

let secretNumber = generateRandomNumber();

function checkNumber() {
  let value = document.getElementById('input').value;
  if (value == secretNumber) {
    alert('You won!');
  } else if (value < secretNumber) {
    document.getElementById('result').innerHTML = value + ' is too low.';
  } else {
    document.getElementById('result').innerHTML = value + ' is too high.';
  }
  return false;
}
