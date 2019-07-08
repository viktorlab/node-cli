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
}
`;

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
}
`;

fs.writeFile(`${args[0]}/Controller/${args[0]}.php`, controllerContent, err => {
  if (err) {
    console.log(err);
  }
  console.log(`Controller ${args[0]} created`);
});

fs.writeFile(`${args[0]}/Model/${args[0]}.php`, modelContent, err => {
  if (err) {
    console.log(err);
  }
  console.log(`Model ${args[0]} created`);
});

console.log(`Module ${args[0]} created`);
