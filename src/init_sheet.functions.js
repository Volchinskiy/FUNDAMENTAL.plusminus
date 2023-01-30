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
