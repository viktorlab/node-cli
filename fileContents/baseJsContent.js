const fs = require('fs');

module.exports = (appName, moduleName) => {
  const baseJsContent = `
  /*global Ext, Tine, $LAB, window*/

  Ext.ns('Tine.${appName}');
  
  /**
   * ${appName} Application Object
   *
   * @namespace   Tine.${appName}
   * @class       Tine.${appName}.Application
   * @extends     Tine.Tinebase.Application
   */
  Tine.${appName}.Application = Ext.extend(Tine.Tinebase.Application, {
      /**
       * Get translated application title of the ${appName} application
       *
       * @return {String}
       */
      getTitle: function () {
          return this.i18n.gettext('${appName}');
      }
  });
  
  /**
   * MainScreen of the ${appName} Application
   *
   * @namespace Tine.${appName}
   * @class Tine.${appName}.MainScreen
   * @extends Tine.widgets.MainScreen
   *
   * @constructor Constructs mainscreen of the ${appName} application
   */
  Tine.${appName}.MainScreen = Ext.extend(Tine.widgets.MainScreen, {
      activeContentType: '${moduleName}',
  
      constructor: function (config) {
          this.contentTypes = [
              {model: '${moduleName}',  requiredRight: null, singularContainerMode: true}
          ];
  
          // Call our superclass constructor to complete construction process.
          Tine.${appName}.MainScreen.superclass.constructor.call(this, config);
      },
  
      /**
       * adapter fn to get favorites panel
       *
       * @return {Ext.tree.TreePanel}
       */
      getFavoritesPanel: function () {
          return this.getWestPanel().getFavoritesPanel();
      }
  });
  
  /**
   * ${moduleName} Favorites panel
   *
   * @class       Tine.${appName}.${moduleName}FilterPanel
   * @extends     Tine.widgets.persistentfilter.PickerPanel
   *
   * @param {Object} config
   */
  Tine.${appName}.${moduleName}FilterPanel = Ext.extend(Tine.widgets.persistentfilter.PickerPanel, {
      filterModel: '${appName}_Model_${moduleName}Filter'
  });
  `;

  fs.writeFile(`${appName}/js/${appName}.js`, baseJsContent, err => {
    if (err) {
      console.log(err);
    }
    console.log(`${appName} js file created`);
  });
};
