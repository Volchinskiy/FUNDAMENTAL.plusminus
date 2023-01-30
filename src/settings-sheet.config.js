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
