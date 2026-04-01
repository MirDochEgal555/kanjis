# Kanji Learning App

A static browser study app for lightweight, manual spaced repetition.

It currently supports two deck flows:

- Japanese -> Kanji meaning recall
- Spanish -> English vocabulary recall

The app is intentionally simple: open a deck, type the answer you remember, reveal the stored answer, and choose when the card should come back.

## What The App Includes

- deck selection screen
- focused review screen with active recall input
- manual scheduling after each reveal
- local progress persistence with `localStorage`
- per-deck vocabulary editor
- recent review history
- due-now, studied-today, and total-card stats
- mobile and desktop layout toggle on the review screen
- forgiving answer matching for case, articles, punctuation, and simple singular or plural variations
- optional typo tolerance for longer answers, with conservative matching rules
- CSV import for Japanese -> Kanji and Spanish -> English decks
- deck backup export and restore with JSON files

## Supported Decks

| Language | Deck | Status | Import Support |
| --- | --- | --- | --- |
| Japanese | Kanji | Live | Yes |
| Spanish | English | Live | Yes |
| Chinese | Future | Not yet available | No |
| Korean | Future | Not yet available | No |

## Screens And Flow

### 1. Selection

`index.html` lets the user choose a language and set, then open either the study deck or the vocabulary editor.

### 2. Study Deck

`deck.html` is the main review experience:

1. See the prompt.
2. Type the answer you remember.
3. Reveal the stored answer.
4. Review meanings, readings or notes, and example sentences.
5. Choose the next review interval.

### 3. Vocabulary Editor

`editor.html` lets the user:

- add cards
- edit prompts and accepted answers
- add or remove example sentences
- search the current set
- reset the deck back to its defaults

## Project Structure

- `index.html` - deck and language selection
- `deck.html` - review workflow
- `editor.html` - deck editing workflow
- `styles.css` - visual system, responsive layout, and page styling
- `app.js` - shared application logic, deck data, persistence, review scheduling, editor behavior, CSV import, and deck backup handling

## How To Run

This project has no build step.

### Option 1: Open Directly

Open `index.html` in a browser.

### Option 2: Serve Locally

Using Python:

```bash
python -m http.server 8000
```

Then open:

```text
http://localhost:8000
```

Using Node's `serve` package:

```bash
npx serve .
```

## Data Storage

The app stores data in browser `localStorage`.

That includes:

- review state and due times
- recent history
- selected deck
- preferred layout mode
- edited deck content
- imported cards

Important behavior:

- progress is saved per browser profile
- data stays after reloads
- clearing browser storage removes study progress and local deck edits
- deck content and review state are stored under multiple keys, not a single key

## Scheduling Model

The current review timing is user-controlled rather than algorithmic.

Available intervals:

- `Again` = 5 minutes
- `In 10 minutes` = 10 minutes
- `Tomorrow` = 1 day
- `In 3 days` = 3 days
- `In 1 week` = 7 days

This keeps the review loop understandable and easy to test, but it is not yet a full automatic SRS system.

## Editing And Importing Cards

### Editor

Use the editor page to maintain deck content without changing code.

Each card can contain:

- a prompt
- one or more accepted answers
- readings or notes when the deck supports them
- up to two example sentence pairs

### CSV Import

CSV import is currently enabled for the Japanese -> Kanji and Spanish -> English decks.

Expected columns:

Japanese deck columns:
`kanji`, `meanings`, `readings`, `example1_jp`, `example1_en`, `example2_jp`, `example2_en`

Spanish deck columns:
`spanish`, `meanings`, `example1_es`, `example1_en`, `example2_es`, `example2_en`

Example:

```csv
kanji,meanings,readings,example1_jp,example1_en,example2_jp,example2_en
語,"language|word","On: ゴ, Kun: かた.る",日本語を勉強しています。,"I am studying Japanese.",彼はやさしい言葉で話した。,"He spoke in gentle words."
森,forest,"On: シン, Kun: もり",森の中はとても静かだ。,"It is very quiet inside the forest.",朝の森を歩くのが好きです。,"I like walking in the forest in the morning."
```

Import notes:

- keep the header row
- use `|` to separate multiple accepted meanings
- quote fields that contain commas
- each imported row should contain two example sentence pairs
- importing the same prompt with the same primary meaning updates the existing imported card instead of duplicating it

### Deck Backup

The review page can export the current deck as a JSON backup and restore it later.

A deck backup includes:

- the saved deck content for the selected deck
- due times and review progress for that deck
- recent review history for that deck

## Current Notes

- The app is fully static and intentionally dependency-free.
- The Japanese and Spanish starter content in the codebase still needs a UTF-8 cleanup pass in a few places.

## Roadmap

### Next

- improve per-card feedback with clearer progress and difficulty signals

### Planned

- undo last review
- keyboard shortcuts for reveal and scheduling
- more study modes such as due-only, new-only, and mixed
- richer per-card progress data such as lapses, last seen, and next due
- hard-card filtering and review

### Nice To Have

- clean the remaining mojibake in static HTML placeholders and CSV example copy
- automatic SRS scoring on top of manual scheduling
- JLPT or level-based expansion packs
- larger stats dashboard with streaks and weekly activity
- additional language tracks such as Chinese and Korean
- screenshots or short demo media in the README

## Why This Project Is Useful

This app is a good fit if you want:

- a learning tool that works without a backend
- editable study content stored locally
- a transparent review loop without hidden scheduling logic
- a small codebase built with plain HTML, CSS, and JavaScript

## License

MIT
