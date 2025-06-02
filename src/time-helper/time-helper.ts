export function numericToUnix(days_added: any) {
  console.log(`days added: ${days_added}`);
  console.log(typeof days_added, days_added);
  const current_date: any = new Date();
  const result = addDays(current_date, days_added);
  console.log(`unix result: ${result}`);
  return result;
}

function addDays(date: any, days: number) {
  const newDate: any = new Date(date);
  newDate.setDate(date.getDate() + days);
  return Math.floor(newDate / 1000);
}

export function unixToNumeric(timestamp: any) {
  const unix = BigInt(timestamp);
  const date = new Date(Number(unix) * 1000);
  console.log(date.toLocaleString());
  return date.toLocaleString();
}
function addIt(date: Date, days: number): number {
  const newDate = new Date(date);
  newDate.setDate(newDate.getDate() + days);
  return Math.floor(newDate.getTime() / 1000);
}

export function convert(days: number) {
  return addIt(new Date(), days); // already a Unix timestamp
}
