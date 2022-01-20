const { DateTime } = require('luxon');

function dateFormat(millis) {
  return DateTime.fromMillis(millis).toLocaleString(DateTime.DATETIME_MED);
}

module.exports = dateFormat;
