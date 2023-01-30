/**
 * Returns the Hexadecimal value of a cell's background color.
 *
 * @param {number} row The cell's row number.
 * @param {number} column The cell's column number.
 * @returns The Hexadecimal value of the cell's background color.
 * @customfunction
 */
function F_GETBG(row, column) {
  const background = SpreadsheetApp.getActive()
    .getDataRange()
    .getCell(row, column)
    .getBackground();
  return background;
}

function F_INIT_HEAP(name, init, underHeaps, color) {
  return [[name, init, underHeaps, color]];
}

function F_FILTER(heapName, type) {
  const sheet = AS.getSheetByName(sheetNames.entryPoint);
  const lastRowWithDate = sheet.getLastRow() - 2 ? sheet.getLastRow() : 1;
  const allData = sheet.getRange(3, 2, lastRowWithDate, 6).getValues();
  const filterData = allData.filter((row) => {
    const [_, rowType, rowHeapName] = row;
    if (rowHeapName === heapName && rowType === type) return true;
    return false;
  });
  const preparedData = filterData.map((row) => {
    const [date, _, __, value, tiker, comment] = row;
    return [date, value, tiker, comment];
  });
  return preparedData;
}

function F_GET_RESULT_DATA(heapName) {
  const sheet = AS.getSheetByName(sheetNames.heapName(heapName));
  const defaultRows = 5;

  const settingsSheet = AS.getSheetByName(sheetNames.settings);
  const subHeaps = settingsSheet
    .getRange(3, 2, settingsSheet.getLastRow() - 2, 3)
    .getValues()
    .filter((value) => value[0] === heapName)[0][2];

  const subHeapsAmount = subHeaps.split("|")[0].length
    ? subHeaps.split("|").length
    : 0;
  const data = sheet
    .getRange(4, 3, defaultRows + subHeapsAmount * 3, 1)
    .getValues();
  const result = data[0][0].split(" | ")[2];
  const subHeapsResult = [];

  for (let i = 5; i < data.length; i += 3) {
    const subHeapHeader = data[i][0];
    const subHeapResults = data[i + 1][0];
    const subHeapName = subHeapHeader.split(" | ")[0];
    const subHeapResult = subHeapResults.split(" | ")[2];
    subHeapsResult.push(`${subHeapName} ${subHeapResult}`);
  }
  return [[result, subHeapsResult.join(" | ")]];
}

const maybeAddZero = (a) => (a < 10 ? `0${a}` : `${a}`);
const getDate = (date) => {
  date.setHours(date.getHours() + 7);
  const day = maybeAddZero(date.getUTCDate());
  const month = maybeAddZero(date.getMonth() + 1);
  const year = date.getFullYear();
  return `${day}.${month}.${year}`;
};
const todayDate = () => {
  const today = new Date();
  return getDate(today);
};
