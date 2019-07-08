#! /usr/bin/env node
const path = require('path');
const fs = require('fs');

const [, , ...args] = process.argv;

fs.mkdirSync(`${args[0]}`);
fs.mkdirSync(`${args[0]}/Model`);
fs.mkdirSync(`${args[0]}/Controller`);
fs.mkdirSync(`${args[0]}/Backend`);
fs.mkdirSync(`${args[0]}/Frontend`);
fs.mkdirSync(`${args[0]}/js`);
fs.mkdirSync(`${args[0]}/css`);
fs.mkdirSync(`${args[0]}/Setup`);

const controllerContent = `
<?php
/**
 * ${args[1]} Controller class for ${args[0]} application
 *
 * @package     ${args[0]}
 * @subpackage  Controller
 */
class ${args[0]}_Controller_${
  args[1]
} extends Tinebase_Controller_Record_Abstract
{
  /**
     * the constructor
     *
     * don't use the constructor. use the singleton
     */
    private function __construct()
    {
        $this->_applicationName = '${args[0]}';
        $this->_backend         = new ${args[0]}_Backend_${args[1]}();
        $this->_modelName       = '${args[0]}_Model_${args[1]}';
        $this->_currentAccount  = Tinebase_Core::getUser();

        $this->_doRelationUpdate     = FALSE;
        $this->_purgeRecords         = FALSE;
        $this->_doContainerACLChecks = FALSE;
    }

    /**
     * holds the instance of the singleton
     *
     * @var ${args[0]}_Controller_${args[1]}
     */
    private static $_instance = NULL;

    /**
     * the singleton pattern
     *
     * @return ${args[0]}_Controller_${args[1]}
     */
    public static function getInstance()
    {
        if (self::$_instance === NULL) {
            self::$_instance = new ${args[0]}_Controller_${args[1]}();
        }

        return self::$_instance;
    }
}
`;

fs.writeFile(`${args[0]}/Controller/${args[0]}.php`, controllerContent, err => {
  if (err) {
    console.log(err);
  }
  console.log(`Controller ${args[0]} created`);
});

const modelContent = `
<?php
/**
 * ${args[1]} Model class for ${args[0]} application
 *
 * @package     ${args[0]}
 * @subpackage  Model
 */
class ${args[0]}_Model_${args[1]} extends Tinebase_Record_Abstract
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
    protected $_application = '${args[0]}';

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

fs.writeFile(`${args[0]}/Model/${args[0]}.php`, modelContent, err => {
  if (err) {
    console.log(err);
  }
  console.log(`Model ${args[0]} created`);
});

const backendContent = `
<?php
/**
 * ${args[1]} Backend class for ${args[0]} application
 *
 * @package     ${args[0]}
 * @subpackage  Backend
 */
class ${args[0]}_Backend_${args[1]} extends Tinebase_Backend_Sql_Abstract
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
    protected $_modelName = '${args[0]}_Model_${args[1]}';

    /**
     * if modlog is active, we add 'is_deleted = 0' to select object in _getSelect()
     *
     * @var boolean
     */
    protected $_modlogActive = TRUE;
}
`;

fs.writeFile(`${args[0]}/Backend/${args[0]}.php`, backendContent, err => {
  if (err) {
    console.log(err);
  }
  console.log(`Backend ${args[0]} created`);
});

console.log(`Module ${args[0]} created`);
