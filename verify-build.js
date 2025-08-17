#!/usr/bin/env node

// Simple script to verify the build works correctly
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

async function verify() {
  try {
    console.log('🔍 Verifying build output...');
    
    // Check if dist/index.js exists
    await execAsync('test -f dist/index.js');
    console.log('✅ Server bundle exists');
    
    // Check if public/index.html exists
    await execAsync('test -f public/index.html');
    console.log('✅ Frontend files exist');
    
    // Test server startup (just start and immediately stop)
    console.log('🚀 Testing server startup...');
    const serverProcess = exec('cd . && NODE_ENV=production PORT=10001 node dist/index.js');
    
    // Wait a moment for server to start
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Try to fetch the homepage
    try {
      const { stdout } = await execAsync('curl -s -f http://localhost:10001 | head -1');
      if (stdout.includes('<!DOCTYPE html>')) {
        console.log('✅ Server serves HTML correctly');
      } else {
        throw new Error('HTML not served correctly');
      }
    } catch (error) {
      console.error('❌ Server test failed:', error.message);
      process.exit(1);
    } finally {
      // Kill the server
      serverProcess.kill();
    }
    
    console.log('🎉 Build verification successful!');
  } catch (error) {
    console.error('❌ Verification failed:', error.message);
    process.exit(1);
  }
}

verify();