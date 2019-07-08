const fs = require('fs');

module.exports = (appName) => {
  const setupXmlContent = 
  `<?xml version="1.0" encoding="utf-8"?>
  <application>
      <name>${appName}</name>
      <version>0.1</version>
      <order>88</order>
      <status>enabled</status>
      <tables>
      
      </tables>
  </application>`;

  fs.writeFile(`${appName}/Setup/setup.xml`, setupXmlContent, err => {
    if (err) {
      console.log(err);
    }
    console.log(`${appName} setup xml file created`);
  });
};
