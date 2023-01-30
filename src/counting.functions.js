const add = (acc, row) => (row[0] ? acc + row[0] : acc);

function F_MAIN_COUNTING_FUNCTION(name, _plusRange, _minusRange, _settings) {
  // NEED TO DELETE
  const settingsSheet = AS.getSheetByName(sheetNames.settings);
  const initData = settingsSheet
    .getRange(3, 2, settingsSheet.getLastRow() - 2, 3)
    .getValues();
  const [_, init, subHeaps] = initData.filter((data) => data[0] === name).at(0);
  const sheet = AS.getSheetByName(sheetNames.heapName(name));
  const plusData = sheet.getRange(3, 7, sheet.getMaxRows() - 3, 2).getValues();
  const minusData = sheet
    .getRange(3, 12, sheet.getMaxRows() - 3, 2)
    .getValues();

  const result = subHeaps
    ? getResultWithHeaps(init, subHeaps, plusData, minusData)
    : getResultWithoutHeaps(init, plusData, minusData);

  const getTikerResult = (func, range) => {
    if (range === "minus") return minusData.reduce(func, 0);
    return plusData.reduce(func, 0);
  };

  for (let i = 0; i < tikers.length - 1; i++) {
    const threeTikers = tikers[i];
    const tikerNames = threeTikers.map((tiker) => tiker.name).join(" | ");
    const tikerValues = threeTikers
      .map(({ func, range }) => getTikerResult(func, range))
      .join(" | ");
    result.push([tikerNames]);
    result.push([tikerValues]);
    result.push([]);
  }

  return result;
}

function getResultWithoutHeaps(init, plusData, minusData) {
  const generalPlus = plusData.reduce(add, 0);
  const generaMinus = minusData.reduce(add, 0);
  const difference = generalPlus - generaMinus;
  const calculatedResult = init + difference;
  return [
    ["Init | Diff | Result"],
    [
      `${init} | ${
        difference > 0 ? `+${difference}` : difference
      } | ${calculatedResult}`,
    ],
    [],
    ["Plus | Minus"],
    [`${generalPlus} | ${generaMinus}`],
    [],
  ];
}

function getResultWithHeaps(init, subHeaps, plusData, minusData) {
  const generalPlus = plusData.reduce(add, 0);
  const generaMinus = minusData.reduce(add, 0);
  const plusWithoutNo = plusData
    .filter((row) => row[1] !== "no")
    .reduce(add, 0);
  const [persents, subHeapValues] = calculateSubHeapValues(
    plusWithoutNo,
    subHeaps
  );
  const difference = generalPlus - generaMinus - persents;
  const calculatedResult = init + difference;
  return [
    ["Init | Diff | Result"],
    [
      `${init} | ${
        difference > 0 ? `+${difference}` : difference
      } | ${calculatedResult}`,
    ],
    [],
    ["Plus | Minus | Persents"],
    [`${generalPlus} | ${generaMinus} | ${persents}`],
    [],
    ...subHeapValues,
  ];
}

function calculateSubHeapValues(generalPlus, subHeaps) {
  subHeaps = subHeaps
    .trim()
    .split("|")
    .map((heap) => heap.trim().split(" "));
  const subHeapValues = [];
  let calculatePersents = 0;
  for (const [name, init, percent] of subHeaps) {
    subHeapValues.push([`${name} | Init | Persent | Result`]);
    const persentValue = Math.round((generalPlus / 100) * Number(percent));
    subHeapValues.push([
      `${init} | ${percent}% (${persentValue}) | ${
        Number(init) + persentValue
      }`,
    ]);
    subHeapValues.push([]);
    calculatePersents += persentValue;
  }
  return [calculatePersents, subHeapValues];
}
