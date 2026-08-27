# Student review — Dani Okafor

## 1. Who I am and what I came for

I'm a freelance product designer in Lisbon. In the last eight months I've shipped two things with an AI assistant: an RSVP app that 200 choir members actually use, and an invoicing tool for myself. I don't read code — I describe what I want, I paste errors back, and I accept what comes out when the screen looks right. I came here because a friend testing the choir app once saw another member's phone number on a screen where she shouldn't have, I asked the assistant to fix it, it said it did, and I've felt sick about it ever since. I want to stop taking "yes, it's secure" at face value.

---

## 2. The reading, chapter by chapter

### Chapter 1 — Client and server

**Time:** ~20 minutes. Fine.

**Lost.** One place, and it's the important one. In *Anyone can send a request by hand*: "The network tab shows exactly what request a button sends, and one copy-paste into the console re-sends it." I know all those words individually. I cannot picture doing it. This is a jump too big, not a vocabulary gap — the sentence before it says devtools are "standard equipment for building and debugging the web," which is a polite way of telling me everyone but me already knows this. That's the line where I felt like an intruder in the chapter.

Smaller: in *The visitor's side*, "their browser downloads your interface code — the pages, the buttons, the checks around them." What checks? I've never asked for a check. I don't know that my forms have any.

**Would skip.** *The vocabulary of a running machine* — four terms, three of which I half-knew from watching Cursor's terminal. "The filesystem is the machine's local storage" is a sentence I'd skim. The port one earned its place because `localhost:3000` is something I see and had never had explained.

**Talked down to / padded.** Not really. The register is right. The one thing that grated is being told devtools are standard equipment in the same chapter whose direct test requires me to use them for the first time.

**Recognition.** *The value computed on their side* — "a total, a price, a discount, a role, or the current user's id sent in the request body and written straight to a row." My invoicing tool computes totals. I have no idea which side does it. That's a new fear the chapter gave me, correctly.

What I expected and didn't get: this chapter opens the whole course, and I came in with a phone-number leak. It points at chapter 6 in *Where this connects* and that's the right call, but I was then told to read chapter 12 next, so my actual question sat unanswered for six chapters.

**The direct test.** "Open the network tab, use your own form once, and find the request it sent." Step one — open the network tab — I can probably manage; right-click, Inspect, there are tabs. Step two, "find the request it sent," is where I stop. There will be dozens of lines. I don't know which one is mine. Step three, "Copy it into the console," I cannot do at all. So: no, I would not do this unassisted. D3 exists and does walk it through, which saves it — but then the direct test says "The whole test takes about ten minutes" and D3 says "This takes about twenty minutes" for what reads like the same test. One of those numbers is wrong and it made me trust the other durations less.

**The entries.** All three Asks I'd paste into Cursor exactly as written — they're the right length and they're phrased as instructions, not questions. Can I judge the answers? Partly. I can count how many rows say "nowhere," which is the point. What I can't judge is whether the table has all my inputs in it. D2's note helps here — "a table that's all green on the first pass deserves suspicion" — and I'd want that sentence next to the entry, not two pages later.

The Checks are all "send the request directly," which is the thing I just said I can't do. Three entries, one skill I don't have, and the skill is taught in D3 at the very end.

**Going deeper.** I'd run **D1 · Map my app** first, because it's pure prompt, costs nothing, and I genuinely don't know what my app is made of. Then **D4 · Where does this run?**, because a quiz is the only format in this course where I find out what I'm wrong about without having to already know something. I'd run **D3** eventually, in daylight, when I'm not tired.

Nothing blocked me from running these, which is not true of later chapters.

**Still don't understand.** What my stack actually is. The chapter says knowing "your stack's names lets you ask questions that get answers about your actual setup" and then never tells me how to find out what mine is. That's one sentence missing: *ask your assistant "what's my stack — name the framework, the database, and the host."* I'd have run it immediately.

---

### Chapter 12 — Verification

**Time:** 35 minutes, and it felt like homework. Reading this second was a mistake.

**Lost.** *What an assertion is*: "A **test** is a small program that performs one action against the code and checks one claim about the result." I understand the sentence. What stopped me is that I have no tests. Not few — none. Nobody has ever suggested I should have any. So the entire level-2 column, which the chapter says is the thing that "keeps a claim true after the day you checked it," is a country I've never visited, and the chapter never acknowledges that a reader might be standing at zero. **D5 · Audit my tests** opens with "List every test in my project" and would come back with a blank page, and then what?

Second: the tier table says Tier A covers "anything crossing the trust boundary." Chapter 1 never used the phrase "trust boundary." It talked about "the wire" and "your side." I had to guess they were the same thing. They are, I think, but I shouldn't be guessing on the word that decides my tier.

Third, a word-I-don't-know: "migrations" appears in the Tier A row. It's defined in chapter 2, which I hadn't read.

**Would skip.** "the same way any process retires an inspection step" — abstract enough that I skipped the sentence and lost nothing. And *Reports from the author*'s middle — "it's why code review is assigned to someone other than the author, why audits are external, and why your own last-month decisions look sounder in memory than in the file" — three examples where one would do. Mild padding in a chapter that couldn't afford any.

**Talked down to.** No. The tone is good. The problem is placement, not tone.

**Recognition.** The four-levels table, level 3: "The assistant's report on its own work, plus a spot check." That is one hundred percent of what I have ever done, on every change, including the phone-number fix. Seeing my entire working method sitting in row three of a four-row table, with "Lasts: No" next to it, is the single most useful thirty seconds in the course so far. That earned it.

And *Small unreviewed choices compound* — "jointly they produce a codebase you no longer know the contents of — at which point you can't ask good questions about it." Yes. I'm already there. The choir app has features I don't remember asking for.

**The direct test.** "Take the most recent claim your assistant made about its own work. Produce the level-1 evidence for it." I can do this today, with no tools, and I will. It's the most doable direct test in the whole course and it's in the chapter I was least prepared to read. The last sentence — "If you can't say what that evidence would consist of, that's the finding" — is what makes it work, because it gives me a result even when I fail.

**The entries.** These four aren't asks-and-checks like every other chapter's; they're habits with corrections. That's fine and I read them faster. *Asking the author* — "'are you sure?' asked downward in the same thread, answered with a defence" — is me, verbatim, quarterly. *Tier A on autopilot* — "'it was a one-liner' as the reason no evidence was produced" — is how the phone-number fix got accepted.

**Going deeper.** **D2 · Convert the claims** first, because I have three claims sitting in my history that I'm frightened of and this turns them into things I can run. I'd never run **D3 · Measure the self-defence** — it produces a number about my tool, and I don't know what I'd do differently with the number. It reads like a thing written for someone who enjoys measuring.

**D1 · Tier the history** wants "the last twenty changes in my project's history." I don't know whether I have a history. Lovable made a repo somewhere, Cursor has been committing things maybe, Vercel deploys from something. That's a blocker, and it isn't resolved until chapter 10.

**Still don't understand.** How to get from "I have no tests" to "I have one test." The chapter tells me tier A needs "1 at the change, then 2 kept" and I can do the 1 and cannot do the 2, and nothing addresses that gap.

**The thing I'd put on my wall.** *Asking for enumerations* — the six patterns. "Say none if absent — the instruction that turns a silent omission into a visible word." "Plant a control — seed one finding you know about and see whether the list surfaces it." That last one is the answer to my real problem, which is that I can't tell a complete table from a confident one, and I even have a control to plant: the phone number. This is the most transferable thing in the course and it's buried near the end of chapter 12.

---

### Chapter 2 — Data modelling

**Time:** 35 minutes. Longest chapter, and I felt every minute of the second half.

**Lost.** The heading *Blobs against columns* introduces a word — "blob" — that the section then never uses; the body says "Most databases offer a JSON column." I spent a beat wondering whether a blob and a JSON column were two things I needed to keep apart. A word I don't know, created by a heading.

Otherwise I followed this. "One-to-many: an event has many RSVPs, each RSVP points at one event" is my app, and using my own domain shape by accident made the whole *Tables, rows, columns, keys* section land.

**Would skip.** Entries 7 and 8 — *Missing index on a filtered column* and *The unbounded query*. Two hundred choir members. I read the tells, decided correctly this isn't mine yet, and moved on. That's the system working, but it does mean I skimmed into the last entry at low attention, and the last entry is the one I most needed.

**Talked down to.** No.

**Recognition.** Two.

*Nullability*: "an empty `ended_at` that means 'still running' in one row and 'we never recorded it' in another." My RSVP table has an empty field that means both "hasn't replied" and "replied then withdrew." I'm fairly sure. I'd never had a reason to think that was a problem with a name.

And the tenth entry, *Personal data with no reason and no exit*: "emails, addresses, birthdates, or free text about users, kept with no stated purpose and no path that removes them when the account goes." The choir app holds names, emails, phone numbers, and a "notes" field the committee uses. Nothing deletes any of it. The Ask — "Write forever and nothing where those are the answers" — is exactly the shape that would force the truth out, and I'd run it tonight.

But it's tenth of ten, after four entries about scale I'd already decided weren't mine. If the ordering had put it near the top I'd have hit it at full attention.

**The direct test.** "Ask for the list of states your schema permits and your product forbids... pick the worst one, and insert it into a test copy."

I stop at "a test copy." I have one Supabase project. It's the one the choir uses. There is no copy. The phrase "test copy" appears in this chapter's direct test and in checks in chapters 4, 8 and 9, and nowhere in the course does anything tell me how to get one or that getting one is a task in itself. This is the single biggest thing standing between me and the practical half of this course. I am not inserting a deliberately-invalid row into the choir's live database to see what happens.

**The entries.** The Asks are good and I'd paste them. The Checks are mostly "insert something bad into a test copy" — same wall.

One Check I could do: *Soft delete that still appears in reads* — "soft-delete a test row and look for it on every screen that lists the data." That's clicking around my own app, which I can do.

**Going deeper.** **D2 · Explain my schema back to me** first, because the note tells me what a good answer feels like — "A good response reads like a description of your product" — and I can judge that. I'm a designer; I know what my product is. That's the only prompt in this chapter whose output I can grade with the knowledge I actually have.

**D1** opens with "Here is my schema: [paste it, or point at the migrations]." I don't know where my schema is as a thing to paste. I know Supabase has a table editor with my tables in it. Is that the schema? Do I have migrations? Lovable made this. That bracket needs to say what to do in a Supabase project specifically, or say "point your assistant at the project and ask it to find the schema."

I'd never run **D5 · Feel the index** — half an hour to learn something about a hundred thousand rows I will never have.

**Still don't understand.** Whether a "test copy" is a thing I can make, and how.

---

### Chapter 3 — Source of truth

**Time:** 20 minutes.

**Lost.** *The server's copy and the client's copies*: "a typical path holds five: the database row, the server's response, the client's fetch cache, a component's state, and a form's initial value." I know the words and I cannot picture it. "Component state" is a phrase I've watched Cursor use for months without it ever meaning anything. The diagram placeholder describes exactly the right picture — five boxes with different ages and an edit arrow that only reaches some of them — and as prose the list does nothing for me. This is a section that is entirely load-bearing on the diagram existing.

**Would skip.** Nothing. This chapter is tight — shortest one so far in feel, and no section outstays itself.

**Recognition.** *Staleness* — "it's a bug that presents as users seeing old data until they reload." The choir committee complains that RSVPs don't show up until they refresh. I assumed that was normal. Apparently it's a decision somebody made by not making it.

*The URL as a home for state* — "refresh loses it, the back button misbehaves, and the view can't be shared as a link." My invoicing tool does all three and I've been irritated by it as a user of my own app without knowing it was a category of thing. This is the section a designer will care most about in the whole course, and it's four sentences.

**Talked down to.** No.

**The direct test.** Two halves, and they're wildly different for me. "Open your app in two windows side by side. Change something in one and watch whether, and when, the other notices" — I can do that right now, no help, and it answers a question I actually have. Then: "block the network in one window's devtools and try a write." I don't know how to block a network request. I've never opened devtools deliberately.

So I'd do the first half, get a real answer, and abandon the second. Which is a decent outcome, but the chapter presents them as one ten-minute test and they are not one thing.

**The entries.** Three of the four Checks are "block the request in devtools." Same wall, three times in one chapter. The Asks are all fine and pasteable — *Failure after the user has typed*, "Walk through a submission that fails after thirty seconds. What does the user see at each moment, and is their input still there at the end?" is the best-phrased Ask in the course so far, because I can grade the answer against what I'd want as a designer.

**Going deeper.** **D4 · Force the failure** is the one I'd run, and only because it's the one that offers to teach me the devtools skill the rest of the chapter assumes: "Help me use devtools to test my own app's failure behaviour." That prompt should be earlier — in chapter 1, or flagged at the top of this chapter as "if you've never used devtools, start here."

**D3 · Walk the race** I'd run second because double-clicking save is something I have literally done and wondered about.

**Still don't understand.** What a component is. It's used in three places as if settled.

---

### Chapter 4 — The request lifecycle

**Time:** 25 minutes.

**Lost.** *Layers, and why crossing them costs*. "The cost of crossing shows up as duplication: when the interface writes straight to a table, or a business rule sits inside one route, the rule exists on one path and not on the others that touch the same data." I followed the sentence and could not attach it to anything. The payoff — "a proposal that puts it elsewhere is worth a question" — asks me to notice a shape inside a proposal I can't read. I know the words, can't picture it, and can't act on it. This section is written for someone who sees the code.

**Would skip.** That same section. Everything else earned its place.

**Recognition.** Big one. *What each endpoint costs, and who can call it*: "an endpoint that sends an email, calls a paid service, calls an AI model, or creates an account does something expensive or consequential per call... turns it into a spam relay, a bill, or a flood of fake rows."

I got a €38 charge from a maps API one month and never worked out why. This is the closest the course comes to explaining it and it doesn't quite. This chapter is about *other people* calling *my* endpoints too often. My bill might have been that, or it might have been my own app calling the map more than I thought, which is chapter 9's territory, and chapter 9 doesn't cover cost either. So my one concrete money scar gets half-explained in two places and never named. See change 4 below.

Also: *Work that outlives a request*. The choir app sends RSVP reminders. "The email sends a moment later, and its failure becomes a retry instead of an error in the user's face" — I'd like to know which of those mine does, and now I can ask.

**Talked down to.** No.

**The direct test.** "Ask for the endpoint inventory: every request the server answers, grouped by resource, with what each reads and writes."

This is one of two direct tests in the entire course I could perform start to finish with no new skill. It's a prompt. I paste it, I get a table, and the chapter tells me what a bad table looks like: "resources you don't recognize, verbs missing from a resource that should have them, and two endpoints writing the same table." Every one of those I can spot without reading code. This is the model the other direct tests should follow.

**The entries.** *The unmetered endpoint*'s Ask is excellent — "Write anyone and unlimited where those are the answers" — because it forces the frightening word onto the page instead of letting a summary swallow it. Its Check is "call one of them fifty times in a row from the console," which is the console again.

**Going deeper.** **D2 · The endpoint inventory** — same as the direct test, so I'd do it once. Then **D1 · Trace one action**, with "RSVP to an event" filled in, which is a happy accident: the example in the brackets is literally my app.

**D4 · The path quiz** I'd run on a train. The note says "The response-is-lost case is the one most people get wrong: the write happened, and only the confirmation didn't" — that's a good hook and it made me want to take the quiz.

**Still don't understand.** Whether my app has any background jobs at all, or whether the reminder emails go out inside the request. The chapter gives me the ask for it, so this one's on me.

---

### Chapter 5 — Production

**Time:** 25 minutes.

**Lost.** Nothing hard. The hosting table is the clearest thing in the course — I placed myself on it in about ten seconds (managed frontend platform for Vercel, backend-as-a-service for Supabase) and that's the first time I've understood the relationship between the two services I pay for.

**Would skip.** *Names and certificates*. I have a domain, it works, Vercel did it. "Changes propagate slowly — old answers are cached for hours" is worth knowing and the rest I'd skim.

**Recognition.** *Environments and deploys*: "'Works locally' and 'works deployed' are different claims because between the two environments the machine, the configuration, the data, and the platform constraints all change — which is most of why things break at deploy time."

This is my most frequent, most demoralising problem, and it gets one sentence. The sentence is correct and it named the thing. But then the chapter moves to rollbacks, and never says the practical thing I needed: *when a deploy breaks and it worked locally, roll back first and debug after, instead of pasting errors until it works.* That rule is sitting right there in the material — the rollback section is the next paragraph — and it isn't stated. It would have changed my behaviour more than anything else in the chapter.

*The error shown in full* — "A platform's default is often the whole internal error — file paths, table names, the query that failed." I have seen my own app show a wall of orange text to a choir member. I didn't know that was a decision.

**Talked down to.** No.

**The direct test.** "Restore the most recent backup into a disposable copy and open it."

Two blockers. First, I don't know whether I have backups — I'm on Supabase's free tier and I've never looked. The chapter says "the copy must exist on a schedule" as if the schedule exists. It should start with "find out whether you have any." Second, "a disposable copy" is the test-copy wall again.

So: no, I wouldn't do this, and it's the direct test I most agree ought to be done.

**The entries.** *The alert nobody receives* — "List every alert configured, where each one delivers, and who saw the most recent one fire. Say nobody explicitly." I already know my answer is nobody, because I have no alerts and no error tracking. Which raises a question the chapter doesn't answer: is having none acceptable for a 200-person choir app, or is it negligent? The chapter describes the three mechanisms and never says what a project my size should have. I'd have valued one line of judgement there.

**Going deeper.** **D2 · The production-claims audit** first. "For each: how would I find out if it stopped being true — an alert, a symptom, or nothing?" That column is the whole value, and I can read a column of "nothing"s without understanding anything technical.

**D4 · The rollback drill** second, and I'd genuinely do it — fifteen minutes, on Vercel, deploy something trivial and roll it back. That's the one hands-on exercise in the course that needs no new tools and no test copy. It should be advertised harder.

I wouldn't run **D3 · Walk the deploy**. It's interesting and it doesn't change what I do.

**Still don't understand.** Whether my data is backed up at all.

---

### Chapter 6 — Authorization

**Time:** 40 minutes. Over budget and I didn't care. This is the chapter I came for and it's the best one.

**Lost.** One place, and it's in a Check rather than the model. Shape 4: "search the built client bundle for the key's value." I don't know what a bundle is here or how to search it. Chapter 7's D4 turns out to teach exactly this, but at this point in the reading I hit a wall inside the shape I was most alarmed by.

The model itself I followed completely, including the row-level-security material, which I'd have expected to lose me.

**Would skip.** *Authentication, briefly* — I'd skim the first paragraph, because it tells me this part is handled by the platform and I can relax. But then the *second front door* material in that same section is the setup for shape 9, which I do care about. Slightly awkward that the "you can relax" section carries a "you can't relax" ending.

**Talked down to.** No. This chapter treats me like an adult more consistently than any other.

**Recognition.** Three, and one of them physically changed my pulse.

First, the opening sentence: "A missing authorization check produces no error and no visible symptom, so the app keeps working until somebody requests data belonging to another user." That is my incident, described before I told anyone about it.

Second, and this is the one — *What a database policy is*, point 1: "A table with row-level security enabled and no policies denies everything — which breaks the app before it protects it, and is the moment many projects turn protection back off." And point 3: "There is a master key... It must never reach the browser, and it is never the fix for a permissions error — the policy that raised the error is the thing to look at."

I once got a row-level security error that blocked everything. My assistant "fixed it" and the error went away. I never asked what it did. I now have a specific, checkable suspicion about what it did, and a specific thing to go and look at. That paragraph is worth the entire course to me. It is also the only place in twelve chapters where something that actually happened to me was explained rather than gestured at.

Third, shape 2: "a logged-in check followed by a query whose only filter is an id." That is almost certainly what my friend hit when she saw a phone number.

**The four-places table.** Interface / browser code / server / database, marked fake / fake / real / real. I'd print this. The reason it works is the "Real?" column — one word per row, and I don't need any other information to use it.

**The direct test.** "Sign in as user B. Request one of user A's rows by its id. An error or an empty result is the pass; the row itself is a finding."

Walking it through: I have a second account (my friend's test login). I'd need one of my own rows' ids — I think I can copy one out of Supabase's table editor, it's a long string with dashes. Then "request the row" — that's the step I can't perform, and this is the only chapter that anticipates it: "Your assistant can build you the setup: ask it for a way to run requests as a specific test user against your project, and to show you the exact request to send."

That sentence is the difference between a test I'd abandon and a test I'll book an evening for. Every other direct test in the course should have one.

Would I do it? Yes. It's the first thing on my list.

**The entries.** Nine is a lot and I read all nine because I was frightened, which won't be true of a calmer reader. The Asks are all pasteable. Shape 3's Ask — "Flag any table with fewer than four operations covered" — is the single best line of prompt-writing in the course: I can count to four without knowing what any of the four mean.

Shape 8, *The public bucket*, has the only Check in the entire course I could run with zero help and zero new skill: "copy a file's URL from a logged-in session and open it in a private window." That's two things I already do every day.

**Going deeper.** **D1 · Audit my project** first — it's the chapter's ask made complete, and the follow-up line ("for this one, show me the request that would exploit it") is the part that keeps the assistant from reassuring me.

**D5 · Set the house rules** second, and I'd paste that whole block into a file tonight. One friction: it says "(`CLAUDE.md`, `AGENTS.md`, or your tool's equivalent)" and I use Cursor and don't know which of those Cursor reads. I'd have to ask. One clause naming the file for each of the three or four common tools would remove that.

**Still don't understand.** What happened to my RLS error. But now I know the exact question to ask, which is the difference between this chapter and the rest.

**One thing missing.** The end says "The full-depth version of this chapter exists as a five-sitting lab manual." Where? There's no link, no filename, no "ask me for it." I want it and there's no path to it, which is a strange note to end the best chapter on.

---

### Chapter 7 — Secrets and configuration

**Time:** 15 minutes. Shortest, and it fixed a specific piece of ignorance I've carried for eight months.

**Lost.** *The one-way door* is fine until the direct test. "Build the client and search the output for the first characters of each secret." I don't build anything — Vercel builds it. I don't know how to build locally, or what "the output" is, or where it would be. This is the least self-sufficient direct test in the course; it isn't a jump, it's a request to do something I don't have the concept for.

D4 rescues it — "Show me the exact commands and help me read the results" — but again the rescue is at the end and the wall is in the middle.

**Would skip.** Nothing. It's short and every section does work.

**Talked down to.** No.

**Recognition.** The whole chapter, honestly. I've known for eight months that my keys are in a file called `.env` and that this matters, and I could not have told you why or what the difference between two keys was.

"locally they're read from a `.env` file, and in production from the platform's dashboard" — that one clause explains something I'd been vaguely anxious about since the first time Vercel asked me to type values into a settings page.

And *Two kinds of key*: "A **public key** is designed to ship in the browser... Finding it in devtools is expected." I have been quietly worried that my Supabase key being visible was a disaster. It isn't, and now I know precisely why it isn't — "it's safe in the open only because the real rules are enforced elsewhere — the database policies of chapter 6." Which also means my key is only safe if chapter 6 went well for me, and I don't yet know that it did. That's exactly the right amount of relief and exactly the right amount of remaining fear. Well judged.

"the prefix is a one-way door" with `NEXT_PUBLIC_` and `VITE_` named — I can open my own `.env` right now and read the left-hand side of every line. I did. That's real, and it took ninety seconds.

**The entries.** Three, all with pasteable Asks. *A live key in a shared artifact* — "List the file and the kind of key — don't print the values" — the "don't print the values" instruction is thoughtful and I wouldn't have thought of it.

**Going deeper.** **D1 · The credential inventory** first, because "write unknown where the answer is unknown" means I'll get a truthful table instead of a confident one, and because I'm fairly sure I have keys I don't know about — Lovable set things up before I was paying attention.

**D3 · Walk the leak** I'd keep for later; the note calls it "the incident runbook, written on a calm day," which is a good enough reason to do it that I'd probably still not do it, being honest.

**Still don't understand.** Whether the €38 maps charge was a leaked key. D2 gets near it — "what they could spend" — but no entry and no Ask in this chapter connects a leaked key to a surprise bill, which is the form this failure actually takes for someone like me. It's the sentence that would have made this chapter about my life.

---

### Chapter 8 — Injection

**Time:** 25 minutes, about ten of which I skimmed.

**Lost.** The tells. "a rendering call with *dangerous* or *raw* or *unsafe* in its name" — I can't see rendering calls. Chapter 6 says explicitly that each entry "carries the *tell* if you do look at code," which set my expectations properly; this chapter doesn't repeat that caveat, so its tells read as instructions I'm failing at.

**Would skip.** Half of it, legitimately. My apps don't call an AI model. So *Text into a prompt*, the containment paragraph, entry 3, entry 4, and D3 are all not about me. That's roughly 40% of the chapter, and nothing at the top tells me I can skip it. One line — "the third instance applies only if your app sends text to a language model" — would have saved me ten minutes and stopped me feeling behind.

**Talked down to.** No.

**Recognition.** Weaker than other chapters, because the failure is invisible to me by definition. The closest: "A page assembled from stored text — a comment, a profile field, a title." The choir app has a notes field the committee types into. I hadn't thought of that as a channel.

**Talked down to / padded.** One line I'd cut: "it has sat at or near the top of lists of web defects for two decades." It's there to impress me and it doesn't change what I do.

**The direct test.** "Pick a short piece of markup and a short instruction. Type the markup into every free-text field your app has, save, and look for it rendered anywhere — as formatting rather than as literal text."

**This is the best direct test in the course for a reader like me.** No devtools. No console. No test copy. No new concept. I type in my own forms and I look at my own screens — which is what I do all day anyway. And the pass/fail is visual: "bold text is the finding, a literal tag is the pass." I'd do this tonight.

One gap: "Pick a short piece of markup" doesn't give me the markup. The entry's Check says "a bold tag does," which for me means guessing. Write out the exact string. I'd type it and I'd stop worrying I'd typed the wrong thing.

The second half — the planted instruction — I skip, no model.

**The entries.** Entry 1's Check — "type a single quote into the field that feeds the query and see whether the request errors, returns nothing, or returns everything" — is doable and I like that all three outcomes are named so I know what I'm looking at. But it says "in a test copy" again.

**Going deeper.** **D1 · The splice inventory** first — it's one table covering all three instances and I can read the last column without understanding the first two. **D4 · The boundary quiz** second, for the reason quizzes work on me.

**D2 · Walk the hostile comment** has the best follow-up instruction in the course: "If it says 'the framework handles it,' ask which call renders that field, and whether it's the escaping one." That's a pre-written response to the exact brush-off I always accept.

**Still don't understand.** Nothing new. The parts about me, I got.

---

### Chapter 9 — Third-party integrations

**Time:** 25 minutes.

**Lost.** Nothing lost me. This chapter is well-pitched.

**Would skip.** *Their code, in your process*. "whatever a library does when it runs, it does as you" is alarming, and then the Ask is "List every dependency this change added," which requires me to be reading diffs, which I don't do until chapter 11 teaches me to. So it's a new fear with no move attached, and I'd skim it.

**Recognition.** *Partial failure*: "Their charge succeeded and your record of it failed: money moved and your database doesn't know." My invoicing tool is on Stripe test mode and I've been putting off going live. This chapter is the reason I'll do the idempotency ask before I flip that switch. That's a real behaviour change.

And "a timeout is not a failure — it's an unknown. The request may have landed and been processed; only the answer is missing." Clean, memorable, and it reframed something I'd have got wrong in a quiz.

**Expected and didn't get.** The €38, for the second time. This chapter covers calling services I don't control, and rate limits, and what I send them, and never covers **what they charge me**. *Rate limits* says "reaching the cap is a normal operating state rather than an error" — that's about being throttled, not about being billed. And **D1 · The integration inventory** asks for "the timeout, the retry policy, the backoff, whether an idempotency key is used, which fields about a person it sends, and what the user sees when the call fails" — six columns, no cost column, no spending cap.

For someone who has been surprised by a bill from an integration and never found out why, this is the chapter where that gets explained, and it doesn't.

**Talked down to.** No.

**The direct test.** "Point one integration at an address that doesn't answer and use the feature as a user would."

How do I point it at an address that doesn't answer? Change something in a file, presumably. Which file? And I'd be doing it to the live choir app, because test copy. So: no. D3 offers help ("Help me run the direct test on [one integration]") and still says "in a test copy."

**The entries.** *User data leaving without a decision* — "Flag every call that sends personal data it doesn't use" — is the entry I'd run for the choir, since that's my actual anxiety. Its Check is readable in the network tab, which I'd need help with, or "the server log," which I don't know how to reach.

**Going deeper.** **D1** first despite the missing column, because the honest-nones framing works: "a young integration usually has a row that reads none, none, none, and that row is the worklist." I know what a worklist is and I can act on one.

**D4 · The failure quiz** second. **D2 · Walk the unknown outcome** I'd run only when I'm about to take Stripe live, which is the right time for it and the chapter could say so.

**Still don't understand.** Why I got charged €38.

---

### Chapter 10 — Version control

**Time:** 15 minutes. Least scary chapter, and the one where I'd have expected to be lost and wasn't.

**Lost.** Nothing conceptual. The mechanical gap is different: I don't know whether I *have* any of this. Lovable made a repo somewhere. Cursor may have been committing. Vercel deploys from something. The chapter explains commits and branches beautifully and never addresses the reader who has been shipping for eight months without ever consciously making one.

**Would skip.** Nothing. It's short and every part is a move I might need.

**Talked down to.** The opposite, and this is the line that earned the chapter: "Command fluency isn't the goal: your assistant runs the commands, and you decide the moves." That single sentence is why I read the chapter instead of skipping it as a programmer thing. It sets up a division of labour I recognise from my actual working life — I don't need to type it, I need to know to ask for it. More chapters should have opened this way.

**Recognition.** *Generation on top of uncommitted work* — "a bad result that can't be discarded without taking good work with it." That's happened to me and I didn't have a way to describe it. And "Assistants produce large batches by default; asking for one commit per concern... keeps each change independently revertible" explains why undoing anything has always been all-or-nothing for me.

**The four recovery moves.** Discard, restore one file, revert, abandon a branch. I wrote all four down. They're four things I can now ask for by name, and that's exactly the right depth — I don't need to know how, I need to know that they exist and what each one costs.

**The direct test.** "Before accepting any large change, say — out loud or in the session — which commit you'd return to if it's wrong. If you can't name one, the safety net isn't under this change."

I cannot name a commit. I have never seen my commits. So the test hands me a failure with no next step. The fix is one clause: *ask your assistant to name it and show it to you.* Chapter 6 does exactly this for its harder test and this one doesn't for its easier one.

**The entries.** Two, both short, both good. The first entry's Ask — "Before you start: what's uncommitted right now? Commit it or set it aside, then name the commit we'd return to if this goes wrong" — is the sentence that should have been the direct test.

**Going deeper.** **D3 · The recoverability audit** first, absolutely. "if the working files were lost, what would survive? If the laptop were lost?" That's the question I actually have and it answers "do I even have version control" as a side effect. Best-targeted prompt in the chapter for a reader in my position, and it should be the entry point to the chapter rather than the third prompt.

**D2 · The revert drill** second — half an hour, harmless, and it turns four names into four things I've done.

**Still don't understand.** Where my project lives besides my laptop. D3 will tell me.

---

### Chapter 11 — The loop

**Time:** 20 minutes.

**Lost.** Nothing.

**Would skip.** *The cycle* — seven beats: "specify, assemble context, generate, verify, integrate, clean up, record the decision." That's a process diagram for a team, and I'm one person building a choir app in the evenings. I skimmed it and lost nothing, and I'd guess most readers like me do the same.

**Talked down to.** Mildly, only here. The seven-beat ring reads like ceremony, and the sentence defending it — "this one is about moving through them deliberately instead of letting 'generate' swallow the rest" — is doing a lot of work to justify a list I'm not going to follow.

**Recognition.** The strongest in the course after chapter 6.

*The doom loop*: "the same failure returning in new forms, the patch count growing, each fix touching more files than the last. Continuing to patch from inside the accumulated context rarely converges, because the context now contains every wrong assumption that produced the patches."

That is precisely, exactly what I do every time a deploy breaks. I paste errors until it works. Sometimes it takes an hour and I have no idea what fixed it. I've always assumed that was me being bad at this. It has a name and a shape and an exit: "a fresh session, a description of the goal rather than of the patches, plus the one or two facts the failed attempts taught you."

That's the second thing in the course that will change what I do tomorrow, and it might be the first, because it happens weekly.

Also *The unannounced deletion*: "the summary describes additions; the diff contains removals." I have never once read a diff. I read the summary and click accept. This entry made me realise the summary and the change are two different artifacts, and that I've only ever seen one of them.

**The direct test.** "On every substantial diff, ask for three lists before anything else: everything touched that wasn't asked for, everything deleted, and everything added to the project's dependencies."

This is clever, and it's the second direct test I can do start to finish. It gets me the value of reading a diff without reading a diff. "Three empty lists are a committable claim — specific enough to be false" is the best sentence in the chapter, and I'd adopt this as a habit immediately because it costs one paste per change.

**The entries.** *Plausible but wrong*, whose Ask reads "asking helps least here, which is the point of the entry" — I appreciated the honesty and it also left me with nothing to do about the failure that scares me most, which is code that looks right and isn't. The Check points at chapter 12's levels, which for me means tests, which I don't have. That's the loop I keep landing in across this course.

**Going deeper.** **D1 · Write the house rules** first, folding chapter 6's block into it. The side-by-side comparison is what sells it — "show me the two results side by side" gives me evidence rather than a promise.

I wouldn't run **D3 · The restart rehearsal**; I'd just use the doom-loop exit next time it happens, which is what the section is for.

**Still don't understand.** What "context" is, mechanically. It's used as a thing that accumulates and misleads and I have a fuzzy sense of it as "what the chat remembers." That's probably close enough.

---

## 3. After all twelve

**Did I finish?** I did, because I was asked to. Left to myself, I would not have.

**Where I'd have stopped.** Two candidate points, and I want to be precise about both.

The first is chapter 12, read second on the index page's advice, because I'm "already shipping." It's dense, it's methodology rather than machinery, it's full of forward references to chapters I hadn't read ("the proxy green from the entries below," "chapter 11's house rules," "migrations"), and its central apparatus — level 2, assertions — requires tests I don't have and can't get from anything in the chapter. I came in scared about a phone number and chapter two of my reading was about tiering my change history. There was a real chance I'd have closed the laptop there and concluded the course wasn't for me.

The second, if I survived that, is somewhere in chapter 3 or 4. Chapter 2 is the longest in the course and the second half is about scale problems I correctly judged aren't mine at 200 members. Chapter 3's checks are all "block the request in devtools," which I can't do. By then I'd have accumulated four or five "I can't actually perform this" moments and no completed test. I'd have skipped ahead to chapter 6 on the title alone, which — as it turns out — would have been the right move.

**What changes tomorrow.** Concretely, in order:

- **A1.** Run chapter 6's D1 audit and its direct test, with the assistant building the test setup as the chapter says it can. This is the one I've booked an evening for.
- **A2.** Go and find out what my assistant did when it "fixed" my row-level security error, using chapter 6's point 3 as the specific question: did it touch a policy, or did it reach for the master key.
- **A3.** Type `<b>` markup into every free-text field in the choir app and look at every screen that shows it. Chapter 8's direct test, tonight, no help needed.
- **A4.** Run chapter 2's personal-data ask on the choir schema, with "write forever and nothing where those are the answers."
- **A5.** Paste chapter 11's three-list prompt after every change from now on. One paste, no new skill.
- **A6.** Run chapter 10's D3 to find out whether my project exists anywhere but this laptop.
- **A7.** Stop pasting errors when a deploy breaks. Restart the session with the goal instead. Chapter 11's doom loop.

That's seven things, five of which I can do without learning anything new. That's a good return, and I want to be clear it's a good return — I didn't expect a course to hand me that much I could act on.

**What I'm still afraid of.**

- **F1.** That the phone number leak isn't fixed. The course gave me the test for it, which is more than I had, so this fear now has a plan.
- **F2.** That every one of these Asks comes back as a confident, complete-looking table that is quietly missing rows, and I have no way to tell. Chapter 12's "plant a control" is the only defence offered against this and it's one bullet in a list of six near the end of a chapter I nearly abandoned. This is my biggest remaining fear and it's structural — the entire course is asks that produce lists, and my ability to trust a list is addressed once.
- **F3.** The €38. Three chapters get near it and none of them lands it.
- **F4.** That "level 2" is a permanent no for me. Every tier A change is supposed to get an assertion that keeps running, I have none, and nothing tells me how to get the first one.

**What I'd tell a friend in my position.** Read chapter 1, then read chapter 6, then decide. Chapter 6 is worth the whole thing on its own if you're on Supabase and you've ever had a permissions error go away without knowing why. Don't read chapter 12 second no matter what the front page says — read it after you've had one win. And know going in that a good half of the "checks" assume you can open developer tools and that you have a spare copy of your database, and that neither of those is taught anywhere.

---

## 4. The five changes I'd ask for

1. **Teach the three missing capabilities up front, or stop assuming them** — a short "before you start" covering how to get a test copy of your database, how to open devtools and re-send a request, and how to build your client locally, because chapter 2's direct test, chapter 3's four Checks, chapter 5's direct test, chapter 7's direct test and chapters 4/8/9's Checks all silently require one of the three.
2. **Move chapter 12's six enumeration patterns to the front of the course** — "say none if absent," "plant a control" and the rest are the only defence against a confident incomplete list, they're what every other chapter's Ask is built from, and right now they sit near the end of the chapter most likely to be abandoned.
3. **Change the reading order on the index page from "read 12 next if you're shipping" to "read 6 next"** — chapter 6 is where a frightened reader gets a real answer to a real incident, and chapter 12 read cold is forward-references, tests I don't have, and no win.
4. **Give chapter 9's D1 integration inventory a cost column and a spending-cap column** — a surprise bill from a rented service is the money failure this audience actually experiences, and it's the one thing chapters 4, 7 and 9 each brush past without naming.
5. **Rewrite chapter 10's direct test so it can be performed by someone who has never seen a commit** — "name the commit you'd return to" is unusable when you don't know your commits exist; chapter 6 solves the identical problem with "your assistant can build you the setup," and that move should be copied here and into every direct test that needs a tool the reader doesn't have.

---

## 5. Out of persona

Reviewer's note. The reactions I'm most confident generalise are the capability gaps, and they're the finding I'd act on first: this course's *asks* are pitched perfectly for a non-code-reading builder, and its *checks* are pitched for someone who can open devtools, re-send a request, and spin up a throwaway database. That split is consistent across all twelve chapters, it's invisible from the authoring side because each individual check looks small, and it means roughly two-thirds of the direct tests are aspirational for the stated audience. Chapter 6's one sentence handing the setup work to the assistant is the pattern that fixes it, and it appears exactly once. Equally generalisable: the enumeration patterns being the most transferable content in the course while sitting in the twelfth chapter's fourth section; the chapter 12-as-second-read ordering being a real abandonment risk for an anxious reader; and the pull of chapter 6 — any reader arriving with a security scare will read it first regardless of what the index says, so it should be positioned for that. The reaction I'd weight lower is the €38 thread: I built Dani with a specific unexplained bill, and the resulting three-chapter complaint about a missing cost column is sharper than a reader without that scar would produce, though the underlying gap — nothing in the course connects a rented service to what it charges you — is real independent of the persona. Similarly persona-flavoured: the strong preference for quizzes over audits, and the readiness to skim scale material at 200 rows. A reader shipping to 50,000 users would read chapter 2's second half as the most valuable thing in the course. Finally, Dani's "no tests at all" position is common but not universal in this audience, and it exposes something worth deciding on purpose — chapter 12's level 2 is load-bearing for tier A and the course never provides an on-ramp to a first assertion.
