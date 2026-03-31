# Kanji Learning App

A simple web application for learning kanji with active recall and spaced repetition.

## Idea

The app shows a kanji and asks the user for its translation.  
After submitting an answer, the correct solution is revealed.  
The user can then decide when the kanji should appear again, depending on how well they knew it.

This creates a lightweight review system where difficult kanji return sooner and easy kanji can be postponed further into the future.

## Core Features

- Show a kanji to the user
- Ask for the translation
- Reveal the correct answer after submission
- Let the user choose when the kanji should be shown again
- Store review intervals for each kanji
- Repeat kanji based on the selected schedule

## Learning Flow

1. A kanji is displayed
2. The user types the translation
3. The app reveals the correct answer
4. The user selects a review option such as:
   - Again
   - Soon
   - Later
   - Easy
5. The kanji is scheduled for its next appearance based on that choice

## Example Review Options

Possible interval choices after seeing the correct solution:

- **Again** → show very soon
- **In 10 minutes**
- **Tomorrow**
- **In 3 days**
- **In 1 week**

The exact intervals can be adjusted later.

## Goal

The goal of the app is to make kanji learning fast, simple, and effective by combining:

- active recall
- immediate feedback
- user-controlled repetition timing

## Possible Tech Stack

- **Frontend:** React / Next.js / plain JavaScript
- **Styling:** Tailwind CSS / CSS
- **Storage:** LocalStorage, SQLite, or database backend
- **Deployment:** Vercel, Netlify, or GitHub Pages

## Future Enhancements

- Multiple accepted translations
- Kana readings (onyomi / kunyomi)
- Example words and sentences
- Difficulty statistics
- Progress tracking
- Built-in spaced repetition algorithm
- Import kanji decks by JLPT level

## Project Vision

This project is meant to be a focused kanji trainer, not a bloated language platform.  
The main experience should stay extremely simple:

**See kanji → answer → reveal solution → choose next review time**

## MVP

The first version should support:

- a kanji dataset
- one review card at a time
- text input for translation
- answer reveal
- review-time selection
- saving the next review date for each kanji

## License

MIT