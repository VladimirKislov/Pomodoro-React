export const templateDate = (i: number) => {
  const d = new Date();
  const subDate = new Date();
  return new Date(subDate.setDate(d.getDate() - i)).toJSON().slice(0, 10).split("-").join(".");
};
