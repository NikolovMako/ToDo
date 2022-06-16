export const convertedDate = (date: any) => {
  const hours = date.getHours();
  let minutes = date.getMinutes();
  minutes = minutes <= 9 ? "0" + minutes : minutes;
  const AmOrPm = hours > 12 ? "PM" : "AM";
  return `${date.toLocaleDateString("en-US")} ${
    hours % 12
  }:${minutes}${AmOrPm}`;
};
