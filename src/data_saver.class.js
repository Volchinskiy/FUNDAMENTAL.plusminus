/**
 * Class that save your data,
 * all operations, sorted operations by heap, counts.
 * Reinit Init values in settings sheet.
 * And clear entry_point_sheet.
 */
class DataSaver {
  constructor() {
    this.dateRange = null
    this.initData = GD.initData
    this.operationsAmount = null
    this.save()
  }
  save () {
    this.defineDate()
    this.saveOperations()
    this.saveSortedOperations()
    this.saveCounts()
    this.setInitValues()
    this.clearEntryPointSheet()
  }
  defineDate() {
    var infoCell = GD.sheets.entryPointSheet.getRange(3, 4).getValue()
    var regexDate = new RegExp('\\d\\d.\\d\\d.\\d\\d\\d\\d') // date string look like 12.12.2032
    var firstDate = regexDate.exec(infoCell)
    var todayReadableDate = getReadableDate(new Date())
    var dateRange = `${firstDate ? firstDate[0] : "?"} - ${todayReadableDate}`
    this.dateRange = dateRange
  }
  saveOperations() {
    var entryPointSheet = GD.sheets.entryPointSheet
    var operations = entryPointSheet.getRange(3, 2, entryPointSheet.getLastRow() - GD.contentPaddingTop, 3).getValues()
    var saveOperationsSheet = GD.sheets.saveOperationsSheet
    var rowAfterLastRow = saveOperationsSheet .getLastRow() + 1
    saveOperationsSheet.insertRowsAfter(rowAfterLastRow, operations.length + 1)
    saveOperationsSheet.getRange(rowAfterLastRow, 4).setValue(this.dateRange)
    saveOperationsSheet.getRange(rowAfterLastRow + 1, 2, operations.length, 3).setValues(operations)
    this.operationsAmount = operations.length
  }
  saveSortedOperations() {
    for (var i = 0; i < this.initData.length; i++) {
      var [ name ] = this.initData[i]
      var heapName = GD.sheetNames.getHeapName(name)
      var heapSheet = GD.AS.getSheetByName(heapName)
      var getOperations = (column) => heapSheet.getRange(3, column, heapSheet.getLastRow() - GD.contentPaddingTop, 3).getValues().filter((row) => row[0])
      var plusOperations = getOperations(4)
      var minusOperations = getOperations(8)
      var operations = [...plusOperations, ...minusOperations]
      var saveSortedOperationsSheet = GD.sheets.saveSortedOperationsSheet
      var rowAfterLastRow = saveSortedOperationsSheet.getLastRow() + 1
      saveSortedOperationsSheet.insertRowsAfter(rowAfterLastRow, operations.length + 1)
      saveSortedOperationsSheet.getRange(rowAfterLastRow, 4, 1, 1).setValue(`${heapName} ${this.dateRange}`)
      saveSortedOperationsSheet.getRange(rowAfterLastRow + 1, 2, operations.length, 3).setValues(operations)
    }
  }
  saveCounts() {
    for (var i = 0; i < this.initData.length; i++) {
      var [ name ] = this.initData[i]
      var heapName = GD.sheetNames.getHeapName(name)
      var heapSheet = GD.AS.getSheetByName(heapName)
      var counts = heapSheet.getRange(2, 2, 7, 1).getValues()
      var tickers = F_COUNT_TICKERS(name)
      var result = [[`${heapName} ${this.dateRange}`], ...counts, ...tickers].filter((array) => array.at(-1))
      var saveCountsSheet = GD.sheets.saveCountsSheet
      var rowAfterLastRow = saveCountsSheet.getLastRow() + 1
      saveCountsSheet.insertRowsAfter(rowAfterLastRow, result.length)
      for (var row = rowAfterLastRow, j = 0; j < result.length; j++, row++)
        saveCountsSheet.getRange(row, 2).setValue(result[j])
    }
  }
  setInitValues() {
    for(var i = 0; i < this.initData.length; i++) {
      var result = String(this.initData[i].at(-2))
      if (!result) continue
      var row = i + 3
      GD.sheets.settingsSheet.getRange(row, 3).setValue(result)
    }
  }
  clearEntryPointSheet () {
    var entryPointSheet = GD.sheets.entryPointSheet
    for(var row = 3; row < this.operationsAmount + 3; row++)
      entryPointSheet.getRange(row, 2, 1, 3).setValues([["", "", ""]])
  }
}

/**
 * Function that we call to save data.
 */
function saveData () { new DataSaver() }
