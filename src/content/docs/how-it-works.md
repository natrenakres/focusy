---
title: How Focusy Works
description: A quick tour of focus sessions, projects, and tasks in Focusy.
---

# How Focusy Works

> **Outline — draft in progress.** Section notes and copy prompts are inline as
> blockquotes; replace them with real copy as each section is written.

## Hook

- Open on the core tension: you sit down to do deep work, but your attention
  leaks — to tabs, to notifications, to "just one quick thing."
- Promise: Focusy turns a vague workday into a handful of concrete, finishable
  focus blocks — and it does it entirely in your browser, with none of your data
  leaving your machine.
- One-line thesis: *estimate the work in pomodoros, run the timer, watch a real
  progress bar fill.*
  > Copy note: keep it short and concrete. Consider leading with the
  > local-first angle since that's the differentiator (see story-of-focusy).

## Introduction — the mental model

- Three nested ideas, top to bottom: **Projects → Tasks → Pomodoros**.
- A **project** is a body of work (work / side / personal). It owns its tasks.
- A **task** carries an *estimate* in pomodoros and an *actual* count that grows
  as you work.
- A **pomodoro** is one ~25-minute focus block. Finishing pomodoros is how
  everything else moves.
- Everything lives in your browser's local storage — no account, no sync, no
  server. (Tie back to the privacy promise.)

## Section 1: Projects — organizing what you're working on

- Create a project with a name, a color, and a type (`work`, `side`,
  `personal`).
- The sidebar lists your **in-progress** projects; one is always selected as the
  active project.
- Each project holds its own task list and its own progress.
- Projects have a lifecycle: `in_progress` → `completed`.
  > Detail: the "Mark project completed" button only appears once *every* task in
  > the project is completed. Explain why that gate exists (a project isn't done
  > until its work is).

## Section 2: Tasks — estimating the work

- Add tasks to the active project; each task has a title, optional description,
  and an **estimated pomodoro count** — your up-front guess at effort.
- One task is the **active task** at a time — the one that receives credit when a
  pomodoro completes.
- Task states: `not_started` → `in_progress` → `completed`.
- Why estimate in pomodoros instead of hours? Blocks are concrete and
  countable; they make progress measurable instead of vibes.
  > Example to add: a small task ("write intro") = 1 pomodoro vs. a big one
  > ("refactor auth") = 6. Show how the numbers roll up.

## Section 3: The Pomodoro timer — the engine

- The rhythm: focus block → short break, and after **4** completed pomodoros, a
  longer break. (Defaults: 25 / 5 / 15 minutes.)
- What makes Focusy's timer different: it's **timestamp-based, not a ticking
  counter**. It remembers *when* you started and computes the time left from the
  clock.
  - So reloading the page, closing the tab, or letting your laptop sleep doesn't
    desync the timer — it just picks up the correct remaining time.
- Feedback when a block ends: a desktop notification, a sound, and a live
  countdown in the browser tab title.
- Start / pause / resume / stop, and the automatic hand-off into breaks.
  > Copy note: this is the "wow, it just works" section — lead with the reload
  > resilience, it's the most reassuring detail for a focus tool.

## Section 4: Progress — turning blocks into a picture

- When a pomodoro completes, it credits the **active task** in the active
  project (+1 to its actual count).
- Project progress = total *actual* pomodoros ÷ total *estimated* pomodoros,
  capped at 100% so overruns don't overflow the bar.
- This gives an honest, live read on "how far into this project am I, really?"
- Completing all tasks unlocks marking the whole project done.
  > Consider a small worked example: 3 tasks estimated at 2+3+1 = 6 pomodoros;
  > after 4 completed, the bar reads 67%.

## Section 5: Focus sessions & your workday

- A **focus session** frames a working day: it starts, tracks pauses, and can be
  completed; finished sessions are kept in history.
- Focusy knows your **work-hour settings** — weekly hours, daily hours, and a
  lunch break (defaults 40h / 8h / 30min).
- From those it computes an **expected end time** for the day, so a session isn't
  open-ended — it maps onto a real schedule.
  > Clarify the relationship for the reader: sessions = the day-level container;
  > pomodoros = the minute-level blocks inside it. Don't let the two timers
  > blur together.

## Section 6: Your data stays yours

- Local-first by design: all state (projects, tasks, sessions, settings, timer)
  persists in browser `localStorage`. No backend, no account, no telemetry.
- Practical implications, stated plainly:
  - It works offline and starts instantly.
  - Data is tied to this browser on this device — clearing site data wipes it.
  - **Import / export** via JSON is how you back up or move your projects.
  > Copy note: frame the trade-off honestly (you own the data *and* the
  > responsibility for it). Links nicely back to the hook's privacy promise.

## Conclusion

- Recap the loop in one breath: pick a project → break it into estimated tasks →
  run pomodoros → watch progress fill → complete the project.
- Reinforce the two differentiators: a timer that survives real-world
  interruptions, and data that never leaves your machine.
- Call to action.
  > CTA options: "Create your first project," or link to the getting-started /
  > story-of-focusy doc.

---

## Copy & research to-do

- [ ] Confirm the default durations shown to *users* match the shipped build
      (`.env` uses small test values; realistic fallbacks are 25 / 5 / 15).
- [ ] Decide voice/tone — match `story-of-focusy.md` once that's written.
- [ ] Add one concrete worked example (numbers) somewhere in Sections 2–4.
- [ ] Screenshots or GIFs: sidebar, timer, progress bar, complete-project button.
- [ ] Cross-link: getting started, settings/work-hours, import-export.
