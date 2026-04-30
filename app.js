const STORAGE_KEY = "fatcats:v1";

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

const STARTER_CATS = [
  { id: "c1", names: [["Sir Pudding McFluff", 4]], personality: "aristocrat",
    design: { body: "#e89a52", belly: "#fde6c4", pattern: "stripes", patternColor: "#b06a25", eyes: "smug", expression: "smirk", accessory: "monocle", ears: "rounded" } },
  { id: "c2", names: [["Biscuit Thunder", 5]], personality: "hyperactive",
    design: { body: "#bcbcbc", belly: "#efefef", pattern: "spots", patternColor: "#7d7d7d", eyes: "wide", expression: "open", accessory: "none", ears: "pointy" } },
  { id: "c3", names: [["Lord Marmalade III", 6]], personality: "diva",
    design: { body: "#f0a14a", belly: "#ffe2bf", pattern: "stripes", patternColor: "#a4571a", eyes: "sleepy", expression: "smile", accessory: "crown", ears: "pointy" } },
  { id: "c4", names: [["Cheese Wizard", 3]], personality: "philosopher",
    design: { body: "#f3cf6a", belly: "#fff0c2", pattern: "solid", patternColor: "#c89a2c", eyes: "round", expression: "smile", accessory: "bowtie", ears: "rounded" } },
  { id: "c5", names: [["Princess Wobbles", 7]], personality: "diva",
    design: { body: "#ffffff", belly: "#fbeede", pattern: "solid", patternColor: "#dcd0bf", eyes: "round", expression: "smile", accessory: "flower", ears: "pointy" } },
  { id: "c6", names: [["Captain Croissant", 4]], personality: "adventurer",
    design: { body: "#a87149", belly: "#e7c79e", pattern: "stripes", patternColor: "#6b3e1f", eyes: "wide", expression: "smirk", accessory: "scarf", ears: "pointy" } },
  { id: "c7", names: [["Mayor Mittens", 8]], personality: "grump",
    design: { body: "#2b2b2b", belly: "#fafafa", pattern: "tuxedo", patternColor: "#fafafa", eyes: "grumpy", expression: "frown", accessory: "bowtie", ears: "pointy" } },
  { id: "c8", names: [["Doctor Dumpling", 5]], personality: "foodie",
    design: { body: "#e8c8a4", belly: "#fff1de", pattern: "spots", patternColor: "#a36b3d", eyes: "round", expression: "tongue", accessory: "none", ears: "rounded" } },
  { id: "c9", names: [["Baron Von Buttercup", 4]], personality: "conspiracy",
    design: { body: "#e9b85a", belly: "#fbe6b4", pattern: "stripes", patternColor: "#8a5d11", eyes: "wide", expression: "smirk", accessory: "monocle", ears: "pointy" } },
  { id: "c10", names: [["The Honorable Meatball", 9]], personality: "sage",
    design: { body: "#7c5a45", belly: "#d8b89a", pattern: "solid", patternColor: "#4a3422", eyes: "sleepy", expression: "smile", accessory: "scarf", ears: "rounded" } },
];

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
      body: palette.body,
      belly: palette.belly,
      pattern: pick(PATTERNS),
      patternColor: palette.pat,
      eyes: pick(EYES),
      expression: pick(EXPRESSIONS),
      accessory: pick(ACCESSORIES),
      ears: pick(EARS),
    },
  };
}

function buildCatSVG(cat) {
  const d = cat.design;
  const id = cat.id;
  const bodyPath = `<ellipse cx="100" cy="150" rx="78" ry="58" fill="${d.body}"/>`;
  const belly = `<ellipse cx="100" cy="165" rx="48" ry="36" fill="${d.belly}"/>`;
  const head = `<circle cx="100" cy="78" r="48" fill="${d.body}"/>`;

  const earL = d.ears === "pointy"
    ? `<polygon points="60,52 72,22 90,52" fill="${d.body}"/><polygon points="68,48 76,32 86,48" fill="#f3a3b5"/>`
    : `<path d="M58,58 Q56,28 84,40 Z" fill="${d.body}"/><path d="M66,52 Q66,38 80,44 Z" fill="#f3a3b5"/>`;
  const earR = d.ears === "pointy"
    ? `<polygon points="140,52 128,22 110,52" fill="${d.body}"/><polygon points="132,48 124,32 114,48" fill="#f3a3b5"/>`
    : `<path d="M142,58 Q144,28 116,40 Z" fill="${d.body}"/><path d="M134,52 Q134,38 120,44 Z" fill="#f3a3b5"/>`;

  let pattern = "";
  const clipId = `clip-${id}`;
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
    eyes = `<circle cx="84" cy="78" r="6.5" fill="#1c1c1c"/><circle cx="116" cy="78" r="6.5" fill="#1c1c1c"/>
            <circle cx="86" cy="76" r="2" fill="#fff"/><circle cx="118" cy="76" r="2" fill="#fff"/>`;
  } else if (d.eyes === "sleepy") {
    eyes = `<path d="M76,80 Q84,74 92,80" stroke="#1c1c1c" stroke-width="3" fill="none" stroke-linecap="round"/>
            <path d="M108,80 Q116,74 124,80" stroke="#1c1c1c" stroke-width="3" fill="none" stroke-linecap="round"/>`;
  } else if (d.eyes === "wide") {
    eyes = `<circle cx="84" cy="78" r="9" fill="#fff" stroke="#1c1c1c" stroke-width="2"/>
            <circle cx="116" cy="78" r="9" fill="#fff" stroke="#1c1c1c" stroke-width="2"/>
            <circle cx="84" cy="79" r="4" fill="#1c1c1c"/><circle cx="116" cy="79" r="4" fill="#1c1c1c"/>`;
  } else if (d.eyes === "smug") {
    eyes = `<path d="M76,82 Q84,72 92,82" stroke="#1c1c1c" stroke-width="3" fill="${d.body}" stroke-linecap="round"/>
            <path d="M108,82 Q116,72 124,82" stroke="#1c1c1c" stroke-width="3" fill="${d.body}" stroke-linecap="round"/>`;
  } else {
    eyes = `<path d="M76,74 L92,80" stroke="#1c1c1c" stroke-width="3" stroke-linecap="round"/>
            <path d="M108,80 L124,74" stroke="#1c1c1c" stroke-width="3" stroke-linecap="round"/>
            <circle cx="86" cy="80" r="3" fill="#1c1c1c"/><circle cx="116" cy="80" r="3" fill="#1c1c1c"/>`;
  }

  const nose = `<path d="M96,90 Q100,94 104,90 Q102,96 100,96 Q98,96 96,90 Z" fill="#c25a72"/>`;

  let mouth = "";
  if (d.expression === "smile") mouth = `<path d="M88,98 Q100,108 112,98" stroke="#1c1c1c" stroke-width="2.4" fill="none" stroke-linecap="round"/>`;
  else if (d.expression === "smirk") mouth = `<path d="M92,100 Q104,108 116,100" stroke="#1c1c1c" stroke-width="2.4" fill="none" stroke-linecap="round"/>`;
  else if (d.expression === "frown") mouth = `<path d="M88,104 Q100,96 112,104" stroke="#1c1c1c" stroke-width="2.4" fill="none" stroke-linecap="round"/>`;
  else if (d.expression === "open") mouth = `<ellipse cx="100" cy="102" rx="6" ry="5" fill="#1c1c1c"/><path d="M97,103 Q100,107 103,103" stroke="#f3a3b5" stroke-width="2" fill="#f3a3b5"/>`;
  else mouth = `<path d="M88,98 Q100,106 112,98" stroke="#1c1c1c" stroke-width="2.4" fill="none" stroke-linecap="round"/><path d="M98,104 Q100,114 104,104 L104,110 Q100,116 98,110 Z" fill="#f0859b"/>`;

  const whiskers = `
    <path d="M70,94 L46,90" stroke="#1c1c1c" stroke-width="1.5" stroke-linecap="round"/>
    <path d="M70,98 L44,100" stroke="#1c1c1c" stroke-width="1.5" stroke-linecap="round"/>
    <path d="M130,94 L154,90" stroke="#1c1c1c" stroke-width="1.5" stroke-linecap="round"/>
    <path d="M130,98 L156,100" stroke="#1c1c1c" stroke-width="1.5" stroke-linecap="round"/>`;

  const tail = `<path d="M174,150 Q210,130 196,96 Q190,82 178,90" stroke="${d.body}" stroke-width="18" fill="none" stroke-linecap="round"/>`;

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

  return `<svg viewBox="0 0 220 220" xmlns="http://www.w3.org/2000/svg">
    <defs><clipPath id="${clipId}">
      <path d="M22,150 a78,58 0 1,0 156,0 a78,58 0 1,0 -156,0 M52,78 a48,48 0 1,0 96,0 a48,48 0 1,0 -96,0"/>
    </clipPath></defs>
    ${tail}
    ${feet}
    ${bodyPath}
    ${belly}
    ${pattern}
    ${head}
    ${earL}${earR}
    ${eyes}
    ${nose}
    ${mouth}
    ${whiskers}
    ${accessory}
  </svg>`;
}

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch (e) {}
  return { cats: STARTER_CATS.map(c => structuredClone(c)) };
}
function saveState() { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); }

let state = loadState();
let activeCatId = null;

function topName(cat) {
  return [...cat.names].sort((a, b) => b[1] - a[1])[0];
}
function totalVotes(cat) {
  return cat.names.reduce((s, [, v]) => s + v, 0);
}
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

function renderGrid() {
  const grid = document.getElementById("catGrid");
  grid.innerHTML = "";
  for (const cat of state.cats) {
    const top = topName(cat);
    const card = document.createElement("button");
    card.className = "cat-card";
    card.type = "button";
    card.innerHTML = `
      <div class="portrait">${buildCatSVG(cat)}</div>
      <p class="cat-name">${escapeHtml(top[0])}</p>
      <p class="cat-personality">${PERSONALITIES[cat.personality].label}</p>
      <div class="vote-row">
        <span class="votes">▲ ${top[1]}</span>
        <span class="vote-btn" data-quickvote>Vote ▲</span>
      </div>`;
    card.addEventListener("click", (e) => {
      if (e.target.closest("[data-quickvote]")) {
        voteFor(cat.id, top[0]);
        return;
      }
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
    list.appendChild(li);
  });
  if (all.length === 0) list.innerHTML = `<li><span class="for">No nominations yet.</span></li>`;
}

function voteFor(catId, name) {
  const cat = state.cats.find(c => c.id === catId);
  const entry = cat.names.find(n => n[0] === name);
  if (entry) entry[1] += 1;
  saveState();
  renderGrid();
  if (activeCatId === catId) renderModal();
}

function submitName(catId, name) {
  const trimmed = name.trim();
  if (!trimmed) return;
  const cat = state.cats.find(c => c.id === catId);
  const existing = cat.names.find(n => n[0].toLowerCase() === trimmed.toLowerCase());
  if (existing) existing[1] += 1;
  else cat.names.push([trimmed, 1]);
  saveState();
  renderGrid();
  if (activeCatId === catId) renderModal();
}

function openModal(catId) {
  activeCatId = catId;
  document.getElementById("dialogue").innerHTML = "";
  renderModal();
  document.getElementById("catModal").setAttribute("aria-hidden", "false");
}
function closeModal() {
  activeCatId = null;
  document.getElementById("catModal").setAttribute("aria-hidden", "true");
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

function runInteraction() {
  if (!activeCatId) return;
  const cat = state.cats.find(c => c.id === activeCatId);
  const others = state.cats.filter(c => c.id !== cat.id);
  if (others.length === 0) return;
  const partner = pick(others);
  const linesA = PERSONALITIES[cat.personality].lines;
  const linesB = PERSONALITIES[partner.personality].lines;
  const exchange = [
    { who: cat, side: "left", text: pick(linesA) },
    { who: partner, side: "right", text: pick(linesB) },
    { who: cat, side: "left", text: pick(linesA) },
    { who: partner, side: "right", text: pick(linesB) },
  ];
  const box = document.getElementById("dialogue");
  box.innerHTML = "";
  let i = 0;
  function next() {
    if (i >= exchange.length) return;
    const { who, side, text } = exchange[i++];
    const line = document.createElement("div");
    line.className = `line ${side}`;
    line.innerHTML = `<div class="speaker">${escapeHtml(topName(who)[0])}</div>${escapeHtml(text)}`;
    box.appendChild(line);
    setTimeout(next, 650);
  }
  next();
}

function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
}

document.getElementById("generateBtn").addEventListener("click", () => {
  const cat = randomCat();
  state.cats.unshift(cat);
  saveState();
  renderGrid();
  openModal(cat.id);
});

document.getElementById("interactBtn").addEventListener("click", runInteraction);

document.getElementById("newNameForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const input = document.getElementById("newNameInput");
  if (activeCatId) submitName(activeCatId, input.value);
  input.value = "";
});

document.querySelectorAll("[data-close]").forEach(el => el.addEventListener("click", closeModal));
document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeModal(); });

document.getElementById("resetBtn").addEventListener("click", () => {
  if (!confirm("Reset all cats and votes?")) return;
  localStorage.removeItem(STORAGE_KEY);
  state = loadState();
  renderGrid();
});

renderGrid();
