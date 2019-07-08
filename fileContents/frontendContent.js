const fs = require('fs');

module.exports = (appName, moduleName) => {
  const frontendContent = `
  <?php
  /**
   * frontend class for Zend_Json_Server
   *
   * This class handles all Json requests for the ${appName} application
   *
   * @package     ${appName}
   * @subpackage  Frontend
   */
  class ${appName}_Frontend_Json extends Tinebase_Frontend_Json_Abstract
  {
      /**
       * the constructor
       */
      public function __construct()
      {
          $this->_applicationName = '${appName}';
          $this->_translation     = Tinebase_Translation::getTranslation($this->_applicationName);
          $this->_currentUser     = Tinebase_Core::getUser();
      }
  
      /////////////////////////////////////////////////////////////////////////////////////////////
      // --> ${moduleName}
      /////////////////////////////////////////////////////////////////////////////////////////////
  
      /**
       * Search for records matching given arguments
       *
       * @param  array $filter
       * @param  array $paging
       * @return array
       */
      public function search${moduleName}s($filter, $paging)
      {
          return $this->_search($filter, $paging, ${appName}_Controller_${moduleName}::getInstance(), '${appName}_Model_${moduleName}Filter');
      }
  
      /**
       * Return a single record
       *
       * @param   string $id
       * @return  array record data
       */
      public function get${moduleName}($id)
      {
          return $this->_get($id, ${appName}_Controller_${moduleName}::getInstance());
      }
  
      /**
       * creates/updates a record
       *
       * @param  array $recordData
       * @return array created/updated record
       */
      public function save${moduleName}($recordData)
      {
          return $this->_save($recordData, ${appName}_Controller_${moduleName}::getInstance(), '${moduleName}');
      }
  
      /**
       * deletes existing records
       *
       * @param  array  $ids
       * @return string
       */
      public function delete${moduleName}s($ids)
      {
          return $this->_delete($ids, ${appName}_Controller_${moduleName}::getInstance());
      }
  }
  `;

  fs.writeFile(`${appName}/Frontend/Json.php`, frontendContent, err => {
    if (err) {
      console.log(err);
    }
    console.log(`Frontend ${appName} created`);
  });
};
