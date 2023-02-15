/**
 * Function that initializes the basis sheets.
 */
function initBasisSheets() {
  var sheetCreator = new SheetCreator()
  sheetCreator.create(settingsSheetConfig)
  sheetCreator.create(saveCountsSheetConfig)
  sheetCreator.create(entryPointSheetConfig)
  sheetCreator.create(saveOperationsSheetConfig)
  sheetCreator.create(saveSortedOperationsSheetConfig)
}

/**
 * Function that create Heap Sheets.
 */
function createHeapSheets () {
  var initData = getInitData()
  for (var i = 0; i < initData.length; i++) {
    var [name, _, __, mixins] = initData[i]
    if (!name) continue
    var plusFilterFormula = getPlusFilterFormula(name, initData)
    var minusFilterFormula = getMinusFilterFormula(name, mixins)
    var settingsSheetRow = i + 3
    var sheetCreator = new SheetCreator()
    var sheetConfig = heapSheetConfig(name, settingsSheetRow, plusFilterFormula, minusFilterFormula)
    sheetCreator.create(sheetConfig)
    var heapName = getSheetName("getHeapName")(name)
    getSheet("settingsSheet")
      .getRange(settingsSheetRow, 4)
      .setFormula(`=TRIM(RIGHT(SUBSTITUTE(${heapName}!B6," ",REPT(" ", LEN(${heapName}!B6))), LEN(${heapName}!B6)))`)
  }
}

/**
 * Function that returns plus filter formula that can includes mixfrom operations.
 */
function getPlusFilterFormula (name, initData) {
  var plusFilter = getFormula("defaultFilterFormula")(name, "p")
  var plusFilterPlug = getFormula("noDataPlug")(plusFilter)
  var mixinsFrom = initData.reduce((acc, row) => {
    var [rowName, _, __, mixins] = row
    if (!mixins.includes(name)) return acc
    var percent = mixins.split(",").filter((mixin) => mixin.includes(name)).map((mixin) => mixin.trim().split(" ")[1])
    return [...acc, [rowName, percent]]
  }, [])
  if(mixinsFrom.length) return `={${plusFilterPlug}; ${mixFromMapper(mixinsFrom)}}`
  return `=${plusFilterPlug}`
}

/**
 * Function that adds mixfrom operation to plus Filter.
 */
function mixFromMapper (mixinsFrom) {
  return mixinsFrom.map(([name, percent]) => getFormula("mixFrom")(name, percent)).join(";")
}

/**
 * Function that returns minus filter formula that can includes mixto operations.
 */
function getMinusFilterFormula (name, heapMixins) {
  var minusFilter = getFormula("defaultFilterFormula")(name, "m")
  var minusFilterPlug = getFormula("noDataPlug")(minusFilter)
  if(!heapMixins) return `=${minusFilterPlug}`
  var mixinsTo = heapMixins.split(',').map((string) => string.trim().split(" "))
  return `={${minusFilterPlug}; ${mixToMapper(mixinsTo)}}`
}

/**
 * Function that adds mixto operation to minus Filter.
 */
function mixToMapper (mixinsTo) {
  return mixinsTo.map(([ name, percent ]) => getFormula("mixTo")(name, percent)).join(";")
}
