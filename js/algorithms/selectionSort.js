let speed = 50;
let dumpExec = false;
const stopExec = () => {
  dumpExec = true;
};
const updateSpeed = (val) => {
  const values = [500, 200, 100, 10, -1];
  speed = values[val / 25];
};

const color = (elements, colorString) => {
  for (let i = 0; i < elements.length; i += 1) {
    const { style } = elements[i];
    style.backgroundColor = colorString;
  }
};

const compare = (ele1, ele2) => {
  const height1 = parseFloat(ele1.style.height);
  const height2 = parseFloat(ele2.style.height);
  return height1 - height2;
};

const swap = (arr, idx1, idx2) => {
  const div1 = arr[idx1];
  const div2 = arr[idx2];
  const style1 = div1.style;
  const style2 = div2.style;
  const div1Pos = parseFloat(style1.left);
  const div2Pos = parseFloat(style2.left);
  // update positions visually
  const difference = div1Pos - div2Pos;
  style1.left = `${div1Pos - difference}px`;
  style2.left = `${div2Pos + difference}px`;
  // swap in arr
  [arr[idx2], arr[idx1]] = [arr[idx1], arr[idx2]];
};

const wait = () => {
  if (speed === -1) return;
  return new Promise((response) => {
    setTimeout(response, speed);
  });
};

// selectionsort
const sort = async (arr) => {
  dumpExec = false;
  const len = arr.length;
  for (let i = 0; i < len - 1; i += 1) {
    let mnEle = i;
    color([arr[mnEle]], '#d12f88');
    for (let j = i + 1; j < len; j += 1) {
      if (dumpExec === true) {
        return 0;
      }
      color([arr[j]], '#c4c4c4');
      await wait();
      if (compare(arr[mnEle], arr[j]) > 0) {
        color([arr[mnEle]], '#8a8f99');
        mnEle = j;
        color([arr[mnEle]], '#d12f88');
      } else {
        color([arr[j]], '#8a8f99');
      }
    }
    swap(arr, i, mnEle);
    color([arr[i]], '#7c11e0');
  }
  color([arr[len - 1]], '#7c11e0');
  return 1;
};

export default { sort, updateSpeed, stopExec };
