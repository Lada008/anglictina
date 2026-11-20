import { TOPICS, INITIAL_PHRASES, SENTENCE_TEMPLATES, TOPIC_ILLUSTRATIONS } from './data.js';
import { VOCAB_PACKS } from './vocab-bank.js';

const STORAGE_KEY = 'ticha_anglictina_v1';
const AI_KEY_STORAGE = 'ticha_anglictina_gemini_key';

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
    theme: window.matchMedia?.('(prefers-color-scheme: dark)').matches ? 'dark' : 'light',
    aiEnabled: null,
    stats: {
      xp: 0,
      streak: 0,
      lastReviewDate: null,
      reviewedToday: 0,
      reviewedDate: today
    },
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
    if (!parsed.stats) {
      parsed.stats = { xp: 0, streak: 0, lastReviewDate: null, reviewedToday: 0, reviewedDate: todayISO() };
    }
    if (typeof parsed.stats.xp !== 'number') {
      parsed.stats.xp = 0;
    }
    if (!parsed.theme) {
      parsed.theme = 'light';
    }
    // Reset today's counter if date changed
    if (parsed.stats.reviewedDate !== todayISO()) {
      parsed.stats.reviewedToday = 0;
      parsed.stats.reviewedDate = todayISO();
    }
    // Check if streak expired (more than 1 day gap)
    if (parsed.stats.lastReviewDate && daysDiffFromToday(parsed.stats.lastReviewDate) < -1) {
      parsed.stats.streak = 0;
    }

    // Aktualizace fonetického přepisu na čistou češtinu + doplnění tipů u výchozích frází
    const initMap = new Map(INITIAL_PHRASES.map((p) => [p.id, p]));
    let migrated = false;
    parsed.cards.forEach((c) => {
      const def = initMap.get(c.id);
      if (def) {
        if (c.phonetic !== def.phonetic) {
          c.phonetic = def.phonetic;
          migrated = true;
        }
        if (!c.tip && def.tip) {
          c.tip = def.tip;
          migrated = true;
        }
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

// --- Theme ---
function applyTheme(theme) {
  state.theme = theme === 'dark' ? 'dark' : 'light';
  document.documentElement.dataset.theme = state.theme;
  const metaTheme = document.getElementById('meta-theme-color');
  if (metaTheme) metaTheme.setAttribute('content', state.theme === 'dark' ? '#0f172a' : '#0f766e');
  const btn = document.getElementById('theme-toggle-btn');
  if (btn) btn.textContent = state.theme === 'dark' ? '☀️' : '🌙';
}

document.getElementById('theme-toggle-btn').addEventListener('click', () => {
  applyTheme(state.theme === 'dark' ? 'light' : 'dark');
  saveState();
});

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

function speakEnglish(text, btnEl, rate = 0.9) {
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
    utter.rate = rate;
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
    speakTimer = setTimeout(cleanup, 7000);

    synth.speak(utter);
  } catch {
    if (btnEl) btnEl.classList.remove('speaking');
    showToast('Poslech se nepodařilo spustit.');
  }
}

// --- Fullscreen Show-to-Local Modal ---
let currentShowEn = '';
function openShowModal(en, cz) {
  currentShowEn = en;
  document.getElementById('show-modal-en').textContent = en;
  document.getElementById('show-modal-cz').textContent = cz || '';
  document.getElementById('show-modal').hidden = false;
}

function closeShowModal() {
  document.getElementById('show-modal').hidden = true;
}

document.getElementById('show-modal-close').addEventListener('click', closeShowModal);
document.getElementById('show-modal').addEventListener('click', (e) => {
  if (e.target.id === 'show-modal') closeShowModal();
});
document.getElementById('show-modal-speak').addEventListener('click', (e) => {
  if (currentShowEn) speakEnglish(currentShowEn, e.currentTarget, 0.9);
});
document.getElementById('show-modal-slow').addEventListener('click', (e) => {
  if (currentShowEn) speakEnglish(currentShowEn, e.currentTarget, 0.62);
});

// --- Grammar / Travel Tip Modal ---
const DEFAULT_TIP =
  'V angličtině má věta pevný slovosled: Kdo + sloveso + co + místo/čas. U otázek se pomocné sloveso (Can, Could, Do, Does, Is) přesouvá před podmět.';

function openTipModal(en, tip) {
  document.getElementById('tip-modal-en').textContent = en;
  document.getElementById('tip-modal-body').textContent = tip || DEFAULT_TIP;
  document.getElementById('tip-modal').hidden = false;
}

function closeTipModal() {
  document.getElementById('tip-modal').hidden = true;
}

document.getElementById('tip-modal-close').addEventListener('click', closeTipModal);
document.getElementById('tip-modal-ok').addEventListener('click', closeTipModal);
document.getElementById('tip-modal').addEventListener('click', (e) => {
  if (e.target.id === 'tip-modal') closeTipModal();
});

// --- App UI State ---
const ui = {
  activeTab: 'builder',
  builderTopic: 'all',
  builderMode: 'templates',
  tplIndex: 0,
  tplSlots: {},
  activeSlotIdx: null,
  puzIndex: 0,
  puzTokens: [],
  puzBank: [],
  puzPlaced: [],
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
  } else if (tabName === 'journey') {
    renderProgressMap();
    renderVocabPacks();
    updateAiKeyUI();
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
  document.getElementById('header-streak-count').textContent = String(state.stats?.streak || 0);

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

  document.getElementById('tpl-topic-badge').textContent = `${topicMeta.icon} ${topicMeta.shortLabel}`;
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
  const tipPrev = document.getElementById('tpl-tip-preview');
  if (tipPrev) tipPrev.textContent = tpl.tip || 'Proč je věta takto poskládaná?';
}

document.getElementById('tpl-tip-btn').addEventListener('click', () => {
  const tpl = getFilteredTemplates()[ui.tplIndex];
  if (!tpl) return;
  openTipModal(buildTemplateResult(tpl).en, tpl.tip);
});

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
  const tpl = getFilteredTemplates()[ui.tplIndex];
  if (!tpl) return;
  speakEnglish(buildTemplateResult(tpl).en, e.currentTarget, 0.9);
});

document.getElementById('tpl-slow-btn').addEventListener('click', (e) => {
  const tpl = getFilteredTemplates()[ui.tplIndex];
  if (!tpl) return;
  speakEnglish(buildTemplateResult(tpl).en, e.currentTarget, 0.62);
});

document.getElementById('tpl-show-btn').addEventListener('click', () => {
  const tpl = getFilteredTemplates()[ui.tplIndex];
  if (!tpl) return;
  const res = buildTemplateResult(tpl);
  openShowModal(res.en, res.cz);
});

document.getElementById('tpl-save-btn').addEventListener('click', () => {
  const tpl = getFilteredTemplates()[ui.tplIndex];
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
    tip: tpl.tip || '',
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

  document.getElementById('puz-topic-badge').textContent = `${topicMeta.icon} ${topicMeta.shortLabel}`;
  document.getElementById('puz-counter').textContent = `${ui.puzIndex + 1} / ${list.length}`;
  document.getElementById('puz-cz-text').textContent = phrase.cz;
  const puzIll = document.getElementById('puz-illustration');
  if (puzIll) puzIll.innerHTML = TOPIC_ILLUSTRATIONS[phrase.topic] || TOPIC_ILLUSTRATIONS.camping;

  const phoneticEl = document.getElementById('puz-phonetic-text');
  phoneticEl.textContent = phrase.phonetic || '';
  phoneticEl.hidden = true;
  document.getElementById('puz-hint-toggle').textContent = 'Ukázat výslovnost';

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

  const solvedTipBtn = document.getElementById('puz-solved-tip-btn');
  if (ui.puzSolved) {
    feedbackEl.className = 'puzzle-feedback ok';
    feedbackEl.textContent = '✅ Výborně! Věta je správně.';
    if (solvedTipBtn) solvedTipBtn.hidden = false;
  } else {
    if (solvedTipBtn) solvedTipBtn.hidden = true;
    if (ui.puzPlaced.length === 0) {
      feedbackEl.className = 'puzzle-feedback';
      feedbackEl.textContent = '';
    }
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
    if (btnEl) {
      btnEl.classList.remove('wrong-flash');
      void btnEl.offsetWidth;
      btnEl.classList.add('wrong-flash');
    }
    feedbackEl.className = 'puzzle-feedback err';
    feedbackEl.textContent = '✕ Tohle slovo sem teď nepatří, zkus jiné.';
  }
}

document.getElementById('puz-hint-toggle').addEventListener('click', () => {
  const el = document.getElementById('puz-phonetic-text');
  const btn = document.getElementById('puz-hint-toggle');
  el.hidden = !el.hidden;
  btn.textContent = el.hidden ? 'Ukázat výslovnost' : 'Skrýt výslovnost';
});

document.getElementById('puz-hint-word-btn').addEventListener('click', () => {
  if (ui.puzSolved) return;
  const expected = ui.puzTokens[ui.puzPlaced.length];
  const match = ui.puzBank.find((b) => !b.used && b.text.toLowerCase() === expected.toLowerCase());
  if (match) handlePuzzleTap(match, null);
});

document.getElementById('puz-reset-btn').addEventListener('click', () => setupPuzzle());

document.getElementById('puz-next-btn').addEventListener('click', () => {
  ui.puzIndex++;
  setupPuzzle();
});

document.getElementById('puz-speak-btn').addEventListener('click', (e) => {
  const phrase = getFilteredPuzzlePhrases()[ui.puzIndex];
  if (phrase) speakEnglish(phrase.en, e.currentTarget, 0.9);
});

function openCurrentPuzzleTip() {
  const phrase = getFilteredPuzzlePhrases()[ui.puzIndex];
  if (phrase) openTipModal(phrase.en, phrase.tip);
}
document.getElementById('puz-tip-btn').addEventListener('click', openCurrentPuzzleTip);
document.getElementById('puz-solved-tip-btn').addEventListener('click', openCurrentPuzzleTip);

// ==========================================
// TAB 2: KARTIČKY (SRS + SWIPE)
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

function recordReviewStat(xpGain = 10) {
  const today = todayISO();
  if (state.stats.reviewedDate !== today) {
    state.stats.reviewedToday = 0;
    state.stats.reviewedDate = today;
  }
  state.stats.reviewedToday += 1;
  state.stats.xp = (state.stats.xp || 0) + xpGain;

  if (state.stats.lastReviewDate !== today) {
    if (state.stats.lastReviewDate && daysDiffFromToday(state.stats.lastReviewDate) === -1) {
      state.stats.streak = (state.stats.streak || 0) + 1;
    } else {
      state.stats.streak = 1;
    }
    state.stats.lastReviewDate = today;
  }
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
    document.getElementById('done-stat-today').textContent = String(state.stats.reviewedToday || 0);
    document.getElementById('done-stat-streak').textContent = String(state.stats.streak || 0);
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
  if (cardIll) {
    if (card.img) {
      cardIll.innerHTML = `<div style="font-size:3rem;line-height:1;">${card.img}</div>`;
    } else {
      cardIll.innerHTML = TOPIC_ILLUSTRATIONS[card.topic] || TOPIC_ILLUSTRATIONS.camping;
    }
  }
  document.getElementById('card-en').textContent = card.en;
  document.getElementById('card-phonetic').textContent = card.phonetic || '';
  document.getElementById('card-cz-back').textContent = card.cz;

  const nextDays = getNextGoodInterval(card);
  document.getElementById('srs-good-interval').textContent = formatCzDays(nextDays);

  const flashcardEl = document.getElementById('flashcard');
  flashcardEl.style.transform = '';
  flashcardEl.style.transition = '';
  document.getElementById('swipe-left-badge').style.opacity = '0';
  document.getElementById('swipe-right-badge').style.opacity = '0';
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

function gradeCurrentCard(grade) {
  const cardId = ui.srsQueue.shift();
  const card = state.cards.find((c) => c.id === cardId);
  if (!card) return;

  if (grade === 'again') {
    card.reps = 0;
    card.interval = 0;
    card.dueDate = todayISO();
    const insertAt = Math.min(ui.srsQueue.length, 2);
    ui.srsQueue.splice(insertAt, 0, card.id);
  } else if (grade === 'hard') {
    card.reps = Math.max(1, card.reps);
    card.interval = 1;
    card.dueDate = addDaysISO(1);
    ui.srsDoneCount++;
    recordReviewStat();
  } else if (grade === 'good') {
    const nextDays = getNextGoodInterval(card);
    card.reps = (card.reps || 0) + 1;
    card.interval = nextDays;
    card.dueDate = addDaysISO(nextDays);
    ui.srsDoneCount++;
    recordReviewStat();
  }

  saveState();
  ui.srsFlipped = false;
  renderSrsCard();
}

const flashcardEl = document.getElementById('flashcard');

flashcardEl.addEventListener('click', (e) => {
  if (e.target.closest('.card-tool-btns')) return;
  if (!ui.srsFlipped) flipFlashcard();
});

flashcardEl.addEventListener('keydown', (e) => {
  if ((e.key === 'Enter' || e.key === ' ') && !ui.srsFlipped) {
    e.preventDefault();
    flipFlashcard();
  }
});

// Touch Swipe Gestures on Flipped Card
let touchStartX = 0;
let touchStartY = 0;
let swiping = false;

flashcardEl.addEventListener('touchstart', (e) => {
  if (!ui.srsFlipped || e.target.closest('.card-tool-btns')) return;
  const t = e.touches[0];
  touchStartX = t.clientX;
  touchStartY = t.clientY;
  swiping = true;
  flashcardEl.style.transition = 'none';
}, { passive: true });

flashcardEl.addEventListener('touchmove', (e) => {
  if (!swiping || !ui.srsFlipped) return;
  const t = e.touches[0];
  const dx = t.clientX - touchStartX;
  const dy = t.clientY - touchStartY;
  if (Math.abs(dy) > Math.abs(dx) && Math.abs(dx) < 15) return;

  flashcardEl.style.transform = `translateX(${dx}px) rotate(${dx * 0.04}deg)`;
  const ratio = Math.min(1, Math.abs(dx) / 90);
  document.getElementById('swipe-left-badge').style.opacity = dx < -15 ? String(ratio) : '0';
  document.getElementById('swipe-right-badge').style.opacity = dx > 15 ? String(ratio) : '0';
}, { passive: true });

flashcardEl.addEventListener('touchend', (e) => {
  if (!swiping || !ui.srsFlipped) return;
  swiping = false;
  const t = e.changedTouches[0];
  const dx = t.clientX - touchStartX;

  if (dx > 85) {
    gradeCurrentCard('good');
  } else if (dx < -85) {
    gradeCurrentCard('again');
  } else {
    flashcardEl.style.transition = 'transform 0.2s ease';
    flashcardEl.style.transform = '';
    document.getElementById('swipe-left-badge').style.opacity = '0';
    document.getElementById('swipe-right-badge').style.opacity = '0';
  }
}, { passive: true });

document.getElementById('srs-flip-btn').addEventListener('click', flipFlashcard);

document.getElementById('card-speak-btn').addEventListener('click', (e) => {
  e.stopPropagation();
  const card = state.cards.find((c) => c.id === ui.srsQueue[0]);
  if (card) speakEnglish(card.en, e.currentTarget, 0.9);
});

document.getElementById('card-slow-btn').addEventListener('click', (e) => {
  e.stopPropagation();
  const card = state.cards.find((c) => c.id === ui.srsQueue[0]);
  if (card) speakEnglish(card.en, e.currentTarget, 0.62);
});

document.getElementById('card-show-btn').addEventListener('click', (e) => {
  e.stopPropagation();
  const card = state.cards.find((c) => c.id === ui.srsQueue[0]);
  if (card) openShowModal(card.en, card.cz);
});

document.getElementById('card-tip-btn').addEventListener('click', (e) => {
  e.stopPropagation();
  const card = state.cards.find((c) => c.id === ui.srsQueue[0]);
  if (card) openTipModal(card.en, card.tip);
});

document.querySelectorAll('.srs-btn').forEach((btn) => {
  btn.addEventListener('click', () => gradeCurrentCard(btn.dataset.grade));
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
  const editSel = document.getElementById('edit-topic');

  TOPICS.forEach((t) => {
    filterSel.add(new Option(`${t.icon} ${t.label}`, t.id));
    addSel.add(new Option(`${t.icon} ${t.label}`, t.id));
    shareSel.add(new Option(`${t.icon} ${t.label}`, t.id));
    editSel.add(new Option(`${t.icon} ${t.label}`, t.id));
  });
}

function openEditModal(card) {
  document.getElementById('edit-id').value = card.id;
  document.getElementById('edit-topic').value = card.topic;
  document.getElementById('edit-cz').value = card.cz;
  document.getElementById('edit-en').value = card.en;
  document.getElementById('edit-phonetic').value = card.phonetic || '';
  document.getElementById('edit-modal').hidden = false;
}

function closeEditModal() {
  document.getElementById('edit-modal').hidden = true;
}

document.getElementById('edit-modal-close').addEventListener('click', closeEditModal);
document.getElementById('edit-modal').addEventListener('click', (e) => {
  if (e.target.id === 'edit-modal') closeEditModal();
});

document.getElementById('edit-phrase-form').addEventListener('submit', (e) => {
  e.preventDefault();
  const id = document.getElementById('edit-id').value;
  const card = state.cards.find((c) => c.id === id);
  if (!card) return;

  card.topic = document.getElementById('edit-topic').value;
  card.cz = document.getElementById('edit-cz').value.trim();
  card.en = document.getElementById('edit-en').value.trim();
  let ph = document.getElementById('edit-phonetic').value.trim();
  if (ph && !ph.startsWith('[')) ph = `[${ph}]`;
  card.phonetic = ph;

  saveState();
  closeEditModal();
  renderVocabList();
  renderShareChecklist();
  showToast('Věta upravena!');
});

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
          <button type="button" class="mini-btn show-mini" title="Ukázat na displeji">📱</button>
          <button type="button" class="mini-btn speak-mini" title="Poslechnout">🔊</button>
          <button type="button" class="mini-btn edit-mini" title="Upravit větu">✏️</button>
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

    el.querySelector('.show-mini').addEventListener('click', () => openShowModal(card.en, card.cz));
    el.querySelector('.speak-mini').addEventListener('click', (e) => {
      speakEnglish(card.en, e.currentTarget, 0.9);
    });
    el.querySelector('.edit-mini').addEventListener('click', () => openEditModal(card));
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
  copyText(getShareUrl(), 'Odkaz zkopírován!');
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
      if (!state.stats) {
        state.stats = { streak: 0, lastReviewDate: null, reviewedToday: 0, reviewedDate: todayISO() };
      }
      saveState();
      applyTheme(state.theme || 'light');
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

// ==========================================
// PRŮVODCE APLIKACÍ (NÁVOD)
// ==========================================
document.getElementById('guide-btn').addEventListener('click', () => {
  document.getElementById('guide-modal').hidden = false;
});
function closeGuideModal() {
  document.getElementById('guide-modal').hidden = true;
}
document.getElementById('guide-modal-close').addEventListener('click', closeGuideModal);
document.getElementById('guide-modal-ok').addEventListener('click', closeGuideModal);
document.getElementById('guide-modal').addEventListener('click', (e) => {
  if (e.target.id === 'guide-modal') closeGuideModal();
});

// ==========================================
// TAB 3: MAPA PROGRESU, OBRÁZKOVÁ SLOVÍČKA & AI
// ==========================================
document.querySelectorAll('[data-jtab]').forEach((btn) => {
  btn.addEventListener('click', () => {
    const jtab = btn.dataset.jtab;
    document.querySelectorAll('[data-jtab]').forEach((b) =>
      b.classList.toggle('active', b.dataset.jtab === jtab)
    );
    document.getElementById('jtab-map').hidden = jtab !== 'map';
    document.getElementById('jtab-ai').hidden = jtab !== 'ai';
  });
});

function getLevelTitle(lvl) {
  if (lvl <= 1) return 'Začátečník';
  if (lvl === 2) return 'Cestovatel';
  if (lvl === 3) return 'Průzkumník';
  if (lvl === 4) return 'Dobrodruh';
  return 'Světoběžník';
}

function renderProgressMap() {
  const xp = state.stats?.xp || 0;
  const level = Math.floor(xp / 100) + 1;
  const xpInLevel = xp % 100;
  const masteredTotal = state.cards.filter((c) => (c.reps || 0) >= 1).length;

  document.getElementById('xp-level-label').textContent = `Úroveň ${level} · ${getLevelTitle(level)}`;
  document.getElementById('xp-sub-label').textContent = `${xp} XP · Procvičeno ${masteredTotal} z ${state.cards.length} karet`;
  document.getElementById('xp-badge').textContent = `${xp} XP`;
  document.getElementById('xp-progress-fill').style.width = `${Math.max(6, xpInLevel)}%`;

  const mapEl = document.getElementById('progress-map');
  mapEl.innerHTML = '';

  TOPICS.forEach((topic, idx) => {
    const topicCards = state.cards.filter((c) => c.topic === topic.id);
    const done = topicCards.filter((c) => (c.reps || 0) >= 1).length;
    const total = topicCards.length;
    const pct = total > 0 ? Math.round((done / total) * 100) : 0;
    const isMastered = total > 0 && done >= total;

    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = `map-node ${isMastered ? 'mastered' : ''}`;
    btn.innerHTML = `
      <div class="map-node-circle">${isMastered ? '✅' : topic.icon}</div>
      <div class="map-node-body">
        <div class="map-node-title">${idx + 1}. ${topic.label}</div>
        <div class="map-node-sub">Zvládnuto ${done} / ${total} frází (${pct} %)</div>
        <div class="map-mini-bar"><div class="map-mini-fill" style="width:${pct}%"></div></div>
      </div>
      <span class="map-node-go">Trénovat ›</span>
    `;
    btn.addEventListener('click', () => {
      ui.builderTopic = topic.id;
      ui.tplIndex = 0;
      ui.puzIndex = 0;
      ui.tplSlots = {};
      ui.activeSlotIdx = null;
      renderBuilderTopics();
      renderTemplate();
      switchTab('builder');
    });
    mapEl.appendChild(btn);
  });
}

function addVocabWordToCards(word, topicId) {
  const exists = state.cards.some((c) => c.en.toLowerCase() === word.en.toLowerCase());
  if (exists) return false;
  state.cards.unshift({
    id: 'vb-' + Date.now() + '-' + Math.random().toString(36).slice(2, 6),
    topic: topicId || 'airport',
    cz: word.cz,
    en: word.en,
    phonetic: word.phonetic || '',
    img: word.img || '',
    tip: word.tip || `Základní cestovatelské slovíčko „${word.en}“ (${word.cz}). Zkus si s ním vytvořit jednoduchou větu!`,
    interval: 0,
    reps: 0,
    dueDate: todayISO()
  });
  return true;
}

function renderVocabPacks() {
  const container = document.getElementById('vocab-packs-container');
  container.innerHTML = '';
  const existingSet = new Set(state.cards.map((c) => c.en.toLowerCase()));

  VOCAB_PACKS.forEach((pack) => {
    const addedCount = pack.words.filter((w) => existingSet.has(w.en.toLowerCase())).length;
    const details = document.createElement('details');
    details.className = 'pack-card';
    details.innerHTML = `
      <summary class="pack-summary">
        <div class="pack-head-left">
          <div class="pack-icon-box" style="background:${pack.color}">${pack.icon}</div>
          <div>
            <div class="pack-title">${pack.title}</div>
            <div class="pack-meta">${pack.words.length} slovíček · V kartičkách: ${addedCount}</div>
          </div>
        </div>
        <span class="tip-bar-arrow">▾</span>
      </summary>
      <div class="pack-content">
        <div class="pack-add-all-row">
          <button type="button" class="btn btn-primary btn-full pack-add-all-btn">+ Přidat celý balíček do kartiček</button>
        </div>
        <div class="pack-words-grid"></div>
      </div>
    `;

    details.querySelector('.pack-add-all-btn').addEventListener('click', () => {
      let added = 0;
      pack.words.forEach((w) => {
        if (addVocabWordToCards(w, pack.topic)) added++;
      });
      if (added > 0) {
        saveState();
        renderVocabPacks();
        renderProgressMap();
        showToast(`Přidáno ${added} slovíček do kartiček!`);
      } else {
        showToast('Všechna slovíčka z balíčku už máš v kartičkách.');
      }
    });

    const grid = details.querySelector('.pack-words-grid');
    pack.words.forEach((w) => {
      const isAdded = existingSet.has(w.en.toLowerCase());
      const item = document.createElement('div');
      item.className = 'word-pic-card';
      item.innerHTML = `
        <div class="word-pic-emoji">${w.img}</div>
        <div class="word-pic-en">${w.en}</div>
        <div class="word-pic-cz">${w.cz}</div>
        <div class="word-pic-ph">${w.phonetic}</div>
        <div class="word-pic-actions">
          <button type="button" class="mini-btn w-speak" title="Poslechnout">🔊</button>
          <button type="button" class="mini-btn w-add" ${isAdded ? 'disabled' : ''}>${isAdded ? '✓' : '+ Přidat'}</button>
        </div>
      `;
      item.querySelector('.w-speak').addEventListener('click', (e) => speakEnglish(w.en, e.currentTarget, 0.9));
      item.querySelector('.w-add').addEventListener('click', (e) => {
        if (addVocabWordToCards(w, pack.topic)) {
          saveState();
          e.currentTarget.textContent = '✓';
          e.currentTarget.disabled = true;
          showToast(`„${w.en}“ přidáno do kartiček!`);
        }
      });
      grid.appendChild(item);
    });

    container.appendChild(details);
  });
}

// --- AI Trenér (Google Gemini API, BYOK) ---
function getAiKey() {
  return (localStorage.getItem(AI_KEY_STORAGE) || '').trim();
}

function updateAiKeyUI() {
  const key = getAiKey();
  const statusEl = document.getElementById('ai-key-status');
  const inputEl = document.getElementById('ai-api-key-input');
  if (key) {
    statusEl.textContent = 'Aktivní ✓';
    statusEl.classList.add('ok');
    if (inputEl && !inputEl.value) inputEl.value = key;
  } else {
    statusEl.textContent = 'Nenastaveno';
    statusEl.classList.remove('ok');
  }
}

document.getElementById('ai-save-key-btn').addEventListener('click', () => {
  const val = document.getElementById('ai-api-key-input').value.trim();
  if (!val) {
    localStorage.removeItem(AI_KEY_STORAGE);
    updateAiKeyUI();
    showToast('API klíč byl odebrán.');
    return;
  }
  localStorage.setItem(AI_KEY_STORAGE, val);
  updateAiKeyUI();
  document.getElementById('ai-key-details').open = false;
  showToast('Gemini AI klíč uložen v telefonu!');
});

async function callGemini(promptText) {
  const key = getAiKey();
  if (!key) {
    document.getElementById('ai-key-details').open = true;
    throw new Error('Nejdřív vlož svůj bezplatný Google Gemini API klíč výše.');
  }
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${encodeURIComponent(key)}`;
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ parts: [{ text: promptText }] }]
    })
  });
  if (!res.ok) {
    throw new Error('Chyba spojení s Gemini AI. Zkontroluj svůj API klíč nebo připojení.');
  }
  const data = await res.json();
  return data?.candidates?.[0]?.content?.parts?.[0]?.text || '';
}

document.querySelectorAll('.quick-chip[data-prompt]').forEach((chip) => {
  chip.addEventListener('click', () => {
    document.getElementById('ai-prompt-input').value = chip.dataset.prompt;
    runAiGenerator();
  });
});

async function runAiGenerator() {
  const input = document.getElementById('ai-prompt-input');
  const query = input.value.trim();
  if (!query) {
    showToast('Napiš, co chceš vygenerovat.');
    return;
  }
  const btn = document.getElementById('ai-generate-btn');
  const out = document.getElementById('ai-results');
  btn.disabled = true;
  btn.textContent = '⏳…';
  out.innerHTML = '<div class="muted-text">AI připravuje fráze a výslovnost…</div>';

  const sysPrompt = `Jsi přátelský učitel cestovatelské angličtiny pro Čechy.
Uživatel chce: "${query}".
Vrať POUZE čisté JSON pole objektů (bez markdownu a bez dalšího textu) s 3 až 8 položkami v tomto formátu:
[{"en":"anglická věta nebo slovo","cz":"český překlad","phonetic":"[zjednodušený čistě český přepis BEZ znaků ð, ə, θ]","tip":"krátké české vysvětlení proč je věta takto poskládaná","img":"1 vhodné emoji"}]`;

  try {
    const raw = await callGemini(sysPrompt);
    const cleaned = raw.replace(/```json/gi, '').replace(/```/g, '').trim();
    const match = cleaned.match(/\[[\s\S]*\]/);
    const items = JSON.parse(match ? match[0] : cleaned);
    if (!Array.isArray(items) || !items.length) throw new Error('AI nevrátila žádná data.');

    out.innerHTML = '';
    items.forEach((it) => {
      const card = document.createElement('div');
      card.className = 'ai-result-item';
      card.innerHTML = `
        <div class="ai-result-top">
          <div class="ai-result-en">${it.img || '✨'} ${it.en}</div>
          <div class="vocab-item-actions">
            <button type="button" class="mini-btn ai-spk">🔊</button>
            <button type="button" class="mini-btn ai-add">+ Kartička</button>
          </div>
        </div>
        <div class="ai-result-cz">${it.cz}</div>
        <div class="phonetic-text">${it.phonetic || ''}</div>
        <div class="ai-result-tip">💡 ${it.tip || ''}</div>
      `;
      card.querySelector('.ai-spk').addEventListener('click', (e) => speakEnglish(it.en, e.currentTarget, 0.9));
      card.querySelector('.ai-add').addEventListener('click', (e) => {
        if (addVocabWordToCards(it, 'problems')) {
          saveState();
          e.currentTarget.textContent = '✓ Přidáno';
          e.currentTarget.disabled = true;
          showToast('Přidáno do kartiček!');
        } else {
          showToast('Tato položka už v kartičkách je.');
        }
      });
      out.appendChild(card);
    });
  } catch (err) {
    out.innerHTML = `<div class="muted-text">${err.message || 'Nepodařilo se vygenerovat.'}</div>`;
  } finally {
    btn.disabled = false;
    btn.textContent = 'Vygenerovat';
  }
}

document.getElementById('ai-generate-btn').addEventListener('click', runAiGenerator);

// --- Tichý AI Roleplay ---
const ROLEPLAY_SCENES = {
  camping: {
    label: 'Recepce kempu',
    openerEn: 'Hello! Welcome to Sunny Beach Camping. How can I help you today?',
    openerCz: 'Dobrý den! Vítejte v kempu Sunny Beach. Jak vám dnes mohu pomoci?'
  },
  restaurant: {
    label: 'Restaurace',
    openerEn: 'Good evening! Do you have a reservation, or would you like a table for two?',
    openerCz: 'Dobrý večer! Máte rezervaci, nebo byste chtěli stůl pro dva?'
  },
  airport: {
    label: 'Letiště',
    openerEn: 'Hello! May I see your passport and boarding pass, please?',
    openerCz: 'Dobrý den! Mohu prosím vidět váš pas a palubní lístek?'
  },
  pharmacy: {
    label: 'Lékárna',
    openerEn: 'Hello, how can I help you? Are you looking for something specific?',
    openerCz: 'Dobrý den, jak vám mohu pomoci? Hledáte něco konkrétního?'
  }
};

let roleplayHistory = [];
let activeSceneKey = 'camping';

function appendChatBubble(role, text, czTip) {
  const chat = document.getElementById('roleplay-chat');
  const ph = chat.querySelector('.chat-placeholder');
  if (ph) ph.remove();

  const div = document.createElement('div');
  div.className = `chat-bubble ${role}`;
  div.textContent = text;
  if (czTip) {
    const tip = document.createElement('div');
    tip.className = 'chat-cz-tip';
    tip.textContent = czTip;
    div.appendChild(tip);
  }
  chat.appendChild(div);
  chat.scrollTop = chat.scrollHeight;
}

document.querySelectorAll('#roleplay-scenes .quick-chip').forEach((btn) => {
  btn.addEventListener('click', () => {
    activeSceneKey = btn.dataset.scene;
    const sc = ROLEPLAY_SCENES[activeSceneKey];
    roleplayHistory = [{ role: 'AI', text: sc.openerEn }];
    document.getElementById('roleplay-chat').innerHTML = '';
    appendChatBubble('ai', sc.openerEn, `🇨🇿 ${sc.openerCz}`);
  });
});

async function sendRoleplayMessage() {
  const input = document.getElementById('roleplay-input');
  const userText = input.value.trim();
  if (!userText) return;
  input.value = '';

  if (roleplayHistory.length === 0) {
    const sc = ROLEPLAY_SCENES[activeSceneKey];
    roleplayHistory = [{ role: 'AI', text: sc.openerEn }];
  }

  appendChatBubble('user', userText);
  roleplayHistory.push({ role: 'User', text: userText });

  const btn = document.getElementById('roleplay-send-btn');
  btn.disabled = true;

  const historyStr = roleplayHistory.slice(-6).map((m) => `${m.role}: ${m.text}`).join('\n');
  const prompt = `Hraješ roli v cestovatelském dialogu (${ROLEPLAY_SCENES[activeSceneKey].label}).
Dosavadní rozhovor:
${historyStr}

Odpověz POUZE jako čistý JSON objekt:
{"replyEn":"krátká přirozená odpověď jednoduchou angličtinou (max 2 věty)","tipCz":"český překlad tvé odpovědi + případná jemná rada k uživatelově větě"}`;

  try {
    const raw = await callGemini(prompt);
    const cleaned = raw.replace(/```json/gi, '').replace(/```/g, '').trim();
    const match = cleaned.match(/\{[\s\S]*\}/);
    const obj = JSON.parse(match ? match[0] : cleaned);
    roleplayHistory.push({ role: 'AI', text: obj.replyEn });
    appendChatBubble('ai', obj.replyEn, `💡 ${obj.tipCz || ''}`);
  } catch (err) {
    appendChatBubble('ai', 'Nepodařilo se spojit s AI.', err.message || 'Zkontroluj API klíč.');
  } finally {
    btn.disabled = false;
  }
}

document.getElementById('roleplay-send-btn').addEventListener('click', sendRoleplayMessage);
document.getElementById('roleplay-input').addEventListener('keydown', (e) => {
  if (e.key === 'Enter') sendRoleplayMessage();
});

// ==========================================
// REŽIM APLIKACE (S AI / BEZ AI)
// ==========================================
function applyAiMode(enabled) {
  const isAi = Boolean(enabled);
  const subtabs = document.getElementById('journey-subtabs');
  const navLabel = document.getElementById('nav-journey-label');
  const classicBtn = document.getElementById('guide-mode-classic');
  const aiBtn = document.getElementById('guide-mode-ai');

  if (subtabs) subtabs.hidden = !isAi;
  if (navLabel) navLabel.textContent = isAi ? 'Mapa & AI' : 'Mapa';

  if (!isAi) {
    document.getElementById('jtab-map').hidden = false;
    document.getElementById('jtab-ai').hidden = true;
    document.querySelectorAll('[data-jtab]').forEach((b) =>
      b.classList.toggle('active', b.dataset.jtab === 'map')
    );
  }

  if (classicBtn) classicBtn.classList.toggle('active-mode', !isAi);
  if (aiBtn) aiBtn.classList.toggle('active-mode', isAi);
}

function selectAppMode(isAi, closeModals = true) {
  state.aiEnabled = Boolean(isAi);
  saveState();
  applyAiMode(state.aiEnabled);
  if (closeModals) {
    document.getElementById('mode-modal').hidden = true;
  }
  showToast(isAi ? 'Přepnuto na verzi s AI Trenérem 🤖' : 'Přepnuto na klasickou offline verzi 🌿');
}

document.getElementById('pick-mode-classic').addEventListener('click', () => selectAppMode(false));
document.getElementById('pick-mode-ai').addEventListener('click', () => selectAppMode(true));
document.getElementById('guide-mode-classic').addEventListener('click', () => selectAppMode(false, false));
document.getElementById('guide-mode-ai').addEventListener('click', () => selectAppMode(true, false));

function initAppMode() {
  const params = new URLSearchParams(window.location.search);
  const urlMode = params.get('mode');
  if (urlMode === 'classic' || urlMode === 'noai') {
    state.aiEnabled = false;
    saveState();
  } else if (urlMode === 'ai') {
    state.aiEnabled = true;
    saveState();
  }

  if (state.aiEnabled === null || state.aiEnabled === undefined) {
    applyAiMode(false);
    document.getElementById('mode-modal').hidden = false;
  } else {
    applyAiMode(state.aiEnabled);
  }
}

// --- Init App ---
applyTheme(state.theme);
populateTopicSelects();
renderBuilderTopics();
renderTemplate();
updateDueIndicators();
checkUrlPack();
initAppMode();
