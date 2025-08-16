#!/usr/bin/env node

import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

async function build() {
  try {
    console.log('Building frontend...');
    await execAsync('npx vite build');
    
    console.log('Building server...');
    await execAsync('npx esbuild server/index.ts --platform=node --packages=external --bundle --format=esm --outdir=dist --define:import.meta.dirname=\'"."\'');
    
    console.log('Moving built files for Docker compatibility...');
    // Copy built frontend files to dist/public so the server can find them
    await execAsync('cp -r dist/public dist/public_backup 2>/dev/null || true');
    await execAsync('mkdir -p dist/public');
    await execAsync('cp -r dist/public_backup/* dist/public/ 2>/dev/null || true');
    await execAsync('rm -rf dist/public_backup 2>/dev/null || true');
    
    console.log('Build completed successfully!');
  } catch (error) {
    console.error('Build failed:', error.message);
    process.exit(1);
  }
}

build();