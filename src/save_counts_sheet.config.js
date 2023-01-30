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
