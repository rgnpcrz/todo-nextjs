export const formatDate = (dateString: string | undefined): string => {
  if (!dateString) {
    return "Invalid date";
  }
  const date = new Date(dateString);

  if (isNaN(date.getTime())) {
    return "Invalid date";
  }

  const day = date.getDate();
  const monthName = date.toLocaleString("default", { month: "long" });
  const year = date.getFullYear();
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");

  // Format the date and time in the desired format
  return `Created on ${day} ${monthName} ${year} at ${hours}:${minutes}`;
};
