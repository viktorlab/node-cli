const fs = require('fs');

module.exports = (appName, moduleName) => {
  const gridPanelContent = `
  /*global Ext, Tine*/

  Ext.ns('Tine.${appName}');
  
  /**
   * ${moduleName} grid panel
   *
   * @namespace   Tine.${appName}
   * @class       Tine.${appName}.${moduleName}GridPanel
   * @extends     Tine.widgets.grid.GridPanel
   *
   * @param       {Object} config
   * @constructor Create a new Tine.${appName}.${moduleName}GridPanel
   */
  Tine.${appName}.${moduleName}GridPanel = Ext.extend(Tine.widgets.grid.GridPanel, {
      /**
       * @cfg
       */
      recordClass: Tine.${appName}.Model.${moduleName},
      evalGrants: false,
  
      /**
       * grid specific
       * @private
       */
      defaultSortInfo: {
          field: 'creation_time',
          direction: 'DESC'
      },
  
      /**
       * grid config
       *
       * @type {Object}
       */
      gridConfig: {
          autoExpandColumn: 'name'
      },
  
      /**
       * inits this cmp
       * @private
       */
      initComponent: function () {
          this.trans              = this.app.i18n;
          this.gridConfig.columns = this.getColumns();
  
          Tine.${appName}.${moduleName}GridPanel.superclass.initComponent.call(this);
      },
  
      /**
       * returns cm
       *
       * @return {Array}
       * @private
       */
      getColumns: function () {
          return [
              { header: this.trans.gettext('ID'),   id: 'id',  dataIndex: 'id',  width: 50},
              { header: this.trans.gettext('Name'), id: 'name', dataIndex: 'name'}
          ].concat(this.getModlogColumns());
      }
  });
  `;

  fs.writeFile(
    `${appName}/js/${moduleName}GridPanel.js`,
    gridPanelContent,
    err => {
      if (err) {
        console.log(err);
      }
      console.log(`${appName} gridPanel js file created`);
    }
  );
};
