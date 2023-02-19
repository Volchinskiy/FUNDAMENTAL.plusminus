/**
 * Functions that return Global Definitions value.
 */
function getAS () { return globalDefinitions.AS }
function getSheet(key) { return globalDefinitions.sheets[key] }
function getTopPadding () { return globalDefinitions.contentPaddingTop }
function getStyleVar (key) { return globalDefinitions.styleVariables[key] }
function getFormula (formulaName) { return globalDefinitions.formulas[formulaName] }
function getSheetName (sheetName) { return globalDefinitions.sheetNames[sheetName] }
function getFunction (functionName) { return globalDefinitions.functions[functionName] }
function getSheetPattern (patternKey) { return globalDefinitions.sheetsPatterns[patternKey] }
