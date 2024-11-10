function filterRange(arr, a, b) {
  if (a < b) {
    return  arr.filter(item => Boolean(item >= a && item <= b));
  } else {
    return  arr.filter(item => Boolean(item >= b && item <= a));
  }
}
