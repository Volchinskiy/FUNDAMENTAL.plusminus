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
