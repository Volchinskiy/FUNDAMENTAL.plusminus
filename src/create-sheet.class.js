class CreateSheet {
  constructor() {
    this.AS = AS;
    this.sheet = null;
    this.config = null;
  }

  create(sheetConfig) {
    this.config = sheetConfig;
    this.createSheet();
    this.setWidths();
    this.setBorders();
    this.setBackgrounds();
    this.setValues();
    this.setFontWeights();
    this.setFormulas();
    return this.sheet;
  }

  createSheet() {
    const {
      name,
      rows,
      columns,
      deletable,
      fontFamily,
      verticalAlignment,
      horizontalAlignment,
    } = this.config.general;
    const possibleExistingSheet = this.AS.getSheetByName(name);
    if (possibleExistingSheet) {
      if (!deletable)
        throw new Error(`${name} SHEET IS EXIST AND NOT DELETABLE`);
      this.AS.deleteSheet(possibleExistingSheet);
      console.log("DELETE OLD PAGE");
    }

    const sheet = this.AS.insertSheet(name);
    this.sheet = sheet;

    // need add situation if we want to create more than 1000 rows or 26 cells
    const sheetRows = sheet.getMaxRows();
    const sheetCells = sheet.getMaxColumns();

    if (rows < sheetRows) sheet.deleteRows(1, sheetRows - rows);
    if (columns < sheetCells) sheet.deleteColumns(1, sheetCells - columns);

    const allCells = sheet.getRange(1, 1, rows, columns);
    allCells.setHorizontalAlignment(horizontalAlignment);
    allCells.setVerticalAlignment(verticalAlignment);
    allCells.setFontFamily(fontFamily);
  }

  setWidths() {
    if ("widths" in this.config) {
      const { widths } = this.config;
      for (const { column, value } of widths)
        this.sheet.setColumnWidth(column, value);
    }
  }

  setBorders() {
    if ("borders" in this.config) {
      const { borders } = this.config;
      for (const { range, values } of borders)
        this.sheet.getRange(...range).setBorder(...values);
    }
  }

  setBackgrounds() {
    if ("backgrounds" in this.config) {
      const { backgrounds } = this.config;
      for (const { range, value } of backgrounds)
        this.sheet.getRange(...range).setBackground(value);
    }
  }

  setValues() {
    if ("values" in this.config) {
      const { values } = this.config;
      for (const { range, value } of values)
        this.sheet.getRange(...range).setValue(value);
    }
  }

  setFontWeights() {
    if ("fontWeights" in this.config) {
      const { fontWeights } = this.config;
      for (const { range } of fontWeights)
        this.sheet.getRange(...range).setFontWeight("bold");
    }
  }

  setFormulas() {
    if ("formulas" in this.config) {
      const { formulas } = this.config;
      for (const { range, formula } of formulas)
        this.sheet.getRange(...range).setFormula(formula);
    }
  }
}
