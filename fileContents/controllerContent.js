const fs = require('fs');

module.exports = (appName, moduleName) => {
  const controllerContent = `
<?php
/**
 * ${moduleName} Controller class for ${appName} application
 *
 * @package     ${appName}
 * @subpackage  Controller
 */
class ${appName}_Controller_${moduleName} extends Tinebase_Controller_Record_Abstract
{
  /**
     * the constructor
     *
     * don't use the constructor. use the singleton
     */
    private function __construct()
    {
        $this->_applicationName = '${appName}';
        $this->_backend         = new ${appName}_Backend_${moduleName}();
        $this->_modelName       = '${appName}_Model_${moduleName}';
        $this->_currentAccount  = Tinebase_Core::getUser();

        $this->_doRelationUpdate     = FALSE;
        $this->_purgeRecords         = FALSE;
        $this->_doContainerACLChecks = FALSE;
    }

    /**
     * holds the instance of the singleton
     *
     * @var ${appName}_Controller_${moduleName}
     */
    private static $_instance = NULL;

    /**
     * the singleton pattern
     *
     * @return ${appName}_Controller_${moduleName}
     */
    public static function getInstance()
    {
        if (self::$_instance === NULL) {
            self::$_instance = new ${appName}_Controller_${moduleName}();
        }

        return self::$_instance;
    }
}
`;

  fs.writeFile(
    `${appName}/Controller/${appName}.php`,
    controllerContent,
    err => {
      if (err) {
        console.log(err);
      }
      console.log(`Controller ${appName} created`);
    }
  );
};
