import getMonthName from "./getMonthName";
const dateDay = (dateString) => {
  const date = new Date(dateString);
  return (date.getDate()).toString();
}

const dateMonth = (dateString) =>{
  const date = new Date(dateString);
  const month = (date.getMonth()).toString();
  return getMonthName(month);
}

const dateYear = (dateString) =>{
  const date = new Date(dateString);
  return (date.getFullYear()).toString();
  
}

const displayDate = {
  dateDay,
  dateMonth,
  dateYear
};

export default displayDate;