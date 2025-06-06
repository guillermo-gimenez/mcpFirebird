// Script to run the MCP inspector with the MCP Firebird server in STDIO mode
import { spawn } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer } from 'http';
import { createInterface } from 'readline';

// Get the current directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Get the path to the MCP Firebird server
const mcpFirebirdPath = path.resolve(__dirname, 'dist/cli.js');
console.log(`MCP Firebird path: ${mcpFirebirdPath}`);

// Get the database path from environment variables
let databasePath = process.env.FIREBIRD_DATABASE || process.env.FB_DATABASE || 'F:\\Proyectos\\SAI\\EMPLOYEE.FDB';
console.log(`Database path: ${databasePath}`);

// Start the MCP Firebird server
const mcpFirebirdProcess = spawn('node', [mcpFirebirdPath, '--database', databasePath], {
  stdio: 'pipe'
});

console.log('Started MCP Firebird server');

// Create readline interface for the MCP Firebird server
const rl = createInterface({
  input: mcpFirebirdProcess.stdout,
  terminal: false
});

// Log MCP Firebird server output
rl.on('line', (line) => {
  console.log(`MCP Firebird: ${line}`);
});

// Log MCP Firebird server errors
mcpFirebirdProcess.stderr.on('data', (data) => {
  console.error(`MCP Firebird error: ${data.toString()}`);
});

// Handle MCP Firebird server exit
mcpFirebirdProcess.on('exit', (code) => {
  console.log(`MCP Firebird server exited with code ${code}`);
  process.exit(code);
});

// Create a simple HTTP server to display instructions
const server = createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.end(`
    <html>
      <head>
        <title>MCP Firebird Server</title>
        <style>
          body { font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px; }
          h1 { color: #333; }
          pre { background-color: #f5f5f5; padding: 10px; border-radius: 5px; }
          .success { color: green; }
          .error { color: red; }
        </style>
      </head>
      <body>
        <h1>MCP Firebird Server</h1>
        <p class="success">✅ MCP Firebird server is running with the following configuration:</p>
        <pre>
  Database: ${databasePath}
  Host: localhost
  Port: 3050
  User: SYSDBA
        </pre>
        <p>To use this server with Claude Desktop:</p>
        <ol>
          <li>Configure Claude Desktop to use MCP Firebird</li>
          <li>Use the following configuration in your <code>claude-desktop-mcp.json</code> file:</li>
        </ol>
        <pre>
{
  "mcpServers": {
    "mcp-firebird": {
      "command": "npx",
      "args": [
        "mcp-firebird",
        "--database",
        "${databasePath.replace(/\\/g, '\\\\')}",
        "--host",
        "localhost",
        "--port",
        "3050",
        "--user",
        "SYSDBA",
        "--password",
        "masterkey"
      ],
      "type": "stdio"
    }
  }
}
        </pre>
        <p>Press Ctrl+C to stop the server.</p>
      </body>
    </html>
  `);
});

// Start the HTTP server
server.listen(3000, () => {
  console.log('Server is running at http://localhost:3000');
  console.log('Open this URL in your browser to see instructions');
});

// Handle process exit
process.on('SIGINT', () => {
  console.log('Stopping MCP Firebird server...');
  mcpFirebirdProcess.kill();
  server.close();
  process.exit(0);
});
