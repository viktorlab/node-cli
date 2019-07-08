#! /usr/bin/env node
const fs = require('fs');
const [, , ...args] = process.argv;
const modelContent = require('./fileContents/modelContent');
const controllerContent = require('./fileContents/controllerContent');
const backendContent = require('./fileContents/backendContent');
const frontendContent = require('./fileContents/frontendContent');
const modelFilterContent = require('./fileContents/modelFilterContent');

fs.mkdirSync(`${args[0]}`);
fs.mkdirSync(`${args[0]}/Model`);
fs.mkdirSync(`${args[0]}/Controller`);
fs.mkdirSync(`${args[0]}/Backend`);
fs.mkdirSync(`${args[0]}/Frontend`);
fs.mkdirSync(`${args[0]}/js`);
fs.mkdirSync(`${args[0]}/css`);
fs.mkdirSync(`${args[0]}/Setup`);

modelContent(args[0], args[1]);
modelFilterContent(args[0], args[1]);
controllerContent(args[0], args[1]);
backendContent(args[0], args[1]);
frontendContent(args[0], args[1]);

console.log(`Module ${args[0]} created`);
