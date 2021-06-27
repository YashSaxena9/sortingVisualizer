let speed = 50;
let dumpExec = false;
const stopExec = () => {
  dumpExec = true;
};
const updateSpeed = (val) => {
  const values = [500, 200, 100, 0, -1];
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

// bubblesort
const sort = async (arr) => {
  dumpExec = false;
  const len = arr.length;
  for (let i = 0; i < len - 1; i += 1) {
    for (let j = 0; j < len - i - 1; j += 1) {
      if (dumpExec === true) {
        return 0;
      }
      const curr = arr[j];
      const next = arr[j + 1];
      color([curr, next], '#d12f88');

      await wait();

      if (compare(curr, next) > 0) {
        swap(arr, j, j + 1);
      }
      color([curr, next], '#8a8f99');
    }
    color([arr[len - i - 1]], '#7c11e0');
  }
  color([arr[0]], '#7c11e0');
  return 1;
};

export default { sort, updateSpeed, stopExec };
