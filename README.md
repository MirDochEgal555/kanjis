# Kanji Learning App

A small browser-based study trainer built as a static two-page app.

It implements the MVP described in this repo:

- show one kanji at a time
- let the user type an English meaning
- reveal the stored answer
- let the user choose the next review time
- save progress locally in the browser

## What Was Built

This implementation uses plain HTML, CSS, and JavaScript so it can run without a build step.

Features included:

- Japanese -> Kanji starter deck
- Spanish -> English starter deck
- dedicated vocabulary editor page for each deck
- CSV import panel for adding more cards
- active recall input for each card
- answer reveal with accepted meanings, readings, and two example sentences
- review scheduling options:
  - Again
  - In 10 minutes
  - Tomorrow
  - In 3 days
  - In 1 week
- local persistence through `localStorage`
- due-card queue based on saved review times
- basic stats:
  - due now
  - studied today
  - total cards
- recent review history
- reset button to clear saved progress

## Files

- `index.html` - language and deck selection screen
- `deck.html` - review deck screen
- `editor.html` - vocabulary set editor
- `styles.css` - layout and styling
- `app.js` - page initialization, deck selection flow, editor logic, review logic, CSV import, scheduling, and persistence

## How To Run

Because this is a static app, there are two straightforward ways to use it.

### Option 1: Open It Directly

Open `index.html` in a browser, choose a deck, and continue to the review page.

This is enough for the app to work in most browsers.

### Option 2: Serve It Locally

If you prefer running it through a local web server, start one in this folder.

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

## Learning Flow

1. A due card is shown.
2. Type the translation you remember.
3. Click `Reveal answer`.
4. Review the accepted answer and readings.
5. Choose the next interval.
6. The app stores the next due time and moves to the next due card.

## Editing Vocabulary Sets

Use the new editor screen to add, update, or remove cards in each deck.

You can open it from:

- the selection screen
- the deck screen

Saved edits are stored locally in the browser per deck.

## Importing More Kanjis

The sidebar contains a CSV import panel for adding more cards without changing code.

Right now CSV import is available for the Japanese -> Kanji deck.

Expected columns:

- `kanji`
- `meanings`
- `readings`
- `example1_jp`
- `example1_en`
- `example2_jp`
- `example2_en`

Example:

```csv
kanji,meanings,readings,example1_jp,example1_en,example2_jp,example2_en
語,"language|word","On: ゴ, Kun: かた.る",日本語を勉強しています。,"I am studying Japanese.",彼はやさしい言葉で話した。,"He spoke in gentle words."
森,forest,"On: シン, Kun: もり",森の中はとても静かだ。,"It is very quiet inside the forest.",朝の森を歩くのが好きです。,"I like walking in the forest in the morning."
```

Notes:

- keep the header row
- use `|` inside the `meanings` column when a card should accept multiple English meanings
- quote fields when they contain commas
- each imported row should contain two Japanese example sentences and two English translations
- imported cards are stored in browser `localStorage`, just like the review schedule
- importing the same kanji with the same primary meaning updates the existing imported card instead of duplicating it

## Storage

The app stores progress in the browser with `localStorage` under a single application key.

That means:

- progress is saved between page reloads
- progress is local to the browser profile
- clearing browser storage removes review history and schedule data

## Current Scheduling Model

The review timing is intentionally simple and user-controlled:

- `Again` = 5 minutes
- `In 10 minutes` = 10 minutes
- `Tomorrow` = 1 day
- `In 3 days` = 3 days
- `In 1 week` = 7 days

This is not a full automatic SRS algorithm yet. The user explicitly chooses the next interval after every reveal.

## Future Enhancements

- multiple accepted translations per card beyond the current small set
- JLPT-based deck imports
- example vocabulary and sentences
- automatic difficulty scoring
- larger study statistics dashboard
- editing or importing custom decks

## License

MIT
