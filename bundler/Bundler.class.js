{
  class Bundler {
    constructor() {
      this.createProjectBundle()
    }

    FS = require("fs")
    FOLDER = "src"
    FILE_NAMES_SEQUENCE = [
      "global_definitions",
      "selectors",
      "sheet_config.class",
      "sheet_creator.class",
      "sheets_configs.config",
      "init_sheets.functions",
      "custom_user.functions",
      "data_saver.class",
      "save_data.functions",
      "utilities",
      "ui.functions"
    ]
    BUNDLE_NAME = "application.js"

    bundle = []

    createProjectBundle() {
      for (const fileName of this.FILE_NAMES_SEQUENCE) {
        this.bundle.push(`// ${fileName}.js`)
        const fileContent = this.getFileContent(fileName)
        const stringsOfContent = fileContent.split("\n")
        for (const string of stringsOfContent)
          if (string) this.bundle.push(string)
        this.bundle.push("")
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
