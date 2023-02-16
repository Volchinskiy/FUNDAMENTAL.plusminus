/**
 * One Object that knows about all definitions in the application.
 * Style variables, user functions names, sheet style patterns and other.
 * It needs because I think that if i have these definitions in different files or objects,
 * I'll get many problems with application development.
 */
var globalDefinitions = {
  styleVariables: {
    greenLight: "#bfffa2",
    greenDark: "#9ad081",
    redLight: "#ffbfbf",
    redDark: "#d98b8b",
    grayLight: "#efefef",
    grayDark: "#b7b7b7",

    widthLittlest: 21,
    widthLittle: 40,
    widthLittlePlus: 75,
    widthMedium: 110,
    widthMediumPlus: 145,
    widthLarge: 250,
  },
  formulas: {
    noDataPlug: (formula) => `IFERROR(${formula}, { "00.00.0000", 0, "plug", "no data, it's a plug" })`,
    defaultFilterFormula: (name, type) => `FILTER(entry_point!B3:E202, MAP(entry_point!D3:D202, LAMBDA(cell, AND(REGEXMATCH(cell, "\\b${name}\\b"), REGEXMATCH(cell, "\\b${type}\\b")))))`,
    mixTo: (name, percent) => `"00.00.0000", ROUND(REDUCE(0, FILTER(E3:E202, MAP(F3:F202, LAMBDA(cell, NOT(REGEXMATCH(cell, "\\bno\\b"))))), LAMBDA(sum, value, sum+value)) / 100 * ${percent}), "mixto", "${name}"`,
  },
  sheetNames: {
    settings: "settings",
    entryPoint: "entry_point",
    saveCounts: "save_counts",
    saveOperations: "save_operations",
    getHeapName: (name) => `${name}_heap`,
    saveSortedOperations: "save_sorted_operations",
  },
  sheetsPatterns: {
    general: {
      fontFamily: "Comfortaa",
      verticalAlignment: "middle",
      horizontalAlignment: "center",
      tabColor: null,
    },
    entryPointSheetValues: [
      { range: [2, 2], value: "Date" },
      { range: [2, 3], value: "Value" },
      { range: [2, 4], value: "Tickers" },
      { range: [2, 5], value: "Comment" },
    ],
    entryPointSheetFontWeights: [{ range: [2, 2, 1, 4] }],
    tableBorderWithHeader: (...range) => [
      { range, values: [true, true, true, true, true, null] },
      {
        range: [range[0], range[1], 1, range[3]],
        values: [null, null, true, null, null, null],
      },
    ],
  },
  sheets: {},
  AS: initAS(),
  contentPaddingTop: 2,
}

globalDefinitions.sheetsPatterns.heapSheetFirstRowsWidths = [
  { column: 1, value: getStyleVar("widthLittlest") },
  { column: 2, value: getStyleVar("widthLarge") },
  { column: 3, value: getStyleVar("widthLittlest") },
]

globalDefinitions.sheetsPatterns.operationsWidths = (row) => [
  { column: row, value: getStyleVar("widthMedium") },
  { column: row + 1, value: getStyleVar("widthLittlePlus") },
  { column: row + 2, value: getStyleVar("widthMediumPlus") },
  { column: row + 3, value: getStyleVar("widthLarge") },
]

globalDefinitions.sheetsPatterns.entryPointWidths = [
  { column: 1, value: getStyleVar("widthLittlest") },
  ...getSheetPattern("operationsWidths")(2),
  { column: 6, value: getStyleVar("widthLittlest") },
]

globalDefinitions.formulas.mixFrom = (name, percent) => {
  var heapName = getSheetName("getHeapName")(name)
  return `"00.00.0000", ROUND(REDUCE(0, FILTER(${heapName}!E3:E202, MAP(${heapName}!F3:F202, LAMBDA(cell, NOT(REGEXMATCH(cell, "\\bno\\b"))))), LAMBDA(sum, value, sum+value)) / 100 * ${percent}), "mixfrom", "${name}"`
}

globalDefinitions.sheets.settingsSheet = getAS().getSheetByName(getSheetName("settings"))
globalDefinitions.sheets.entryPointSheet = getAS().getSheetByName(getSheetName("entryPoint"))
globalDefinitions.sheets.saveCountsSheet = getAS().getSheetByName(getSheetName("saveCounts"))
globalDefinitions.sheets.saveOperationsSheet = getAS().getSheetByName(getSheetName("saveOperations"))
globalDefinitions.sheets.saveSortedOperationsSheet = getAS().getSheetByName(getSheetName("saveSortedOperations"))
