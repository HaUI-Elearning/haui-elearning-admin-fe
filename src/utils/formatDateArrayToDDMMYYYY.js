export function formatDateArrayToRelativeTime(dateArr) {
  if (!Array.isArray(dateArr) || dateArr.length < 3) return '';

  const [year, month, day] = dateArr;
  const createdDate = new Date(year, month - 1, day);
  const now = new Date();

  const diffTime = now - createdDate;
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return 'Today';
  if (diffDays === 1) return '1 day ago';
  if (diffDays < 7) return `${diffDays} days ago`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
  if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`;

  return `${Math.floor(diffDays / 365)} years ago`;
}
export function formatArrDateToDMY(dateArr) {
  if (!Array.isArray(dateArr) || dateArr.length < 3) return "";

  const [year, month, day] = dateArr;
  return `${String(day).padStart(2, "0")}/${String(month).padStart(
    2,
    "0"
  )}/${year}`;
}

export function arrayToDate (arr) {
  if (!arr || arr.length < 6) return null;
  const [year, month, day, hour, minute, second] = arr;
  return new Date(year, month - 1, day, hour, minute, second);
}

