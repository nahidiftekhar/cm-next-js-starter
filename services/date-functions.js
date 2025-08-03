import moment from "moment-timezone";

export function formatTimeInTimezone(dateString, timezone) {
  if (!dateString) return null;
  const date = new Date(dateString);
  const options = {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
    timeZone: timezone,
  };

  const formattedTime = new Intl.DateTimeFormat("en-US", options).format(date);
  return formattedTime;
}

export function formatDate(date) {
  var d = new Date(date),
    month = "" + (d.getMonth() + 1),
    day = "" + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  return [year, month, day].join("-");
}

// function to create date from yyyy-mm-dd format string
export function parseDateString(dateString) {
  if (!dateString) return null;
  const dateComponent = dateString.split("-");
  return new Date(
    dateComponent[0],
    Number(dateComponent[1]) - 1,
    dateComponent[2]
  );
}

export function getTimeFromDateTime(dateTimeString) {
  const dateObj = new Date(dateTimeString);

  // Convert to GMT+6 (Bangladesh Time)
  dateObj.setHours(dateObj.getHours() + 6);

  const hours = dateObj.getUTCHours();
  const minutes = dateObj.getUTCMinutes();
  const seconds = dateObj.getUTCSeconds();

  // Format the time as HH:mm:ss
  const time = `${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}`;
  // .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

  return time;
}

export function getFormattedDate(datetimeString) {
  const date = new Date(datetimeString);
  date.setHours(date.getHours() + 6);
  const formattedDate = date.toISOString().slice(0, 10);
  return formattedDate;
}

export function formatDateYYYYMMDD(date) {
  var d = new Date(date),
    month = "" + (d.getMonth() + 1),
    day = "" + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  return [year, month, day].join("");
}

// format datetime string to mon-dd
export function formatDateToMonDD(datetimeString) {
  const date = new Date(datetimeString);
  const options = { month: "short", day: "numeric" };
  const formattedDate = date.toLocaleDateString("en-US", options);
  return formattedDate;
}

// Next month same day
export function getNextMonthSameDay(date) {
  date = date instanceof Date ? date : new Date();
  const currentDay = date.getDate();
  date.setMonth(date.getMonth() + 1, 1);
  date.setDate(
    Math.min(
      currentDay,
      new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
    )
  );
  return date;
}

export function formatDateYYYYMMDDwithDash(date) {
  var d = new Date(date),
    month = "" + (d.getMonth() + 1),
    day = "" + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  return [year, month, day].join("-");
}

export function formatDateMONDD(date) {
  const options = { month: "short", day: "numeric" };
  const formattedDate = date.toLocaleDateString("en-US", options);
  return formattedDate;
}

export function datetimeStringToDate(datetimeString) {
  const date = new Date(datetimeString);
  const year = date.getFullYear();
  const month = date.getMonth() + 1; // Months are zero-based
  const day = date.getDate();
  const formattedDate = `${year}-${month.toString().padStart(2, "0")}-${day
    .toString()
    .padStart(2, "0")}`;
  return formattedDate;
}

export function dateStringToDate(dateString) {
  const year = dateString.substr(0, 4);
  const month = dateString.substr(4, 2) - 1;
  const day = dateString.substr(6, 2);

  return new Date(year, month, day);
}

export function dateStringFormattedToDate(dateString, splitter) {
  const dateComponent = dateString.split(splitter);
  return new Date(
    dateComponent[0],
    Number(dateComponent[1]) - 1,
    dateComponent[2]
  );
}

export function datetimeStringToDateTime(datetimeString) {
  const datetime = new Date(datetimeString);
  const datePart = datetimeStringToDate(datetimeString);
  const timePart = datetime.toLocaleTimeString();

  return datePart + " " + timePart;
}

export const dateArrayForChart = (refDate, duration) => {
  const dateArray = [];
  for (let index = duration + 1; index <= 0; index++) {
    const currentDate = new Date();
    currentDate.setDate(refDate.getDate() + index);

    const yyyymmddFormat = formatDateYYYYMMDDwithDash(currentDate);
    const formattedDate = formatDateMONDD(currentDate);
    dateArray.push({ yyyymmddFormat, formattedDate });
  }
  return dateArray;
};

export const getCurrentMonthFirstAndLastDates = () => {
  const today = new Date();
  const firstDate = new Date(today.getFullYear(), today.getMonth(), 1);
  const lastDate = new Date(today.getFullYear(), today.getMonth() + 1, 0);

  return {
    firstDate,
    lastDate,
  };
};

export function dateTimeObjWithTimeZone(date, timezoneOffset, isEndOfDay) {
  // Get the UTC time in milliseconds from the date object
  const utcTime = date?.getTime() + date?.getTimezoneOffset() * 60000;

  // Calculate the timezone offset in milliseconds
  const timezoneOffsetMs = timezoneOffset * 3600000;

  // Convert to the specified timezone
  const timezoneTime = utcTime + timezoneOffsetMs;

  // Create a new date object with the timezone time
  const dateWithTimezone = new Date(timezoneTime);

  if (isEndOfDay) {
    // Set the time to 23:59:59
    dateWithTimezone.setHours(23);
    dateWithTimezone.setMinutes(59);
    dateWithTimezone.setSeconds(59);
    dateWithTimezone.setMilliseconds(999);
  } else {
    // Set the time to 00:00:00
    dateWithTimezone.setHours(0);
    dateWithTimezone.setMinutes(0);
    dateWithTimezone.setSeconds(0);
    dateWithTimezone.setMilliseconds(0);
  }
  return dateWithTimezone;
}

export function currentDateYYYYMMDD() {
  const timeZone = "Asia/Dhaka"; // GMT+6
  const currentDate = moment().tz(timeZone);
  const formattedDate = currentDate.format("YYYYMMDD");
  return formattedDate;
}

export function anyDateYYYYMMDD(daysAgo, tz = 'Asia/Dhaka') {
  return moment().tz(tz).add(-daysAgo, 'days').format('YYYY-MM-DD');
}

export const formatDuration = (start, end) => {
  if (!start || !end) return '-';
  const diff = moment(end).diff(moment(start), 'minutes');
  const hrs = Math.floor(diff / 60);
  const mins = diff % 60;
  return `${hrs}h ${mins}m`;
};

export const calculateOvertime = (start, end) => {
  if (!start || !end) return '-';
  const diff = moment(end).diff(moment(start), 'minutes');
  const overtime = diff - 480; // 8 hours = 480 minutes
  if (overtime <= 0) return '0h 0m';
  const hrs = Math.floor(overtime / 60);
  const mins = overtime % 60;
  return `${hrs}h ${mins}m`;
};