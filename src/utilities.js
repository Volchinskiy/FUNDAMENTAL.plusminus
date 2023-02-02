/**
 * Returns the Hexadecimal value of a cell's background color.
 *
 * @param {string} sheetName The sheet's name.
 * @param {number} row The cell's row number.
 * @param {number} column The cell's column number.
 * @returns The Hexadecimal value of the cell's background color.
 * @customfunction
 */
function getBg(sheetName, row, column) {
  return globalDefinitions.AS.getSheetByName(sheetName).getRange(row, column).getBackground();
}

/**
 * Use this function for init money heap sheet.
 *
 * @param {string} name The name of heap that help you distinguish heaps from others.
 * @param {number} init The init value (count of all money that now you have).
 * @param {string} subHeaps The heaps in which you will add the percentage of the general plus.
 * @param {string} color The color of heap that help you distinguish heaps from others.
 * @returns Matrix that fills needed cells.
 * @customfunction
 */
function F_INIT_HEAP(name, init, subHeaps, color) {
  return [[name, init, subHeaps, color]];
}

/**
 * Custom filter function that extend google sheet filter function.
 * It gets all data from entry_point, filter and carrie to heap sheet.
 *
 * @param {*} heapName The name of heap that help you distinguish heaps from others.
 * @param {*} type The type of operation plus or minus
 * @returns Matrix that fills needed cells.
 * @customfunction
 */
function F_FILTER(heapName, type) {
  const { AS, contentPaddingTop, sheetNames: { entryPoint } } = globalDefinitions;
  const entryPointSheet = AS.getSheetByName(entryPoint);
  const rows = entryPointSheet.getLastRow() - contentPaddingTop || 1;
  const operations = entryPointSheet.getRange(3, 2, rows, 6).getValues();
  const filteredOperations = operations.filter(
    ([_, operationType, operationHeapName]) => (operationHeapName === heapName && operationType === type)
  );
  const preparedOperations = filteredOperations.map((operation  ) => {
    // in this function you need to use projection
    const [date, _, __, value, tikers, comment] = operation;
    return [date, value, tikers, comment];
  });
  return preparedOperations;
}

/**
 * Function that show you results of your heap.
 *
 * @param {string} heapName The name of heap that help you distinguish heaps from others.
 * @returns Matrix that fills needed cells.
 * @customfunction
 */
function F_GET_HEAP_COUNTS_RESULT(heapName) {
  const { AS, sheetNames: { settings, getHeapName }, contentPaddingTop } = globalDefinitions;
  const heapSheet = AS.getSheetByName(getHeapName(heapName));
  const settingsSheet = AS.getSheetByName(settings);
  const rows = 5;
  const heapSubHeaps = settingsSheet
    .getRange(3, 2, settingsSheet.getLastRow() - contentPaddingTop, 3)
    .getValues()
    .filter((value) => value[0] === heapName)[0][2];
  const subHeaps = heapSubHeaps.split("|");
  const subHeapsAmount = subHeaps[0].length ? subHeaps.length : 0;
  const mainCountResult = heapSheet.getRange(4, 3, rows + subHeapsAmount * 3, 1).getValues();
  const heapResult = mainCountResult[0][0].split(" | ")[2];
  const subHeapsResults = [];
  for (let i = 5; i < mainCountResult.length; i += 3) {
    const subHeapHeader = mainCountResult[i][0];
    const subHeapCounts = mainCountResult[i + 1][0];
    const subHeapName = subHeapHeader.split(" | ")[0];
    const subHeapResult = subHeapCounts.split(" | ")[2];
    subHeapsResults.push(`${subHeapName} ${subHeapResult}`);
  }
  return [[heapResult, subHeapsResults.join(" | ")]];
}

function maybeAddZero(a) {
  return a < 10 ? `0${a}` : `${a}`;
}
function getDate(date) {
  date.setHours(date.getHours() + 7);
  const day = maybeAddZero(date.getUTCDate());
  const month = maybeAddZero(date.getMonth() + 1);
  const year = date.getFullYear();
  return `${day}.${month}.${year}`;
}
function todayDate() {
  const today = new Date();
  return getDate(today);
}

/**
 * Function that return ActiveSpreadsheet.
 *
 * @param {string} idOrUrl Spreadsheet ID or URL.
 * @returns {Spreadsheet}
 */
function getAS(idOrUrl) {
  const AS = SpreadsheetApp.getActiveSpreadsheet();
  if (AS) return AS;
  try { return SpreadsheetApp.openById(idOrUrl) }
  catch { return SpreadsheetApp.openByUrl(idOrUrl) }
}

function sum(name) {
  return (acc, row) => {
    if (row[1] === name) return acc + row[0];
    return acc;
  };
}
