export default function arraysEqual (array1, array2) {
  // couldn't reproduce
  /* istanbul ignore next */
  if (!Array.isArray(array1) || !Array.isArray(array2)) {
    return false
  }

  const array2Sorted = array2.slice().sort()

  return array1.length === array2.length && array1.slice().sort().every(function(value, index) {
    return value === array2Sorted[index];
  })
}