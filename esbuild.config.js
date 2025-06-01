import esbuild from 'esbuild';
import { execSync } from 'child_process';
import { readdirSync } from 'fs';
import { join } from 'path';

async function build() {
  try {
    console.log('🛠️ Generating declaration files...');
    execSync('tsc --emitDeclarationOnly --declaration --outDir dist --project tsconfig.json', { stdio: 'inherit' });

    const builds = [];
    const componentsDir = 'src/components';
    const libDir = 'src/lib';

    const components = readdirSync(componentsDir, { withFileTypes: true })
      .filter(dirent => dirent.isFile() && /\.(ts|tsx)$/.test(dirent.name))
      .map(dirent => dirent.name.replace(/\.(ts|tsx)$/, ''));

    const libs = readdirSync(libDir, { withFileTypes: true })
      .filter(dirent => dirent.isFile() && /\.(ts|tsx)$/.test(dirent.name))
      .map(dirent => dirent.name.replace(/\.(ts|tsx)$/, ''));

    // Bundle the full index
    builds.push(
      {
        entry: 'src/index.ts',
        outfile: 'dist/index.mjs',
        format: 'esm',
        minify: false
      },
      {
        entry: 'src/index.ts',
        outfile: 'dist/index.min.mjs',
        format: 'esm',
        minify: true
      },
      {
        entry: 'src/index.ts',
        outfile: 'dist/index.cjs.js',
        format: 'cjs',
        minify: false
      },
      {
        entry: 'src/index.ts',
        outfile: 'dist/index.cjs.min.js',
        format: 'cjs',
        minify: true
      }
    );

    for (const component of components) {
      const input = join(componentsDir, `${component}.ts`);
      const outBase = `dist/components`;

      builds.push(
        {
          entry: input,
          outfile: `${outBase}/${component}.mjs`,
          format: 'esm',
          minify: false
        },
        {
          entry: input,
          outfile: `${outBase}/${component}.min.mjs`,
          format: 'esm',
          minify: true
        },
        {
          entry: input,
          outfile: `${outBase}/${component}.cjs.js`,
          format: 'cjs',
          minify: false
        },
        {
          entry: input,
          outfile: `${outBase}/${component}.cjs.min.js`,
          format: 'cjs',
          minify: true
        }
      );
    }

    for (const lib of libs) {
      const input = join(libDir, `${lib}.ts`);
      const outBase = `dist/lib`;

      builds.push(
        {
          entry: input,
          outfile: `${outBase}/${lib}.mjs`,
          format: 'esm',
          minify: false
        },
        {
          entry: input,
          outfile: `${outBase}/${lib}.min.mjs`,
          format: 'esm',
          minify: true
        },
        {
          entry: input,
          outfile: `${outBase}/${lib}.cjs.js`,
          format: 'cjs',
          minify: false
        },
        {
          entry: input,
          outfile: `${outBase}/${lib}.cjs.min.js`,
          format: 'cjs',
          minify: true
        }
      );
    }

    console.log('📦 Building bundles with esbuild...');
    for (const { entry, outfile, format, minify } of builds) {
      await esbuild.build({
        entryPoints: [entry],
        bundle: true,
        minify,
        sourcemap: true,
        target: 'esnext',
        format,
        outfile
      });
      console.log(`✅ Built ${outfile}`);
    }

    console.log('🏁 Build completed successfully!');
  } catch (err) {
    console.error('❌ Build failed:', err);
    process.exit(1);
  }
}

build();
