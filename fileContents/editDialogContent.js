const fs = require('fs');

module.exports = (appName, moduleName) => {
  const editDialogContent = `
  /*global Ext, Tine*/

  Ext.ns('Tine.${appName}');
  
  /**
   * @namespace   Tine.${appName}
   * @class       Tine.${appName}.${moduleName}EditDialog
   * @extends     Tine.widgets.dialog.EditDialog
   *
   * <p>${moduleName} Dialog</p>
   *
   * @param       {Object} config
   * @constructor Create a new Tine.${appName}.${moduleName}EditDialog
   */
  Tine.${appName}.${moduleName}EditDialog = Ext.extend(Tine.widgets.dialog.EditDialog, {
      /**
       * @private
       */
      windowNamePrefix: '${appName}${moduleName}EditWindow_',
      appName: '${appName}',
      recordClass: Tine.${appName}.Model.${moduleName},
      evalGrants: false,
  
      /**
       * returns dialog
       *
       * NOTE: when this method gets called, all initalisation is done.
       *
       * @return {Object}
       * @private
       */
      getFormItems: function () {
          var self = this;
  
          var config = {
              xtype: 'tabpanel',
              border: false,
              plain: true,
              activeTab: 0,
              items: [{
                  title: this.app.i18n.gettext('${moduleName}'),
                  autoScroll: true,
                  border: false,
                  frame: true,
                  layout: 'column',
                  defaults: {
                      layout: 'form',
                      labelAlign: 'top',
                      border: false
                  },
                  items: [{
                      xtype: 'container',
                      columnWidth: 0.5,
                      defaults: { anchor: '100%' },
                      defaultType: 'textfield',
                      items: [{
                          fieldLabel: this.app.i18n.gettext('Name'),
                          name: 'name'
                      }]
                  }]
              }]
          };
  
          // add history panel when editing
          if (this.record.id && ! this.copyRecord) {
              config.items.push({
                  xtype: 'tinebasehistorypanel',
                  appName: this.appName,
                  record_id: this.record.id,
                  record_model: this.appName + '_Model_' + this.recordClass.getMeta('modelName')
              });
          }
  
          return config;
      }
  });
  
  /**
   * ${appName} Edit Popup
   *
   * @param   {Object} config
   * @return  {Ext.ux.Window}
   */
  Tine.${appName}.${moduleName}EditDialog.openWindow = function (config) {
      var id = (config.record && config.record.id) ? config.record.id : 0;
  
      /**
       * Open edit dialog
       */
      Tine.WindowFactory.getWindow({
          width: 400,
          height: 300,
          name: Tine.${appName}.${moduleName}EditDialog.prototype.windowNamePrefix + id,
          contentPanelConstructor: 'Tine.${appName}.${moduleName}EditDialog',
          contentPanelConstructorConfig: config
      });
  };
  `;

  fs.writeFile(
    `${appName}/js/${moduleName}EditDialog.js`,
    editDialogContent,
    err => {
      if (err) {
        console.log(err);
      }
      console.log(`${appName} editDialog js file created`);
    }
  );
};
