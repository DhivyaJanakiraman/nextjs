const helper = {};

helper.months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec"
];
helper.fullMonths = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];

helper.daysInMonth = function(year, month) {
  return new Date(year, month, 0).getDate();
};

helper.toOrdinal = function(day) {
  if (day > 3 && day < 21) {
    return `${day}th`;
  }

  switch (day % 10) {
    case 1:
      return `${day}st`;
    case 2:
      return `${day}nd`;
    case 3:
      return `${day}rd`;
    default:
      return `${day}th`;
  }
};

helper.toStandardHour = function(hour) {
  let amPm = 'AM';

  if (hour > 12) {
    hour -= 12;
    amPm = 'PM';
  }

  if (+hour === 12) {
    amPm = 'PM';
  }

  if (+hour === 0) {
    amPm = 'AM';
    hour = 12;
  }

  return hour + amPm;
};

helper.timestampToStandard = function(timestamp) {
  const date = new Date(+timestamp);

  return helper.dateObjectToStandard(date);
};

// TODO: remove
helper.completeDateToStandard = function(dateString) {
  const date = new Date(dateString);

  return helper.dateObjectToStandard(date);
};

helper.getSecondsFromMilliseconds = function(ms) {
  return ms / 1000;
};
helper.getMinutesFromMiliseconds = function(ms) {
  return helper.getSecondsFromMilliseconds(ms) / 60;
};
helper.getHoursFromMilliseconds = function(ms) {
  return helper.getMinutesFromMiliseconds(ms) / 60;
};
helper.getDaysFromMilliseconds = function(ms) {
  return helper.getHoursFromMilliseconds(ms) / 24;
};

helper.getDuration = function(ms) {
  if (ms < 1000) {
    return `${ms}ms`;
  }

  const seconds = helper.getSecondsFromMilliseconds(ms);
  if (seconds < 60) {
    return `${seconds.toFixed(2).replace(".00", "")}s`;
  }

  const minutes = helper.getMinutesFromMiliseconds(ms);
  if (minutes < 60) {
    return `${minutes.toFixed(2).replace(".00", "")}m`;
  }

  const hours = helper.getHoursFromMilliseconds(ms);
  if (hours < 24) {
    return `${hours.toFixed(2).replace(".00", "")}h`;
  }

  const days = helper.getDaysFromMilliseconds(ms);
  return `${days.toFixed(2).replace(".00", "")}d`;
};

helper.getPrettyDuration = function(ms) {
  if (ms < 1000) {
    return `${ms}ms`;
  }

  const seconds = helper.getSecondsFromMilliseconds(ms);
  if (seconds < 60) {
    return `${seconds.toFixed(2).replace(".00", "")} seconds`;
  }

  const minutes = helper.getMinutesFromMiliseconds(ms);
  if (minutes < 60) {
    return `${minutes.toFixed(2).replace(".00", "")} minutes`;
  }

  const hours = helper.getHoursFromMilliseconds(ms);
  if (hours < 24) {
    return `${hours.toFixed(2).replace(".00", "")} hours`;
  }

  const days = helper.getDaysFromMilliseconds(ms);
  return `${days.toFixed(2).replace(".00", "")} days`;
};

helper.dateObjectToStandard = function(dateObj, useFullMonth) {
  const date = dateObj;
  const day = date.getDate();
  const year = date.getFullYear();
  let month = date.getMonth();
  let hour = date.getHours();
  let minute = date.getMinutes();
  let seconds = date.getSeconds();
  let amPm = 'AM';

  if (hour > 12) {
    hour -= 12;
    amPm = 'PM';
  }

  if (+hour === 12) {
    amPm = 'PM';
  }

  if (+hour === 0) {
    amPm = 'AM';
    hour = 12;
  }

  if (minute < 10) {
    minute = `0${minute}`;
  }

  if (seconds < 10) {
    seconds = `0${seconds}`;
  }

  if (!useFullMonth) {
    month = helper.months[month];
  } else {
    month = helper.fullMonths[month];
  }

  return `${month} ${day}, ${year}, ${hour}:${minute}:${seconds} ${amPm}`;
};

helper.daysToHours = function(days) {
  return days * 24;
};

helper.daysToMinutes = function(days) {
  return helper.daysToHours(days) * 60;
};

helper.hoursToMinutes = function(hours) {
  return hours * 60;
};

helper.minutesToHours = function(mins) {
  return mins / 24;
};

helper.displayDate = function(inputDate) {
  const year = new Date(inputDate).getFullYear();
  const month = new Date(inputDate).getMonth();
  const date = new Date(inputDate).getDate();
  let monthToShow;

  switch (month.toString()) {
    case "0":
      monthToShow = "Jan";
      break;
    case "1":
      monthToShow = "Feb";
      break;
    case "2":
      monthToShow = "Mar";
      break;
    case "3":
      monthToShow = "April";
      break;
    case "4":
      monthToShow = "May";
      break;
    case "5":
      monthToShow = "June";
      break;
    case "6":
      monthToShow = "July";
      break;
    case "7":
      monthToShow = "Aug";
      break;
    case "8":
      monthToShow = "Sept";
      break;
    case "9":
      monthToShow = "Oct";
      break;
    case "10":
      monthToShow = "Nov";
      break;
    case "11":
      monthToShow = "Dec";
      break;
  }

  const dateToDisplay = `${monthToShow} ${date.toString()} , ${year.toString()}`;
  return dateToDisplay;
};

helper.getTimeDiffLockedUser = function(dateValue) {
  const deltaMs = dateValue - Date.now();
  const totalSeconds = parseInt(Math.floor(deltaMs / 1000), 10);
  const totalMinutes = parseInt(Math.ceil(totalSeconds / 60), 10);
  const result = totalMinutes > 0 ? `${totalMinutes} minute(s)` : "1 minute"; // VERA-39652 as the request

  return result;
};

export default helper;
