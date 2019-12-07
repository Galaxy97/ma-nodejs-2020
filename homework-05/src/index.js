const path = require('path');
const fsp = require('fs').promises;
const zlib = require('zlib');
const {promisify} = require('util');

const gunzip = promisify(zlib.gunzip);
const gzip = promisify(zlib.gzip);

const inputDirName = 'input';
const outputDirName = 'output';
const outputFileName = 'result.json.gz';

const inputDir = path.join(process.cwd(), inputDirName); // absolute path to input dir
const outputFile = path.join(process.cwd(), outputDirName, outputFileName); // absolute path to output file

async function getInputFileList() {
  try {
    const files = await fsp.readdir(inputDir);
    return files.map(file => path.join(inputDir, file));
  } catch (error) {
    console.error(error);
    return null;
  }
}

async function getObjectFromFile(filePath) {
  try {
    const compressedBuffer = await fsp.readFile(filePath);
    const buffer = await gunzip(compressedBuffer);
    const dataInFile = await buffer.toString();
    return JSON.parse(dataInFile);
  } catch (error) {
    console.error(error);
    return null;
  }
}

function rebuildUrl(originalUrl) {
  try {
    const objUrl = new URL(originalUrl);
    const newPathName = path.parse(objUrl.pathname);
    objUrl.protocol = 'https';
    objUrl.pathname = newPathName.dir.slice(7);
    objUrl.searchParams.set('file', newPathName.name);
    objUrl.searchParams.set('type', newPathName.ext);
    return objUrl.href;
  } catch (error) {
    console.error(error);
    return null;
  }
}

async function buildOutputObject(files) {
  const outputObject = {};
  // eslint-disable-next-line no-restricted-syntax
  for (const file of files) {
    // eslint-disable-next-line no-await-in-loop
    const objectsInFile = await getObjectFromFile(file);
    objectsInFile.url = rebuildUrl(objectsInFile.url);
    const fileName = path.parse(objectsInFile.file).name;
    outputObject[fileName] = objectsInFile;
  }
  return outputObject;
}

async function saveOutput(object) {
  try {
    const buffer = Buffer.from(JSON.stringify(object));
    const zip = await gzip(buffer);
    await fsp.writeFile(outputFile, zip);
  } catch (error) {
    console.error(error);
  }
}

async function start() {
  const inputFiles = await getInputFileList();
  const outputObject = await buildOutputObject(inputFiles);
  await saveOutput(outputObject);
}

start().catch(err => console.error('🐞  🤪  🐛\n', err));
