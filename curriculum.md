# Building with AI — Curriculum
## High-level mental models, with prompts to go deeper

Thirteen chapters — a ten-minute toolkit chapter 0 and twelve standalone chapters — each delivered as a scrollable page and a short PDF. A chapter teaches one mental model at high altitude, describes what usually goes wrong when the assistant writes that part, and closes with prompts the reader can hand to their assistant to go deeper. The reader ends up able to place any problem on a map, and with a method for deepening any region of it on demand.

**Who it's for:** people building software with AI assistance who don't read code. No requirement to read code fluently, ever — where a check needs evidence, the chapter says what to run and what the result means. Some willingness to run a request and read the answer.

**What it assumes about the reader's tools.** Nothing is built in the course: the reader learns models and gets prompts for investigating a project, and runs them when they have one. The prompts assume an assistant that can read the project — a tool that works inside the files (Claude Code, Cursor, and their equivalents) rather than a chat window; a chat window works with the relevant files pasted first, and its lists cover only what was pasted. Chapter 0 says this to the reader and carries the three capabilities most checks need (a disposable database copy, re-sending a request from devtools, a local client build) as prompts the reader hands to the assistant, so no check assumes a skill the course hasn't provided a prompt for. The examples lean on one common stack — a hosted database with row-level policies (Supabase), a bundled frontend with a public-variable prefix, a payment provider with public and secret keys — because that's where the audience mostly builds. Every model is stated so that it holds on other stacks, and chapter 6 carries the branch for a database without policies.

**Companion files:** `tone-of-voice.md` (governs all prose), `chapters/chapter-NN-slug.md` (chapters 00–12), `reference/authorization-lab-manual.pdf` (a five-sitting lab manual on authorization — the depth track chapter 6 points to, and the typographic starting point for the pages), and `design/` (the rendering pipeline: `README.md` explains the control surface and the build). `CLAUDE.md` orients new sessions.

---

# The chapter template

Five beats, in order. Length follows the assert-once rule rather than a target: a chapter is as long as its model, its entries, and its prompts need, and the drafted chapters have run 1,300–3,000 words. A chapter that runs long is checked for restatement before anything else.

### 1. Lede
One paragraph: the silent failure or expensive mistake this chapter's model prevents. No throat-clearing about why the topic matters in general.

### 2. The model — roughly 60% of the chapter
The mental model in prose, with one or two diagrams. High altitude: the reader should be able to hold the whole thing after one read, and no section should require doing anything. Concrete named things (a key, an error message, a dashboard toggle) appear as recognition anchors, not as instructions.

### 3. What goes wrong — roughly 25%
The failure entries for this surface. Each entry has four fields:

> **Name of the failure** — one sentence on what it is.
> *Tell* — what gives it away, one line, for the times the reader does look.
> **Ask** — the prompt that surfaces it: an enumeration with a completeness criterion the reader can judge without reading code.
> **Check** — the evidence that settles it, runnable in minutes.

The *ask* field is the one that takes work to write. A vague question has no failing answer — "are there any authorization gaps?" returns "this looks good" reliably. What works is asking for a list whose shape the reader can judge without understanding its contents: a completeness criterion ("flag any table with fewer than four"), a forced choice ("session or request"), or a required admission ("say none where there isn't one").

The *tell* is the field the audience uses least, since it needs a look at code; the page renders it last and muted, after the ask and the check.

The section ends with the surface's **direct test** where one exists — the single check that settles most of the entries at once.

### 4. Going deeper — roughly 15%
Three to five prompts, each built on one of the shapes below, each with a one-line note on what a good response looks like — so the reader can tell whether the prompt is working and re-ask when it isn't.

### 5. Footer
Related chapters. Where the full-depth version lives, when one exists.

### Authoring rules
- `tone-of-voice.md` governs all prose, headings and subtitles included. The default register is the one used for defining terms: plain, specific, no image.
- Write for durability. Each chapter's model rests on a principle that doesn't depend on how capable current models are — trust boundaries, verification economics, independence of review. Current-model behaviour appears as a measured instance ("measure it on your own tool, re-measure when it changes"), never as the foundation, so the chapter survives the tools improving.
- Every *ask* and every going-deeper prompt is tested before shipping, and the test has a control: the prompt runs against a project with a planted finding, and passes only if the finding appears in the list. A prompt that returns reassurance instead of a checkable artifact, or a list that misses the plant, gets rewritten. A test against a role-played assistant is a smoke test and is recorded as one; the shipping bar is a real tool on a real repository.
- Chapters are standalone. A chapter that leans on another's model names it with a chapter reference in one line rather than re-teaching it.
- A check that needs a capability the reader may not have — a test copy, devtools, a local build, a named commit — points at the chapter 0 prompt that provides it, or hands the setup to the assistant in the check itself ("ask it for a way to run requests as a specific test user"). A check that silently assumes the skill fails the audience.
- Diagrams are marked `[DIAGRAM: …]` in draft — every chapter carries at least one — and produced at the design pass, in the typographic style of `reference/authorization-lab-manual.pdf`.

### The prompt shapes
The going-deeper sections draw from a fixed grammar, because vague deepening prompts ("teach me more about databases") produce a lecture, and these produce artifacts the reader can judge:

1. **Audit** — an enumeration over the reader's own project with a completeness criterion. "List every table with its policies for all four operations; flag any with fewer than four."
2. **Grounded explanation** — explain the concept using the reader's own schema or code as the worked example.
3. **Walk the failure path** — narrate step by step what happens when a specific bad request arrives, stating at each step what could stop it and whether anything does. Name every path the request could take, including ones the platform generates automatically — a walk over only the hand-written routes can end in a false "safe."
4. **Prediction quiz** — the model poses one scenario at a time, the reader commits to an answer, the model corrects. The commit-then-compare step is where the learning happens.
5. **Build a toy** — a guided 20–30 minute micro-exercise that makes one mechanism observable.

Every audit is only as trustworthy as its ability to find something, so chapter 12 teaches the reader to plant a control — seed one known finding and see whether the list surfaces it — and the same rule governs how the prompts are tested here.

---

# The chapters

Each chapter spec below carries its scope (the concepts the model beat covers), the failure entries that live in it (name plus gist — the four fields are written in the chapter), and any structural content the chapter is built around. This document is the complete source for authoring; no other curriculum draft is needed.

### 0. The toolkit

How the course is used, and the prompts every other chapter assumes you have.

**Scope.** Asks against checks. What an assistant needs to investigate (a tool that reads the files; the what's-my-stack prompt). Reading a list for its shape — the six enumeration patterns the whole series' asks are built from: completeness criterion, state the source, say none if absent, walk the failure path, list dependencies, plant a control — and the anti-patterns. The three capabilities checks assume, each handed to the assistant as a prompt: a copy of the database you can break, re-sending a request from the browser, building the client the way production does. What a finding is (a conversation, not a verdict).

**Entries.** None. Going deeper holds the four toolkit prompts: D1 a copy I can break, D2 re-send a request, D3 build the client, D4 find the rules file (named per tool).

**Direct test.** None; the chapter is ten minutes and precedes the first.

## Part A — The machine

### 1. Client and server

The machines your app runs on, and which of them you control.

**Scope.** Source code against a running process, and where code executes: laptop, server, browser, phone. The two sides of every app — the visitor's side (your interface code, the key it ships, the browser's devtools, every request it sends) and your side (the server, the database). A request as a thing anyone can send by hand, with the parts they don't want removed, using tools that come free with every browser — the single fact that explains why browser-side rules protect nothing. Environments in the small: files, environment variables, ports, processes. What people mean by "a stack."

**Entries.**
- *Validation on the client only* — rules present in the form and absent from the server; a request sent directly, with a value the form would reject, gets through.
- *Unvalidated upload* — file type and size checked nowhere on the server, so the form's file picker is the only filter.
- *The value computed on their side* — a total, a price, a role, or the current user's id arriving from the browser and written to a row as received.

**Direct test.** Send the request a form would have sent, from the browser console, with one value the form forbids.

**Footer.** Points at chapter 12 as the method every going-deeper section uses, for readers already shipping.

### 2. Data modelling

Schema decisions, and why they're the expensive ones to change.

**Scope.** Entities, relationships, and keys at recognition depth. Nullability, and columns whose emptiness means different things in different rows. Making invalid states impossible to represent. State machines as named sets of allowed transitions. Time in data: timestamps, timezones, soft deletes, versioning. What the schema holds about people — personal data as a liability with a retention and a deletion path. Why schema decisions are the expensive ones — everything else can be rewritten, a table with real rows has to be migrated, and a migration is the cost of having guessed wrong. The JSON-blob-versus-columns trade. What happens when tables get big: an index as the difference between fast at a thousand rows and dead at a million, and queries with no upper bound.

**Entries.**
- *Boolean where a table belongs* — a flag like `repeat_weekly` standing in for something with variants; the second variant costs a migration plus a backfill.
- *Invalid states representable* — column combinations the schema permits that shouldn't exist, with nothing preventing them.
- *Current state stored alongside history* — a `status` column plus a log table that also implies status, with nothing keeping them in sync.
- *Destructive migration presented as additive* — a rename, type change, or dropped default inside a migration described as adding a feature.
- *Soft delete that still appears in reads* — a `deleted_at` column that some queries forget to filter on.
- *Timezone stored inconsistently* — some timestamps local, some UTC, indistinguishable in the rows.
- *Missing index on a filtered column* — the list view that slows as the table grows.
- *Unbounded query* — no pagination, so the response grows with the table until something breaks.
- *Personal data with no reason and no exit* — columns about a person kept with no stated purpose and no path that removes them when the account goes. Sits fifth, before the scale entries, since it's about the shape and a reader at a few hundred rows skims the scale entries.
- *Orphaned files* — a row deleted while the file it pointed at lives on in storage.

**Direct test.** Ask for the column combinations the schema permits but the product forbids, then insert one and see whether anything stops it.

### 3. Source of truth

Where each piece of data is stored, and what happens when copies disagree.

**Scope.** Stored state against derived state, and the cost of each. The server's copy against the client's copies, and why treating fetched data as local state is where most duplication starts. Caching and staleness. Two requests in flight at once, and why the result then depends on network timing. Idempotency as a concept: an operation safe to run twice. The URL as a place state can live, so a filtered view is linkable and the back button behaves.

**Entries.**
- *One value, three copies* — server data held in a fetch cache, component state, and a form's initial value, each written by different code.
- *Optimistic update with no rollback* — the screen updates before the server answers, and a rejection changes nothing the user can see.
- *Failure after the user has typed* — a submission that fails after long input, with the input gone.
- *State that belongs in the URL* — filters and selections held in memory, so refresh and back both lose them.

**Direct test.** Change the value in one place, then look at the others; block a request in devtools and watch what the screen claims.

### 4. The request lifecycle

What actually happens between an action and its effect.

**Scope.** A request end to end: interface, server logic, data access, response — and layering, with why code that crosses layers degrades a codebase. Writes that must go together, and the transaction as the mechanism that makes them all-or-nothing. What an API is, and resource thinking at recognition depth. Background work — jobs, queues, schedules — as the answer to anything that outlives a request, and webhooks as other systems' way of calling you. What each endpoint costs per call and who can call it: the endpoints that send, spend, or create as a surface anyone with a script can drive, and the guards (login, rate limit, spend ceiling) as things that exist or don't.

**Entries.**
- *Slow work done inside the request* — an email send, file processing, or third-party call in the request path with the user waiting on it.
- *Scheduled work on a host that won't run it* — a background job or long-running task on a platform with execution limits, which works locally and dies deployed.
- *Half a write* — several rows that must change together, written one at a time with no transaction grouping them.
- *The unmetered endpoint* — a route that sends, spends, or creates per call, open to anyone at any rate.

**Direct test.** Ask for the endpoint inventory — every request the server answers, grouped by resource, with what each reads and writes and who can call it — and judge it the way a schema is judged.

### 5. Production

What a server is, and what the hosting choice decides for you.

**Scope.** What a server is: a computer you rent, usually running Linux. The hosting spectrum organized by how much is decided for you — managed frontend platform, app platform, backend-as-a-service, rented box, cloud primitives — where the left end is fast, opinionated, and expensive at scale, and the right end is cheap, flexible, and you own the pager. Serverless against long-running, including cold starts, execution limits, and statelessness. Environments (local, staging, production) and deploys, and why "works locally" and "works deployed" are different claims. DNS as a lookup table you edit; TLS certificates at recognition depth. Rollback. Backups, and why an untested backup isn't one. Knowing when it's broken: logs, error tracking, and alerts at recognition depth; what a failure records and where; personal data and secrets landing in logs; what an error should and shouldn't show the user. Cost models and exit cost.

**Entries.**
- *No rollback path* — a deploy that can't be undone except by fixing forward under pressure.
- *Untested backup* — a backup that has never been restored, whose existence is therefore a claim rather than a fact.
- *Alert with no recipient* — monitoring that notifies a channel nobody reads.
- *Failure that leaves no trace* — a background job or external call that fails and records nothing.
- *The error shown in full* — stack traces, file paths, or query text delivered to whoever triggered the failure.

**Direct test.** Restore the most recent backup somewhere disposable and open the result.

## Part B — The surfaces where it bites

### 6. Authorization — **the pilot chapter**

Who can see what, and where generated code leaves the check out.

**Scope.** Authentication against authorization — who you are against what you may do to this row. The four places a check can live (interface, browser code, server, database) and why only the last two are real. Database policies as filters the caller can't remove; enabling protection and writing rules as separate steps; permissions as per-operation; the master key that bypasses everything. The branch for a stack whose database has no policies: the check lives in the one layer every path passes through. Authentication briefly — the session token, its expiry and logout, and the other front doors (reset, magic link, invitation, email change, provider sign-in), each with its own proof of control. Why generated code lands on the fake two.

**Entries** — the nine shapes: *the UI-only gate; authenticated but not authorized; new table, protection off; the master key used to clear an error; partial coverage; identity taken from the request; the unprotected neighbour; the public bucket* (files served to anyone with the link while the rows pointing at them are protected); *the second front door* (a recovery or invitation path that establishes a session with weaker proof than login).

**Direct test.** Sign in as user B, request user A's row by id; an error or empty result is the pass.

**Depth version:** `reference/authorization-lab-manual.pdf`, the five-sitting lab manual.

### 7. Secrets and configuration

Where keys live, and which of them must never reach the browser.

**Scope.** Configuration against code, and why they separate. Where keys live: dashboard variables, `.env` files, what gets committed and what never does. Public keys against bypass keys — one designed to ship in the browser, one that must never reach it — and how to tell which kind a given key is. The public-variable prefix as a one-way door into the client bundle. What rotating a key means, and why a key that was ever client-visible is treated as compromised regardless of whether anyone found it.

**Entries.**
- *Secret reaching the client* — a key with a public-variable prefix, or a secret in a file the bundler includes.
- *Bypass key doing ordinary work* — the privileged key used where the public key should be, usually to make a permissions error go away (shared shape with chapter 6).
- *Live key in a shared artifact* — a real credential in a file about to be committed, pasted into an issue, or sent in a message.

**Direct test.** Search the deployed client bundle for each secret's value.

### 8. Injection

Where user text becomes code, and why the receiver can't tell the difference.

**Scope.** Three interpreters an app hands text to — the database (a query), the browser (a page), a language model (a prompt) — and the single fact that each reads one finished text with no marking of which part was the developer's and which the visitor's. The three instances as one thing: SQL injection, cross-site scripting, prompt injection. Keeping the boundary structurally — parameterized queries, the framework's escaping on output — and why generated code opts out (concatenation is shortest; rich output is fastest by the dangerous call). Prompt injection as the instance with no complete fix, so the defence is containment: the model's tools and permissions match the task, consequential actions go through a confirmation the model can't give itself, and the model's output is treated as untrusted input.

**Entries.**
- *Text pasted into a query* — a query built by joining strings with visitor text among them.
- *User text rendered as page code* — stored text placed into a page without escaping.
- *Visitor text inside a prompt that can act* — a model that reads outside material and has tools worth hijacking.
- *Model output trusted as data* — the model's reply used to build a query, a command, a page, or a permissions decision.

**Direct test.** Type a short piece of markup into every free-text field and look for it rendered; put a short instruction into everything the model reads and see whether it's followed.

### 9. Third-party integrations

Calling services you don't control, and handling their failures.

**Scope.** What calling an external service means: their uptime, their limits, their changes, your user's experience. Timeouts, retries, and backoff. Partial failure — the call that half-worked — and what the user sees when the other side doesn't answer. Rate limits, theirs on you, with a pointer to chapter 4 for yours on callers. What they charge: per-call cost, the cap the provider lets you set, the alert before it — the surprise bill as this chapter's failure arriving as money. Idempotency applied: retrying a call that creates something, and why running it twice must produce one result. API credentials at recognition depth (keys, tokens, OAuth as "logging in on your behalf"). Their code in your process — a library as a service that runs as you, with its own calendar and its own maintainer. What you send them — personal data leaving to services under their retention and rules. The real cost of adding a dependency.

**Entries.**
- *No handling of partial failure* — an external call with no timeout, no retry, and no failure branch, so the other side's bad day becomes your blank screen.
- *Retry without idempotency* — a retry wrapping a call that creates something, so one purchase becomes two.
- *The uncapped service* — a paid call with no ceiling on what it can cost.
- *The unexamined dependency* — a library added for one function, with nobody having asked what else it does or who maintains it.
- *User data leaving without a decision* — personal data sent to a service that didn't need it.

**Direct test.** Point the integration at an address that doesn't answer, and run the creating call twice with the same input.

## Part C — The method

### 10. Version control

Commits, branches, and why being able to revert makes risky changes cheap.

**Scope.** Version control at mental-model depth: commits as snapshots of the whole project, branches as movable pointers, history as the thing that makes any state recoverable. Why the ability to revert is what makes it cheap to let a model try something large — and why small, frequent commits matter more when code arrives in big batches you didn't type. Review as verification even when working alone. The recovery moves, at recognition depth: restore one file, revert one commit, abandon a branch.

**Entries.**
- *Generation on top of uncommitted work* — a large generation started with changes not yet committed, so a bad result can't be cleanly thrown away and takes good work with it.
- *History rewritten as cleanup* — force-pushes, amends, or squashes appearing without being asked for, replacing snapshots the safety net stood on.

**Direct test.** Before accepting a big change, name the commit you'd return to if it's wrong; if there isn't one, that's the finding.

### 11. The loop

The working cycle, and the recurring failures of delegated work.

**Scope.** The cycle: specify, assemble context, generate, verify, integrate, clean up, record the decision. Task sizing, where the unit of work equals the unit you can verify. The doom loop — the same failure returning in new forms, a growing patch count — and the exit, which is usually a fresh session and a better spec rather than one more patch. Context hygiene: fresh session against long thread, and what to re-establish at the start of each. Cleanup as scheduled work, since AI-assisted codebases accumulate parallel copies of the same helper, conventions that drift between files written weeks apart, and libraries nothing imports. House rules in the file the assistant reads, and what makes a rule effective — a rule that requires stating something ("say which policy protects this path") turns a silent omission into a sentence you can notice. Decisions that stay yours because they depend on information the model doesn't have: what the product does and for whom, the shape of your domain, which side of a presented trade-off to take — and noticing when you've delegated one by accident, usually by accepting the first option offered.

**Entries** (the model's failures rather than the code's).
- *Silent scope creep* — the change touches things the request never mentioned.
- *Second copy of an existing helper* — a new implementation of something the codebase already had, because the original wasn't findable.
- *Convention ignored* — the change works and matches nothing around it.
- *Deletion not mentioned in the summary* — code removed, summary silent.
- *Plausible but wrong* — code that reads correctly and does something adjacent to what was asked.

**Direct test.** Ask for three lists: "everything this change touched that the request didn't mention, everything it deleted, and everything it added to the dependencies." Three empty lists are committable; anything on any of them is a conversation.

### 12. Verification

Deciding how much verification a change gets, from what it touches.

**Scope.** Claims against evidence: "I've added policies to all tables" becomes a count you can read, "it handles errors now" becomes a blocked request and a screenshot. The three forms of evidence available without reading code — behaviour you observe, assertions you execute, output you inspect — and the recognition that everything else is a report from the party that did the work. What an assertion is, at recognition depth: one action, one claim, pass or fail, re-runnable — and the one property judgeable without reading it, whether any change could make it fail. Reports from the author as a general problem — independent review predates any particular tool — with the fresh session as the cheap independent reviewer, and the size of the gap measured on the reader's own setup rather than assumed.

The four verification levels:

| Level | What it means | Cost | Lasts |
|---|---|---|---|
| **1** | Evidence you produce yourself — run a request, read the rows, look at the screen | Minutes | That moment |
| **2** | Assertions the model writes and you execute, which pass or fail | Minutes, once written | Every run after |
| **3** | The model's report on its own work, plus a spot check | Seconds | No |
| **4** | Nothing | None | — |

The order is cost, not strength: level 1 is the most direct evidence and the least durable, level 2 is what keeps a claim true after the day it was checked, and the two are complements.

Risk tiering — the level is decided by what the change touches, in advance:

| Tier | Applies to | Level |
|---|---|---|
| **A** | Authorization, money, deletion, migrations, secrets, anything crossing the trust boundary | 1 at the change, then 2 kept |
| **B** | Business rules, state machines, calculations, anything with a correct answer | 2 |
| **C** | Interface states, styling, copy, internal tooling | 3 |
| **D** | Prototypes, throwaway scripts, local experiments | 4 |

Then the harder parts: changes that span tiers take the highest tier they touch; tiers B–D relax as measured reliability improves while tier A doesn't, since its failures are silent and severe; and compounding — small unreviewed choices are individually fine and jointly produce a codebase you no longer know the contents of, which is what scheduled audits are for, since those failures never produce a symptom on their own.

The enumeration patterns live in chapter 0; this chapter references them in one line, names *plant a control* as the one to apply before trusting any list, and keeps the note on where to ask (a fresh session; an assistant that reads the project). The no-tests-yet on-ramp: one assertion for the most sensitive claim, which D5 opens with.

**Entries.** The verifying habits rather than the code: *the vague question; asking the author; the proxy green* (including a test no change could make fail); *tier A on autopilot*. Its going-deeper section turns the method on the reader: tier your last twenty changes and note which were tier A and got tier C treatment; audit your tests for the change that would make each fail.

---

**Reading order.** Chapter 0 first (ten minutes), then chapter 1, since chapters 6, 7 and 8 assume the trust boundary. A reader who is already shipping and arrives worried reads chapter 6 next — it's where a real incident gets a real answer — and chapter 12 after a first win rather than second: read cold it's forward references and a method with nothing yet to apply it to (the student-persona review in `reviews/` found this the likeliest abandonment point). The index page says so.

---

# Deliberately out

Interface states, forms beyond validation, styling, and design systems: their failures are visible on screen, announce themselves quickly, and cost little to fix late, so they're learnable on encounter — and chapter 12 teaches the method for deepening any topic on encounter, which is the mechanism that makes cutting them safe. Design tokens, the one styling idea with leverage (one edit moves every button), fits as a going-deeper prompt in chapter 11 if anywhere.

Testing beyond recognition depth — frameworks, fixtures, coverage, mocking — stays out; what the method needs from tests (what one is, whether it can fail, which tier A behaviour has none) lives in chapter 12. Performance and analytics stay out on the on-encounter grounds, with their recognition-level ideas folded into chapters 2 and 11 where they earn a paragraph.

The login mechanism itself — password storage, token signing, session libraries — is left to the platform, since it's the part generated code least often gets wrong; chapter 6 covers what surrounds it. Privacy law by jurisdiction is out; chapters 2, 5 and 9 carry the durable version (know what you hold about people, how long, where it goes, and how it leaves).

---

# Build order

1. **Pilot** — the authorization chapter, reshaped from the lab manual. Done: `chapters/chapter-06-authorization.md`.
2. **Author the chapters.** Done: all twelve drafted in `chapters/`. Chapter 8 (injection) was added after a critical review found injection — SQL, script, and prompt — absent from the set; the same review added authentication's front doors and the public bucket to chapter 6, transactions and the unmetered endpoint to chapter 4, observability to chapter 5, dependencies and personal data leaving to chapter 9, personal data held to chapter 2, a third entry to chapter 1, and the assertion section, the durability column, the control pattern and the test audit to chapter 12. Chapters 1 and 12 were revised once for register — performing headlines and rhythm tails replaced with descriptive ones, and chapter 12 regrounded in the independence-of-review principle rather than current-model behaviour; both corrections are rules now (tone-of-voice.md's headings section, the durability authoring rule above).
3. **Test the prompts.** Current state, stated at the level chapter 12 would assign it: the pilot's D1–D3, chapter 1's validation audit, and chapter 12's convert-the-claims have passed a single-run smoke test against a role-played assistant over a planted-failure fixture — a model playing the reader's assistant, judged by the author, which is level 3. D3's wording was tightened as a result (the walk must name platform-generated APIs, not just hand-written routes; folded into prompt shape 3 above). Nothing has yet been run against a real tool on a real repository with a planted finding, which is the shipping bar in the authoring rules; every prompt in chapters 2–5 and 7–11, and every D4 and D5, is untested. Until that pass is done, "tested prompts" is a goal of the format and not a property of the current draft.
4. **Reader test** — one or two people from the target audience read the pilot and try one prompt on their own project. The question is whether the going-deeper section gets used, since that's the part this format bets on. A first pass exists as a persona review (`reviews/student-review-dani.md`, a non-code-reading builder on Supabase/Vercel, reading all twelve): its main finding — the asks fit the audience, the checks assumed devtools, a test copy, and a local build that nothing taught — produced chapter 0 and the hand-off rule above; its reading-order finding moved chapter 12 out of second place; its smaller findings (the surprise bill, the no-tests on-ramp, the unfound commits) are in chapters 9, 12 and 10. A second persona on a non-Supabase stack with tests is the next cheap pass.
5. **Design pass.** In progress in `design/`. The authorization lab manual is copied into `docs/` at build so chapter 6's footer can link it. Each chapter is a scrollable HTML page (sticky section rail, light/dark, prev/next, a Copy button on every prompt) with an index page that doubles as the map — every chapter with its subtitle and its direct test, plus the reading-order note. The same template prints to 16:9 pages, so a PDF per chapter comes from the same source. Knobs — fonts, sizes, measure, colours, card density, print ratio and columns — are tuned live in the browser and baked into `design/settings.json` for the build. Typography keeps the manual's Poppins headings; the body face is Petrona, chosen on the pages after a side-by-side comparison of candidates. Every chapter now carries at least one `[DIAGRAM]` marker; the diagrams get drawn once the layout settles. The built pages live in `docs/`, served by GitHub Pages from `main`; a rebuild and a push is a deploy.
