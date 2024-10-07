import fs from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

function readSwaggerDocument() {
  const docsPath = join(dirname(fileURLToPath(import.meta.url)), './swagger.json');
  const docs = JSON.parse(fs.readFileSync(docsPath, 'utf8'));

  return docs;
}

export default readSwaggerDocument;