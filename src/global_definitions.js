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
