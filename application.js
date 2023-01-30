// global_definitions.js
var defaultSheetBlank = {
  general: {
    fontFamily: "Comfortaa",
    verticalAlignment: "middle",
    horizontalAlignment: "center",
  },
};
var styles = {
  lightGreen: "#bfffa2",
  darkGeen: "#9ad081",
  lightRed: "#ffbfbf",
  darkRed: "#d98b8b",
  lightGray: "#efefef",
  darkGray: "#b7b7b7",
  littleWidthMinus: 21,
  littleWidth: 40,
  mediumWidth: 75,
  mediumWidthPlus: 105,
  largeWidth: 250,
};
var sheetNames = {
  settings: "settings",
  entryPoint: "entry_point",
  saveCounts: "save_counts",
  saveOperations: "save_operations",
  heapName: (name) => `${name}_heap`,
};
var sheetsPatterns = {
  entryPointSheetWidths: [
    { column: 1, value: styles.littleWidthMinus },
    { column: 2, value: styles.mediumWidthPlus },
    { column: 3, value: styles.littleWidth },
    { column: 4, value: styles.mediumWidth },
    { column: 5, value: styles.mediumWidth },
    { column: 6, value: styles.mediumWidth },
    { column: 7, value: styles.largeWidth },
    { column: 8, value: styles.littleWidthMinus },
  ],
  entryPointSheetValues: [
    { range: [2, 2], value: "Date" },
    { range: [2, 3], value: "Type" },
    { range: [2, 4], value: "Heap" },
    { range: [2, 5], value: "Value" },
    { range: [2, 6], value: "Tiker" },
    { range: [2, 7], value: "Comment" },
  ],
  entryPointSheetFontWeights: [{ range: [2, 2, 1, 6] }],
  tableBorderWithHeader: (...range) => [
    { range, values: [true, true, true, true, true, null] },
    {
      range: [range[0], range[1], 1, range[3]],
      values: [null, null, true, null, null, null],
    },
  ],
  heapSheetFirsRows: [
    { column: 1, value: styles.littleWidthMinus },
    { column: 2, value: styles.littleWidthMinus },
    { column: 3, value: styles.largeWidth },
    { column: 4, value: styles.littleWidthMinus },
    { column: 5, value: styles.littleWidthMinus },
  ],
};
var functions = {
  getBg: "F_GETBG",
  initHeap: "F_INIT_HEAP",
  filter: "F_FILTER",
  getResultData: "F_GET_RESULT_DATA",
  mainCountingFunction: "F_MAIN_COUNTING_FUNCTION",
  initBasisSheets: "F_INIT_BASIS_SHEETS",
  initHeapSheets: "F_INIT_HEAP_SHEETS",
  save: "saveData",
};
const sum = (name) => (acc, row) => {
  if (row[1] === name) return acc + row[0];
  return acc;
};
var tikers = [
  [
    {
      name: "prog",
      description: "Resources, That I Get Due To Programing.",
      func: sum("prog"),
      range: "plus",
    },
    {
      name: "ttt",
      description: "Resources That I Get Due To Tattoo.",
      func: sum("ttt"),
      range: "plus",
    },
    {
      name: "cns",
      description: "Could Not Spend.",
      func: sum("cns"),
      range: "minus",
    },
  ],
  [
    {
      name: "no",
      description: "Doesn't Go Through The Cycle Of Division By Sub Heaps.",
    },
  ],
];
function getAS(
  idOrUrl = "https://docs.google.com/spreadsheets/d/1SdzWHXlredeAp6EQABc6OLk54w8wxfhDYV77uu2Qmwo/edit#gid=0"
) {
  const AS = SpreadsheetApp.getActiveSpreadsheet();
  if (AS) return AS;
  try {
    return SpreadsheetApp.openById(idOrUrl);
  } catch {
    return SpreadsheetApp.openByUrl(idOrUrl);
  }
}
const AS = getAS();

// utilities.js
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

// ui.functions.js
function onOpen() {
  F_INIT_UI();
}
function F_INIT_UI() {
  const ui = SpreadsheetApp.getUi();
  ui.createMenu("F_SCRIPTS")
    .addSubMenu(
      ui
        .createMenu("Init Sheets")
        .addItem("Basis Sheets", functions.initBasisSheets)
        .addItem("Heap Sheets", functions.initHeapSheets)
    )
    .addItem("Save Data", functions.save)
    .addToUi();
}
function F_CONFIRM() {
  var ui = SpreadsheetApp.getUi();
  var result = ui.alert(
    "Please confirm",
    "Are you sure you want to continue?",
    ui.ButtonSet.YES_NO
  );
  if (result == ui.Button.YES) {
    ui.alert("Confirmation received.");
  } else {
    ui.alert("Permission denied.");
  }
}

// init_sheet.functions.js
function F_INIT_BASIS_SHEETS() {
  const createSheet = new CreateSheet();
  createSheet.create(entryPointSheetConfig);
  createSheet.create(settingsSheetConfig);
  createSheet.create(saveCountsSheetConfig);
  createSheet.create(saveOperationsSheetConfig);
}
function F_INIT_HEAP_SHEETS() {
  const settingsSheet = AS.getSheetByName(sheetNames.settings);
  const initData = settingsSheet
    .getRange(3, 2, settingsSheet.getLastRow() - 2, 4)
    .getValues();
  for (let i = 0; i < initData.length; i++) {
    const sheetData = initData[i];
    const [name, _, subHeaps, color] = sheetData;
    if (!name) continue;
    const row = i + 3;
    const createSheet = new CreateSheet();
    const heap_sheet = createSheet.create(heapSheetConfig(name, row));
    const tikersAmount = tikers.length - 1;
    let defaultRows = 7 + tikersAmount * 3;
    const subHeapsAmount = subHeaps.split("|")[0]
      ? subHeaps.split("|").length
      : 0;
    if (subHeapsAmount) defaultRows = defaultRows + subHeapsAmount * 3;
    const calculateRange = heap_sheet.getRange(2, 2, defaultRows, 3);
    calculateRange.setBackground(color);
    calculateRange.setBorder(true, true, true, true, null, null);
    for (let i = 3, j = 1; i <= defaultRows; i++, j++) {
      if (j === 1) {
        const range = heap_sheet.getRange(i, 3);
        range.setBackground(styles.darkGray);
        range.setBorder(true, true, null, true, null, null);
        range.setFontWeight("bold");
      }
      if (j === 2) {
        const range = heap_sheet.getRange(i, 3);
        range.setBackground(styles.lightGray);
        range.setBorder(null, true, true, true, null, null);
        j = -1;
      }
    }
    settingsSheet
      .getRange(row, 6)
      .setFormula(
        `=${functions.getResultData}("${name}"; ${sheetNames.heapName(
          name
        )}!C3)`
      );
  }
}

// save_data.functions.js
function saveData() {
  const { dateRange, rowAmount } = saveOperations();
  saveCounts(dateRange);
  clearEntryPoin(rowAmount);
}
function saveOperations() {
  const entryPointSheet = AS.getSheetByName(`${sheetNames.entryPoint}`);
  const operations = entryPointSheet
    .getRange(3, 2, entryPointSheet.getLastRow() - 2, 6)
    .getValues();
  const saveOperationsSheet = AS.getSheetByName(`${sheetNames.saveOperations}`);
  const rowAfterLastRow = saveOperationsSheet.getLastRow() + 1;
  saveOperationsSheet.insertRowsAfter(
    rowAfterLastRow + 1,
    operations.length + 1
  );
  const firstDate =
    operations[0][0] instanceof Date
      ? getDate(operations[0][0])
      : operations[0][0];
  const dateRange = `${firstDate} - ${todayDate()}`;
  saveOperationsSheet.getRange(rowAfterLastRow, 7).setValue(dateRange);
  // we can set this values without loop
  for (
    let row = rowAfterLastRow + 1, i = 0;
    i < operations.length;
    row++, i++
  ) {
    saveOperationsSheet.getRange(row, 2, 1, 6).setValues([operations[i]]);
  }
  return { dateRange, rowAmount: operations.length + 3 };
}
function saveCounts(dateRange) {
  const settingsSheet = AS.getSheetByName(sheetNames.settings);
  const saveCountsSheet = AS.getSheetByName(sheetNames.saveCounts);
  const heapsData = settingsSheet
    .getRange(3, 2, settingsSheet.getLastRow() - 2, 6)
    .getValues();
  for (let i = 0; i < heapsData.length; i++) {
    const heap = heapsData[i];
    const heapName = heap[0];
    if (!heapName) continue;
    const tikersAmount = tikers.length - 1;
    let defaultRows = 7 + tikersAmount * 3;
    const subHeaps = heap[2];
    const subHeapsAmount = subHeaps.split("|")[0]
      ? subHeaps.split("|").length
      : 0;
    if (subHeapsAmount) defaultRows += subHeapsAmount * 3;
    const rowAfterLastRow = saveCountsSheet.getLastRow()
      ? saveCountsSheet.getLastRow() + 3
      : 2;
    saveCountsSheet.insertRowsAfter(rowAfterLastRow, defaultRows + 1);
    const title = `${heapName} - ${dateRange}`;
    saveCountsSheet.getRange(rowAfterLastRow, 3).setValue(title);
    const heapSheet = AS.getSheetByName(`${sheetNames.heapName(heapName)}`);
    const countValues = heapSheet
      .getRange(3, 3, defaultRows - 2, 1)
      .getValues();
    saveCountsSheet
      .getRange(rowAfterLastRow + 1, 3, countValues.length, 1)
      .setValues(countValues);
    const color = heap[3];
    const calculateRange = saveCountsSheet.getRange(
      rowAfterLastRow,
      2,
      defaultRows,
      3
    );
    calculateRange.setBackground(color);
    calculateRange.setBorder(true, true, true, true, null, null);
    for (
      let i = rowAfterLastRow + 1, j = 1;
      i <= defaultRows + rowAfterLastRow - 1;
      i++, j++
    ) {
      if (j === 1) {
        const range = saveCountsSheet.getRange(i, 3);
        range.setBackground(styles.darkGray);
        range.setBorder(true, true, null, true, null, null);
        range.setFontWeight("bold");
      }
      if (j === 2) {
        const range = saveCountsSheet.getRange(i, 3);
        range.setBackground(styles.lightGray);
        range.setBorder(null, true, true, true, null, null);
        j = -1;
      }
    }
    const row = i + 3;
    const result = heap[4];
    let subHeapsResults = "";
    let subHeapNamesAndPercents = "";
    if (heap[2]) {
      subHeapsResults = heap[5]
        .split(" | ")
        .map((result) => result.split(" ")[1]);
      subHeapNamesAndPercents = heap[2]
        .split("|")
        .map((values) => values.trim().split(" "));
      for (let i = 0; i < subHeapsResults.length; i++) {
        const subHeapResult = subHeapsResults[i];
        subHeapNamesAndPercents[i].splice(1, 1, subHeapResult);
        subHeapNamesAndPercents[i] = subHeapNamesAndPercents[i].join(" ");
      }
      subHeapNamesAndPercents = subHeapNamesAndPercents.join(" | ");
    }
    settingsSheet
      .getRange(row, 2)
      .setFormula(
        `${functions.initHeap}("${heapName}"; ${result}; "${subHeapNamesAndPercents}"; "${color}")`
      );
  }
}
function clearEntryPoin(rowAmount) {
  const entryPointSheet = AS.getSheetByName(sheetNames.entryPoint);
  for (let row = 3; row < rowAmount; row++) {
    entryPointSheet
      .getRange(row, 2, 1, 6)
      .setValues([["", "", "", "", "", ""]]);
  }
}

// create_sheet.class.js
class CreateSheet {
  constructor() {
    this.AS = AS;
    this.sheet = null;
    this.config = null;
  }
  create(sheetConfig) {
    this.config = sheetConfig;
    this.createSheet();
    this.setWidths();
    this.setBorders();
    this.setBackgrounds();
    this.setValues();
    this.setFontWeights();
    this.setFormulas();
    return this.sheet;
  }
  createSheet() {
    const {
      name,
      rows,
      columns,
      deletable,
      fontFamily,
      verticalAlignment,
      horizontalAlignment,
    } = this.config.general;
    const possibleExistingSheet = this.AS.getSheetByName(name);
    if (possibleExistingSheet) {
      if (!deletable)
        throw new Error(`${name} SHEET IS EXIST AND NOT DELETABLE`);
      this.AS.deleteSheet(possibleExistingSheet);
      console.log("DELETE OLD PAGE");
    }
    const sheet = this.AS.insertSheet(name);
    this.sheet = sheet;
    // need add situation if we want to create more than 1000 rows or 26 cells
    const sheetRows = sheet.getMaxRows();
    const sheetCells = sheet.getMaxColumns();
    if (rows < sheetRows) sheet.deleteRows(1, sheetRows - rows);
    if (columns < sheetCells) sheet.deleteColumns(1, sheetCells - columns);
    const allCells = sheet.getRange(1, 1, rows, columns);
    allCells.setHorizontalAlignment(horizontalAlignment);
    allCells.setVerticalAlignment(verticalAlignment);
    allCells.setFontFamily(fontFamily);
  }
  setWidths() {
    if ("widths" in this.config) {
      const { widths } = this.config;
      for (const { column, value } of widths)
        this.sheet.setColumnWidth(column, value);
    }
  }
  setBorders() {
    if ("borders" in this.config) {
      const { borders } = this.config;
      for (const { range, values } of borders)
        this.sheet.getRange(...range).setBorder(...values);
    }
  }
  setBackgrounds() {
    if ("backgrounds" in this.config) {
      const { backgrounds } = this.config;
      for (const { range, value } of backgrounds)
        this.sheet.getRange(...range).setBackground(value);
    }
  }
  setValues() {
    if ("values" in this.config) {
      const { values } = this.config;
      for (const { range, value } of values)
        this.sheet.getRange(...range).setValue(value);
    }
  }
  setFontWeights() {
    if ("fontWeights" in this.config) {
      const { fontWeights } = this.config;
      for (const { range } of fontWeights)
        this.sheet.getRange(...range).setFontWeight("bold");
    }
  }
  setFormulas() {
    if ("formulas" in this.config) {
      const { formulas } = this.config;
      for (const { range, formula } of formulas)
        this.sheet.getRange(...range).setFormula(formula);
    }
  }
}

// counting.functions.js
const add = (acc, row) => (row[0] ? acc + row[0] : acc);
function F_MAIN_COUNTING_FUNCTION(name, _plusRange, _minusRange, _settings) {
  // NEED TO DELETE
  const settingsSheet = AS.getSheetByName(sheetNames.settings);
  const initData = settingsSheet
    .getRange(3, 2, settingsSheet.getLastRow() - 2, 3)
    .getValues();
  const [_, init, subHeaps] = initData.filter((data) => data[0] === name).at(0);
  const sheet = AS.getSheetByName(sheetNames.heapName(name));
  const plusData = sheet.getRange(3, 7, sheet.getMaxRows() - 3, 2).getValues();
  const minusData = sheet
    .getRange(3, 12, sheet.getMaxRows() - 3, 2)
    .getValues();
  const result = subHeaps
    ? getResultWithHeaps(init, subHeaps, plusData, minusData)
    : getResultWithoutHeaps(init, plusData, minusData);
  const getTikerResult = (func, range) => {
    if (range === "minus") return minusData.reduce(func, 0);
    return plusData.reduce(func, 0);
  };
  for (let i = 0; i < tikers.length - 1; i++) {
    const threeTikers = tikers[i];
    const tikerNames = threeTikers.map((tiker) => tiker.name).join(" | ");
    const tikerValues = threeTikers
      .map(({ func, range }) => getTikerResult(func, range))
      .join(" | ");
    result.push([tikerNames]);
    result.push([tikerValues]);
    result.push([]);
  }
  return result;
}
function getResultWithoutHeaps(init, plusData, minusData) {
  const generalPlus = plusData.reduce(add, 0);
  const generaMinus = minusData.reduce(add, 0);
  const difference = generalPlus - generaMinus;
  const calculatedResult = init + difference;
  return [
    ["Init | Diff | Result"],
    [
      `${init} | ${
        difference > 0 ? `+${difference}` : difference
      } | ${calculatedResult}`,
    ],
    [],
    ["Plus | Minus"],
    [`${generalPlus} | ${generaMinus}`],
    [],
  ];
}
function getResultWithHeaps(init, subHeaps, plusData, minusData) {
  const generalPlus = plusData.reduce(add, 0);
  const generaMinus = minusData.reduce(add, 0);
  const plusWithoutNo = plusData
    .filter((row) => row[1] !== "no")
    .reduce(add, 0);
  const [persents, subHeapValues] = calculateSubHeapValues(
    plusWithoutNo,
    subHeaps
  );
  const difference = generalPlus - generaMinus - persents;
  const calculatedResult = init + difference;
  return [
    ["Init | Diff | Result"],
    [
      `${init} | ${
        difference > 0 ? `+${difference}` : difference
      } | ${calculatedResult}`,
    ],
    [],
    ["Plus | Minus | Persents"],
    [`${generalPlus} | ${generaMinus} | ${persents}`],
    [],
    ...subHeapValues,
  ];
}
function calculateSubHeapValues(generalPlus, subHeaps) {
  subHeaps = subHeaps
    .trim()
    .split("|")
    .map((heap) => heap.trim().split(" "));
  const subHeapValues = [];
  let calculatePersents = 0;
  for (const [name, init, percent] of subHeaps) {
    subHeapValues.push([`${name} | Init | Persent | Result`]);
    const persentValue = Math.round((generalPlus / 100) * Number(percent));
    subHeapValues.push([
      `${init} | ${percent}% (${persentValue}) | ${
        Number(init) + persentValue
      }`,
    ]);
    subHeapValues.push([]);
    calculatePersents += persentValue;
  }
  return [calculatePersents, subHeapValues];
}

// entry_point_sheet.config.js
var entryPointSheetConfig = {
  general: {
    name: sheetNames.entryPoint,
    rows: 203,
    columns: 8,
    deletable: false,
    ...defaultSheetBlank.general,
  },
  widths: [...sheetsPatterns.entryPointSheetWidths],
  borders: [...sheetsPatterns.tableBorderWithHeader(2, 2, 201, 6)],
  backgrounds: [
    { range: [2, 2, 1, 6], value: styles.darkGray },
    { range: [3, 2, 200, 6], value: styles.lightGray },
  ],
  values: [...sheetsPatterns.entryPointSheetValues],
  fontWeights: [...sheetsPatterns.entryPointSheetFontWeights],
};

// settings_sheet.config.js
var settingsSheetConfig = {
  general: {
    name: sheetNames.settings,
    rows: 10,
    columns: 9,
    deletable: false,
    ...defaultSheetBlank.general,
  },
  widths: [
    { column: 1, value: styles.littleWidthMinus },
    { column: 4, value: styles.largeWidth },
    { column: 7, value: styles.largeWidth },
    { column: 9, value: styles.littleWidthMinus },
  ],
  borders: [...sheetsPatterns.tableBorderWithHeader(2, 2, 8, 7)],
  backgrounds: [
    { range: [2, 2, 1, 7], value: styles.darkGray },
    { range: [3, 2, 7, 4], value: styles.lightGreen },
    { range: [3, 6, 7, 3], value: styles.lightGray },
  ],
  values: [
    { range: [2, 2], value: "Name" },
    { range: [2, 3], value: "Init" },
    { range: [2, 4], value: "Sub Heaps" },
    { range: [2, 5], value: "Color" },
    { range: [2, 6], value: "Result" },
    { range: [2, 7], value: "Sub Heaps Result" },
    { range: [2, 8], value: "Merge" },
  ],
  fontWeights: [{ range: [2, 2, 1, 7] }],
  formulas: [
    {
      range: [3, 2],
      formula: `=${functions.initHeap}("EXAMPLE"; 0; "Stock 0 20 | Invest 0 10"; "#d5a6bd")`,
    },
  ],
};

// heap_sheet.config.js
var heapSheetConfig = (name, row) => ({
  general: {
    name: sheetNames.heapName(name),
    rows: 203,
    columns: 15,
    deletable: true,
    ...defaultSheetBlank.general,
  },
  widths: [
    ...sheetsPatterns.heapSheetFirsRows,
    { column: 6, value: styles.mediumWidthPlus },
    { column: 7, value: styles.mediumWidthPlus },
    { column: 8, value: styles.mediumWidth },
    { column: 9, value: styles.largeWidth },
    { column: 10, value: styles.littleWidthMinus },
    { column: 11, value: styles.mediumWidthPlus },
    { column: 12, value: styles.mediumWidthPlus },
    { column: 13, value: styles.mediumWidth },
    { column: 14, value: styles.largeWidth },
    { column: 15, value: styles.littleWidthMinus },
  ],
  borders: [
    ...sheetsPatterns.tableBorderWithHeader(2, 6, 201, 4),
    ...sheetsPatterns.tableBorderWithHeader(2, 11, 201, 4),
  ],
  backgrounds: [
    { range: [2, 6], value: styles.darkGray },
    { range: [3, 6, 200, 1], value: styles.lightGray },
    { range: [2, 7, 1, 3], value: styles.darkGeen },
    { range: [3, 7, 200, 3], value: styles.lightGreen },
    { range: [2, 11], value: styles.darkGray },
    { range: [3, 11, 200, 1], value: styles.lightGray },
    { range: [2, 12, 1, 3], value: styles.darkRed },
    { range: [3, 12, 200, 3], value: styles.lightRed },
  ],
  values: [
    { range: [2, 6], value: "Date" },
    { range: [2, 7], value: "Plus" },
    { range: [2, 8], value: "Tiker" },
    { range: [2, 9], value: "Comment" },
    { range: [2, 11], value: "Date" },
    { range: [2, 12], value: "Minus" },
    { range: [2, 13], value: "Tiker" },
    { range: [2, 14], value: "Comment" },
  ],
  fontWeights: [{ range: [2, 6, 1, 4] }, { range: [2, 11, 1, 4] }],
  formulas: [
    {
      range: [3, 3],
      formula: `=${functions.mainCountingFunction}("${name}"; F3; K3; ${sheetNames.settings}!B${row}:E${row})`,
    },
    {
      range: [3, 6],
      formula: `=${functions.filter}("${name}"; "p"; ${sheetNames.entryPoint}!B3:G202)`,
    },
    {
      range: [3, 11],
      formula: `=${functions.filter}("${name}"; "m"; ${sheetNames.entryPoint}!B3:G202)`,
    },
  ],
});

// save_counts_sheet.config.js
var saveCountsSheetConfig = {
  general: {
    name: sheetNames.saveCounts,
    rows: 3,
    columns: 5,
    deletable: false,
    ...defaultSheetBlank.general,
  },
  widths: [...sheetsPatterns.heapSheetFirsRows],
};

// save_operations_sheet.config.js
var saveOperationsSheetConfig = {
  general: {
    name: sheetNames.saveOperations,
    rows: 6,
    columns: 8,
    deletable: false,
    ...defaultSheetBlank.general,
  },
  widths: [...sheetsPatterns.entryPointSheetWidths],
  borders: [...sheetsPatterns.tableBorderWithHeader(2, 2, 4, 6)],
  backgrounds: [
    { range: [2, 2, 1, 6], value: styles.darkGray },
    { range: [3, 2, 3, 6], value: styles.lightGray },
  ],
  values: [...sheetsPatterns.entryPointSheetValues],
  fontWeights: [...sheetsPatterns.entryPointSheetFontWeights],
};
