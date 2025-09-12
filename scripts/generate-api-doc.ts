import fs from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { doc as extractTsDoc } from 'tsdoc-extractor';

const startTag = '<!-- API-DOCS-START -->';
const endTag = '<!-- API-DOCS-END -->';

const projectRoot = join(dirname(new URL(import.meta.url).pathname), '..');
const entryPoint = join(projectRoot, 'src/index.ts');
const entryPointUrl = new URL(entryPoint, import.meta.url).toString();

function makeProjectRootRelativePath(path: string) {
  return path.replace('file://', '').replace(projectRoot, '.');
}

const apiDocs = await extractTsDoc(entryPointUrl);

const markdown = apiDocs
  .filter(doc => doc.kind !== 'import')
  .sort(a => a.kind === 'function' ? -1 : 1)
  .map((doc) => {
    const title = `### \`${doc.name}\``;
    const type = doc.kind === 'function' ? 'Function' : 'Type alias';
    const location = `[See source](${makeProjectRootRelativePath(doc.location.filename)}#L${doc.location.line})`;
    const documentation = doc.jsDoc?.doc;
    const example = (doc.jsDoc?.tags?.find(tag => tag.kind === 'example') as ({ doc: string }) | undefined)?.doc;

    return [title, `${type} - ${location}`, documentation, example].filter(Boolean).join('\n\n');
  })
  .join('\n\n');

const readmeContent = await fs.readFile('./README.md', 'utf-8');

const updatedReadmeContent = readmeContent.replace(
  new RegExp(`${startTag}[\\s\\S]*${endTag}`),
  `${startTag}\n\n${markdown}\n\n${endTag}`,
);

await fs.writeFile('./README.md', updatedReadmeContent);
