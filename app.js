const STORAGE_KEY = "kanji-learning-app-state-v2";
const LEGACY_STORAGE_KEYS = ["kanji-learning-app-state-v1"];
const LAYOUT_STORAGE_KEY = "kanji-learning-layout-v1";
const SELECTION_STORAGE_KEY = "kanji-learning-selection-v1";
const DEFAULT_SELECTION = {
  language: "japanese",
  deck: "kanji"
};
const DEFAULT_DECK_KEY = "japanese:kanji";

const DEFAULT_INTERVALS = [
  { key: "again", label: "Again", minutes: 5, description: "Bring it back almost immediately." },
  { key: "soon", label: "In 10 minutes", minutes: 10, description: "Short reinforcement." },
  { key: "tomorrow", label: "Tomorrow", minutes: 60 * 24, description: "See it again the next day." },
  { key: "three-days", label: "In 3 days", minutes: 60 * 24 * 3, description: "Push it a little further out." },
  { key: "week", label: "In 1 week", minutes: 60 * 24 * 7, description: "Save it for a confident review." }
];

const STARTER_DECK = [
  {
    id: "sun",
    kanji: "日",
    meanings: ["sun", "day"],
    readings: "On: ニチ / ジツ, Kun: ひ / -び / -か",
    examples: [
      { jp: "今日はいい日です。", en: "Today is a good day." },
      { jp: "朝日が山の上に見える。", en: "The morning sun can be seen above the mountain." }
    ]
  },
  {
    id: "moon",
    kanji: "月",
    meanings: ["moon", "month"],
    readings: "On: ゲツ / ガツ, Kun: つき",
    examples: [
      { jp: "今月はとても忙しいです。", en: "This month is very busy." },
      { jp: "今夜は月が明るい。", en: "The moon is bright tonight." }
    ]
  },
  {
    id: "fire",
    kanji: "火",
    meanings: ["fire"],
    readings: "On: カ, Kun: ひ / -び / ほ-",
    examples: [
      { jp: "火を消してください。", en: "Please put out the fire." },
      { jp: "火曜日に会いましょう。", en: "Let's meet on Tuesday." }
    ]
  },
  {
    id: "water",
    kanji: "水",
    meanings: ["water"],
    readings: "On: スイ, Kun: みず",
    examples: [
      { jp: "冷たい水を飲みたい。", en: "I want to drink cold water." },
      { jp: "この川の水はきれいです。", en: "The water in this river is clean." }
    ]
  },
  {
    id: "tree",
    kanji: "木",
    meanings: ["tree", "wood"],
    readings: "On: モク / ボク, Kun: き / こ-",
    examples: [
      { jp: "大きい木の下で休んだ。", en: "I rested under a big tree." },
      { jp: "木の机を買いました。", en: "I bought a wooden desk." }
    ]
  },
  {
    id: "person",
    kanji: "人",
    meanings: ["person", "human"],
    readings: "On: ジン / ニン, Kun: ひと",
    examples: [
      { jp: "あの人は先生です。", en: "That person is a teacher." },
      { jp: "駅に人がたくさんいる。", en: "There are many people at the station." }
    ]
  },
  {
    id: "mountain",
    kanji: "山",
    meanings: ["mountain"],
    readings: "On: サン, Kun: やま",
    examples: [
      { jp: "夏に山へ登ります。", en: "I climb the mountain in summer." },
      { jp: "山の空気は気持ちいい。", en: "The mountain air feels good." }
    ]
  },
  {
    id: "river",
    kanji: "川",
    meanings: ["river"],
    readings: "On: セン, Kun: かわ",
    examples: [
      { jp: "川で魚を見ました。", en: "I saw fish in the river." },
      { jp: "この町の近くに大きい川がある。", en: "There is a big river near this town." }
    ]
  },
  {
    id: "mouth",
    kanji: "口",
    meanings: ["mouth"],
    readings: "On: コウ / ク, Kun: くち",
    examples: [
      { jp: "口を大きく開けてください。", en: "Please open your mouth wide." },
      { jp: "入口はあちらです。", en: "The entrance is over there." }
    ]
  },
  {
    id: "school",
    kanji: "学",
    meanings: ["study", "learning"],
    readings: "On: ガク, Kun: まな.ぶ",
    examples: [
      { jp: "日本の歴史を学んでいます。", en: "I am studying Japanese history." },
      { jp: "大学で音楽を勉強した。", en: "I studied music at university." }
    ]
  },
  {
    id: "big",
    kanji: "大",
    meanings: ["big", "large"],
    readings: "On: ダイ / タイ, Kun: おお-",
    examples: [
      { jp: "大きい犬が走っている。", en: "A big dog is running." },
      { jp: "その町はとても大きい。", en: "That town is very large." }
    ]
  },
  {
    id: "small",
    kanji: "小",
    meanings: ["small"],
    readings: "On: ショウ, Kun: ちい.さい / こ- / お-",
    examples: [
      { jp: "小さい花が咲いている。", en: "A small flower is blooming." },
      { jp: "この店は小さいですが人気です。", en: "This shop is small, but popular." }
    ]
  },
  {
    id: "gold",
    kanji: "金",
    meanings: ["gold", "money"],
    readings: "On: キン / コン, Kun: かね / かな-",
    examples: [
      { jp: "金曜日に友だちと会います。", en: "I will meet my friend on Friday." },
      { jp: "旅行のためにお金をためています。", en: "I am saving money for a trip." }
    ]
  },
  {
    id: "earth",
    kanji: "土",
    meanings: ["earth", "soil"],
    readings: "On: ド / ト, Kun: つち",
    examples: [
      { jp: "庭の土が雨でぬれた。", en: "The garden soil got wet from the rain." },
      { jp: "土曜日は家で休みます。", en: "I rest at home on Saturday." }
    ]
  },
  {
    id: "book",
    kanji: "本",
    meanings: ["book", "origin"],
    readings: "On: ホン, Kun: もと",
    examples: [
      { jp: "この本はとてもおもしろい。", en: "This book is very interesting." },
      { jp: "日本は私のふるさとです。", en: "Japan is my homeland." }
    ]
  },
  {
    id: "middle",
    kanji: "中",
    meanings: ["middle", "inside"],
    readings: "On: チュウ, Kun: なか",
    examples: [
      { jp: "かばんの中に鍵があります。", en: "The key is inside the bag." },
      { jp: "会議は今まだ進行中です。", en: "The meeting is still in progress now." }
    ]
  },
  {
    id: "up",
    kanji: "上",
    meanings: ["up", "above"],
    readings: "On: ジョウ, Kun: うえ / あ.がる / のぼ.る",
    examples: [
      { jp: "机の上にノートがあります。", en: "There is a notebook on the desk." },
      { jp: "階段を上がってください。", en: "Please go up the stairs." }
    ]
  },
  {
    id: "down",
    kanji: "下",
    meanings: ["down", "below"],
    readings: "On: カ / ゲ, Kun: した / さ.がる / くだ.る",
    examples: [
      { jp: "この下に名前を書いてください。", en: "Please write your name below this." },
      { jp: "駅まで坂を下ります。", en: "I go down the hill to the station." }
    ]
  },
  {
    id: "left",
    kanji: "左",
    meanings: ["left"],
    readings: "On: サ, Kun: ひだり",
    examples: [
      { jp: "次の角を左に曲がってください。", en: "Please turn left at the next corner." },
      { jp: "左の手でドアを開けた。", en: "I opened the door with my left hand." }
    ]
  },
  {
    id: "right",
    kanji: "右",
    meanings: ["right"],
    readings: "On: ウ / ユウ, Kun: みぎ",
    examples: [
      { jp: "右の席が空いています。", en: "The seat on the right is empty." },
      { jp: "信号の後で右へ行きます。", en: "I go right after the traffic light." }
    ]
  },
  {
    id: "ahead",
    kanji: "先",
    meanings: ["ahead", "previous"],
    readings: "On: セン, Kun: さき",
    examples: [
      { jp: "先に昼ご飯を食べましょう。", en: "Let's eat lunch first." },
      { jp: "この先に駅があります。", en: "There is a station ahead." }
    ]
  },
  {
    id: "life",
    kanji: "生",
    meanings: ["life", "birth", "live"],
    readings: "On: セイ / ショウ, Kun: い.きる / う.まれる / なま",
    examples: [
      { jp: "彼は外国で生まれました。", en: "He was born in a foreign country." },
      { jp: "新しい生活が始まった。", en: "A new life has begun." }
    ]
  },
  {
    id: "see",
    kanji: "見",
    meanings: ["see", "look"],
    readings: "On: ケン, Kun: み.る / み.える",
    examples: [
      { jp: "窓から海が見えます。", en: "You can see the sea from the window." },
      { jp: "映画を見に行きませんか。", en: "Would you like to go watch a movie?" }
    ]
  },
  {
    id: "eat",
    kanji: "食",
    meanings: ["eat", "food"],
    readings: "On: ショク, Kun: た.べる / く.う",
    examples: [
      { jp: "毎朝パンを食べます。", en: "I eat bread every morning." },
      { jp: "日本の食べ物が好きです。", en: "I like Japanese food." }
    ]
  },
  {
    id: "car",
    kanji: "車",
    meanings: ["car", "vehicle"],
    readings: "On: シャ, Kun: くるま",
    examples: [
      { jp: "車で会社へ行きます。", en: "I go to the office by car." },
      { jp: "駅の前に白い車が止まっている。", en: "A white car is parked in front of the station." }
    ]
  }
];

const SPANISH_ENGLISH_DECK = [
  {
    id: "house",
    front: "casa",
    meanings: ["house", "home"],
    examples: [
      { jp: "La casa es blanca.", en: "The house is white." },
      { jp: "Llegamos a casa tarde.", en: "We arrived home late." }
    ]
  },
  {
    id: "dog",
    front: "perro",
    meanings: ["dog"],
    examples: [
      { jp: "El perro corre por el parque.", en: "The dog runs through the park." },
      { jp: "Mi perro duerme mucho.", en: "My dog sleeps a lot." }
    ]
  },
  {
    id: "car",
    front: "coche",
    meanings: ["car"],
    examples: [
      { jp: "El coche está en la calle.", en: "The car is on the street." },
      { jp: "Compramos un coche nuevo.", en: "We bought a new car." }
    ]
  },
  {
    id: "window",
    front: "ventana",
    meanings: ["window"],
    examples: [
      { jp: "La ventana está abierta.", en: "The window is open." },
      { jp: "Mira por la ventana.", en: "Look through the window." }
    ]
  },
  {
    id: "work",
    front: "trabajo",
    meanings: ["work", "job"],
    examples: [
      { jp: "Tengo mucho trabajo hoy.", en: "I have a lot of work today." },
      { jp: "Busca trabajo en la ciudad.", en: "He is looking for work in the city." }
    ]
  },
  {
    id: "street",
    front: "calle",
    meanings: ["street"],
    examples: [
      { jp: "La calle está vacía.", en: "The street is empty." },
      { jp: "Vivimos en esta calle.", en: "We live on this street." }
    ]
  },
  {
    id: "key",
    front: "llave",
    meanings: ["key"],
    examples: [
      { jp: "No encuentro la llave.", en: "I can't find the key." },
      { jp: "La llave está sobre la mesa.", en: "The key is on the table." }
    ]
  },
  {
    id: "left",
    front: "izquierda",
    meanings: ["left"],
    examples: [
      { jp: "Gira a la izquierda.", en: "Turn left." },
      { jp: "La tienda está a la izquierda.", en: "The shop is on the left." }
    ]
  },
  {
    id: "morning",
    front: "mañana",
    meanings: ["morning", "tomorrow"],
    examples: [
      { jp: "Cada mañana camino al trabajo.", en: "Every morning I walk to work." },
      { jp: "La mañana está tranquila.", en: "The morning is calm." }
    ]
  },
  {
    id: "book",
    front: "libro",
    meanings: ["book"],
    examples: [
      { jp: "El libro está en la mochila.", en: "The book is in the backpack." },
      { jp: "Leo un libro corto.", en: "I am reading a short book." }
    ]
  },
  {
    id: "city",
    front: "ciudad",
    meanings: ["city"],
    examples: [
      { jp: "La ciudad nunca duerme.", en: "The city never sleeps." },
      { jp: "Visitamos la ciudad antigua.", en: "We visited the old city." }
    ]
  },
  {
    id: "school",
    front: "escuela",
    meanings: ["school"],
    examples: [
      { jp: "La escuela abre temprano.", en: "The school opens early." },
      { jp: "Los niños salen de la escuela.", en: "The children leave school." }
    ]
  }
];

const DECK_CONFIGS = {
  "japanese:kanji": {
    language: "japanese",
    deck: "kanji",
    languageLabel: "Japanese",
    deckLabel: "Kanji",
    selectionDescription: "Review core kanji one card at a time, reveal the answer, and schedule the next appearance.",
    heroTitle: "See kanji. Recall the meaning. Decide the next review.",
    heroDescription: "A lightweight spaced repetition app that keeps difficult kanji close and pushes easy ones further out.",
    inputLabel: "Type the translation",
    inputPlaceholder: "Type the translation",
    submitLabel: "Reveal answer",
    prompt: (cardFront) => `What does ${cardFront} mean?`,
    emptyHint: "New card. Try the most common English meaning first.",
    flowSteps: [
      "Look at the kanji.",
      "Type the meaning you remember.",
      "Reveal the stored answer.",
      "Choose the next review time."
    ],
    starterDeck: STARTER_DECK,
    supportsImport: true
  },
  "spanish:english": {
    language: "spanish",
    deck: "english",
    languageLabel: "Spanish",
    deckLabel: "English",
    selectionDescription: "See a Spanish word, type the English translation, then schedule when it should return.",
    heroTitle: "See Spanish. Recall the English translation. Decide the next review.",
    heroDescription: "A bilingual vocabulary deck for fast Spanish-to-English recall with the same manual scheduling flow.",
    inputLabel: "Type the English translation",
    inputPlaceholder: "Type the English translation",
    submitLabel: "Reveal answer",
    prompt: (cardFront) => `What is the English translation of ${cardFront}?`,
    emptyHint: "New card. Start with the most common English translation.",
    flowSteps: [
      "Look at the Spanish word.",
      "Type the English translation you remember.",
      "Reveal the stored answer.",
      "Choose the next review time."
    ],
    starterDeck: SPANISH_ENGLISH_DECK,
    supportsImport: false
  }
};

const page = document.body.dataset.page ?? "deck";
const elements = page === "deck"
  ? {
      desktopLayoutToggle: document.getElementById("desktop-layout-toggle"),
      mobileLayoutToggle: document.getElementById("mobile-layout-toggle"),
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
      examplesPanel: document.getElementById("examples-panel"),
      examplesList: document.getElementById("examples-list"),
      scheduleOptions: document.getElementById("schedule-options"),
      reviewCard: document.getElementById("review-card"),
      emptyState: document.getElementById("empty-state"),
      resetProgress: document.getElementById("reset-progress"),
      historyList: document.getElementById("history-list"),
      cardPrompt: document.getElementById("card-prompt"),
      scheduleOptionTemplate: document.getElementById("schedule-option-template"),
      importForm: document.getElementById("import-form"),
      csvInput: document.getElementById("csv-input"),
      csvFile: document.getElementById("csv-file"),
      importFeedback: document.getElementById("import-feedback"),
      importSection: document.getElementById("import-section"),
      selectedLanguage: document.getElementById("selected-language"),
      selectedDeckType: document.getElementById("selected-deck-type"),
      selectedDeckTitle: document.getElementById("selected-deck-title"),
      selectedDeckDescription: document.getElementById("selected-deck-description"),
      answerInputLabel: document.getElementById("answer-input-label"),
      answerSubmit: document.getElementById("answer-submit"),
      howItWorksList: document.getElementById("how-it-works-list")
    }
  : null;
const selectionElements = page === "selection"
  ? {
      startSelectedDeck: document.getElementById("start-selected-deck"),
      selectionTitle: document.getElementById("selection-title"),
      selectionDescription: document.getElementById("selection-description"),
      summaryLanguage: document.getElementById("summary-language"),
      summaryDeck: document.getElementById("summary-deck"),
      optionButtons: [...document.querySelectorAll("[data-selection-group][data-value]")]
    }
  : null;

let state = null;
let currentCardId = null;
let currentSelection = { ...DEFAULT_SELECTION };
let currentDeckConfig = DECK_CONFIGS[DEFAULT_DECK_KEY];

if (page === "selection") {
  initSelectionPage();
}

if (page === "deck") {
  initDeckPage();
}

function initSelectionPage() {
  const selection = loadSelection();

  selectionElements.optionButtons.forEach((button) => {
    const group = button.dataset.selectionGroup;
    const value = button.dataset.value;
    const isSelected = selection[group] === value;

    button.classList.toggle("is-selected", isSelected);
    button.setAttribute("aria-pressed", String(isSelected));
    button.addEventListener("click", () => {
      const nextSelection = getSelectionForChoice(group, value);

      saveSelection(nextSelection);
      updateSelectionSummary(nextSelection);
    });
  });

  updateSelectionSummary(selection);
}

function initDeckPage() {
  const selection = getSelectionFromUrl();

  currentSelection = selection;
  currentDeckConfig = getDeckConfig(selection);
  saveSelection(selection);
  applyDeckSelectionCopy(selection);
  state = loadState();

  applyLayoutMode(loadLayoutMode());
  render();

  elements.desktopLayoutToggle.addEventListener("click", () => {
    applyLayoutMode("desktop");
    saveLayoutMode("desktop");
  });

  elements.mobileLayoutToggle.addEventListener("click", () => {
    applyLayoutMode("mobile");
    saveLayoutMode("mobile");
  });

  elements.answerForm.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!currentCardId) {
      return;
    }

    const card = getCardById(currentCardId);
    const answer = elements.answerInput.value.trim();
    const isCorrect = evaluateAnswer(answer, card.meanings);
    const readingText = getReadingText(card);

    elements.feedbackPanel.classList.remove("hidden");
    elements.correctAnswer.textContent = card.meanings.join(" / ");
    elements.readingText.textContent = readingText;
    elements.readingText.classList.toggle("hidden", !readingText);
    renderExamples(card);
    elements.answerEvaluation.textContent = answer
      ? isCorrect
        ? "Your answer matches one of the accepted meanings."
        : `You answered "${answer}". Use the revealed answer to decide the next interval.`
      : "No answer entered. Review the meaning, then choose the next interval.";

    renderScheduleOptions(card, answer, isCorrect);
  });

  elements.resetProgress.addEventListener("click", () => {
    localStorage.removeItem(getStateStorageKey());

    if (getSelectionKey() === DEFAULT_DECK_KEY) {
      LEGACY_STORAGE_KEYS.forEach((key) => localStorage.removeItem(key));
    }

    state = loadState(true);
    currentCardId = null;
    clearImportFeedback();

    if (elements.csvInput) {
      elements.csvInput.value = "";
    }

    if (elements.csvFile) {
      elements.csvFile.value = "";
    }

    render();
  });

  if (currentDeckConfig.supportsImport) {
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
  }
}

function loadState(forceFresh = false) {
  if (!forceFresh) {
    const raw = localStorage.getItem(getStateStorageKey()) ?? loadLegacyState();

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
  const importedCards = currentDeckConfig.supportsImport ? sanitizeImportedCards(rawState.importedCards) : [];
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
  localStorage.setItem(getStateStorageKey(), JSON.stringify(state));
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
  elements.examplesPanel.classList.add("hidden");
  elements.examplesList.innerHTML = "";
  elements.scheduleOptions.innerHTML = "";
  elements.answerForm.reset();

  elements.kanjiCharacter.textContent = getCardFront(nextCard);
  elements.kanjiHint.textContent = buildHint(nextCard);
  elements.cardPrompt.textContent = currentDeckConfig.prompt(getCardFront(nextCard));
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
    item.innerHTML = `<strong>${getCardFront(card)} - ${card.meanings.join(" / ")}</strong>${answerStatus} | ${interval?.label ?? "Scheduled"} | ${formatRelativeDate(entry.reviewedAt)}`;
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
    return currentDeckConfig.emptyHint;
  }

  const lastInterval = DEFAULT_INTERVALS.find((option) => option.key === cardState.lastIntervalKey);
  return `Last scheduled as "${lastInterval?.label ?? "custom"}". Recall before revealing.`;
}

function getCardById(cardId) {
  return getDeck().find((card) => card.id === cardId);
}

function getCardFront(card) {
  return card.front || card.kanji || "";
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
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
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
  return currentDeckConfig.starterDeck;
}

function getDeck() {
  return [...getStarterDeck(), ...state.importedCards];
}

function getReadingText(card) {
  return card.readings || "";
}

function renderExamples(card) {
  const examples = getExamples(card);

  elements.examplesList.innerHTML = "";

  if (!examples.length) {
    elements.examplesPanel.classList.add("hidden");
    return;
  }

  examples.forEach((example) => {
    const item = document.createElement("li");
    const jp = document.createElement("span");
    const en = document.createElement("span");

    jp.className = "example-jp";
    en.className = "example-en";
    jp.textContent = example.jp;
    en.textContent = example.en;

    item.appendChild(jp);
    item.appendChild(en);
    elements.examplesList.appendChild(item);
  });

  elements.examplesPanel.classList.remove("hidden");
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
  if (!currentDeckConfig.supportsImport) {
    return null;
  }

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
    readings,
    examples: sanitizeExamples(rawCard.examples)
  };
}

function importCardsFromCsv(csvText) {
  if (!currentDeckConfig.supportsImport) {
    throw new Error("CSV import is only available for the Japanese Kanji deck.");
  }

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
  const requiredHeaders = ["kanji", "meanings", "readings", "example1_jp", "example1_en", "example2_jp", "example2_en"];
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
    const examples = sanitizeExamples([
      { jp: record.example1_jp, en: record.example1_en },
      { jp: record.example2_jp, en: record.example2_en }
    ]);

    if (!kanji) {
      throw new Error(`Row ${index + 2} is missing a kanji value.`);
    }

    if (!meanings.length) {
      throw new Error(`Row ${index + 2} is missing meanings. Use | between multiple meanings.`);
    }

    if (examples.length !== 2) {
      throw new Error(`Row ${index + 2} must include two example sentences with Japanese and English text.`);
    }

    return {
      id: createImportedCardId(kanji, meanings),
      kanji,
      meanings,
      readings,
      examples
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
  if (getSelectionKey() !== DEFAULT_DECK_KEY) {
    return null;
  }

  for (const key of LEGACY_STORAGE_KEYS) {
    const raw = localStorage.getItem(key);

    if (raw) {
      return raw;
    }
  }

  return null;
}

function setImportFeedback(message, isError = false) {
  if (!elements?.importFeedback) {
    return;
  }

  elements.importFeedback.textContent = message;
  elements.importFeedback.classList.toggle("is-error", isError);
}

function clearImportFeedback() {
  setImportFeedback("", false);
}

function loadSelection() {
  try {
    const raw = localStorage.getItem(SELECTION_STORAGE_KEY);

    if (!raw) {
      return { ...DEFAULT_SELECTION };
    }

    return sanitizeSelection(JSON.parse(raw));
  } catch (error) {
    return { ...DEFAULT_SELECTION };
  }
}

function saveSelection(selection) {
  localStorage.setItem(SELECTION_STORAGE_KEY, JSON.stringify(sanitizeSelection(selection)));
}

function sanitizeSelection(selection) {
  if (selection?.language === "spanish" && selection?.deck === "english") {
    return {
      language: "spanish",
      deck: "english"
    };
  }

  return {
    language: "japanese",
    deck: "kanji"
  };
}

function getSelectionFromUrl() {
  const params = new URLSearchParams(window.location.search);
  const savedSelection = loadSelection();

  return sanitizeSelection({
    language: params.get("language") ?? savedSelection.language,
    deck: params.get("deck") ?? savedSelection.deck
  });
}

function getSelectionForChoice(group, value) {
  if ((group === "language" && value === "spanish") || (group === "deck" && value === "english")) {
    return {
      language: "spanish",
      deck: "english"
    };
  }

  return {
    language: "japanese",
    deck: "kanji"
  };
}

function updateSelectionSummary(selection) {
  const normalizedSelection = sanitizeSelection(selection);
  const deckConfig = getDeckConfig(normalizedSelection);

  selectionElements.optionButtons.forEach((button) => {
    const isSelected = normalizedSelection[button.dataset.selectionGroup] === button.dataset.value;
    button.classList.toggle("is-selected", isSelected);
    button.setAttribute("aria-pressed", String(isSelected));
  });

  selectionElements.selectionTitle.textContent = `${deckConfig.languageLabel} ${deckConfig.deckLabel} Deck`;
  selectionElements.selectionDescription.textContent = deckConfig.selectionDescription;
  selectionElements.summaryLanguage.textContent = deckConfig.languageLabel;
  selectionElements.summaryDeck.textContent = deckConfig.deckLabel;
  selectionElements.startSelectedDeck.href = getDeckPageUrl(normalizedSelection);
}

function getDeckPageUrl(selection) {
  const normalizedSelection = sanitizeSelection(selection);
  const params = new URLSearchParams(normalizedSelection);
  return `deck.html?${params.toString()}`;
}

function applyDeckSelectionCopy(selection) {
  const normalizedSelection = sanitizeSelection(selection);
  const deckConfig = getDeckConfig(normalizedSelection);

  elements.selectedLanguage.textContent = deckConfig.languageLabel;
  elements.selectedDeckType.textContent = deckConfig.deckLabel;
  elements.selectedDeckTitle.textContent = deckConfig.heroTitle;
  elements.selectedDeckDescription.textContent = deckConfig.heroDescription;
  elements.answerInputLabel.textContent = deckConfig.inputLabel;
  elements.answerInput.placeholder = deckConfig.inputPlaceholder;
  elements.answerSubmit.textContent = deckConfig.submitLabel;
  renderHowItWorks(deckConfig.flowSteps);

  if (elements.importSection) {
    elements.importSection.classList.toggle("hidden", !deckConfig.supportsImport);
  }
}

function formatSelectionLabel(value) {
  return String(value).charAt(0).toUpperCase() + String(value).slice(1);
}

function renderHowItWorks(steps) {
  elements.howItWorksList.innerHTML = "";

  steps.forEach((step) => {
    const item = document.createElement("li");
    item.textContent = step;
    elements.howItWorksList.appendChild(item);
  });
}

function getSelectionKey(selection = currentSelection) {
  const normalizedSelection = sanitizeSelection(selection);
  return `${normalizedSelection.language}:${normalizedSelection.deck}`;
}

function getDeckConfig(selection = currentSelection) {
  return DECK_CONFIGS[getSelectionKey(selection)] ?? DECK_CONFIGS[DEFAULT_DECK_KEY];
}

function getStateStorageKey(selection = currentSelection) {
  const selectionKey = getSelectionKey(selection);
  return selectionKey === DEFAULT_DECK_KEY
    ? STORAGE_KEY
    : `${STORAGE_KEY}:${selectionKey}`;
}

function getExamples(card) {
  return sanitizeExamples(card.examples).slice(0, 2);
}

function sanitizeExamples(rawExamples) {
  if (!Array.isArray(rawExamples)) {
    return [];
  }

  return rawExamples
    .map((example) => ({
      jp: typeof example?.jp === "string" ? example.jp.trim() : "",
      en: typeof example?.en === "string" ? example.en.trim() : ""
    }))
    .filter((example) => example.jp && example.en);
}

function loadLayoutMode() {
  const savedMode = localStorage.getItem(LAYOUT_STORAGE_KEY);
  return savedMode === "mobile" ? "mobile" : "desktop";
}

function saveLayoutMode(mode) {
  localStorage.setItem(LAYOUT_STORAGE_KEY, mode);
}

function applyLayoutMode(mode) {
  if (!elements?.desktopLayoutToggle || !elements?.mobileLayoutToggle) {
    return;
  }

  const isMobileLayout = mode === "mobile";
  document.body.classList.toggle("mobile-layout", isMobileLayout);
  elements.desktopLayoutToggle.classList.toggle("is-active", !isMobileLayout);
  elements.mobileLayoutToggle.classList.toggle("is-active", isMobileLayout);
  elements.desktopLayoutToggle.setAttribute("aria-pressed", String(!isMobileLayout));
  elements.mobileLayoutToggle.setAttribute("aria-pressed", String(isMobileLayout));
}
