#!/usr/bin/env node

import { exec } from 'child_process';
import { promisify } from 'util';
import fs from 'fs/promises';

const execAsync = promisify(exec);

async function build() {
  try {
    // Temporarily modify vite config to output to public
    console.log('Modifying vite config for production build...');
    const viteConfigContent = await fs.readFile('vite.config.ts', 'utf8');
    const modifiedConfig = viteConfigContent.replace(
      'outDir: path.resolve(import.meta.dirname, "dist/public")',
      'outDir: path.resolve(import.meta.dirname, "public")'
    );
    await fs.writeFile('vite.config.ts', modifiedConfig);
    
    console.log('Building frontend...');
    await execAsync('npx vite build');
    
    // Restore original vite config
    console.log('Restoring vite config...');
    await fs.writeFile('vite.config.ts', viteConfigContent);
    
    console.log('Building server...');
    await execAsync('npx esbuild server/index.ts --platform=node --packages=external --bundle --format=esm --outdir=dist --define:import.meta.dirname=\'".."\'');
    
    console.log('Build completed successfully!');
  } catch (error) {
    console.error('Build failed:', error.message);
    process.exit(1);
  }
}

build();