/**
 * Function that launch when we open google sheet.
 */
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