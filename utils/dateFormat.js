const { DateTime } = require('luxon');

function dateFormat(JSDate) {
  return DateTime.fromJSDate(JSDate).toLocaleString(DateTime.DATETIME_MED);
}

module.exports = dateFormat;
