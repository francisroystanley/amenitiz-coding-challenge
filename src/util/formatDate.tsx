const formatDate = (date: Date | string | number) => {
  const d = typeof date === "string" || typeof date === "number" ? new Date(date) : date;

  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric"
  });
};

export default formatDate;
