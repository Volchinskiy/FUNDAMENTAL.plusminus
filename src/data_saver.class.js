/**
 * Class that save your data,
 * all operations, sorted operations by heap, counts.
 * Reinit Init values in settings sheet.
 * And clear entry_point_sheet.
 */
class DataSaver {
  constructor() {
    this.dateRange = null
    this.initData = getInitData()
    this.operationsAmount = null
    this.save()
  }
  save () {
    this.defineDateRange()
    this.saveOperations()
    this.saveSortedOperations()
    this.saveCounts()
    this.setInitValues()
    this.clearEntryPointSheet()
  }
  defineDateRange() {
    var firstDate = getSheet("entryPointSheet").getRange(3, 2).getValue()
    var readableDate = firstDate instanceof Date ? getReadableDate(firstDate) : firstDate
    var todayReadableDate = getReadableDate(new Date())
    var dateRange = `${readableDate} - ${todayReadableDate}`
    this.dateRange = dateRange
  }
  saveOperations() {
    var entryPointSheet = getSheet("entryPointSheet")
    var operations = entryPointSheet.getRange(3, 2, entryPointSheet.getLastRow() - getTopPadding(), 4).getValues()
    var saveOperationsSheet = getSheet("saveOperationsSheet")
    var rowAfterLastRow = saveOperationsSheet .getLastRow() + 1
    saveOperationsSheet.insertRowsAfter(rowAfterLastRow, operations.length + 1)
    saveOperationsSheet.getRange(rowAfterLastRow, 5).setValue(this.dateRange)
    saveOperationsSheet.getRange(rowAfterLastRow + 1, 2, operations.length, 4).setValues(operations)
    this.operationsAmount = operations.length
  }
  saveSortedOperations() {
    for (var i = 0; i < this.initData.length; i++) {
      var [ name ] = this.initData[i]
      var heapName = getSheetName("getHeapName")(name)
      var heapSheet = getAS().getSheetByName(heapName)
      var getOperations = (column) => heapSheet.getRange(3, column, heapSheet.getLastRow() - getTopPadding(), 4).getValues().filter((row) => row[0])
      var plusOperations = getOperations(4)
      var minusOperations = getOperations(9)
      var operations = [...plusOperations, ...minusOperations]
      var saveSortedOperationsSheet = getSheet("saveSortedOperationsSheet")
      var rowAfterLastRow = saveSortedOperationsSheet.getLastRow() + 1
      saveSortedOperationsSheet.insertRowsAfter(rowAfterLastRow, operations.length + 1)
      saveSortedOperationsSheet.getRange(rowAfterLastRow, 4, 1, 2).setValues([[heapName, this.dateRange]])
      saveSortedOperationsSheet.getRange(rowAfterLastRow + 1, 2, operations.length, 4).setValues(operations)
    }
  }
  saveCounts() {
    for (var i = 0; i < this.initData.length; i++) {
      var [ name ] = this.initData[i]
      var heapName = getSheetName("getHeapName")(name)
      var heapSheet = getAS().getSheetByName(heapName)
      var counts = heapSheet.getRange(2, 2, 7, 1).getValues()
      var tickers = F_GET_TICKERS(name)
      var result = [[`${heapName} ${this.dateRange}`], ...counts, ...tickers].filter((array) => array[0])
      var saveCountsSheet = getSheet("saveCountsSheet")
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
      getSheet("settingsSheet").getRange(row, 3).setValue(result)
    }
  }
  clearEntryPointSheet () {
    var entryPointSheet = getSheet("entryPointSheet")
    for(var row = 3; row < this.operationsAmount + 3; row++){
      entryPointSheet.getRange(row, 2, 1, 4).setValues([["", "", "", ""]]);
    }
  }
}
