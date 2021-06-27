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

const getPartition = async (arr, si, ei) => {
  const pivot = arr[ei];
  color([pivot], '#d12f88');
  let ptr = si;
  for (let i = si; i < ei; i += 1) {
    if (dumpExec === true) {
      return;
    }
    const currDiv = arr[i];
    color([currDiv], '#c4c4c4');
    if (compare(arr[ei], arr[i]) >= 0) {
      swap(arr, ptr, i);
      ptr += 1;
    }
    await wait();
    color([currDiv], '#8a8f99');
  }
  if (si + 1 >= ei) {
    color([arr[si], arr[ei]], '#7c11e0');
  }
  swap(arr, ptr, ei);
  return ptr;
};

const quickSort = async (arr, si, ei) => {
  if (si > ei) {
    return;
  }
  const partition = await getPartition(arr, si, ei);
  if (dumpExec === true) {
    return 0;
  }
  await wait();
  await quickSort(arr, si, partition - 1);
  await quickSort(arr, partition + 1, ei);
  if (dumpExec === true) {
    return 0;
  }

  color([arr[partition]], '#7c11e0');
  return 1;
};

// quickSort
const sort = async (arr) => {
  dumpExec = false;
  const res = await quickSort(arr, 0, arr.length - 1);
  return res;
};

export default { sort, updateSpeed, stopExec };
