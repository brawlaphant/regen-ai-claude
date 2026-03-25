# Community Discussion — MCP Setup and Integration

Slack conversation from the Regen Network team discussing MCP setup, known issues, and integration plans. Preserved here for historical context.

---

**Gregory** (Today at 8:54 AM):
> issue 1: Aneka.io is no longer an active explorer, so we need to update docs to reflect that fact. Only mintscan.io works now, or direct ledger / registry API interfaces.

**Gregory** (Today at 9:03 AM):
> It looks to me like the issue is the Regen KOI bot does not have the regen ledger MCP integration, so it is not really able to produce accurate real time queries of onchain data, so it is just making things up.

**Gregory** (Today at 9:15 AM):
> Here is a link to the chat, in case that's useful in improving MCP performance:
> https://chatgpt.com/share/e/69385920-f140-800d-931a-c9e707b083b3

**Darren Zal** (Today at 9:35 AM):
> The Regen KOI mcp is separate from the ledger mcp (that JuanCarlo started), we would combine them easily if you want.

**shawn** (Today at 9:41 AM):
> [screenshots of MCP output]

**shawn** (Today at 9:50 AM):
> @Gregory Can you tell me the prompt?

**Gregory** (Today at 9:54 AM):
> I understand that these are two separate MCPs. However our KOI certainly must be able to accurately query the params, credits and data onchain.

**Gregory** (Today at 9:58 AM):
> And/or we need a sub agent it can query for those requests in a routing system.

**Gregory** (Today at 9:58 AM):
> Here is the full output:
> https://docs.google.com/document/d/1C3Usgs6gLIaVKL8ZZCpqp4sVQFl-2B6guqkVim56Pww/edit?tab=t.0

**shawn** (Today at 9:59 AM):
> @Gregory I asked Claude Code which is connected to both MCPs:
> "Please discover the aggregate value of all credits that have ever been issued on the regen chain."

**Gregory** (Today at 10:00 AM):
> Nice. I need to get my Claude Code running etc. I still keep getting sucked into workflows instead of getting tooling set up!

**shawn** (Today at 10:00 AM):
> [screenshots of aggregate credit values]

**Gregory** (Today at 10:00 AM):
> Mind putting that into a .md or Google Doc or something?

**shawn** (Today at 10:00 AM):
> Sure.

**shawn** (Today at 10:01 AM):
> But we can add both MCPs to the KOI GPT and also tell the KOI GPT to not make up data.

**Gregory** (Today at 10:02 AM):
> Here was my original prompt:
> "What is the total number of credits, their credit class information, and the number of hectares of land managed that the total and each class represents, as well as their dollar value, live on regen ledger right now?"

**Gregory** (Today at 10:03 AM):
> That list of credits does not look complete to me. For instance it is missing Kulshun Carbon Trusts, biochar, Terrasos, Ecometric, and some others I think.

**Gregory** (Today at 10:04 AM):
> I had a call get canceled. I am going to review forum post and see if I can't get Claude Code running and get myself connected to both MCPs. Wish me luck!

**shawn** (Today at 10:06 AM):
> Because of limitation on post lengths I split the post into two. The first post is about architecture and motivation for KOI. The second post being put out this week will be about installation and usage. And I'm gathering good direction from this discussion now. I can start working on that post now and hopefully have it up tomorrow (possibly today).

**shawn** (Today at 10:36 AM):
> https://www.notion.so/regennetwork/Aggregate-Credit-Values-MCP-Test-2c425b77eda1806881e8ce7cb8da7569

**Gregory** (Today at 10:40 AM):
> Could you share details about how you set up Claude Code repos on your local machine? Just want to make sure I am doing that part in the best possible way.

**Gregory** (Today at 10:41 AM):
> Also @shawn you are now the highest level of user, so you should be able to go to town on the forum.

**shawn** (Today at 10:41 AM):
> Oh awesome! Thanks! Yeah I'll make a quick Notion doc now.

**Gregory** (Today at 10:41 AM):
> I can also make either you or Darren or both admins if you want, if we want to play with forum as a key knowledge repo and automate anything there.

**shawn** (Today at 10:42 AM):
> Sure perhaps you can make both of us admins.

**Gregory** (Today at 10:47 AM):
> Will do.

**Darren Zal** (Today at 10:51 AM):
> "Could you share details about how you set up Claude Code repos on your local machine?" Do you mean how you install the MCP servers to work with Claude Code? Or how to initialize a repo when working with Claude Code (create a CLAUDE.md etc)? Or both?

**shawn** (Today at 11:03 AM):
> This works for me for a fresh installation of three MCPs (KOI MCP, Regen MCP, and Python Regen MCP):
> https://www.notion.so/regennetwork/Claude-Code-MCP-Setup-2c425b77eda180729dc9cc377043c4ed

**shawn** (Today at 11:03 AM):
> I didn't include the registry MCP but I could include that as well.

**Darren Zal** (Today at 11:09 AM):
> Pros for cloning the repos:
> - You can modify the source code
> - Test changes before they're published
> - Run from a specific branch or commit
> - Useful for development/debugging
>
> For the KOI MCP you can also install it for Claude Code with:
> `claude mcp add regen-koi npx regen-koi-mcp@latest`
>
> Pros:
> - One command, instant setup
> - Auto-updates (always gets @latest from npm)
> - Works globally across all projects
>
> BUT, you cannot modify the code.

**shawn** (Today at 11:10 AM):
> I historically find that `claude mcp add` command very brittle, often not working. I find the cloning method to be more reliable. But if it works that's great, the auto-updating is very valuable.

**shawn** (Today at 11:10 AM):
> I appended a second version in the doc that includes the registry MCP.

**Darren Zal** (Today at 11:15 AM):
> I just tested it and it worked for me, but please let me know if it is not working. Another thing is that the local clone approach with `.mcp.json` is project-scoped, not global, right? So the MCPs would only be available when you're in that directory (regen-mcps, or its subdirectories)?
>
> I think to get them to work from any directory you could use `claude mcp add-json` to add them to global settings:
>
> ```bash
> # 1. Create a permanent home for the MCPs
> mkdir -p ~/regen-mcps/mcps
> cd ~/regen-mcps
>
> # 2. Clone the MCP repos
> git clone https://github.com/regen-network/mcp.git mcps/mcp
> git clone https://github.com/gaiaaiagent/regen-koi-mcp.git mcps/regen-koi-mcp
> git clone https://github.com/gaiaaiagent/regen-python-mcp.git mcps/regen-python-mcp
> git clone https://github.com/gaiaaiagent/regen-registry-review-mcp.git mcps/regen-registry-review-mcp
>
> # 3. Build the MCP servers
> cd mcps/mcp && npm install && npm run build && cd ../..
> cd mcps/regen-koi-mcp && npm install && npm run build && cd ../..
> cd mcps/regen-registry-review-mcp && uv sync && cp .env.example .env && cd ../..
>
> # 4. Add to global Claude Code settings
> claude mcp add-json regen-koi '{"command":"node","args":["$HOME/regen-mcps/mcps/regen-koi-mcp/dist/index.js"],"env":{"KOI_API_ENDPOINT":"https://regen.gaiaai.xyz/api/koi"}}'
> claude mcp add-json regen '{"command":"node","args":["$HOME/regen-mcps/mcps/mcp/server/dist/index.js"],"env":{"NODE_ENV":"production"}}'
> claude mcp add-json regen-network '{"command":"uv","args":["run","--directory","$HOME/regen-mcps/mcps/regen-python-mcp","python","main.py"],"env":{"PYTHONPATH":"$HOME/regen-mcps/mcps/regen-python-mcp/src"}}'
> claude mcp add-json registry-review '{"command":"uv","args":["run","--directory","$HOME/regen-mcps/mcps/regen-registry-review-mcp","python","-m","registry_review_mcp.server"],"env":{"REGISTRY_REVIEW_LLM_EXTRACTION_ENABLED":"true"}}'
> ```
>
> Now the MCPs are available in any directory when you run Claude Code.
