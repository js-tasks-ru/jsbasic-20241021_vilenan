function getMinMax(str) {
    const arrayOfNumbers = str.split(' ')
      .map(item =>+item)
      .filter(item => !isNaN(item))
      .sort((a, b) => a - b);


    return {
      min: arrayOfNumbers[0],
      max: arrayOfNumbers[arrayOfNumbers.length-1],
    }
}
