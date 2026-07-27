# Demo Recording Script (2–3 minutes)

Record your screen (e.g. OBS, QuickTime, Loom) at 1280×800 or larger for the desktop segments, then resize to a phone width for the mobile segment. Narrate each beat briefly — you don't need a full script, just hit these points in order.

Before recording: make sure `server/.env` has a working `ANTHROPIC_API_KEY` (or your chosen provider) with available credits, and both `npm run dev` servers are running.

---

### 0:00 – 0:15 | Home page

- Open the app. Point out the large textarea, placeholder text, character counter, and the two generate buttons (both disabled while the textarea is empty).
- Mention: dark mode is on by default (system-aware), toggle it once to show light mode, then back.

### 0:15 – 0:35 | Paste notes + generate flashcards

- Paste a paragraph of real notes (or type a topic, e.g. "The water cycle").
- Click **Generate Flashcards**.
- **Show the loading state**: skeleton UI + disabled buttons + spinner text ("Generating...") — pause half a second here so it's visible on camera.

### 0:35 – 1:00 | Flashcards interactivity

- Once cards render: click the card to **flip** it (show the 3D flip animation).
- Click **Next** / **Prev** a couple of times, pointing out the progress bar updates.
- Click **Shuffle** — show the order changes.
- Click **Restart** — show progress resets to card 1.
- Mention keyboard shortcuts (Space/←/→/S/R) — press Space once to flip via keyboard.

### 1:00 – 1:20 | Generate quiz

- Go back to the textarea (same or new notes), click **Generate Quiz**.
- Briefly show the difficulty badge and quiz timer starting.

### 1:20 – 1:55 | Take the quiz

- Answer 2–3 questions, showing radio-button selection and Next/Previous navigation.
- Deliberately answer at least one question **incorrectly**.
- On the last question, show **Submit** is disabled until all questions are answered, then answer the last one and submit.

### 1:55 – 2:15 | Results + retry incorrect

- Show the score percentage, the "Great job / Good effort / Keep practicing" label, and the full review list with per-question correct/incorrect badges and explanations.
- Click **Retry incorrect** — show it drops straight into a new round containing only the missed question(s), with the timer reset and a "Retry round 2" badge.
- Answer it correctly, submit, show 100% and that the retry button disappears.

### 2:15 – 2:35 | Error handling

- Stop the backend server (or temporarily set a bad API key) and click Generate again.
- Show the **ErrorState** with a human-readable message and the **Retry** button — click Retry to show it attempts again gracefully (no crash, no blank screen).
- Restart the backend before continuing, if you want to show a successful retry afterward.

### 2:35 – 2:50 | Responsive / mobile view

- Resize the browser (or open dev tools device toolbar) to a phone width (~375px).
- Scroll through the home page and a flashcard/quiz view, showing the layout adapts cleanly — no horizontal scroll, buttons remain tappable.

### 2:50 – 3:00 | Wrap-up

- Mention the tech stack in one line: "React + Vite + Tailwind frontend, Express + Claude backend, Zod validation end-to-end."
- End on the results screen or home page.

---

## Optional bonus beats (if you have time to spare)

- Show **Download JSON** on a flashcard deck or quiz.
- Show **Copy notes** button.
- Reload the page and open **Recent History** — click an entry to show it restores instantly with no network request (open dev tools Network tab to prove it).
- Click Generate multiple times rapidly to show only the last response ever renders (race-condition handling) — best shown by opening the Network tab and pointing out earlier requests are aborted.
