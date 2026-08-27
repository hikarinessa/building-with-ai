# Tone of voice

For instructional material in the Programming Foundations series — lab manuals, readings, course notes. Written for a competent adult who is new to the domain and doesn't need convincing that the topic matters.

---

## The stance

Explain the thing once, forward, with the reason attached. The reader is doing the work; the prose gets out of the way.

Three failure directions, in order of how often they show up:

1. **Overwritten** — the same point restated for emphasis, rhetorical shapes doing work that content should do.
2. **Dry** — every sentence the same length and shape, nominalizations instead of verbs.
3. **Chummy** — narrating the reader's feelings, jokes, encouragement.

Most drafts start at 1. Correcting for it usually overshoots into 2.

---

## Rules

### Assert once

Say it, attach the reason, move on. If a paragraph makes the same claim in three different phrasings, keep the clearest and cut the rest.

Watch for the pattern where each restatement is individually fine — the problem only appears when they stack. Count how many times a section says the same thing before deciding what to cut.

### Link causally

Connect claims with *since*, *because*, *so*, or a subordinate clause. Don't juxtapose two sentences and let the friction imply the relationship.

> **No:** Your frontend isn't a gate. It's a convenience for honest users.
> **Yes:** Your frontend is a convenience for honest users, since an attacker never runs it.

### Avoid contrastive negation

Drop the foil, keep the claim, append the *because*. The construction "not X, but Y" invents a wrong belief in order to correct it, which pads without informing.

**Exception:** when the reader genuinely holds the wrong belief. "Enabling RLS is not the same as writing a policy" earns its negation, because people really do assume that. An invented misconception doesn't.

### Avoid punchy lines

No aphorisms, no terminal stress, no reformulating a point for rhythm.

Two tests:
- If cutting a sentence's last few words loses rhythm but no information, cut them.
- If a sentence would work on a poster, rewrite it.

Three constructions to watch for specifically:

| Construction | Example |
|---|---|
| Tricolon crescendo | "doesn't care what you meant, can't be argued with, and has no interest in whether you feel like you understood" |
| Aphorism plus vivid tail | "different capabilities, and only the second shows up when you're staring at your own broken project at midnight" |
| Chiasmus | "vague predictions are how you avoid being wrong, and avoiding being wrong is how you avoid learning" |

### Open with what the thing is

The first sentence of any reader-facing unit — a page, a chapter, a section — is a full sentence that says what kind of thing follows. "This is a 12-chapter self-guided course on…" orients; "Twelve chapters." is a fragment doing rhythm work, and "Nine shapes." at the top of a section is the same move at smaller scale. Prompt notes have their own version — "Half an hour, and it converts…" — where the duration is used as a beat rather than as information; state the duration inside a sentence instead.

Describing the artifact's own structure is fine ("each chapter teaches one model and closes with prompts"); the reader benefits from knowing the shape. The rule is about the fragment, not the subject.

### One name for the assistant

Reader-facing text calls the AI tool the reader works with *your assistant*. *Model* is reserved for two things: a *mental model*, which every chapter is built on, and a *language model* the reader's own app calls, as in the injection chapter. Using *model* for the assistant puts "when a model writes the code" next to "one mental model" in the same sentence, and the reader has to disambiguate on every occurrence. Define the term once where the reader first meets it — "an AI assistant such as Claude Code or Cursor" — and use it plainly after that.

### Don't rate your own content

Cut "the part worth your time," "the important thing here," "this is the key insight." Importance shows in placement and space given, not in labels.

### Prefer gradients to absolutes

"Doesn't work as well" over "destroys the entire value." "Rarely surfaces" over "never surfaces." Overstatement invites the reader to find the counterexample.

### Don't narrate the reader

No predicting their failures, no describing what they're feeling, no telling them how to pay attention. Cut headings like "read this part properly."

Instruction about the work itself is fine: "fill in the prediction before you run anything" is a procedure, not a psychological claim.

### Near-zero metaphor budget

Only where the metaphor does explanatory work that plain description can't. "A policy is a `WHERE` clause the database adds to every query" stays, because it transfers a mechanism. "The database is the grader" goes, because it only adds flavour.

### Plain words over jargon

"Checkable" not "falsifiable." "Wrong" not "miscalibrated." Reach for the technical term only when it's the actual term of art the reader needs to learn.

---

## Avoiding the dry failure

The rules above, applied mechanically, produce uniform prose: one clause plus a *because*, every sentence the same length. Four things fix it without reintroducing rhetoric.

**Vary sentence length.** Follow a long qualified sentence with a short one.

**Open sections with orientation, then qualify.** State the shape of the thing first, then the caveats. Leading with the qualification makes the reader hold an unresolved clause.

**Verbs over nominalizations.** "Specificity is the thing to push on" → "it's worth pushing for more detail." Nominalizations are the main source of the dry, administrative register.

**Let a clause acknowledge the reader's situation** without dramatizing it. "It costs a couple of minutes each time" and "you can read ahead whenever you want" are concessions, not encouragement, and they keep the prose from reading as issued instructions.

---

## Headings and subtitles are prose too

Chapter subtitles, section headings, and taglines follow the same rules as body text: they describe what the section contains rather than perform it. "Who can see what, and where generated code leaves the check out" describes; "Two programs, one wire, and which side is yours" performs — a poster line in a heading slot. A rhythm tail on an otherwise descriptive subtitle ("…decided before you're tired") is the same failure at smaller scale.

A reliable test: from the heading alone, a reader should be able to predict the section's content. When unsure of register, use the one for defining terms — plain, specific, no image.

## Typography counts as tone

A sentence set in 12pt italic across the full measure, alone in a box, is terminal stress even if the wording is flat. Pull quotes and callouts carry the same emphasis that "punchy lines" does, so they're subject to the same budget.

Reserve boxed treatment for content that differs in *kind* from the surrounding prose — a procedure to follow, a warning about data loss, an answer key. Not for a sentence you want the reader to feel.

---

## Calibration: an index sentence, two versions

**Generated register.** A fragment opener, a tricolon with matched verbs, an absolute, and "model" for the assistant beside "mental model":

> Twelve chapters. Each teaches one mental model of how software works, names the ways that area goes wrong when a model writes the code, and closes with prompts to go deeper with your own assistant.

**Target register.** A full sentence that names the genre, plain verbs, a gradient, the assistant named once:

> This is a 12-chapter self-guided course on the mental models behind software you build with an AI assistant. Each chapter teaches one of them, describes what usually goes wrong when the assistant writes that part, and gives you prompts to go deeper on your own project.

## Calibration: one passage, four passes

**Original (overwritten).** Five restatements of "prediction matters," two aphorisms, a tricolon.

> That loop is the whole method, and it is doing a specific job. When you learn this material by reading, you end up with a set of true statements you can recite and cannot apply. [...] The database is the grader. It does not care what you meant, it cannot be argued with, and it has no interest in whether you feel like you understood.

**Second pass (still LLM-shaped).** Shorter, but the compression sharpened the aphorisms rather than removing them.

> Reading this will leave you able to recite it. Predicting shows you where your model is actually wrong, which is the part worth your time.

**Third pass (too dry).** Rules applied, prose flattened. Every sentence one clause plus a reason, all the same length.

> Predicting first and then correcting your mental model internalizes the material better than reading does. The more specific the prediction, the more useful the correction.

**Fourth pass (balanced).** Same content, varied rhythm, orienting sentence first, concession clause.

> Every experiment in this manual has the same three steps: write down what you expect, run the code, then compare. It costs a couple of minutes each time, and it's where most of the learning happens — a wrong prediction points at the specific part of your model that needs fixing, which reading rarely surfaces on its own.

---

## Revision checklist

- [ ] How many times does this section make its central claim? Reduce to one.
- [ ] Any "not X, but Y" where nobody believes X?
- [ ] Any sentence that would work on a poster?
- [ ] Any sentence whose last few words are rhythm only?
- [ ] Any absolute that a reader could find a counterexample to?
- [ ] Any claim about what the reader thinks, feels, or will do?
- [ ] Any metaphor that isn't transferring a mechanism?
- [ ] Are all sentences roughly the same length?
- [ ] Any nominalization that wants to be a verb?
- [ ] Any boxed sentence that's boxed for emphasis rather than kind?
- [ ] Any heading, subtitle, or tagline that performs rather than describes?
- [ ] Any unit that opens with a fragment ("Nine shapes.", "Half an hour, and…")?
- [ ] Any "model" that means the assistant?
