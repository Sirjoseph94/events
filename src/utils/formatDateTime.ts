function dateFormat(date: Date) {
 return new Intl.DateTimeFormat("en-GB", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);
}
export default dateFormat;
