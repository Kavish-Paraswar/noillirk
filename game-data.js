export const ROUND_SECONDS = 25;
export const STANDARD_ROUNDS = 7;
export const CLASSIC_ROUNDS = STANDARD_ROUNDS;
export const MAX_ANSWER_LENGTH = 80;
export const RETRY_REASON = "That does not fit this prompt. Try a more specific answer.";
export const MAX_SCORE = 700;
export const START_BALLOONS = 3;

export const PROMPTS = [
  {
    id: "bus-stop",
    text: "Name something people do while waiting for a bus",
    category: "Everyday life",
    board: [
      { answer: "Check their phone", aliases: ["look at phone", "use phone", "scroll phone"], share: 25 },
      { answer: "Look down the road", aliases: ["look for the bus", "watch for bus"], share: 18 },
      { answer: "Listen to music", aliases: ["listen to songs", "wear headphones"], share: 14 },
      { answer: "Talk to someone", aliases: ["chat", "talk"], share: 11 },
      { answer: "Check the time", aliases: ["look at the time", "check watch"], share: 9 },
      { answer: "Read something", aliases: ["read", "read a book"], share: 7 },
      { answer: "Sit down", aliases: ["wait seated"], share: 6 },
      { answer: "Get a snack", aliases: ["eat", "buy food"], share: 5 },
      { answer: "Watch the traffic", aliases: ["look at traffic"], share: 5 }
    ]
  },
  {
    id: "movie-snack",
    text: "Name a snack someone might bring to a movie",
    category: "Food",
    board: [
      { answer: "Popcorn", aliases: ["pop corn"], share: 28 },
      { answer: "Chips", aliases: ["crisps", "potato chips"], share: 19 },
      { answer: "Chocolate", aliases: ["chocolate bar"], share: 14 },
      { answer: "Candy", aliases: ["sweets", "gummies"], share: 11 },
      { answer: "Nachos", aliases: ["tortilla chips"], share: 9 },
      { answer: "Cookies", aliases: ["biscuits"], share: 7 },
      { answer: "Pretzels", aliases: [], share: 5 },
      { answer: "Fruit", aliases: ["apple", "grapes"], share: 4 },
      { answer: "Sandwich", aliases: ["sandwiches"], share: 3 }
    ]
  },
  {
    id: "messy-desk",
    text: "Name something you might find on a messy desk",
    category: "Work and study",
    board: [
      { answer: "Paper", aliases: ["papers", "documents"], share: 24 },
      { answer: "Pens", aliases: ["pen", "pencils", "pencil"], share: 18 },
      { answer: "Coffee cup", aliases: ["mug", "coffee mug"], share: 14 },
      { answer: "Phone", aliases: ["mobile", "cell phone"], share: 11 },
      { answer: "Books", aliases: ["book", "notebook"], share: 9 },
      { answer: "Cables", aliases: ["wires", "chargers"], share: 7 },
      { answer: "Sticky notes", aliases: ["post it notes", "post its"], share: 6 },
      { answer: "Headphones", aliases: ["earphones", "earbuds"], share: 5 },
      { answer: "Snacks", aliases: ["food", "wrappers"], share: 6 }
    ]
  },
  {
    id: "late-reason",
    text: "Name a reason someone might be late",
    category: "Everyday life",
    board: [
      { answer: "Traffic", aliases: ["traffic jam"], share: 27 },
      { answer: "Overslept", aliases: ["woke up late", "sleeping in"], share: 19 },
      { answer: "Missed the bus", aliases: ["missed train", "missed transport"], share: 14 },
      { answer: "Took too long to get ready", aliases: ["getting ready", "got ready late"], share: 11 },
      { answer: "Could not find something", aliases: ["lost keys", "looking for keys"], share: 9 },
      { answer: "Bad weather", aliases: ["rain", "storm"], share: 7 },
      { answer: "Wrong address", aliases: ["got lost", "lost"], share: 5 },
      { answer: "Long queue", aliases: ["line", "waiting in line"], share: 4 },
      { answer: "Phone battery died", aliases: ["dead phone", "battery died"], share: 4 }
    ]
  },
  {
    id: "kitchen-drawer",
    text: "Name something people keep in a kitchen drawer",
    category: "Home",
    board: [
      { answer: "Cutlery", aliases: ["silverware", "forks and spoons"], share: 26 },
      { answer: "Knives", aliases: ["knife"], share: 19 },
      { answer: "Kitchen tools", aliases: ["utensils", "spatula", "peeler"], share: 14 },
      { answer: "Food clips", aliases: ["clips", "bag clips"], share: 11 },
      { answer: "Scissors", aliases: ["scissor"], share: 9 },
      { answer: "Batteries", aliases: ["battery"], share: 7 },
      { answer: "Matches", aliases: ["lighter"], share: 6 },
      { answer: "Rubber bands", aliases: ["elastic bands"], share: 4 },
      { answer: "Takeout menus", aliases: ["menus", "restaurant menus"], share: 4 }
    ]
  },
  {
    id: "short-trip",
    text: "Name something people take on a short trip",
    category: "Travel",
    board: [
      { answer: "Phone", aliases: ["mobile", "cell phone"], share: 24 },
      { answer: "Wallet", aliases: ["purse"], share: 18 },
      { answer: "Clothes", aliases: ["change of clothes", "outfit"], share: 14 },
      { answer: "Toothbrush", aliases: ["toothpaste"], share: 11 },
      { answer: "Charger", aliases: ["phone charger"], share: 9 },
      { answer: "Water bottle", aliases: ["water"], share: 7 },
      { answer: "Headphones", aliases: ["earphones", "earbuds"], share: 6 },
      { answer: "Book", aliases: ["kindle", "magazine"], share: 5 },
      { answer: "Camera", aliases: ["digital camera"], share: 6 }
    ]
  },
  {
    id: "morning-first",
    text: "Name something people often do first after waking up",
    category: "Daily routine",
    board: [
      { answer: "Check their phone", aliases: ["look at phone", "use phone"], share: 25 },
      { answer: "Brush their teeth", aliases: ["brush teeth"], share: 18 },
      { answer: "Use the bathroom", aliases: ["go to bathroom", "toilet"], share: 14 },
      { answer: "Make coffee or tea", aliases: ["make coffee", "make tea"], share: 11 },
      { answer: "Get dressed", aliases: ["change clothes"], share: 9 },
      { answer: "Take a shower", aliases: ["shower"], share: 7 },
      { answer: "Open the curtains", aliases: ["open blinds"], share: 6 },
      { answer: "Stretch", aliases: ["exercise"], share: 5 },
      { answer: "Make the bed", aliases: ["tidy bed"], share: 5 }
    ]
  },
  {
    id: "misplaced-home",
    text: "Name something people often misplace at home",
    category: "Home",
    board: [
      { answer: "Keys", aliases: ["key"], share: 25 },
      { answer: "Phone", aliases: ["mobile", "cell phone"], share: 19 },
      { answer: "Remote control", aliases: ["remote", "tv remote"], share: 14 },
      { answer: "Glasses", aliases: ["spectacles", "eyeglasses"], share: 11 },
      { answer: "Wallet", aliases: ["purse"], share: 9 },
      { answer: "Charger", aliases: ["phone charger"], share: 7 },
      { answer: "Headphones", aliases: ["earphones", "earbuds"], share: 6 },
      { answer: "Socks", aliases: ["sock"], share: 5 },
      { answer: "Water bottle", aliases: ["bottle"], share: 4 }
    ]
  },
  {
    id: "weekend-market",
    text: "Name something people might buy at a weekend market",
    category: "Shopping",
    board: [
      { answer: "Fresh vegetables", aliases: ["vegetables", "veggies"], share: 23 },
      { answer: "Fruit", aliases: ["fruits"], share: 18 },
      { answer: "Clothes", aliases: ["clothing"], share: 14 },
      { answer: "Flowers", aliases: ["flower"], share: 11 },
      { answer: "Snacks", aliases: ["street food", "food"], share: 10 },
      { answer: "Handmade crafts", aliases: ["crafts", "handicrafts"], share: 7 },
      { answer: "Books", aliases: ["book"], share: 6 },
      { answer: "Plants", aliases: ["plant", "saplings"], share: 7 },
      { answer: "Spices", aliases: ["masala"], share: 4 }
    ]
  },
  {
    id: "rainy-afternoon",
    text: "Name something people do on a rainy afternoon",
    category: "Leisure",
    board: [
      { answer: "Watch a movie", aliases: ["watch movies", "watch tv"], share: 24 },
      { answer: "Sleep", aliases: ["take a nap", "nap"], share: 18 },
      { answer: "Read a book", aliases: ["read", "reading"], share: 14 },
      { answer: "Drink something warm", aliases: ["tea", "coffee", "hot chocolate"], share: 11 },
      { answer: "Listen to music", aliases: ["music"], share: 10 },
      { answer: "Cook", aliases: ["bake", "make food"], share: 7 },
      { answer: "Play a game", aliases: ["video games", "gaming"], share: 6 },
      { answer: "Look out the window", aliases: ["watch the rain"], share: 5 },
      { answer: "Clean the house", aliases: ["cleaning"], share: 5 }
    ]
  },
  {
    id: "housewarming-gift",
    text: "Name a gift someone might bring to a housewarming",
    category: "Celebrations",
    board: [
      { answer: "A plant", aliases: ["plant", "potted plant"], share: 23 },
      { answer: "Flowers", aliases: ["flower bouquet", "bouquet"], share: 18 },
      { answer: "Food", aliases: ["dessert", "cake"], share: 14 },
      { answer: "A bottle of wine", aliases: ["wine", "bottle"], share: 11 },
      { answer: "Candles", aliases: ["candle"], share: 10 },
      { answer: "Kitchenware", aliases: ["plates", "mugs", "dishes"], share: 7 },
      { answer: "A photo frame", aliases: ["frame"], share: 6 },
      { answer: "A doormat", aliases: ["mat"], share: 5 },
      { answer: "A gift card", aliases: ["voucher"], share: 6 }
    ]
  }
];

export function normalizeAnswer(value) {
  return String(value ?? "")
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function scoreForRank(rank, total = 9) {
  if (!Number.isInteger(rank) || rank < 1 || rank > total) return 0;
  const middle = (total + 1) / 2;
  const maxDistance = Math.max(1, middle - 1);
  return Math.max(0, Math.round(100 - (Math.abs(rank - middle) / maxDistance) * 80));
}

export function tierForRank(rank, total = 9) {
  if (!Number.isInteger(rank) || rank < 1 || rank > total) return "miss";
  const distance = Math.abs(rank - (total + 1) / 2);
  if (distance === 0) return "skyhigh";
  if (distance <= 1) return "cloud";
  if (distance <= 2) return "kite";
  if (distance <= 3) return "treetop";
  return "grounded";
}

export function findAnswer(prompt, rawAnswer) {
  const answer = normalizeAnswer(rawAnswer);
  if (!answer || answer.length > MAX_ANSWER_LENGTH) return null;
  for (let index = 0; index < prompt.board.length; index += 1) {
    const item = prompt.board[index];
    const choices = [item.answer, ...(item.aliases ?? [])];
    if (choices.some(choice => normalizeAnswer(choice) === answer)) {
      const rank = index + 1;
      return { ...item, rank, score: scoreForRank(rank, prompt.board.length), tier: tierForRank(rank, prompt.board.length) };
    }
  }
  return null;
}

export function publicBoard(prompt) {
  return prompt.board.map((item, index) => {
    const rank = index + 1;
    const points = scoreForRank(rank, prompt.board.length);
    return { answer: item.answer, share: item.share, rank, points, score: points, tier: tierForRank(rank, prompt.board.length) };
  });
}


export function findPrompt(id) {
  const prompt = PROMPTS.find(item => item.id === id);
  if (!prompt) return null;
  return {
    ...prompt,
    cat: prompt.category.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")
  };
}

export function scoreAnswer(prompt, rawAnswer, options = {}) {
  const answer = String(rawAnswer ?? "").trim();
  if (!answer || answer.length > MAX_ANSWER_LENGTH) {
    return { accepted: false, answer, tier: "miss", points: 0, reason: "Please enter one specific answer.", retryable: true };
  }
  const match = findAnswer(prompt, answer);
  if (match) {
    return { accepted: true, answer: match.answer, rank: match.rank, tier: match.tier, points: match.score,
      reason: match.tier === "skyhigh" ? "Exactly in the middle. Perfect score." : "Your answer has a place in the distribution." };
  }
  if (options.allowUnknown) {
    return { accepted: true, answer, rank: null, tier: "grounded", points: 20,
      reason: "A relevant answer outside the sample board receives the lowest score." };
  }
  return { accepted: false, answer, tier: "miss", points: 0, reason: RETRY_REASON, retryable: true };
}

function editDistance(a, b, limit = Infinity) {
  if (Math.abs(a.length - b.length) > limit) return limit + 1;
  let row = Array.from({ length: b.length + 1 }, (_, i) => i);
  for (let i = 1; i <= a.length; i += 1) {
    const next = [i];
    for (let j = 1; j <= b.length; j += 1) next[j] = Math.min(next[j - 1] + 1, row[j] + 1, row[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
    if (Math.min(...next) > limit) return limit + 1;
    row = next;
  }
  return row[b.length];
}

export function findCorrection(prompt, rawAnswer) {
  const key = normalizeAnswer(rawAnswer);
  if (key.length < 4 || key.length > MAX_ANSWER_LENGTH) return null;
  const entries = prompt.board.flatMap(item => [item.answer, ...(item.aliases ?? [])].map(word => ({ answer: item.answer, key: normalizeAnswer(word) })));
  const allowance = key.length < 7 ? 1 : 2;
  const bestByAnswer = new Map();
  for (const entry of entries) {
    const distance = editDistance(key, entry.key, allowance);
    if (distance <= allowance && (!bestByAnswer.has(entry.answer) || distance < bestByAnswer.get(entry.answer).distance)) {
      bestByAnswer.set(entry.answer, { answer: entry.answer, distance });
    }
  }
  const candidates = [...bestByAnswer.values()].sort((a, b) => a.distance - b.distance);
  if (!candidates.length || (candidates[1] && candidates[0].distance === candidates[1].distance)) return null;
  return candidates[0].answer;
}

export function boardForPrompt(prompt) {
  return publicBoard(prompt);
}
