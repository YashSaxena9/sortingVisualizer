import bubbleSort from './algorithms/bubbleSort.js';
import insertionSort from './algorithms/insertionSort.js';
import selectionSort from './algorithms/selectionSort.js';
import quickSort from './algorithms/quickSort.js';
import mergeSort from './algorithms/mergeSort.js';

// container
const arrayContainer = document.querySelector('.array-container');
// side bar
const resetBtn = document.querySelector('.btn.reset');
const sortBtn = document.querySelector('.btn.run');
const setSizeBtn = document.querySelector('.btn.set-size');
const setSpeedBtn = document.querySelector('.btn.set-speed');
const algoChoice = document.querySelector('.btn.choose-algo');
// top-panel--
// size related
const sizeSlider = document.querySelector('#array-size');
const sizeDisplay = document.querySelector('.size-value');
// speed related
const speedSlider = document.querySelector('#sort-speed');
const speedDisplay = document.querySelector('.speed-value');
// algo related
const algos = document.querySelectorAll('.algo-op .option');
const algoDisplay = document.querySelector('.algo-name-display');
// type of top-panel
const title = document.querySelector('.title');
const sizeOp = document.querySelector('.size-op');
const speedOp = document.querySelector('.speed-op');
const algoOp = document.querySelector('.algo-op');
const topPanelItems = [title, sizeOp, speedOp, algoOp];
// tool tip
const toolTips = document.querySelectorAll('.tooltip-container');
// value of 1 rem in browser
const oneRem = parseFloat(getComputedStyle(document.documentElement).fontSize);

let sortStatus = 0; // not sorted
let currAlgo = bubbleSort;

const getRandomData = ({ min, max }) => {
  const size = max - min + 1;
  return Math.floor(Math.random() * (size + 1)) + min;
};

const getComputedSizes = ({ element }) => {
  const { width, height } = getComputedStyle(element);
  return { width: parseFloat(width), height: parseFloat(height) };
};

const createDataElement = ({ dataWidth, index, margin, usableHeight }) => {
  const div = document.createElement('div');
  div.className = 'data-element';
  const left = index * (dataWidth + 2 * margin) + margin;
  const hei = getRandomData({
    min: Math.round(usableHeight / 100) + 1,
    max: usableHeight,
  });
  if (dataWidth >= oneRem * 1.4) {
    const barValue = Math.round((hei * 100) / usableHeight);
    div.innerHTML = `<div class="inner-data-element">${barValue}</div>`;
  }
  const eleStyles = {
    height: `${hei}px`,
    width: `${dataWidth}px`,
    left: `${left}px`,
  };
  Object.assign(div.style, eleStyles);
  return div;
};

const generateRandomData = ({ size = 10 }) => {
  const { width, height } = getComputedSizes({ element: arrayContainer });
  const usableHeight = (9 * height) / 10;
  const usableWidth = (4 * width) / 5;
  const dataWidth = usableWidth / size;
  const extraSpace = width - usableWidth;
  const margin = extraSpace / (2 * size);
  arrayContainer.innerHTML = ''; // html reset
  currAlgo.stopExec(); // stop if executing in background
  sortStatus = 0; // array status is unsorted
  for (let i = 0; i < size; i += 1) {
    const dataEle = createDataElement({
      dataWidth,
      index: i,
      margin,
      usableHeight,
    });
    arrayContainer.appendChild(dataEle);
  }
};

/* dom setter */
const sizeSliderRangeSetter = () => {
  const { width } = getComputedSizes({ element: arrayContainer });
  const mxLen = 1.4 * oneRem;
  const usableWidth = (4 * width) / 5;
  const singleEleWidth = 4;
  const maxLimit = Math.floor(usableWidth / singleEleWidth);
  const roundedMaxLimit = Math.floor(maxLimit / 10) * 10;
  const maxInfoValue = Math.floor(usableWidth / mxLen); // value upto which height can be labeled
  const currValue = Math.min(maxInfoValue, roundedMaxLimit / 2);
  sizeSlider.setAttribute('max', roundedMaxLimit);
  sizeSlider.setAttribute('value', currValue); //  only starting value (not after changed)
};

const sizeDisplaySetter = () => {
  const { value } = sizeSlider;
  sizeDisplay.innerText = value;
  generateRandomData({ size: Number(value) });
};

const speedValueSetter = () => {
  const { value } = speedSlider;
  console.log(value);
  speedDisplay.innerText = value;
  currAlgo.updateSpeed(parseInt(value, 10));
};

const makePanelOpVisible = (option) => {
  topPanelItems.forEach((item) => {
    item.classList.add('invisible');
  });
  option.classList.remove('invisible');
};
const setAlgoBoard = () => {
  const algoName = document.querySelector('.option.active');
  algoDisplay.innerHTML = algoName.innerHTML;
};
const startup = () => {
  setAlgoBoard();
  sizeSliderRangeSetter();
  sizeDisplaySetter();
  speedValueSetter();
};
startup();

/* event listeners */
resetBtn.addEventListener('click', () => {
  makePanelOpVisible(title);
  startup();
});
sizeSlider.addEventListener('input', startup);
window.addEventListener('resize', startup);
sortBtn.addEventListener('click', async () => {
  makePanelOpVisible(title);
  if (sortStatus === 0) {
    sortStatus = -1;
    // take array and pass it
    const arr = [...document.querySelectorAll('.data-element')];
    currAlgo.sort(arr);
  }
});
setSizeBtn.addEventListener('click', () => {
  makePanelOpVisible(sizeOp);
});
setSpeedBtn.addEventListener('click', () => {
  makePanelOpVisible(speedOp);
});
speedSlider.addEventListener('change', speedValueSetter);
algoChoice.addEventListener('click', () => {
  makePanelOpVisible(algoOp);
});

algos.forEach((algoBtn) => {
  algoBtn.addEventListener('click', () => {
    algoOp.querySelector('.option.active').classList.remove('active');
    algoBtn.classList.add('active');
    const choosenAlgo = algoBtn.innerText;
    console.log(choosenAlgo);
    if (choosenAlgo === 'Selection Sort') {
      currAlgo = selectionSort;
    } else if (choosenAlgo === 'Bubble sort') {
      currAlgo = bubbleSort;
    } else if (choosenAlgo === 'Insertion Sort') {
      currAlgo = insertionSort;
    } else if (choosenAlgo === 'Quick Sort') {
      currAlgo = quickSort;
    } else if (choosenAlgo === 'Merge Sort') {
      currAlgo = mergeSort;
    }
    startup();
  });
});

/* add tooltips */
toolTips.forEach((ele) => {
  const tooltipEle = document.createElement('div');
  tooltipEle.classList.add('tooltip');
  tooltipEle.innerText = ele.querySelector('span').innerText;
  ele.appendChild(tooltipEle);
});