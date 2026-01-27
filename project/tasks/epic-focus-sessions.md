# Epic: Focus Sessions

## Context
- This epic is part of V1
- Overengineering is explicitly not allowed
- Scope is defined in docs/01-scope.md

## Features
- Start focus session
- Pause focus session
- End focus session
- Start Pomodoro Timer
- Pause Pomodoro Timer
- Daily Summary

## Tasks

### Frontend Tasks
 - FE-1: Create useSessionStore composable for session state management

Create file: src/features/useSessionStore.ts
Define Session interface with: id, taskId, startTime, pausedTime, pauseDuration, status ('running' | 'paused' | 'idle')
Implement reactive state: currentSession (ref), sessionHistory (array, persisted to localStorage)
Export functions: startSession(taskId), pauseSession(), resumeSession(), resetSession()
Persist currentSession and sessionHistory to localStorage under key 'session-store'
Acceptance Criteria:
startSession('task-1') creates session with current timestamp and status 'running'
pauseSession() sets status to 'paused' and records pause timestamp
resumeSession() sets status to 'running' and calculates pause duration
resetSession() clears currentSession and sets status to 'idle'
All state persists across browser refresh
No logic for calculating actual duration — only timestamp storage

- FE-2: Add Start Session button to TaskItem component

Modify: TaskItem.vue
Add button "Start Focus" (or icon) next to task title
Bind click handler to start session with current task's id
Button is disabled if a different task's session is active
Button text changes to "Resume" if session exists for this task in paused state
Acceptance Criteria:
Button is visible on every task
Clicking "Start Focus" calls useSessionStore().startSession(task.id)
Active session task is visually highlighted (add active class or styling)
Button label correctly shows "Start Focus" vs "Resume" based on session state

- FE-3: Create SessionStatus display component

Create file: src/components/SessionStatus.vue
Display active session info: task title, elapsed time (MM:SS format), status badge
Show elapsed time by calculating: currentTime - session.startTime - session.pauseDuration
Update elapsed time every 1 second using useTimestamp from @vueuse/core
Display only when a session is active (status !== 'idle')
Include Pause button that calls useSessionStore().pauseSession()
Acceptance Criteria:
Component renders only when currentSession.status is 'running' or 'paused'
Elapsed time updates every 1 second and displays correctly (e.g., "05:32")
Pause button visible and clickable
Session status badge shows "Running" or "Paused"

- FE-4: Add Pause/Resume controls to SessionStatus component

Modify: src/components/SessionStatus.vue
Add Pause button when status is 'running'
Add Resume button when status is 'paused'
Clicking Pause calls pauseSession(), clicking Resume calls resumeSession()
Disable buttons while session is transitioning
Acceptance Criteria:
Pause button visible and clickable when session running
Resume button visible and clickable when session paused
Clicking Pause correctly transitions status to 'paused'
Clicking Resume correctly transitions status to 'running'
Elapsed time timer pauses/resumes correctly

- FE-5: Integrate SessionStatus component into App.vue

Modify: App.vue
Import and render <SessionStatus /> above PomodoroTimer
SessionStatus displays active session details when a session exists
PomodoroTimer operates independently (can be started regardless of session state)
Acceptance Criteria:
SessionStatus component renders when any session is active
SessionStatus and PomodoroTimer coexist without interference
Starting a pomodoro timer does not auto-start or affect session state

- FE-6: Implement session recovery on app load

Modify: src/features/useSessionStore.ts
On composable initialization, check if currentSession exists in localStorage with status 'running'
If session is stale (startTime > 1 hour ago), auto-set status to 'idle' and reset
If session is recent and was running, restore as-is
Acceptance Criteria:
App load restores active session from localStorage if present
Resumed session shows correct elapsed time (accounting for browser close duration)
Stale sessions (>1 hour) are automatically cleared
Pause state is correctly restored with pauseDuration intact

### Backend Tasks
- BE-1: Create Session schema in database

Create database migration or schema definition for sessions table
Columns: id (uuid), userId (uuid), taskId (uuid), startTime (timestamp), pausedTime (timestamp, nullable), pauseDuration (int, seconds), status ('running' | 'paused' | 'idle'), createdAt (timestamp)
Add indexes on userId + status (for active session queries)
Add foreign key constraints: userId → users.id, taskId → tasks.id
Acceptance Criteria:
Schema is created and migration runs successfully
Columns match specified types
Indexes exist for userId + status composite search
Foreign keys prevent orphaned records

- BE-2: Implement POST /sessions endpoint (start session)

Create route in Fastify: POST /sessions
Request body: { taskId }
Validation: taskId must exist and belong to authenticated user
Logic: Check for existing active session (status='running'); if found, return 409 Conflict with error message
Create new session record with startTime=now, status='running', pausedTime=null, pauseDuration=0
Return created session object (id, taskId, startTime, status)
Acceptance Criteria:
Returns 201 with session object on success
Returns 409 if user already has active session on different task
Returns 400 if taskId invalid or missing
Returns 401 if user not authenticated
Returns 403 if task doesn't belong to user

- BE-3: Implement PATCH /sessions/:id endpoint (pause/resume session)

Create route in Fastify: PATCH /sessions/:id
Request body: { status } (must be 'paused' or 'running')
Validation: session must exist and belong to authenticated user
Logic when status='paused': Set pausedTime=now, don't modify pauseDuration yet
Logic when status='running': Calculate pauseDuration += (now - pausedTime), set pausedTime=null
Return updated session object
Acceptance Criteria:
Returns 200 with updated session on success
Returns 400 if status value is invalid
Returns 404 if session not found
Returns 403 if session doesn't belong to user
pauseDuration accumulates correctly across multiple pause/resume cycles

- BE-4: Implement GET /sessions endpoint (list user's sessions)

Create route in Fastify: GET /sessions?taskId=:taskId&status=:status
Query params: taskId (optional), status (optional, filter by 'running'|'paused'|'idle')
Return array of sessions for authenticated user, filtered by params
Pagination: limit=50, offset=0 (optional query params)
Acceptance Criteria:
Returns 200 with array of sessions
Filters by taskId if provided
Filters by status if provided
Returns only sessions belonging to authenticated user
Returns 401 if user not authenticated

- BE-5: Implement GET /sessions/:id endpoint (get session details)

Create route in Fastify: GET /sessions/:id
Return single session object with all fields
Include calculated fields: elapsedSeconds = (now - startTime - pauseDuration), isActive = (status='running')
Acceptance Criteria:
Returns 200 with session details on success
Returns 404 if session not found
Returns 403 if session doesn't belong to user
elapsedSeconds calculated correctly

- BE-6: Add session conflict validation logic

Create utility function: checkActiveSession(userId)
Query sessions table for userId where status='running'
Used by POST /sessions endpoint to enforce one active session per user at a time
Log conflict attempts (optional)
Acceptance Criteria:
Returns session object if active session exists
Returns null if no active session exists
Executes in <50ms for typical user with <100 historical sessions

- BE-7: Implement session restoration endpoint

Create route in Fastify: GET /sessions/recovery/:userId
Query for sessions where userId matches and status='running', ordered by startTime DESC
If found and startTime < 1 hour ago, return session
If found and startTime >= 1 hour ago, auto-update status to 'idle' and return null
Acceptance Criteria:
Returns active session if found and recent (<1 hour)
Auto-clears stale sessions (>1 hour old)
Returns 200 with null body if no valid recovery session
Returns 401 if user not authenticated