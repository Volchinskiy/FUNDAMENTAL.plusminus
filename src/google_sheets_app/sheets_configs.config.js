/**
 * All Sheets Configs.
 */
var entryPointSheetConfig = new SheetConfig ({
  general: {
    name: GD.sheetNames.entryPoint,
    rows: 203,
    columns: 5,
    deletable: false,
    ...GD.sheetsPatterns.general,
  },
  widths: [
    { column: 1, value: GD.style.widthLittlest },
    ...GD.sheetsPatterns.operationsWidths(2),
    { column: 5, value: GD.style.widthLittlest }
  ],
  values: [...GD.sheetsPatterns.operationsValues(2, "Value")],
  ...GD.sheetsPatterns.classicalTableWithHeader(2, 2, 201, 3, { borders: GD.sheetsPatterns.whiteStroke(1, 1, 203, 5) }),
  dataValidations: [
    {
      range: [3, 4, 200, 1],
      rule: SpreadsheetApp.newDataValidation()
        .requireFormulaSatisfied('=REGEXMATCH(D3, "\\d\\d.\\d\\d.\\d\\d\\d\\d")')
        .setHelpText('In this column you need to write Date look like 00.00.000')
        .build()
    }
  ]
})
var settingsSheetConfig = new SheetConfig({
  general: {
    name: GD.sheetNames.settings,
    rows: 10,
    columns: 6,
    deletable: false,
    ...GD.sheetsPatterns.general,
  },
  widths: [
    { column: 1, value: GD.style.widthLittlest },
    { column: 5, value: GD.style.widthLarge },
    { column: 6, value: GD.style.widthLittlest },
  ],
  ...GD.sheetsPatterns.classicalTableWithHeader(2, 2, 8, 4, {
      borders: [
        ...GD.sheetsPatterns.whiteStroke(1, 1, 10, 6),
        { range: [3, 2, 7, 2], values: [null, null, null, null, true, null, GD.style.greenLight, GD.style.borderSolid] }
      ],
      backgrounds: [{ range: [3, 2, 7, 2], value: GD.style.greenLight }]
    }),
  values: [
    { range: [2, 2], value: "Name" },
    { range: [2, 3], value: "Init" },
    { range: [2, 4], value: "Result" },
    { range: [2, 5], value: "Mixins" },
    { range: [3, 2], value: "EXAMPLE" },
    { range: [3, 3], value: "0" },
  ],
  dataValidations: [
    {
      range: [3, 2, 7, 1],
      rule: SpreadsheetApp.newDataValidation()
        .requireFormulaSatisfied('=COUNTIF(B$3:B$9,B3)=1')
        .setAllowInvalid(false)
        .setHelpText('In this column you need to write only unique values.')
        .build()
    }
  ]
})

var saveCountsSheetConfig = new SheetConfig({
  general: {
    name: GD.sheetNames.saveCounts,
    rows: 6,
    columns: 3,
    deletable: false,
    ...GD.sheetsPatterns.general,
  },
  widths: [
    { column: 1, value: GD.style.widthLittlest },
    { column: 2, value: GD.style.widthLarge + GD.style.widthDate},
    { column: 3, value: GD.style.widthLittlest },
  ],
  ...GD.sheetsPatterns.classicalTableWithHeader(2, 2, 4, 1, { borders: GD.sheetsPatterns.whiteStroke(1, 1, 6, 3) }),
  values: [{ range: [2, 2], value: "Counts" }]
})

var saveOperationsSheetConfig = new SheetConfig({
  general: {
    name: GD.sheetNames.saveOperations,
    rows: 6,
    columns: entryPointSheetConfig.general.columns,
    deletable: false,
    ...GD.sheetsPatterns.general,
  },
  widths: [...entryPointSheetConfig.widths],
  values: [...entryPointSheetConfig.values],
  ...GD.sheetsPatterns.classicalTableWithHeader(2, 2, 4, 3, { borders: GD.sheetsPatterns.whiteStroke(1, 1, 6, 5) }),
})

var saveSortedOperationsSheetConfig = new SheetConfig({
  general: {
    name: GD.sheetNames.saveSortedOperations,
    rows: 6,
    columns: saveOperationsSheetConfig.general.columns,
    deletable: false,
    ...GD.sheetsPatterns.general,
  },
  widths: [...saveOperationsSheetConfig.widths],
  values: [...saveOperationsSheetConfig.values],
  borders: [...saveOperationsSheetConfig.borders],
  fontStyles: [...saveOperationsSheetConfig.fontStyles],
  fontColors: [...saveOperationsSheetConfig.fontColors],
  backgrounds: [...saveOperationsSheetConfig.backgrounds],
  fontWeights: [...saveOperationsSheetConfig.fontWeights],
  horizontalAlignments: [...saveOperationsSheetConfig.horizontalAlignments],
})

var heapSheetConfig = (heapName, settingsSheetRow, plusFilterFormula, minusFilterFormula) => new SheetConfig({
  general: {
    name: GD.sheetNames.getHeapName(heapName),
    rows: 203,
    columns: 11,
    deletable: true,
    ...GD.sheetsPatterns.general,
    tabColor: GD.style.gray5
  },
  widths: [
    ...GD.sheetsPatterns.heapSheetFirstRowsWidths,
    ...GD.sheetsPatterns.operationsWidths(4),
    { column: 7, value: GD.style.widthLittlest },
    ...GD.sheetsPatterns.operationsWidths(8),
    { column: 11, value: GD.style.widthLittlest }
  ],
  values: [
    ...GD.sheetsPatterns.operationsValues(4, "Plus"),
    ...GD.sheetsPatterns.operationsValues(8, "Minus"),
    { range: [8, 2], value: "Tickers" },
  ],
  formulas: [
    { range: [2, 2], formula: `=CONCATENATE("Init: ", ${GD.sheetNames.settings}!C${settingsSheetRow})`, },
    { range: [3, 2], formula: `=CONCATENATE("Plus: ", ${GD.formulas.heapPlusSum})`, },
    { range: [4, 2], formula: `=CONCATENATE("Minus: ", ${GD.formulas.heapMinusSum})`, },
    { range: [5, 2], formula: `=CONCATENATE("Diff: ", ${GD.formulas.heapPlusSum} - ${GD.formulas.heapMinusSum})`, },
    { range: [6, 2], formula: `=CONCATENATE("Result: ", ${GD.sheetNames.settings}!C${settingsSheetRow} + ${GD.formulas.heapPlusSum} - ${GD.formulas.heapMinusSum})`, },
    { range: [9, 2], formula:  GD.formulas.ifErrorPlug(`${GD.functions.countTickers}("${heapName}", ${GD.formulas.heapTickersRange})`, GD.formulas.tickerPlug) },
    { range: [3, 4], formula: plusFilterFormula, },
    { range: [3, 8], formula: minusFilterFormula, },
  ],
  ...GD.sheetsPatterns.classicalTableWithHeader(2, 4, 201, 3,
    GD.sheetsPatterns.classicalTableWithHeader(2, 8, 201, 3,
      {
        borders: [
          ...GD.sheetsPatterns.whiteStroke(1, 1, 203, 11),
          ...GD.sheetsPatterns.whiteStroke(1, 3, 203, 7),
          { range: [2, 2, 202, 1], values: [true, true, true, true, null, true, GD.style.white, GD.style.borderSolid] },
          { range: [2, 2, 5, 1], values: [true, true, true, true, null, null, GD.style.gray3, GD.style.borderSolidThicK] },
          { range: [8, 2], values: [true, true, true, true, null, null, GD.style.gray3, GD.style.borderSolidThicK] },
        ],
        backgrounds: [
          { range: [2, 2, 5, 1], value: GD.style.gray1 },
          { range: [8, 2], value: GD.style.gray1 },
        ],
        horizontalAlignments: [{ range: [2, 2, 201, 1], value: "left" }],
        fontWeights: [
          { range: [2, 2, 5, 1] },
          { range: [8, 2] },
        ],
        fontStyles: [{ range: [9, 2, 194, 1] }],
        fontColors: [
          { range: [2, 2, 5, 1], value: GD.style.gray8 },
          { range: [8, 2], value: GD.style.gray8 },
          { range: [9, 2, 194, 1], value: GD.style.gray7 },
        ]
      },
      GD.style.redDark,
      GD.style.redLight
    ),
    GD.style.greenDark,
    GD.style.greenLight
  )
})
