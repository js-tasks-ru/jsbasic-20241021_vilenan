function camelize(str) {
  const arr = str.split('-');

  const [a, ...restArr] = arr;

  const restArrString = restArr
    .map(function (item){
      if(!item) return '';
      return item[0].toUpperCase() + item.slice(1);
    }).join('');

  return a + restArrString;
}
