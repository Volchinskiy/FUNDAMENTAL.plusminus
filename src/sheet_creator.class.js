/**
 * Class for generate sheet.
 * It works with an instance of {SheetConfig} and creates a sheet adds everything you need.
 * Borders, values, backgrounds, Formulas and other.
 */
class SheetCreator {
  constructor() {
    this.AS = getAS()
    this.sheet = null
    this.config = null
  }

  create(sheetConfig) {
    this.config = sheetConfig
    this.createSheet()
    this.setWidths()
    this.setBorders()
    this.setBackgrounds()
    this.setValues()
    this.setFontWeights()
    this.setFormulas()
    this.setHorizontalAlignments()
    this.setFontStyles()
    return this.sheet
  }

  createSheet() {
    var {
      name, rows, columns,
      deletable, tabColor, fontFamily,
      verticalAlignment, horizontalAlignment
    } = this.config.general

    var possibleExistingSheet = this.AS.getSheetByName(name)
    if (possibleExistingSheet) {
      if (!deletable) throw new Error(`NAME: ${name}.\nSHEET EXISTS AND IT'S NOT DELETABLE.`)
      this.AS.deleteSheet(possibleExistingSheet)
      console.log("DELETE PREVIOUS SHEET")
    }

    var sheet = this.AS.insertSheet(name)
    this.sheet = sheet
    sheet.setTabColor(tabColor)

    // need add situation if we want to create more than 1000 rows or 26 cells
    var defaultRows = sheet.getMaxRows()
    var defaultCells = sheet.getMaxColumns()

    if (rows < defaultRows) sheet.deleteRows(1, defaultRows - rows)
    if (columns < defaultCells) sheet.deleteColumns(1, defaultCells - columns)

    var allCells = sheet.getRange(1, 1, rows, columns)
    allCells.setHorizontalAlignment(horizontalAlignment)
    allCells.setVerticalAlignment(verticalAlignment)
    allCells.setFontFamily(fontFamily)
  }
  setWidths() {
    var { widths } = this.config
    if (widths)
      for (var { column, value } of widths)
        this.sheet.setColumnWidth(column, value)
  }
  setBorders() {
    var { borders } = this.config
    if (borders)
      for (var { range, values } of borders)
        this.sheet.getRange(...range).setBorder(...values)
  }
  setBackgrounds() {
    var { backgrounds } = this.config
    if (backgrounds)
      for (var { range, value } of backgrounds)
        this.sheet.getRange(...range).setBackground(value)
  }
  setValues() {
    var { values } = this.config
    if (values)
      for (var { range, value } of values)
        this.sheet.getRange(...range).setValue(value)
  }
  setFontWeights() {
    var { fontWeights } = this.config
    if (fontWeights)
      for (var { range } of fontWeights)
        this.sheet.getRange(...range).setFontWeight("bold")
  }
  setFormulas() {
    var { formulas } = this.config
    if (formulas)
      for (var { range, formula } of formulas)
        this.sheet.getRange(...range).setFormula(formula)
  }
  setHorizontalAlignments() {
    var { horizontalAlignments } = this.config
    if (horizontalAlignments)
      for(var { range, value } of horizontalAlignments)
        this.sheet.getRange(...range).setHorizontalAlignment(value)
  }
  setFontStyles() {
    var { fontStyles } = this.config
    if (fontStyles)
      for (var { range } of fontStyles)
        this.sheet.getRange(...range).setFontStyle("italic")
  }
}
