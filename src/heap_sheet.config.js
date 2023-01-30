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