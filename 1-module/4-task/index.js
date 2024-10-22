function checkSpam(str) {
  const str1 = '1xBet',
    str2 = 'XXX';
  return (str.toLowerCase().includes(str1.toLowerCase()) || str.toLowerCase().includes(str2.toLowerCase()))
}
