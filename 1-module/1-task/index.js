function factorial(n) {
  if( n===0 || n===1 ) return 1;
let i = 1;
let result = n;

  while( i < n) {
    result = result * (n - i);
    i++;
  }

 return result;
}
