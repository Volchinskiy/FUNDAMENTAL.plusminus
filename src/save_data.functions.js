function saveData() {
  const { dateRange, rowAmount } = saveOperations();
  saveCounts(dateRange);
  clearEntryPoin(rowAmount);
}

function saveOperations() {
  const entryPointSheet = AS.getSheetByName(`${sheetNames.entryPoint}`);
  const operations = entryPointSheet
    .getRange(3, 2, entryPointSheet.getLastRow() - 2, 6)
    .getValues();
  const saveOperationsSheet = AS.getSheetByName(`${sheetNames.saveOperations}`);
  const rowAfterLastRow = saveOperationsSheet.getLastRow() + 1;
  saveOperationsSheet.insertRowsAfter(
    rowAfterLastRow + 1,
    operations.length + 1
  );
  const firstDate =
    operations[0][0] instanceof Date
      ? getDate(operations[0][0])
      : operations[0][0];
  const dateRange = `${firstDate} - ${todayDate()}`;
  saveOperationsSheet.getRange(rowAfterLastRow, 7).setValue(dateRange);
  // we can set this values without loop
  for (
    let row = rowAfterLastRow + 1, i = 0;
    i < operations.length;
    row++, i++
  ) {
    saveOperationsSheet.getRange(row, 2, 1, 6).setValues([operations[i]]);
  }
  return { dateRange, rowAmount: operations.length + 3 };
}

function saveCounts(dateRange) {
  const settingsSheet = AS.getSheetByName(sheetNames.settings);
  const saveCountsSheet = AS.getSheetByName(sheetNames.saveCounts);
  const heapsData = settingsSheet
    .getRange(3, 2, settingsSheet.getLastRow() - 2, 6)
    .getValues();
  for (let i = 0; i < heapsData.length; i++) {
    const heap = heapsData[i];
    const heapName = heap[0];
    if (!heapName) continue;

    const tikersAmount = tikers.length - 1;
    let defaultRows = 7 + tikersAmount * 3;
    const subHeaps = heap[2];
    const subHeapsAmount = subHeaps.split("|")[0]
      ? subHeaps.split("|").length
      : 0;
    if (subHeapsAmount) defaultRows += subHeapsAmount * 3;

    const rowAfterLastRow = saveCountsSheet.getLastRow()
      ? saveCountsSheet.getLastRow() + 3
      : 2;
    saveCountsSheet.insertRowsAfter(rowAfterLastRow, defaultRows + 1);

    const title = `${heapName} - ${dateRange}`;
    saveCountsSheet.getRange(rowAfterLastRow, 3).setValue(title);

    const heapSheet = AS.getSheetByName(`${sheetNames.heapName(heapName)}`);
    const countValues = heapSheet
      .getRange(3, 3, defaultRows - 2, 1)
      .getValues();

    saveCountsSheet
      .getRange(rowAfterLastRow + 1, 3, countValues.length, 1)
      .setValues(countValues);

    const color = heap[3];
    const calculateRange = saveCountsSheet.getRange(
      rowAfterLastRow,
      2,
      defaultRows,
      3
    );
    calculateRange.setBackground(color);
    calculateRange.setBorder(true, true, true, true, null, null);

    for (
      let i = rowAfterLastRow + 1, j = 1;
      i <= defaultRows + rowAfterLastRow - 1;
      i++, j++
    ) {
      if (j === 1) {
        const range = saveCountsSheet.getRange(i, 3);
        range.setBackground(styles.darkGray);
        range.setBorder(true, true, null, true, null, null);
        range.setFontWeight("bold");
      }
      if (j === 2) {
        const range = saveCountsSheet.getRange(i, 3);
        range.setBackground(styles.lightGray);
        range.setBorder(null, true, true, true, null, null);
        j = -1;
      }
    }

    const row = i + 3;
    const result = heap[4];
    let subHeapsResults = "";
    let subHeapNamesAndPercents = "";

    if (heap[2]) {
      subHeapsResults = heap[5]
        .split(" | ")
        .map((result) => result.split(" ")[1]);
      subHeapNamesAndPercents = heap[2]
        .split("|")
        .map((values) => values.trim().split(" "));
      for (let i = 0; i < subHeapsResults.length; i++) {
        const subHeapResult = subHeapsResults[i];
        subHeapNamesAndPercents[i].splice(1, 1, subHeapResult);
        subHeapNamesAndPercents[i] = subHeapNamesAndPercents[i].join(" ");
      }
      subHeapNamesAndPercents = subHeapNamesAndPercents.join(" | ");
    }

    settingsSheet
      .getRange(row, 2)
      .setFormula(
        `${functions.initHeap}("${heapName}"; ${result}; "${subHeapNamesAndPercents}"; "${color}")`
      );
  }
}

function clearEntryPoin(rowAmount) {
  const entryPointSheet = AS.getSheetByName(sheetNames.entryPoint);
  for (let row = 3; row < rowAmount; row++) {
    entryPointSheet
      .getRange(row, 2, 1, 6)
      .setValues([["", "", "", "", "", ""]]);
  }
}
