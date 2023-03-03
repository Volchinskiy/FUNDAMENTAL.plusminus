/**
 * Function that adds custom menu.
 */
function initUiMenu() {
  var UI = SpreadsheetApp.getUi()
  UI.createMenu("F_plus_minus")
    .addSubMenu(
      UI.createMenu("Init Sheets")
        .addItem("Basis Sheets", GD.functions.initBasisSheets)
        .addItem("Heap Sheets", GD.functions.createHeapSheets)
    )
    .addItem("Save Data", GD.functions.saveData)
    .addToUi()
}
