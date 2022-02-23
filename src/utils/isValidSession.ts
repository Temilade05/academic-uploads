import removeSpaces from "./removeSpaces";

const isValidSession = (session: string): boolean => {
  const years = removeSpaces(session).split("/");

  if (years.length !== 2) return false;

  const start = parseInt(years[0]);
  const end = parseInt(years[1]);

  if (isNaN(start) || isNaN(end)) return false;

  if (end - start !== 1) return false;

  return true;
};

export default isValidSession;
