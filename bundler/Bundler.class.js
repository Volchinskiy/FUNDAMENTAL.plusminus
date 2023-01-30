{
  class Bundler {
    constructor() {
      this.createProjectBundle();
    }

    FS = require("fs");
    FOLDER = "src";
    FILE_NAMES_SEQUENCE = [
      "global_definitions",
      "utilities",
      "ui.functions",
      "init_sheet.functions",
      "save_data.functions",
      "create_sheet.class",
      "counting.functions",
      "entry_point_sheet.config",
      "settings_sheet.config",
      "heap_sheet.config",
      "save_counts_sheet.config",
      "save_operations_sheet.config",
    ];
    BUNDLE_NAME = "application.js";

    bundle = [];

    createProjectBundle() {
      for (const fileName of this.FILE_NAMES_SEQUENCE) {
        this.bundle.push(`// ${fileName}.js`);
        const fileContent = this.getFileContent(fileName);
        const stringsOfContent = fileContent.split("\n");
        for (const string of stringsOfContent) {
          if (string) this.bundle.push(string);
        }
        this.bundle.push("");
      }
      this.saveBundle();
    }

    getFileContent(fileName) {
      return this.FS.readFileSync(`./${this.FOLDER}/${fileName}.js`, "utf-8");
    }

    saveBundle() {
      const bundle = this.bundle.join("\n");
      this.FS.writeFileSync(`${this.BUNDLE_NAME}`, bundle);
    }
  }

  new Bundler();
}
