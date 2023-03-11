/**
 * One Object that knows about all definitions in the application.
 * Style variables, user functions names, sheet style patterns and other.
 * It needs because I think that if i have these definitions in different files or objects,
 * I'll get many problems with application development.
 */
class GD {
  static get style () {
    return {
      greenDark: "#9ad081",
      redLight: "#ffbfbf",
      redDark: "#d98b8b",
      grayLight: "#efefef",
      grayDark: "#b7b7b7",

      widthLittlest: 21,
      widthLittle: 40,
      widthLittlePlus: 75,
      widthMedium: 110,
      widthMediumPlus: 145,
      widthLarge: 250,
      widthDate: 85,

      white: "#ffffff",
      gray1: "#e5e5e5",
      gray2: "#cdcdcd",
      gray3: "#b3b3b3",
      gray4: "#9b9b9b",
      gray5: "#818181",
      gray6: "#696969",
      gray7: "#4f4f4f",
      gray8: "#373737",
      gray9: "#1d1d1d",
      gray10: "#050505",

      greenLight: "#bfffa2",
      greenMedium: "#a6daa6",
      greenDark2: "#567856",

      redLight2: "#e54f4f",
      redMedium2: "#c12f2f",
      redDark2: "#a45252",

      borderSolid: SpreadsheetApp.BorderStyle.SOLID,
      borderSolidThicK: SpreadsheetApp.BorderStyle.SOLID_THICK,
    }
  }
  static get formulas () {
    return {
      filterPlug: '{ 0, "plug", "00.00.0000 no data, it\'s a plug" }',
      tickerPlug: '"No tickers."',
      ifErrorPlug: (formula, plug = GD.formulas.filterPlug) => `IFERROR(${formula}, ${plug})`,
      defaultFilterFormula: (name, type) => `FILTER(entry_point!B3:D202, MAP(entry_point!C3:C202, LAMBDA(cell, AND(REGEXMATCH(cell, "\\b${name}\\b"), REGEXMATCH(cell, "\\b${type}\\b")))))`,
      mixTo: (name, percent) => `ROUND(REDUCE(0, FILTER(D3:D202, MAP(E3:E202, LAMBDA(cell, NOT(REGEXMATCH(cell, "\\bno\\b"))))), LAMBDA(sum, value, sum+value)) / 100 * ${percent}), "mixto", "00.00.0000 ${name}"`,
      mixFrom: (name, percent) => {
        var heapName = GD.sheetNames.getHeapName(name)
        return `ROUND(REDUCE(0, FILTER(${heapName}!D3:D202, MAP(${heapName}!E3:E202, LAMBDA(cell, NOT(REGEXMATCH(cell, "\\bno\\b"))))), LAMBDA(sum, value, sum+value)) / 100 * ${percent}), "mixfrom", "00.00.0000 ${name}"`
      },
      heapPlusSum: "SUM(D3:D202)",
      heapMinusSum: "SUM(H3:H202)",
      heapTickersRange: "E3:E202, I3:I202",
    }
  }
  static get functions () {
    return {
      saveData: "saveData",
      initBasisSheets: "initBasisSheets",
      createHeapSheets: "createHeapSheets",
      countTickers :"F_COUNT_TICKERS"
    }
  }
  static get sheetNames () {
    return {
      settings: "settings",
      entryPoint: "entry_point",
      saveCounts: "save_counts",
      saveOperations: "save_operations",
      getHeapName: (name) => `${name}_heap`,
      saveSortedOperations: "save_sorted_operations"
    }
  }
  static get sheetsPatterns () {
    return {
      general: {
        fontFamily: "Comfortaa",
        verticalAlignment: "middle",
        horizontalAlignment: "center",
        tabColor: null
      },
      tableBorderWithHeader: (...range) => [
        { range, values: [true, true, true, true, true, null] },
        {
          range: [range[0], range[1], 1, range[3]],
          values: [null, null, true, null, null, null],
        },
      ],
      heapSheetFirstRowsWidths: [
        { column: 1, value: GD.style.widthLittlest },
        { column: 2, value: GD.style.widthLarge },
        { column: 3, value: GD.style.widthLittlest }
      ],
      operationsWidths: (row) => [
        { column: row, value: GD.style.widthMedium },
        { column: row + 1, value: GD.style.widthMediumPlus },
        { column: row + 2, value: GD.style.widthLarge + GD.style.widthDate }
      ],
      classicalTableWithHeader: (row, column, rows, columns, mixins = null, headerColor = GD.style.gray3, bodyColor = GD.style.gray1) => {
        var result = {
          borders: [
            { range: [row, column, rows, columns], values: [true, true, true, true, null, null, headerColor, GD.style.borderSolidThicK] },
            { range: [row, column, 1, columns], values: [null, null, true, null, null, null, headerColor, GD.style.borderSolidThicK] },
            { range: [row + 1, column, rows - 1, columns], values: [null, null, null, null, null, true, GD.style.white, GD.style.borderSolid] },
            { range: [row + 1, column, rows - 1, columns], values: [null, null, null, null, true, null, bodyColor, GD.style.borderSolid] },
            { range: [row, column, 1, columns], values: [null, null, null, null, true, null, headerColor, GD.style.borderSolid] },
          ],
          backgrounds: [
            { range: [row, column, 1, columns], value: headerColor },
            { range: [row + 1, column, rows - 1, columns], value: bodyColor },
          ],
          fontWeights: [{ range: [row, column, 1, columns] }],
          horizontalAlignments: [{ range: [row, column, rows, columns], value: "left" }],
          fontStyles: [{ range: [row + 1, column, rows - 1, columns] }],
          fontColors: [
            { range: [row, column, 1, columns], value: GD.style.gray7 },
            { range: [row + 1, column, rows - 1, columns], value: GD.style.gray8 }
          ]
        }
        if(mixins?.borders) result.borders = [...result.borders, ...mixins.borders]
        if(mixins?.backgrounds) result.backgrounds = [...result.backgrounds, ...mixins.backgrounds]
        if(mixins?.fontWeights) result.fontWeights = [...result.fontWeights, ...mixins.fontWeights]
        if(mixins?.horizontalAlignments) result.horizontalAlignments = [...result.horizontalAlignments, ...mixins.horizontalAlignments]
        if(mixins?.fontStyles) result.fontStyles = [...result.fontStyles, ...mixins.fontStyles]
        if(mixins?.fontColors) result.fontColors = [...result.fontColors, ...mixins.fontColors]
        return result
      },
      whiteStroke: (row, column, rows, columns) => [
        { range: [row, column, 1, columns], values: [null, null, null, null, true, null, GD.style.white, GD.style.borderSolid] },
        { range: [row, column, rows, 1], values: [null, null, null, null, null, true, GD.style.white, GD.style.borderSolid] },
        { range: [rows, column, 1, columns], values: [null, null, null, null, true, null, GD.style.white, GD.style.borderSolid] },
        { range: [row, columns, rows, 1], values: [null, null, null, null, null, true, GD.style.white, GD.style.borderSolid] },
      ],
      operationsValues: (column, firstColumnName) => [
        { range: [2, column], value: firstColumnName },
        { range: [2, column + 1], value: "Tickers" },
        { range: [2, column + 2], value: "Information" }
      ]
    }
  }
  static get AS () { return SpreadsheetApp.getActiveSpreadsheet() }
  static get sheets () {
    return {
      settingsSheet: GD.AS.getSheetByName(GD.sheetNames.settings),
      entryPointSheet: GD.AS.getSheetByName(GD.sheetNames.entryPoint),
      saveCountsSheet: GD.AS.getSheetByName(GD.sheetNames.saveCounts),
      saveOperationsSheet: GD.AS.getSheetByName(GD.sheetNames.saveOperations),
      saveSortedOperationsSheet: GD.AS.getSheetByName(GD.sheetNames.saveSortedOperations),
    }
  }
  static get contentPaddingTop () { return 2 }
  static get initData () {
    var settingsSheet = GD.sheets.settingsSheet
    return settingsSheet
      .getRange(3, 2, settingsSheet.getLastRow() - GD.contentPaddingTop, 4)
      .getValues()
  }
}
