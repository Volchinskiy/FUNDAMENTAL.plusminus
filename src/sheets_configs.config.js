/**
 * All Sheets Configs.
 */
var entryPointSheetConfig = new SheetConfig ({
  general: {
    name: getSheetName("entryPoint"),
    rows: 203,
    columns: 6,
    deletable: false,
    ...getSheetPattern("general"),
  },
  widths: [...getSheetPattern("entryPointWidths")],
  borders: [...getSheetPattern("tableBorderWithHeader")(2, 2, 201, 4)],
  backgrounds: [
    { range: [2, 2, 1, 4], value: getStyleVar("grayDark") },
    { range: [3, 2, 200, 4], value: getStyleVar("grayLight") },
  ],
  values: [...getSheetPattern("entryPointSheetValues")],
  fontWeights: [...getSheetPattern("entryPointSheetFontWeights")]
})

var settingsSheetConfig = new SheetConfig({
  general: {
    name: getSheetName("settings"),
    rows: 10,
    columns: 6,
    deletable: false,
    ...getSheetPattern("general"),
  },
   widths: [
    { column: 1, value: getStyleVar("widthLittlest") },
    { column: 5, value: getStyleVar("widthLarge") },
    { column: 6, value: getStyleVar("widthLittlest") },
  ],
  borders: [...getSheetPattern("tableBorderWithHeader")(2, 2, 8, 4)],
  backgrounds: [
    { range: [2, 2, 1, 4], value: getStyleVar("grayDark") },
    { range: [3, 2, 7, 2], value: getStyleVar("greenLight") },
    { range: [3, 4, 7, 2], value: getStyleVar("grayLight") },
  ],
  values: [
    { range: [2, 2], value: "Name" },
    { range: [2, 3], value: "Init" },
    { range: [2, 4], value: "Result" },
    { range: [2, 5], value: "Mixins" },
    { range: [3, 2], value: "EXAMPLE" },
    { range: [3, 3], value: "0" },
  ],
  fontWeights: [{ range: [2, 2, 1, 4] }],
})

var saveCountsSheetConfig = new SheetConfig({
  general: {
    name: getSheetName("saveCounts"),
    rows: 6,
    columns: 3,
    deletable: false,
    ...getSheetPattern("general"),
  },
  widths: [...getSheetPattern("heapSheetFirstRowsWidths")],
  borders: [ ...getSheetPattern("tableBorderWithHeader")(2, 2, 4, 1)],
  backgrounds: [
    { range: [2, 2], value: getStyleVar("grayDark") },
    { range: [3, 2, 3, 1], value: getStyleVar("grayLight") }
  ],
  fontWeights: [{ range: [2, 2] }],
  horizontalAlignments: [{ range: [3, 2, 3, 1], value: "left" }],
  values: [{ range: [2, 2], value: "Counts" }]
})

var saveOperationsSheetConfig = new SheetConfig({
  general: {
    name: getSheetName("saveOperations"),
    rows: 6,
    columns: 6,
    deletable: false,
    ...getSheetPattern("general"),
  },
  widths: [...getSheetPattern("entryPointWidths")],
  borders: [...getSheetPattern("tableBorderWithHeader")(2, 2, 4, 4)],
  backgrounds: [
    { range: [2, 2, 1, 4], value: getStyleVar("grayDark") },
    { range: [3, 2, 3, 4], value: getStyleVar("grayLight") },
  ],
  values: [...getSheetPattern("entryPointSheetValues")],
  fontWeights: [...getSheetPattern("entryPointSheetFontWeights")],
  horizontalAlignments: [{ range: [3, 2, 3, 4], value: "left" }],
})

var saveSortedOperationsSheetConfig = new SheetConfig({
  general: {
    name: getSheetName("saveSortedOperations"),
    rows: 6,
    columns: 6,
    deletable: false,
    ...getSheetPattern("general"),
  },
  widths: [ ...saveOperationsSheetConfig.widths ],
  borders: [ ...saveOperationsSheetConfig.borders ],
  backgrounds: [ ...saveOperationsSheetConfig.backgrounds ],
  values: [ ...saveOperationsSheetConfig.values ],
  fontWeights: [ ...saveOperationsSheetConfig.fontWeights ],
  horizontalAlignments: [...saveOperationsSheetConfig.horizontalAlignments]
})

var heapSheetConfig = (heapName, settingsSheetRow, plusFilterFormula, minusFilterFormula) => new SheetConfig({
  general: {
    name: getSheetName("getHeapName")(heapName),
    rows: 203,
    columns: 13,
    deletable: true,
    ...getSheetPattern("general"),
    tabColor: "green", // but need add FUNDAMENTAL color
  },
  widths: [
    ...getSheetPattern("heapSheetFirstRowsWidths"),
    ...getSheetPattern("operationsWidths")(4),
    { column: 8, value: getStyleVar("widthLittlest") },
    ...getSheetPattern("operationsWidths")(9),
    { column: 13, value: getStyleVar("widthLittlest") }
  ],
  borders: [
    { range: [2, 2, 5, 1], values: [true, true, true, true, null, null] },
    { range: [8, 2], values: [true, true, true, true, null, null] },
    ...getSheetPattern("tableBorderWithHeader")(2, 4, 201, 4),
    ...getSheetPattern("tableBorderWithHeader")(2, 9, 201, 4),
  ],
  backgrounds: [
    { range: [2, 2, 5, 1], value: getStyleVar("grayLight") },
    { range: [8, 2], value: getStyleVar("grayLight") },
    { range: [2, 4], value: getStyleVar("grayDark") },
    { range: [3, 4, 200, 1], value: getStyleVar("grayLight") },
    { range: [2, 5, 1, 3], value: getStyleVar("greenDark") },
    { range: [3, 5, 200, 3], value: getStyleVar("greenLight") },
    { range: [2, 9], value: getStyleVar("grayDark") },
    { range: [3, 9, 200, 1], value: getStyleVar("grayLight") },
    { range: [2, 10, 1, 3], value: getStyleVar("redDark") },
    { range: [3, 10, 200, 3], value: getStyleVar("redLight") },
  ],
  values: [
    { range: [2, 4], value: "Date" },
    { range: [2, 5], value: "Plus" },
    { range: [2, 6], value: "Tickers" },
    { range: [2, 7], value: "Comment" },
    { range: [2, 9], value: "Date" },
    { range: [2, 10], value: "Minus" },
    { range: [2, 11], value: "Tickers" },
    { range: [2, 12], value: "Comment" },
    { range: [8, 2], value: "Tickers" },
  ],
  fontWeights: [
    { range: [2, 4, 1, 4] },
    { range: [2, 9, 1, 4] },
    { range: [2, 2, 5, 1] },
    { range: [8, 2] },
  ],
  formulas: [
    { range: [2, 2], formula: `=CONCATENATE("Init: ", ${getSheetName('settings')}!C${settingsSheetRow})`, },
    { range: [3, 2], formula: `=CONCATENATE("Plus: ", SUM(E3:E202))`, },
    { range: [4, 2], formula: `=CONCATENATE("Minus: ", SUM(J3:J202))`, },
    { range: [5, 2], formula: `=CONCATENATE("Diff: ", SUM(E3:E202) - SUM(J3:J202))`, },
    { range: [6, 2], formula: `=CONCATENATE("Result: ", ${getSheetName('settings')}!C${settingsSheetRow} + SUM(E3:E202) - SUM(J3:J202))`, },
    { range: [9, 2], formula: `=F_GET_TICKERS("${heapName}", F3:F202, K3:K202)`, },
    { range: [3, 4], formula: plusFilterFormula, },
    { range: [3, 9], formula: minusFilterFormula, },
  ],
  horizontalAlignments: [
    { range: [2, 2, 5, 1], value: "left" },
    { range: [8, 2, 195, 1], value: "left" },
    { range: [3, 4, 200, 4], value: "left" },
    { range: [3, 9, 200, 4], value: "left" },
  ],
  fontStyles: [
    { range: [3, 4, 200, 4] },
    { range: [3, 9, 200, 4] },
  ]
})
