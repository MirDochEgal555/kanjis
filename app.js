const STORAGE_KEY = "kanji-learning-app-state-v2";
const LEGACY_STORAGE_KEYS = ["kanji-learning-app-state-v1"];

const DEFAULT_INTERVALS = [
  { key: "again", label: "Again", minutes: 5, description: "Bring it back almost immediately." },
  { key: "soon", label: "In 10 minutes", minutes: 10, description: "Short reinforcement." },
  { key: "tomorrow", label: "Tomorrow", minutes: 60 * 24, description: "See it again the next day." },
  { key: "three-days", label: "In 3 days", minutes: 60 * 24 * 3, description: "Push it a little further out." },
  { key: "week", label: "In 1 week", minutes: 60 * 24 * 7, description: "Save it for a confident review." }
];

const STARTER_DECK = [
  { id: "sun", kanji: "日", meanings: ["sun", "day"], readings: "On: ニチ / ジツ, Kun: ひ / -び / -か" },
  { id: "moon", kanji: "月", meanings: ["moon", "month"], readings: "On: ゲツ / ガツ, Kun: つき" },
  { id: "fire", kanji: "火", meanings: ["fire"], readings: "On: カ, Kun: ひ / -び / ほ-" },
  { id: "water", kanji: "水", meanings: ["water"], readings: "On: スイ, Kun: みず" },
  { id: "tree", kanji: "木", meanings: ["tree", "wood"], readings: "On: モク / ボク, Kun: き / こ-" },
  { id: "person", kanji: "人", meanings: ["person", "human"], readings: "On: ジン / ニン, Kun: ひと" },
  { id: "mountain", kanji: "山", meanings: ["mountain"], readings: "On: サン, Kun: やま" },
  { id: "river", kanji: "川", meanings: ["river"], readings: "On: セン, Kun: かわ" },
  { id: "mouth", kanji: "口", meanings: ["mouth"], readings: "On: コウ / ク, Kun: くち" },
  { id: "school", kanji: "学", meanings: ["study", "learning"], readings: "On: ガク, Kun: まな.ぶ" },
  { id: "big", kanji: "大", meanings: ["big", "large"], readings: "On: ダイ / タイ, Kun: おお-" },
  { id: "small", kanji: "小", meanings: ["small"], readings: "On: ショウ, Kun: ちい.さい / こ- / お-" }
];

const elements = {
  dueCount: document.getElementById("due-count"),
  studiedToday: document.getElementById("studied-today"),
  totalCount: document.getElementById("total-count"),
  kanjiCharacter: document.getElementById("kanji-character"),
  kanjiHint: document.getElementById("kanji-hint"),
  answerForm: document.getElementById("answer-form"),
  answerInput: document.getElementById("answer-input"),
  feedbackPanel: document.getElementById("feedback-panel"),
  correctAnswer: document.getElementById("correct-answer"),
  answerEvaluation: document.getElementById("answer-evaluation"),
  readingText: document.getElementById("reading-text"),
  scheduleOptions: document.getElementById("schedule-options"),
  reviewCard: document.getElementById("review-card"),
  emptyState: document.getElementById("empty-state"),
  resetProgress: document.getElementById("reset-progress"),
  historyList: document.getElementById("history-list"),
  intervalList: document.getElementById("interval-list"),
  cardPrompt: document.getElementById("card-prompt"),
  scheduleOptionTemplate: document.getElementById("schedule-option-template"),
  importForm: document.getElementById("import-form"),
  csvInput: document.getElementById("csv-input"),
  csvFile: document.getElementById("csv-file"),
  importFeedback: document.getElementById("import-feedback")
};

let state = loadState();
let currentCardId = null;

renderIntervalLegend();
render();

elements.answerForm.addEventListener("submit", (event) => {
  event.preventDefault();

  if (!currentCardId) {
    return;
  }

  const card = getCardById(currentCardId);
  const answer = elements.answerInput.value.trim();
  const isCorrect = evaluateAnswer(answer, card.meanings);

  elements.feedbackPanel.classList.remove("hidden");
  elements.correctAnswer.textContent = card.meanings.join(" / ");
  elements.readingText.textContent = getReadingText(card);
  elements.answerEvaluation.textContent = answer
    ? isCorrect
      ? "Your answer matches one of the accepted meanings."
      : `You answered "${answer}". Use the revealed answer to decide the next interval.`
    : "No answer entered. Review the meaning, then choose the next interval.";

  renderScheduleOptions(card, answer, isCorrect);
});

elements.resetProgress.addEventListener("click", () => {
  localStorage.removeItem(STORAGE_KEY);
  LEGACY_STORAGE_KEYS.forEach((key) => localStorage.removeItem(key));
  state = loadState(true);
  currentCardId = null;
  clearImportFeedback();
  elements.csvInput.value = "";
  elements.csvFile.value = "";
  render();
});

elements.csvFile.addEventListener("change", async (event) => {
  const [file] = event.target.files ?? [];

  if (!file) {
    return;
  }

  try {
    elements.csvInput.value = await file.text();
    setImportFeedback(`Loaded ${file.name}. Review the CSV and import when ready.`);
  } catch (error) {
    setImportFeedback("Unable to read the selected file.", true);
  }
});

elements.importForm.addEventListener("submit", (event) => {
  event.preventDefault();

  try {
    const result = importCardsFromCsv(elements.csvInput.value);
    elements.csvInput.value = "";
    elements.csvFile.value = "";
    setImportFeedback(`Imported ${result.total} card(s): ${result.added} new, ${result.updated} updated.`);
  } catch (error) {
    setImportFeedback(error.message, true);
  }
});

function loadState(forceFresh = false) {
  if (!forceFresh) {
    const raw = localStorage.getItem(STORAGE_KEY) ?? loadLegacyState();

    if (raw) {
      try {
        const parsed = JSON.parse(raw);

        if (parsed && typeof parsed === "object") {
          return sanitizeState(parsed);
        }
      } catch (error) {
        console.warn("Unable to parse saved state. Resetting.", error);
      }
    }
  }

  const now = Date.now();
  return {
    importedCards: [],
    cards: buildCardStateMap(getStarterDeck(), {}, now),
    history: []
  };
}

function sanitizeState(rawState) {
  const importedCards = sanitizeImportedCards(rawState.importedCards);
  const deck = [...getStarterDeck(), ...importedCards];
  const cards = buildCardStateMap(deck, rawState.cards ?? {});
  const history = Array.isArray(rawState.history)
    ? rawState.history
        .filter((entry) => entry && typeof entry === "object" && typeof entry.cardId === "string")
        .slice(0, 12)
    : [];

  return { importedCards, cards, history };
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function render() {
  const dueCards = getDueCards();
  const nextCard = dueCards[0] ?? null;

  elements.totalCount.textContent = String(getDeck().length);
  elements.dueCount.textContent = String(dueCards.length);
  elements.studiedToday.textContent = String(getStudiedTodayCount());
  renderHistory();

  if (!nextCard) {
    currentCardId = null;
    elements.reviewCard.classList.add("hidden");
    elements.emptyState.classList.remove("hidden");
    return;
  }

  currentCardId = nextCard.id;
  elements.reviewCard.classList.remove("hidden");
  elements.emptyState.classList.add("hidden");
  elements.feedbackPanel.classList.add("hidden");
  elements.scheduleOptions.innerHTML = "";
  elements.answerForm.reset();

  elements.kanjiCharacter.textContent = nextCard.kanji;
  elements.kanjiHint.textContent = buildHint(nextCard);
  elements.cardPrompt.textContent = `What does ${nextCard.kanji} mean?`;
  elements.answerInput.focus();
}

function renderScheduleOptions(card, answer, isCorrect) {
  elements.scheduleOptions.innerHTML = "";

  DEFAULT_INTERVALS.forEach((option) => {
    const button = elements.scheduleOptionTemplate.content.firstElementChild.cloneNode(true);
    button.innerHTML = `<strong>${option.label}</strong><span>${option.description}</span>`;
    button.addEventListener("click", () => scheduleCard(card.id, option, answer, isCorrect));
    elements.scheduleOptions.appendChild(button);
  });
}

function renderIntervalLegend() {
  elements.intervalList.innerHTML = "";

  DEFAULT_INTERVALS.forEach((option) => {
    const item = document.createElement("li");
    item.innerHTML = `<strong>${option.label}</strong>${option.description}`;
    elements.intervalList.appendChild(item);
  });
}

function renderHistory() {
  elements.historyList.innerHTML = "";

  if (!state.history.length) {
    const item = document.createElement("li");
    item.textContent = "No reviews yet.";
    elements.historyList.appendChild(item);
    return;
  }

  state.history.forEach((entry) => {
    const card = getCardById(entry.cardId);

    if (!card) {
      return;
    }

    const interval = DEFAULT_INTERVALS.find((option) => option.key === entry.intervalKey);
    const item = document.createElement("li");
    const answerStatus = entry.isCorrect ? "Accepted" : "Needs work";
    item.innerHTML = `<strong>${card.kanji} - ${card.meanings.join(" / ")}</strong>${answerStatus} | ${interval?.label ?? "Scheduled"} | ${formatRelativeDate(entry.reviewedAt)}`;
    elements.historyList.appendChild(item);
  });

  if (!elements.historyList.childElementCount) {
    const item = document.createElement("li");
    item.textContent = "No reviews yet.";
    elements.historyList.appendChild(item);
  }
}

function scheduleCard(cardId, option, answer, isCorrect) {
  const reviewedAt = Date.now();

  state.cards[cardId] = {
    dueAt: reviewedAt + option.minutes * 60 * 1000,
    lastReviewedAt: reviewedAt,
    lastIntervalKey: option.key
  };

  state.history.unshift({
    cardId,
    reviewedAt,
    answer,
    isCorrect,
    intervalKey: option.key
  });
  state.history = state.history.slice(0, 8);

  saveState();
  render();
}

function getDueCards() {
  const now = Date.now();

  return getDeck()
    .filter((card) => (state.cards[card.id]?.dueAt ?? now) <= now)
    .sort((left, right) => {
      const leftDue = state.cards[left.id]?.dueAt ?? now;
      const rightDue = state.cards[right.id]?.dueAt ?? now;
      return leftDue - rightDue;
    });
}

function getStudiedTodayCount() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const startOfDay = today.getTime();

  return Object.values(state.cards).filter((cardState) => {
    return Number.isFinite(cardState.lastReviewedAt) && cardState.lastReviewedAt >= startOfDay;
  }).length;
}

function buildHint(card) {
  const cardState = state.cards[card.id];

  if (!cardState?.lastIntervalKey) {
    return "New card. Try the most common English meaning first.";
  }

  const lastInterval = DEFAULT_INTERVALS.find((option) => option.key === cardState.lastIntervalKey);
  return `Last scheduled as "${lastInterval?.label ?? "custom"}". Recall before revealing.`;
}

function getCardById(cardId) {
  return getDeck().find((card) => card.id === cardId);
}

function evaluateAnswer(answer, acceptedMeanings) {
  const normalizedAnswer = normalizeText(answer);
  const answerParts = normalizedAnswer
    .split(/[,/]/)
    .map((part) => part.trim())
    .filter(Boolean);

  return acceptedMeanings.some((meaning) => {
    const normalizedMeaning = normalizeText(meaning);
    return normalizedAnswer === normalizedMeaning || answerParts.includes(normalizedMeaning);
  });
}

function normalizeText(value) {
  return value
    .trim()
    .toLowerCase()
    .replace(/\b(a|an|the)\s+/g, "")
    .replace(/\s+/g, " ");
}

function formatRelativeDate(timestamp) {
  const formatter = new Intl.RelativeTimeFormat(undefined, { numeric: "auto" });
  const diffMs = timestamp - Date.now();
  const diffMinutes = Math.round(diffMs / (60 * 1000));

  if (Math.abs(diffMinutes) < 60) {
    return formatter.format(diffMinutes, "minute");
  }

  const diffHours = Math.round(diffMinutes / 60);
  if (Math.abs(diffHours) < 48) {
    return formatter.format(diffHours, "hour");
  }

  const diffDays = Math.round(diffHours / 24);
  return formatter.format(diffDays, "day");
}

function getStarterDeck() {
  return STARTER_DECK;
}

function getDeck() {
  return [...getStarterDeck(), ...state.importedCards];
}

function getReadingText(card) {
  return card.readings || "No readings provided.";
}

function buildCardStateMap(deck, savedCards = {}, now = Date.now()) {
  return Object.fromEntries(
    deck.map((card) => {
      const saved = savedCards?.[card.id] ?? {};
      const dueAt = Number.isFinite(saved.dueAt) ? saved.dueAt : now;
      const lastReviewedAt = Number.isFinite(saved.lastReviewedAt) ? saved.lastReviewedAt : null;
      const lastIntervalKey = typeof saved.lastIntervalKey === "string" ? saved.lastIntervalKey : null;

      return [
        card.id,
        {
          dueAt,
          lastReviewedAt,
          lastIntervalKey
        }
      ];
    })
  );
}

function sanitizeImportedCards(rawImportedCards) {
  if (!Array.isArray(rawImportedCards)) {
    return [];
  }

  const cardsById = new Map();

  rawImportedCards.forEach((rawCard) => {
    const card = sanitizeImportedCard(rawCard);

    if (card) {
      cardsById.set(card.id, card);
    }
  });

  return [...cardsById.values()];
}

function sanitizeImportedCard(rawCard) {
  if (!rawCard || typeof rawCard !== "object") {
    return null;
  }

  const kanji = typeof rawCard.kanji === "string" ? rawCard.kanji.trim() : "";
  const meanings = Array.isArray(rawCard.meanings)
    ? rawCard.meanings.map((meaning) => String(meaning).trim()).filter(Boolean)
    : splitMeanings(rawCard.meanings);
  const readings = typeof rawCard.readings === "string" ? rawCard.readings.trim() : "";

  if (!kanji || !meanings.length) {
    return null;
  }

  const id = typeof rawCard.id === "string" && rawCard.id.trim()
    ? rawCard.id.trim()
    : createImportedCardId(kanji, meanings);

  return {
    id,
    kanji,
    meanings,
    readings
  };
}

function importCardsFromCsv(csvText) {
  const importedCards = parseImportedCardsFromCsv(csvText);
  const existingCards = new Map(state.importedCards.map((card) => [card.id, card]));
  const now = Date.now();
  let added = 0;
  let updated = 0;

  importedCards.forEach((card) => {
    if (existingCards.has(card.id)) {
      updated += 1;
    } else {
      added += 1;
    }

    existingCards.set(card.id, card);

    if (!state.cards[card.id]) {
      state.cards[card.id] = {
        dueAt: now,
        lastReviewedAt: null,
        lastIntervalKey: null
      };
    }
  });

  state.importedCards = [...existingCards.values()];
  saveState();
  render();

  return {
    total: importedCards.length,
    added,
    updated
  };
}

function parseImportedCardsFromCsv(csvText) {
  if (!csvText.trim()) {
    throw new Error("Paste CSV data or load a CSV file first.");
  }

  const rows = parseCsv(csvText);

  if (rows.length < 2) {
    throw new Error("CSV import needs a header row and at least one kanji row.");
  }

  const headers = rows[0].map(normalizeHeader);
  const requiredHeaders = ["kanji", "meanings", "readings"];
  const missingHeaders = requiredHeaders.filter((header) => !headers.includes(header));

  if (missingHeaders.length) {
    throw new Error(`Missing required column(s): ${missingHeaders.join(", ")}.`);
  }

  return rows.slice(1).map((row, index) => {
    if (row.length > headers.length) {
      throw new Error(`Row ${index + 2} has more values than the header row.`);
    }

    const paddedRow = [...row];
    while (paddedRow.length < headers.length) {
      paddedRow.push("");
    }

    const record = Object.fromEntries(headers.map((header, columnIndex) => [header, paddedRow[columnIndex] ?? ""]));
    const kanji = record.kanji.trim();
    const meanings = splitMeanings(record.meanings);
    const readings = record.readings.trim();

    if (!kanji) {
      throw new Error(`Row ${index + 2} is missing a kanji value.`);
    }

    if (!meanings.length) {
      throw new Error(`Row ${index + 2} is missing meanings. Use | between multiple meanings.`);
    }

    return {
      id: createImportedCardId(kanji, meanings),
      kanji,
      meanings,
      readings
    };
  });
}

function parseCsv(csvText) {
  const rows = [];
  let row = [];
  let cell = "";
  let inQuotes = false;

  for (let index = 0; index < csvText.length; index += 1) {
    const character = csvText[index];
    const nextCharacter = csvText[index + 1];

    if (inQuotes) {
      if (character === "\"" && nextCharacter === "\"") {
        cell += "\"";
        index += 1;
      } else if (character === "\"") {
        inQuotes = false;
      } else {
        cell += character;
      }
      continue;
    }

    if (character === "\"") {
      inQuotes = true;
      continue;
    }

    if (character === ",") {
      row.push(cell);
      cell = "";
      continue;
    }

    if (character === "\r") {
      continue;
    }

    if (character === "\n") {
      row.push(cell);
      if (row.some((value) => value.trim() !== "")) {
        rows.push(row);
      }
      row = [];
      cell = "";
      continue;
    }

    cell += character;
  }

  if (inQuotes) {
    throw new Error("CSV import ended inside a quoted value.");
  }

  row.push(cell);
  if (row.some((value) => value.trim() !== "")) {
    rows.push(row);
  }

  return rows;
}

function splitMeanings(value) {
  return String(value ?? "")
    .split("|")
    .map((meaning) => meaning.trim())
    .filter(Boolean);
}

function createImportedCardId(kanji, meanings) {
  return `imported:${normalizeCardKey(kanji)}:${normalizeCardKey(meanings[0])}`;
}

function normalizeCardKey(value) {
  return String(value)
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-");
}

function normalizeHeader(value) {
  return String(value)
    .replace(/^\ufeff/, "")
    .trim()
    .toLowerCase();
}

function loadLegacyState() {
  for (const key of LEGACY_STORAGE_KEYS) {
    const raw = localStorage.getItem(key);

    if (raw) {
      return raw;
    }
  }

  return null;
}

function setImportFeedback(message, isError = false) {
  elements.importFeedback.textContent = message;
  elements.importFeedback.classList.toggle("is-error", isError);
}

function clearImportFeedback() {
  setImportFeedback("", false);
}
