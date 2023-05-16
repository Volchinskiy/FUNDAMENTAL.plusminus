/**
 * Class for generate sheet config object.
 * Using it you get objects of one shape.
 */
class SheetConfig {
  constructor ({
     general, widths, borders,
     backgrounds, values, fontWeights,
     formulas, horizontalAlignments, fontStyles,
     fontColors, dataValidations
    }) {
    this.widths = widths || null
    this.values = values || null
    this.borders = borders || null
    this.formulas = formulas || null
    this.fontStyles = fontStyles || null
    this.fontWeights = fontWeights || null
    this.backgrounds = backgrounds || null
    this.horizontalAlignments = horizontalAlignments || null
    this.fontColors = fontColors || null
    this.dataValidations = dataValidations || null
    this.general = general || { name: "EXAMPLE", rows: 10, columns: 10, deletable: true, ...GD.sheetsPatterns.general }
  }
}
