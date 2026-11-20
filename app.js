import { TOPICS, INITIAL_PHRASES, SENTENCE_TEMPLATES, TOPIC_ILLUSTRATIONS, VOCABULARY } from './data.js';
import { VOCAB_PACKS } from './vocab-bank.js';

const ACTIVE_LANG_KEY = 'ticha_lang_active';

function normalizePhrase(p) {
  return { ...p, en: (p.en ?? p.target ?? '').trim() };
}

function normalizeTemplate(t) {
  return {
    ...t,
    parts: (t.parts || []).map((part) => {
      if (part.type === 'text') {
        return { ...part, en: part.en ?? part.target ?? '' };
      }
      return {
        ...part,
        options: (part.options || []).map((opt) => ({
          ...opt,
          en: opt.en ?? opt.target ?? ''
        }))
      };
    })
  };
}

function buildTopicPacks(vocabList, code) {
  const colors = {
    general: '#e0e7ff',
    camping: '#ccfbf1',
    restaurant: '#fef3c7',
    shopping: '#e0f2fe',
    airport: '#ede9fe',
    problems: '#fee2e2'
  };
  return TOPICS.map((t, idx) => {
    const words = vocabList.filter((w) => w.topic === t.id);
    return {
      id: `${code}-pack-${t.id}`,
      topic: t.id,
      title: `${idx + 1}. ${t.label}`,
      icon: t.icon,
      color: colors[t.id] || '#e0e7ff',
      words
    };
  }).filter((p) => p.words.length > 0);
}

function mergeById(primary, secondary) {
  const seen = new Set(primary.map((x) => x.id));
  const out = [...primary];
  secondary.forEach((x) => {
    if (!seen.has(x.id)) {
      seen.add(x.id);
      out.push(x);
    }
  });
  return out;
}

const LANGUAGES = {
  en: {
    code: 'en',
    label: 'Angličtina',
    upper: 'ANGLICKY',
    adv: 'anglicky',
    adj: 'anglické',
    adjCap: 'Anglická',
    adjMasc: 'anglický',
    speechLang: 'en-GB',
    voicePrefix: 'en',
    storageKey: 'ticha_anglictina_v1',
    loaded: true,
    phrases: INITIAL_PHRASES.map(normalizePhrase),
    templates: SENTENCE_TEMPLATES.map(normalizeTemplate),
    packs: VOCAB_PACKS,
    vocabulary: VOCABULARY.map(normalizePhrase)
  },
  de: {
    code: 'de',
    label: 'Němčina',
    upper: 'NĚMECKY',
    adv: 'německy',
    adj: 'německé',
    adjCap: 'Německá',
    adjMasc: 'německý',
    speechLang: 'de-DE',
    voicePrefix: 'de',
    storageKey: 'ticha_anglictina_v1_de',
    loaded: false,
    phrases: [],
    templates: [],
    packs: [],
    vocabulary: []
  },
  pl: {
    code: 'pl',
    label: 'Polština',
    upper: 'POLSKY',
    adv: 'polsky',
    adj: 'polské',
    adjCap: 'Polská',
    adjMasc: 'polský',
    speechLang: 'pl-PL',
    voicePrefix: 'pl',
    storageKey: 'ticha_anglictina_v1_pl',
    loaded: false,
    phrases: [],
    templates: [],
    packs: [],
    vocabulary: []
  },
  es: {
    code: 'es',
    label: 'Španělština',
    upper: 'ŠPANĚLSKY',
    adv: 'španělsky',
    adj: 'španělské',
    adjCap: 'Španělská',
    adjMasc: 'španělský',
    speechLang: 'es-ES',
    voicePrefix: 'es',
    storageKey: 'ticha_anglictina_v1_es',
    loaded: false,
    phrases: [],
    templates: [],
    packs: [],
    vocabulary: []
  }
};

let activeLangCode = localStorage.getItem(ACTIVE_LANG_KEY) || 'en';
if (!LANGUAGES[activeLangCode]) activeLangCode = 'en';

function getLang() {
  return LANGUAGES[activeLangCode] || LANGUAGES.en;
}

async function ensureLanguageLoaded(code) {
  const cfg = LANGUAGES[code];
  if (!cfg || cfg.loaded) return;

  try {
    if (code === 'de') {
      const [pt, v1, v2, v3, v4] = await Promise.all([
        import('./de/de_phrases_templates.js'),
        import('./de/de_vocabulary_part_1.js'),
        import('./de/de_vocabulary_part_2.js'),
        import('./de/de_vocabulary_part_3.js'),
        import('./de/de_vocabulary_part_4.js')
      ]);
      cfg.phrases = (pt.PHRASES_DE || []).map(normalizePhrase);
      cfg.templates = (pt.TEMPLATES_DE || []).map(normalizeTemplate);
      cfg.vocabulary = [
        ...v1.VOCABULARY_DE_PART_1,
        ...v2.VOCABULARY_DE_PART_2,
        ...v3.VOCABULARY_DE_PART_3,
        ...v4.VOCABULARY_DE_PART_4
      ].map((w) => ({ ...normalizePhrase(w), img: w.img || getTopicMeta(w.topic).icon }));
      cfg.packs = buildTopicPacks(cfg.vocabulary, 'de');
    } else if (code === 'pl') {
      const [pt, v1, v2, v3, v4] = await Promise.all([
        import('./pl/pl_phrases_templates.js'),
        import('./pl/pl_vocabulary_part_1.js'),
        import('./pl/pl_vocabulary_part_2.js'),
        import('./pl/pl_vocabulary_part_3.js'),
        import('./pl/pl_vocabulary_part_4.js')
      ]);
      cfg.phrases = (pt.PHRASES_PL || []).map(normalizePhrase);
      cfg.templates = (pt.TEMPLATES_PL || []).map(normalizeTemplate);
      cfg.vocabulary = [
        ...v1.VOCABULARY_PL_PART_1,
        ...v2.VOCABULARY_PL_PART_2,
        ...v3.VOCABULARY_PL_PART_3,
        ...v4.VOCABULARY_PL_PART_4
      ].map((w) => ({ ...normalizePhrase(w), img: w.img || getTopicMeta(w.topic).icon }));
      cfg.packs = buildTopicPacks(cfg.vocabulary, 'pl');
    } else if (code === 'es') {
      const [pt, v1, v2, v3, v4] = await Promise.all([
        import('./es/es_phrases_templates.js'),
        import('./es/es_vocabulary_part_1.js'),
        import('./es/es_vocabulary_part_2.js'),
        import('./es/es_vocabulary_part_3.js'),
        import('./es/es_vocabulary_part_4.js')
      ]);
      cfg.phrases = (pt.PHRASES_ES || []).map(normalizePhrase);
      cfg.templates = (pt.TEMPLATES_ES || []).map(normalizeTemplate);
      cfg.vocabulary = [
        ...v1.VOCABULARY_ES_PART_1,
        ...v2.VOCABULARY_ES_PART_2,
        ...v3.VOCABULARY_ES_PART_3,
        ...v4.VOCABULARY_ES_PART_4
      ].map((w) => ({ ...normalizePhrase(w), img: w.img || getTopicMeta(w.topic).icon }));
      cfg.packs = buildTopicPacks(cfg.vocabulary, 'es');
    }
    cfg.loaded = true;
  } catch {
    showToast(`Nepodařilo se načíst soubory pro jazyk ${cfg.label}.`);
  }
}

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

// --- Storage (samostatný postup pro každý jazyk EN / DE / ES) ---
function createInitialState() {
  const today = todayISO();
  const lang = getLang();
  return {
    theme: window.matchMedia?.('(prefers-color-scheme: dark)').matches ? 'dark' : 'light',
    tutorialSeen: activeLangCode !== 'en',
    stats: {
      xp: 0,
      streak: 0,
      dailyGoal: 10,
      unlockedLevel: 0,
      totalGood: 0,
      totalHard: 0,
      totalAgain: 0,
      testsPassed: 0,
      puzzlesToday: 0,
      bestBlitz: 0,
      activeDays: [],
      claimedQuests: [],
      lastReviewDate: null,
      reviewedToday: 0,
      reviewedDate: today
    },
    cards: lang.phrases.map((p) => ({
      ...p,
      interval: 0,
      reps: 0,
      dueDate: today
    }))
  };
}

function loadState() {
  const lang = getLang();
  const key = lang.storageKey;
  try {
    const raw = localStorage.getItem(key);
    if (!raw) {
      const init = createInitialState();
      localStorage.setItem(key, JSON.stringify(init));
      return init;
    }
    const parsed = JSON.parse(raw);
    if (!parsed || !Array.isArray(parsed.cards)) {
      const init = createInitialState();
      localStorage.setItem(key, JSON.stringify(init));
      return init;
    }
    if (!parsed.stats) {
      parsed.stats = { xp: 0, streak: 0, dailyGoal: 10, unlockedLevel: 0, totalGood: 0, totalHard: 0, totalAgain: 0, testsPassed: 0, lastReviewDate: null, reviewedToday: 0, reviewedDate: todayISO() };
    }
    if (typeof parsed.stats.xp !== 'number') parsed.stats.xp = 0;
    if (typeof parsed.stats.dailyGoal !== 'number') parsed.stats.dailyGoal = 10;
    if (typeof parsed.stats.unlockedLevel !== 'number') parsed.stats.unlockedLevel = 0;
    if (typeof parsed.stats.totalGood !== 'number') parsed.stats.totalGood = 0;
    if (typeof parsed.stats.totalHard !== 'number') parsed.stats.totalHard = 0;
    if (typeof parsed.stats.totalAgain !== 'number') parsed.stats.totalAgain = 0;
    if (typeof parsed.stats.testsPassed !== 'number') parsed.stats.testsPassed = 0;
    if (typeof parsed.stats.puzzlesToday !== 'number') parsed.stats.puzzlesToday = 0;
    if (typeof parsed.stats.bestBlitz !== 'number') parsed.stats.bestBlitz = 0;
    if (!Array.isArray(parsed.stats.activeDays)) parsed.stats.activeDays = [];
    if (!Array.isArray(parsed.stats.claimedQuests)) parsed.stats.claimedQuests = [];
    if (!parsed.theme) parsed.theme = 'light';

    if (parsed.stats.reviewedDate !== todayISO()) {
      parsed.stats.reviewedToday = 0;
      parsed.stats.puzzlesToday = 0;
      parsed.stats.claimedQuests = [];
      parsed.stats.reviewedDate = todayISO();
    }
    if (parsed.stats.lastReviewDate && daysDiffFromToday(parsed.stats.lastReviewDate) < -1) {
      parsed.stats.streak = 0;
    }

    const initMap = new Map(lang.phrases.map((p) => [p.id, p]));
    let migrated = false;

    // Pro DE / PL / ES odeber staré výchozí fráze, které už nejsou v uživatelských složkách (/de, /pl, /es)
    if (lang.code !== 'en' && lang.loaded) {
      const prefix = `${lang.code}-`;
      const beforeLen = parsed.cards.length;
      parsed.cards = parsed.cards.filter((c) => {
        if (c.id.startsWith(prefix) && !initMap.has(c.id)) return false;
        return true;
      });
      if (parsed.cards.length !== beforeLen) migrated = true;
    }

    const existingIds = new Set(parsed.cards.map((c) => c.id));
    parsed.cards.forEach((c) => {
      const def = initMap.get(c.id);
      if (def) {
        if (c.en !== def.en || c.cz !== def.cz || c.phonetic !== def.phonetic || c.tip !== def.tip) {
          c.en = def.en;
          c.cz = def.cz;
          c.phonetic = def.phonetic;
          c.tip = def.tip;
          migrated = true;
        }
      } else if (c.phonetic && /[ðəθ]/.test(c.phonetic)) {
        c.phonetic = c.phonetic.replace(/ðə/g, 'de').replace(/ð/g, 'd').replace(/ə/g, 'e').replace(/θ/g, 's');
        migrated = true;
      }
    });
    const today = todayISO();
    lang.phrases.forEach((p) => {
      if (!existingIds.has(p.id) && (p.id.startsWith('ext-') || lang.code !== 'en')) {
        parsed.cards.push({ ...p, interval: 0, reps: 0, dueDate: today });
        migrated = true;
      }
    });
    if (migrated) {
      localStorage.setItem(key, JSON.stringify(parsed));
    }
    return parsed;
  } catch {
    return createInitialState();
  }
}

function saveState() {
  localStorage.setItem(getLang().storageKey, JSON.stringify(state));
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

    const langCfg = getLang();
    const utter = new SpeechSynthesisUtterance(text);
    activeUtterance = utter;
    utter.lang = langCfg.speechLang;
    utter.rate = rate;
    utter.pitch = 1.0;
    utter.volume = 1.0;

    const voices = cachedVoices.length ? cachedVoices : synth.getVoices();
    const pref = langCfg.voicePrefix;
    const matchVoice =
      voices.find((v) => v.lang === langCfg.speechLang) ||
      voices.find((v) => v.lang && v.lang.toLowerCase().startsWith(pref));
    if (matchVoice) utter.voice = matchVoice;

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
  activeTab: 'cards',
  builderTopic: 'all',
  builderMode: 'templates',
  tplIndex: 0,
  tplSlots: {},
  tplCustomSlots: {},
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
  const tpls = getLang().templates;
  if (ui.builderTopic === 'all') return tpls;
  return tpls.filter((t) => t.topic === ui.builderTopic);
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
      const custom = ui.tplCustomSlots[slotCounter];
      if (custom) {
        en += custom;
        cz += custom;
        phonetic += custom;
      } else {
        const optIdx = ui.tplSlots[slotCounter] ?? 0;
        const opt = part.options[optIdx] || part.options[0];
        en += opt.en;
        cz += opt.cz;
        phonetic += opt.phonetic;
      }
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
      const displayWord = ui.tplCustomSlots[currentSlotIdx] || opt.en;
      btn.textContent = `[${displayWord} ▾]`;
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
      const isActive = !ui.tplCustomSlots[activeSlot.idx] && oIdx === activeSlot.selected;
      oBtn.className = `slot-option-btn ${isActive ? 'active' : ''}`;
      oBtn.textContent = `${opt.en} (${opt.cz})`;
      oBtn.addEventListener('click', () => {
        delete ui.tplCustomSlots[activeSlot.idx];
        ui.tplSlots[activeSlot.idx] = oIdx;
        renderTemplate();
      });
      optionsWrap.appendChild(oBtn);
    });
    const customInp = document.getElementById('tpl-custom-slot-input');
    if (customInp) customInp.value = ui.tplCustomSlots[activeSlot.idx] || '';
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

function applyCustomSlotWord() {
  if (ui.activeSlotIdx === null) return;
  const val = document.getElementById('tpl-custom-slot-input').value.trim();
  if (!val) {
    delete ui.tplCustomSlots[ui.activeSlotIdx];
  } else {
    ui.tplCustomSlots[ui.activeSlotIdx] = val;
  }
  renderTemplate();
}

document.getElementById('tpl-custom-slot-apply').addEventListener('click', applyCustomSlotWord);
document.getElementById('tpl-custom-slot-input').addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    e.preventDefault();
    applyCustomSlotWord();
  }
});

document.getElementById('tpl-prev-btn').addEventListener('click', () => {
  ui.tplIndex--;
  ui.tplSlots = {};
  ui.tplCustomSlots = {};
  ui.activeSlotIdx = null;
  renderTemplate();
});

document.getElementById('tpl-next-btn').addEventListener('click', () => {
  ui.tplIndex++;
  ui.tplSlots = {};
  ui.tplCustomSlots = {};
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
      state.stats.puzzlesToday = (state.stats.puzzlesToday || 0) + 1;
      state.stats.xp = (state.stats.xp || 0) + 10;
      markTodayActive();
      checkDailyQuests();
      saveState();
      navigator.vibrate?.(15);
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
  const topicFilter = document.getElementById('srs-topic-filter')?.value || 'all';
  const pool = topicFilter === 'all' ? state.cards : state.cards.filter((c) => c.topic === topicFilter);
  ui.srsExtraMode = forceExtra;
  const due = forceExtra
    ? shuffleArray(pool).slice(0, 10)
    : pool.filter((c) => c.dueDate <= today);

  ui.srsQueue = due.map((c) => c.id);
  ui.srsDoneCount = 0;
  ui.srsInitialTotal = ui.srsQueue.length;
  ui.srsFlipped = false;
  renderSrsCard();
}

document.getElementById('srs-topic-filter').addEventListener('change', () => {
  initSrsSession(false);
});

function getNextGoodInterval(card) {
  if (!card.interval || card.interval === 0) return 3;
  if (card.interval === 1) return 4;
  return Math.round(card.interval * 2.2);
}

function updateDailyGoalUI() {
  const goal = state.stats?.dailyGoal || 10;
  const done = state.stats?.reviewedToday || 0;
  const label = document.getElementById('daily-goal-label');
  const sel = document.getElementById('daily-goal-select');
  const bar = label?.closest('.daily-goal-bar');
  if (label) {
    label.innerHTML =
      done >= goal
        ? `🏆 Denní cíl splněn: <strong>${done} / ${goal}</strong>`
        : `🎯 Denní cíl: <strong>${done} / ${goal}</strong>`;
  }
  if (sel) sel.value = String(goal);
  if (bar) bar.classList.toggle('goal-met', done >= goal);
}

document.getElementById('daily-goal-select').addEventListener('change', (e) => {
  state.stats.dailyGoal = Number(e.target.value) || 10;
  saveState();
  updateDailyGoalUI();
  showToast(`Denní cíl nastaven na ${state.stats.dailyGoal} karet denně 🎯`);
});

function markTodayActive() {
  const today = todayISO();
  if (!Array.isArray(state.stats.activeDays)) state.stats.activeDays = [];
  if (!state.stats.activeDays.includes(today)) {
    state.stats.activeDays.push(today);
    if (state.stats.activeDays.length > 35) {
      state.stats.activeDays = state.stats.activeDays.slice(-35);
    }
  }
}

function renderWeekStrip() {
  const strip = document.getElementById('week-strip');
  if (!strip) return;
  const labels = ['Po', 'Út', 'St', 'Čt', 'Pá', 'So', 'Ne'];
  const now = new Date();
  const dayOfWeek = (now.getDay() + 6) % 7; // 0 = Monday .. 6 = Sunday
  const activeSet = new Set(state.stats?.activeDays || []);

  strip.innerHTML = '';
  for (let i = 0; i < 7; i++) {
    const d = new Date(now);
    d.setDate(now.getDate() - dayOfWeek + i);
    const iso = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
    const isDone = activeSet.has(iso);
    const isToday = i === dayOfWeek;

    const el = document.createElement('div');
    el.className = `week-day ${isDone ? 'done' : ''} ${isToday ? 'today' : ''}`;
    el.innerHTML = `<span>${labels[i]}</span><span class="week-dot">${isDone ? '✓' : ''}</span>`;
    strip.appendChild(el);
  }
}

function recordReviewStat(xpGain = 10) {
  const today = todayISO();
  if (state.stats.reviewedDate !== today) {
    state.stats.reviewedToday = 0;
    state.stats.puzzlesToday = 0;
    state.stats.claimedQuests = [];
    state.stats.reviewedDate = today;
  }
  state.stats.reviewedToday += 1;
  state.stats.xp = (state.stats.xp || 0) + xpGain;
  markTodayActive();

  const goal = state.stats.dailyGoal || 10;
  if (state.stats.reviewedToday === goal) {
    launchConfetti();
    showToast(`🏆 Skvělá práce! Dnešní cíl (${goal} karet) je splněn!`);
  }
  checkDailyQuests();

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
  renderWeekStrip();
  updateDailyGoalUI();
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
  const langBackHint = document.getElementById('card-lang-back-hint');
  if (langBackHint) langBackHint.textContent = getLang().upper;
  document.getElementById('card-en').textContent = card.en;
  document.getElementById('card-phonetic').textContent = card.phonetic || '';
  document.getElementById('card-cz-back').textContent = card.cz;

  const nextDays = getNextGoodInterval(card);
  document.getElementById('srs-good-interval').textContent = formatCzDays(nextDays);

  const flashcardEl = document.getElementById('flashcard');
  flashcardEl.style.transform = '';
  flashcardEl.style.opacity = '';
  flashcardEl.style.transition = '';
  document.getElementById('swipe-left-badge').style.opacity = '0';
  document.getElementById('swipe-up-badge').style.opacity = '0';
  document.getElementById('swipe-right-badge').style.opacity = '0';
  flashcardEl.classList.toggle('flipped', ui.srsFlipped);
  document.getElementById('srs-reveal-wrap').hidden = ui.srsFlipped;
  document.getElementById('srs-rate-wrap').hidden = !ui.srsFlipped;
  updateSeniorCardGuide();
}

function updateSeniorCardGuide() {
  const el = document.getElementById('senior-card-guide');
  if (!el) return;
  if (!ui.srsFlipped) {
    el.innerHTML = '👉 <strong>Krok 1:</strong> Přečti si českou větu a zkus si vzpomenout v hlavě. Pak klepni na zelené tlačítko <strong>Ukázat odpověď</strong>.';
  } else {
    el.innerHTML = '👉 <strong>Krok 2:</strong> Porovnej odpověď (můžeš kliknout na <em>Poslechnout pomalu</em>) a vyber dole jedno ze 3 tlačítek.';
  }
}

function flipFlashcard() {
  if (ui.srsFlipped) return;
  ui.srsFlipped = true;
  document.getElementById('flashcard').classList.add('flipped');
  document.getElementById('srs-reveal-wrap').hidden = true;
  document.getElementById('srs-rate-wrap').hidden = false;
  updateSeniorCardGuide();
}

function gradeCurrentCard(grade) {
  const cardId = ui.srsQueue.shift();
  const card = state.cards.find((c) => c.id === cardId);
  if (!card) return;

  if (grade === 'again') {
    card.reps = 0;
    card.interval = 0;
    card.dueDate = todayISO();
    state.stats.totalAgain = (state.stats.totalAgain || 0) + 1;
    ui.combo = 0;
    const insertAt = Math.min(ui.srsQueue.length, 2);
    ui.srsQueue.splice(insertAt, 0, card.id);
  } else if (grade === 'hard') {
    card.reps = Math.max(1, card.reps);
    card.interval = 1;
    card.dueDate = addDaysISO(1);
    state.stats.totalHard = (state.stats.totalHard || 0) + 1;
    ui.combo = 0;
    ui.srsDoneCount++;
    recordReviewStat(5);
  } else if (grade === 'good') {
    const nextDays = getNextGoodInterval(card);
    card.reps = (card.reps || 0) + 1;
    card.interval = nextDays;
    card.dueDate = addDaysISO(nextDays);
    state.stats.totalGood = (state.stats.totalGood || 0) + 1;
    ui.combo = (ui.combo || 0) + 1;
    ui.srsDoneCount++;
    const bonus = ui.combo >= 3 ? Math.min(10, ui.combo * 2) : 0;
    recordReviewStat(10 + bonus);
    navigator.vibrate?.(12);
  }

  const comboEl = document.getElementById('combo-badge');
  if (comboEl) {
    if ((ui.combo || 0) >= 2) {
      comboEl.textContent = `🔥 ${ui.combo}× COMBO`;
      comboEl.hidden = false;
    } else {
      comboEl.hidden = true;
    }
  }

  saveState();
  ui.srsFlipped = false;
  renderSrsCard();
}

const flashcardEl = document.getElementById('flashcard');

flashcardEl.addEventListener('click', (e) => {
  if (e.target.closest('.card-tool-btns') || e.target.closest('.senior-card-tools')) return;
  if (!ui.srsFlipped) flipFlashcard();
});

flashcardEl.addEventListener('keydown', (e) => {
  if ((e.key === 'Enter' || e.key === ' ') && !ui.srsFlipped) {
    e.preventDefault();
    flipFlashcard();
  }
});

let isAnimatingGrade = false;
function animateAndGrade(grade) {
  if (isAnimatingGrade || !ui.srsFlipped) return;
  isAnimatingGrade = true;

  flashcardEl.style.transition = 'transform 0.2s ease, opacity 0.2s ease';
  if (grade === 'again') {
    document.getElementById('swipe-left-badge').style.opacity = '1';
    flashcardEl.style.transform = 'translateX(-120%) rotate(-12deg)';
  } else if (grade === 'hard') {
    document.getElementById('swipe-up-badge').style.opacity = '1';
    flashcardEl.style.transform = 'translateY(-110%) scale(0.92)';
  } else {
    document.getElementById('swipe-right-badge').style.opacity = '1';
    flashcardEl.style.transform = 'translateX(120%) rotate(12deg)';
  }
  flashcardEl.style.opacity = '0';

  setTimeout(() => {
    isAnimatingGrade = false;
    gradeCurrentCard(grade);
  }, 190);
}

// 3-Way Touch Swipe Gestures on Flipped Card (Left = Nevím, Up = Těžké, Right = Vím)
let touchStartX = 0;
let touchStartY = 0;
let swiping = false;

flashcardEl.addEventListener('touchstart', (e) => {
  if (!ui.srsFlipped || isAnimatingGrade || e.target.closest('.card-tool-btns') || e.target.closest('.senior-card-tools')) return;
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

  const isUpSwipe = dy < -15 && Math.abs(dy) > Math.abs(dx) * 1.1;

  if (isUpSwipe) {
    const ratio = Math.min(1, Math.abs(dy) / 85);
    flashcardEl.style.transform = `translateY(${dy}px) scale(${1 - ratio * 0.04})`;
    document.getElementById('swipe-up-badge').style.opacity = String(ratio);
    document.getElementById('swipe-left-badge').style.opacity = '0';
    document.getElementById('swipe-right-badge').style.opacity = '0';
  } else if (Math.abs(dx) >= 12) {
    const ratio = Math.min(1, Math.abs(dx) / 85);
    flashcardEl.style.transform = `translateX(${dx}px) rotate(${dx * 0.04}deg)`;
    document.getElementById('swipe-left-badge').style.opacity = dx < -12 ? String(ratio) : '0';
    document.getElementById('swipe-right-badge').style.opacity = dx > 12 ? String(ratio) : '0';
    document.getElementById('swipe-up-badge').style.opacity = '0';
  }
}, { passive: true });

flashcardEl.addEventListener('touchend', (e) => {
  if (!swiping || !ui.srsFlipped) return;
  swiping = false;
  const t = e.changedTouches[0];
  const dx = t.clientX - touchStartX;
  const dy = t.clientY - touchStartY;

  if (dy < -75 && Math.abs(dy) > Math.abs(dx) * 1.1) {
    animateAndGrade('hard');
  } else if (dx > 80) {
    animateAndGrade('good');
  } else if (dx < -80) {
    animateAndGrade('again');
  } else {
    flashcardEl.style.transition = 'transform 0.2s ease';
    flashcardEl.style.transform = '';
    document.getElementById('swipe-left-badge').style.opacity = '0';
    document.getElementById('swipe-up-badge').style.opacity = '0';
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

document.getElementById('senior-card-slow').addEventListener('click', (e) => {
  e.stopPropagation();
  const card = state.cards.find((c) => c.id === ui.srsQueue[0]);
  if (card) speakEnglish(card.en, e.currentTarget, 0.62);
});

document.getElementById('senior-card-tip').addEventListener('click', (e) => {
  e.stopPropagation();
  const card = state.cards.find((c) => c.id === ui.srsQueue[0]);
  if (card) openTipModal(card.en, card.tip);
});

document.getElementById('senior-card-show').addEventListener('click', (e) => {
  e.stopPropagation();
  const card = state.cards.find((c) => c.id === ui.srsQueue[0]);
  if (card) openShowModal(card.en, card.cz);
});

document.querySelectorAll('.srs-btn').forEach((btn) => {
  btn.addEventListener('click', () => animateAndGrade(btn.dataset.grade));
});

document.getElementById('srs-practice-extra-btn').addEventListener('click', () => {
  initSrsSession(true);
});

document.getElementById('srs-go-builder-btn').addEventListener('click', () => {
  switchTab('builder');
});

// PC Keyboard Shortcuts for Kartičky (Space + Arrows + 1/2/3)
document.addEventListener('keydown', (e) => {
  if (ui.activeTab !== 'cards' || ui.srsQueue.length === 0) return;
  const tag = document.activeElement?.tagName;
  if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return;
  if (!document.getElementById('mode-modal').hidden || !document.getElementById('guide-modal').hidden) return;

  if (e.code === 'Space' && !ui.srsFlipped) {
    e.preventDefault();
    flipFlashcard();
  } else if (ui.srsFlipped) {
    if (e.key === '1' || e.key === 'ArrowLeft') {
      e.preventDefault();
      animateAndGrade('again');
    } else if (e.key === '2' || e.key === 'ArrowUp') {
      e.preventDefault();
      animateAndGrade('hard');
    } else if (e.key === '3' || e.key === 'ArrowRight') {
      e.preventDefault();
      animateAndGrade('good');
    }
  }
});

// ==========================================
// TAB 4: SLOVÍČKA A SDÍLENÍ (+ 2000 SLOV Z DATA.JS)
// ==========================================
document.querySelectorAll('[data-vtab]').forEach((btn) => {
  btn.addEventListener('click', () => {
    ui.vocabSubTab = btn.dataset.vtab;
    document.querySelectorAll('[data-vtab]').forEach((b) =>
      b.classList.toggle('active', b.dataset.vtab === ui.vocabSubTab)
    );
    document.getElementById('vtab-list').hidden = ui.vocabSubTab !== 'list';
    document.getElementById('vtab-dict').hidden = ui.vocabSubTab !== 'dict';
    document.getElementById('vtab-add').hidden = ui.vocabSubTab !== 'add';
    document.getElementById('vtab-share').hidden = ui.vocabSubTab !== 'share';
    if (ui.vocabSubTab === 'dict') renderDictList(true);
  });
});

function populateTopicSelects() {
  const srsSel = document.getElementById('srs-topic-filter');
  const filterSel = document.getElementById('vocab-topic-filter');
  const dictSel = document.getElementById('dict-topic-filter');
  const addSel = document.getElementById('add-topic');
  const shareSel = document.getElementById('share-topic-select');
  const editSel = document.getElementById('edit-topic');

  TOPICS.forEach((t) => {
    if (srsSel) srsSel.add(new Option(`${t.icon} ${t.shortLabel}`, t.id));
    filterSel.add(new Option(`${t.icon} ${t.label}`, t.id));
    if (dictSel) dictSel.add(new Option(`${t.icon} ${t.label}`, t.id));
    addSel.add(new Option(`${t.icon} ${t.label}`, t.id));
    shareSel.add(new Option(`${t.icon} ${t.label}`, t.id));
    editSel.add(new Option(`${t.icon} ${t.label}`, t.id));
  });
}

// --- 2 000 slov (VOCABULARY z data.js) v záložce Slovíčka ---
let dictLimit = 50;

function getFilteredDictWords() {
  const q = (document.getElementById('dict-search')?.value || '').trim().toLowerCase();
  const topicFilter = document.getElementById('dict-topic-filter')?.value || 'all';
  return getLang().vocabulary.filter((w) => {
    if (topicFilter !== 'all' && w.topic !== topicFilter) return false;
    if (!q) return true;
    return (
      w.en.toLowerCase().includes(q) ||
      w.cz.toLowerCase().includes(q) ||
      (w.phonetic || '').toLowerCase().includes(q)
    );
  });
}

function renderDictList(resetLimit = false) {
  if (resetLimit) dictLimit = 50;
  const listEl = document.getElementById('dict-list');
  const countEl = document.getElementById('dict-count-label');
  const moreBtn = document.getElementById('dict-load-more-btn');
  if (!listEl) return;

  const totalVoc = getLang().vocabulary.length;
  const filtered = getFilteredDictWords();
  countEl.textContent = `${filtered.length.toLocaleString('cs-CZ')} z ${totalVoc.toLocaleString('cs-CZ')} slov`;

  const slice = filtered.slice(0, dictLimit);
  const existingSet = new Set(state.cards.map((c) => c.en.toLowerCase()));
  listEl.innerHTML = '';

  if (!slice.length) {
    listEl.innerHTML = '<div class="card muted-text">Žádné slovíčko neodpovídá hledání.</div>';
    moreBtn.hidden = true;
    return;
  }

  const frag = document.createDocumentFragment();
  slice.forEach((w) => {
    const topicMeta = getTopicMeta(w.topic);
    const isAdded = existingSet.has(w.en.toLowerCase());
    const el = document.createElement('article');
    el.className = 'vocab-item';
    el.innerHTML = `
      <div class="vocab-item-top">
        <span class="topic-tag">${topicMeta.icon} ${topicMeta.shortLabel}</span>
        <div class="vocab-item-actions">
          <button type="button" class="mini-btn dict-spk" title="Poslechnout">🔊</button>
          <button type="button" class="mini-btn dict-add" ${isAdded ? 'disabled' : ''}>${isAdded ? '✓ V kartičkách' : '+ Do kartiček'}</button>
        </div>
      </div>
      <div class="vocab-en"></div>
      <div class="vocab-cz"></div>
      ${w.phonetic ? '<div class="phonetic-text"></div>' : ''}
    `;
    el.querySelector('.vocab-en').textContent = w.en;
    el.querySelector('.vocab-cz').textContent = w.cz;
    if (w.phonetic) el.querySelector('.phonetic-text').textContent = w.phonetic;

    el.querySelector('.dict-spk').addEventListener('click', (e) => speakEnglish(w.en, e.currentTarget, 0.9));
    el.querySelector('.dict-add').addEventListener('click', (e) => {
      if (addVocabWordToCards(w, w.topic)) {
        existingSet.add(w.en.toLowerCase());
        saveState();
        e.currentTarget.textContent = '✓ V kartičkách';
        e.currentTarget.disabled = true;
        showToast(`„${w.en}“ přidáno do kartiček!`);
      }
    });
    frag.appendChild(el);
  });

  listEl.appendChild(frag);
  moreBtn.hidden = slice.length >= filtered.length;
  moreBtn.textContent = `Načíst dalších 50 slovíček (zobrazeno ${slice.length} z ${filtered.length})`;
}

document.getElementById('dict-search').addEventListener('input', () => renderDictList(true));
document.getElementById('dict-topic-filter').addEventListener('change', () => renderDictList(true));
document.getElementById('dict-load-more-btn').addEventListener('click', () => {
  dictLimit += 50;
  renderDictList(false);
});
document.getElementById('dict-add-10-btn').addEventListener('click', () => {
  const filtered = getFilteredDictWords();
  let added = 0;
  for (const w of filtered) {
    if (added >= 10) break;
    if (addVocabWordToCards(w, w.topic)) added++;
  }
  if (added > 0) {
    saveState();
    renderDictList(false);
    renderVocabList();
    showToast(`Přidáno ${added} nových slovíček do kartiček!`);
  } else {
    showToast('Všechna slovíčka z tohoto výběru už máš v kartičkách.');
  }
});

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
  let refreshing = false;
  navigator.serviceWorker.addEventListener('controllerchange', () => {
    if (refreshing) return;
    refreshing = true;
    window.location.reload();
  });
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js', { updateViaCache: 'none' }).then((reg) => {
      reg.update().catch(() => {});
    }).catch(() => {});
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
// TAB 3: MAPA PROGRESU, STATISTIKA ÚSPĚCHU & ODEMYKÁNÍ
// ==========================================
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
  const unlockedIdx = Math.min(TOPICS.length - 1, Math.max(0, state.stats?.unlockedLevel || 0));

  document.getElementById('xp-level-label').textContent = `Úroveň ${level} · ${getLevelTitle(level)}`;
  document.getElementById('xp-sub-label').textContent = `${xp} XP · Odemčeno ${unlockedIdx + 1} z ${TOPICS.length} témat`;
  document.getElementById('xp-badge').textContent = `${xp} XP`;
  document.getElementById('xp-progress-fill').style.width = `${Math.max(6, xpInLevel)}%`;

  // Statistika úspěchu
  const good = state.stats?.totalGood || 0;
  const hard = state.stats?.totalHard || 0;
  const again = state.stats?.totalAgain || 0;
  const totalAns = good + hard + again;
  const accuracyText = totalAns > 0 ? `${Math.round(((good + hard * 0.5) / totalAns) * 100)} %` : '—';

  document.getElementById('stat-accuracy').textContent = accuracyText;
  document.getElementById('stat-mastered').textContent = String(masteredTotal);
  document.getElementById('stat-streak').textContent = String(state.stats?.streak || 0);
  document.getElementById('stat-tests').textContent = String(state.stats?.testsPassed || 0);

  renderDailyQuests();
  const blitzRec = document.getElementById('blitz-record-label');
  if (blitzRec) {
    blitzRec.textContent = `Tvůj rekord: ${state.stats?.bestBlitz || 0} bodů · Překonej sám sebe!`;
  }

  // Banner pro postupový test
  const nextTitle = document.getElementById('next-level-title');
  const nextSub = document.getElementById('next-level-sub');
  const testBtn = document.getElementById('start-level-test-btn');
  if (unlockedIdx < TOPICS.length - 1) {
    const nextTopic = TOPICS[unlockedIdx + 1];
    nextTitle.textContent = `🏆 Test pro odemčení úrovně ${unlockedIdx + 2}: ${nextTopic.shortLabel}`;
    nextSub.textContent = 'Odpověz správně alespoň na 4 z 5 otázek a odemkni další téma (+50 XP).';
    testBtn.textContent = 'Spustit test';
  } else {
    nextTitle.textContent = `🎉 Všech ${TOPICS.length} úrovní máš odemčených!`;
    nextSub.textContent = 'Chceš si prověřit znalosti ze všech témat najednou (+50 XP)?';
    testBtn.textContent = 'Mistrovský test';
  }

  const mapEl = document.getElementById('progress-map');
  mapEl.innerHTML = '';

  TOPICS.forEach((topic, idx) => {
    const topicCards = state.cards.filter((c) => c.topic === topic.id);
    const done = topicCards.filter((c) => (c.reps || 0) >= 1).length;
    const total = topicCards.length;
    const pct = total > 0 ? Math.round((done / total) * 100) : 0;
    const isUnlocked = idx <= unlockedIdx;
    const isNextToUnlock = idx === unlockedIdx + 1;
    const isMastered = isUnlocked && total > 0 && done >= total;

    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = `map-node ${isMastered ? 'mastered' : ''} ${!isUnlocked ? 'locked' : ''}`;
    btn.innerHTML = `
      <div class="map-node-circle">${!isUnlocked ? '🔒' : isMastered ? '✅' : topic.icon}</div>
      <div class="map-node-body">
        <div class="map-node-title">${idx + 1}. ${topic.label}</div>
        <div class="map-node-sub">${
          isUnlocked
            ? `Zvládnuto ${done} / ${total} frází (${pct} %)`
            : isNextToUnlock
              ? 'Zamčeno · Splň postupový test (4/5)'
              : 'Zamčeno · Nejdřív odemkni předchozí úroveň'
        }</div>
        <div class="map-mini-bar"><div class="map-mini-fill" style="width:${isUnlocked ? pct : 0}%"></div></div>
      </div>
      <span class="map-node-go">${isUnlocked ? 'Trénovat ›' : isNextToUnlock ? '🏆 Test ›' : '🔒'}</span>
    `;
    btn.addEventListener('click', () => {
      if (isUnlocked) {
        ui.builderTopic = topic.id;
        ui.tplIndex = 0;
        ui.puzIndex = 0;
        ui.tplSlots = {};
        ui.tplCustomSlots = {};
        ui.activeSlotIdx = null;
        renderBuilderTopics();
        renderTemplate();
        switchTab('builder');
      } else if (isNextToUnlock) {
        openLevelTest(idx);
      } else {
        showToast('Nejdřív odemkni předchozí úroveň pomocí testu 🏆');
      }
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

function createWordPicCard(w, topicId, existingSet) {
  const isAdded = existingSet.has(w.en.toLowerCase());
  const item = document.createElement('div');
  item.className = 'word-pic-card';
  item.innerHTML = `
    <div class="word-pic-emoji">${w.img}</div>
    <div class="word-pic-en"></div>
    <div class="word-pic-cz"></div>
    <div class="word-pic-ph"></div>
    <div class="word-pic-actions">
      <button type="button" class="mini-btn w-speak" title="Poslechnout">🔊</button>
      <button type="button" class="mini-btn w-add" ${isAdded ? 'disabled' : ''}>${isAdded ? '✓' : '+ Přidat'}</button>
    </div>
  `;
  item.querySelector('.word-pic-en').textContent = w.en;
  item.querySelector('.word-pic-cz').textContent = w.cz;
  item.querySelector('.word-pic-ph').textContent = w.phonetic;
  item.querySelector('.w-speak').addEventListener('click', (e) => speakEnglish(w.en, e.currentTarget, 0.9));
  item.querySelector('.w-add').addEventListener('click', (e) => {
    if (addVocabWordToCards(w, topicId)) {
      existingSet.add(w.en.toLowerCase());
      saveState();
      e.currentTarget.textContent = '✓';
      e.currentTarget.disabled = true;
      showToast(`„${w.en}“ přidáno do kartiček!`);
    }
  });
  return item;
}

function renderVocabPacks() {
  const lang = getLang();
  const packs = lang.packs;
  const totalCount = packs.reduce((sum, p) => sum + p.words.length, 0);
  const heading = document.getElementById('vocab-packs-heading');
  if (heading) heading.textContent = `🖼️ Slovník ${lang.label} (${totalCount.toLocaleString('cs-CZ')} slovíček)`;

  const container = document.getElementById('vocab-packs-container');
  container.innerHTML = '';
  const existingSet = new Set(state.cards.map((c) => c.en.toLowerCase()));

  packs.forEach((pack) => {
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
        <div class="pack-add-all-row btn-grid-2">
          <button type="button" class="btn btn-primary pack-add-10-btn">+ Přidat 10 nových</button>
          <button type="button" class="btn btn-secondary pack-add-all-btn">+ Všech ${pack.words.length}</button>
        </div>
        <div class="pack-words-grid"></div>
      </div>
    `;

    details.querySelector('.pack-add-10-btn').addEventListener('click', () => {
      let added = 0;
      for (const w of pack.words) {
        if (added >= 10) break;
        if (addVocabWordToCards(w, pack.topic)) added++;
      }
      if (added > 0) {
        saveState();
        renderVocabPacks();
        renderProgressMap();
        showToast(`Přidáno ${added} nových slovíček do kartiček!`);
      } else {
        showToast('Všechna slovíčka z balíčku už máš v kartičkách.');
      }
    });

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

    // Lazy render slovíček až při rozkliknutí balíčku (blesková rychlost na mobilu!)
    let rendered = false;
    details.addEventListener('toggle', () => {
      if (!details.open || rendered) return;
      rendered = true;
      const grid = details.querySelector('.pack-words-grid');
      const frag = document.createDocumentFragment();
      pack.words.forEach((w) => frag.appendChild(createWordPicCard(w, pack.topic, existingSet)));
      grid.appendChild(frag);
    });

    container.appendChild(details);
  });
}

document.getElementById('bank-search').addEventListener('input', (e) => {
  const q = e.target.value.trim().toLowerCase();
  const resEl = document.getElementById('bank-search-results');
  const packsEl = document.getElementById('vocab-packs-container');

  if (!q) {
    resEl.hidden = true;
    resEl.innerHTML = '';
    packsEl.hidden = false;
    return;
  }

  packsEl.hidden = true;
  resEl.hidden = false;
  resEl.innerHTML = '';

  const existingSet = new Set(state.cards.map((c) => c.en.toLowerCase()));
  const matches = [];
  for (const pack of getLang().packs) {
    for (const w of pack.words) {
      if (w.en.toLowerCase().includes(q) || w.cz.toLowerCase().includes(q)) {
        matches.push({ w, topic: pack.topic });
        if (matches.length >= 36) break;
      }
    }
    if (matches.length >= 36) break;
  }

  if (!matches.length) {
    resEl.innerHTML = '<div class="muted-text" style="grid-column:1/-1;">Žádné slovíčko nenalezeno.</div>';
    return;
  }

  const frag = document.createDocumentFragment();
  matches.forEach(({ w, topic }) => frag.appendChild(createWordPicCard(w, topic, existingSet)));
  resEl.appendChild(frag);
});

// ==========================================
// TEST PRO POSTUP NA DALŠÍ ÚROVEŇ (5 OTÁZEK)
// ==========================================
const levelTest = {
  targetLevelIdx: 1,
  questions: [],
  current: 0,
  score: 0,
  answered: false
};

function openLevelTest(targetLevelIdx) {
  const unlockedIdx = Math.min(TOPICS.length - 1, Math.max(0, state.stats?.unlockedLevel || 0));
  const isMastery = targetLevelIdx >= TOPICS.length;
  levelTest.targetLevelIdx = isMastery ? TOPICS.length - 1 : targetLevelIdx;
  levelTest.current = 0;
  levelTest.score = 0;
  levelTest.answered = false;

  // Vyber otázky z aktuálně odemčených témat (přednostně z posledního odemčeného tématu)
  const langPhrases = getLang().phrases;
  const sourceTopicId = TOPICS[Math.max(0, levelTest.targetLevelIdx - 1)]?.id || 'general';
  let pool = state.cards.filter((c) => c.topic === sourceTopicId);
  if (pool.length < 5) {
    pool = [...pool, ...langPhrases.filter((p) => p.topic === sourceTopicId)];
  }
  if (pool.length < 5) {
    pool = state.cards.length >= 5 ? state.cards : langPhrases;
  }

  const uniquePool = [];
  const seenEn = new Set();
  shuffleArray(pool).forEach((item) => {
    if (!seenEn.has(item.en.toLowerCase())) {
      seenEn.add(item.en.toLowerCase());
      uniquePool.push(item);
    }
  });

  const allDistractors = langPhrases.concat(state.cards);
  levelTest.questions = uniquePool.slice(0, 5).map((q) => {
    const wrongs = [];
    const used = new Set([q.en.toLowerCase()]);
    for (const cand of shuffleArray(allDistractors)) {
      const k = cand.en.toLowerCase();
      if (!used.has(k)) {
        used.add(k);
        wrongs.push(cand.en);
        if (wrongs.length === 3) break;
      }
    }
    return {
      cz: q.cz,
      en: q.en,
      options: shuffleArray([q.en, ...wrongs])
    };
  });

  const targetTopic = TOPICS[levelTest.targetLevelIdx];
  document.getElementById('lt-title').textContent = isMastery
    ? '🏆 Mistrovský test ze všech témat'
    : `🏆 Test pro úroveň ${levelTest.targetLevelIdx + 1}: ${targetTopic.shortLabel}`;
  document.getElementById('lt-quiz-body').hidden = false;
  document.getElementById('lt-result-body').hidden = true;
  document.getElementById('level-test-modal').hidden = false;
  renderLevelTestQuestion();
}

function renderLevelTestQuestion() {
  const q = levelTest.questions[levelTest.current];
  if (!q) {
    finishLevelTest();
    return;
  }
  levelTest.answered = false;
  const total = levelTest.questions.length;
  document.getElementById('lt-q-counter').textContent = `Otázka ${levelTest.current + 1} / ${total}`;
  document.getElementById('lt-score-live').textContent = `Správně: ${levelTest.score}`;
  document.getElementById('lt-progress-fill').style.width = `${Math.round(((levelTest.current + 1) / total) * 100)}%`;
  document.getElementById('lt-question-cz').textContent = q.cz;

  const fb = document.getElementById('lt-feedback');
  fb.textContent = '';
  fb.className = 'lt-feedback';
  document.getElementById('lt-speak-btn').hidden = true;
  document.getElementById('lt-next-btn').hidden = true;

  const optsEl = document.getElementById('lt-options');
  optsEl.innerHTML = '';
  q.options.forEach((optText) => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'lt-opt-btn';
    btn.textContent = optText;
    btn.addEventListener('click', () => handleLevelTestAnswer(optText, btn, q));
    optsEl.appendChild(btn);
  });
}

function handleLevelTestAnswer(chosen, btnEl, q) {
  if (levelTest.answered) return;
  levelTest.answered = true;

  const isCorrect = chosen === q.en;
  const fb = document.getElementById('lt-feedback');
  document.querySelectorAll('.lt-opt-btn').forEach((b) => {
    b.disabled = true;
    if (b.textContent === q.en) b.classList.add('correct');
  });

  if (isCorrect) {
    levelTest.score++;
    state.stats.totalGood = (state.stats.totalGood || 0) + 1;
    fb.textContent = '✅ Správně!';
    fb.className = 'lt-feedback ok';
  } else {
    btnEl.classList.add('wrong');
    state.stats.totalAgain = (state.stats.totalAgain || 0) + 1;
    fb.textContent = `✕ Správně je: ${q.en}`;
    fb.className = 'lt-feedback err';
  }
  document.getElementById('lt-score-live').textContent = `Správně: ${levelTest.score}`;
  const spkBtn = document.getElementById('lt-speak-btn');
  if (spkBtn) {
    spkBtn.hidden = false;
    spkBtn.dataset.text = q.en;
  }
  const nextBtn = document.getElementById('lt-next-btn');
  nextBtn.textContent =
    levelTest.current + 1 < levelTest.questions.length ? 'Další otázka →' : 'Zobrazit výsledek 🏆';
  nextBtn.hidden = false;
  saveState();
}

function finishLevelTest() {
  const total = levelTest.questions.length;
  const passed = levelTest.score >= Math.ceil(total * 0.8);

  document.getElementById('lt-quiz-body').hidden = true;
  document.getElementById('lt-result-body').hidden = false;

  if (passed) {
    const wasLocked = (state.stats.unlockedLevel || 0) < levelTest.targetLevelIdx;
    if (wasLocked) {
      state.stats.unlockedLevel = levelTest.targetLevelIdx;
    }
    state.stats.xp = (state.stats.xp || 0) + 50;
    state.stats.testsPassed = (state.stats.testsPassed || 0) + 1;
    saveState();
    renderProgressMap();

    document.getElementById('lt-res-emoji').textContent = '🏆';
    document.getElementById('lt-res-title').textContent = wasLocked
      ? `Úroveň ${levelTest.targetLevelIdx + 1} odemčena!`
      : 'Test úspěšně splněn!';
    document.getElementById('lt-res-text').textContent =
      `Skóre ${levelTest.score} z ${total} (+50 XP). Nové téma je připravené k tréninku!`;
    document.getElementById('lt-retry-btn').hidden = true;
    launchConfetti();
  } else {
    document.getElementById('lt-res-emoji').textContent = '💪';
    document.getElementById('lt-res-title').textContent = 'Ještě kousek chybí!';
    document.getElementById('lt-res-text').textContent =
      `Získal jsi ${levelTest.score} z ${total} bodů. Pro odemčení potřebuješ alespoň 4 správné odpovědi.`;
    document.getElementById('lt-retry-btn').hidden = false;
  }
}

function closeLevelTestModal() {
  document.getElementById('level-test-modal').hidden = true;
}

document.getElementById('start-level-test-btn').addEventListener('click', () => {
  const unlockedIdx = Math.min(TOPICS.length - 1, Math.max(0, state.stats?.unlockedLevel || 0));
  openLevelTest(unlockedIdx < TOPICS.length - 1 ? unlockedIdx + 1 : TOPICS.length);
});
document.getElementById('lt-next-btn').addEventListener('click', () => {
  levelTest.current++;
  renderLevelTestQuestion();
});
document.getElementById('lt-retry-btn').addEventListener('click', () => {
  openLevelTest(levelTest.targetLevelIdx);
});
document.getElementById('lt-close-btn').addEventListener('click', closeLevelTestModal);
document.getElementById('lt-done-btn').addEventListener('click', closeLevelTestModal);
document.getElementById('level-test-modal').addEventListener('click', (e) => {
  if (e.target.id === 'level-test-modal') closeLevelTestModal();
});

// ==========================================
// ÚVODNÍ 4KROKOVÝ PRŮVODCE (TUTORIAL + PROFIL)
// ==========================================
let tutStep = 0;
let tutSelectedGoal = 10;
let tutSelectedProfile = 'young';

function renderTutorialStep() {
  document.querySelectorAll('.tut-step').forEach((el) => {
    el.hidden = Number(el.dataset.step) !== tutStep;
  });
  document.querySelectorAll('#tut-dots .tut-dot').forEach((dot, idx) => {
    dot.classList.toggle('active', idx === tutStep);
  });
  document.getElementById('tut-prev-btn').textContent = tutStep === 0 ? 'Přeskočit' : '← Zpět';
  document.getElementById('tut-next-btn').textContent = tutStep === 3 ? 'Začít trénovat! 🚀' : 'Další →';
}

function openTutorialModal() {
  tutStep = 0;
  tutSelectedGoal = state.stats?.dailyGoal || 10;
  tutSelectedProfile = localStorage.getItem(PROFILE_KEY) || 'young';
  document.querySelectorAll('#tut-profile-choices .mode-choice-card').forEach((btn) => {
    btn.classList.toggle('selected-choice', btn.dataset.profile === tutSelectedProfile);
  });
  document.querySelectorAll('#tut-goal-choices .goal-pill-btn').forEach((btn) => {
    btn.classList.toggle('selected-choice', Number(btn.dataset.goal) === tutSelectedGoal);
  });
  renderTutorialStep();
  document.getElementById('mode-modal').hidden = false;
}

function finishTutorial() {
  state.tutorialSeen = true;
  state.stats.dailyGoal = tutSelectedGoal;
  applyUserProfile(tutSelectedProfile);
  saveState();
  updateDailyGoalUI();
  document.getElementById('mode-modal').hidden = true;
  showToast(
    tutSelectedProfile === 'senior'
      ? `Pohodový režim zapnut 🌿 (cíl ${tutSelectedGoal} karet)`
      : `Herní režim zapnut ⚡ (cíl ${tutSelectedGoal} karet)`
  );
}

document.querySelectorAll('#tut-profile-choices .mode-choice-card').forEach((btn) => {
  btn.addEventListener('click', () => {
    tutSelectedProfile = btn.dataset.profile === 'senior' ? 'senior' : 'young';
    document.querySelectorAll('#tut-profile-choices .mode-choice-card').forEach((b) =>
      b.classList.toggle('selected-choice', b === btn)
    );
  });
});

document.querySelectorAll('#tut-goal-choices .goal-pill-btn').forEach((btn) => {
  btn.addEventListener('click', () => {
    tutSelectedGoal = Number(btn.dataset.goal) || 10;
    document.querySelectorAll('#tut-goal-choices .goal-pill-btn').forEach((b) =>
      b.classList.toggle('selected-choice', b === btn)
    );
  });
});

document.getElementById('tut-prev-btn').addEventListener('click', () => {
  if (tutStep === 0) {
    finishTutorial();
  } else {
    tutStep--;
    renderTutorialStep();
  }
});

document.getElementById('tut-next-btn').addEventListener('click', () => {
  if (tutStep < 3) {
    tutStep++;
    renderTutorialStep();
  } else {
    finishTutorial();
  }
});

document.getElementById('guide-replay-tutorial').addEventListener('click', () => {
  closeGuideModal();
  openTutorialModal();
});

document.getElementById('lt-speak-btn').addEventListener('click', (e) => {
  const txt = e.currentTarget.dataset.text;
  if (txt) speakEnglish(txt, e.currentTarget, 0.9);
});

// ==========================================
// PŘEPÍNAČ JAZYKŮ (🇬🇧 EN / 🇩🇪 DE / 🇵🇱 PL / 🇪🇸 ES)
// ==========================================
function syncLangUI() {
  const lang = getLang();
  const sel = document.getElementById('lang-select');
  if (sel) sel.value = lang.code;

  const dictBtn = document.getElementById('dict-subtab-btn');
  if (dictBtn) dictBtn.textContent = `📖 ${lang.vocabulary.length.toLocaleString('cs-CZ')} slov`;

  const customSlot = document.getElementById('tpl-custom-slot-input');
  if (customSlot) customSlot.placeholder = `✏️ Nebo napiš vlastní ${lang.adj} slovo…`;

  const addLbl = document.getElementById('add-en-label');
  if (addLbl) addLbl.textContent = `${lang.adjCap} věta`;

  const editLbl = document.getElementById('edit-en-label');
  if (editLbl) editLbl.textContent = `${lang.adjCap} věta`;

  const ltPrompt = document.getElementById('lt-prompt-label');
  if (ltPrompt) ltPrompt.textContent = `Vyber správný ${lang.adjMasc} překlad:`;

  const cardBackHint = document.getElementById('card-lang-back-hint');
  if (cardBackHint) cardBackHint.textContent = lang.upper;

  const codeUpper = lang.code.toUpperCase();
  const bankSearch = document.getElementById('bank-search');
  if (bankSearch) bankSearch.placeholder = `Hledat ve 2 000 slovíčkách (CZ / ${codeUpper})…`;

  const dictSearch = document.getElementById('dict-search');
  if (dictSearch) dictSearch.placeholder = `Hledat ve 2 000 slovíčkách (CZ / ${codeUpper})…`;

  const vocabSearch = document.getElementById('vocab-search');
  if (vocabSearch) vocabSearch.placeholder = `Hledat česky, ${lang.adv} nebo téma…`;
}

document.getElementById('lang-select').addEventListener('change', async (e) => {
  const nextCode = e.target.value;
  if (!LANGUAGES[nextCode] || nextCode === activeLangCode) return;
  const prevTheme = state.theme;
  activeLangCode = nextCode;
  localStorage.setItem(ACTIVE_LANG_KEY, activeLangCode);

  await ensureLanguageLoaded(activeLangCode);
  state = loadState();
  state.theme = prevTheme;
  saveState();

  ui.tplIndex = 0;
  ui.puzIndex = 0;
  ui.tplSlots = {};
  ui.tplCustomSlots = {};
  ui.activeSlotIdx = null;
  ui.shareSelectedIds.clear();

  syncLangUI();
  updateDueIndicators();
  renderTemplate();
  if (ui.activeTab === 'cards') initSrsSession();
  else if (ui.activeTab === 'builder' && ui.builderMode === 'puzzle') setupPuzzle();
  else if (ui.activeTab === 'journey') {
    renderProgressMap();
    renderVocabPacks();
  } else if (ui.activeTab === 'vocab') {
    renderVocabList();
    renderDictList(true);
    renderShareChecklist();
  }
  showToast(`Přepnuto na: ${getLang().label}`);
});

// ==========================================
// KONFETY (TICHÁ OSLAVA ÚSPĚCHU)
// ==========================================
function launchConfetti() {
  const canvas = document.getElementById('confetti-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  const colors = ['#58CC02', '#1CB0F6', '#FF9600', '#FFC800', '#FF4B4B', '#CE82FF'];
  const pieces = Array.from({ length: 65 }, () => ({
    x: canvas.width * (0.15 + Math.random() * 0.7),
    y: -10 - Math.random() * 60,
    vx: (Math.random() - 0.5) * 6,
    vy: 3 + Math.random() * 5,
    size: 6 + Math.random() * 6,
    rot: Math.random() * Math.PI * 2,
    vrot: (Math.random() - 0.5) * 0.25,
    color: colors[Math.floor(Math.random() * colors.length)]
  }));

  let frame = 0;
  function tick() {
    frame++;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    pieces.forEach((p) => {
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.12;
      p.rot += p.vrot;
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rot);
      ctx.fillStyle = p.color;
      ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.65);
      ctx.restore();
    });
    if (frame < 85) {
      requestAnimationFrame(tick);
    } else {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  }
  requestAnimationFrame(tick);
}

// ==========================================
// DENNÍ MISE (3 DENNÍ VÝZVY)
// ==========================================
function getDailyQuests() {
  const goal = state.stats?.dailyGoal || 10;
  const rev = state.stats?.reviewedToday || 0;
  const puz = state.stats?.puzzlesToday || 0;
  return [
    { id: 'q-rev5', icon: '🃏', title: 'Zopakuj 5 kartiček', current: Math.min(5, rev), target: 5, xp: 25 },
    { id: 'q-puz2', icon: '🧱', title: 'Slož 2 věty ve Skládačce', current: Math.min(2, puz), target: 2, xp: 30 },
    { id: 'q-goal', icon: '🎯', title: `Splň svůj denní cíl (${goal})`, current: Math.min(goal, rev), target: goal, xp: 50 }
  ];
}

function checkDailyQuests() {
  if (!Array.isArray(state.stats.claimedQuests)) state.stats.claimedQuests = [];
  const quests = getDailyQuests();
  let newlyCompleted = false;
  quests.forEach((q) => {
    if (q.current >= q.target && !state.stats.claimedQuests.includes(q.id)) {
      state.stats.claimedQuests.push(q.id);
      state.stats.xp = (state.stats.xp || 0) + q.xp;
      newlyCompleted = true;
      showToast(`🎯 Mise splněna: ${q.title} (+${q.xp} XP)!`);
    }
  });
  if (newlyCompleted) {
    launchConfetti();
  }
}

function renderDailyQuests() {
  const el = document.getElementById('daily-quests-list');
  if (!el) return;
  const quests = getDailyQuests();
  el.innerHTML = '';
  quests.forEach((q) => {
    const isDone = q.current >= q.target;
    const pct = Math.min(100, Math.round((q.current / q.target) * 100));
    const item = document.createElement('div');
    item.className = `quest-item ${isDone ? 'done' : ''}`;
    item.innerHTML = `
      <div class="quest-icon">${isDone ? '✓' : q.icon}</div>
      <div class="quest-body">
        <div class="quest-title-row">
          <span class="quest-title">${q.title} (${q.current}/${q.target})</span>
          <span class="quest-reward">${isDone ? 'Hotovo ✓' : `+${q.xp} XP`}</span>
        </div>
        <div class="map-mini-bar"><div class="map-mini-fill" style="width:${pct}%"></div></div>
      </div>
    `;
    el.appendChild(item);
  });
}

// ==========================================
// BLESKOVÁ VÝZVA 60 s (HERNÍ REŽIM)
// ==========================================
const blitz = {
  timerId: null,
  timeLeft: 60,
  score: 0,
  combo: 0,
  pool: []
};

function stopBlitzTimer() {
  if (blitz.timerId) {
    clearInterval(blitz.timerId);
    blitz.timerId = null;
  }
}

function openBlitzChallenge() {
  stopBlitzTimer();
  const lang = getLang();
  const source = state.cards.length >= 8 ? state.cards : lang.phrases.concat(lang.vocabulary.slice(0, 60));
  const seen = new Set();
  blitz.pool = [];
  source.forEach((item) => {
    const en = item.en ?? item.target ?? '';
    if (en && item.cz && !seen.has(en.toLowerCase())) {
      seen.add(en.toLowerCase());
      blitz.pool.push({ cz: item.cz, en });
    }
  });
  if (blitz.pool.length < 4) {
    showToast('Přidej si víc slovíček pro Bleskovou výzvu.');
    return;
  }

  blitz.timeLeft = 60;
  blitz.score = 0;
  blitz.combo = 0;

  document.getElementById('blitz-play-body').hidden = false;
  document.getElementById('blitz-result-body').hidden = true;
  document.getElementById('blitz-modal').hidden = false;
  updateBlitzHud();
  renderBlitzQuestion();

  blitz.timerId = setInterval(() => {
    blitz.timeLeft--;
    updateBlitzHud();
    if (blitz.timeLeft <= 0) {
      finishBlitz();
    }
  }, 1000);
}

function updateBlitzHud() {
  document.getElementById('blitz-timer').textContent = `⏱️ ${blitz.timeLeft} s`;
  document.getElementById('blitz-score').textContent = `Skóre: ${blitz.score}`;
  document.getElementById('blitz-time-bar').style.width = `${Math.max(0, Math.round((blitz.timeLeft / 60) * 100))}%`;
  const comboEl = document.getElementById('blitz-combo');
  if (blitz.combo >= 2) {
    comboEl.textContent = `🔥 ${blitz.combo}×`;
    comboEl.hidden = false;
  } else {
    comboEl.hidden = true;
  }
}

function renderBlitzQuestion() {
  const q = blitz.pool[Math.floor(Math.random() * blitz.pool.length)];
  const wrongs = [];
  const used = new Set([q.en.toLowerCase()]);
  for (const cand of shuffleArray(blitz.pool)) {
    if (!used.has(cand.en.toLowerCase())) {
      used.add(cand.en.toLowerCase());
      wrongs.push(cand.en);
      if (wrongs.length === 3) break;
    }
  }
  const options = shuffleArray([q.en, ...wrongs]);

  document.getElementById('blitz-question-cz').textContent = q.cz;
  const optsEl = document.getElementById('blitz-options');
  optsEl.innerHTML = '';
  options.forEach((opt) => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'lt-opt-btn';
    btn.textContent = opt;
    btn.addEventListener('click', () => {
      if (opt === q.en) {
        blitz.combo++;
        blitz.score += 10 + Math.min(20, (blitz.combo - 1) * 5);
        btn.classList.add('correct');
        navigator.vibrate?.(12);
      } else {
        blitz.combo = 0;
        btn.classList.add('wrong');
      }
      updateBlitzHud();
      setTimeout(() => {
        if (blitz.timeLeft > 0) renderBlitzQuestion();
      }, 180);
    });
    optsEl.appendChild(btn);
  });
}

function finishBlitz() {
  stopBlitzTimer();
  document.getElementById('blitz-play-body').hidden = true;
  document.getElementById('blitz-result-body').hidden = false;

  const prevBest = state.stats.bestBlitz || 0;
  const isNewRecord = blitz.score > prevBest;
  if (isNewRecord) {
    state.stats.bestBlitz = blitz.score;
  }
  const xpEarned = Math.min(60, Math.round(blitz.score / 5));
  state.stats.xp = (state.stats.xp || 0) + xpEarned;
  markTodayActive();
  saveState();
  if (ui.activeTab === 'journey') renderProgressMap();

  document.getElementById('blitz-res-emoji').textContent = isNewRecord ? '🏆' : '⚡';
  document.getElementById('blitz-res-title').textContent = isNewRecord ? 'Nový osobní rekord!' : 'Skvělá jízda!';
  document.getElementById('blitz-res-text').textContent =
    `Získal jsi ${blitz.score} bodů (+${xpEarned} XP). Tvůj nejlepší rekord je ${state.stats.bestBlitz} bodů.`;

  if (isNewRecord && blitz.score > 0) launchConfetti();
}

function closeBlitzModal() {
  stopBlitzTimer();
  document.getElementById('blitz-modal').hidden = true;
}

document.getElementById('map-blitz-btn').addEventListener('click', openBlitzChallenge);
document.getElementById('srs-blitz-btn').addEventListener('click', openBlitzChallenge);
document.getElementById('blitz-again-btn').addEventListener('click', openBlitzChallenge);
document.getElementById('blitz-close-btn').addEventListener('click', closeBlitzModal);
document.getElementById('blitz-done-btn').addEventListener('click', closeBlitzModal);
document.getElementById('blitz-modal').addEventListener('click', (e) => {
  if (e.target.id === 'blitz-modal') closeBlitzModal();
});

// ==========================================
// PROFIL APLIKACE (⚡ HERNÍ MLADÍ vs 🌿 POHODOVÝ SENIOŘI)
// ==========================================
const PROFILE_KEY = 'ticha_ui_profile';

function applyUserProfile(profile) {
  const isSenior = profile === 'senior';
  document.documentElement.dataset.profile = isSenior ? 'senior' : 'young';
  localStorage.setItem(PROFILE_KEY, isSenior ? 'senior' : 'young');
  const yBtn = document.getElementById('profile-young-btn');
  const sBtn = document.getElementById('profile-senior-btn');
  if (yBtn) yBtn.classList.toggle('active-mode', !isSenior);
  if (sBtn) sBtn.classList.toggle('active-mode', isSenior);
}

document.getElementById('profile-young-btn').addEventListener('click', () => {
  applyUserProfile('young');
  showToast('Přepnuto na Herní režim (Mladí) ⚡');
});

document.getElementById('profile-senior-btn').addEventListener('click', () => {
  applyUserProfile('senior');
  showToast('Přepnuto na Pohodový režim (Senioři) 🌿');
});

// --- Init App (Kartičky jako 1. výchozí záložka!) ---
async function initApp() {
  applyUserProfile(localStorage.getItem(PROFILE_KEY) || 'young');
  populateTopicSelects();
  await ensureLanguageLoaded(activeLangCode);
  state = loadState();
  syncLangUI();
  applyTheme(state.theme);
  renderBuilderTopics();
  renderTemplate();
  updateDueIndicators();
  checkUrlPack();
  initSrsSession();
  if (!state.tutorialSeen) {
    openTutorialModal();
  }
}

initApp();
