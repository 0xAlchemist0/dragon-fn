export function numericToUnix(days_added: number) {
  const current_date: any = new Date();
  const result = addDays(current_date, days_added);
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
