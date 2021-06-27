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

const wait = () => {
  if (speed === -1) return;
  return new Promise((response) => {
    setTimeout(response, speed);
  });
};

const merge = async (arr, si1, ei1, si2, ei2) => {
  const mergeSpace = [];
  let [ptr1, ptr2] = [si1, si2];
  while (ptr1 <= ei1 && ptr2 <= ei2) {
    if (dumpExec) {
      return;
    }
    const div1 = arr[ptr1];
    const div2 = arr[ptr2];
    color([div1, div2], '#d12f88');
    await wait();
    if (compare(div2, div1) > 0) {
      mergeSpace.push(div1.style.height);
      ptr1 += 1;
    } else {
      mergeSpace.push(div2.style.height);
      ptr2 += 1;
    }
    color([div1, div2], '#c4c4c4');
  }
  while (ptr2 <= ei2) {
    if (dumpExec) {
      return;
    }
    const div2 = arr[ptr2];
    color([div2], '#d1f88');
    await wait();
    mergeSpace.push(div2.style.height);
    color([div2], '#c4c4c4');
    ptr2 += 1;
  }
  while (ptr1 <= ei1) {
    if (dumpExec) {
      return;
    }
    const div1 = arr[ptr1];
    color([div1], '#d1f88');
    await wait();
    mergeSpace.push(div1.style.height);
    color([div1], '#c4c4c4');
    ptr1 += 1;
  }
  for (let i = 0; si1 <= ei2; i += 1, si1 += 1) {
    if (dumpExec) {
      return;
    }
    const origDiv = arr[si1];
    const origStyle = origDiv.style;
    color([origDiv], '#d12f88');
    origStyle.display = 'none';
    origStyle.height = mergeSpace[i];
    origStyle.display = '';
    color([origDiv], '#7c11e0');
  }
};

const mergeSort = async (arr, si, ei) => {
  if (si === ei) {
    return 1;
  }
  if (dumpExec) {
    return 0;
  }
  const mid = Math.floor((si + ei) / 2);
  if (dumpExec === true) {
    return 0;
  }
  color([arr[mid]], '#c4c4c4');
  await new Promise((res) => {
    setTimeout(() => {
      res();
    }, speed);
  });
  await mergeSort(arr, si, mid);
  await mergeSort(arr, mid + 1, ei);
  if (dumpExec === true) {
    return 0;
  }
  await merge(arr, si, mid, mid + 1, ei);
  return 1;
};

// mergeSort
const sort = async (arr) => {
  dumpExec = false;
  const res = await mergeSort(arr, 0, arr.length - 1);
  return res;
};

export default { sort, updateSpeed, stopExec };
