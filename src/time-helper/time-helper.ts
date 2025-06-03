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
export function convert(days_added: number) {
  const current_date = Date.now(); // ms
  const ms_to_add = days_added * 24 * 60 * 60 * 1000; // ms in days
  const future = current_date + ms_to_add;
  const result = BigInt(Math.floor(future / 1000)); // convert to seconds as BigInt
  console.log(`convert: ${result}`);
  return result;
}
