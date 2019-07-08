const fs = require('fs');

module.exports = appName => {
  const cssContent = `
  /**
   * Icons
   */
  .${appName}IconCls { background-image:url(../../images/oxygen/16x16/apps/preferences-desktop-launch-feedback.png) !important; }
  .x-btn-medium .${appName}IconCls { background-image:url(../../images/oxygen/22x22/apps/preferences-desktop-launch-feedback.png) !important; }
  .x-btn-large .${appName}IconCls { background-image:url(../../images/oxygen/32x32/apps/preferences-desktop-launch-feedback.png) !important; }
  `;

  fs.writeFile(`${appName}/css/${appName}.css`, cssContent, err => {
    if (err) {
      console.log(err);
    }
    console.log(`${appName} css file created`);
  });
};
