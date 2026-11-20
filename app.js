import { TOPICS, INITIAL_PHRASES, SENTENCE_TEMPLATES, TOPIC_ILLUSTRATIONS } from './data.js';

const STORAGE_KEY = 'ticha_anglictina_v1';

// --- Date Helpers ---
function todayISO() {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

function addDaysISO(days) {
  const d = new Date();
  d.setDate(d.getDate() + days);
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

function daysDiffFromToday(isoDate) {
  const [y1, m1, d1] = todayISO().split('-').map(Number);
  const [y2, m2, d2] = isoDate.split('-').map(Number);
  const t1 = Date.UTC(y1, m1 - 1, d1);
  const t2 = Date.UTC(y2, m2 - 1, d2);
  return Math.round((t2 - t1) / 86400000);
}

function formatCzDays(days) {
  if (days <= 0) return 'dnes';
  if (days === 1) return 'za 1 den';
  if (days >= 2 && days <= 4) return `za ${days} dny`;
  return `za ${days} dní`;
}

function getTopicMeta(topicId) {
  return TOPICS.find((t) => t.id === topicId) || TOPICS[0];
}

// --- UTF-8 Base64 Helpers ---
function encodePack(items) {
  const minimal = items.map((c) => ({
    t: c.topic,
    c: c.cz,
    e: c.en,
    p: c.phonetic || ''
  }));
  const json = JSON.stringify(minimal);
  const bytes = new TextEncoder().encode(json);
  let bin = '';
  bytes.forEach((b) => {
    bin += String.fromCharCode(b);
  });
  const b64 = btoa(bin).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
  return 'TA1:' + b64;
}

function decodePack(rawInput) {
  let code = rawInput.trim();
  if (!code) throw new Error('Prázdný kód');

  // Extract ?pack= if user pasted a full URL
  if (code.includes('pack=')) {
    try {
      const url = new URL(code.startsWith('http') ? code : `https://x.local/?${code.split('?')[1] || code}`);
      const p = url.searchParams.get('pack');
      if (p) code = p.trim();
    } catch {
      const match = code.match(/pack=([^&\s]+)/);
      if (match) code = decodeURIComponent(match[1]);
    }
  }

  if (code.startsWith('TA1:')) {
    code = code.slice(4);
  }
  code = code.replace(/-/g, '+').replace(/_/g, '/');
  while (code.length % 4) code += '=';

  const bin = atob(code);
  const bytes = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) {
    bytes[i] = bin.charCodeAt(i);
  }
  const json = new TextDecoder().decode(bytes);
  const parsed = JSON.parse(json);
  if (!Array.isArray(parsed)) throw new Error('Neplatný formát balíčku');

  return parsed
    .filter((x) => x && (x.e || x.en) && (x.c || x.cz))
    .map((x) => ({
      topic: TOPICS.some((t) => t.id === (x.t || x.topic)) ? (x.t || x.topic) : 'camping',
      cz: String(x.c || x.cz).trim(),
      en: String(x.e || x.en).trim(),
      phonetic: String(x.p || x.phonetic || '').trim()
    }));
}

// --- Storage ---
function createInitialState() {
  const today = todayISO();
  return {
    cards: INITIAL_PHRASES.map((p) => ({
      ...p,
      interval: 0,
      reps: 0,
      dueDate: today
    }))
  };
}

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      const init = createInitialState();
      localStorage.setItem(STORAGE_KEY, JSON.stringify(init));
      return init;
    }
    const parsed = JSON.parse(raw);
    if (!parsed || !Array.isArray(parsed.cards)) {
      const init = createInitialState();
      localStorage.setItem(STORAGE_KEY, JSON.stringify(init));
      return init;
    }
    // Aktualizace fonetického přepisu na čistou češtinu u výchozích frází
    const initMap = new Map(INITIAL_PHRASES.map((p) => [p.id, p.phonetic]));
    let migrated = false;
    parsed.cards.forEach((c) => {
      if (initMap.has(c.id) && c.phonetic !== initMap.get(c.id)) {
        c.phonetic = initMap.get(c.id);
        migrated = true;
      } else if (c.phonetic && /[ðəθ]/.test(c.phonetic)) {
        c.phonetic = c.phonetic.replace(/ðə/g, 'de').replace(/ð/g, 'd').replace(/ə/g, 'e').replace(/θ/g, 's');
        migrated = true;
      }
    });
    if (migrated) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(parsed));
    }
    return parsed;
  } catch {
    return createInitialState();
  }
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  updateDueIndicators();
}

let state = loadState();

// --- Toast ---
let toastTimer = null;
function showToast(msg) {
  const el = document.getElementById('toast');
  el.textContent = msg;
  el.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.remove('show'), 2600);
}

// --- Speech Synthesis (iOS Safari & Chrome safe) ---
let cachedVoices = [];
let activeUtterance = null;
let speakTimer = null;

if ('speechSynthesis' in window) {
  cachedVoices = window.speechSynthesis.getVoices();
  window.speechSynthesis.onvoiceschanged = () => {
    cachedVoices = window.speechSynthesis.getVoices();
  };
}

function speakEnglish(text, btnEl) {
  if (!('speechSynthesis' in window)) {
    showToast('Hlasové čtení není v tomto prohlížeči podporováno.');
    return;
  }
  try {
    const synth = window.speechSynthesis;
    if (synth.speaking || synth.pending) {
      synth.cancel();
    }
    if (synth.paused) {
      synth.resume();
    }

    const utter = new SpeechSynthesisUtterance(text);
    activeUtterance = utter;
    utter.lang = 'en-US';
    utter.rate = 0.9;
    utter.pitch = 1.0;
    utter.volume = 1.0;

    const voices = cachedVoices.length ? cachedVoices : synth.getVoices();
    const enVoice =
      voices.find((v) => v.lang === 'en-US') ||
      voices.find((v) => v.lang === 'en-GB') ||
      voices.find((v) => v.lang && v.lang.toLowerCase().startsWith('en'));
    if (enVoice) utter.voice = enVoice;

    clearTimeout(speakTimer);
    if (btnEl) {
      btnEl.classList.add('speaking');
    }
    const cleanup = () => {
      clearTimeout(speakTimer);
      if (btnEl) btnEl.classList.remove('speaking');
      if (activeUtterance === utter) activeUtterance = null;
    };

    utter.onend = cleanup;
    utter.onerror = () => {
      cleanup();
      showToast('Zkontroluj, zda nemáš na telefonu zapnutý tichý režim.');
    };
    speakTimer = setTimeout(cleanup, 6000);

    synth.speak(utter);
  } catch {
    if (btnEl) btnEl.classList.remove('speaking');
    showToast('Poslech se nepodařilo spustit.');
  }
}

// --- App UI State ---
const ui = {
  activeTab: 'builder',
  builderTopic: 'all',
  builderMode: 'templates',
  tplIndex: 0,
  tplSlots: {}, // { [slotIdx]: optionIdx }
  activeSlotIdx: null,
  puzIndex: 0,
  puzTokens: [],
  puzBank: [], // { id, text, used }
  puzPlaced: [], // { id, text }
  puzSolved: false,
  srsQueue: [],
  srsDoneCount: 0,
  srsInitialTotal: 0,
  srsFlipped: false,
  srsExtraMode: false,
  vocabSubTab: 'list',
  shareSelectedIds: new Set()
};

// --- Navigation ---
function switchTab(tabName) {
  ui.activeTab = tabName;
  document.querySelectorAll('.view').forEach((v) => {
    v.hidden = v.id !== `view-${tabName}`;
  });
  document.querySelectorAll('.nav-item').forEach((btn) => {
    btn.classList.toggle('active', btn.dataset.tab === tabName);
  });

  if (tabName === 'cards') {
    initSrsSession();
  } else if (tabName === 'vocab') {
    renderVocabList();
    renderShareChecklist();
  }
}

document.querySelectorAll('.nav-item').forEach((btn) => {
  btn.addEventListener('click', () => switchTab(btn.dataset.tab));
});

function updateDueIndicators() {
  const today = todayISO();
  const dueCount = state.cards.filter((c) => c.dueDate <= today).length;
  document.getElementById('header-due-count').textContent = String(dueCount);

  const badge = document.getElementById('nav-due-badge');
  if (dueCount > 0) {
    badge.textContent = dueCount > 99 ? '99+' : String(dueCount);
    badge.hidden = false;
  } else {
    badge.hidden = true;
  }
}

// ==========================================
// TAB 1: STAVEBNICE
// ==========================================
function renderBuilderTopics() {
  const container = document.getElementById('builder-topics');
  const allChip = `<button type="button" class="topic-chip ${ui.builderTopic === 'all' ? 'active' : ''}" data-topic="all">✨ Všechna</button>`;
  const topicChips = TOPICS.map(
    (t) =>
      `<button type="button" class="topic-chip ${ui.builderTopic === t.id ? 'active' : ''}" data-topic="${t.id}">${t.icon} ${t.shortLabel}</button>`
  ).join('');
  container.innerHTML = allChip + topicChips;

  container.querySelectorAll('.topic-chip').forEach((chip) => {
    chip.addEventListener('click', () => {
      ui.builderTopic = chip.dataset.topic;
      ui.tplIndex = 0;
      ui.puzIndex = 0;
      ui.tplSlots = {};
      ui.activeSlotIdx = null;
      renderBuilderTopics();
      if (ui.builderMode === 'templates') renderTemplate();
      else setupPuzzle();
    });
  });
}

document.getElementById('btn-mode-templates').addEventListener('click', () => setBuilderMode('templates'));
document.getElementById('btn-mode-puzzle').addEventListener('click', () => setBuilderMode('puzzle'));

function setBuilderMode(mode) {
  ui.builderMode = mode;
  document.getElementById('btn-mode-templates').classList.toggle('active', mode === 'templates');
  document.getElementById('btn-mode-puzzle').classList.toggle('active', mode === 'puzzle');
  document.getElementById('builder-templates-panel').hidden = mode !== 'templates';
  document.getElementById('builder-puzzle-panel').hidden = mode !== 'puzzle';

  if (mode === 'templates') renderTemplate();
  else setupPuzzle();
}

function getFilteredTemplates() {
  if (ui.builderTopic === 'all') return SENTENCE_TEMPLATES;
  return SENTENCE_TEMPLATES.filter((t) => t.topic === ui.builderTopic);
}

function buildTemplateResult(tpl) {
  let en = '';
  let cz = '';
  let phonetic = '';
  let slotCounter = 0;

  tpl.parts.forEach((part) => {
    if (part.type === 'text') {
      en += part.en;
      cz += part.cz;
      phonetic += part.phonetic;
    } else {
      const optIdx = ui.tplSlots[slotCounter] ?? 0;
      const opt = part.options[optIdx] || part.options[0];
      en += opt.en;
      cz += opt.cz;
      phonetic += opt.phonetic;
      slotCounter++;
    }
  });

  return {
    en: en.replace(/\s+([?.!,])/g, '$1').replace(/\s{2,}/g, ' ').trim(),
    cz: cz.replace(/\s+([?.!,])/g, '$1').replace(/\s{2,}/g, ' ').trim(),
    phonetic: `[${phonetic.replace(/\s+([?.!,])/g, '$1').replace(/\s{2,}/g, ' ').trim()}]`
  };
}

function renderTemplate() {
  const list = getFilteredTemplates();
  if (!list.length) return;
  if (ui.tplIndex >= list.length) ui.tplIndex = 0;
  if (ui.tplIndex < 0) ui.tplIndex = list.length - 1;

  const tpl = list[ui.tplIndex];
  const topicMeta = getTopicMeta(tpl.topic);

  document.getElementById('tpl-topic-badge').textContent = `${topicMeta.icon} ${topicMeta.label}`;
  document.getElementById('tpl-counter').textContent = `${ui.tplIndex + 1} / ${list.length}`;
  const tplIll = document.getElementById('tpl-illustration');
  if (tplIll) tplIll.innerHTML = TOPIC_ILLUSTRATIONS[tpl.topic] || TOPIC_ILLUSTRATIONS.camping;

  const enContainer = document.getElementById('tpl-en-container');
  enContainer.innerHTML = '';

  let slotCounter = 0;
  const slotRefs = [];

  tpl.parts.forEach((part) => {
    if (part.type === 'text') {
      enContainer.appendChild(document.createTextNode(part.en));
    } else {
      const currentSlotIdx = slotCounter;
      const optIdx = ui.tplSlots[currentSlotIdx] ?? 0;
      const opt = part.options[optIdx] || part.options[0];

      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = `slot-pill ${ui.activeSlotIdx === currentSlotIdx ? 'selected' : ''}`;
      btn.textContent = `[${opt.en} ▾]`;
      btn.addEventListener('click', () => {
        ui.activeSlotIdx = ui.activeSlotIdx === currentSlotIdx ? null : currentSlotIdx;
        renderTemplate();
      });
      enContainer.appendChild(btn);
      slotRefs.push({ idx: currentSlotIdx, options: part.options, selected: optIdx });
      slotCounter++;
    }
  });

  // Auto-open first slot picker if none selected yet so user sees options immediately
  const picker = document.getElementById('tpl-slot-picker');
  const optionsWrap = document.getElementById('tpl-slot-options');
  const activeSlot = slotRefs.find((s) => s.idx === ui.activeSlotIdx);

  if (activeSlot) {
    picker.hidden = false;
    optionsWrap.innerHTML = '';
    activeSlot.options.forEach((opt, oIdx) => {
      const oBtn = document.createElement('button');
      oBtn.type = 'button';
      oBtn.className = `slot-option-btn ${oIdx === activeSlot.selected ? 'active' : ''}`;
      oBtn.textContent = `${opt.en} (${opt.cz})`;
      oBtn.addEventListener('click', () => {
        ui.tplSlots[activeSlot.idx] = oIdx;
        renderTemplate();
      });
      optionsWrap.appendChild(oBtn);
    });
  } else {
    picker.hidden = true;
  }

  const res = buildTemplateResult(tpl);
  document.getElementById('tpl-cz-text').textContent = res.cz;
  document.getElementById('tpl-phonetic-text').textContent = res.phonetic;
}

document.getElementById('tpl-prev-btn').addEventListener('click', () => {
  ui.tplIndex--;
  ui.tplSlots = {};
  ui.activeSlotIdx = null;
  renderTemplate();
});

document.getElementById('tpl-next-btn').addEventListener('click', () => {
  ui.tplIndex++;
  ui.tplSlots = {};
  ui.activeSlotIdx = null;
  renderTemplate();
});

document.getElementById('tpl-speak-btn').addEventListener('click', (e) => {
  const list = getFilteredTemplates();
  const tpl = list[ui.tplIndex];
  if (!tpl) return;
  const res = buildTemplateResult(tpl);
  speakEnglish(res.en, e.currentTarget);
});

document.getElementById('tpl-save-btn').addEventListener('click', () => {
  const list = getFilteredTemplates();
  const tpl = list[ui.tplIndex];
  if (!tpl) return;
  const res = buildTemplateResult(tpl);

  const exists = state.cards.some((c) => c.en.toLowerCase() === res.en.toLowerCase());
  if (exists) {
    showToast('Tato věta už je v kartičkách uložená.');
    return;
  }

  state.cards.unshift({
    id: 'tpl-' + Date.now() + '-' + Math.random().toString(36).slice(2, 6),
    topic: tpl.topic,
    cz: res.cz,
    en: res.en,
    phonetic: res.phonetic,
    interval: 0,
    reps: 0,
    dueDate: todayISO()
  });
  saveState();
  showToast('Přidáno do kartiček! 🎉');
});

// --- Mode B: Skládačka ---
function getFilteredPuzzlePhrases() {
  if (ui.builderTopic === 'all') return state.cards;
  const filtered = state.cards.filter((c) => c.topic === ui.builderTopic);
  return filtered.length ? filtered : state.cards;
}

function shuffleArray(arr) {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function setupPuzzle() {
  const list = getFilteredPuzzlePhrases();
  if (!list.length) return;
  if (ui.puzIndex >= list.length) ui.puzIndex = 0;

  const phrase = list[ui.puzIndex];
  const topicMeta = getTopicMeta(phrase.topic);

  document.getElementById('puz-topic-badge').textContent = `${topicMeta.icon} ${topicMeta.label}`;
  document.getElementById('puz-counter').textContent = `${ui.puzIndex + 1} / ${list.length}`;
  document.getElementById('puz-cz-text').textContent = phrase.cz;

  const phoneticEl = document.getElementById('puz-phonetic-text');
  phoneticEl.textContent = phrase.phonetic || '';
  phoneticEl.hidden = true;
  document.getElementById('puz-hint-toggle').textContent = 'Ukázat fonetický přepis';

  const tokens = phrase.en.trim().split(/\s+/);
  ui.puzTokens = tokens;
  ui.puzPlaced = [];
  ui.puzSolved = false;
  ui.puzBank = shuffleArray(
    tokens.map((text, idx) => ({ id: `${idx}-${text}`, text, used: false }))
  );

  renderPuzzleBoard();
}

function renderPuzzleBoard() {
  const answerZone = document.getElementById('puz-answer-zone');
  const bankEl = document.getElementById('puz-bank');
  const feedbackEl = document.getElementById('puz-feedback');

  answerZone.classList.toggle('solved', ui.puzSolved);
  answerZone.innerHTML = '';

  if (ui.puzPlaced.length === 0) {
    const ph = document.createElement('span');
    ph.className = 'placeholder-text';
    ph.textContent = 'Klikej na slova níže ve správném pořadí…';
    answerZone.appendChild(ph);
  } else {
    ui.puzPlaced.forEach((item) => {
      const chip = document.createElement('span');
      chip.className = 'word-chip placed';
      chip.textContent = item.text;
      answerZone.appendChild(chip);
    });
  }

  bankEl.innerHTML = '';
  ui.puzBank.forEach((item) => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = `word-chip ${item.used ? 'used' : ''}`;
    btn.textContent = item.text;
    btn.disabled = item.used || ui.puzSolved;
    btn.addEventListener('click', () => handlePuzzleTap(item, btn));
    bankEl.appendChild(btn);
  });

  if (ui.puzSolved) {
    feedbackEl.className = 'puzzle-feedback ok';
    feedbackEl.textContent = '✅ Výborně! Věta je správně.';
  } else if (ui.puzPlaced.length === 0) {
    feedbackEl.className = 'puzzle-feedback';
    feedbackEl.textContent = '';
  }
}

function handlePuzzleTap(item, btnEl) {
  if (ui.puzSolved || item.used) return;
  const expected = ui.puzTokens[ui.puzPlaced.length];
  const feedbackEl = document.getElementById('puz-feedback');

  if (item.text.toLowerCase() === expected.toLowerCase()) {
    item.used = true;
    ui.puzPlaced.push(item);
    if (ui.puzPlaced.length === ui.puzTokens.length) {
      ui.puzSolved = true;
    } else {
      feedbackEl.className = 'puzzle-feedback ok';
      feedbackEl.textContent = '✓ Správně, pokračuj…';
    }
    renderPuzzleBoard();
  } else {
    btnEl.classList.remove('wrong-flash');
    void btnEl.offsetWidth; // trigger reflow for animation
    btnEl.classList.add('wrong-flash');
    feedbackEl.className = 'puzzle-feedback err';
    feedbackEl.textContent = '✕ Tohle slovo sem teď nepatří, zkus jiné.';
  }
}

document.getElementById('puz-hint-toggle').addEventListener('click', () => {
  const el = document.getElementById('puz-phonetic-text');
  const btn = document.getElementById('puz-hint-toggle');
  el.hidden = !el.hidden;
  btn.textContent = el.hidden ? 'Ukázat fonetický přepis' : 'Skrýt fonetický přepis';
});

document.getElementById('puz-reset-btn').addEventListener('click', () => setupPuzzle());

document.getElementById('puz-next-btn').addEventListener('click', () => {
  ui.puzIndex++;
  setupPuzzle();
});

document.getElementById('puz-speak-btn').addEventListener('click', (e) => {
  const list = getFilteredPuzzlePhrases();
  const phrase = list[ui.puzIndex];
  if (phrase) speakEnglish(phrase.en, e.currentTarget);
});

// ==========================================
// TAB 2: KARTIČKY (SRS)
// ==========================================
function initSrsSession(forceExtra = false) {
  const today = todayISO();
  ui.srsExtraMode = forceExtra;
  const due = forceExtra
    ? shuffleArray(state.cards).slice(0, 10)
    : state.cards.filter((c) => c.dueDate <= today);

  ui.srsQueue = due.map((c) => c.id);
  ui.srsDoneCount = 0;
  ui.srsInitialTotal = ui.srsQueue.length;
  ui.srsFlipped = false;
  renderSrsCard();
}

function getNextGoodInterval(card) {
  if (!card.interval || card.interval === 0) return 3;
  if (card.interval === 1) return 4;
  return Math.round(card.interval * 2.2);
}

function renderSrsCard() {
  const remaining = ui.srsQueue.length;
  document.getElementById('srs-remaining').textContent = String(remaining);
  document.getElementById('srs-total-cards').textContent = `Celkem ${state.cards.length} karet`;

  const pct =
    ui.srsInitialTotal > 0
      ? Math.min(100, Math.round((ui.srsDoneCount / ui.srsInitialTotal) * 100))
      : 100;
  document.getElementById('srs-progress-fill').style.width = `${pct}%`;

  const stage = document.getElementById('srs-stage');
  const doneState = document.getElementById('srs-done-state');

  if (remaining === 0) {
    stage.hidden = true;
    doneState.hidden = false;
    return;
  }

  stage.hidden = false;
  doneState.hidden = true;

  const cardId = ui.srsQueue[0];
  const card = state.cards.find((c) => c.id === cardId);
  if (!card) {
    ui.srsQueue.shift();
    renderSrsCard();
    return;
  }

  const topicMeta = getTopicMeta(card.topic);
  const topicText = `${topicMeta.icon} ${topicMeta.shortLabel}`;
  document.getElementById('card-topic-front').textContent = topicText;
  document.getElementById('card-topic-back').textContent = topicText;
  document.getElementById('card-status-badge').textContent =
    card.reps === 0 ? 'Nová' : `Opakování (${card.reps}×)`;

  document.getElementById('card-cz').textContent = card.cz;
  const cardIll = document.getElementById('card-illustration-front');
  if (cardIll) cardIll.innerHTML = TOPIC_ILLUSTRATIONS[card.topic] || TOPIC_ILLUSTRATIONS.camping;
  document.getElementById('card-en').textContent = card.en;
  document.getElementById('card-phonetic').textContent = card.phonetic || '';
  document.getElementById('card-cz-back').textContent = card.cz;

  const nextDays = getNextGoodInterval(card);
  document.getElementById('srs-good-interval').textContent = formatCzDays(nextDays);

  const flashcardEl = document.getElementById('flashcard');
  flashcardEl.classList.toggle('flipped', ui.srsFlipped);
  document.getElementById('srs-reveal-wrap').hidden = ui.srsFlipped;
  document.getElementById('srs-rate-wrap').hidden = !ui.srsFlipped;
}

function flipFlashcard() {
  if (ui.srsFlipped) return;
  ui.srsFlipped = true;
  document.getElementById('flashcard').classList.add('flipped');
  document.getElementById('srs-reveal-wrap').hidden = true;
  document.getElementById('srs-rate-wrap').hidden = false;
}

document.getElementById('flashcard').addEventListener('click', (e) => {
  if (e.target.closest('#card-speak-btn')) return;
  if (!ui.srsFlipped) flipFlashcard();
});

document.getElementById('flashcard').addEventListener('keydown', (e) => {
  if ((e.key === 'Enter' || e.key === ' ') && !ui.srsFlipped) {
    e.preventDefault();
    flipFlashcard();
  }
});

document.getElementById('srs-flip-btn').addEventListener('click', flipFlashcard);

document.getElementById('card-speak-btn').addEventListener('click', (e) => {
  e.stopPropagation();
  const cardId = ui.srsQueue[0];
  const card = state.cards.find((c) => c.id === cardId);
  if (card) speakEnglish(card.en, e.currentTarget);
});

document.querySelectorAll('.srs-btn').forEach((btn) => {
  btn.addEventListener('click', () => {
    const grade = btn.dataset.grade;
    const cardId = ui.srsQueue.shift();
    const card = state.cards.find((c) => c.id === cardId);
    if (!card) return;

    if (grade === 'again') {
      card.reps = 0;
      card.interval = 0;
      card.dueDate = todayISO();
      // Re-insert into today's queue (a few cards later or at the end)
      const insertAt = Math.min(ui.srsQueue.length, 2);
      ui.srsQueue.splice(insertAt, 0, card.id);
    } else if (grade === 'hard') {
      card.reps = Math.max(1, card.reps);
      card.interval = 1;
      card.dueDate = addDaysISO(1);
      ui.srsDoneCount++;
    } else if (grade === 'good') {
      const nextDays = getNextGoodInterval(card);
      card.reps = (card.reps || 0) + 1;
      card.interval = nextDays;
      card.dueDate = addDaysISO(nextDays);
      ui.srsDoneCount++;
    }

    saveState();
    ui.srsFlipped = false;
    renderSrsCard();
  });
});

document.getElementById('srs-practice-extra-btn').addEventListener('click', () => {
  initSrsSession(true);
});

document.getElementById('srs-go-builder-btn').addEventListener('click', () => {
  switchTab('builder');
});

// ==========================================
// TAB 3: SLOVÍČKA A SDÍLENÍ
// ==========================================
document.querySelectorAll('[data-vtab]').forEach((btn) => {
  btn.addEventListener('click', () => {
    ui.vocabSubTab = btn.dataset.vtab;
    document.querySelectorAll('[data-vtab]').forEach((b) =>
      b.classList.toggle('active', b.dataset.vtab === ui.vocabSubTab)
    );
    document.getElementById('vtab-list').hidden = ui.vocabSubTab !== 'list';
    document.getElementById('vtab-add').hidden = ui.vocabSubTab !== 'add';
    document.getElementById('vtab-share').hidden = ui.vocabSubTab !== 'share';
  });
});

function populateTopicSelects() {
  const filterSel = document.getElementById('vocab-topic-filter');
  const addSel = document.getElementById('add-topic');
  const shareSel = document.getElementById('share-topic-select');

  TOPICS.forEach((t) => {
    const opt1 = new Option(`${t.icon} ${t.label}`, t.id);
    const opt2 = new Option(`${t.icon} ${t.label}`, t.id);
    const opt3 = new Option(`${t.icon} ${t.label}`, t.id);
    filterSel.add(opt1);
    addSel.add(opt2);
    shareSel.add(opt3);
  });
}

function renderVocabList() {
  const query = document.getElementById('vocab-search').value.trim().toLowerCase();
  const topicFilter = document.getElementById('vocab-topic-filter').value;

  const filtered = state.cards.filter((c) => {
    if (topicFilter !== 'all' && c.topic !== topicFilter) return false;
    if (!query) return true;
    const topicLabel = getTopicMeta(c.topic).label.toLowerCase();
    return (
      c.cz.toLowerCase().includes(query) ||
      c.en.toLowerCase().includes(query) ||
      (c.phonetic || '').toLowerCase().includes(query) ||
      topicLabel.includes(query)
    );
  });

  document.getElementById('vocab-count-label').textContent = `${filtered.length} z ${state.cards.length} frází`;
  const listEl = document.getElementById('vocab-list');
  listEl.innerHTML = '';

  if (!filtered.length) {
    listEl.innerHTML = '<div class="card muted-text">Žádné fráze neodpovídají hledání.</div>';
    return;
  }

  filtered.forEach((card) => {
    const topicMeta = getTopicMeta(card.topic);
    const diff = daysDiffFromToday(card.dueDate);
    const dueLabel = diff <= 0 ? 'Opakovat dnes' : `Opakování ${formatCzDays(diff)}`;

    const el = document.createElement('article');
    el.className = 'vocab-item';
    el.innerHTML = `
      <div class="vocab-item-top">
        <span class="topic-tag">${topicMeta.icon} ${topicMeta.shortLabel}</span>
        <div class="vocab-item-actions">
          <button type="button" class="mini-btn speak-mini" title="Poslechnout">🔊</button>
          <button type="button" class="mini-btn del" title="Smazat větu">✕</button>
        </div>
      </div>
      <div class="vocab-en"></div>
      <div class="vocab-cz"></div>
      ${card.phonetic ? '<div class="phonetic-text"></div>' : ''}
      <div class="vocab-meta">
        <span>${dueLabel}</span>
        <span>${card.reps || 0}× splněno</span>
      </div>
    `;
    el.querySelector('.vocab-en').textContent = card.en;
    el.querySelector('.vocab-cz').textContent = card.cz;
    if (card.phonetic) {
      el.querySelector('.phonetic-text').textContent = card.phonetic;
    }

    el.querySelector('.speak-mini').addEventListener('click', (e) => {
      speakEnglish(card.en, e.currentTarget);
    });
    el.querySelector('.del').addEventListener('click', () => {
      state.cards = state.cards.filter((c) => c.id !== card.id);
      ui.shareSelectedIds.delete(card.id);
      saveState();
      renderVocabList();
      renderShareChecklist();
      showToast('Věta odstraněna');
    });

    listEl.appendChild(el);
  });
}

document.getElementById('vocab-search').addEventListener('input', renderVocabList);
document.getElementById('vocab-topic-filter').addEventListener('change', renderVocabList);

// Manual Add Form
document.getElementById('add-phrase-form').addEventListener('submit', (e) => {
  e.preventDefault();
  const topic = document.getElementById('add-topic').value;
  const cz = document.getElementById('add-cz').value.trim();
  const en = document.getElementById('add-en').value.trim();
  let phonetic = document.getElementById('add-phonetic').value.trim();

  if (!cz || !en) return;
  if (phonetic && !phonetic.startsWith('[')) phonetic = `[${phonetic}]`;

  state.cards.unshift({
    id: 'usr-' + Date.now() + '-' + Math.random().toString(36).slice(2, 6),
    topic,
    cz,
    en,
    phonetic,
    interval: 0,
    reps: 0,
    dueDate: todayISO()
  });
  saveState();
  e.target.reset();
  showToast('Nová věta uložena do kartiček!');
  renderVocabList();
});

// --- Share Pack ---
function getShareTopicCards() {
  const topic = document.getElementById('share-topic-select').value;
  return topic === 'all' ? state.cards : state.cards.filter((c) => c.topic === topic);
}

function renderShareChecklist() {
  const cards = getShareTopicCards();
  const container = document.getElementById('share-checklist');
  container.innerHTML = '';

  // Initialize selection if empty
  if (ui.shareSelectedIds.size === 0 && cards.length > 0) {
    cards.slice(0, 10).forEach((c) => ui.shareSelectedIds.add(c.id));
  }

  cards.forEach((c) => {
    const label = document.createElement('label');
    label.className = 'share-check-item';
    const cb = document.createElement('input');
    cb.type = 'checkbox';
    cb.checked = ui.shareSelectedIds.has(c.id);
    cb.addEventListener('change', () => {
      if (cb.checked) ui.shareSelectedIds.add(c.id);
      else ui.shareSelectedIds.delete(c.id);
      updateShareOutput();
    });
    const span = document.createElement('span');
    span.textContent = `${c.en} — ${c.cz}`;
    label.appendChild(cb);
    label.appendChild(span);
    container.appendChild(label);
  });

  updateShareOutput();
}

function updateShareOutput() {
  const selected = state.cards.filter((c) => ui.shareSelectedIds.has(c.id));
  document.getElementById('share-selected-count').textContent = `Vybráno: ${selected.length} vět`;
  const out = document.getElementById('share-code-output');
  out.value = selected.length ? encodePack(selected) : '';
}

document.getElementById('share-topic-select').addEventListener('change', () => {
  const cards = getShareTopicCards();
  ui.shareSelectedIds = new Set(cards.map((c) => c.id));
  renderShareChecklist();
});

document.getElementById('share-select-all').addEventListener('click', () => {
  getShareTopicCards().forEach((c) => ui.shareSelectedIds.add(c.id));
  renderShareChecklist();
});

document.getElementById('share-select-none').addEventListener('click', () => {
  ui.shareSelectedIds.clear();
  renderShareChecklist();
});

async function copyText(text, successMsg) {
  if (!text) {
    showToast('Nejdřív vyber alespoň jednu větu.');
    return;
  }
  try {
    await navigator.clipboard.writeText(text);
    showToast(successMsg);
  } catch {
    const ta = document.createElement('textarea');
    ta.value = text;
    document.body.appendChild(ta);
    ta.select();
    document.execCommand('copy');
    ta.remove();
    showToast(successMsg);
  }
}

function getShareUrl() {
  const code = document.getElementById('share-code-output').value;
  if (!code) return '';
  const base = window.location.origin + window.location.pathname;
  return `${base}?pack=${encodeURIComponent(code)}`;
}

document.getElementById('copy-code-btn').addEventListener('click', () => {
  copyText(document.getElementById('share-code-output').value, 'Kód balíčku zkopírován!');
});

document.getElementById('copy-link-btn').addEventListener('click', () => {
  const url = getShareUrl();
  copyText(url, 'Odkaz zkopírován!');
});

document.getElementById('share-whatsapp-btn').addEventListener('click', () => {
  const code = document.getElementById('share-code-output').value;
  if (!code) {
    showToast('Vyber alespoň jednu větu ke sdílení.');
    return;
  }
  const url = getShareUrl();
  const msg = `Posílám ti balíček cestovatelské angličtiny (${ui.shareSelectedIds.size} vět). Otevři odkaz nebo vlož kód do aplikace Tichá Angličtina:\n\n${url}\n\nKód: ${code}`;
  window.open(`https://wa.me/?text=${encodeURIComponent(msg)}`, '_blank', 'noopener');
});

// --- Import Pack ---
function importPackString(raw) {
  try {
    const items = decodePack(raw);
    if (!items.length) {
      showToast('V balíčku nebyly žádné platné věty.');
      return 0;
    }
    let added = 0;
    const existingEn = new Set(state.cards.map((c) => c.en.toLowerCase()));
    items.forEach((item) => {
      if (!existingEn.has(item.en.toLowerCase())) {
        existingEn.add(item.en.toLowerCase());
        state.cards.unshift({
          id: 'imp-' + Date.now() + '-' + Math.random().toString(36).slice(2, 6),
          topic: item.topic,
          cz: item.cz,
          en: item.en,
          phonetic: item.phonetic,
          interval: 0,
          reps: 0,
          dueDate: todayISO()
        });
        added++;
      }
    });
    saveState();
    renderVocabList();
    renderShareChecklist();
    const skipped = items.length - added;
    showToast(`Načteno ${added} nových vět` + (skipped ? ` (${skipped} už bylo uloženo)` : '!'));
    return added;
  } catch {
    showToast('Neplatný kód balíčku. Zkontroluj, zda je zkopírovaný celý.');
    return -1;
  }
}

document.getElementById('import-pack-btn').addEventListener('click', () => {
  const input = document.getElementById('import-code-input');
  const res = importPackString(input.value);
  if (res >= 0) input.value = '';
});

// --- Backup & Restore ---
document.getElementById('backup-download-btn').addEventListener('click', () => {
  const blob = new Blob([JSON.stringify(state, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `ticha-anglictina-zaloha-${todayISO()}.json`;
  a.click();
  URL.revokeObjectURL(url);
  showToast('Záloha stažena do souboru.');
});

document.getElementById('backup-restore-input').addEventListener('change', (e) => {
  const file = e.target.files?.[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = () => {
    try {
      const parsed = JSON.parse(String(reader.result));
      if (!parsed || !Array.isArray(parsed.cards)) {
        throw new Error('Neplatný soubor');
      }
      state = parsed;
      saveState();
      renderVocabList();
      renderShareChecklist();
      showToast(`Obnoveno ${state.cards.length} karet ze zálohy!`);
    } catch {
      showToast('Soubor se zálohou není platný.');
    }
    e.target.value = '';
  };
  reader.readAsText(file);
});

// --- Check URL ?pack= on startup ---
function checkUrlPack() {
  const params = new URLSearchParams(window.location.search);
  const packParam = params.get('pack');
  if (packParam) {
    importPackString(packParam);
    const cleanUrl = window.location.pathname;
    window.history.replaceState({}, '', cleanUrl);
  }
}

// --- Service Worker Registration ---
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js').catch(() => {});
  });
}

// --- Init App ---
populateTopicSelects();
renderBuilderTopics();
renderTemplate();
updateDueIndicators();
checkUrlPack();
