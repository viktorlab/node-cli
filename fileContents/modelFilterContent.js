const fs = require('fs');

module.exports = (appName, moduleName) => {
  const modelFilterContent = `
  <?php
  /**
   * ${moduleName} filter Class
   *
   * @package     ${appName}
   * @subpackage  Model
   */
  class ${appName}_Model_${moduleName}Filter extends Tinebase_Model_Filter_FilterGroup
  {
      /**
       * @var string application of this filter group
       */
      protected $_applicationName = '${appName}';
  
      /**
       * @var string name of model this filter group is designed for
       */
      protected $_modelName = '${appName}_Model_${moduleName}';
  
      /**
       * @var string class name of this filter group
       *      this is needed to overcome the static late binding
       *      limitation in php < 5.3
       */
      protected $_className = '${appName}_Model_${moduleName}Filter';
  
      /**
       * @var array filter model fieldName => definition
       */
      protected $_filterModel = array(
          'id'                    => array('filter' => 'Tinebase_Model_Filter_Id',
              'options' => array('modelName' => '${appName}_Model_${moduleName}')
          ),
          'query'                 => array(
              'filter' => 'Tinebase_Model_Filter_Query',
              'options' => array('fields' => array('id', 'name'))
          ),
          'name'              => array('filter' => 'Tinebase_Model_Filter_Text')
      );
  }
  `;

  fs.writeFile(
    `${appName}/Model/${appName}Filter.php`,
    modelFilterContent,
    err => {
      if (err) {
        console.log(err);
      }
      console.log(`Model Filter ${appName} created`);
    }
  );
};
