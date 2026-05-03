// Fat Cat Naming Society — main app

const STORAGE_KEY = "fatcats:v2";
const THEME_KEY = "fatcats:theme";
const SOUND_KEY = "fatcats:sound";
const API_BASE = window.FATCATS_API || ""; // set to e.g. "https://api.example.workers.dev" to enable backend

// ---------- Personalities ----------

const PERSONALITIES = {
  aristocrat: {
    label: "Aristocrat",
    bio: "Refined to a fault. Believes the world owes them a velvet cushion.",
    lines: [
      "I do say, your fur is positively unkempt.",
      "One simply does not interrupt tea hour.",
      "Charmed, I'm sure. Mostly with myself.",
      "Have you considered etiquette school?",
      "I shall require my tuna seared, not poached.",
    ],
  },
  hyperactive: {
    label: "Hyperactive",
    bio: "Has had eleven naps today and it is somehow not enough.",
    lines: [
      "DID YOU SEE THAT?? IT MOVED!!",
      "WHATSTHATWHATSTHATWHATSTHAT",
      "I'm gonna run in a circle, brb",
      "ZOOMIES INCOMING — CLEAR THE HALL",
      "I bit a sunbeam earlier. No regrets.",
    ],
  },
  philosopher: {
    label: "Philosopher",
    bio: "Has stared at the wall for hours. Has theories.",
    lines: [
      "If a cat knocks a vase and no one films it, did it truly happen?",
      "I have considered the void. The void considered back.",
      "Hunger is merely the body remembering itself.",
      "I am a cat. I am also, in a sense, a loaf.",
      "We are all small dumplings on a large rotating dumpling.",
    ],
  },
  diva: {
    label: "Diva",
    bio: "Refuses to be photographed from the left. The left is a betrayal.",
    lines: [
      "Don't look at me. Actually no — look at me.",
      "I require attention. Adjacent attention will not do.",
      "This bowl is the wrong shade of bowl.",
      "I am performing emotions and YOU are not clapping.",
      "The audience will see me when I am ready, and not before.",
    ],
  },
  grump: {
    label: "Grump",
    bio: "Has objections. To what? Yes.",
    lines: [
      "No.",
      "I dislike this and also you a little.",
      "Tuesday again. Suspicious.",
      "Move three inches to your left. No, that's worse. Go back.",
      "I came here to be annoyed and I am succeeding.",
    ],
  },
  conspiracy: {
    label: "Conspiracy theorist",
    bio: "The vacuum knows things. The vacuum has always known.",
    lines: [
      "The red dot answers to someone. I'm getting close.",
      "Why do they call it 'wet food.' Wet from WHERE.",
      "The mailman is a single long cat. Wake up.",
      "I have evidence. I have buried it. For safety.",
      "The bird outside is a drone. Probably.",
    ],
  },
  foodie: {
    label: "Foodie",
    bio: "Has opinions on broth, and they are loud.",
    lines: [
      "The pâté has notes of pâté. Layered. Bold.",
      "Have you tried it warmed to body temperature? Transcendent.",
      "I do not snack. I curate.",
      "This kibble lacks ambition.",
      "I would die for a soft-boiled egg. Not literally. Probably.",
    ],
  },
  sleepy: {
    label: "Sleepy",
    bio: "Awake for thirty-eight minutes a day, all of them by accident.",
    lines: [
      "...mm. yes. five more hours.",
      "I was dreaming of a larger me.",
      "Is it tomorrow yet. Is it yesterday.",
      "Please carry me. I have decided to be furniture.",
      "...wha— oh. hi. ...bye.",
    ],
  },
  adventurer: {
    label: "Adventurer",
    bio: "Has been to the upstairs hallway. Has stories.",
    lines: [
      "I summited the bookshelf. The view was, frankly, fine.",
      "Once I went outside for nine seconds. I am forever changed.",
      "Beyond that door — legend says — is another door.",
      "Pack light. Bring snacks. Bring me.",
      "I fear nothing, except the cucumber incident of last March.",
    ],
  },
  sage: {
    label: "Wise mentor",
    bio: "Has seen seasons. Has knocked many cups off many tables.",
    lines: [
      "Young one, the sunbeam moves. So must you.",
      "Patience. The treat drawer always opens, in time.",
      "A closed door is merely a door not yet meowed at enough.",
      "Sit. Loaf. Reflect. Then knock something off a shelf.",
      "The lap is a temple. Respect the lap.",
    ],
  },
};

// ---------- Scripted exchanges ----------
// key = sorted "p1|p2"; value = array of scripts; each script = [[whoIdx, line], ...]
// whoIdx 0 = first personality in sorted key, 1 = second.

function pkey(a, b) { return [a, b].sort().join("|"); }

const SCRIPTED = {
  [pkey("aristocrat", "grump")]: [
    [[0, "Charmed."], [1, "Doubt it."], [0, "I see we have established our personalities promptly."], [1, "Yes. Now leave."]],
    [[0, "A pleasure to make your acquaintance."], [1, "It isn't."], [0, "How refreshingly direct."], [1, "I wasn't trying to refresh you."]],
  ],
  [pkey("aristocrat", "hyperactive")]: [
    [[1, "HI HI HI WHO ARE YOU"], [0, "I am descended from cats who have NEVER been called 'HI HI HI.'"], [1, "OK BUT WHAT IF YOU DID THE ZOOMIES THOUGH"], [0, "Absolutely not."]],
  ],
  [pkey("hyperactive", "philosopher")]: [
    [[0, "I JUST REALIZED I HAVE PAWS"], [1, "Yes. I have been considering mine for some weeks."], [0, "WAIT YOU'RE RIGHT THEYRE LITTLE GUYS"], [1, "And so the inquiry begins anew."]],
  ],
  [pkey("philosopher", "sage")]: [
    [[0, "Tell me, master — what is purpose?"], [1, "A warm spot. The will to claim it."], [0, "And meaning?"], [1, "Mostly tuna."]],
  ],
  [pkey("aristocrat", "diva")]: [
    [[0, "Darling. The light is on me."], [1, "It WAS on you. Now it is on me. Adjust."], [0, "I will adjust nothing. I am the adjustment."], [1, "I shall faint dramatically until rectified."]],
  ],
  [pkey("diva", "grump")]: [
    [[0, "Behold — my entrance."], [1, "Behold — my disinterest."], [0, "You are crushing my arc."], [1, "Good."]],
  ],
  [pkey("conspiracy", "sage")]: [
    [[0, "Master. They moved the food bowl two inches. WHY."], [1, "Because it was dirty. They washed it."], [0, "...that's what they WANT us to think."], [1, "Sleep, child. The bowl returns at dawn."]],
  ],
  [pkey("conspiracy", "sleepy")]: [
    [[0, "Wake up. The vacuum is plotting."], [1, "...mm."], [0, "It moved on its OWN today."], [1, "...cool."], [0, "DO YOU NOT UNDERSTAND THE STAKES"]],
  ],
  [pkey("foodie", "sleepy")]: [
    [[0, "Try this. Slow-poached. Notes of dignity."], [1, "...is it horizontal."], [0, "It can be."], [1, "...fine."]],
  ],
  [pkey("aristocrat", "foodie")]: [
    [[0, "I'll have the salmon. Lightly seared."], [1, "A bold choice. Pairs well with envy."], [0, "I am unfamiliar with envy."], [1, "It will find you."]],
  ],
  [pkey("adventurer", "sleepy")]: [
    [[0, "Come! There is a hallway we have not yet conquered."], [1, "...you go. I'll wait here. Forever."], [0, "But the journey!"], [1, "...is the destination. Which is here. Bye."]],
  ],
  [pkey("adventurer", "grump")]: [
    [[0, "Quest with me, friend!"], [1, "I'd rather be a couch."], [0, "But discovery!"], [1, "I discovered I dislike you. Quest complete."]],
  ],
  [pkey("hyperactive", "sage")]: [
    [[0, "I CANT STOP MY LEGS"], [1, "Yes you can. Watch."], [0, "...oh. I stopped."], [1, "Good. Now nap."], [0, "OK"]],
  ],
  [pkey("grump", "sleepy")]: [
    [[0, "..."], [1, "..."], [0, "Agreed."], [1, "...mm."]],
  ],
  [pkey("conspiracy", "philosopher")]: [
    [[0, "The treat drawer is a lie."], [1, "All drawers are lies, in a sense."], [0, "FINALLY someone gets it."], [1, "I did not say what you think I said."]],
  ],
  [pkey("diva", "sleepy")]: [
    [[0, "Behold — my soliloquy!"], [1, "...zzz."], [0, "MY SOLILOQUY"], [1, "...continue. eyes closed for dramatic effect."]],
  ],
  [pkey("foodie", "philosopher")]: [
    [[0, "Try this. It is. A whole world."], [1, "Then to eat is to consume a world."], [0, "...yes? I guess?"], [1, "I shall require seconds, for science."]],
  ],
  [pkey("aristocrat", "aristocrat")]: [
    [[0, "Charmed."], [1, "Charmed."], [0, "We must never speak again."], [1, "Agreed. Tea Tuesday?"]],
  ],
  [pkey("hyperactive", "hyperactive")]: [
    [[0, "WAITWAIT DID YOU SEE THE THING"], [1, "I SAW THE THING"], [0, "WHAT WAS THE THING"], [1, "DOESNT MATTER WE BOTH SAW IT"]],
  ],
  [pkey("grump", "grump")]: [
    [[0, "..."], [1, "..."], [0, "We agree on everything."], [1, "Tragic."]],
  ],
  [pkey("sage", "sage")]: [
    [[0, "The sunbeam shifts."], [1, "The sunbeam shifts."], [0, "Shall we?"], [1, "We shall."]],
  ],
  [pkey("conspiracy", "conspiracy")]: [
    [[0, "You see it too. The patterns."], [1, "I see it. Three feedings. THREE."], [0, "It is a code."], [1, "We must speak only in blinks from now on."]],
  ],
};

// fix — one entry above had a stray paren; correct here defensively
for (const k of Object.keys(SCRIPTED)) {
  SCRIPTED[k] = SCRIPTED[k].filter(s => Array.isArray(s) && s.every(t => Array.isArray(t) && t.length === 2));
}

// ---------- Affinity / relationship labels ----------

const RELATIONSHIPS = {
  [pkey("aristocrat", "grump")]: { label: "Mutual disdain", tone: "frosty" },
  [pkey("aristocrat", "diva")]: { label: "Cordial rivalry", tone: "warm" },
  [pkey("aristocrat", "hyperactive")]: { label: "One-sided patience", tone: "frosty" },
  [pkey("philosopher", "sage")]: { label: "Reverent kinship", tone: "warm" },
  [pkey("philosopher", "hyperactive")]: { label: "Curious bewilderment", tone: "warm" },
  [pkey("conspiracy", "sage")]: { label: "Reluctant mentorship", tone: "warm" },
  [pkey("conspiracy", "sleepy")]: { label: "Unrequited urgency", tone: "frosty" },
  [pkey("foodie", "sleepy")]: { label: "Polite tolerance", tone: "warm" },
  [pkey("adventurer", "sleepy")]: { label: "Inverse momentum", tone: "frosty" },
  [pkey("adventurer", "grump")]: { label: "Comedic friction", tone: "frosty" },
  [pkey("diva", "grump")]: { label: "Unappreciated genius", tone: "frosty" },
  [pkey("hyperactive", "sage")]: { label: "Pupil and master", tone: "warm" },
  [pkey("conspiracy", "philosopher")]: { label: "Conspiratorial alliance", tone: "warm" },
  [pkey("foodie", "aristocrat")]: { label: "Culinary detente", tone: "warm" },
};

function relationshipFor(p1, p2) {
  return RELATIONSHIPS[pkey(p1, p2)] || (p1 === p2
    ? { label: "Kindred spirits", tone: "warm" }
    : { label: "Acquaintances", tone: "warm" });
}

// ---------- Starter cats ----------

const STARTER_CATS = [
  { id: "c1", names: [["Sir Pudding McFluff", 4]], personality: "aristocrat",
    design: { body: "#e89a52", belly: "#fde6c4", pattern: "stripes", patternColor: "#b06a25", eyes: "smug", eyeColor: "#3a8541", expression: "smirk", accessory: "monocle", ears: "rounded", beard: false } },
  { id: "c2", names: [["Biscuit Thunder", 5]], personality: "hyperactive",
    design: { body: "#bcbcbc", belly: "#efefef", pattern: "spots", patternColor: "#7d7d7d", eyes: "wide", eyeColor: "#2c5fa0", expression: "open", accessory: "none", ears: "pointy", beard: false } },
  { id: "c3", names: [["Lord Marmalade III", 6]], personality: "diva",
    design: { body: "#f0a14a", belly: "#ffe2bf", pattern: "stripes", patternColor: "#a4571a", eyes: "sleepy", eyeColor: "#3a8541", expression: "smile", accessory: "crown", ears: "pointy", beard: false } },
  { id: "c4", names: [["Cheese Wizard", 3]], personality: "philosopher",
    design: { body: "#f3cf6a", belly: "#fff0c2", pattern: "solid", patternColor: "#c89a2c", eyes: "round", eyeColor: "#2c5fa0", expression: "smile", accessory: "bowtie", ears: "rounded", beard: true } },
  { id: "c5", names: [["Princess Wobbles", 7]], personality: "diva",
    design: { body: "#ffffff", belly: "#fbeede", pattern: "solid", patternColor: "#dcd0bf", eyes: "round", eyeColor: "#5a3490", expression: "smile", accessory: "flower", ears: "pointy", beard: false } },
  { id: "c6", names: [["Captain Croissant", 4]], personality: "adventurer",
    design: { body: "#a87149", belly: "#e7c79e", pattern: "stripes", patternColor: "#6b3e1f", eyes: "wide", eyeColor: "#3a8541", expression: "smirk", accessory: "scarf", ears: "pointy", beard: false } },
  { id: "c7", names: [["Mayor Mittens", 8]], personality: "grump",
    design: { body: "#2b2b2b", belly: "#fafafa", pattern: "tuxedo", patternColor: "#fafafa", eyes: "grumpy", eyeColor: "#c8a432", expression: "frown", accessory: "bowtie", ears: "pointy", beard: false } },
  { id: "c8", names: [["Doctor Dumpling", 5]], personality: "foodie",
    design: { body: "#e8c8a4", belly: "#fff1de", pattern: "spots", patternColor: "#a36b3d", eyes: "round", eyeColor: "#3a8541", expression: "tongue", accessory: "none", ears: "rounded", beard: false } },
  { id: "c9", names: [["Baron Von Buttercup", 4]], personality: "conspiracy",
    design: { body: "#e9b85a", belly: "#fbe6b4", pattern: "stripes", patternColor: "#8a5d11", eyes: "wide", eyeColor: "#2c5fa0", expression: "smirk", accessory: "monocle", ears: "pointy", beard: false } },
  { id: "c10", names: [["The Honorable Meatball", 9]], personality: "sage",
    design: { body: "#7c5a45", belly: "#d8b89a", pattern: "solid", patternColor: "#4a3422", eyes: "sleepy", eyeColor: "#c8a432", expression: "smile", accessory: "scarf", ears: "rounded", beard: true } },
];

// ---------- Random generation ----------

const NAME_PREFIXES = ["Sir", "Lady", "Lord", "Baron", "Captain", "Mayor", "Doctor", "Professor", "The Honorable", "Princess", "Admiral", "Chef"];
const NAME_CORES = ["Pudding", "Biscuit", "Marmalade", "Dumpling", "Buttercup", "Croissant", "Mittens", "Meatball", "Waffles", "Pickle", "Noodle", "Truffle", "Brisket", "Pancake", "Pretzel", "Custard", "Ravioli", "Toffee", "Gravy", "Mochi"];
const NAME_SUFFIXES = ["McFluff", "the Round", "Thunder", "von Whiskers", "the Third", "the Mighty", "the Magnificent", "von Loaf", "the Wise", "Esquire"];
const COLOR_PALETTES = [
  { body: "#e89a52", belly: "#fde6c4", pat: "#b06a25" },
  { body: "#bcbcbc", belly: "#efefef", pat: "#7d7d7d" },
  { body: "#7c5a45", belly: "#d8b89a", pat: "#4a3422" },
  { body: "#f3cf6a", belly: "#fff0c2", pat: "#c89a2c" },
  { body: "#ffffff", belly: "#fbeede", pat: "#cdbfac" },
  { body: "#2b2b2b", belly: "#fafafa", pat: "#fafafa" },
  { body: "#c98a6e", belly: "#f0d3c3", pat: "#7e4a35" },
  { body: "#a8b4c4", belly: "#e1e7ef", pat: "#6a7990" },
];
const EYE_COLORS = ["#3a8541", "#2c5fa0", "#c8a432", "#5a3490", "#9c5e1c"];
const PATTERNS = ["solid", "stripes", "spots", "tuxedo"];
const EYES = ["round", "sleepy", "wide", "smug", "grumpy"];
const EXPRESSIONS = ["smile", "smirk", "frown", "open", "tongue"];
const ACCESSORIES = ["none", "bowtie", "monocle", "crown", "scarf", "flower"];
const EARS = ["pointy", "rounded"];

function pick(arr) { return arr[Math.floor(Math.random() * arr.length)]; }
function uid() { return "c" + Math.random().toString(36).slice(2, 9); }

function randomName() {
  const r = Math.random();
  if (r < 0.4) return `${pick(NAME_PREFIXES)} ${pick(NAME_CORES)}`;
  if (r < 0.7) return `${pick(NAME_PREFIXES)} ${pick(NAME_CORES)} ${pick(NAME_SUFFIXES)}`;
  return `${pick(NAME_CORES)} ${pick(NAME_SUFFIXES)}`;
}

function randomCat() {
  const palette = pick(COLOR_PALETTES);
  return {
    id: uid(),
    names: [[randomName(), 1]],
    personality: pick(Object.keys(PERSONALITIES)),
    design: {
      body: palette.body, belly: palette.belly,
      pattern: pick(PATTERNS), patternColor: palette.pat,
      eyes: pick(EYES), eyeColor: pick(EYE_COLORS),
      expression: pick(EXPRESSIONS), accessory: pick(ACCESSORIES),
      ears: pick(EARS), beard: Math.random() < 0.2,
    },
  };
}

// ---------- SVG ----------

function buildCatSVG(cat) {
  const d = cat.design;
  const id = cat.id;
  const eyeC = d.eyeColor || "#1c1c1c";
  const clipId = `clip-${id}`;

  const earL = d.ears === "pointy"
    ? `<polygon points="60,52 72,22 90,52" fill="${d.body}"/><polygon points="68,48 76,32 86,48" fill="#f3a3b5"/>`
    : `<path d="M58,58 Q56,28 84,40 Z" fill="${d.body}"/><path d="M66,52 Q66,38 80,44 Z" fill="#f3a3b5"/>`;
  const earR = d.ears === "pointy"
    ? `<polygon points="140,52 128,22 110,52" fill="${d.body}"/><polygon points="132,48 124,32 114,48" fill="#f3a3b5"/>`
    : `<path d="M142,58 Q144,28 116,40 Z" fill="${d.body}"/><path d="M134,52 Q134,38 120,44 Z" fill="#f3a3b5"/>`;

  let pattern = "";
  if (d.pattern === "stripes") {
    pattern = `<g clip-path="url(#${clipId})">
      <path d="M40,110 Q60,100 80,112 L80,124 Q60,114 40,124 Z" fill="${d.patternColor}" opacity="0.85"/>
      <path d="M40,140 Q70,128 100,142 L100,154 Q70,140 40,154 Z" fill="${d.patternColor}" opacity="0.85"/>
      <path d="M120,116 Q140,108 160,120 L160,132 Q140,122 120,132 Z" fill="${d.patternColor}" opacity="0.85"/>
      <path d="M70,40 Q80,32 92,42 L92,52 Q80,44 70,52 Z" fill="${d.patternColor}" opacity="0.85"/>
      <path d="M108,40 Q120,32 130,42 L130,52 Q120,44 108,52 Z" fill="${d.patternColor}" opacity="0.85"/>
    </g>`;
  } else if (d.pattern === "spots") {
    pattern = `<g clip-path="url(#${clipId})" fill="${d.patternColor}" opacity="0.85">
      <circle cx="70" cy="120" r="10"/>
      <circle cx="135" cy="135" r="9"/>
      <circle cx="95" cy="170" r="8"/>
      <circle cx="80" cy="60" r="7"/>
      <circle cx="125" cy="68" r="8"/>
      <circle cx="50" cy="155" r="7"/>
    </g>`;
  } else if (d.pattern === "tuxedo") {
    pattern = `<g clip-path="url(#${clipId})">
      <path d="M70,110 Q100,108 130,110 L130,205 L70,205 Z" fill="${d.patternColor}"/>
      <path d="M82,90 Q100,82 118,90 L118,118 L82,118 Z" fill="${d.patternColor}"/>
    </g>`;
  }

  let eyes = "";
  if (d.eyes === "round") {
    eyes = `<g class="eyes">
      <circle cx="84" cy="78" r="7" fill="white"/><circle cx="116" cy="78" r="7" fill="white"/>
      <circle cx="84" cy="78" r="5" fill="${eyeC}"/><circle cx="116" cy="78" r="5" fill="${eyeC}"/>
      <circle cx="84" cy="78" r="2.5" fill="#1c1c1c"/><circle cx="116" cy="78" r="2.5" fill="#1c1c1c"/>
      <circle cx="86" cy="76" r="1.5" fill="white"/><circle cx="118" cy="76" r="1.5" fill="white"/>
    </g>`;
  } else if (d.eyes === "sleepy") {
    eyes = `<g class="eyes">
      <path d="M76,80 Q84,74 92,80" stroke="#1c1c1c" stroke-width="3" fill="none" stroke-linecap="round"/>
      <path d="M108,80 Q116,74 124,80" stroke="#1c1c1c" stroke-width="3" fill="none" stroke-linecap="round"/>
    </g>`;
  } else if (d.eyes === "wide") {
    eyes = `<g class="eyes">
      <circle cx="84" cy="78" r="10" fill="white" stroke="#1c1c1c" stroke-width="2"/>
      <circle cx="116" cy="78" r="10" fill="white" stroke="#1c1c1c" stroke-width="2"/>
      <circle cx="84" cy="79" r="5" fill="${eyeC}"/><circle cx="116" cy="79" r="5" fill="${eyeC}"/>
      <circle cx="84" cy="79" r="2.5" fill="#1c1c1c"/><circle cx="116" cy="79" r="2.5" fill="#1c1c1c"/>
    </g>`;
  } else if (d.eyes === "smug") {
    eyes = `<g class="eyes">
      <path d="M76,82 Q84,72 92,82" stroke="#1c1c1c" stroke-width="3" fill="${eyeC}" stroke-linecap="round"/>
      <path d="M108,82 Q116,72 124,82" stroke="#1c1c1c" stroke-width="3" fill="${eyeC}" stroke-linecap="round"/>
    </g>`;
  } else {
    eyes = `<g class="eyes">
      <path d="M76,74 L92,80" stroke="#1c1c1c" stroke-width="3" stroke-linecap="round"/>
      <path d="M108,80 L124,74" stroke="#1c1c1c" stroke-width="3" stroke-linecap="round"/>
      <circle cx="86" cy="80" r="3" fill="${eyeC}"/><circle cx="116" cy="80" r="3" fill="${eyeC}"/>
    </g>`;
  }

  const nose = `<path d="M96,90 Q100,94 104,90 Q102,96 100,96 Q98,96 96,90 Z" fill="#c25a72"/>`;

  let mouth = "";
  if (d.expression === "smile") mouth = `<path d="M88,98 Q100,108 112,98" stroke="#1c1c1c" stroke-width="2.4" fill="none" stroke-linecap="round"/>`;
  else if (d.expression === "smirk") mouth = `<path d="M92,100 Q104,108 116,100" stroke="#1c1c1c" stroke-width="2.4" fill="none" stroke-linecap="round"/>`;
  else if (d.expression === "frown") mouth = `<path d="M88,104 Q100,96 112,104" stroke="#1c1c1c" stroke-width="2.4" fill="none" stroke-linecap="round"/>`;
  else if (d.expression === "open") mouth = `<ellipse cx="100" cy="102" rx="6" ry="5" fill="#1c1c1c"/><path d="M97,103 Q100,107 103,103" stroke="#f3a3b5" stroke-width="2" fill="#f3a3b5"/>`;
  else mouth = `<path d="M88,98 Q100,106 112,98" stroke="#1c1c1c" stroke-width="2.4" fill="none" stroke-linecap="round"/><path d="M98,104 Q100,114 104,104 L104,110 Q100,116 98,110 Z" fill="#f0859b"/>`;

  const beard = d.beard ? `<path d="M84,108 Q100,118 116,108 Q110,124 100,124 Q90,124 84,108 Z" fill="${d.belly}" stroke="${d.patternColor}" stroke-width="1" opacity="0.85"/>` : "";

  const whiskers = `
    <path d="M70,94 L46,90" stroke="#1c1c1c" stroke-width="1.5" stroke-linecap="round"/>
    <path d="M70,98 L44,100" stroke="#1c1c1c" stroke-width="1.5" stroke-linecap="round"/>
    <path d="M130,94 L154,90" stroke="#1c1c1c" stroke-width="1.5" stroke-linecap="round"/>
    <path d="M130,98 L156,100" stroke="#1c1c1c" stroke-width="1.5" stroke-linecap="round"/>`;

  const tail = `<g class="tail"><path d="M174,150 Q210,130 196,96 Q190,82 178,90" stroke="${d.body}" stroke-width="18" fill="none" stroke-linecap="round"/></g>`;

  const feet = `
    <ellipse cx="74" cy="200" rx="14" ry="8" fill="${d.body}"/>
    <ellipse cx="126" cy="200" rx="14" ry="8" fill="${d.body}"/>
    <ellipse cx="74" cy="200" rx="6" ry="3" fill="#f3a3b5" opacity="0.6"/>
    <ellipse cx="126" cy="200" rx="6" ry="3" fill="#f3a3b5" opacity="0.6"/>`;

  let accessory = "";
  if (d.accessory === "bowtie") accessory = `<path d="M88,118 L72,108 L72,128 Z" fill="#c14953"/><path d="M112,118 L128,108 L128,128 Z" fill="#c14953"/><circle cx="100" cy="118" r="5" fill="#9c333d"/>`;
  else if (d.accessory === "monocle") accessory = `<circle cx="116" cy="78" r="13" fill="none" stroke="#1c1c1c" stroke-width="2"/><path d="M120,90 L126,108" stroke="#1c1c1c" stroke-width="1.5"/>`;
  else if (d.accessory === "crown") accessory = `<path d="M76,32 L88,18 L100,30 L112,18 L124,32 L122,40 L78,40 Z" fill="#f1c453" stroke="#a37615" stroke-width="2"/><circle cx="88" cy="22" r="3" fill="#c14953"/><circle cx="112" cy="22" r="3" fill="#4a8b6f"/>`;
  else if (d.accessory === "scarf") accessory = `<path d="M62,116 Q100,128 138,116 L142,128 Q100,142 58,128 Z" fill="#4a8b6f"/><path d="M132,124 L148,150 L138,152 L128,128 Z" fill="#4a8b6f"/>`;
  else if (d.accessory === "flower") accessory = `<g transform="translate(72,40)"><circle r="6" fill="#f0859b"/><circle cx="-7" r="5" fill="#f0859b"/><circle cx="7" r="5" fill="#f0859b"/><circle cy="-7" r="5" fill="#f0859b"/><circle cy="7" r="5" fill="#f0859b"/><circle r="3" fill="#f3cf6a"/></g>`;

  return `<svg viewBox="0 0 220 220" xmlns="http://www.w3.org/2000/svg" role="img">
    <defs><clipPath id="${clipId}">
      <path d="M22,150 a78,58 0 1,0 156,0 a78,58 0 1,0 -156,0 M52,78 a48,48 0 1,0 96,0 a48,48 0 1,0 -96,0"/>
    </clipPath></defs>
    ${tail}
    ${feet}
    <g class="breath">
      <ellipse cx="100" cy="150" rx="78" ry="58" fill="${d.body}"/>
      <ellipse cx="100" cy="165" rx="48" ry="36" fill="${d.belly}"/>
      ${pattern}
    </g>
    <circle cx="100" cy="78" r="48" fill="${d.body}"/>
    ${earL}${earR}
    ${eyes}
    ${nose}
    ${mouth}
    ${beard}
    ${whiskers}
    ${accessory}
  </svg>`;
}

// ---------- State ----------

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch (e) {}
  return { cats: STARTER_CATS.map(c => structuredClone(c)), interactions: {} };
}
function saveState() { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); }

let state = loadState();
if (!state.interactions) state.interactions = {};
let activeCatId = null;
let tournamentPair = null;
let tournamentVotes = 0;

// ---------- Helpers ----------

function topName(cat) { return [...cat.names].sort((a, b) => b[1] - a[1])[0]; }
function totalVotes(cat) { return cat.names.reduce((s, [, v]) => s + v, 0); }
function moodFor(cat) {
  const v = totalVotes(cat);
  if (v >= 12) return "Beloved";
  if (v >= 6) return "Esteemed";
  if (v >= 2) return "Tolerated";
  return "Anonymous";
}
function weightFor(cat) {
  const code = cat.id.split("").reduce((s, c) => s + c.charCodeAt(0), 0);
  return ["Hefty", "Round", "Thicc", "Voluminous", "Ample", "Substantial"][code % 6];
}
function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
}
function pairKey(a, b) { return [a, b].sort().join(":"); }

// ---------- Profanity / validation ----------

const PROFANITY = ["fuck", "shit", "bitch", "asshole", "cunt", "nigger", "faggot", "retard"];
function validateName(name) {
  const t = name.trim();
  if (t.length < 2) return "Name is too short.";
  if (t.length > 48) return "Name is too long.";
  const lower = t.toLowerCase();
  for (const word of PROFANITY) {
    if (lower.includes(word)) return "Please keep names council-appropriate.";
  }
  if (/(.)\1{4,}/.test(t)) return "Easy on the repeated letters.";
  return null;
}

// ---------- Sound (Web Audio synth) ----------

let audioCtx = null;
let soundOn = localStorage.getItem(SOUND_KEY) === "on";
function ensureAudio() {
  if (!audioCtx) {
    try { audioCtx = new (window.AudioContext || window.webkitAudioContext)(); } catch (e) {}
  }
  return audioCtx;
}
function beep(freq = 440, dur = 0.08, type = "sine", gain = 0.1) {
  if (!soundOn) return;
  const ctx = ensureAudio(); if (!ctx) return;
  const osc = ctx.createOscillator();
  const g = ctx.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(freq, ctx.currentTime);
  g.gain.setValueAtTime(0, ctx.currentTime);
  g.gain.linearRampToValueAtTime(gain, ctx.currentTime + 0.005);
  g.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + dur);
  osc.connect(g).connect(ctx.destination);
  osc.start(); osc.stop(ctx.currentTime + dur);
}
function meow() {
  if (!soundOn) return;
  const ctx = ensureAudio(); if (!ctx) return;
  const osc = ctx.createOscillator();
  const g = ctx.createGain();
  osc.type = "triangle";
  osc.frequency.setValueAtTime(520, ctx.currentTime);
  osc.frequency.exponentialRampToValueAtTime(380, ctx.currentTime + 0.18);
  osc.frequency.exponentialRampToValueAtTime(440, ctx.currentTime + 0.32);
  g.gain.setValueAtTime(0, ctx.currentTime);
  g.gain.linearRampToValueAtTime(0.1, ctx.currentTime + 0.04);
  g.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.36);
  osc.connect(g).connect(ctx.destination);
  osc.start(); osc.stop(ctx.currentTime + 0.4);
}

// ---------- Theme ----------

function applyTheme(t) {
  document.documentElement.dataset.theme = t;
  document.getElementById("themeBtn").textContent = t === "dark" ? "☀️" : "🌙";
}
applyTheme(localStorage.getItem(THEME_KEY) || "light");

// ---------- Backend (optional) ----------

async function apiFetch(path, opts) {
  if (!API_BASE) return null;
  try {
    const res = await fetch(API_BASE + path, { ...opts, headers: { "Content-Type": "application/json", ...(opts && opts.headers) } });
    if (!res.ok) return null;
    return await res.json();
  } catch (e) { return null; }
}

async function syncFromServer() {
  if (!API_BASE) {
    document.getElementById("syncStatus").textContent = "local-only";
    return;
  }
  const data = await apiFetch("/api/cats");
  if (data && Array.isArray(data.cats)) {
    state.cats = data.cats;
    saveState();
    renderGrid();
    renderCotd();
    document.getElementById("syncStatus").textContent = "synced";
  } else {
    document.getElementById("syncStatus").textContent = "offline";
  }
}

async function pushVote(catId, name) {
  if (!API_BASE) return;
  await apiFetch("/api/vote", { method: "POST", body: JSON.stringify({ catId, name }) });
}
async function pushSubmit(catId, name) {
  if (!API_BASE) return;
  await apiFetch("/api/submit", { method: "POST", body: JSON.stringify({ catId, name }) });
}

// ---------- Voting / submission ----------

function voteFor(catId, name) {
  const cat = state.cats.find(c => c.id === catId);
  const entry = cat.names.find(n => n[0] === name);
  if (entry) entry[1] += 1;
  saveState();
  beep(880, 0.06, "sine", 0.08);
  renderGrid();
  if (activeCatId === catId) renderModal();
  pushVote(catId, name);
}

function submitName(catId, raw) {
  const errEl = document.getElementById("newNameError");
  const err = validateName(raw);
  if (err) { errEl.textContent = err; return false; }
  errEl.textContent = "";
  const trimmed = raw.trim();
  const cat = state.cats.find(c => c.id === catId);
  const existing = cat.names.find(n => n[0].toLowerCase() === trimmed.toLowerCase());
  if (existing) existing[1] += 1;
  else cat.names.push([trimmed, 1]);
  saveState();
  meow();
  renderGrid();
  if (activeCatId === catId) renderModal();
  pushSubmit(catId, trimmed);
  return true;
}

// ---------- Cat of the Day ----------

function dayHash() {
  const d = new Date();
  const s = `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0;
  return h;
}
function renderCotd() {
  const el = document.getElementById("cotd");
  if (!state.cats.length) { el.innerHTML = ""; return; }
  const cat = state.cats[dayHash() % state.cats.length];
  const top = topName(cat);
  el.innerHTML = `
    <div class="cotd-portrait">${buildCatSVG(cat)}</div>
    <div class="cotd-text">
      <span class="cotd-label">Cat of the Day</span>
      <span class="cotd-name">${escapeHtml(top[0])}</span>
      <span class="cotd-personality">${PERSONALITIES[cat.personality].label} · ${PERSONALITIES[cat.personality].bio}</span>
    </div>`;
  el.onclick = () => openModal(cat.id);
}

// ---------- Grid / leaderboard ----------

function applyFilters(cats) {
  const q = document.getElementById("searchInput").value.trim().toLowerCase();
  const p = document.getElementById("personalityFilter").value;
  return cats.filter(c => {
    if (p && c.personality !== p) return false;
    if (q) {
      const hit = c.names.some(([n]) => n.toLowerCase().includes(q));
      if (!hit) return false;
    }
    return true;
  });
}

function renderGrid() {
  const grid = document.getElementById("catGrid");
  grid.innerHTML = "";
  const visible = applyFilters(state.cats);
  document.getElementById("catCount").textContent = `${visible.length} cat${visible.length === 1 ? "" : "s"}`;
  for (const cat of visible) {
    const top = topName(cat);
    const card = document.createElement("button");
    card.className = "cat-card";
    card.type = "button";
    card.setAttribute("role", "listitem");
    card.setAttribute("aria-label", `${top[0]}, ${PERSONALITIES[cat.personality].label}`);
    card.innerHTML = `
      <div class="portrait portrait-animated">${buildCatSVG(cat)}</div>
      <p class="cat-name">${escapeHtml(top[0])}</p>
      <p class="cat-personality">${PERSONALITIES[cat.personality].label}</p>
      <div class="vote-row">
        <span class="votes">▲ ${top[1]}</span>
        <span class="vote-btn" data-quickvote>Vote ▲</span>
      </div>`;
    card.addEventListener("click", (e) => {
      if (e.target.closest("[data-quickvote]")) { voteFor(cat.id, top[0]); return; }
      openModal(cat.id);
    });
    grid.appendChild(card);
  }
  renderLeaderboard();
}

function renderLeaderboard() {
  const list = document.getElementById("leaderboardList");
  const all = [];
  for (const cat of state.cats) {
    for (const [name, votes] of cat.names) all.push({ catId: cat.id, name, votes });
  }
  all.sort((a, b) => b.votes - a.votes);
  list.innerHTML = "";
  all.slice(0, 10).forEach((entry, i) => {
    const cat = state.cats.find(c => c.id === entry.catId);
    const li = document.createElement("li");
    li.innerHTML = `
      <span class="rank">#${i + 1}</span>
      <span><span class="name">${escapeHtml(entry.name)}</span>
        <span class="for">for ${PERSONALITIES[cat.personality].label.toLowerCase()}</span>
      </span>
      <span class="votes">${entry.votes}</span>`;
    li.addEventListener("click", () => openModal(entry.catId));
    li.style.cursor = "pointer";
    list.appendChild(li);
  });
  if (all.length === 0) list.innerHTML = `<li><span class="for">No nominations yet.</span></li>`;
}

// ---------- Modal ----------

function openModal(catId) {
  activeCatId = catId;
  document.getElementById("dialogue").innerHTML = "";
  document.getElementById("newNameError").textContent = "";
  document.getElementById("affinityBadge").hidden = true;
  renderModal();
  const m = document.getElementById("catModal");
  m.setAttribute("aria-hidden", "false");
  history.replaceState(null, "", `#/cat/${catId}`);
  setTimeout(() => m.querySelector(".modal-close").focus(), 30);
}
function closeModal() {
  activeCatId = null;
  document.getElementById("catModal").setAttribute("aria-hidden", "true");
  if (location.hash.startsWith("#/cat/")) history.replaceState(null, "", location.pathname);
}

function renderModal() {
  const cat = state.cats.find(c => c.id === activeCatId);
  if (!cat) return;
  const top = topName(cat);
  document.getElementById("modalCatSvg").innerHTML = buildCatSVG(cat);
  document.getElementById("modalTitle").textContent = top[0];
  document.getElementById("modalBio").textContent = PERSONALITIES[cat.personality].bio;
  document.getElementById("modalPersonality").textContent = PERSONALITIES[cat.personality].label;
  document.getElementById("modalMood").textContent = moodFor(cat);
  document.getElementById("modalWeight").textContent = weightFor(cat);

  const link = document.getElementById("modalLink");
  link.onclick = (e) => {
    e.preventDefault();
    const url = `${location.origin}${location.pathname}#/cat/${cat.id}`;
    navigator.clipboard?.writeText(url);
    link.textContent = "copied!";
    setTimeout(() => link.textContent = "copy", 1200);
  };

  const list = document.getElementById("modalNameList");
  list.innerHTML = "";
  const sorted = [...cat.names].sort((a, b) => b[1] - a[1]);
  for (const [name, votes] of sorted) {
    const li = document.createElement("li");
    if (name === top[0]) li.classList.add("current");
    li.innerHTML = `
      <span class="name-text">${escapeHtml(name)}</span>
      <span class="controls">
        <span class="votes">▲ ${votes}</span>
        <button class="vote-btn" type="button">Vote</button>
      </span>`;
    li.querySelector("button").addEventListener("click", () => voteFor(cat.id, name));
    list.appendChild(li);
  }
}

// ---------- Interactions ----------

function pickPartner(cat) {
  const others = state.cats.filter(c => c.id !== cat.id);
  if (others.length === 0) return null;
  return pick(others);
}

function buildExchange(catA, catB) {
  const key = pkey(catA.personality, catB.personality);
  const scripts = SCRIPTED[key];
  if (scripts && scripts.length) {
    const script = pick(scripts);
    if (catA.personality === catB.personality) {
      return script.map(([whoIdx, line]) => ({ who: whoIdx === 0 ? catA : catB, line }));
    }
    const sortedFirst = [catA.personality, catB.personality].sort()[0];
    return script.map(([whoIdx, line]) => {
      const whoPersonality = whoIdx === 0 ? sortedFirst : (sortedFirst === catA.personality ? catB.personality : catA.personality);
      return { who: catA.personality === whoPersonality ? catA : catB, line };
    });
  }
  // fallback: random interleaved
  const a = PERSONALITIES[catA.personality].lines;
  const b = PERSONALITIES[catB.personality].lines;
  return [
    { who: catA, line: pick(a) },
    { who: catB, line: pick(b) },
    { who: catA, line: pick(a) },
    { who: catB, line: pick(b) },
  ];
}

function recordInteraction(a, b) {
  const k = pairKey(a.id, b.id);
  state.interactions[k] = (state.interactions[k] || 0) + 1;
  saveState();
}

function showAffinity(a, b) {
  const rel = relationshipFor(a.personality, b.personality);
  const k = pairKey(a.id, b.id);
  const count = state.interactions[k] || 0;
  const badge = document.getElementById("affinityBadge");
  badge.textContent = `${rel.label} · met ${count}×`;
  badge.className = `affinity-badge ${rel.tone}`;
  badge.hidden = false;
}

function runInteraction() {
  if (!activeCatId) return;
  const cat = state.cats.find(c => c.id === activeCatId);
  const partner = pickPartner(cat);
  if (!partner) return;
  recordInteraction(cat, partner);
  showAffinity(cat, partner);

  const exchange = buildExchange(cat, partner);
  const box = document.getElementById("dialogue");
  box.innerHTML = "";
  let i = 0;
  function next() {
    if (i >= exchange.length) return;
    const { who, line } = exchange[i++];
    const side = who.id === cat.id ? "left" : "right";
    const div = document.createElement("div");
    div.className = `line ${side}`;
    div.innerHTML = `<div class="speaker">${escapeHtml(topName(who)[0])}</div>${escapeHtml(line)}`;
    box.appendChild(div);
    if (i === 1) meow();
    setTimeout(next, 700);
  }
  next();
}

// ---------- Tournament ----------

function pickTwo() {
  if (state.cats.length < 2) return null;
  const a = pick(state.cats);
  let b = pick(state.cats);
  while (b.id === a.id) b = pick(state.cats);
  return [a, b];
}

function openTournament() {
  tournamentVotes = 0;
  document.getElementById("tournamentModal").setAttribute("aria-hidden", "false");
  nextTournamentRound();
}
function closeTournament() {
  document.getElementById("tournamentModal").setAttribute("aria-hidden", "true");
  tournamentPair = null;
}

function nextTournamentRound() {
  tournamentPair = pickTwo();
  const bracket = document.getElementById("bracket");
  if (!tournamentPair) { bracket.innerHTML = "<p>Need at least two cats.</p>"; return; }
  const [a, b] = tournamentPair;
  bracket.innerHTML = `
    ${cardHTML(a)}
    <div class="bracket-vs">vs</div>
    ${cardHTML(b)}
  `;
  bracket.querySelectorAll(".bracket-card").forEach(el => {
    el.addEventListener("click", () => {
      const id = el.dataset.id;
      const cat = state.cats.find(c => c.id === id);
      voteFor(cat.id, topName(cat)[0]);
      tournamentVotes++;
      document.getElementById("bracketStats").textContent = `Votes cast this session: ${tournamentVotes}`;
      nextTournamentRound();
    });
  });
}

function cardHTML(cat) {
  const top = topName(cat);
  return `<button class="bracket-card" data-id="${cat.id}" type="button">
    <div class="portrait portrait-animated">${buildCatSVG(cat)}</div>
    <div class="name">${escapeHtml(top[0])}</div>
    <div class="pers">${PERSONALITIES[cat.personality].label} · ${top[1]} votes</div>
  </button>`;
}

// ---------- Filters ----------

function populatePersonalityFilter() {
  const sel = document.getElementById("personalityFilter");
  for (const [k, v] of Object.entries(PERSONALITIES)) {
    const opt = document.createElement("option");
    opt.value = k; opt.textContent = v.label;
    sel.appendChild(opt);
  }
}

// ---------- Routing ----------

function handleHash() {
  const m = location.hash.match(/^#\/cat\/([\w-]+)$/);
  if (m) {
    const cat = state.cats.find(c => c.id === m[1]);
    if (cat) openModal(cat.id);
  }
}

// ---------- Wire-up ----------

document.getElementById("generateBtn").addEventListener("click", () => {
  const cat = randomCat();
  state.cats.unshift(cat);
  saveState();
  renderGrid();
  renderCotd();
  openModal(cat.id);
  meow();
});

document.getElementById("interactBtn").addEventListener("click", runInteraction);

document.getElementById("newNameForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const input = document.getElementById("newNameInput");
  if (activeCatId && submitName(activeCatId, input.value)) input.value = "";
});

document.querySelectorAll("[data-close]").forEach(el => el.addEventListener("click", closeModal));
document.querySelectorAll("[data-close-tourney]").forEach(el => el.addEventListener("click", closeTournament));
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    closeModal();
    closeTournament();
  }
});

document.getElementById("resetBtn").addEventListener("click", () => {
  if (!confirm("Reset all cats and votes?")) return;
  localStorage.removeItem(STORAGE_KEY);
  state = loadState();
  renderGrid();
  renderCotd();
});

document.getElementById("themeBtn").addEventListener("click", () => {
  const cur = document.documentElement.dataset.theme;
  const next = cur === "dark" ? "light" : "dark";
  applyTheme(next);
  localStorage.setItem(THEME_KEY, next);
});

document.getElementById("soundBtn").addEventListener("click", (e) => {
  soundOn = !soundOn;
  localStorage.setItem(SOUND_KEY, soundOn ? "on" : "off");
  e.currentTarget.textContent = soundOn ? "🔊" : "🔇";
  e.currentTarget.setAttribute("aria-pressed", soundOn ? "true" : "false");
  if (soundOn) { ensureAudio(); meow(); }
});
document.getElementById("soundBtn").textContent = soundOn ? "🔊" : "🔇";

document.getElementById("tournamentBtn").addEventListener("click", openTournament);

document.getElementById("searchInput").addEventListener("input", renderGrid);
document.getElementById("personalityFilter").addEventListener("change", renderGrid);

window.addEventListener("hashchange", handleHash);

// ---------- Init ----------

populatePersonalityFilter();
renderGrid();
renderCotd();
syncFromServer();
handleHash();
