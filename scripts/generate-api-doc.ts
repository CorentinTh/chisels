import fs from 'node:fs/promises';
import { capitalize } from 'lodash-es';

const indexFileContent = await fs.readFile('./src/index.ts', 'utf-8');
const exportedFileNames = indexFileContent.match(/export \* from '\.\/(.*?)';/g)?.map(line => line.match(/export \* from '\.\/(.*?)';/)![1]) ?? [];

const apiSections = await Promise.all(exportedFileNames.map(async (fileName) => {
  const fileContent = await fs.readFile(`./src/${fileName}.ts`, 'utf-8');
  const exportedFunctionNames = fileContent.match(/export \{ (.*?)(?:, )? ?\};/)?.[1].split(', ') ?? [];

  const exportedTypesNames = fileContent.match(/export type (.*?)(?: = |<)/g)?.map(line => line.match(/export type (.*?)(?: = |<)/)![1]) ?? [];

  return {
    fileName,
    exportedFunctionNames,
    exportedTypesNames,
  };
}));

const markdown = apiSections.map(({ fileName, exportedFunctionNames, exportedTypesNames }) => {
  const filePath = `./src/${fileName}.ts`;

  const functionLines = exportedFunctionNames.map(name => `  * [${name}](${filePath})`).join('\n');
  const typeLines = exportedTypesNames.map(name => `  * [${name}](${filePath})`).join('\n');

  return [
    `* ${capitalize(fileName)}`,
    functionLines,
    typeLines,
  ].filter(Boolean).join('\n');
}).join('\n\n');

const startTag = '<!-- API-DOCS-START -->';
const endTag = '<!-- API-DOCS-END -->';

const readmeContent = await fs.readFile('./README.md', 'utf-8');

const updatedReadmeContent = readmeContent.replace(
  new RegExp(`${startTag}[\\s\\S]*${endTag}`),
  `${startTag}\n\n${markdown}\n\n${endTag}`,
);

await fs.writeFile('./README.md', updatedReadmeContent);
