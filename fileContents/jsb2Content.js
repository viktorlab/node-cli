const fs = require('fs');

module.exports = (appName, moduleName) => {
  const jsb2Content = `
  {
    "projectName": "Live 2.0 - ${appName}",
    "deployDir": "${appName}",
    "licenseText": "",
    "resources": [
    ],
    "pkgs": [
      {
        "name": "${appName} FAT Client",
        "file": "js/${appName}-FAT.js",
        "isDebug": true,
        "fileIncludes": [
          {
            "text": "Model.js",
            "path": "js/"
          },
          {
            "text": "${moduleName}EditDialog.js",
            "path": "js/"
          },
          {
            "text": "${moduleName}GridPanel.js",
            "path": "js/"
          },
          {
            "text": "${appName}.js",
            "path": "js/"
          }
        ]
      },
      {
        "name": "${appName} FAT Client",
        "file": "css/${appName}-FAT.css",
        "isDebug": true,
        "fileIncludes": [
          {
            "text": "${appName}.css",
            "path": "css/"
          }
        ]
      }
    ]
  }
  `;

  fs.writeFile(`${appName}/${appName}.jsb2`, jsb2Content, err => {
    if (err) {
      console.log(err);
    }
    console.log(`${appName} jsb2 file created`);
  });
};
