export function currentDate() {
  const date = new Date().toJSON().slice(0, 10).split("-").join(".");

  return date;
}
