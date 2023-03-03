{
  class Bundler {
    constructor() {this.createProjectBundle()}

    FS = require("fs")
    FOLDER = "src"
    FILE_NAMES_SEQUENCE = [
      "global_definitions",
      "sheet_config.class",
      "sheet_creator.class",
      "sheets_configs.config",
      "init_sheets.functions",
      "custom_user.functions",
      "data_saver.class",
      "utilities",
      "event_functions",
      "ui.functions"
    ]
    BUNDLE_NAME = "application.js"

    bundle = []

    createProjectBundle() {
      for (const fileName of this.FILE_NAMES_SEQUENCE) {
        this.bundle.push(`// ${fileName}.js`)
        const content = this.getFileContent(fileName)
        const strings = content.split("\n")
        this.bundle = [...this.bundle, ...strings, ""]
      }
      this.saveBundle()
    }

    getFileContent(fileName) {
      return this.FS.readFileSync(`./${this.FOLDER}/${fileName}.js`, "utf-8")
    }

    saveBundle() {
      const bundle = this.bundle.join("\n")
      this.FS.writeFileSync(`${this.BUNDLE_NAME}`, bundle)
    }
  }

  new Bundler()
}
