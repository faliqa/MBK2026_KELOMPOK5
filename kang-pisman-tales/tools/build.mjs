import { build } from 'esbuild';
import { readFile, writeFile, mkdir } from 'node:fs/promises';

const html = await readFile('src/index.html', 'utf8');
const css  = await readFile('src/styles.css', 'utf8');

const result = await build({
  entryPoints: ['src/main.js'],
  bundle: true,
  format: 'iife',
  target: 'es2020',
  write: false,
  logLevel: 'info'
});

const js = result.outputFiles[0].text;
await mkdir('dist', { recursive: true });

const out = html
  .replace('/*STYLE*/',  () => '<style>\n' + css + '\n</style>')
  .replace('/*SCRIPT*/', () => '<script>\n' + js + '\n<\/script>');

await writeFile('dist/index.html', out);
console.log('Build OK -> dist/index.html');