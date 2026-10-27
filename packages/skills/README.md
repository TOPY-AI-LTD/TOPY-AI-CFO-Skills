# @topy-ai/cfo-skills

The [TOPY.AI](https://topy.ai) AI CFO skills for **Claude Code, Codex, Pi, Cursor, Gemini CLI, OpenCode, GitHub Copilot, Windsurf** and other coding agents: 22 skills that keep a small company's books and finances the way a senior CFO, accountant and bookkeeper would — Stripe into QuickBooks, bank feed matching and bank rules (driven in Chrome where QuickBooks has no API), month-end close, management accounts, reports to the other c-levels, runway and UK compliance — powered by the TOPY.AI CFO MCP server.

```sh
npx @topy-ai/cfo-skills install                  # this project, for the agents set up here
npx @topy-ai/cfo-skills install -g               # your user: every project
npx @topy-ai/cfo-skills install -g -a codex,pi   # pick the agents
npx @topy-ai/cfo-skills install --mcp            # also add the CFO MCP server to .mcp.json (Claude Code)
```

Pi users can also install it as a Pi package: `pi install npm:@topy-ai/cfo-skills`.

## Supported platforms

| Platform | Install | MCP server |
|---|---|---|
| **Claude Code** | `npx @topy-ai/cfo-skills install -a claude`, or the plugin marketplace | `install --mcp` writes `.mcp.json`, or the `topy-ai-cfo` plugin |
| **Codex** | `npx @topy-ai/cfo-skills install -a codex`, or `codex plugin marketplace add TOPY-AI-LTD/TOPY-AI-CFO-Skills` | `codex mcp add topy-cfo --url https://topy.ai/mcp/cfo` |
| **Pi** | `pi install npm:@topy-ai/cfo-skills` | `npx -y @topy-ai/cfo-mcp` |
| **Cursor, Gemini CLI, OpenCode, Copilot, Windsurf and others** | `npx @topy-ai/cfo-skills install -a <agent>` | Remote URL `https://topy.ai/mcp/cfo` |
| **Claude.ai, Claude Desktop, ChatGPT** | Upload a skill folder as a zip | Custom connector `https://topy.ai/mcp/cfo` |

The QuickBooks bank-feed and bank-rule skills drive QuickBooks' own web pages in Chrome (Claude in Chrome or another browser agent); you sign in yourself, and every key press is checked first.

## Agents and folders

`--agent` (`-a`) takes one or more agent ids, comma-separated. `auto` (the default) installs for the agents already set up in that scope (their folders exist), else for Claude Code; `all` installs for every agent below. Agents that share a folder get one copy.

| `--agent` | Agent | Project scope | User scope (`-g`) |
|---|---|---|---|
| `claude` | Claude Code | `.claude/skills` | `~/.claude/skills` (`CLAUDE_CONFIG_DIR`) |
| `codex` | Codex | `.agents/skills` | `~/.agents/skills` |
| `pi` | Pi | `.agents/skills` | `~/.agents/skills` |
| `cursor` | Cursor | `.agents/skills` | `~/.cursor/skills` |
| `gemini` | Gemini CLI | `.agents/skills` | `~/.gemini/skills` |
| `opencode` | OpenCode | `.agents/skills` | `~/.config/opencode/skills` |
| `copilot` | GitHub Copilot | `.agents/skills` | `~/.copilot/skills` |
| `amp` | Amp | `.agents/skills` | `~/.config/agents/skills` |
| `cline` | Cline | `.agents/skills` | `~/.agents/skills` |
| `windsurf` | Windsurf | `.windsurf/skills` | `~/.codeium/windsurf/skills` |
| `goose` | Goose | `.goose/skills` | `~/.config/goose/skills` |
| `kiro` | Kiro | `.kiro/skills` | `~/.kiro/skills` |
| `qwen` | Qwen Code | `.qwen/skills` | `~/.qwen/skills` |
| `trae` | Trae | `.trae/skills` | `~/.trae/skills` |
| `roo` | Roo Code | `.roo/skills` | `~/.roo/skills` |
| `kilo` | Kilo Code | `.kilocode/skills` | `~/.kilocode/skills` |
| `augment` | Augment | `.augment/skills` | `~/.augment/skills` |
| `droid` | Factory Droid | `.factory/skills` | `~/.factory/skills` |
| `openhands` | OpenHands | `.openhands/skills` | `~/.openhands/skills` |
| `antigravity` | Antigravity | `.agent/skills` | `~/.gemini/antigravity/skills` |

`npx @topy-ai/cfo-skills agents` prints this table and marks the agents found on your machine. The install record lives in `<project>/.topy-ai/cfo-skills-install.json`, or `~/.config/topy/cfo-skills-install.json` for the user scope (`TOPY_HOME`). Commit the project's skill folders and `.topy-ai/` to share the skills with your team.

## Pick what you need

```sh
npx @topy-ai/cfo-skills list                                     # every skill, by category
npx @topy-ai/cfo-skills install --category stripe,quickbooks     # categories (or plugin names like topy-ai-cfo-quickbooks)
npx @topy-ai/cfo-skills install qbo-bank-rules topy-cfo-runway   # single skills
```

Categories: `core` (connect, brief, goals, setup — always installed), `bookkeeping`, `stripe`, `quickbooks`, `reporting`, `compliance`.

## Connect the MCP server

`https://topy.ai/mcp/cfo` — the same TOPY.AI account and sign-in (OAuth) as the AI CEO; Stripe and QuickBooks are connected once in the TOPY.AI dashboard. For scheduled agents, an API key as `TOPY_API_KEY`.

```sh
npx @topy-ai/cfo-skills mcp -g     # prints the commands for Claude Code, Codex, Gemini CLI, Cursor and Pi
```

## Update and remove

```sh
npx @topy-ai/cfo-skills@latest update          # this project (-g for your user)
npx @topy-ai/cfo-skills remove qbo-reports     # or --all
npx @topy-ai/cfo-skills doctor
```

Files you edited are kept on update and remove unless you pass `--force`. Every command accepts `--dry-run`. The CEO and CFO skill packages install side by side; each keeps its own record.

## Standalone install

```sh
git clone --depth 1 https://github.com/TOPY-AI-LTD/TOPY-AI-CFO-Skills.git
mkdir -p ~/.agents/skills
cp -R TOPY-AI-CFO-Skills/plugins/*/skills/* ~/.agents/skills/
```

Or `npx skills add TOPY-AI-LTD/TOPY-AI-CFO-Skills -a <agent>`. Claude Code plugins: `/plugin marketplace add TOPY-AI-LTD/TOPY-AI-CFO-Skills`, then `/plugin install topy-ai-cfo-all@topy-ai-cfo`.

Source, skills index and changelog: [TOPY-AI-LTD/TOPY-AI-CFO-Skills](https://github.com/TOPY-AI-LTD/TOPY-AI-CFO-Skills).

## License

MIT © TOPY AI LTD.
