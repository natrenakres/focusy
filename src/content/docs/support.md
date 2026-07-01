---
title: Support
description: Help, FAQs, and troubleshooting for Focusy — the local-first focus app.
---

# Support

Need a hand with Focusy? Start here. If you don't find your answer, email us at
[info@focus.io](mailto:info@focus.io).

## Getting started

Focusy organizes your work into three nested layers:

1. **Projects** — a body of work (work, side, or personal). Create one, give it a
   name and color, and it shows up in the sidebar.
2. **Tasks** — the pieces of a project. Each task carries an estimate in
   pomodoros.
3. **Pomodoros** — ~25-minute focus blocks. Finishing them is what moves your
   progress bar.

Pick a project, add a few tasks with pomodoro estimates, start the timer, and
work. For the full tour, see [How Focusy Works](/docs/how-it-works).

## Frequently asked questions

### Do I need an account?

No. Focusy has no sign-up and no login. Open it and start working.

### Where is my data stored?

On your device, in your browser's local storage. Nothing is sent to a server —
see our [Privacy Policy](/docs/privacy) for details.

### I lost my projects. Can you restore them?

Unfortunately, no. Because your data lives only in your browser and we never
receive a copy, we have nothing to restore from. Data can disappear if you clear
your browser's site data, switch browsers or devices, or use a private/incognito
window. **Export regularly** to keep a backup.

### How do I back up or move my data?

Open **Settings** (in the sidebar) and use:

- **Export Data** — saves your projects and their tasks to a `.json` file on your
  computer.
- **Import Project** — loads a previously exported `.json` file back into Focusy.

> **Note:** Export/Import uses your browser's File System Access API, which is
> currently supported in Chromium-based browsers (Chrome, Edge, Opera). If you
> don't see these buttons, your browser doesn't support the feature yet — try one
> of those browsers to create a backup.

Importing replaces your current project list with the contents of the file, so
export your existing work first if you want to keep it.

### The timer keeps running when I reload or switch tabs — is that a bug?

No, that's by design. Focusy's pomodoro timer is timestamp-based: it remembers
*when* you started and calculates the remaining time from the clock. Reloading
the page, closing the tab, or letting your laptop sleep won't desync it — it
picks up the correct remaining time.

### I'm not getting notifications when a block ends.

Focusy uses your browser's notification system, which requires permission:

1. Make sure you allowed notifications for Focusy when prompted.
2. Check your browser's site settings and re-enable notifications if they were
   blocked.
3. Check your operating system's notification settings — some systems suppress
   browser notifications in focus/do-not-disturb modes.

Even without notifications, you'll still get the in-tab countdown and the sound
when a block ends.

### How do breaks work?

After a focus block you get a short break, and after every **4** completed
pomodoros you get a longer break. The default rhythm is 25 minutes of focus, a
5-minute short break, and a 15-minute long break.

### When can I mark a project completed?

The "Mark project completed" button appears once **every** task in the project is
completed — a project isn't done until its work is.

### Which browsers does Focusy support?

Focusy works in modern browsers. Export/Import requires a Chromium-based browser
(see above). For the most reliable experience, keep your browser up to date.

## Still stuck?

Email [info@focus.io](mailto:info@focus.io) with a short description of what you
were doing and what you expected to happen. Screenshots help.
