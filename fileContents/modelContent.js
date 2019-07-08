const fs = require('fs');

module.exports = (appName, moduleName) => {
  const modelContent = `
<?php
/**
 * ${moduleName} Model class for ${appName} application
 *
 * @package     ${appName}
 * @subpackage  Model
 */
class ${appName}_Model_${moduleName} extends Tinebase_Record_Abstract
{
  /**
     * key in $_validators/$_properties array for the filed which
     * represents the identifier
     *
     * @var string
     */
    protected $_identifier = 'id';

    /**
     * application the record belongs to
     *
     * @var string
     */
    protected $_application = '${appName}';

    /**
     * list of zend inputfilter
     *
     * this filter get used when validating user generated content with Zend_Input_Filter
     *
     * @var array
     */
    protected $_filters = array(
        'id'            => array('Digits'),
        'name'          => array('StringTrim')
    );

    /**
     * if foreign Id fields should be resolved on search and get from json
     * should have this format:
     *     array('Calendar_Model_Contact' => 'contact_id', ...)
     * or for more fields:
     *     array('Calendar_Model_Contact' => array('contact_id', 'customer_id), ...)
     * (e.g. resolves contact_id with the corresponding Model)
     * @var array
     */
    protected static $_resolveForeignIdFields = array(
        'Tinebase_Model_User' => array('created_by', 'last_modified_by'),
    );
}
`;

  fs.writeFile(`${appName}/Model/${appName}.php`, modelContent, err => {
    if (err) {
      console.log(err);
    }
    console.log(`Model ${appName} created`);
  });
};
