// Bundle the book into a single self-contained file: dist/index.html
// (inlines fonts.css and every <script src>). No external requests remain.
import { readFileSync, writeFileSync, mkdirSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const here = dirname(fileURLToPath(import.meta.url));
let html = readFileSync(join(here, 'index.html'), 'utf8');

html = html.replace(/<link rel="stylesheet" href="fonts.css">/,
  () => `<style>\n${readFileSync(join(here, 'fonts.css'), 'utf8')}\n</style>`);

html = html.replace(/<script src="([^"]+)"><\/script>/g, (_, src) =>
  `<script>\n${readFileSync(join(here, src), 'utf8')}\n</script>`);

mkdirSync(join(here, 'dist'), { recursive: true });
writeFileSync(join(here, 'dist', 'index.html'), html);
console.log('dist/index.html:', Math.round(html.length / 1024), 'KB');
