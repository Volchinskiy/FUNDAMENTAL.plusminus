/**
 * Returns ActiveSpreadsheet.
 */
function initAS(idOrUrl) {
  var AS = SpreadsheetApp.getActiveSpreadsheet()
  if (AS) return AS
  try { return SpreadsheetApp.openById(idOrUrl) }
  catch { return SpreadsheetApp.openByUrl(idOrUrl) }
}

/**
 * Returns string look like this => 01.01.1970
 */
function getReadableDate(date) {
  var maybeAddZero = (number) => number < 10 ? `0${number}` : `${number}`
  var day = maybeAddZero(date.getDate())
  var month = maybeAddZero(date.getMonth() + 1)
  var year = date.getFullYear()
  return `${day}.${month}.${year}`
}

/**
 * Returns matrix of init values.
 */
function getInitData () {
  var settingsSheet = getAS().getSheetByName(getSheetName("settings"))
  return settingsSheet
    .getRange(3, 2, settingsSheet.getLastRow() - getTopPadding(), 4)
    .getValues()
}

function onOpen() {
  initUiMenu()
  getAS().setName("FUNDAMENTAL.plus_minus_v6")
}

/**
 * Function that adds custom menu.
 */
function initUiMenu() {
  var UI = SpreadsheetApp.getUi()
  UI.createMenu("F_plus_minus")
    .addSubMenu(
      UI.createMenu("Init Sheets")
        .addItem("Basis Sheets", getFunction("initBasisSheets"))
        .addItem("Heap Sheets", getFunction("createHeapSheets"))
    )
    .addItem("Save Data", getFunction("saveData"))
    .addToUi()
}