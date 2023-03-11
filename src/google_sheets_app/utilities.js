/**
 * Returns string look like this => 01.01.1970
 */
function getReadableDate(date) {
  var maybeAddZero = (number) => number < 10 ? `0${number}` : `${number}`
  var day = maybeAddZero(date.getDate())
  var month = maybeAddZero(date.getMonth() + 1)
  var year = date.getFullYear()
  return `${day}.${month}.${year}`
}
