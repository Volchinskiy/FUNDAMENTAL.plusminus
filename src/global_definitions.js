/**
 * One Object that know about all definition in this application.
 * Style variables, user functions names, sheet style patterns and much other.
 * It needs because I think that if i have these definitions in different files.
 * I'll get many problems with application development.
 */
const globalDefinitions = {
  styleVariables: {
    greenLight: "#bfffa2",
    greenDark: "#9ad081",
    redLight: "#ffbfbf",
    redDark: "#d98b8b",
    grayLight: "#efefef",
    grayDark: "#b7b7b7",

    widthLittlest: 21,
    widthLittle: 40,
    widthMedium: 75,
    widthMediumPlus: 105,
    widthLarge: 250,
  },
  functionNames: {
    initHeap: "F_INIT_HEAP",
    filter: "F_FILTER",
    getResultData: "F_GET_HEAP_COUNTS_RESULT",
    mainCountingFunction: "F_MAIN_COUNTING_FUNCTION",
    initBasisSheets: "F_INIT_BASIS_SHEETS",
    initHeapSheets: "F_INIT_HEAP_SHEETS",
    save: "saveData",
  },
  sheetNames: {
    settings: "settings",
    entryPoint: "entry_point",
    saveCounts: "save_counts",
    saveOperations: "save_operations",
    getHeapName: (name) => `${name}_heap`,
  },
  sheetPatterns: {
    general: {
      fontFamily: "Comfortaa",
      verticalAlignment: "middle",
      horizontalAlignment: "center",
    },
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
  },
  defaultTikers: ["no", "merge", "p", "m"],
  AS: getAS(),
  contentPaddingTop: 2,
};

globalDefinitions.sheetPatterns.entryPointSheetWidths = [
  { column: 1, value: globalDefinitions.styleVariables.widthLittlest },
  { column: 2, value: globalDefinitions.styleVariables.widthMedium },
  { column: 3, value: globalDefinitions.styleVariables.widthLittle },
  { column: 4, value: globalDefinitions.styleVariables.widthMedium },
  { column: 5, value: globalDefinitions.styleVariables.widthMedium },
  { column: 6, value: globalDefinitions.styleVariables.widthMedium },
  { column: 7, value: globalDefinitions.styleVariables.widthLarge },
  { column: 8, value: globalDefinitions.styleVariables.widthLittlest },
];

globalDefinitions.sheetPatterns.heapSheetFirsRows = [
  { column: 1, value: globalDefinitions.styleVariables.widthLittlest },
  { column: 2, value: globalDefinitions.styleVariables.widthLittlest },
  { column: 3, value: globalDefinitions.styleVariables.widthLarge },
  { column: 4, value: globalDefinitions.styleVariables.widthLittlest },
  { column: 5, value: globalDefinitions.styleVariables.widthLittlest },
];
