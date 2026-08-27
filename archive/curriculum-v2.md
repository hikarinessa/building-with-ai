# Building with AI: Verification and Judgment
## Curriculum v2

A different premise from v1. That version assumed you'd read the code a model wrote and taught you to catch defects in it. This one assumes you often won't, and teaches you to know what to ask about, how to phrase the question so the answer is checkable, and how to get evidence instead of reassurance.

The two aren't opposed. Reading a diff and asking a pointed question are two ways of using the same knowledge: what can go wrong, and what gives it away. So this curriculum is built around one shared artifact — a field guide where each entry serves both — plus a core that teaches how to use it and three optional depth modules for the places where asking doesn't substitute for having done the work.

**Who it's for:** people already shipping software with AI assistance who want a way to trust what they've built, and people who expect to work that way from the start. No requirement to read code fluently. Some requirement to run a query and read the result.

---

## The organizing idea: how much verification a change gets

Every change is verified at one of four levels.

| Level | What it means | Cost |
|---|---|---|
| **1** | Evidence you produce yourself — run a request, read the rows, look at the screen | Minutes |
| **2** | Assertions the model writes and you execute, which pass or fail | Minutes, once written |
| **3** | The model's report on its own work, plus a spot check | Seconds |
| **4** | Nothing | None |

Nobody works at level 1 for everything, and nobody should. Most changes don't warrant it, which is why shipping fast is possible at all. Some changes do, and the ones that do are predictable: authorization, money, deletion, migrations, anything crossing the trust boundary, and anything touching secrets.

Deciding the level per change is the skill this curriculum is built around. Everything else supports it — the taxonomy tells you which category a change falls in, the enumeration patterns get you a usable answer at level 3, and the checks are what level 1 and 2 look like in practice.

---

# The field guide

The central artifact, and the one that outlives the course. Organized by the surface you're looking at, since that's when you'd reach for it. Each entry has four fields.

**Format:**

> **Name of the failure**
> *Tell* — what gives it away in code, for the times you do look.
> *Angle* — the question to ask, phrased so the answer is checkable without reading the code.
> *Check* — the evidence that settles it.

The *angle* field is the one that takes work to write. Vague questions produce reassurance: "are there any authorization gaps?" returns "this looks good" reliably, because a vague question has no failing answer. What works is asking for an enumeration with a completeness criterion you can see — a list whose shape you can judge without understanding its contents.

---

## Surface A — A schema proposal

> **Boolean where a table belongs**
> *Tell* — a flag like `repeat_weekly` or `is_premium` standing in for something with variants.
> *Angle* — "For each boolean column, name the second and third variant a user might eventually want. Say none if there isn't one."
> *Check* — pick the most likely variant and ask what changing it would require. If the answer is a migration plus a backfill, decide now rather than later.

> **Invalid states representable**
> *Tell* — nullable columns whose emptiness means different things in different rows.
> *Angle* — "List the column combinations this schema permits that shouldn't exist. For each, say what prevents it — a constraint, application code, or nothing."
> *Check* — try to insert one of them.

> **Current state stored alongside history**
> *Tell* — a `status` column plus an events or log table that also implies status.
> *Angle* — "Which columns can be derived from other tables? For each, say what keeps them in sync and what happens if a write fails halfway."
> *Check* — cause the drift deliberately, then see whether anything notices.

## Surface B — A migration

> **New table with no row-level security**
> *Tell* — `create table` with no accompanying `enable row level security`.
> *Angle* — "List every table with its policies for select, insert, update and delete. Flag any table with fewer than four."
> *Check* — request the table anonymously with the public key. Zero rows is the pass.

> **Destructive change presented as additive**
> *Tell* — a column rename, a type change, or a dropped default in a migration described as adding a feature.
> *Angle* — "List every statement in this migration that loses data or breaks an existing read. For each, give the rollback."
> *Check* — run it against a copy with real data before the real one.

## Surface C — A data-access path

> **Authenticated but not authorized**
> *Tell* — a session check followed by a query whose only filter is an id.
> *Angle* — "For every read and write of this table, state the ownership condition. Say 'none' where there isn't one."
> *Check* — authenticate as user B, request user A's row by id.

> **Identity taken from the request**
> *Tell* — `userId` destructured from a request body and used as an ownership field.
> *Angle* — "For each write endpoint, state where the user id comes from: the session or the request."
> *Check* — send the request with a different user id in the body.

> **The unprotected neighbour**
> *Tell* — a policy whose correctness depends on another table's contents.
> *Angle* — "For each policy that queries another table, state that table's own policies. Flag any that are permissive."
> *Check* — as an unauthorized user, try to write the row that would grant you access.

> **Bypass key used to clear an error**
> *Tell* — a service or admin credential appearing in a file the client can reach, or a commit that resolves a permissions error without touching a policy.
> *Angle* — "List every place a privileged key is used and say why the request can't work with the public key."
> *Check* — search the built client bundle for the key.

## Surface D — A form or input

> **Validation on the client only**
> *Tell* — rules present in the component and absent from the handler.
> *Angle* — "For each field, state where it's validated: client, server, database, or nowhere."
> *Check* — send the request directly with a value the form would reject.

> **Failure after the user has typed**
> *Tell* — no submission state, and no handling of a rejected response.
> *Angle* — "Walk through a submission that fails after thirty seconds. What does the user see, and is their input still there?"
> *Check* — block the request in devtools and submit.

## Surface E — Client state

> **One value, three copies**
> *Tell* — server data held in a fetch cache, in component state, and in a form's initial value.
> *Angle* — "List every place this data is stored on the client and what writes each one."
> *Check* — change it in one place, then look at the others.

> **Optimistic update with no rollback**
> *Tell* — a local update before the request, with no handling of failure.
> *Angle* — "For each optimistic update, state what happens when the server rejects it and what the user sees."
> *Check* — force the failure and watch the screen.

## Surface F — An integration

> **No handling of partial failure**
> *Tell* — an external call with no timeout, retry, or failure branch.
> *Angle* — "For each external call, state the timeout, the retry policy, and what the user sees when it fails."
> *Check* — point it at an address that doesn't answer.

> **Retry without idempotency**
> *Tell* — a retry wrapping a call that creates something.
> *Angle* — "For each retried call, say whether running it twice produces one result or two."
> *Check* — run it twice with the same input.

## Surface G — A deploy or config

> **Secret reaching the client**
> *Tell* — a key with a public-variable prefix, or a secret in a file the bundler includes.
> *Angle* — "List every environment variable, whether it's public or private, and which of them the browser receives."
> *Check* — search the deployed bundle.

> **Scheduled work on a host that won't run it**
> *Tell* — a background job or long-running task on a platform with execution limits.
> *Angle* — "List every task that runs longer than ten seconds or on a schedule, and say what triggers each one in production."
> *Check* — run it in the deployed environment rather than locally.

## Surface H — Styling

> **Literal instead of token**
> *Tell* — hex values and one-off pixel numbers in components.
> *Angle* — "List the distinct colours and spacing values used, and which are defined as tokens."
> *Check* — change a token and see how many places move.

## Remaining entries to write

Uploads: public bucket, unvalidated file type, orphaned files after row deletion. Queries: N+1 on a list view, missing index on a filtered column, unbounded query with no pagination. Interface: missing empty state, missing error state, local state that belongs in the URL, missing labels and focus order. Data: soft delete that still appears in reads, timezone stored inconsistently. Operations: no rollback path, untested backup, alert with no recipient. Model-specific: scope creep in a diff, a second copy of an existing helper, a convention ignored, a deletion not mentioned in the summary.

Roughly forty entries in total across ten surfaces.

---

# Core units

Needed at any verification depth. About twelve hours.

### 1. Claims and evidence

The four levels, and how to tell which one you're operating at. Converting a claim into something observable: "I've added policies to all tables" becomes a count you can read, and "it handles errors now" becomes a blocked request and a screenshot.

The three forms of evidence available when you don't read code — behavioural checks you run, assertions you execute, and observable output — and the recognition that anything else is the model reporting on itself.

Why a model asked about code it just wrote tends to defend it, and what changes the answer: a fresh session, a different framing, a different model. Measuring this on your own tool, since it varies by version.

**Exercise:** take three claims from a recent session and convert each into a check you can run in under a minute.

### 2. The failure taxonomy

What can go wrong, at the depth needed to generate a question rather than to fix the problem. You can't ask about a category you don't know exists, and no amount of prompt skill recovers a missing category.

Covers the ten surfaces of the field guide: trust boundaries and authorization, schema and derived state, forms and validation, client state, integrations and partial failure, files, secrets and config, queries and indexes, interface states, and the model's own systematic failures.

Deliberately shallow. The aim is recognizing that row-level security is a thing that either exists or doesn't on a table, not being able to write a policy.

**Exercise:** for a project you've built, list which surfaces it has, and which of those you've never examined.

### 3. Asking for enumerations

The prompt patterns that produce checkable artifacts, and why they work: the model has to commit to a list, and a list has a shape you can judge without reading the contents.

Patterns: list-with-completeness-criterion ("flag any with fewer than four"), state-the-source ("session or request"), say-none-if-absent, walk-the-failure-path, and list-what-this-depends-on. Then the failure patterns to avoid — yes/no questions, "are there any problems," and anything the model can satisfy with a summary.

Where to put the question: a fresh session with the code pasted in generally produces more findings than asking in the session that wrote it.

**Exercise:** write angles for three surfaces of your own project, run them, and record which produced a list you could check and which produced prose.

### 4. Risk tiering

The unit that makes the rest coherent. Deciding the verification level per change, in advance, so the decision isn't made by how tired you are.

| Tier | Applies to | Level |
|---|---|---|
| **A** | Authorization, money, deletion, migrations, secrets, anything crossing the trust boundary | 1 — evidence you run |
| **B** | Business rules, state machines, calculations, anything with a correct answer | 2 — assertions you execute |
| **C** | Interface states, styling, copy, internal tooling | 3 — report plus spot check |
| **D** | Prototypes, throwaway scripts, local experiments | 4 — nothing |

Then the harder parts: what to do when a change spans tiers, why tier A doesn't shrink as you gain confidence in a tool, and how compounding works — small unreviewed choices are individually fine and jointly produce a codebase you can no longer ask good questions about, because you no longer know what's in it.

Scheduled audits for the failures that never produce a symptom: schema decisions that will hurt in six months, accumulated duplication, cost curves. These need a calendar entry and a stated angle rather than a trigger.

**Exercise:** tier the last twenty changes you made. Note which were tier A and got tier C treatment.

### 5. The harness, and decisions you own

Prevention rather than detection. House rules in the file your assistant reads, and what makes a rule effective — a rule that requires stating something ("say which policy protects this path") turns a silent omission into a sentence you can notice. Types, assertions, linters, and consistent structure as things the model checks itself against. Measuring what the harness buys by running the same prompt with and without it.

Then the decisions no audit produces, because they depend on information the model doesn't have: what the product does and for whom, the shape of the schema in your domain, hosting and cost against your risk tolerance, and which side of a presented trade-off to take. Recognizing when you've delegated one of these by accident, usually by accepting the first option offered.

**Exercise:** write the house rules file for your current project, then re-run a recent feature request against it and diff the results.

---

# Depth modules

Optional, and worth taking where asking doesn't substitute for having done the work. These three teach judgment rather than recognition, and judgment needs repetitions. About five hours each.

### D1. Data modeling

Interrogating a schema proposal rather than producing one. Entities and relationships, keys, nullability, state machines, time and versioning, normalization trades. The repetitions matter here because the skill is applied under ambiguity — what transfers is having made a nullable column that should have been a table, and then having had to migrate it with data in place.

### D2. Authorization

Trust boundaries, authentication against authorization, the four places a check can live, row-level security as the worked example, and the seven ways authorization goes missing. Built out in full, in cohort (3h) and self-study (5h) versions.

The existing self-study version writes policies from requirements against an executable grader. For this curriculum the policy-writing labs are heavier than needed, and would be replaced by an audit of a project the student didn't write, using the Surface C angles. The seven modes, the checklist, and the direct test carry over unchanged.

### D3. Debugging

Describing symptoms precisely enough that a model can locate the cause, which is a different skill from finding it yourself. Minimal reproduction as something you can produce without reading code. Reading an error message for what it says. Recognizing a loop — the same failure returning in new form, a growing patch count — and what to do instead, which is usually a fresh session and a better description.

---

# Paths through it

**Already shipping.** Core units plus the field guide, around twelve hours. Add D2 if the project holds other people's data. Most of the value arrives in units 1, 3 and 4.

**Starting from nothing.** Core plus all three depth modules, around twenty-seven hours. The depth modules matter more here, since the core assumes you have a project with problems in it to point the angles at.

**Working with engineers.** Core units 1 through 4, skipping the harness, since the team owns that. The field guide doubles as a list of questions to ask in review.

---

# Build order

The field guide is the expensive part: forty entries, four fields each, and every angle needs testing against a real model to confirm it produces a checkable answer rather than reassurance. Perhaps thirty hours of authoring, and it's also what goes stale as tools change.

Two entries are worth writing and using first — *authenticated but not authorized* on Surface C, and *boolean where a table belongs* on Surface A — because both come up constantly and both have angles that either work or visibly don't. If those two prove useful in your own work over a week, the rest is worth building. If they don't, the four-field format is wrong, and finding that out at two entries costs less than at forty.

Unit 4 is the one to write next, since it's what makes the guide something you use at the right moments rather than a document you've read.

---

# Relationship to v1

V1 is twenty-six modules for someone who will read the code, with authorization built out. It stays useful as the source for the *tell* field of every guide entry, and its depth modules are the same three named here.

The two can coexist as tracks over one field guide. A student who starts here and later wants to read diffs adds the tells; a student who starts in v1 and stops reading diffs adds the angles. Deciding which is the primary artifact matters mainly for what gets authored first, and the guide is common to both either way.
