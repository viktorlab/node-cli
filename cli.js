#! /usr/bin/env node
const fs = require('fs');
const [, , ...args] = process.argv;
const modelContent = require('./fileContents/modelContent');
const controllerContent = require('./fileContents/controllerContent');
const backendContent = require('./fileContents/backendContent');
const frontendContent = require('./fileContents/frontendContent');
const modelFilterContent = require('./fileContents/modelFilterContent');
const cssContent = require('./fileContents/cssContent');
const modelJsContent = require('./fileContents/ModeJsContent');
const editDialogContent = require('./fileContents/editDialogContent');
const gridPanelContent = require('./fileContents/gridPanelContent');
const baseJsContent = require('./fileContents/baseJsContent');
const jsb2Content = require('./fileContents/jsb2Content');
const setupXmlContent = require('./fileContents/setupXmlContent');

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
cssContent(args[0]);
modelJsContent(args[0], args[1]);
editDialogContent(args[0], args[1]);
gridPanelContent(args[0], args[1]);
baseJsContent(args[0], args[1]);
jsb2Content(args[0], args[1]);
setupXmlContent(args[0]);

console.log(`Module ${args[0]} created`);
