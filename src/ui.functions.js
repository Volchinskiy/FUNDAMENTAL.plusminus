/**
 * Function that runs when user open application.
 * It runs function that adds custom menu button.
 * And changes sheet name.
 */
function onOpen() {
  const { AS } = globalDefinitions;
  initUiMenu();
  AS.setName("FUNDAMENTAL.plus_minus_v5");
}

/**
 * Function that adds custom menu button.
 */
function initUiMenu() {
  const { UI } = globalDefinitions;
  UI.createMenu("F_plus_minus")
    .addSubMenu(
      UI.createMenu("Init Sheets")
        .addItem("Basis Sheets", functions.initBasisSheets)
        .addItem("Heap Sheets", functions.initHeapSheets)
    )
    .addItem("Save Data", functions.save)
    .addToUi();
}

/**
 * Function that we can use to add confirm and alert modal screens.
 */
function F_CONFIRM() {
  const { UI } = globalDefinitions;

  var result = UI.alert(
    "Please confirm",
    "Are you sure you want to continue?",
    UI.ButtonSet.YES_NO
  );

  if (result === UI.Button.YES) UI.alert("Confirmation received.");
  else UI.alert("Permission denied.");
}
