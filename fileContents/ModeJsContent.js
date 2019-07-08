const fs = require('fs');

module.exports = (appName, moduleName) => {
  const modelJsContent = `
  /*global Ext, Tine*/

  Ext.ns('Tine.${appName}.Model');
  
  /**
   * ${moduleName} Model
   *
   * @namespace Tine.${appName}.Model
   * @class Tine.${appName}.Model.${moduleName}
   * @extends Tine.Tinebase.data.Record
   */
  Tine.${appName}.Model.${moduleName} = Tine.Tinebase.data.Record.create([
      { name: 'id'     },
      { name: 'name'   }
  ].concat(Tine.Tinebase.Model.modlogFields), {
      appName: '${appName}',
      modelName: '${moduleName}',
      idProperty: 'id',
      titleProperty: 'name',
      // ngettext('${moduleName}', '${moduleName}s', n);  gettext('${moduleName}'); gettext('${moduleName}');
      recordName: '${moduleName}',
      recordsName: '${moduleName}s'
  });
  
  /**
   * get filtermodel of ${moduleName} model
   *
   * @namespace Tine.${appName}.Model
   * @static
   * @return {Object} filterModel definition
   */
  Tine.${appName}.Model.${moduleName}.getFilterModel = function () {
      var app = Tine.Tinebase.appMgr.get('${appName}'),
          trans = app.i18n;
  
      var filters = [
          {label: trans.gettext('Quick search'),          field: 'query',                 operators: ['contains']},
          {label: trans.gettext('Name'),                  field: 'name',                  operators: ['contains', 'equals']},
          {label: trans.gettext('Creation Time'),         field: 'creation_time',         valueType: 'date'},
          {label: trans.gettext('Created By'),            field: 'created_by',            valueType: 'user'},
          {label: trans.gettext('Last Modified Time'),    field: 'last_modified_time',    valueType: 'date'},
          {label: trans.gettext('Last Modified By'),      field: 'last_modified_by',      valueType: 'user'}
      ];
  
      return filters;
  };
  `;

  fs.writeFile(`${appName}/js/Model.js`, modelJsContent, err => {
    if (err) {
      console.log(err);
    }
    console.log(`${appName} model js file created`);
  });
};
