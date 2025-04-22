export const getFormattedDate = (date: Date) => {
  return date.toISOString().slice(0, 10);
};

export const getDateMinusDays = (date: Date, days: number) => {
  const newDate = new Date(date);
  newDate.setDate(date.getDate() - days);
  return newDate;
};
