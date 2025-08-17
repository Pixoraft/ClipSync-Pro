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
    // For Docker: copy frontend files to the root public directory where the server expects them
    // In Docker, the app runs from /app and looks for ./public which is /app/public
    await execAsync('mkdir -p public');
    await execAsync('cp -r dist/public/* public/');
    
    console.log('Build completed successfully!');
  } catch (error) {
    console.error('Build failed:', error.message);
    process.exit(1);
  }
}

build();