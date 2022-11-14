export function toArray(val: any | any[]) {
  return Array.isArray(val) ? val : isValidVal(val) ? [val] : [];
}

export function isValidVal(val: any) {
  return ![undefined, null, NaN].includes(val);
}
