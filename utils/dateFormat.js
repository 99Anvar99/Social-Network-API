// function to format a timestamp, accepts the timestamp and an `options` object as parameters
module.exports = (timestamp, { monthLength = 'short', dateSuffix = true } = {}) => {
  // Helper function to add date suffix
  const addDateSuffix = (date) => {
    const dateStr = date.toString();
    const lastChar = dateStr.charAt(dateStr.length - 1);
    if (lastChar === '1' && dateStr !== '11') return `${dateStr}st`;
    if (lastChar === '2' && dateStr !== '12') return `${dateStr}nd`;
    if (lastChar === '3' && dateStr !== '13') return `${dateStr}rd`;
    return `${dateStr}th`;
  };

  const months = {
    0: monthLength === 'short' ? 'Jan' : 'January',
    1: monthLength === 'short' ? 'Feb' : 'February',
    // ... (other months)
  };

  const dateObj = new Date(timestamp);
  const formattedMonth = months[dateObj.getMonth()];
  const dayOfMonth = dateSuffix ? addDateSuffix(dateObj.getDate()) : dateObj.getDate();
  const year = dateObj.getFullYear();
  let hour = dateObj.getHours() > 12 ? dateObj.getHours() - 12 : dateObj.getHours();
  hour = hour === 0 ? 12 : hour; // Convert 0 to 12
  const minutes = (dateObj.getMinutes() < 10 ? '0' : '') + dateObj.getMinutes();
  const periodOfDay = dateObj.getHours() >= 12 ? 'pm' : 'am';

  return `${formattedMonth} ${dayOfMonth}, ${year} at ${hour}:${minutes} ${periodOfDay}`;
};