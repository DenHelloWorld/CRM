import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawn } from 'node:child_process';
import 'dotenv/config'

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function startServerProcess(command, cwd) {
  return new Promise((resolve, reject) => {
    const process = spawn(command, [], {
      cwd: cwd,
      shell: true,
      stdio: ['inherit', 'inherit', 'inherit'],
    });

    process.on('close', (code) => {
      if (code !== 0) {
        reject(new Error(`Process exited with code ${code}`));
      } else {
        resolve();
      }
    });

    process.on('error', (err) => {
      reject(err);
    });
  });
}

async function startServers() {
  try {
    await Promise.all([
      startServerProcess('npm run docker:up', resolve(__dirname, 'backend')),
      startServerProcess('npm run start:dev', resolve(__dirname, 'backend')),
      startServerProcess('npm run start', resolve(__dirname, 'frontend')),
    ]);

    console.log('All servers started successfully!');
  } catch (error) {
    console.error('Error starting servers:', error.message);
  }
}

startServers();
