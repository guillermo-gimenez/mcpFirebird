# MCP Firebird

[![smithery badge](https://smithery.ai/badge/@PuroDelphi/mcpFirebird)](https://smithery.ai/server/@PuroDelphi/mcpFirebird)

Implementation of Anthropic's MCP (Model Context Protocol) for Firebird databases.

## Example Usage

https://github.com/user-attachments/assets/e68e873f-f87b-4afd-874f-157086e223af

## What is MCP Firebird?

MCP Firebird is a server that implements Anthropic's [Model Context Protocol (MCP)](https://github.com/anthropics/anthropic-cookbook/tree/main/model_context_protocol) for [Firebird SQL databases](https://firebirdsql.org/). It allows Large Language Models (LLMs) like Claude to access, analyze, and manipulate data in Firebird databases securely and in a controlled manner.

## Key Features

- **SQL Queries**: Execute SQL queries on Firebird databases
- **Schema Analysis**: Get detailed information about tables, columns, and relationships
- **Database Management**: Perform backup, restore, and validation operations
- **Performance Analysis**: Analyze query performance and suggest optimizations
- **Multiple Transports**: Supports STDIO and SSE (Server-Sent Events) transports
- **Claude Integration**: Works seamlessly with Claude Desktop and other MCP clients
- **VSCode Integration**: Works with GitHub Copilot in Visual Studio Code
- **Security**: Includes SQL query validation and security configuration options

### Manual Installation
```bash
# Global installation
npm install -g mcp-firebird

# Run the server
npx mcp-firebird --database /path/to/database.fdb
```

For backup/restore operations, you'll need to install the Firebird client tools. See [Complete Installation](./docs/installation.md) for more details.

For VSCode and GitHub Copilot integration, see [VSCode Integration](./docs/vscode-integration.md).

## Basic Usage

### With Claude Desktop

1. Edit the Claude Desktop configuration:
   ```bash
   code $env:AppData\Claude\claude_desktop_config.json  # Windows
   code ~/Library/Application\ Support/Claude/claude_desktop_config.json  # macOS
   ```

2. Add the MCP Firebird configuration:
   ```json
   {
     "mcpServers": {
       "mcp-firebird": {
         "command": "npx",
         "args": [
           "mcp-firebird",
           "--host",
           "localhost",
           "--port",
           "3050",
           "--database",
           "C:\\path\\to\\database.fdb",
           "--user",
           "SYSDBA",
           "--password",
           "masterkey"
         ],
         "type": "stdio"
       }
     }
   }
   ```

3. Restart Claude Desktop

### With SSE Transport

```bash
# Start with SSE transport
npx mcp-firebird --transport-type sse --sse-port 3003 --database /path/to/database.fdb
```

## Quick Installation via Smithery

To install MCP Firebird for Claude Desktop automatically via [Smithery](https://smithery.ai/server/@PuroDelphi/mcpFirebird):

```bash
npx -y @smithery/cli install @PuroDelphi/mcpFirebird --client claude
```


## Documentation

For more detailed information, check the following documents:

- [Complete Installation](./docs/installation.md)
- [Configuration Options](./docs/configuration.md)
- [Available Tools](./docs/tools.md)
- [Docker Configuration](./docs/docker.md)
- [Usage from Different Languages](./docs/clients.md)
- [Security](./docs/security.md)
- [Troubleshooting](./docs/troubleshooting.md)
- [Use Cases and Examples](./docs/use-cases.md)


## Support the Project

### Donations

If you find MCP Firebird useful for your work or projects, please consider supporting its development through a donation. Your contributions help maintain and improve this tool.

- **GitHub Sponsors**: [Sponsor @PuroDelphi](https://github.com/sponsors/PuroDelphi)
- **PayPal**: [Donate via PayPal](https://www.paypal.com/donate/?hosted_button_id=KBAUBYYDNHQNQ)

![image](https://github.com/user-attachments/assets/d04cf0eb-32a8-48a7-9324-c02af5269370)


### Hire Our AI Agents

Another great way to support this project is by hiring our AI agents through [Asistentes Autónomos](https://asistentesautonomos.com). We offer specialized AI assistants for various business needs, helping you automate tasks and improve productivity.

### Priority Support

⭐ **Donors, sponsors, and clients receive priority support and assistance** with issues, feature requests, and implementation guidance. While we strive to help all users, those who support the project financially will receive faster response times and dedicated assistance.

Your support is greatly appreciated and helps ensure the continued development of MCP Firebird!

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
