const STORAGE_KEY = "kanji-learning-app-state-v2";
const LEGACY_STORAGE_KEYS = ["kanji-learning-app-state-v1"];
const LAYOUT_STORAGE_KEY = "kanji-learning-layout-v1";
const SELECTION_STORAGE_KEY = "kanji-learning-selection-v1";
const DECK_CONTENT_STORAGE_KEY = "kanji-learning-deck-content-v1";
const ANSWER_MATCH_SETTINGS_KEY = "kanji-learning-answer-match-settings-v1";
const STUDY_MODE_STORAGE_KEY = "kanji-learning-study-mode-v1";
const BACKUP_FORMAT_VERSION = 1;
const DEFAULT_SELECTION = {
  language: "japanese",
  deck: "kanji",
  set: "starter"
};
const DEFAULT_DECK_KEY = "japanese:kanji";

const DEFAULT_INTERVALS = [
  { key: "again", label: "Again", minutes: 5, description: "Bring it back almost immediately." },
  { key: "soon", label: "In 10 minutes", minutes: 10, description: "Short reinforcement." },
  { key: "tomorrow", label: "Tomorrow", minutes: 60 * 24, description: "See it again the next day." },
  { key: "three-days", label: "In 3 days", minutes: 60 * 24 * 3, description: "Push it a little further out." },
  { key: "week", label: "In 1 week", minutes: 60 * 24 * 7, description: "Save it for a confident review." }
];
const STUDY_MODE_DETAILS = {
  mixed: {
    label: "Mixed",
    description: "Mixed shows due review cards first, then unseen cards.",
    emptyTitle: "Nothing left in the mixed queue.",
    emptyCopy: "There are no due review cards or unseen cards left right now."
  },
  due: {
    label: "Due only",
    description: "Due only shows previously studied cards whose review time has arrived.",
    emptyTitle: "No review cards are due right now.",
    emptyCopy: "Switch to Mixed or New only if you want to study unseen cards."
  },
  new: {
    label: "New only",
    description: "New only shows cards you have not reviewed yet.",
    emptyTitle: "No unseen cards are left in this deck.",
    emptyCopy: "Switch to Mixed or Due only to keep reviewing scheduled cards."
  }
};

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

const LEGACY_DECK_CONFIGS = {
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
    editorTitle: "Edit the kanji set for this deck.",
    editorDescription: "Update kanji, accepted meanings, readings, and example sentences, then save the set for review.",
    editorFrontLabel: "Kanji",
    editorReadingsLabel: "On / Kun readings",
    editorExampleSourceLabel: "Japanese example",
    editorExampleTranslationLabel: "English translation",
    editorHelp: [
      "Use the Kanji field for the character shown on the card.",
      "Separate multiple accepted meanings with |.",
      "Use the readings field for on and kun readings.",
      "Example sentences are optional, but they make review clearer."
    ],
    frontKey: "kanji",
    supportsReadings: true,
    starterDeck: STARTER_DECK,
    supportsImport: true,
    importConfig: {
      frontHeader: "kanji",
      readingsHeader: "readings",
      example1SourceHeader: "example1_jp",
      example1TranslationHeader: "example1_en",
      example2SourceHeader: "example2_jp",
      example2TranslationHeader: "example2_en",
      example: `kanji,meanings,readings,example1_jp,example1_en,example2_jp,example2_en
語,"language|word","On: ゴ, Kun: かた.る",日本語を勉強しています。,"I am studying Japanese.",彼はやさしい言葉で話した。,"He spoke in gentle words."
森,forest,"On: シン, Kun: もり",森の中はとても静かだ。,"It is very quiet inside the forest.",朝の森を歩くのが好きです。,"I like walking in the forest in the morning."`
    }
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
    editorTitle: "Edit the Spanish vocabulary set for this deck.",
    editorDescription: "Update Spanish prompts, accepted English answers, and example sentences, then save the set for review.",
    editorFrontLabel: "Spanish word",
    editorReadingsLabel: "Notes",
    editorExampleSourceLabel: "Spanish example",
    editorExampleTranslationLabel: "English translation",
    editorHelp: [
      "Use the Spanish word field for the prompt shown on the card.",
      "Separate multiple accepted English answers with |.",
      "Examples are optional, but they help make context clearer."
    ],
    frontKey: "front",
    supportsReadings: false,
    starterDeck: SPANISH_ENGLISH_DECK,
    supportsImport: true,
    importConfig: {
      frontHeader: "spanish",
      readingsHeader: null,
      example1SourceHeader: "example1_es",
      example1TranslationHeader: "example1_en",
      example2SourceHeader: "example2_es",
      example2TranslationHeader: "example2_en",
      example: `spanish,meanings,example1_es,example1_en,example2_es,example2_en
camino,"path|road",El camino cruza el bosque.,"The path crosses the forest.",Seguimos el camino al río.,"We followed the road to the river."
mesa,table,La mesa está limpia.,"The table is clean.",Dejé las llaves sobre la mesa.,"I left the keys on the table."`
    }
  }
};

const JAPANESE_JLPT_N5_DECK = [
  {
    id: "eat",
    kanji: "食",
    meanings: ["eat", "food"],
    readings: "On: ショク, Kun: た.べる",
    examples: [
      { jp: "毎朝パンを食べます。", en: "I eat bread every morning." },
      { jp: "和食が好きです。", en: "I like Japanese food." }
    ]
  },
  {
    id: "drink",
    kanji: "飲",
    meanings: ["drink"],
    readings: "On: イン, Kun: の.む",
    examples: [
      { jp: "水をたくさん飲んでください。", en: "Please drink plenty of water." },
      { jp: "食後に薬を飲みます。", en: "I take medicine after meals." }
    ]
  },
  {
    id: "car",
    kanji: "車",
    meanings: ["car", "vehicle"],
    readings: "On: シャ, Kun: くるま",
    examples: [
      { jp: "車で駅へ行きます。", en: "I go to the station by car." },
      { jp: "電車が遅れています。", en: "The train is delayed." }
    ]
  },
  {
    id: "station",
    kanji: "駅",
    meanings: ["station"],
    readings: "On: エキ",
    examples: [
      { jp: "駅で友だちに会います。", en: "I will meet a friend at the station." },
      { jp: "この駅は新しいです。", en: "This station is new." }
    ]
  },
  {
    id: "friend",
    kanji: "友",
    meanings: ["friend"],
    readings: "On: ユウ, Kun: とも",
    examples: [
      { jp: "友だちと映画を見ました。", en: "I watched a movie with my friend." },
      { jp: "彼は長年の友です。", en: "He is a longtime friend." }
    ]
  },
  {
    id: "time",
    kanji: "時",
    meanings: ["time", "hour"],
    readings: "On: ジ, Kun: とき",
    examples: [
      { jp: "七時に起きます。", en: "I wake up at seven o'clock." },
      { jp: "時間がありません。", en: "I do not have time." }
    ]
  }
];

const JAPANESE_JLPT_N4_DECK = [
  {
    id: "travel",
    kanji: "旅",
    meanings: ["trip", "travel"],
    readings: "On: リョ, Kun: たび",
    examples: [
      { jp: "来月京都へ旅します。", en: "I will travel to Kyoto next month." },
      { jp: "旅の写真を見せてください。", en: "Please show me your trip photos." }
    ]
  },
  {
    id: "meaning",
    kanji: "意",
    meanings: ["meaning", "intention"],
    readings: "On: イ",
    examples: [
      { jp: "この言葉の意味を教えてください。", en: "Please tell me the meaning of this word." },
      { jp: "その意見に賛成です。", en: "I agree with that opinion." }
    ]
  },
  {
    id: "department",
    kanji: "部",
    meanings: ["section", "department", "club"],
    readings: "On: ブ",
    examples: [
      { jp: "営業部で働いています。", en: "I work in the sales department." },
      { jp: "学校で音楽部に入っています。", en: "I am in the music club at school." }
    ]
  },
  {
    id: "practice",
    kanji: "練",
    meanings: ["practice", "train"],
    readings: "On: レン",
    examples: [
      { jp: "毎日漢字を練習しています。", en: "I practice kanji every day." },
      { jp: "試合の前に十分練習した。", en: "I practiced enough before the match." }
    ]
  },
  {
    id: "continue",
    kanji: "続",
    meanings: ["continue"],
    readings: "On: ゾク, Kun: つづ.く",
    examples: [
      { jp: "雨が三日続きました。", en: "The rain continued for three days." },
      { jp: "勉強を続けるつもりです。", en: "I plan to continue studying." }
    ]
  },
  {
    id: "experience",
    kanji: "経",
    meanings: ["experience", "pass through", "manage"],
    readings: "On: ケイ, キョウ, Kun: へ.る",
    examples: [
      { jp: "長い経験があります。", en: "I have long experience." },
      { jp: "駅を経て学校へ向かう。", en: "I head to school by way of the station." }
    ]
  }
];

const SPANISH_TRAVEL_DECK = [
  {
    id: "airport",
    front: "aeropuerto",
    meanings: ["airport"],
    examples: [
      { jp: "Llegamos temprano al aeropuerto.", en: "We arrived early at the airport." },
      { jp: "El aeropuerto está muy lejos.", en: "The airport is very far away." }
    ]
  },
  {
    id: "ticket",
    front: "boleto",
    meanings: ["ticket"],
    examples: [
      { jp: "Compré el boleto en línea.", en: "I bought the ticket online." },
      { jp: "Guarda tu boleto para la entrada.", en: "Keep your ticket for entry." }
    ]
  },
  {
    id: "hotel",
    front: "hotel",
    meanings: ["hotel"],
    examples: [
      { jp: "Nuestro hotel está cerca del centro.", en: "Our hotel is near downtown." },
      { jp: "El hotel tiene desayuno incluido.", en: "The hotel includes breakfast." }
    ]
  },
  {
    id: "map",
    front: "mapa",
    meanings: ["map"],
    examples: [
      { jp: "Necesito un mapa de la ciudad.", en: "I need a city map." },
      { jp: "El mapa muestra la ruta corta.", en: "The map shows the short route." }
    ]
  },
  {
    id: "reservation",
    front: "reserva",
    meanings: ["reservation", "booking"],
    examples: [
      { jp: "Confirmé la reserva del cuarto.", en: "I confirmed the room reservation." },
      { jp: "La reserva está a tu nombre.", en: "The booking is under your name." }
    ]
  },
  {
    id: "luggage",
    front: "equipaje",
    meanings: ["luggage", "baggage"],
    examples: [
      { jp: "Mi equipaje pesa mucho.", en: "My luggage weighs a lot." },
      { jp: "El equipaje llegó tarde.", en: "The baggage arrived late." }
    ]
  }
];

const SPANISH_DAILY_LIFE_DECK = [
  {
    id: "breakfast",
    front: "desayuno",
    meanings: ["breakfast"],
    examples: [
      { jp: "El desayuno está listo.", en: "Breakfast is ready." },
      { jp: "Siempre tomo café en el desayuno.", en: "I always drink coffee at breakfast." }
    ]
  },
  {
    id: "neighbor",
    front: "vecino",
    meanings: ["neighbor"],
    examples: [
      { jp: "Mi vecino es muy amable.", en: "My neighbor is very kind." },
      { jp: "Hablé con la vecina ayer.", en: "I spoke with the neighbor yesterday." }
    ]
  },
  {
    id: "homework",
    front: "tarea",
    meanings: ["homework", "task"],
    examples: [
      { jp: "Termino la tarea por la noche.", en: "I finish the homework at night." },
      { jp: "Tengo una tarea importante hoy.", en: "I have an important task today." }
    ]
  },
  {
    id: "kitchen",
    front: "cocina",
    meanings: ["kitchen"],
    examples: [
      { jp: "La cocina está limpia.", en: "The kitchen is clean." },
      { jp: "Comemos en la cocina pequeña.", en: "We eat in the small kitchen." }
    ]
  },
  {
    id: "office",
    front: "oficina",
    meanings: ["office"],
    examples: [
      { jp: "La oficina abre a las ocho.", en: "The office opens at eight." },
      { jp: "Trabajo en una oficina tranquila.", en: "I work in a quiet office." }
    ]
  },
  {
    id: "rest",
    front: "descanso",
    meanings: ["rest", "break"],
    examples: [
      { jp: "Necesito un descanso corto.", en: "I need a short break." },
      { jp: "El descanso mejora mi concentración.", en: "Rest improves my concentration." }
    ]
  }
];

const CHINESE_STARTER_DECK = [
  {
    id: "hello",
    front: "你好",
    meanings: ["hello", "hi"],
    readings: "ni hao",
    examples: [
      { jp: "见到老师要说你好。", en: "You should say hello when you see the teacher." },
      { jp: "他笑着说你好。", en: "He smiled and said hello." }
    ]
  },
  {
    id: "student",
    front: "学生",
    meanings: ["student"],
    readings: "xue sheng",
    examples: [
      { jp: "我是中文学生。", en: "I am a Chinese student." },
      { jp: "那个学生很认真。", en: "That student is very diligent." }
    ]
  },
  {
    id: "friend",
    front: "朋友",
    meanings: ["friend"],
    readings: "peng you",
    examples: [
      { jp: "我的朋友住在北京。", en: "My friend lives in Beijing." },
      { jp: "她和朋友一起学习。", en: "She studies with her friend." }
    ]
  },
  {
    id: "water",
    front: "水",
    meanings: ["water"],
    readings: "shui",
    examples: [
      { jp: "请喝一点水。", en: "Please drink some water." },
      { jp: "杯子里有冷水。", en: "There is cold water in the cup." }
    ]
  },
  {
    id: "time",
    front: "时间",
    meanings: ["time"],
    readings: "shi jian",
    examples: [
      { jp: "我没有很多时间。", en: "I do not have much time." },
      { jp: "现在是什么时间？", en: "What time is it now?" }
    ]
  },
  {
    id: "train",
    front: "火车",
    meanings: ["train"],
    readings: "huo che",
    examples: [
      { jp: "我们坐火车去上海。", en: "We are going to Shanghai by train." },
      { jp: "火车今天很准时。", en: "The train is on time today." }
    ]
  }
];

const CHINESE_HSK1_DECK = [
  {
    id: "teacher",
    front: "老师",
    meanings: ["teacher"],
    readings: "lao shi",
    examples: [
      { jp: "老师在教室里。", en: "The teacher is in the classroom." },
      { jp: "我们的老师很亲切。", en: "Our teacher is very kind." }
    ]
  },
  {
    id: "school",
    front: "学校",
    meanings: ["school"],
    readings: "xue xiao",
    examples: [
      { jp: "学校离家不远。", en: "The school is not far from home." },
      { jp: "学校今天很安静。", en: "The school is very quiet today." }
    ]
  },
  {
    id: "like",
    front: "喜欢",
    meanings: ["like"],
    readings: "xi huan",
    examples: [
      { jp: "我喜欢这本书。", en: "I like this book." },
      { jp: "她喜欢学习汉字。", en: "She likes studying Chinese characters." }
    ]
  },
  {
    id: "today",
    front: "今天",
    meanings: ["today"],
    readings: "jin tian",
    examples: [
      { jp: "今天天气很好。", en: "The weather is good today." },
      { jp: "今天我们有课。", en: "We have class today." }
    ]
  },
  {
    id: "work",
    front: "工作",
    meanings: ["work", "job"],
    readings: "gong zuo",
    examples: [
      { jp: "我六点下班结束工作。", en: "I finish work at six." },
      { jp: "她找到了新工作。", en: "She found a new job." }
    ]
  },
  {
    id: "thanks",
    front: "谢谢",
    meanings: ["thanks", "thank you"],
    readings: "xie xie",
    examples: [
      { jp: "谢谢你的帮助。", en: "Thank you for your help." },
      { jp: "他笑着说谢谢。", en: "He smiled and said thanks." }
    ]
  }
];

const KOREAN_STARTER_DECK = [
  {
    id: "hello",
    front: "안녕하세요",
    meanings: ["hello"],
    readings: "annyeonghaseyo",
    examples: [
      { jp: "처음 만날 때 안녕하세요라고 말해요.", en: "You say hello when meeting for the first time." },
      { jp: "그는 밝게 안녕하세요라고 했어요.", en: "He said hello brightly." }
    ]
  },
  {
    id: "water",
    front: "물",
    meanings: ["water"],
    readings: "mul",
    examples: [
      { jp: "찬 물을 마셔요.", en: "I drink cold water." },
      { jp: "컵에 물이 있어요.", en: "There is water in the cup." }
    ]
  },
  {
    id: "school",
    front: "학교",
    meanings: ["school"],
    readings: "hakgyo",
    examples: [
      { jp: "학교에 일찍 가요.", en: "I go to school early." },
      { jp: "우리 학교는 커요.", en: "Our school is big." }
    ]
  },
  {
    id: "friend",
    front: "친구",
    meanings: ["friend"],
    readings: "chingu",
    examples: [
      { jp: "친구와 영화를 봐요.", en: "I watch a movie with my friend." },
      { jp: "그 친구는 친절해요.", en: "That friend is kind." }
    ]
  },
  {
    id: "time",
    front: "시간",
    meanings: ["time"],
    readings: "sigan",
    examples: [
      { jp: "시간이 부족해요.", en: "There is not enough time." },
      { jp: "지금 시간이 몇 시예요?", en: "What time is it now?" }
    ]
  },
  {
    id: "book",
    front: "책",
    meanings: ["book"],
    readings: "chaek",
    examples: [
      { jp: "책을 한 권 샀어요.", en: "I bought a book." },
      { jp: "책이 책상 위에 있어요.", en: "The book is on the desk." }
    ]
  }
];

const KOREAN_TOPIK1_DECK = [
  {
    id: "thanks",
    front: "감사합니다",
    meanings: ["thank you", "thanks"],
    readings: "gamsahamnida",
    examples: [
      { jp: "도와주셔서 감사합니다.", en: "Thank you for helping me." },
      { jp: "그는 정중하게 감사합니다라고 했어요.", en: "He politely said thank you." }
    ]
  },
  {
    id: "morning",
    front: "아침",
    meanings: ["morning"],
    readings: "achim",
    examples: [
      { jp: "아침 공기가 시원해요.", en: "The morning air is cool." },
      { jp: "아침마다 산책해요.", en: "I take a walk every morning." }
    ]
  },
  {
    id: "travel",
    front: "여행",
    meanings: ["trip", "travel"],
    readings: "yeohaeng",
    examples: [
      { jp: "여행 계획을 세우고 있어요.", en: "I am making travel plans." },
      { jp: "이번 여행은 짧아요.", en: "This trip is short." }
    ]
  },
  {
    id: "practice",
    front: "연습",
    meanings: ["practice"],
    readings: "yeonseup",
    examples: [
      { jp: "발음을 매일 연습해요.", en: "I practice pronunciation every day." },
      { jp: "연습이 실력을 키워요.", en: "Practice builds skill." }
    ]
  },
  {
    id: "company",
    front: "회사",
    meanings: ["company", "office"],
    readings: "hoesa",
    examples: [
      { jp: "회사가 집에서 가까워요.", en: "The company is close to home." },
      { jp: "회사에서 회의가 있어요.", en: "There is a meeting at the office." }
    ]
  },
  {
    id: "subway",
    front: "지하철",
    meanings: ["subway"],
    readings: "jihacheol",
    examples: [
      { jp: "지하철로 출근해요.", en: "I commute by subway." },
      { jp: "지하철역이 바로 앞에 있어요.", en: "The subway station is right in front." }
    ]
  }
];

const DECK_CONFIGS = {
  "japanese:kanji": {
    language: "japanese",
    deck: "kanji",
    languageLabel: "Japanese",
    deckLabel: "Kanji",
    selectionMeta: "Kanji recall and JLPT packs",
    selectionDescription: "Review kanji one card at a time, with packs that scale from the starter deck into JLPT-focused study.",
    heroTitle: "See kanji. Recall the meaning. Decide the next review.",
    heroDescription: "A spaced repetition track for kanji meaning recall with clearer difficulty signals and set-based expansion packs.",
    inputLabel: "Type the translation",
    inputPlaceholder: "Type the translation",
    submitLabel: "Reveal answer",
    prompt: (cardFront) => `What does ${cardFront} mean?`,
    emptyHint: "New card. Try the most common English meaning first.",
    flowSteps: [
      "Look at the kanji.",
      "Type the meaning you remember.",
      "Reveal the stored answer and progress signals.",
      "Choose the next review time."
    ],
    editorTitle: "Edit the kanji set for this deck.",
    editorDescription: "Update kanji, accepted meanings, readings, and example sentences, then save this set for review.",
    editorFrontLabel: "Kanji",
    editorReadingsLabel: "On / Kun readings",
    editorExampleSourceLabel: "Japanese example",
    editorExampleTranslationLabel: "English translation",
    editorHelp: [
      "Use the Kanji field for the character shown on the card.",
      "Separate multiple accepted meanings with |.",
      "Use the readings field for on and kun readings.",
      "Example sentences are optional, but they make review clearer."
    ],
    frontKey: "kanji",
    supportsReadings: true,
    supportsImport: true,
    sets: {
      starter: {
        label: "Starter Set",
        meta: "Core foundational kanji",
        description: "A compact foundation set for the first review cycle.",
        cards: STARTER_DECK
      },
      "jlpt-n5": {
        label: "JLPT N5 Pack",
        meta: "Beginner test-ready kanji",
        description: "Common N5 kanji for everyday verbs, time, and places.",
        cards: JAPANESE_JLPT_N5_DECK
      },
      "jlpt-n4": {
        label: "JLPT N4 Pack",
        meta: "Next-level review set",
        description: "A follow-on pack with more abstract or extended-use kanji.",
        cards: JAPANESE_JLPT_N4_DECK
      }
    },
    importConfig: {
      frontHeader: "kanji",
      readingsHeader: "readings",
      example1SourceHeader: "example1_jp",
      example1TranslationHeader: "example1_en",
      example2SourceHeader: "example2_jp",
      example2TranslationHeader: "example2_en",
      example: `kanji,meanings,readings,example1_jp,example1_en,example2_jp,example2_en
語,"language|word","On: ゴ, Kun: かた.る",日本語を勉強しています。,"I am studying Japanese.",彼はやさしい言葉で話した。,"He spoke in gentle words."
森,forest,"On: シン, Kun: もり",森の中はとても静かだ。,"It is very quiet inside the forest.",朝の森を歩くのが好きです。,"I like walking in the forest in the morning."`
    }
  },
  "spanish:english": {
    language: "spanish",
    deck: "english",
    languageLabel: "Spanish",
    deckLabel: "English",
    selectionMeta: "Vocabulary recall into English",
    selectionDescription: "See a Spanish word, type the English translation, and move between starter, travel, and daily-life packs.",
    heroTitle: "See Spanish. Recall the English translation. Decide the next review.",
    heroDescription: "A bilingual vocabulary track for fast Spanish-to-English recall with pack-based expansion.",
    inputLabel: "Type the English translation",
    inputPlaceholder: "Type the English translation",
    submitLabel: "Reveal answer",
    prompt: (cardFront) => `What is the English translation of ${cardFront}?`,
    emptyHint: "New card. Start with the most common English translation.",
    flowSteps: [
      "Look at the Spanish word.",
      "Type the English translation you remember.",
      "Reveal the stored answer and progress signals.",
      "Choose the next review time."
    ],
    editorTitle: "Edit the Spanish vocabulary set for this deck.",
    editorDescription: "Update Spanish prompts, accepted English answers, and example sentences, then save this set for review.",
    editorFrontLabel: "Spanish word",
    editorReadingsLabel: "Notes",
    editorExampleSourceLabel: "Spanish example",
    editorExampleTranslationLabel: "English translation",
    editorHelp: [
      "Use the Spanish word field for the prompt shown on the card.",
      "Separate multiple accepted English answers with |.",
      "Examples are optional, but they help make context clearer."
    ],
    frontKey: "front",
    supportsReadings: false,
    supportsImport: true,
    sets: {
      starter: {
        label: "Starter Set",
        meta: "Core everyday vocabulary",
        description: "A balanced first set for common nouns and directions.",
        cards: SPANISH_ENGLISH_DECK
      },
      travel: {
        label: "Travel Pack",
        meta: "Airport and booking vocabulary",
        description: "Practical travel words for booking, airports, and navigation.",
        cards: SPANISH_TRAVEL_DECK
      },
      "daily-life": {
        label: "Daily Life Pack",
        meta: "Home, work, and routine words",
        description: "Common vocabulary for home, tasks, and work routines.",
        cards: SPANISH_DAILY_LIFE_DECK
      }
    },
    importConfig: {
      frontHeader: "spanish",
      readingsHeader: null,
      example1SourceHeader: "example1_es",
      example1TranslationHeader: "example1_en",
      example2SourceHeader: "example2_es",
      example2TranslationHeader: "example2_en",
      example: `spanish,meanings,example1_es,example1_en,example2_es,example2_en
camino,"path|road",El camino cruza el bosque.,"The path crosses the forest.",Seguimos el camino al río.,"We followed the road to the river."
mesa,table,La mesa está limpia.,"The table is clean.",Dejé las llaves sobre la mesa.,"I left the keys on the table."`
    }
  },
  "chinese:english": {
    language: "chinese",
    deck: "english",
    languageLabel: "Chinese",
    deckLabel: "English",
    selectionMeta: "Mandarin starter and HSK-style packs",
    selectionDescription: "Study Mandarin prompts with English recall, including a starter track and an HSK 1 expansion pack.",
    heroTitle: "See Chinese. Recall the English meaning. Decide the next review.",
    heroDescription: "A Mandarin-to-English vocabulary track with pinyin support and set-based packs.",
    inputLabel: "Type the English meaning",
    inputPlaceholder: "Type the English meaning",
    submitLabel: "Reveal answer",
    prompt: (cardFront) => `What is the English meaning of ${cardFront}?`,
    emptyHint: "New card. Use the most common English meaning first.",
    flowSteps: [
      "Look at the Chinese word or phrase.",
      "Type the English meaning you remember.",
      "Reveal the stored answer and progress signals.",
      "Choose the next review time."
    ],
    editorTitle: "Edit the Chinese vocabulary set for this deck.",
    editorDescription: "Update Chinese prompts, accepted English answers, pinyin notes, and examples for this set.",
    editorFrontLabel: "Chinese word",
    editorReadingsLabel: "Pinyin / notes",
    editorExampleSourceLabel: "Chinese example",
    editorExampleTranslationLabel: "English translation",
    editorHelp: [
      "Use the Chinese word field for the prompt shown on the card.",
      "Separate multiple accepted English answers with |.",
      "Use the pinyin field for pronunciation or quick notes.",
      "Examples are optional, but they give the meaning more context."
    ],
    frontKey: "front",
    supportsReadings: true,
    supportsImport: true,
    sets: {
      starter: {
        label: "Starter Set",
        meta: "Foundational Mandarin words",
        description: "A small launch set for greetings, people, and everyday objects.",
        cards: CHINESE_STARTER_DECK
      },
      "hsk-1": {
        label: "HSK 1 Pack",
        meta: "Early exam-aligned vocabulary",
        description: "Early HSK-style vocabulary for school, work, and polite phrases.",
        cards: CHINESE_HSK1_DECK
      }
    },
    importConfig: {
      frontHeader: "chinese",
      readingsHeader: "pinyin",
      example1SourceHeader: "example1_zh",
      example1TranslationHeader: "example1_en",
      example2SourceHeader: "example2_zh",
      example2TranslationHeader: "example2_en",
      example: `chinese,meanings,pinyin,example1_zh,example1_en,example2_zh,example2_en
你好,"hello|hi",ni hao,你好老师。,"Hello, teacher.",朋友说你好。,"My friend says hello."
时间,time,shi jian,我没有很多时间。,"I do not have much time.",现在是什么时间？,"What time is it now?"`
    }
  },
  "korean:english": {
    language: "korean",
    deck: "english",
    languageLabel: "Korean",
    deckLabel: "English",
    selectionMeta: "Hangul starter and TOPIK-style packs",
    selectionDescription: "Study Hangul prompts with English recall, including a starter track and a TOPIK 1 expansion pack.",
    heroTitle: "See Korean. Recall the English meaning. Decide the next review.",
    heroDescription: "A Korean-to-English vocabulary track with romanization support and pack-based progression.",
    inputLabel: "Type the English meaning",
    inputPlaceholder: "Type the English meaning",
    submitLabel: "Reveal answer",
    prompt: (cardFront) => `What is the English meaning of ${cardFront}?`,
    emptyHint: "New card. Start with the most common English meaning.",
    flowSteps: [
      "Look at the Korean word or phrase.",
      "Type the English meaning you remember.",
      "Reveal the stored answer and progress signals.",
      "Choose the next review time."
    ],
    editorTitle: "Edit the Korean vocabulary set for this deck.",
    editorDescription: "Update Korean prompts, accepted English answers, romanization notes, and examples for this set.",
    editorFrontLabel: "Korean word",
    editorReadingsLabel: "Romanization / notes",
    editorExampleSourceLabel: "Korean example",
    editorExampleTranslationLabel: "English translation",
    editorHelp: [
      "Use the Korean word field for the prompt shown on the card.",
      "Separate multiple accepted English answers with |.",
      "Use the romanization field for pronunciation or quick notes.",
      "Examples are optional, but they give the meaning more context."
    ],
    frontKey: "front",
    supportsReadings: true,
    supportsImport: true,
    sets: {
      starter: {
        label: "Starter Set",
        meta: "Foundational Korean words",
        description: "A compact base set for greetings, school, and basic nouns.",
        cards: KOREAN_STARTER_DECK
      },
      "topik-1": {
        label: "TOPIK 1 Pack",
        meta: "Beginner test-style vocabulary",
        description: "A follow-on set for polite expressions, commuting, and daily study language.",
        cards: KOREAN_TOPIK1_DECK
      }
    },
    importConfig: {
      frontHeader: "korean",
      readingsHeader: "romanization",
      example1SourceHeader: "example1_ko",
      example1TranslationHeader: "example1_en",
      example2SourceHeader: "example2_ko",
      example2TranslationHeader: "example2_en",
      example: `korean,meanings,romanization,example1_ko,example1_en,example2_ko,example2_en
안녕하세요,hello,annyeonghaseyo,처음 만날 때 안녕하세요라고 말해요.,"You say hello when meeting for the first time.",그는 밝게 안녕하세요라고 했어요.,"He said hello brightly."
친구,friend,chingu,친구와 영화를 봐요.,"I watch a movie with my friend.",그 친구는 친절해요.,"That friend is kind."`
    }
  }
};

const DECK_ORDER = ["japanese:kanji", "spanish:english", "chinese:english", "korean:english"];

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
      cardSignalRow: document.getElementById("card-signal-row"),
      answerForm: document.getElementById("answer-form"),
      answerInput: document.getElementById("answer-input"),
      feedbackPanel: document.getElementById("feedback-panel"),
      correctAnswer: document.getElementById("correct-answer"),
      answerEvaluation: document.getElementById("answer-evaluation"),
      readingText: document.getElementById("reading-text"),
      cardProgressPanel: document.getElementById("card-progress-panel"),
      cardMasteryFill: document.getElementById("card-mastery-fill"),
      cardProgressSummary: document.getElementById("card-progress-summary"),
      cardProgressStats: document.getElementById("card-progress-stats"),
      examplesPanel: document.getElementById("examples-panel"),
      examplesList: document.getElementById("examples-list"),
      answerVariantsPanel: document.getElementById("answer-variants-panel"),
      answerVariantsCopy: document.getElementById("answer-variants-copy"),
      answerVariantsList: document.getElementById("answer-variants-list"),
      typoToleranceToggle: document.getElementById("typo-tolerance-toggle"),
      typoToleranceCopy: document.getElementById("typo-tolerance-copy"),
      scheduleOptions: document.getElementById("schedule-options"),
      reviewCard: document.getElementById("review-card"),
      emptyState: document.getElementById("empty-state"),
      emptyStateTitle: document.getElementById("empty-state-title"),
      emptyStateCopy: document.getElementById("empty-state-copy"),
      resetProgress: document.getElementById("reset-progress"),
      historyList: document.getElementById("history-list"),
      cardPrompt: document.getElementById("card-prompt"),
      scheduleOptionTemplate: document.getElementById("schedule-option-template"),
      importForm: document.getElementById("import-form"),
      csvInput: document.getElementById("csv-input"),
      csvFile: document.getElementById("csv-file"),
      importFeedback: document.getElementById("import-feedback"),
      importSection: document.getElementById("import-section"),
      importCopy: document.getElementById("import-copy"),
      csvExample: document.getElementById("csv-example"),
      exportBackupButton: document.getElementById("export-backup-button"),
      backupFile: document.getElementById("backup-file"),
      restoreBackupButton: document.getElementById("restore-backup-button"),
      backupFeedback: document.getElementById("backup-feedback"),
      backupCopy: document.getElementById("backup-copy"),
      editDeckLink: document.getElementById("edit-deck-link"),
      statsDeckLink: document.getElementById("stats-deck-link"),
      selectedLanguage: document.getElementById("selected-language"),
      selectedDeckType: document.getElementById("selected-deck-type"),
      selectedDeckTitle: document.getElementById("selected-deck-title"),
      selectedDeckDescription: document.getElementById("selected-deck-description"),
      answerInputLabel: document.getElementById("answer-input-label"),
      answerSubmit: document.getElementById("answer-submit"),
      howItWorksList: document.getElementById("how-it-works-list"),
      studyModeButtons: [...document.querySelectorAll("[data-study-mode]")],
      studyModeCopy: document.getElementById("study-mode-copy")
    }
  : null;
const selectionElements = page === "selection"
  ? {
      startSelectedDeck: document.getElementById("start-selected-deck"),
      editSelectedDeck: document.getElementById("edit-selected-deck"),
      viewSelectedStats: document.getElementById("view-selected-stats"),
      selectionTitle: document.getElementById("selection-title"),
      selectionDescription: document.getElementById("selection-description"),
      summaryLanguage: document.getElementById("summary-language"),
      summarySet: document.getElementById("summary-set"),
      languageOptions: document.getElementById("language-options"),
      deckOptions: document.getElementById("deck-options")
    }
  : null;
const editorElements = page === "editor"
  ? {
      openDeckLink: document.getElementById("open-deck-link"),
      editorStatsLink: document.getElementById("editor-stats-link"),
      editorLanguage: document.getElementById("editor-language"),
      editorDeckType: document.getElementById("editor-deck-type"),
      editorTitle: document.getElementById("editor-title"),
      editorDescription: document.getElementById("editor-description"),
      addCardButton: document.getElementById("add-card-button"),
      saveDeckButton: document.getElementById("save-deck-button"),
      resetDeckButton: document.getElementById("reset-deck-button"),
      editorFeedback: document.getElementById("editor-feedback"),
      editorCardCount: document.getElementById("editor-card-count"),
      editorHelpList: document.getElementById("editor-help-list"),
      editorPanelTitle: document.getElementById("editor-panel-title"),
      editorSearchInput: document.getElementById("editor-search-input"),
      editorEmptyState: document.getElementById("editor-empty-state"),
      editorEmptyTitle: document.getElementById("editor-empty-title"),
      editorEmptyCopy: document.getElementById("editor-empty-copy"),
      editorCards: document.getElementById("editor-cards"),
      editorCardTemplate: document.getElementById("editor-card-template")
    }
  : null;
const statsElements = page === "stats"
  ? {
      statsOpenDeckLink: document.getElementById("stats-open-deck-link"),
      statsEditDeckLink: document.getElementById("stats-edit-deck-link"),
      statsLanguage: document.getElementById("stats-language"),
      statsDeckType: document.getElementById("stats-deck-type"),
      statsSetLabel: document.getElementById("stats-set-label"),
      statsTitle: document.getElementById("stats-title"),
      statsDescription: document.getElementById("stats-description"),
      statsSummaryGrid: document.getElementById("stats-summary-grid"),
      weeklyActivityChart: document.getElementById("weekly-activity-chart"),
      weeklyActivityCopy: document.getElementById("weekly-activity-copy"),
      difficultyBreakdown: document.getElementById("difficulty-breakdown"),
      queueBreakdown: document.getElementById("queue-breakdown"),
      hardestCardsList: document.getElementById("hardest-cards-list"),
      masteryList: document.getElementById("mastery-list")
    }
  : null;

let state = null;
let currentCardId = null;
let currentSelection = { ...DEFAULT_SELECTION };
let currentDeckConfig = DECK_CONFIGS[DEFAULT_DECK_KEY];
let editorCardsState = [];
let editorSearchTerm = "";
let pendingBackup = null;
let answerMatchSettings = loadAnswerMatchSettings();
let studyMode = loadStudyMode();

if (page === "selection") {
  initSelectionPage();
}

if (page === "deck") {
  initDeckPage();
}

if (page === "editor") {
  initEditorPage();
}

if (page === "stats") {
  initStatsPage();
}

function initSelectionPage() {
  updateSelectionSummary(loadSelection());
}

function initDeckPage() {
  const selection = getSelectionFromUrl();

  currentSelection = selection;
  currentDeckConfig = getDeckConfig(selection);
  pendingBackup = null;
  answerMatchSettings = loadAnswerMatchSettings();
  studyMode = loadStudyMode();
  saveSelection(selection);
  applyDeckSelectionCopy(selection);
  state = loadState();

  applyLayoutMode(loadLayoutMode());
  applyAnswerMatchSettings();
  applyStudyMode();
  render();

  elements.desktopLayoutToggle.addEventListener("click", () => {
    applyLayoutMode("desktop");
    saveLayoutMode("desktop");
  });

  elements.mobileLayoutToggle.addEventListener("click", () => {
    applyLayoutMode("mobile");
    saveLayoutMode("mobile");
  });

  elements.studyModeButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const nextMode = button.dataset.studyMode;
      studyMode = sanitizeStudyMode(nextMode);
      saveStudyMode(studyMode);
      applyStudyMode();
      render();
    });
  });

  elements.answerForm.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!currentCardId) {
      return;
    }

    const card = getCardById(currentCardId);
    const answer = elements.answerInput.value.trim();
    const answerMatch = evaluateAnswer(answer, card.meanings);
    const readingText = getReadingText(card);

    elements.feedbackPanel.classList.remove("hidden");
    elements.correctAnswer.textContent = card.meanings.join(" / ");
    elements.readingText.textContent = readingText;
    elements.readingText.classList.toggle("hidden", !readingText);
    renderCardProgress(card);
    renderExamples(card);
    renderAnswerVariants(card);
    elements.answerEvaluation.textContent = answer
      ? answerMatch.isCorrect
        ? answerMatch.matchType === "typo"
          ? `Accepted as a close match for "${answerMatch.matchedMeaning}". ${getCardProgress(card).difficultyLabel} difficulty.`
          : `Your answer matches one of the accepted meanings. ${getCardProgress(card).difficultyLabel} difficulty.`
        : `You answered "${answer}". This card is currently tagged ${getCardProgress(card).difficultyLabel.toLowerCase()}. Use the revealed answer to decide the next interval.`
      : `No answer entered. This card is currently tagged ${getCardProgress(card).difficultyLabel.toLowerCase()}. Review the meaning, then choose the next interval.`;

    renderScheduleOptions(card, answer, answerMatch.isCorrect);
  });

  elements.typoToleranceToggle.addEventListener("change", () => {
    answerMatchSettings = {
      ...answerMatchSettings,
      typoTolerance: elements.typoToleranceToggle.checked
    };
    saveAnswerMatchSettings(answerMatchSettings);
    applyAnswerMatchSettings();

    if (!currentCardId || elements.feedbackPanel.classList.contains("hidden")) {
      return;
    }

    const card = getCardById(currentCardId);
    const answer = elements.answerInput.value.trim();
    const answerMatch = evaluateAnswer(answer, card.meanings);

    renderAnswerVariants(card);
    elements.answerEvaluation.textContent = answer
      ? answerMatch.isCorrect
        ? answerMatch.matchType === "typo"
          ? `Accepted as a close match for "${answerMatch.matchedMeaning}". ${getCardProgress(card).difficultyLabel} difficulty.`
          : `Your answer matches one of the accepted meanings. ${getCardProgress(card).difficultyLabel} difficulty.`
        : `You answered "${answer}". This card is currently tagged ${getCardProgress(card).difficultyLabel.toLowerCase()}. Use the revealed answer to decide the next interval.`
      : `No answer entered. This card is currently tagged ${getCardProgress(card).difficultyLabel.toLowerCase()}. Review the meaning, then choose the next interval.`;
    renderScheduleOptions(card, answer, answerMatch.isCorrect);
  });

  elements.resetProgress.addEventListener("click", () => {
    localStorage.removeItem(getStateStorageKey());

    if (isLegacyStarterSelection()) {
      LEGACY_STORAGE_KEYS.forEach((key) => localStorage.removeItem(key));
    }

    state = loadState(true);
    currentCardId = null;
    clearImportFeedback();
    clearBackupFeedback();
    pendingBackup = null;

    if (elements.csvInput) {
      elements.csvInput.value = "";
    }

    if (elements.csvFile) {
      elements.csvFile.value = "";
    }

    if (elements.backupFile) {
      elements.backupFile.value = "";
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

  elements.exportBackupButton.addEventListener("click", () => {
    try {
      exportDeckBackup();
      setBackupFeedback(`Downloaded a backup for ${formatDeckSummary(currentSelection)}.`);
    } catch (error) {
      setBackupFeedback(error.message, true);
    }
  });

  elements.backupFile.addEventListener("change", async (event) => {
    const [file] = event.target.files ?? [];
    pendingBackup = null;

    if (!file) {
      clearBackupFeedback();
      return;
    }

    try {
      pendingBackup = parseDeckBackup(await file.text());
      setBackupFeedback(`Loaded ${file.name}. Restore to apply the backup for ${formatDeckSummary(pendingBackup.selection)}.`);
    } catch (error) {
      setBackupFeedback(error.message, true);
    }
  });

  elements.restoreBackupButton.addEventListener("click", () => {
    if (!pendingBackup) {
      setBackupFeedback("Load a deck backup JSON file first.", true);
      return;
    }

    const restoredSelection = restoreDeckBackup(pendingBackup);
    elements.backupFile.value = "";
    pendingBackup = null;

    if (getSelectionKey(restoredSelection) === getSelectionKey(currentSelection)) {
      setBackupFeedback(`Restored the backup for ${formatDeckSummary(restoredSelection)}.`);
    }
  });
}

function initEditorPage() {
  const selection = getSelectionFromUrl();

  currentSelection = selection;
  currentDeckConfig = getDeckConfig(selection);
  saveSelection(selection);
  applyEditorSelectionCopy(selection);
  editorCardsState = loadEditableDeck(selection);
  renderEditorCards();
  renderEditorHelp();

  editorElements.editorSearchInput.addEventListener("input", (event) => {
    editorSearchTerm = event.target.value.trim().toLowerCase();
    renderEditorCards();
  });

  editorElements.addCardButton.addEventListener("click", () => {
    editorCardsState.push(createEmptyEditorCard());
    renderEditorCards();
    setEditorFeedback("");
  });

  editorElements.saveDeckButton.addEventListener("click", () => {
    try {
      const cards = collectEditorCards();
      saveDeckContent(selection, cards);
      clearImportedCardsFromStoredState(selection);
      editorCardsState = loadEditableDeck(selection);
      renderEditorCards();
      setEditorFeedback(`Saved ${cards.length} card(s) for this deck.`);
    } catch (error) {
      setEditorFeedback(error.message, true);
    }
  });

  editorElements.resetDeckButton.addEventListener("click", () => {
    removeDeckContent(selection);
    clearImportedCardsFromStoredState(selection);
    editorCardsState = loadEditableDeck(selection);
    renderEditorCards();
    setEditorFeedback("Reset this deck to its default vocabulary set.");
  });
}

function initStatsPage() {
  const selection = getSelectionFromUrl();

  currentSelection = selection;
  currentDeckConfig = getDeckConfig(selection);
  saveSelection(selection);
  applyStatsSelectionCopy(selection);
  state = loadState();
  renderStatsDashboard();
}

function loadState(forceFresh = false) {
  if (!forceFresh) {
    const raw = localStorage.getItem(getStateStorageKey()) ?? loadLegacyState(currentSelection);

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
    history: [],
    activityDays: {}
  };
}

function sanitizeState(rawState, selection = currentSelection, deckOverride = null) {
  const deckConfig = getDeckConfig(selection);
  const importedCards = deckConfig.supportsImport ? sanitizeImportedCards(rawState.importedCards, selection) : [];
  const baseDeck = deckOverride ?? loadDeckContent(selection);
  const deck = mergeDeckCards(baseDeck, importedCards);
  const cards = buildCardStateMap(deck, rawState.cards ?? {});
  const history = Array.isArray(rawState.history)
    ? rawState.history
        .filter((entry) => entry && typeof entry === "object" && typeof entry.cardId === "string")
        .slice(0, 12)
    : [];
  const activityDays = sanitizeActivityDays(rawState.activityDays);

  return { importedCards, cards, history, activityDays };
}

function saveState() {
  localStorage.setItem(getStateStorageKey(), JSON.stringify(state));
}

function saveStateForSelection(selection, nextState) {
  localStorage.setItem(getStateStorageKey(selection), JSON.stringify(nextState));
}

function render() {
  const dueCards = getDueCards();
  const studyQueue = getStudyQueue();
  const nextCard = studyQueue[0] ?? null;

  elements.totalCount.textContent = String(getDeck().length);
  elements.dueCount.textContent = String(dueCards.length);
  elements.studiedToday.textContent = String(getStudiedTodayCount());
  renderHistory();

  if (!nextCard) {
    currentCardId = null;
    elements.reviewCard.classList.add("hidden");
    elements.emptyState.classList.remove("hidden");
    elements.emptyStateTitle.textContent = STUDY_MODE_DETAILS[studyMode].emptyTitle;
    elements.emptyStateCopy.textContent = STUDY_MODE_DETAILS[studyMode].emptyCopy;
    elements.cardSignalRow.innerHTML = "";
    return;
  }

  currentCardId = nextCard.id;
  elements.reviewCard.classList.remove("hidden");
  elements.emptyState.classList.add("hidden");
  elements.feedbackPanel.classList.add("hidden");
  elements.examplesPanel.classList.add("hidden");
  elements.examplesList.innerHTML = "";
  elements.answerVariantsPanel.classList.add("hidden");
  elements.answerVariantsList.classList.add("hidden");
  elements.answerVariantsList.innerHTML = "";
  elements.scheduleOptions.innerHTML = "";
  elements.cardProgressStats.innerHTML = "";
  elements.cardProgressSummary.textContent = "";
  elements.cardMasteryFill.style.width = "0%";
  elements.answerForm.reset();

  elements.kanjiCharacter.textContent = getCardFront(nextCard);
  elements.kanjiHint.textContent = buildHint(nextCard);
  elements.cardPrompt.textContent = currentDeckConfig.prompt(getCardFront(nextCard));
  renderCardSignals(nextCard);
  elements.answerInput.focus();
}

function renderScheduleOptions(card, answer, isCorrect) {
  elements.scheduleOptions.innerHTML = "";
  const cardProgress = getCardProgress(card);
  const recommendedKey = getRecommendedIntervalKey(cardProgress, isCorrect);

  DEFAULT_INTERVALS.forEach((option) => {
    const button = elements.scheduleOptionTemplate.content.firstElementChild.cloneNode(true);
    const isRecommended = option.key === recommendedKey;
    button.classList.toggle("is-recommended", isRecommended);
    button.innerHTML = `<strong>${option.label}</strong><span>${option.description}</span>${isRecommended ? "<em>Recommended now</em>" : ""}`;
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
  const previousState = state.cards[cardId] ?? createEmptyCardState(reviewedAt);
  const nextStreak = isCorrect ? (previousState.currentStreak ?? 0) + 1 : 0;

  state.cards[cardId] = {
    ...previousState,
    dueAt: reviewedAt + option.minutes * 60 * 1000,
    lastReviewedAt: reviewedAt,
    lastSeenAt: reviewedAt,
    lastCorrectAt: isCorrect ? reviewedAt : previousState.lastCorrectAt ?? null,
    lastIntervalKey: option.key,
    reviewCount: (previousState.reviewCount ?? 0) + 1,
    correctCount: (previousState.correctCount ?? 0) + (isCorrect ? 1 : 0),
    lapseCount: (previousState.lapseCount ?? 0) + (isCorrect ? 0 : 1),
    currentStreak: nextStreak,
    bestStreak: Math.max(previousState.bestStreak ?? 0, nextStreak)
  };

  state.history.unshift({
    cardId,
    reviewedAt,
    answer,
    isCorrect,
    intervalKey: option.key
  });
  state.history = state.history.slice(0, 8);
  recordActivity(reviewedAt, isCorrect);

  saveState();
  render();
}

function getDueCards() {
  const now = Date.now();

  return getDeck()
    .filter((card) => isDueCard(card, now))
    .sort((left, right) => {
      const leftDue = state.cards[left.id]?.dueAt ?? now;
      const rightDue = state.cards[right.id]?.dueAt ?? now;
      return leftDue - rightDue;
    });
}

function getStudyQueue() {
  const now = Date.now();
  const deck = getDeck();
  const dueCards = deck
    .filter((card) => isDueCard(card, now))
    .sort((left, right) => {
      const leftDue = state.cards[left.id]?.dueAt ?? now;
      const rightDue = state.cards[right.id]?.dueAt ?? now;
      return leftDue - rightDue;
    });
  const newCards = deck.filter((card) => isNewCard(card));

  if (studyMode === "due") {
    return dueCards;
  }

  if (studyMode === "new") {
    return newCards;
  }

  return [...dueCards, ...newCards];
}

function isNewCard(card) {
  return !Number.isFinite(state.cards[card.id]?.lastReviewedAt);
}

function isDueCard(card, now = Date.now()) {
  const cardState = state.cards[card.id];
  return Number.isFinite(cardState?.lastReviewedAt) && (cardState?.dueAt ?? now) <= now;
}

function getStudiedTodayCount() {
  return state.activityDays?.[getDayKey(Date.now())]?.count ?? 0;
}

function buildHint(card) {
  const cardProgress = getCardProgress(card);

  if (!cardProgress.reviewCount) {
    return currentDeckConfig.emptyHint;
  }

  const lastInterval = DEFAULT_INTERVALS.find((option) => option.key === cardProgress.lastIntervalKey);
  return `${cardProgress.phaseLabel} card. Last scheduled as "${lastInterval?.label ?? "custom"}".`;
}

function getCardById(cardId) {
  return getDeck().find((card) => card.id === cardId);
}

function getCardFront(card) {
  return card.front || card.kanji || "";
}

function evaluateAnswer(answer, acceptedMeanings) {
  const candidates = splitAnswerCandidates(answer);
  const answerKeys = new Set(candidates.flatMap(getComparisonKeys));
  const normalizedCandidates = candidates.map(normalizeText).filter(Boolean);

  for (const meaning of acceptedMeanings) {
    const comparisonKeys = getComparisonKeys(meaning);

    if (comparisonKeys.some((key) => answerKeys.has(key))) {
      return {
        isCorrect: true,
        matchType: "exact",
        matchedMeaning: meaning
      };
    }

    if (!answerMatchSettings?.typoTolerance) {
      continue;
    }

    for (const candidate of normalizedCandidates) {
      for (const key of comparisonKeys) {
        if (isTypoTolerantMatch(candidate, key)) {
          return {
            isCorrect: true,
            matchType: "typo",
            matchedMeaning: meaning
          };
        }
      }
    }
  }

  return {
    isCorrect: false,
    matchType: "none",
    matchedMeaning: ""
  };
}

function splitAnswerCandidates(answer) {
  const rawAnswer = String(answer ?? "").trim();

  if (!rawAnswer) {
    return [];
  }

  const splitParts = rawAnswer
    .split(/[,/;|]|\bor\b/gi)
    .map((part) => part.trim())
    .filter(Boolean);

  return [rawAnswer, ...splitParts];
}

function getComparisonKeys(value) {
  const normalized = normalizeText(value);

  if (!normalized) {
    return [];
  }

  const singular = singularizePhrase(normalized);
  return [...new Set([normalized, singular])];
}

function isTypoTolerantMatch(left, right) {
  const normalizedLeft = normalizeText(left);
  const normalizedRight = normalizeText(right);

  if (!normalizedLeft || !normalizedRight || normalizedLeft === normalizedRight) {
    return false;
  }

  if (normalizedLeft.split(" ").length !== normalizedRight.split(" ").length) {
    return false;
  }

  const compactLeft = normalizedLeft.replace(/\s+/g, "");
  const compactRight = normalizedRight.replace(/\s+/g, "");

  if (compactLeft.length < 5 || compactRight.length < 5) {
    return false;
  }

  if (compactLeft[0] !== compactRight[0]) {
    return false;
  }

  if (Math.abs(compactLeft.length - compactRight.length) > 1) {
    return false;
  }

  return getBoundedEditDistance(normalizedLeft, normalizedRight, 1) <= 1;
}

function getBoundedEditDistance(left, right, maxDistance) {
  const leftLength = left.length;
  const rightLength = right.length;

  if (Math.abs(leftLength - rightLength) > maxDistance) {
    return maxDistance + 1;
  }

  const matrix = Array.from({ length: leftLength + 1 }, () => new Array(rightLength + 1).fill(0));

  for (let row = 0; row <= leftLength; row += 1) {
    matrix[row][0] = row;
  }

  for (let column = 0; column <= rightLength; column += 1) {
    matrix[0][column] = column;
  }

  for (let row = 1; row <= leftLength; row += 1) {
    let smallestInRow = maxDistance + 1;

    for (let column = 1; column <= rightLength; column += 1) {
      const substitutionCost = left[row - 1] === right[column - 1] ? 0 : 1;
      let cellValue = Math.min(
        matrix[row - 1][column] + 1,
        matrix[row][column - 1] + 1,
        matrix[row - 1][column - 1] + substitutionCost
      );

      if (
        row > 1 &&
        column > 1 &&
        left[row - 1] === right[column - 2] &&
        left[row - 2] === right[column - 1]
      ) {
        cellValue = Math.min(cellValue, matrix[row - 2][column - 2] + 1);
      }

      matrix[row][column] = cellValue;
      smallestInRow = Math.min(smallestInRow, cellValue);
    }

    if (smallestInRow > maxDistance) {
      return maxDistance + 1;
    }
  }

  return matrix[leftLength][rightLength];
}

function normalizeText(value) {
  return String(value ?? "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[’']/g, "")
    .replace(/&/g, " and ")
    .replace(/[-_/]/g, " ")
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\b(a|an|the)\s+/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function loadAnswerMatchSettings() {
  try {
    const raw = localStorage.getItem(ANSWER_MATCH_SETTINGS_KEY);

    if (!raw) {
      return { typoTolerance: false };
    }

    const parsed = JSON.parse(raw);
    return {
      typoTolerance: Boolean(parsed?.typoTolerance)
    };
  } catch (error) {
    return { typoTolerance: false };
  }
}

function saveAnswerMatchSettings(settings) {
  localStorage.setItem(ANSWER_MATCH_SETTINGS_KEY, JSON.stringify({
    typoTolerance: Boolean(settings?.typoTolerance)
  }));
}

function applyAnswerMatchSettings() {
  if (!elements?.typoToleranceToggle || !elements?.typoToleranceCopy) {
    return;
  }

  const typoToleranceEnabled = Boolean(answerMatchSettings?.typoTolerance);
  elements.typoToleranceToggle.checked = typoToleranceEnabled;
  elements.typoToleranceCopy.textContent = typoToleranceEnabled
    ? "One small typo is accepted for longer answers. Short answers still require an exact match."
    : "Small typo tolerance is off. Matching still ignores case, accents, articles, punctuation, and simple singular or plural differences.";
}

function loadStudyMode() {
  return sanitizeStudyMode(localStorage.getItem(STUDY_MODE_STORAGE_KEY));
}

function saveStudyMode(mode) {
  localStorage.setItem(STUDY_MODE_STORAGE_KEY, sanitizeStudyMode(mode));
}

function sanitizeStudyMode(mode) {
  return Object.prototype.hasOwnProperty.call(STUDY_MODE_DETAILS, mode) ? mode : "mixed";
}

function applyStudyMode() {
  if (!elements?.studyModeButtons || !elements?.studyModeCopy) {
    return;
  }

  const details = STUDY_MODE_DETAILS[studyMode];

  elements.studyModeButtons.forEach((button) => {
    const isActive = button.dataset.studyMode === studyMode;
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });

  elements.studyModeCopy.textContent = details.description;
}

function singularizePhrase(value) {
  const words = value.split(" ").filter(Boolean);

  if (!words.length) {
    return value;
  }

  words[words.length - 1] = singularizeWord(words[words.length - 1]);
  return words.join(" ").trim();
}

function singularizeWord(word) {
  const irregularSingulars = {
    people: "person",
    men: "man",
    women: "woman",
    children: "child",
    mice: "mouse",
    geese: "goose",
    feet: "foot",
    teeth: "tooth"
  };

  if (irregularSingulars[word]) {
    return irregularSingulars[word];
  }

  if (word.length <= 3) {
    return word;
  }

  if (/(ches|shes|sses|xes|zes)$/.test(word)) {
    return word.replace(/es$/, "");
  }

  if (/ies$/.test(word) && word.length > 4) {
    return `${word.slice(0, -3)}y`;
  }

  if (/s$/.test(word) && !/ss$/.test(word)) {
    return word.slice(0, -1);
  }

  return word;
}

function pluralizePhrase(value) {
  const words = value.split(" ").filter(Boolean);

  if (!words.length) {
    return value;
  }

  words[words.length - 1] = pluralizeWord(words[words.length - 1]);
  return words.join(" ").trim();
}

function pluralizeWord(word) {
  const irregularPlurals = {
    person: "people",
    man: "men",
    woman: "women",
    child: "children",
    mouse: "mice",
    goose: "geese",
    foot: "feet",
    tooth: "teeth"
  };

  if (irregularPlurals[word]) {
    return irregularPlurals[word];
  }

  if (/[sxz]$/.test(word) || /(ch|sh)$/.test(word)) {
    return `${word}es`;
  }

  if (/[^aeiou]y$/.test(word)) {
    return `${word.slice(0, -1)}ies`;
  }

  if (/s$/.test(word)) {
    return word;
  }

  return `${word}s`;
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
  return loadDeckContent(currentSelection);
}

function getDeck() {
  return mergeDeckCards(getStarterDeck(), state.importedCards);
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

function renderAnswerVariants(card) {
  const variants = getAutoAcceptedVariants(card.meanings);

  elements.answerVariantsCopy.textContent = answerMatchSettings?.typoTolerance
    ? "Matching ignores case, accents, articles, punctuation, simple singular or plural differences, and one small typo for longer answers."
    : "Matching ignores case, accents, articles, punctuation, and simple singular or plural differences.";
  elements.answerVariantsList.innerHTML = "";

  if (!variants.length) {
    elements.answerVariantsList.classList.add("hidden");
    elements.answerVariantsPanel.classList.remove("hidden");
    return;
  }

  variants.forEach((variant) => {
    const item = document.createElement("li");
    item.textContent = variant;
    elements.answerVariantsList.appendChild(item);
  });

  elements.answerVariantsList.classList.remove("hidden");
  elements.answerVariantsPanel.classList.remove("hidden");
}

function getAutoAcceptedVariants(meanings = []) {
  const explicitMeanings = new Set(meanings.map((meaning) => normalizeText(meaning)).filter(Boolean));
  const generatedVariants = new Set();

  meanings.forEach((meaning) => {
    const normalizedMeaning = normalizeText(meaning);

    if (!normalizedMeaning) {
      return;
    }

    const singular = singularizePhrase(normalizedMeaning);
    const plural = pluralizePhrase(singular);
    const hyphenated = singular.includes(" ") ? singular.replace(/\s+/g, "-") : "";

    [singular, plural, hyphenated].forEach((variant) => {
      if (variant && !explicitMeanings.has(variant)) {
        generatedVariants.add(variant);
      }
    });
  });

  return [...generatedVariants].slice(0, 8);
}

function createEmptyCardState(now = Date.now(), saved = {}) {
  const dueAt = Number.isFinite(saved.dueAt) ? saved.dueAt : now;
  const lastReviewedAt = Number.isFinite(saved.lastReviewedAt) ? saved.lastReviewedAt : null;
  const lastSeenAt = Number.isFinite(saved.lastSeenAt) ? saved.lastSeenAt : lastReviewedAt;
  const lastCorrectAt = Number.isFinite(saved.lastCorrectAt) ? saved.lastCorrectAt : null;
  const lastIntervalKey = typeof saved.lastIntervalKey === "string" ? saved.lastIntervalKey : null;
  const inferredLegacyReviewCount = Number.isFinite(lastReviewedAt) ? 1 : 0;
  const reviewCount = Number.isFinite(saved.reviewCount) ? Math.max(0, saved.reviewCount) : inferredLegacyReviewCount;
  const correctCount = Number.isFinite(saved.correctCount) ? Math.max(0, saved.correctCount) : inferredLegacyReviewCount;
  const lapseCount = Number.isFinite(saved.lapseCount) ? Math.max(0, saved.lapseCount) : 0;
  const currentStreak = Number.isFinite(saved.currentStreak)
    ? Math.max(0, saved.currentStreak)
    : inferredLegacyReviewCount && lastIntervalKey !== "again"
      ? 1
      : 0;
  const bestStreak = Number.isFinite(saved.bestStreak) ? Math.max(0, saved.bestStreak) : currentStreak;

  return {
    dueAt,
    lastReviewedAt,
    lastSeenAt,
    lastCorrectAt,
    lastIntervalKey,
    reviewCount,
    correctCount,
    lapseCount,
    currentStreak,
    bestStreak
  };
}

function sanitizeActivityDays(rawActivityDays) {
  if (!rawActivityDays || typeof rawActivityDays !== "object") {
    return {};
  }

  return Object.fromEntries(
    Object.entries(rawActivityDays)
      .filter(([dayKey]) => /^\d{4}-\d{2}-\d{2}$/.test(dayKey))
      .map(([dayKey, value]) => [
        dayKey,
        {
          count: Number.isFinite(value?.count) ? Math.max(0, value.count) : 0,
          correct: Number.isFinite(value?.correct) ? Math.max(0, value.correct) : 0
        }
      ])
  );
}

function getDayKey(timestamp = Date.now()) {
  const date = new Date(timestamp);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function recordActivity(timestamp, isCorrect) {
  const dayKey = getDayKey(timestamp);
  const existing = state.activityDays?.[dayKey] ?? { count: 0, correct: 0 };
  state.activityDays = {
    ...state.activityDays,
    [dayKey]: {
      count: existing.count + 1,
      correct: existing.correct + (isCorrect ? 1 : 0)
    }
  };
}

function getCardProgress(card) {
  const cardState = state.cards[card.id] ?? createEmptyCardState();
  const reviewCount = cardState.reviewCount ?? 0;
  const correctCount = cardState.correctCount ?? 0;
  const lapseCount = cardState.lapseCount ?? 0;
  const accuracy = reviewCount ? correctCount / reviewCount : 0;
  const masteryScore = reviewCount
    ? Math.max(0.08, Math.min(0.98, 0.28 + (accuracy * 0.42) + (Math.min(reviewCount, 8) * 0.035) + (Math.min(cardState.currentStreak ?? 0, 4) * 0.045) - (lapseCount * 0.05)))
    : 0;
  const phaseLabel = reviewCount === 0
    ? "New"
    : lapseCount >= 3 || accuracy < 0.65
      ? "Needs rebuild"
      : reviewCount < 3
        ? "Learning"
        : masteryScore >= 0.82
          ? "Strong"
          : "Reviewing";
  const difficultyLabel = reviewCount === 0
    ? "Unrated"
    : lapseCount >= 3 || accuracy < 0.65
      ? "Needs focus"
      : lapseCount >= 1 || accuracy < 0.85
        ? "Stretch"
        : "Steady";
  const difficultyTone = difficultyLabel === "Needs focus"
    ? "danger"
    : difficultyLabel === "Stretch"
      ? "warning"
      : difficultyLabel === "Unrated"
        ? "neutral"
        : "success";

  return {
    ...cardState,
    reviewCount,
    correctCount,
    lapseCount,
    accuracy,
    masteryScore,
    phaseLabel,
    difficultyLabel,
    difficultyTone,
    nextDueLabel: reviewCount === 0 ? "Not scheduled yet" : formatRelativeDate(cardState.dueAt),
    lastSeenLabel: Number.isFinite(cardState.lastSeenAt) ? formatRelativeDate(cardState.lastSeenAt) : "Never",
    accuracyLabel: reviewCount ? `${Math.round(accuracy * 100)}%` : "No data",
    masteryLabel: reviewCount ? `${Math.round(masteryScore * 100)}%` : "0%"
  };
}

function getRecommendedIntervalKey(cardProgress, isCorrect) {
  if (!isCorrect) {
    return cardProgress.lapseCount >= 2 ? "again" : "soon";
  }

  if (cardProgress.difficultyLabel === "Needs focus") {
    return "soon";
  }

  if (cardProgress.difficultyLabel === "Stretch") {
    return "tomorrow";
  }

  return cardProgress.reviewCount >= 5 ? "week" : "three-days";
}

function renderCardSignals(card) {
  if (!elements?.cardSignalRow) {
    return;
  }

  const cardProgress = getCardProgress(card);
  const chips = [
    { label: cardProgress.phaseLabel, tone: "neutral" },
    { label: cardProgress.difficultyLabel, tone: cardProgress.difficultyTone },
    { label: cardProgress.reviewCount ? `${cardProgress.lapseCount} lapse${cardProgress.lapseCount === 1 ? "" : "s"}` : "Fresh card", tone: "neutral" },
    { label: cardProgress.reviewCount ? `Due ${cardProgress.nextDueLabel}` : "Unscheduled", tone: "neutral" }
  ];

  elements.cardSignalRow.innerHTML = chips
    .map((chip) => `<span class="signal-chip tone-${chip.tone}">${chip.label}</span>`)
    .join("");
}

function renderCardProgress(card) {
  if (!elements?.cardProgressStats) {
    return;
  }

  const cardProgress = getCardProgress(card);
  const stats = [
    { label: "Difficulty", value: cardProgress.difficultyLabel, tone: cardProgress.difficultyTone },
    { label: "Reviews", value: String(cardProgress.reviewCount), tone: "neutral" },
    { label: "Accuracy", value: cardProgress.accuracyLabel, tone: "neutral" },
    { label: "Lapses", value: String(cardProgress.lapseCount), tone: cardProgress.lapseCount ? "warning" : "success" },
    { label: "Last seen", value: cardProgress.lastSeenLabel, tone: "neutral" },
    { label: "Next due", value: cardProgress.nextDueLabel, tone: "neutral" }
  ];

  elements.cardMasteryFill.style.width = `${Math.round(cardProgress.masteryScore * 100)}%`;
  elements.cardProgressSummary.textContent = cardProgress.reviewCount
    ? `${cardProgress.phaseLabel} card with ${cardProgress.masteryLabel} mastery and a ${cardProgress.accuracyLabel} hit rate.`
    : "Brand-new card with no review history yet.";
  elements.cardProgressStats.innerHTML = stats
    .map((item) => `<article class="progress-stat tone-${item.tone}"><span>${item.label}</span><strong>${item.value}</strong></article>`)
    .join("");
}

function renderStatsDashboard() {
  if (!statsElements) {
    return;
  }

  const deck = getDeck();
  const dueNow = getDueCards().length;
  const newCount = deck.filter((card) => isNewCard(card)).length;
  const allProgress = deck.map((card) => ({ card, progress: getCardProgress(card) }));
  const studiedThisWeek = getRecentActivity(7);
  const weeklyReviews = studiedThisWeek.reduce((total, day) => total + day.count, 0);
  const weeklyCorrect = studiedThisWeek.reduce((total, day) => total + day.correct, 0);
  const weeklyAccuracy = weeklyReviews ? Math.round((weeklyCorrect / weeklyReviews) * 100) : 0;
  const streaks = getStreakStats();
  const needsFocus = allProgress.filter(({ progress }) => progress.difficultyLabel === "Needs focus").length;
  const strongCards = allProgress.filter(({ progress }) => progress.phaseLabel === "Strong").length;

  statsElements.statsSummaryGrid.innerHTML = [
    { label: "Current streak", value: `${streaks.current} day${streaks.current === 1 ? "" : "s"}` },
    { label: "Best streak", value: `${streaks.best} day${streaks.best === 1 ? "" : "s"}` },
    { label: "Reviews this week", value: String(weeklyReviews) },
    { label: "Weekly accuracy", value: `${weeklyAccuracy}%` },
    { label: "Due now", value: String(dueNow) },
    { label: "Needs focus", value: String(needsFocus) }
  ]
    .map((metric) => `<article class="status-card"><span class="status-label">${metric.label}</span><strong>${metric.value}</strong></article>`)
    .join("");

  renderWeeklyActivity(studiedThisWeek);
  renderMetricStack(statsElements.difficultyBreakdown, [
    { label: "Needs focus", value: String(needsFocus), tone: "danger" },
    { label: "Stretch", value: String(allProgress.filter(({ progress }) => progress.difficultyLabel === "Stretch").length), tone: "warning" },
    { label: "Steady", value: String(allProgress.filter(({ progress }) => progress.difficultyLabel === "Steady").length), tone: "success" },
    { label: "Unrated", value: String(allProgress.filter(({ progress }) => progress.difficultyLabel === "Unrated").length), tone: "neutral" }
  ]);
  renderMetricStack(statsElements.queueBreakdown, [
    { label: "Due now", value: String(dueNow), tone: "danger" },
    { label: "New cards", value: String(newCount), tone: "neutral" },
    { label: "Scheduled later", value: String(deck.length - dueNow - newCount), tone: "success" },
    { label: "Strong cards", value: String(strongCards), tone: "success" }
  ]);
  renderInsightList(
    statsElements.hardestCardsList,
    allProgress
      .filter(({ progress }) => progress.reviewCount > 0)
      .sort((left, right) => compareCardDifficulty(left.progress, right.progress))
      .slice(0, 6)
      .map(({ card, progress }) => ({
        title: `${getCardFront(card)} - ${card.meanings.join(" / ")}`,
        copy: `${progress.difficultyLabel} | ${progress.lapseCount} lapse${progress.lapseCount === 1 ? "" : "s"} | ${progress.accuracyLabel} accuracy | due ${progress.nextDueLabel}`,
        tone: progress.difficultyTone
      })),
    "No difficulty data yet. Review a few cards to populate this list."
  );
  renderInsightList(
    statsElements.masteryList,
    allProgress
      .sort((left, right) => right.progress.masteryScore - left.progress.masteryScore)
      .map(({ card, progress }) => ({
        title: `${getCardFront(card)} - ${progress.masteryLabel} mastery`,
        copy: `${progress.phaseLabel} | ${progress.reviewCount} review${progress.reviewCount === 1 ? "" : "s"} | last seen ${progress.lastSeenLabel}`,
        tone: progress.difficultyTone
      })),
    "Mastery data will appear after the first review."
  );
}

function renderWeeklyActivity(activity) {
  if (!statsElements?.weeklyActivityChart) {
    return;
  }

  const maxCount = Math.max(1, ...activity.map((day) => day.count));
  statsElements.weeklyActivityChart.innerHTML = activity
    .map((day) => {
      const height = Math.max(8, Math.round((day.count / maxCount) * 100));
      const accuracyLabel = day.count ? `${Math.round((day.correct / day.count) * 100)}%` : "0%";
      return `<article class="activity-day">
        <span class="activity-day-label">${day.label}</span>
        <div class="activity-bar-shell"><span class="activity-bar" style="height:${height}%"></span></div>
        <strong>${day.count}</strong>
        <span class="activity-day-meta">${accuracyLabel}</span>
      </article>`;
    })
    .join("");

  const total = activity.reduce((sum, day) => sum + day.count, 0);
  const correct = activity.reduce((sum, day) => sum + day.correct, 0);
  const accuracy = total ? Math.round((correct / total) * 100) : 0;
  statsElements.weeklyActivityCopy.textContent = total
    ? `${total} review${total === 1 ? "" : "s"} in the last 7 days with ${accuracy}% accuracy.`
    : "No reviews in the last 7 days yet.";
}

function renderMetricStack(container, rows) {
  container.innerHTML = rows
    .map((row) => `<article class="metric-row tone-${row.tone}"><span>${row.label}</span><strong>${row.value}</strong></article>`)
    .join("");
}

function renderInsightList(container, items, emptyCopy) {
  if (!items.length) {
    container.innerHTML = `<p class="sidebar-copy">${emptyCopy}</p>`;
    return;
  }

  container.innerHTML = items
    .map((item) => `<article class="insight-item tone-${item.tone}"><strong>${item.title}</strong><p>${item.copy}</p></article>`)
    .join("");
}

function getRecentActivity(days = 7) {
  return Array.from({ length: days }, (_, index) => {
    const timestamp = Date.now() - ((days - index - 1) * 24 * 60 * 60 * 1000);
    const dayKey = getDayKey(timestamp);
    const day = state.activityDays?.[dayKey] ?? { count: 0, correct: 0 };
    const weekdayLabel = new Intl.DateTimeFormat(undefined, { weekday: "short" }).format(new Date(timestamp));

    return {
      key: dayKey,
      label: weekdayLabel,
      count: day.count,
      correct: day.correct
    };
  });
}

function getStreakStats() {
  const activeDays = Object.entries(state.activityDays ?? {})
    .filter(([, value]) => value.count > 0)
    .map(([dayKey]) => dayKey)
    .sort();

  if (!activeDays.length) {
    return { current: 0, best: 0 };
  }

  let best = 0;
  let currentRun = 0;
  let previousDate = null;

  activeDays.forEach((dayKey) => {
    const date = new Date(`${dayKey}T00:00:00`);

    if (!previousDate) {
      currentRun = 1;
    } else {
      const diffDays = Math.round((date.getTime() - previousDate.getTime()) / (24 * 60 * 60 * 1000));
      currentRun = diffDays === 1 ? currentRun + 1 : 1;
    }

    best = Math.max(best, currentRun);
    previousDate = date;
  });

  let current = 0;
  let cursor = new Date();
  cursor.setHours(0, 0, 0, 0);

  while (state.activityDays?.[getDayKey(cursor.getTime())]?.count > 0) {
    current += 1;
    cursor = new Date(cursor.getTime() - (24 * 60 * 60 * 1000));
  }

  if (!current) {
    const yesterday = new Date(Date.now() - (24 * 60 * 60 * 1000));
    yesterday.setHours(0, 0, 0, 0);
    while (state.activityDays?.[getDayKey(yesterday.getTime())]?.count > 0) {
      current += 1;
      yesterday.setDate(yesterday.getDate() - 1);
    }
  }

  return { current, best };
}

function compareCardDifficulty(left, right) {
  const leftScore = (left.lapseCount * 4) + ((1 - left.accuracy) * 10) - (left.currentStreak ?? 0);
  const rightScore = (right.lapseCount * 4) + ((1 - right.accuracy) * 10) - (right.currentStreak ?? 0);
  return rightScore - leftScore;
}

function buildCardStateMap(deck, savedCards = {}, now = Date.now()) {
  return Object.fromEntries(
    deck.map((card) => {
      const saved = createEmptyCardState(now, savedCards?.[card.id] ?? {});
      return [card.id, saved];
    })
  );
}

function sanitizeImportedCards(rawImportedCards, selection = currentSelection) {
  if (!Array.isArray(rawImportedCards)) {
    return [];
  }

  const cardsById = new Map();

  rawImportedCards.forEach((rawCard) => {
    const card = sanitizeImportedCard(rawCard, selection);

    if (card) {
      cardsById.set(card.id, card);
    }
  });

  return [...cardsById.values()];
}

function sanitizeImportedCard(rawCard, selection = currentSelection) {
  const deckConfig = getDeckConfig(selection);

  if (!deckConfig.supportsImport) {
    return null;
  }

  if (!rawCard || typeof rawCard !== "object") {
    return null;
  }

  const frontKey = deckConfig.frontKey;
  const frontValue = typeof rawCard?.[frontKey] === "string"
    ? rawCard[frontKey].trim()
    : frontKey === "kanji" && typeof rawCard?.front === "string"
      ? rawCard.front.trim()
      : frontKey === "front" && typeof rawCard?.kanji === "string"
        ? rawCard.kanji.trim()
        : "";
  const meanings = Array.isArray(rawCard.meanings)
    ? rawCard.meanings.map((meaning) => String(meaning).trim()).filter(Boolean)
    : splitMeanings(rawCard.meanings);
  const readings = deckConfig.supportsReadings && typeof rawCard.readings === "string"
    ? rawCard.readings.trim()
    : "";

  if (!frontValue || !meanings.length) {
    return null;
  }

  const id = typeof rawCard.id === "string" && rawCard.id.trim()
    ? rawCard.id.trim()
    : createImportedCardId(frontValue, meanings, selection);

  return {
    id,
    [frontKey]: frontValue,
    meanings,
    readings,
    examples: sanitizeExamples(rawCard.examples)
  };
}

function importCardsFromCsv(csvText) {
  if (!currentDeckConfig.supportsImport) {
    throw new Error(`CSV import is not available for the ${formatDeckSummary(currentSelection)} deck.`);
  }

  const importedCards = parseImportedCardsFromCsv(csvText);
  const existingCards = new Map(loadEditableDeck(currentSelection).map((card) => [card.id, card]));
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
      state.cards[card.id] = createEmptyCardState(now);
    }
  });

  saveDeckContent(currentSelection, [...existingCards.values()]);
  state.importedCards = [];
  state.cards = buildCardStateMap(getDeck(), state.cards, now);
  clearImportedCardsFromStoredState(currentSelection);
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
  const importConfig = currentDeckConfig.importConfig;
  const requiredHeaders = getRequiredImportHeaders(currentDeckConfig);
  const sourceLabel = currentDeckConfig.editorExampleSourceLabel.toLowerCase();

  if (rows.length < 2) {
    throw new Error(`CSV import needs a header row and at least one ${currentDeckConfig.editorFrontLabel.toLowerCase()} row.`);
  }

  const headers = rows[0].map(normalizeHeader);
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
    const frontValue = record[importConfig.frontHeader]?.trim() ?? "";
    const meanings = splitMeanings(record.meanings);
    const readings = importConfig.readingsHeader ? record[importConfig.readingsHeader].trim() : "";
    const examples = sanitizeExamples([
      { jp: record[importConfig.example1SourceHeader], en: record[importConfig.example1TranslationHeader] },
      { jp: record[importConfig.example2SourceHeader], en: record[importConfig.example2TranslationHeader] }
    ]);

    if (!frontValue) {
      throw new Error(`Row ${index + 2} is missing a ${currentDeckConfig.editorFrontLabel.toLowerCase()} value.`);
    }

    if (!meanings.length) {
      throw new Error(`Row ${index + 2} is missing meanings. Use | between multiple meanings.`);
    }

    if (examples.length !== 2) {
      throw new Error(`Row ${index + 2} must include two example sentence pairs with ${sourceLabel} and English text.`);
    }

    return {
      id: createImportedCardId(frontValue, meanings, currentSelection),
      [currentDeckConfig.frontKey]: frontValue,
      meanings,
      readings,
      examples
    };
  });
}

function exportDeckBackup() {
  const selection = sanitizeSelection(currentSelection);
  const deckContent = loadDeckContent(selection);
  const studyState = sanitizeState(loadRawStateForSelection(selection) ?? {}, selection, deckContent);
  const backup = {
    version: BACKUP_FORMAT_VERSION,
    exportedAt: new Date().toISOString(),
    selection,
    deckContent,
    studyState: {
      cards: studyState.cards,
      history: studyState.history,
      activityDays: studyState.activityDays
    }
  };
  const backupUrl = URL.createObjectURL(new Blob([JSON.stringify(backup, null, 2)], { type: "application/json" }));
  const link = document.createElement("a");

  link.href = backupUrl;
  link.download = buildDeckBackupFilename(selection);
  document.body.appendChild(link);
  link.click();
  link.remove();

  setTimeout(() => URL.revokeObjectURL(backupUrl), 0);
}

function parseDeckBackup(rawBackupText) {
  if (!rawBackupText.trim()) {
    throw new Error("The backup file is empty.");
  }

  let parsedBackup;

  try {
    parsedBackup = JSON.parse(rawBackupText);
  } catch (error) {
    throw new Error("The backup file is not valid JSON.");
  }

  if (!parsedBackup || typeof parsedBackup !== "object") {
    throw new Error("The backup file must contain a deck backup object.");
  }

  if (parsedBackup.version !== BACKUP_FORMAT_VERSION) {
    throw new Error(`Unsupported backup format version: ${parsedBackup.version ?? "unknown"}.`);
  }

  const selection = sanitizeSelection(parsedBackup.selection);
  const deckContent = sanitizeDeckContent(parsedBackup.deckContent, selection);

  if (!deckContent.length) {
    throw new Error("The backup file does not contain any valid deck cards.");
  }

  const studyState = sanitizeState(parsedBackup.studyState ?? {}, selection, deckContent);

  return {
    version: BACKUP_FORMAT_VERSION,
    selection,
    deckContent,
    studyState
  };
}

function restoreDeckBackup(backup) {
  const selection = sanitizeSelection(backup.selection);
  const deckContent = sanitizeDeckContent(backup.deckContent, selection);
  const studyState = sanitizeState(backup.studyState ?? {}, selection, deckContent);

  saveDeckContent(selection, deckContent);
  saveStateForSelection(selection, studyState);
  saveSelection(selection);

  if (getSelectionKey(selection) === getSelectionKey(currentSelection)) {
    currentSelection = selection;
    currentDeckConfig = getDeckConfig(selection);
    applyDeckSelectionCopy(selection);
    state = loadState();
    clearImportFeedback();
    render();
    return selection;
  }

  window.location.href = getDeckPageUrl(selection);
  return selection;
}

function buildDeckBackupFilename(selection = currentSelection) {
  const normalizedSelection = sanitizeSelection(selection);
  const dateStamp = new Date().toISOString().slice(0, 10);
  return `${normalizedSelection.language}-${normalizedSelection.deck}-${normalizedSelection.set}-backup-${dateStamp}.json`;
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

function getRequiredImportHeaders(deckConfig = currentDeckConfig) {
  const importConfig = deckConfig.importConfig;

  return [
    importConfig.frontHeader,
    "meanings",
    importConfig.readingsHeader,
    importConfig.example1SourceHeader,
    importConfig.example1TranslationHeader,
    importConfig.example2SourceHeader,
    importConfig.example2TranslationHeader
  ].filter(Boolean);
}

function createImportedCardId(frontValue, meanings, selection = currentSelection) {
  return `imported:${getSelectionKey(selection)}:${normalizeCardKey(frontValue)}:${normalizeCardKey(meanings[0])}`;
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

function loadLegacyState(selection = currentSelection) {
  if (!isLegacyStarterSelection(selection)) {
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

function setBackupFeedback(message, isError = false) {
  if (!elements?.backupFeedback) {
    return;
  }

  elements.backupFeedback.textContent = message;
  elements.backupFeedback.classList.toggle("is-error", isError);
}

function clearBackupFeedback() {
  setBackupFeedback("", false);
}

function mergeDeckCards(baseDeck = [], extraCards = []) {
  const cardsById = new Map();

  [...baseDeck, ...extraCards].forEach((card) => {
    if (card?.id) {
      cardsById.set(card.id, card);
    }
  });

  return [...cardsById.values()];
}

function loadEditableDeck(selection = currentSelection) {
  return mergeDeckCards(loadDeckContent(selection), loadImportedCardsFromStoredState(selection));
}

function loadDeckContent(selection = currentSelection) {
  const storageKey = getDeckContentStorageKey(selection);
  const fallbackDeck = getDefaultDeckCards(selection);

  try {
    const raw = localStorage.getItem(storageKey) ?? loadLegacyDeckContent(selection);

    if (!raw) {
      return cloneDeckCards(fallbackDeck);
    }

    const parsed = JSON.parse(raw);
    const cards = sanitizeDeckContent(parsed, selection);
    return cards.length ? cards : cloneDeckCards(fallbackDeck);
  } catch (error) {
    return cloneDeckCards(fallbackDeck);
  }
}

function saveDeckContent(selection, cards) {
  const sanitizedCards = sanitizeDeckContent(cards, selection);
  localStorage.setItem(getDeckContentStorageKey(selection), JSON.stringify(sanitizedCards));
}

function removeDeckContent(selection) {
  localStorage.removeItem(getDeckContentStorageKey(selection));

  if (isLegacyStarterSelection(selection)) {
    localStorage.removeItem(`${DECK_CONTENT_STORAGE_KEY}:${DEFAULT_DECK_KEY}`);
  }
}

function getDeckContentStorageKey(selection = currentSelection) {
  return `${DECK_CONTENT_STORAGE_KEY}:${getSelectionKey(selection)}`;
}

function loadLegacyDeckContent(selection = currentSelection) {
  return isLegacyStarterSelection(selection)
    ? localStorage.getItem(`${DECK_CONTENT_STORAGE_KEY}:${DEFAULT_DECK_KEY}`)
    : null;
}

function cloneDeckCards(cards) {
  return cards.map((card) => ({
    id: card.id,
    front: typeof card.front === "string" ? card.front : undefined,
    kanji: typeof card.kanji === "string" ? card.kanji : undefined,
    meanings: Array.isArray(card.meanings) ? [...card.meanings] : [],
    readings: typeof card.readings === "string" ? card.readings : "",
    examples: sanitizeExamples(card.examples)
  }));
}

function sanitizeDeckContent(rawCards, selection = currentSelection) {
  if (!Array.isArray(rawCards)) {
    return [];
  }

  const cardsById = new Map();

  rawCards.forEach((rawCard) => {
    const card = sanitizeDeckCard(rawCard, selection);

    if (card) {
      cardsById.set(card.id, card);
    }
  });

  return [...cardsById.values()];
}

function sanitizeDeckCard(rawCard, selection = currentSelection) {
  const deckConfig = getDeckConfig(selection);
  const frontKey = deckConfig.frontKey;
  const frontValue = typeof rawCard?.[frontKey] === "string" ? rawCard[frontKey].trim() : "";
  const meanings = Array.isArray(rawCard?.meanings)
    ? rawCard.meanings.map((meaning) => String(meaning).trim()).filter(Boolean)
    : splitMeanings(rawCard?.meanings);
  const readings = deckConfig.supportsReadings && typeof rawCard?.readings === "string"
    ? rawCard.readings.trim()
    : "";

  if (!frontValue || !meanings.length) {
    return null;
  }

  return {
    id: typeof rawCard?.id === "string" && rawCard.id.trim()
      ? rawCard.id.trim()
      : createDeckCardId(frontValue, meanings, selection),
    [frontKey]: frontValue,
    meanings,
    readings,
    examples: sanitizeExamples(rawCard?.examples)
  };
}

function createDeckCardId(frontValue, meanings, selection = currentSelection) {
  return `deck:${getSelectionKey(selection)}:${normalizeCardKey(frontValue)}:${normalizeCardKey(meanings[0])}`;
}

function loadImportedCardsFromStoredState(selection = currentSelection) {
  const rawState = loadRawStateForSelection(selection);

  if (!rawState?.importedCards) {
    return [];
  }

  return sanitizeImportedCards(rawState.importedCards, selection);
}

function clearImportedCardsFromStoredState(selection = currentSelection) {
  const storageKey = getStateStorageKey(selection);
  const raw = localStorage.getItem(storageKey) ?? loadLegacyState(selection);

  if (!raw) {
    return;
  }

  try {
    const parsed = JSON.parse(raw);

    if (!parsed || typeof parsed !== "object") {
      return;
    }

    parsed.importedCards = [];
    localStorage.setItem(storageKey, JSON.stringify(parsed));
  } catch (error) {
    // Ignore malformed legacy state during editor cleanup.
  }
}

function loadRawStateForSelection(selection = currentSelection) {
  const storageKey = getStateStorageKey(selection);
  const raw = localStorage.getItem(storageKey) ?? loadLegacyState(selection);

  if (!raw) {
    return null;
  }

  try {
    return JSON.parse(raw);
  } catch (error) {
    return null;
  }
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
  const requestedDeckKey = `${selection?.language ?? DEFAULT_SELECTION.language}:${selection?.deck ?? DEFAULT_SELECTION.deck}`;
  const deckConfig = DECK_CONFIGS[requestedDeckKey] ?? DECK_CONFIGS[DEFAULT_DECK_KEY];
  const setIds = Object.keys(deckConfig.sets ?? {});
  const fallbackSetId = setIds[0] ?? DEFAULT_SELECTION.set;
  const normalizedSet = typeof selection?.set === "string" && deckConfig.sets?.[selection.set]
    ? selection.set
    : fallbackSetId;

  return {
    language: deckConfig.language,
    deck: deckConfig.deck,
    set: normalizedSet
  };
}

function getSelectionFromUrl() {
  const params = new URLSearchParams(window.location.search);
  const savedSelection = loadSelection();

  return sanitizeSelection({
    language: params.get("language") ?? savedSelection.language,
    deck: params.get("deck") ?? savedSelection.deck,
    set: params.get("set") ?? savedSelection.set
  });
}

function getSelectionForChoice(group, value) {
  const current = loadSelection();

  if (group === "language") {
    const deckConfig = DECK_ORDER
      .map((deckKey) => DECK_CONFIGS[deckKey])
      .find((config) => config.language === value)
      ?? DECK_CONFIGS[DEFAULT_DECK_KEY];
    return sanitizeSelection({
      language: deckConfig.language,
      deck: deckConfig.deck,
      set: current.set
    });
  }

  if (group === "set") {
    return sanitizeSelection({
      ...current,
      set: value
    });
  }

  return sanitizeSelection(current);
}

function updateSelectionSummary(selection) {
  const normalizedSelection = sanitizeSelection(selection);
  const deckConfig = getDeckConfig(normalizedSelection);
  const setConfig = getSetConfig(normalizedSelection);

  renderSelectionOptions(normalizedSelection);
  selectionElements.selectionTitle.textContent = `${deckConfig.languageLabel} ${deckConfig.deckLabel} ${setConfig.label}`;
  selectionElements.selectionDescription.textContent = `${deckConfig.selectionDescription} ${setConfig.description}`;
  selectionElements.summaryLanguage.textContent = deckConfig.languageLabel;
  selectionElements.summarySet.textContent = setConfig.label;
  selectionElements.startSelectedDeck.href = getDeckPageUrl(normalizedSelection);
  selectionElements.editSelectedDeck.href = getEditorPageUrl(normalizedSelection);
  selectionElements.viewSelectedStats.href = getStatsPageUrl(normalizedSelection);
  saveSelection(normalizedSelection);
}

function getDeckPageUrl(selection) {
  const normalizedSelection = sanitizeSelection(selection);
  const params = new URLSearchParams(normalizedSelection);
  return `deck.html?${params.toString()}`;
}

function getEditorPageUrl(selection) {
  const normalizedSelection = sanitizeSelection(selection);
  const params = new URLSearchParams(normalizedSelection);
  return `editor.html?${params.toString()}`;
}

function getStatsPageUrl(selection) {
  const normalizedSelection = sanitizeSelection(selection);
  const params = new URLSearchParams(normalizedSelection);
  return `stats.html?${params.toString()}`;
}

function applyDeckSelectionCopy(selection) {
  const normalizedSelection = sanitizeSelection(selection);
  const deckConfig = getDeckConfig(normalizedSelection);
  const setConfig = getSetConfig(normalizedSelection);

  elements.selectedLanguage.textContent = deckConfig.languageLabel;
  elements.selectedDeckType.textContent = `${deckConfig.deckLabel} / ${setConfig.label}`;
  elements.selectedDeckTitle.textContent = deckConfig.heroTitle;
  elements.selectedDeckDescription.textContent = `${deckConfig.heroDescription} ${setConfig.description}`;
  elements.answerInputLabel.textContent = deckConfig.inputLabel;
  elements.answerInput.placeholder = deckConfig.inputPlaceholder;
  elements.answerSubmit.textContent = deckConfig.submitLabel;
  elements.editDeckLink.href = getEditorPageUrl(normalizedSelection);
  elements.statsDeckLink.href = getStatsPageUrl(normalizedSelection);
  renderHowItWorks(deckConfig.flowSteps);

  if (elements.importSection) {
    elements.importSection.classList.toggle("hidden", !deckConfig.supportsImport);
  }

  if (deckConfig.supportsImport && elements.importCopy && elements.csvExample) {
    elements.importCopy.innerHTML = buildImportCopy(deckConfig);
    elements.csvExample.textContent = deckConfig.importConfig?.example ?? "";
  }

  if (elements.backupCopy) {
    elements.backupCopy.textContent = `Download a JSON backup of the ${formatDeckSummary(normalizedSelection)} deck's cards and review progress, or restore a backup file.`;
  }
}

function applyEditorSelectionCopy(selection) {
  const normalizedSelection = sanitizeSelection(selection);
  const deckConfig = getDeckConfig(normalizedSelection);
  const setConfig = getSetConfig(normalizedSelection);

  editorElements.openDeckLink.href = getDeckPageUrl(normalizedSelection);
  editorElements.editorStatsLink.href = getStatsPageUrl(normalizedSelection);
  editorElements.editorLanguage.textContent = deckConfig.languageLabel;
  editorElements.editorDeckType.textContent = `${deckConfig.deckLabel} / ${setConfig.label}`;
  editorElements.editorTitle.textContent = deckConfig.editorTitle;
  editorElements.editorDescription.textContent = `${deckConfig.editorDescription} ${setConfig.description}`;
  editorElements.editorPanelTitle.textContent = `${deckConfig.languageLabel} ${deckConfig.deckLabel} cards / ${setConfig.label}`;
}

function applyStatsSelectionCopy(selection) {
  const normalizedSelection = sanitizeSelection(selection);
  const deckConfig = getDeckConfig(normalizedSelection);
  const setConfig = getSetConfig(normalizedSelection);

  statsElements.statsOpenDeckLink.href = getDeckPageUrl(normalizedSelection);
  statsElements.statsEditDeckLink.href = getEditorPageUrl(normalizedSelection);
  statsElements.statsLanguage.textContent = deckConfig.languageLabel;
  statsElements.statsDeckType.textContent = deckConfig.deckLabel;
  statsElements.statsSetLabel.textContent = setConfig.label;
  statsElements.statsTitle.textContent = `Track ${deckConfig.languageLabel.toLowerCase()} ${deckConfig.deckLabel.toLowerCase()} progress at the set level.`;
  statsElements.statsDescription.textContent = `${deckConfig.selectionDescription} ${setConfig.description}`;
}

function formatSelectionLabel(value) {
  return String(value).charAt(0).toUpperCase() + String(value).slice(1);
}

function formatSetLabel(value, selection = currentSelection) {
  const normalizedSelection = sanitizeSelection({ ...sanitizeSelection(selection), set: value });
  return getSetConfig(normalizedSelection).label;
}

function formatDeckSummary(selection = currentSelection) {
  const normalizedSelection = sanitizeSelection(selection);
  const deckConfig = getDeckConfig(normalizedSelection);
  return `${deckConfig.languageLabel} ${deckConfig.deckLabel} ${formatSetLabel(normalizedSelection.set, normalizedSelection)}`;
}

function getDefaultDeckCards(selection = currentSelection) {
  return getSetConfig(selection).cards;
}

function getSetConfig(selection = currentSelection) {
  const normalizedSelection = sanitizeSelection(selection);
  const deckConfig = getDeckConfig(normalizedSelection);
  const setIds = Object.keys(deckConfig.sets ?? {});
  const setId = deckConfig.sets?.[normalizedSelection.set] ? normalizedSelection.set : setIds[0];
  return deckConfig.sets?.[setId] ?? { label: formatSelectionLabel(setId), meta: "", description: "", cards: [] };
}

function renderSelectionOptions(selection) {
  selectionElements.languageOptions.innerHTML = "";
  selectionElements.deckOptions.innerHTML = "";

  DECK_ORDER.forEach((deckKey) => {
    const config = DECK_CONFIGS[deckKey];
    selectionElements.languageOptions.appendChild(createSelectionOptionButton({
      group: "language",
      value: config.language,
      label: config.languageLabel,
      meta: config.selectionMeta,
      isSelected: selection.language === config.language
    }));
  });

  Object.entries(getDeckConfig(selection).sets).forEach(([setId, setConfig]) => {
    selectionElements.deckOptions.appendChild(createSelectionOptionButton({
      group: "set",
      value: setId,
      label: setConfig.label,
      meta: setConfig.meta,
      isSelected: selection.set === setId
    }));
  });
}

function createSelectionOptionButton({ group, value, label, meta, isSelected }) {
  const button = document.createElement("button");
  const labelElement = document.createElement("span");
  const metaElement = document.createElement("span");

  button.type = "button";
  button.className = "option-card";
  button.dataset.selectionGroup = group;
  button.dataset.value = value;
  button.classList.toggle("is-selected", isSelected);
  button.setAttribute("aria-pressed", String(isSelected));
  labelElement.className = "option-card-label";
  metaElement.className = "option-card-meta";
  labelElement.textContent = label;
  metaElement.textContent = meta;
  button.append(labelElement, metaElement);
  button.addEventListener("click", () => updateSelectionSummary(getSelectionForChoice(group, value)));
  return button;
}

function buildImportCopy(deckConfig = currentDeckConfig) {
  const headers = getRequiredImportHeaders(deckConfig)
    .map((header) => `<code>${header}</code>`)
    .join(", ");

  return `Use the columns ${headers}. Separate multiple accepted answers inside the <code>meanings</code> cell with <code>|</code>.`;
}

function renderHowItWorks(steps) {
  elements.howItWorksList.innerHTML = "";

  steps.forEach((step) => {
    const item = document.createElement("li");
    item.textContent = step;
    elements.howItWorksList.appendChild(item);
  });
}

function renderEditorHelp() {
  editorElements.editorHelpList.innerHTML = "";

  currentDeckConfig.editorHelp.forEach((line) => {
    const item = document.createElement("li");
    item.textContent = line;
    editorElements.editorHelpList.appendChild(item);
  });
}

function renderEditorCards() {
  editorElements.editorCards.innerHTML = "";
  editorElements.editorCardCount.textContent = String(editorCardsState.length);
  let visibleCount = 0;

  editorCardsState.forEach((card, index) => {
    const fragment = editorElements.editorCardTemplate.content.cloneNode(true);
    const cardElement = fragment.querySelector(".editor-card");
    const title = fragment.querySelector(".editor-card-title");
    const removeButton = fragment.querySelector(".editor-remove-button");
    const frontInput = fragment.querySelector('[data-editor-field="front"]');
    const meaningsInput = fragment.querySelector('[data-editor-field="meanings"]');
    const readingsField = fragment.querySelector("[data-editor-readings-field]");
    const readingsInput = fragment.querySelector('[data-editor-field="readings"]');
    const frontLabel = fragment.querySelector('[data-editor-label="front"]');
    const readingsLabel = fragment.querySelector('[data-editor-label="readings"]');
    const example1SourceLabel = fragment.querySelector('[data-editor-label="example1-jp"]');
    const example1TranslationLabel = fragment.querySelector('[data-editor-label="example1-en"]');
    const example2SourceLabel = fragment.querySelector('[data-editor-label="example2-jp"]');
    const example2TranslationLabel = fragment.querySelector('[data-editor-label="example2-en"]');
    const example1SourceInput = fragment.querySelector('[data-editor-field="example1-jp"]');
    const example1TranslationInput = fragment.querySelector('[data-editor-field="example1-en"]');
    const example2SourceInput = fragment.querySelector('[data-editor-field="example2-jp"]');
    const example2TranslationInput = fragment.querySelector('[data-editor-field="example2-en"]');

    title.textContent = getCardFront(card) || `Card ${index + 1}`;
    frontLabel.textContent = currentDeckConfig.editorFrontLabel;
    readingsLabel.textContent = currentDeckConfig.editorReadingsLabel;
    example1SourceLabel.textContent = `${currentDeckConfig.editorExampleSourceLabel} 1`;
    example1TranslationLabel.textContent = `${currentDeckConfig.editorExampleTranslationLabel} 1`;
    example2SourceLabel.textContent = `${currentDeckConfig.editorExampleSourceLabel} 2`;
    example2TranslationLabel.textContent = `${currentDeckConfig.editorExampleTranslationLabel} 2`;

    frontInput.value = getCardFront(card);
    frontInput.placeholder = currentDeckConfig.editorFrontLabel;
    meaningsInput.value = card.meanings.join(" | ");
    readingsInput.value = card.readings || "";
    readingsField.classList.toggle("hidden", !currentDeckConfig.supportsReadings);

    example1SourceInput.value = card.examples?.[0]?.jp ?? "";
    example1TranslationInput.value = card.examples?.[0]?.en ?? "";
    example2SourceInput.value = card.examples?.[1]?.jp ?? "";
    example2TranslationInput.value = card.examples?.[1]?.en ?? "";

    const searchBlob = [
      getCardFront(card),
      card.meanings.join(" "),
      card.readings || "",
      card.examples?.[0]?.jp ?? "",
      card.examples?.[0]?.en ?? "",
      card.examples?.[1]?.jp ?? "",
      card.examples?.[1]?.en ?? ""
    ].join(" ").toLowerCase();
    const isMatch = !editorSearchTerm || searchBlob.includes(editorSearchTerm);
    cardElement.classList.toggle("hidden", !isMatch);

    if (isMatch) {
      visibleCount += 1;
    }

    removeButton.addEventListener("click", () => {
      editorCardsState.splice(index, 1);
      renderEditorCards();
    });

    cardElement.dataset.editorIndex = String(index);
    editorElements.editorCards.appendChild(fragment);
  });

  const isDeckEmpty = editorCardsState.length === 0;
  const hasMatches = visibleCount > 0;
  editorElements.editorEmptyState.classList.toggle("hidden", !isDeckEmpty && hasMatches);

  if (isDeckEmpty) {
    editorElements.editorEmptyTitle.textContent = "No cards in this set yet.";
    editorElements.editorEmptyCopy.textContent = "Add a card to start building the vocabulary set.";
    return;
  }

  if (!hasMatches) {
    editorElements.editorEmptyTitle.textContent = "No cards match this search.";
    editorElements.editorEmptyCopy.textContent = "Try a different search term or clear the filter.";
  }
}

function collectEditorCards() {
  const cards = [...editorElements.editorCards.querySelectorAll(".editor-card")].map((cardElement, index) => {
    const frontValue = cardElement.querySelector('[data-editor-field="front"]').value.trim();
    const meanings = splitMeanings(cardElement.querySelector('[data-editor-field="meanings"]').value);
    const readings = cardElement.querySelector('[data-editor-field="readings"]').value.trim();
    const examples = sanitizeExamples([
      {
        jp: cardElement.querySelector('[data-editor-field="example1-jp"]').value,
        en: cardElement.querySelector('[data-editor-field="example1-en"]').value
      },
      {
        jp: cardElement.querySelector('[data-editor-field="example2-jp"]').value,
        en: cardElement.querySelector('[data-editor-field="example2-en"]').value
      }
    ]);

    if (!frontValue) {
      throw new Error(`Card ${index + 1} is missing the ${currentDeckConfig.editorFrontLabel.toLowerCase()} field.`);
    }

    if (!meanings.length) {
      throw new Error(`Card ${index + 1} needs at least one accepted answer.`);
    }

    return sanitizeDeckCard({
      [currentDeckConfig.frontKey]: frontValue,
      meanings,
      readings,
      examples
    });
  });

  return cards;
}

function createEmptyEditorCard() {
  return sanitizeDeckCard({
    [currentDeckConfig.frontKey]: ``,
    meanings: [],
    readings: "",
    examples: []
  }) ?? {
    id: "",
    [currentDeckConfig.frontKey]: "",
    meanings: [],
    readings: "",
    examples: []
  };
}

function setEditorFeedback(message, isError = false) {
  editorElements.editorFeedback.textContent = message;
  editorElements.editorFeedback.classList.toggle("is-error", isError);
}

function getDeckPairKey(selection = currentSelection) {
  const normalizedSelection = sanitizeSelection(selection);
  return `${normalizedSelection.language}:${normalizedSelection.deck}`;
}

function getSelectionKey(selection = currentSelection) {
  const normalizedSelection = sanitizeSelection(selection);
  return `${normalizedSelection.language}:${normalizedSelection.deck}:${normalizedSelection.set}`;
}

function getDeckConfig(selection = currentSelection) {
  return DECK_CONFIGS[getDeckPairKey(selection)] ?? DECK_CONFIGS[DEFAULT_DECK_KEY];
}

function isLegacyStarterSelection(selection = currentSelection) {
  const normalizedSelection = sanitizeSelection(selection);
  return getDeckPairKey(normalizedSelection) === DEFAULT_DECK_KEY && normalizedSelection.set === DEFAULT_SELECTION.set;
}

function getStateStorageKey(selection = currentSelection) {
  const selectionKey = getSelectionKey(selection);
  return isLegacyStarterSelection(selection)
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
