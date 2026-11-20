import { VOCAB_PART_1 } from './vocab-p1.js';
import { VOCAB_PART_2 } from './vocab-p2.js';
import { VOCAB_PART_3 } from './vocab-p3.js';
import { VOCAB_PART_4 } from './vocab-p4.js';

function parseRawWords(raw) {
  return raw
    .trim()
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const [en, cz, ph, img] = line.split('|');
      return {
        en: (en || '').trim(),
        cz: (cz || '').trim(),
        phonetic: ph ? `[${ph.trim()}]` : '',
        img: (img || '💬').trim()
      };
    });
}

const ALL_RAW_PACKS = [
  ...VOCAB_PART_1,
  ...VOCAB_PART_2,
  ...VOCAB_PART_3,
  ...VOCAB_PART_4
];

export const VOCAB_PACKS = ALL_RAW_PACKS.map((p) => ({
  id: p.id,
  topic: p.topic,
  title: p.title,
  icon: p.icon,
  color: p.color,
  words: parseRawWords(p.raw)
}));

export const TOTAL_VOCAB_COUNT = VOCAB_PACKS.reduce((sum, p) => sum + p.words.length, 0);
