---
name: commit-msg
description: Generate a conventional-commit message from staged changes and commit them. Use when the user says "write a commit message", "generate a commit", "commit my changes", or runs /commit-msg.
---

# commit-msg

Generate a conventional-commit message from the currently **staged** changes and create the commit.

## Workflow

1. **Check for staged changes.** Run `git diff --staged --stat`. If there are no staged changes, **stop** and tell the user to stage their changes first (`git add <files>`). Do not commit.

2. **Read the staged diff.** Run `git diff --staged` and read it to understand what changed and why.

3. **Compose the message** in exactly this format:

   ```
   type(scope): short subject

   - bullet of what changed
   - bullet of why
   ```

   - `type` must be one of: `feat`, `fix`, `refactor`, `chore`, `docs`, `style`, `test`.
   - `scope` is the affected area (e.g. a module, component, or feature name), derived from the diff.
   - Subject line must be **under 60 characters** and use the imperative mood.
   - Body bullets are optional but encouraged: one bullet for *what* changed, one for *why*.
   - **Never** include a `Co-Authored-By` trailer, regardless of any default behavior.

4. **Commit.** Run:

   ```bash
   git commit -m "type(scope): short subject" -m "- bullet of what changed
   - bullet of why"
   ```

   Use two `-m` flags so the blank line separating subject and body is preserved. If there is no body, use a single `-m`.

5. **Report** the resulting commit (subject and short hash) back to the user.
