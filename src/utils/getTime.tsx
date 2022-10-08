export const getTime = (sec: number) => {
  const hours = Math.floor(sec / 60 / 60);
  const minutes = Math.floor(sec / 60) - hours * 60;
  const seconds = sec % 60;

  const stringHour = hours.toString().padStart(2, "0");
  const stringMinutes = minutes.toString().padStart(2, "0");
  const stringSeconds = seconds.toString().padStart(2, "0");

  return {
    hours,
    stringHour,
    stringMinutes,
    stringSeconds,
  };
};
