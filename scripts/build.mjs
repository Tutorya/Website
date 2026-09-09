import assert from 'node:assert/strict';
import { copyFile, cp, lstat, mkdir, readdir, rm, stat } from 'node:fs/promises';
import { join, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const PROJECT_ROOT = fileURLToPath(new URL('../', import.meta.url));
const SOURCE_ROOT = join(PROJECT_ROOT, 'site');
const OUTPUT_ROOT = join(PROJECT_ROOT, 'dist');

const FONT_PACKAGES = [
  {
    name: 'libre-bodoni',
    files: ['libre-bodoni-latin-400-normal.woff2', 'libre-bodoni-latin-400-italic.woff2'],
  },
  {
    name: 'public-sans',
    files: ['public-sans-latin-400-normal.woff2', 'public-sans-latin-500-normal.woff2', 'public-sans-latin-600-normal.woff2'],
  },
];

const FONT_ASSETS = FONT_PACKAGES.flatMap(({ name, files }) => {
  const packageRoot = join(PROJECT_ROOT, 'node_modules', '@fontsource', name);
  return [
    ...files.map((filename) => ({
      source: join(packageRoot, 'files', filename),
      filename,
      label: `@fontsource/${name}/files/${filename}`,
    })),
    {
      source: join(packageRoot, 'LICENSE'),
      filename: `OFL-${name}.txt`,
      label: `@fontsource/${name}/LICENSE`,
    },
  ];
});

async function requireFile(filename, label) {
  let information;
  try {
    information = await stat(filename);
  } catch {
    throw new Error(`Missing required build input: ${label}.`);
  }
  assert(information.isFile() && information.size > 0, `Required file is empty or invalid: ${label}.`);
  return information;
}

async function inspectTree(directory, label) {
  const information = await lstat(directory);
  assert(information.isDirectory(), `${label} must be a directory, not a symlink.`);

  const files = [];
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const filename = join(directory, entry.name);
    if (entry.isDirectory()) {
      files.push(...await inspectTree(filename, label));
    } else {
      assert(entry.isFile(), `${label} may contain only regular files and directories, not symlinks.`);
      files.push({ filename, bytes: (await stat(filename)).size });
    }
  }
  return files;
}

/** Copy public sources verbatim; the only directory removed is this project's dist/. */
export async function build() {
  // Validate inputs before touching an existing preview. No HTML/CSS/JS transforms
  // are applied: comments, the design contract, and .htaccess remain intact.
  await requireFile(join(SOURCE_ROOT, 'index.html'), 'site/index.html');
  await inspectTree(SOURCE_ROOT, 'site/');
  const fontInformation = await Promise.all(
    FONT_ASSETS.map(({ source, label }) => requireFile(source, label)),
  );

  await rm(OUTPUT_ROOT, { recursive: true, force: true, maxRetries: 3, retryDelay: 50 });
  await cp(SOURCE_ROOT, OUTPUT_ROOT, { recursive: true });

  const fontDirectory = join(OUTPUT_ROOT, 'assets', 'fonts');
  await mkdir(fontDirectory, { recursive: true });
  // Finish each write before advancing, including on failure, so a rejected
  // build cannot leave background copies racing the next queued rebuild.
  for (const [index, { source, filename }] of FONT_ASSETS.entries()) {
    const destination = join(fontDirectory, filename);
    await copyFile(source, destination);
    const copied = await requireFile(destination, `dist/assets/fonts/${filename}`);
    assert.equal(copied.size, fontInformation[index].size, `Incomplete font asset: ${filename}.`);
  }
  await requireFile(join(OUTPUT_ROOT, 'index.html'), 'dist/index.html');

  const outputFiles = await inspectTree(OUTPUT_ROOT, 'dist/');
  const bytes = outputFiles.reduce((total, file) => total + file.bytes, 0);
  console.log(
    `[build] ${outputFiles.length} files, ${(bytes / 1024).toFixed(1)} KiB in dist/; `
    + `${FONT_PACKAGES.reduce((total, item) => total + item.files.length, 0)} local fonts and ${FONT_PACKAGES.length} licenses. Local preview only.`,
  );
  return { directory: OUTPUT_ROOT, files: outputFiles.length, bytes };
}

if (process.argv[1] && relative(fileURLToPath(import.meta.url), resolve(process.argv[1])) === '') {
  build().catch((error) => {
    console.error(`[build] ${error.message}`);
    process.exitCode = 1;
  });
}