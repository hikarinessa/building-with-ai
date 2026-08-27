# Programming Foundations for Building with AI
## Complete curriculum

A traditional CS curriculum teaches you to produce code. This one teaches you to specify, evaluate, and steward code you didn't type, which changes the priority order: syntax drops to near-zero, while data modeling, architectural boundaries, and verification move up, since those are the decisions a model will make badly on your behalf in seconds.

The organizing question throughout is what you need to understand in order to catch what the model gets wrong.

Twenty-six modules in four parts. Six carry most of the value and are marked below.

---

## The essential six

Three criteria put a module in this set: the mistakes are expensive to undo, the failures are high-severity and silently missed, or the module is what makes the rest of the work recoverable when it goes wrong.

| # | Module | Why it's core |
|---|---|---|
| **3** | **Data modeling** | The only mistakes here are genuinely expensive to reverse. Everything else can be rewritten; a schema with a hundred thousand rows in it cannot. |
| **6** | **Architecture and the request lifecycle** | The mental model the rest of the curriculum hangs on. Without the client/server boundary, most other modules have nothing to attach to. |
| **7** | **Authorization** | Highest-severity failure in generated code, and it fails silently — no error, no symptom, indistinguishable from correct code until someone looks. |
| **13** | **Version control** | Makes fast, risky iteration survivable, and makes the throw-away decision in module 15 cheap enough to actually take. |
| **14** | **Debugging as method** | Converts "I'm stuck" into a loop with steps, which is the difference between an hour and a day. |
| **15** | **The iteration loop** | Task sizing, diff review, and knowing when to restart. The practice everything else supports. |

The frontend modules in Part II are deliberately not in this set. Their failures are frequent and irritating rather than severe, and they announce themselves quickly, so they can be learned on encounter. Frequency is a different axis from severity, and ranked by frequency, module 9 would come first.

---

# Part I — Foundations

How software is shaped and where data lives. Mostly conceptual, and hard to skip, since reviewing code requires being able to read it.

### 1. Where code runs

Source, process, runtime. Compiled and interpreted. Where code executes — laptop, server, browser, phone — and why that boundary is the most load-bearing distinction in software. Filesystem, environment variables, ports, processes. What people mean by "a stack."

### 2. Reading code you didn't write

Skimming for structure rather than comprehension. Control flow against data flow. The three questions for any function: what goes in, what comes out, what does it touch outside itself. Call stacks and reading a stack trace. Reading diffs, which is the single most-used skill when a model writes and you review.

### ★ 3. Data modeling — **core**

Entities, relationships, cardinality. Identity and keys. Nullability and optionality. Making invalid states impossible to represent. State machines. Time: timestamps, versioning, soft deletes. Normalization against denormalization, and when each fits. Migrations as the cost of guessing wrong. The JSON-blob-versus-columns trade.

### 4. Storage and queries

Relational, document, key-value, blob, search, and vector stores. Transactions and an intuition for ACID. Indexes, and why a query that's fast at a thousand rows dies at a million. The N+1 problem. Files against rows.

### 5. State and data flow

Where truth lives. Derived state against stored state, and the cost of each. Server state against client state, and why treating fetched data as local state is where most duplication starts. Caching and staleness. Async, race conditions, and why two requests in flight produce results that depend on network timing. Idempotency.

This module is a prerequisite for most of Part II, and module 3's schema decisions and module 6's read/write split both assume it.

### ★ 6. Architecture and the request lifecycle — **core**

Layering (UI, logic, data access) and why crossing layers degrades a codebase. A request end to end. REST and resource thinking, RPC, GraphQL, and where each fits. Monolith against services, and why splitting early costs more than it saves. Background jobs, queues, schedulers. Event-driven against request-response. Webhooks. Then the named patterns that pay rent: middleware, repository, adapter, observer, dependency injection.

### ★ 7. Authorization — **core**

Authentication against authorization. Trust boundaries, and never trusting the client. The four places a check can live and which two are real. Row Level Security as the worked example. The seven recurring ways authorization goes missing from generated code, and a review checklist for spotting them.

*Built out in full. Cohort version (3h) and self-study version (5h) available.*

### 8. Secrets and environments

Environments and config against code. Where keys live. What must never enter a client bundle, and how to rotate one when it does. Public keys against service keys. Dashboard variables, `.env` files, and what gets committed.

---

# Part II — Building interfaces

The part most people spend most of their time on, and where generated code has its own distinct failure set. Depends on module 5 throughout.

### 9. Interface states and forms

The state matrix that generated code routinely covers one quarter of: loading, empty, error, partial, stale, success. Skeletons against spinners against nothing. Error messages that tell the user what to do next.

Forms: controlled inputs, validation on both sides and why the client copy is convenience only, submission states, double-submit prevention, and what happens on failure after the user has typed for ten minutes. URL as state, so a filtered list is linkable and the back button behaves.

Accessibility as the mechanical parts — labels, focus order, keyboard operation, contrast. Mechanical is the right framing, since most of it is a checklist rather than a judgment, and generated markup fails it consistently.

### 10. Styling and design systems

Design tokens first: colour, type scale, and spacing scale as named values rather than literals scattered through the markup. CSS custom properties, theming, and dark mode as a consequence of having tokens rather than as a separate feature.

The cascade and specificity, enough to understand why global stylesheets become unmaintainable. What genuinely belongs global — reset, tokens, base typography — and what belongs to a component. The main approaches and their trades: utility classes, CSS modules, CSS-in-JS, plain stylesheets.

Layout primitives, so spacing comes from a stack or a grid rather than from margins added one at a time. Spacing ownership, where a component doesn't set its own outer margin, since that decision belongs to whatever places it. Responsive work: mobile-first, breakpoints, fluid type, container queries.

The failure modes here are specific and easy to catch once named. Generated CSS hardcodes hex values and one-off pixel numbers, duplicates spacing instead of referencing a scale, mixes inline styles with classes, and reaches for `!important` when specificity fights back. Asked to make one button blue, a model edits a literal, and the fifth button no longer matches. Tokens are worth teaching early for that reason, since they turn a whole class of styling drift into a single edit.

Tokens also change what you can ask for. "Move the accent to token `--accent-2` and raise the heading step by one" changes the output in a predictable way, where "make it look more professional" doesn't.

### 11. Optimistic updates and offline

Optimistic mutation with a rollback path, which is the part most often left out. Reconciling the optimistic value against the server response. Queueing writes while offline, and the queue's own problems: ordering, retry, deduplication through idempotency keys, and what to show for a write that hasn't landed yet. Conflict resolution when two clients edited the same row, including the simplest honest answer, which is last-write-wins plus telling the user.

Depends on module 5 and on idempotency from module 20, so it sits late in this part.

### 12. Files, uploads and media

Direct-to-storage uploads against uploads through your server, and why the first needs signed URLs. Public buckets against private buckets with expiring links, which is an authorization surface with its own version of the module 7 failure modes. Validating type and size on the server. Image resizing, formats, and CDN delivery. Metadata rows against the blob itself, and what happens to orphaned files when a row is deleted. Upload progress, retry, and resumable uploads for large files.

---

# Part III — Working with generated code

The half nobody teaches, and where most of the day-to-day difficulty sits. Depends on Part I, since you can't review what you can't read.

### ★ 13. Version control — **core**

Git's mental model: commits as snapshots, branches as pointers. Why small commits matter more when code arrives in large fast batches. Review as verification even when working alone. The practical point is that being able to revert is what makes it safe to take risks.

### ★ 14. Debugging as method — **core**

Debugging as hypothesis testing. Minimal reproduction. Errors as information. Logging and observability. Reading a failure back to its cause instead of guessing at fixes.

### ★ 15. The iteration loop — **core**

Spec, assemble context, generate, review the diff, verify behaviour, integrate, clean up, record the decision.

Task sizing, where the unit of work should equal the unit you can verify. Knowing when to stop patching a bad generation and restart with a better spec, including the symptoms of a doom loop. Context hygiene: fresh session against long thread, and what to re-establish at the start of each one. Cleanup as scheduled work, since AI-assisted codebases accumulate parallel implementations of the same helper and conventions that drift between files written weeks apart. Risk tiering, so auth, money, deletion, and migrations get line-by-line attention and the rest gets spot-checked.

### 16. Reviewing generated code

Reading the diff rather than the summary. The three questions on every change: what did it touch that I didn't ask about, what did it delete, what convention did it ignore. Building a harness — types, tests, linters, small modules — so the model can check its own work. A catalogue of systematic failure modes: plausible-but-wrong, silent scope creep, ignoring existing conventions, missing authorization, confident deletion.

### 17. Decomposition and legibility

Functions as units of meaning. Coupling and cohesion. Why one large file stops working past a certain size. Abstraction as a decision about what to hide. Interfaces as contracts.

Then the same material aimed at the model rather than at you: a conventions file, consistent directory structure, colocating related code, and naming that makes an existing helper findable so a second copy doesn't get written. Types and tests read as machine-readable specification. This sits in Part III rather than Part I because that second motivation is the stronger one here.

### 18. Building tools and extending agents

MCP: host, client, server, and the transport choice that determines where credentials live. Tools, resources, and prompts, and which of your problems is actually a tool problem. Tool descriptions as prompts. Error messages written as instructions to the model rather than to a human. Return size, since a tool that dumps 50KB of JSON crowds out the context it was meant to help. Granularity. Idempotency and destructive operations. Tool results as untrusted input. Credential scoping. Then the cheaper alternatives: CLIs, scripts, skills, subagents, hooks.

---

# Part IV — Running it

Infrastructure, correctness, and the long tail. Most of this is learnable on encounter, and worth having a map of beforehand.

### 19. Infrastructure and hosting

The organizing axis is how much is decided for you: managed frontend platform, PaaS, BaaS, VPS, cloud primitives. Left end is fast, opinionated, and expensive at scale; right end is cheap, flexible, and you own the pager.

What a server actually is: a Linux box you rent. SSH and keypairs. Users, permissions, package managers. Long-running processes and supervision. Ports and firewalls. Reverse proxy, TLS, certificates. DNS as a lookup table you're editing. Serverless against long-running, including cold starts, execution limits, and statelessness — the constraint that explains why queues and workers exist. BaaS as pre-assembled backend. Containers, enough to understand the image-as-artifact idea. Cost and lock-in, including exit cost.

### 20. Boundaries and integrations

API authentication mechanics: keys, sessions, tokens, OAuth. Timeouts, retries, backoff, partial failure. Rate limits. Versioning and breaking changes. The real cost of adding a dependency.

### 21. Testing and types

Unit, integration, and end-to-end, and what's worth testing. Tests as executable specification. Types as cheap tests. Assertions as an answer key that can't be argued with, which matters more when you didn't write the code.

### 22. Operations and deployment

Deployment, CI/CD, rollback. Monitoring and alerting. Infrastructure cost models. Backups, and why an untested backup isn't one.

### 23. Security beyond authorization

Injection, XSS, CSRF, conceptually. Least privilege. PII, encryption at rest and in transit. Prompt injection. Dependency supply chain.

### 24. Analytics and instrumentation

Events against page views, and a naming scheme that survives contact with a second developer. Deciding what to measure, against the temptation to measure everything and read none of it. Funnels and retention, at the level needed to answer a product question. Privacy: what shouldn't go in an event payload, and consent. Keeping product analytics, error monitoring, and infrastructure metrics distinct, since they answer different questions and get conflated. Instrumenting while building against retrofitting later.

### 25. Performance

Enough Big-O to smell a problem. Latency numbers worth memorizing. Measuring before optimizing. Pagination, batching, lazy loading. On the client: bundle size, render cost, and what actually makes a page feel slow.

### 26. Evolution and maintenance

Technical debt as interest payments. Refactoring safely. Dependency upgrades and lockfiles. Decision records. Legibility as a goal in itself, since the question is whether you or the model can still understand this in six months.

---

# Structure

**One project as the spine.** A single non-trivial app carried through the curriculum, built deliberately simply at first and extended as each module lands. Abstract patterns are hard to retain, and watching your own schema fail is not.

**Self-contained labs run on a provided repo.** This is what makes answer keys possible, since everyone's tables look the same and assertions can pass or fail. Module 7 already works this way.

**Project segments get a rubric instead of a key.** "Your RSVP table has a policy for all four operations, and a cross-user read fails" is checkable by the student without being identical across students.

**A reference implementation ships at every checkpoint.** For self-study this is the difference between a course and an abandoned course, since a student whose module 3 schema went badly wrong can clone checkpoint 3 and continue rather than stalling at module 6. It also gives the reading exercises somewhere to point.

**Planted mistakes are named as planted.** Telling students in module 3 that a model will be revisited in module 26 costs nothing and avoids the sense of having been tricked. The lesson is in doing the migration.

**Three recurring exercise types.** *Read* — navigate a repo you didn't write. *Diagnose* — here's broken code, find the problem. *Specify* — write the brief, then judge what came back.

**Four beats per module.** The concept, why it matters specifically when a model writes the code, how to spot a violation, then the exercise.

**Two delivery formats.** The cohort version relies on a facilitator for the demo, the withheld answers, and noticing confusion. The self-study version replaces all three with predict-run-compare and executable answer keys. Module 7 exists in both, and they differ enough in structure that neither converts cleanly into the other.

---

# The project

Two candidates fit the constraints, which are: multi-tenant from the start so module 7 has something to bite on, genuinely hard data modeling, a reason for background work, real users obtainable, and finishable.

**Event board for a real community** — events, RSVPs with states, capacity and waitlists, organizers and co-organizers, recurring events, reminders, calendar export. Strongest on authorization surface, since a private event, an attendee list organizers see and attendees don't, and an invite token that grants access without an account are three different shapes of the same problem. Recurrence is the planted modeling mistake that module 26 collects.

**Lending library** — items, members, loans, holds, overdue state. Weaker on authorization, stronger on data modeling, since a loan has two timestamps, a five-state machine, an overlap constraint, and a queue attached. Also the better fit for module 11, because a steward checking items in and out from a phone in a basement is a real offline scenario rather than a constructed one.

With Part II added, both projects gain segments that carry real weight. The RSVP button alone has six interface states — not logged in, can RSVP, pending, RSVP'd, waitlisted because full, and event past — which makes module 9's state matrix concrete on the student's own screen. RSVP is also close to an ideal optimistic-update case, since the failure is real when capacity fills between render and submit, and the rollback has to explain itself rather than silently reverting.

---

# Narrowing

If the full curriculum is too long for the format, the axes to cut along are audience (solo builder shipping products, PM working with engineers, designer prototyping), depth (recognize the concept, reason about trade-offs, implement it), and whether exercises stay language-agnostic or commit to one concrete stack.

The essential six work as a standalone short course of roughly twenty hours. After those, modules 5, 9, 10, 16, and 19 make the strongest additions, since each closes a gap the six leave open.

For a shorter format, consolidating beats dropping. Module 12 folds into 4, module 24 into 22, and module 17 into 16, which gives a twenty-three module version with nothing removed.
