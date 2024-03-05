const formatDate = (date: Date = new Date()): string => {
  return `${date.getDate().toString().padStart(2, "0")}/${(date.getMonth() + 1)
    .toString()
    .padStart(2, "0")}/${date.getFullYear().toString().padStart(4, "0")}`;
};

export default formatDate;
