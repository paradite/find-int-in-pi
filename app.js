import pi from './pi.js';

// change this to speed up or slow down the finding process
window.delay = 1000;

const startElem = document.getElementById('start');
const digitTrackerElem = document.getElementById('digitTracker');
const currentIntElem = document.getElementById('currentInt');
const maxDigitElem = document.getElementById('maxDigit');
const progressElem = document.getElementById('progress');

const maxDigitLimit = 'more than 1 million';

function insertAfter(newNode, referenceNode) {
  referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}

function updateResult(currentInt, startPos, endPos) {
  let row = document.createElement('tr');
  let integerCell = document.createElement('th');
  let startPosCell = document.createElement('th');
  let endPosCell = document.createElement('th');
  integerCell.innerHTML = currentInt;
  startPosCell.innerHTML = startPos;
  endPosCell.innerHTML = endPos;
  row.appendChild(integerCell);
  row.appendChild(startPosCell);
  row.appendChild(endPosCell);
  insertAfter(row, progressElem);
}

function updateTracker(currentInt, maxDigit) {
  currentIntElem.innerHTML = currentInt;
  maxDigitElem.innerHTML = maxDigit;
}

function findIntInPi(int, maxDigit) {
  let startPos = pi.indexOf(int.toString());
  let endPos = startPos != -1 ? startPos + int.toString().length - 1 : -1;
  if (maxDigit != maxDigitLimit) {
    if (endPos > maxDigit) {
      maxDigit = endPos;
    } else if (endPos == -1) {
      maxDigit = maxDigitLimit;
    }
  }
  updateResult(int, startPos, endPos);
  updateTracker(int, maxDigit);
  setTimeout(() => findIntInPi(++int, maxDigit), window.delay);
}

function start() {
  result.style.display = 'block';
  startElem.style.display = 'none';
  findIntInPi(0, 0);
}

startElem.addEventListener('click', start);