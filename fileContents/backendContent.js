const fs = require('fs');

module.exports = (appName, moduleName) => {
  const backendContent = `
<?php
/**
 * ${moduleName} Backend class for ${appName} application
 *
 * @package     ${appName}
 * @subpackage  Backend
 */
class ${appName}_Backend_${moduleName} extends Tinebase_Backend_Sql_Abstract
{
  /**
     * Table name without prefix
     *
     * @var string
     */
    protected $_tableName = '';

    /**
     * Model name
     *
     * @var string
     */
    protected $_modelName = '${appName}_Model_${moduleName}';

    /**
     * if modlog is active, we add 'is_deleted = 0' to select object in _getSelect()
     *
     * @var boolean
     */
    protected $_modlogActive = TRUE;
}
`;

  fs.writeFile(`${appName}/Backend/${appName}.php`, backendContent, err => {
    if (err) {
      console.log(err);
    }
    console.log(`Backend ${appName} created`);
  });
};
