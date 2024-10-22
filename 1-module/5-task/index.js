function truncate(str, maxlength) {
  const additional = "…";
  if(str.length <= maxlength) return str;
  return str.slice(0, maxlength - additional.length) + additional;
}
