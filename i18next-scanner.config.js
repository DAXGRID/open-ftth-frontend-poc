module.exports = {
  options: {
    debug: true,
    sort: true,
    func: {
      list: ["t"],
      extensions: [".js", ".jsx"]
    },
    trans: false,
    lngs: ["en-uk", "da"],
    ns: ["translation"],
    defaultLng: "en-uk",
    defaultNs: "translation",
    defaultValue: (lng, ns, key) => "",

    // Location of translation files
    resource: {
      loadPath: "public/locales/{{lng}}/{{ns}}.json",
      savePath: "public/locales/{{lng}}/{{ns}}.json",
      jsonIndent: 2
    },
    nsSeparator: ":",
    keySeparator: "."
  }
};
