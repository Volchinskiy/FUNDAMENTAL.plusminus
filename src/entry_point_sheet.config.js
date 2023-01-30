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
