function onOpen() {
  const { AS } = globalDefinitions;
  F_INIT_UI();
  AS.setName("FUNDAMENTAL.plus_minus_v5");
}

function F_INIT_UI() {
  const ui = SpreadsheetApp.getUi();
  ui.createMenu("F_SCRIPTS")
    .addSubMenu(
      ui
        .createMenu("Init Sheets")
        .addItem("Basis Sheets", functions.initBasisSheets)
        .addItem("Heap Sheets", functions.initHeapSheets)
    )
    .addItem("Save Data", functions.save)
    .addToUi();
}

function F_CONFIRM() {
  var ui = SpreadsheetApp.getUi();

  var result = ui.alert(
    "Please confirm",
    "Are you sure you want to continue?",
    ui.ButtonSet.YES_NO
  );

  if (result == ui.Button.YES) {
    ui.alert("Confirmation received.");
  } else {
    ui.alert("Permission denied.");
  }
}
