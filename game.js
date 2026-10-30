(() => {
  'use strict';

  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];
  const clamp = (n, min, max) => Math.max(min, Math.min(max, n));
  const rand = (min, max) => min + Math.random() * (max - min);
  const pick = arr => arr[Math.floor(Math.random() * arr.length)];
  const shuffle = arr => {
    const out = arr.slice();
    for (let i = out.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [out[i], out[j]] = [out[j], out[i]];
    }
    return out;
  };

  const STAT_KEYS = ['pwr', 'tgh', 'spd', 'cha'];
  const STATS = {
    pwr: { label: 'POWER', short: 'PWR', icon: 'pwr' },
    tgh: { label: 'TOUGHNESS', short: 'TGH', icon: 'tgh' },
    spd: { label: 'SPEED', short: 'SPD', icon: 'spd' },
    cha: { label: 'CHARISMA', short: 'CHA', icon: 'cha' }
  };
  const ICONS = {
    pwr: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8.2 10.2V5.8a1.3 1.3 0 0 1 2.6 0v3.6-5a1.3 1.3 0 0 1 2.6 0v5-4.1a1.3 1.3 0 0 1 2.6 0v5.1-2.8a1.3 1.3 0 0 1 2.6 0v5.9c0 3.9-2.5 6.5-6.1 6.5-3 0-5-1.6-6.1-4.2l-2-4.6a1.4 1.4 0 0 1 2.5-1.2l1.3 2.9Z" fill="currentColor"/></svg>',
    tgh: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.5 20 5v6.1c0 5.1-3.2 8.5-8 10.4-4.8-1.9-8-5.3-8-10.4V5l8-2.5Z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/><path d="M12 6.2 16.6 8v3.2c0 3-1.8 5.2-4.6 6.6-2.8-1.4-4.6-3.6-4.6-6.6V8L12 6.2Z" fill="currentColor" opacity=".42"/></svg>',
    spd: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m13.2 2-8 11h5.3l-1.7 9 8.2-12.2h-5.2L13.2 2Z" fill="currentColor"/></svg>',
    cha: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m12 2.8 2.8 5.7 6.3.9-4.6 4.5 1.1 6.3-5.6-3-5.6 3 1.1-6.3L3 9.4l6.2-.9L12 2.8Z" fill="currentColor"/></svg>'
  };

  const TIERS = {
    IMMORTAL: { accent: '#f6c453', accent2: '#8f5710' },
    LEGENDARY: { accent: '#ff9747', accent2: '#9c3f08' },
    'ULTRA RARE': { accent: '#b981ff', accent2: '#4b1c88' },
    EPIC: { accent: '#ff67ad', accent2: '#881046' },
    RARE: { accent: '#5ec4ff', accent2: '#145c93' }
  };

  const ROSTER = [
    {
      id: 'roman', pos: '50% 15%', name: 'ROMAN REIGNS', sub: 'THE TRIBAL CHIEF', brand: 'SMACKDOWN', tier: 'IMMORTAL', ovr: 99,
      stats: { pwr: 97, tgh: 96, spd: 88, cha: 99 }, ability: 'SPEAR',
      skin: '#b77a55', skinShade: '#8c5538', hair: '#0a080b', hairStyle: 'long', beard: true,
      gear: '#111014', gear2: '#a91622', bg: '#320d18', bg2: '#070509', eye: '#24140f', tattoo: true, brow: '#151013'
    },
    {
      id: 'taker', pos: '50% 6%', name: 'THE UNDERTAKER', sub: 'THE PHENOM', brand: 'LEGENDS', tier: 'IMMORTAL', ovr: 97,
      stats: { pwr: 96, tgh: 99, spd: 76, cha: 97 }, ability: 'TOMBSTONE',
      skin: '#bca39a', skinShade: '#8d716c', hair: '#0a090c', hairStyle: 'hat', beard: true, goatee: true,
      gear: '#17111e', gear2: '#6e43a5', bg: '#241032', bg2: '#070509', eye: '#1b1112', brow: '#0a080c'
    },
    {
      id: 'becky', pos: '50% 4%', name: 'BECKY LYNCH', sub: 'THE MAN', brand: 'RAW', tier: 'LEGENDARY', ovr: 96,
      stats: { pwr: 89, tgh: 91, spd: 95, cha: 98 }, ability: 'DIS-ARM-HER',
      skin: '#e5b08c', skinShade: '#b77d5f', hair: '#b64718', hairStyle: 'ponytail', beard: false, sunglasses: true,
      gear: '#111014', gear2: '#4b9f45', bg: '#112a18', bg2: '#070509', eye: '#24150f', brow: '#7c2c10'
    },
    {
      id: 'bianca', pos: '50% 18%', name: 'BIANCA BELAIR', sub: 'THE EST', brand: 'SMACKDOWN', tier: 'LEGENDARY', ovr: 95,
      stats: { pwr: 94, tgh: 89, spd: 96, cha: 96 }, ability: 'K.O.D.',
      skin: '#925d3f', skinShade: '#693b29', hair: '#2d1710', hairStyle: 'braid', beard: false, headband: '#5dc8ff',
      gear: '#e7e2db', gear2: '#3aa9e8', bg: '#0d2230', bg2: '#070509', eye: '#1a0e09', brow: '#21120c'
    },
    {
      id: 'seth', pos: '50% 16%', name: 'SETH ROLLINS', sub: 'THE VISIONARY', brand: 'RAW', tier: 'ULTRA RARE', ovr: 94,
      stats: { pwr: 91, tgh: 88, spd: 96, cha: 95 }, ability: 'CURB STOMP',
      skin: '#d69b76', skinShade: '#a76a4b', hair: '#d8b25c', hairStyle: 'twoTone', beard: true,
      gear: '#171018', gear2: '#20b7b0', bg: '#0c2a2b', bg2: '#070509', eye: '#21130c', brow: '#2a1a10'
    },
    {
      id: 'rhea', pos: '50% 5%', name: 'RHEA RIPLEY', sub: 'THE ERADICATOR', brand: 'RAW', tier: 'ULTRA RARE', ovr: 95,
      stats: { pwr: 95, tgh: 94, spd: 89, cha: 95 }, ability: 'RIPTIDE',
      skin: '#e6c1ad', skinShade: '#b88b79', hair: '#111014', hairStyle: 'spiky', beard: false,
      gear: '#141016', gear2: '#8840c7', bg: '#29122f', bg2: '#070509', eye: '#24151a', brow: '#151013'
    },
    {
      id: 'cody', pos: '50% 11%', name: 'CODY RHODES', sub: 'THE AMERICAN NIGHTMARE', brand: 'SMACKDOWN', tier: 'LEGENDARY', ovr: 94,
      stats: { pwr: 92, tgh: 90, spd: 92, cha: 97 }, ability: 'CROSS RHODES',
      skin: '#d99e78', skinShade: '#aa6c4d', hair: '#d8bd72', hairStyle: 'short', beard: true, mustache: true,
      gear: '#151318', gear2: '#b3192a', bg: '#2d0d18', bg2: '#070509', eye: '#24150d', brow: '#5b4422'
    },
    {
      id: 'aj', pos: '50% 4%', name: 'AJ STYLES', sub: 'THE PHENOMENAL ONE', brand: 'RAW', tier: 'ULTRA RARE', ovr: 92,
      stats: { pwr: 88, tgh: 87, spd: 97, cha: 94 }, ability: 'PHENOMENAL FOREARM',
      skin: '#c98d66', skinShade: '#9b6243', hair: '#2a1a12', hairStyle: 'short', beard: true,
      gear: '#15131a', gear2: '#3a8ddb', bg: '#0c2037', bg2: '#070509', eye: '#21130c', brow: '#1b110b'
    },
    {
      id: 'charlotte', pos: '50% 3%', name: 'CHARLOTTE FLAIR', sub: 'THE QUEEN', brand: 'SMACKDOWN', tier: 'LEGENDARY', ovr: 93,
      stats: { pwr: 90, tgh: 92, spd: 94, cha: 95 }, ability: 'NATURAL SELECTION',
      skin: '#d7a07f', skinShade: '#a86c50', hair: '#dfc27e', hairStyle: 'longBlonde', beard: false,
      gear: '#14121a', gear2: '#2d64c9', bg: '#111d39', bg2: '#070509', eye: '#24160f', brow: '#6b562b'
    },
    {
      id: 'drew', pos: '50% 6%', name: 'DREW McINTYRE', sub: 'THE SCOTTISH PSYCHO', brand: 'RAW', tier: 'ULTRA RARE', ovr: 94,
      stats: { pwr: 96, tgh: 93, spd: 85, cha: 91 }, ability: 'CLAYMORE',
      skin: '#d7a58a', skinShade: '#aa755a', hair: '#3a2115', hairStyle: 'short', beard: true,
      gear: '#111014', gear2: '#a91c22', bg: '#2a1014', bg2: '#070509', eye: '#24150d', brow: '#2a1a10'
    }
  ];

  const PLAYER_IDS = ['roman', 'becky', 'seth', 'bianca', 'rhea'];
  const byId = id => ROSTER.find(card => card.id === id);

  let portraitSeq = 0;
  function portrait(card) {
    const n = ++portraitSeq;
    const u = `p${n}-${card.id}`;
    const skin = card.skin;
    const shade = card.skinShade;
    const hair = card.hair;
    const gear = card.gear;
    const accent = card.gear2;
    const eye = card.eye || '#1a110d';
    const brow = card.brow || hair;

    const longHair = card.hairStyle === 'long' || card.hairStyle === 'longBlonde' || card.hairStyle === 'hat';
    const braid = card.hairStyle === 'braid';
    const spiky = card.hairStyle === 'spiky';
    const ponytail = card.hairStyle === 'ponytail';
    const twoTone = card.hairStyle === 'twoTone';
    const shortHair = card.hairStyle === 'short';

    let hairBack = '';
    if (longHair) {
      hairBack = `<path d="M93 120C76 138 70 178 73 218c2 27 10 44 24 52 9 5 15-3 12-13-10-31-8-67-2-99 4-22 10-37 18-47Z" fill="${hair}"/>
        <path d="M207 120c17 18 23 58 20 98-2 27-10 44-24 52-9 5-15-3-12-13 10-31 8-67 2-99-4-22-10-37-18-47Z" fill="${hair}"/>`;
    } else if (braid) {
      hairBack = `<path d="M96 125c-15 16-21 45-17 76 3 22 12 35 26 37 11 2 17-8 12-17-11-20-14-46-9-72 3-16 8-26 14-34Z" fill="${hair}"/>
        <path d="M204 125c15 16 21 45 17 76-3 22-12 35-26 37-11 2-17-8-12-17 11-20 14-46 9-72-3-16-8-26-14-34Z" fill="${hair}"/>
        <path d="M209 174c17 14 26 43 22 75-3 25-16 45-31 55-9 6-17-2-12-11 15-24 20-48 16-76-2-18-7-31-13-42Z" fill="${hair}"/>
        <path d="M214 242c11 2 18 11 18 22 0 11-7 18-16 16-8-2-12-10-10-19 1-8 4-15 8-19Z" fill="${hair}" opacity=".9"/>`;
    } else if (spiky) {
      hairBack = `<path d="M92 150c-3-33 16-66 48-72 6-12 18-12 24 0 32 7 48 38 45 72-8-15-17-25-27-30-1 9 3 16 8 22-16-8-25-18-30-31-7 16-20 28-37 33 7-11 9-21 7-31-11 11-20 25-27 42-3-4-6-9-11-5Z" fill="${hair}"/>
        <path d="M99 159c-7 19-8 40-4 59l12-9c-2-17-1-33 4-46Z" fill="${hair}"/>
        <path d="M202 159c7 19 8 40 4 59l-12-9c2-17 1-33-4-46Z" fill="${hair}"/>`;
    } else if (ponytail) {
      hairBack = `<path d="M98 121c-17 18-22 49-16 77 4 19 14 28 27 25 9-2 12-10 6-17-9-13-11-32-7-51 3-13 8-23 14-31Z" fill="${hair}"/>
        <path d="M203 121c19 18 24 49 18 77-4 19-14 28-27 25-9-2-12-10-6-17 9-13 11-32 7-51-3-13-8-23-14-31Z" fill="${hair}"/>
        <path d="M205 160c18 19 29 49 27 82-1 22-8 38-18 48-7 7-16 1-13-8 9-26 7-55-4-85-4-12-9-22-15-31Z" fill="${hair}"/>`;
    } else if (twoTone) {
      hairBack = `<path d="M94 148c-2-30 16-56 45-62 10-8 21-8 30 0 29 7 45 32 43 62-8-13-16-21-24-25-3 7 0 14 4 20-14-7-23-16-27-28-9 13-21 23-36 27 6-8 8-16 6-24-10 10-18 22-24 38-4-4-8-8-17-8Z" fill="#17131a"/>
        <path d="M96 148c-2-30 16-56 45-62 7-6 15-8 23-6-17 9-28 22-33 39-3 10-2 19 2 29-13-1-24-5-37 0Z" fill="${hair}"/>
        <path d="M169 80c28 7 45 32 43 62-8-13-16-21-24-25-3 7 0 14 4 20-14-7-23-16-27-28-9 13-21 23-36 27 9-12 12-24 10-36 9-11 18-18 30-20Z" fill="${hair}"/>`;
    } else if (shortHair) {
      hairBack = `<path d="M94 150c-1-34 18-60 49-65 7-7 17-8 25-1 29 8 45 34 43 66-9-18-20-29-34-34-3 8-1 14 4 20-15-7-25-17-30-30-8 15-21 26-38 31 6-9 8-17 5-26-10 10-17 24-20 41-2-2-3-2-4-2Z" fill="${hair}"/>`;
    }

    let hairFront = '';
    if (card.hairStyle === 'hat') {
      hairFront = `<path d="M96 130c5-28 24-47 54-47s49 19 54 47c-17-12-34-17-54-17s-37 5-54 17Z" fill="${hair}"/>
        <path d="M95 120c4-24 23-43 55-43s51 19 55 43c-14-9-33-14-55-14s-41 5-55 14Z" fill="#1a151d"/>
        <path d="M86 119h128c8 0 13 4 13 10s-5 10-13 10H86c-8 0-13-4-13-10s5-10 13-10Z" fill="#0d0a10"/>
        <path d="M105 104c0-17 20-30 45-30s45 13 45 30c-14-7-28-10-45-10s-31 3-45 10Z" fill="#17121d"/>`;
    } else if (card.hairStyle === 'long' || card.hairStyle === 'longBlonde') {
      hairFront = `<path d="M96 148c-2-35 18-62 54-62 37 0 56 27 54 62-8-18-18-31-31-38-3 10 0 18 6 25-17-7-28-19-34-36-8 18-22 31-41 38 6-9 8-18 5-28-9 13-13 26-13 39Z" fill="${hair}"/>
        <path d="M99 145c-2-23 8-43 24-53-7 15-9 30-6 45-7 3-13 5-18 8Z" fill="${hair}" opacity=".8"/>`;
    } else if (card.hairStyle === 'ponytail') {
      hairFront = `<path d="M97 150c-2-37 18-64 53-64 36 0 55 27 53 64-10-19-22-32-36-38-2 10 2 18 9 24-18-6-30-17-37-32-7 17-21 29-41 35 7-8 9-16 7-26-4 13-7 25-8 37Z" fill="${hair}"/>
        <path d="M118 100c8-10 19-15 32-15 14 0 25 5 33 16-13-5-24-7-33-7-11 0-21 2-32 6Z" fill="#d66a2e"/>`;
    } else if (card.hairStyle === 'braid') {
      hairFront = `<path d="M96 151c-2-39 20-68 54-68 35 0 57 29 54 68-9-21-20-35-35-42-3 10 1 18 8 25-18-7-31-19-38-35-7 18-21 31-41 38 7-9 9-18 6-28-5 13-8 27-8 42Z" fill="${hair}"/>
        <path d="M100 102c13-13 29-20 50-20 20 0 36 6 49 19-18-8-34-12-49-12s-32 4-50 13Z" fill="#4a291d"/>`;
    } else if (card.hairStyle === 'spiky') {
      hairFront = `<path d="M94 151c-3-32 13-59 42-68 4-12 17-15 24-5 31 7 50 34 47 73-8-18-17-30-27-36 0 9 4 16 9 22-16-7-27-17-33-30-6 14-17 24-32 29 6-10 7-19 4-28-12 11-20 24-24 43-3-3-6-4-10 0Z" fill="${hair}"/>`;
    } else if (card.hairStyle === 'twoTone') {
      hairFront = `<path d="M96 150c-2-34 16-59 46-65 8-7 18-8 27-2 30 7 47 33 45 67-10-19-21-31-34-36-2 9 2 17 8 23-17-6-28-16-34-31-7 16-21 28-40 34 7-9 9-18 6-27-9 11-15 23-18 37Z" fill="#d8b25c"/>
        <path d="M96 150c-1-15 3-29 12-40-4 15-3 28 1 39-5 1-9 1-13 1Z" fill="#17131a"/>
        <path d="M205 151c1-16-4-31-13-42 4 16 4 30 0 41 5 1 9 1 13 1Z" fill="#17131a"/>`;
    } else {
      hairFront = `<path d="M95 151c-1-37 19-63 54-63 36 0 56 26 55 63-9-19-20-32-34-39-3 9 0 17 6 24-17-6-29-17-35-33-7 16-20 28-38 35 7-9 9-18 6-27-5 12-9 25-14 40Z" fill="${hair}"/>`;
    }

    const tattoo = card.tattoo ? `
      <g opacity=".55" stroke="#151016" stroke-width="2" fill="none" stroke-linecap="round">
        <path d="M107 284c10-17 20-27 32-32M112 299c8-19 21-33 37-42M124 311c5-15 14-28 27-38M198 283c-9-14-18-23-30-29M190 300c-9-17-19-28-34-38"/>
        <path d="M132 268c8 7 17 11 27 12M151 258c4 8 10 14 18 19" stroke-width="1.5"/>
      </g>` : '';

    const facial = card.goatee ? `
      <path d="M137 203c5 7 8 15 7 25-1 10-5 17-10 20 9 3 17 1 23-5-5-4-8-9-9-16-1-9 0-17 3-24-5 2-10 2-14 0Z" fill="#181419" opacity=".8"/>
      <path d="M132 194c8 3 20 3 28 0-3 5-9 7-14 7s-11-2-14-7Z" fill="#181419"/>
    ` : card.beard ? `
      <path d="M113 181c4 20 15 42 37 48 22-6 33-28 37-48-2 24-12 47-37 54-25-7-35-30-37-54Z" fill="${hair}" opacity=".92"/>
      <path d="M132 194c10 4 22 4 32 0-5 7-11 10-16 10s-11-3-16-10Z" fill="${hair}"/>
    ` : '';
    const mustache = card.mustache ? `<path d="M131 189c7-5 14-6 19-2 5-4 12-3 19 2-7 4-13 4-19 1-6 3-12 3-19-1Z" fill="${hair}"/>` : '';

    const sunglasses = card.sunglasses ? `
      <path d="M109 151c7-6 18-7 27-3l1 13c-4 8-13 10-21 6-7-4-9-10-7-16Z" fill="#0b0910" stroke="#6c5b5d" stroke-width="1.4"/>
      <path d="M163 148c9-4 20-3 27 3 2 6 0 12-7 16-8 4-17 2-21-6Z" fill="#0b0910" stroke="#6c5b5d" stroke-width="1.4"/>
      <path d="M137 151h25" stroke="#6c5b5d" stroke-width="2"/>
      <path d="M113 153c4-2 9-2 13 0" stroke="#ba8b72" stroke-width="1" opacity=".5"/>` : '';

    const headband = card.headband ? `<path d="M95 132c17-10 36-15 55-15s38 5 55 15l-2 11c-17-9-35-13-53-13s-36 4-53 13Z" fill="${card.headband}"/>` : '';

    return `<svg viewBox="0 0 300 360" preserveAspectRatio="xMidYMid slice" role="img" aria-label="${card.name} portrait">
      <defs>
        <linearGradient id="${u}-bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stop-color="${card.bg}"/><stop offset=".55" stop-color="${card.bg2}"/><stop offset="1" stop-color="#050407"/>
        </linearGradient>
        <radialGradient id="${u}-glow" cx=".5" cy=".42" r=".55">
          <stop offset="0" stop-color="${accent}" stop-opacity=".35"/><stop offset="1" stop-color="${accent}" stop-opacity="0"/>
        </radialGradient>
        <linearGradient id="${u}-skin" x1=".2" y1="0" x2=".9" y2="1">
          <stop offset="0" stop-color="${skin}"/><stop offset=".62" stop-color="${skin}"/><stop offset="1" stop-color="${shade}"/>
        </linearGradient>
        <linearGradient id="${u}-gear" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stop-color="${gear}"/><stop offset=".52" stop-color="${accent}"/><stop offset="1" stop-color="${gear}"/>
        </linearGradient>
        <linearGradient id="${u}-hair" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stop-color="${hair}"/><stop offset="1" stop-color="#050407"/>
        </linearGradient>
        <filter id="${u}-soft"><feGaussianBlur stdDeviation="12"/></filter>
        <filter id="${u}-shadow"><feDropShadow dx="0" dy="5" stdDeviation="5" flood-color="#000" flood-opacity=".55"/></filter>
      </defs>
      <g clip-path="none">
        <rect width="300" height="360" fill="url(#${u}-bg)"/>
        <circle cx="150" cy="150" r="150" fill="url(#${u}-glow)"/>
        <g opacity=".18" stroke="${accent}" stroke-width="1">
          <path d="M-20 280 130 -30M30 370 230 -20M120 390 300 20M-40 170 220 -50" />
        </g>
        <g opacity=".55" filter="url(#${u}-soft)">
          <circle cx="54" cy="103" r="2.5" fill="#ffe9b0"/><circle cx="238" cy="88" r="2" fill="#ffd46c"/>
          <circle cx="218" cy="180" r="1.5" fill="#9ed8ff"/><circle cx="72" cy="207" r="1.6" fill="#ffe9b0"/>
          <circle cx="267" cy="142" r="2" fill="#ff7479"/><circle cx="36" cy="150" r="1.3" fill="#ffd46c"/>
          <circle cx="172" cy="66" r="1.3" fill="#9ed8ff"/><circle cx="112" cy="52" r="1.8" fill="#ffe9b0"/>
        </g>
        <g opacity=".35" stroke="#f6c453" stroke-width="1.5">
          <path d="M0 255h300M0 272h300M0 289h300"/>
        </g>
        <ellipse cx="150" cy="354" rx="155" ry="55" fill="#030205" opacity=".82"/>
        <path d="M16 360c5-41 21-73 48-94 18-14 37-22 59-25l54 0c23 3 42 11 59 25 27 21 43 53 48 94Z" fill="url(#${u}-gear)" filter="url(#${u}-shadow)"/>
        <path d="M96 262c15 10 31 15 54 15s40-5 55-15l-9 34c-13 8-29 12-46 12s-33-4-46-12Z" fill="#08070b" opacity=".55"/>
        <path d="M118 245c0 13 14 23 32 23s32-10 32-23v-22h-64Z" fill="${shade}"/>
        <rect x="126" y="206" width="48" height="47" rx="16" fill="url(#${u}-skin)"/>
        ${hairBack}
        <path d="M90 160c-8-2-13 3-13 10s4 13 12 14Z" fill="${shade}"/>
        <path d="M210 160c8-2 13 3 13 10s-4 13-12 14Z" fill="${shade}"/>
        <path d="M150 92c38 0 61 28 59 70-2 43-27 76-59 76s-57-33-59-76c-2-42 21-70 59-70Z" fill="url(#${u}-skin)"/>
        <path d="M150 92c-23 0-42 11-52 30 5 34 24 55 52 55 18 0 34-10 44-28 3-38-15-57-44-57Z" fill="#fff" opacity=".035"/>
        <path d="M193 111c14 16 20 39 18 65-2 33-16 56-36 65 15-23 22-51 20-81-1-19-6-35-14-49Z" fill="${shade}" opacity=".38"/>
        <path d="M108 148c8-6 18-7 27-3-7 1-13 4-17 9-4-1-7-3-10-6Z" fill="${brow}"/>
        <path d="M165 145c9-4 19-3 27 3-4 3-7 5-11 6-4-5-10-8-16-9Z" fill="${brow}"/>
        <ellipse cx="127" cy="159" rx="9" ry="5" fill="#f8eee0"/>
        <ellipse cx="173" cy="159" rx="9" ry="5" fill="#f8eee0"/>
        <circle cx="128" cy="159" r="3.2" fill="${eye}"/>
        <circle cx="172" cy="159" r="3.2" fill="${eye}"/>
        <circle cx="129" cy="158" r=".9" fill="#fff"/>
        <circle cx="173" cy="158" r=".9" fill="#fff"/>
        <path d="M149 162c-2 9-4 15-1 18 2 2 5 2 8 0" fill="none" stroke="${shade}" stroke-width="2" stroke-linecap="round"/>
        <path d="M136 199c9 5 19 5 28 0-7 8-20 8-28 0Z" fill="#5a2b2e" opacity=".75"/>
        <path d="M136 196c9 3 19 3 28 0" fill="none" stroke="${shade}" stroke-width="1.2" opacity=".5"/>
        ${facial}
        ${mustache}
        ${hairFront}
        ${headband}
        ${sunglasses}
        <path d="M104 284c9-14 20-24 34-30M196 284c-9-14-20-24-34-30" fill="none" stroke="#f6c453" stroke-width="2" opacity=".35"/>
        <path d="M134 274h32" stroke="${accent}" stroke-width="3" opacity=".7"/>
        ${tattoo}
        <path d="M63 330c17-42 45-65 87-67" fill="none" stroke="#fff" stroke-width="2" opacity=".08"/>
        <path d="M235 330c-17-42-45-65-87-67" fill="none" stroke="#fff" stroke-width="1" opacity=".05"/>
        <rect width="300" height="360" fill="none" stroke="#fff" stroke-opacity=".06"/>
      </g>
    </svg>`;
  }


  function photo(card, className = '') {
    return `<div class="photo-wrap ${className}"><img src="assets/cards/${card.id}.jpg" alt="" loading="lazy" style="object-position:${card.pos || '50% 18%'}"><span class="photo-grade"></span></div>`;
  }

  function cardMarkup(card, options = {}) {
    const tier = TIERS[card.tier] || TIERS.LEGENDARY;
    const uid = options.uid || card.uid || card.id;
    const classes = ['card'];
    if (options.className) classes.push(options.className);
    if (options.used) classes.push('is-used');
    if (options.selected) classes.push('is-selected');
    const statMarkup = STAT_KEYS.map(key => `
      <span class="card-stat">
        ${ICONS[key]}
        <strong>${card.stats[key]}</strong>
        <small>${STATS[key].short}</small>
      </span>`).join('');
    return `<article class="${classes.join(' ')}" data-card="${card.id}" data-uid="${uid}" style="--accent:${tier.accent};--accent-2:${tier.accent2}">
      <div class="card-surface">
        <div class="card-portrait">${photo(card)}</div>
        <div class="card-grain"></div>
        <div class="card-tier">${card.tier}</div>
        <div class="card-ovr"><span>${card.ovr}</span><small>OVR</small></div>
        <div class="card-nameplate"><strong>${card.name}</strong><small>${card.sub}</small></div>
        <div class="card-stats">${statMarkup}</div>
        <div class="card-footer"><span class="card-brand">${card.brand}</span><span class="card-ability">${card.ability}</span></div>
      </div>
      <div class="card-foil"></div>
      <div class="card-edge"></div>
    </article>`;
  }

  const state = {
    screen: 'home',
    coins: 12450,
    sound: true,
    tilt: false,
    tiltReady: false,
    run: 0,
    round: 1,
    playerScore: 0,
    oppScore: 0,
    spotlights: [],
    usedPlayer: new Set(),
    usedOpp: new Set(),
    playerDeck: [],
    opponentDeck: [],
    captain: null,
    locked: true,
    selected: null,
    matchOver: false,
    timers: [],
    momentum: 0,
    lastRound: null
  };

  const dom = {
    home: $('#homeScreen'),
    battle: $('#battleScreen'),
    feature: $('#featureCard'),
    playerHand: $('#playerHand'),
    opponentHand: $('#opponentHand'),
    playerSlot: $('#playerSlot'),
    opponentSlot: $('#opponentSlot'),
    roundNo: $('#roundNo'),
    spotIcon: $('#spotIcon'),
    spotName: $('#spotName'),
    spotlightChip: $('#spotlightChip'),
    roundStatus: $('#roundStatus'),
    playerPips: $('#playerPips'),
    oppPips: $('#oppPips'),
    roundTally: $('#roundTally'),
    momentum: $('#momentum b'),
    oppName: $('#oppName'),
    oppTier: $('#oppTier'),
    oppSub: $('#oppSub'),
    oppAvatar: $('#oppAvatar'),
    playerAvatar: $('#playerAvatar'),
    playerSub: $('#playerSub'),
    versusCore: $('#versusCore'),
    versusSub: $('#versusSub'),
    turnBanner: $('#turnBanner'),
    clashResult: $('#clashResult'),
    resultKicker: $('#resultKicker'),
    resultScore: $('#resultScore'),
    resultLabel: $('#resultLabel'),
    resultOverlay: $('#resultOverlay'),
    resultPanel: $('.result-panel'),
    matchKicker: $('#matchKicker'),
    matchTitle: $('#matchTitle'),
    matchScore: $('#matchScore'),
    matchMvp: $('#matchMvp'),
    coinCount: $('#coinCount'),
    tiltBtn: $('#tiltBtn'),
    tiltState: $('#tiltState'),
    modal: $('#modal'),
    modalContent: $('#modalContent'),
    toast: $('#toast')
  };

  function timer(fn, delay) {
    const id = setTimeout(() => {
      state.timers = state.timers.filter(t => t !== id);
      fn();
    }, delay);
    state.timers.push(id);
    return id;
  }
  function clearTimers() {
    state.timers.forEach(clearTimeout);
    state.timers = [];
  }

  function showScreen(name) {
    state.screen = name;
    dom.home.classList.toggle('is-active', name === 'home');
    dom.battle.classList.toggle('is-active', name === 'battle');
    document.body.dataset.screen = name;
  }

  function toast(message, duration = 2400) {
    dom.toast.textContent = message;
    dom.toast.classList.add('is-visible');
    clearTimeout(toast._timer);
    toast._timer = setTimeout(() => dom.toast.classList.remove('is-visible'), duration);
  }

  function updateCoins(animate = false) {
    dom.coinCount.textContent = state.coins.toLocaleString('en-US');
    if (animate) {
      dom.coinCount.animate(
        [{ transform: 'scale(1)' }, { transform: 'scale(1.16)', color: '#fff3bd' }, { transform: 'scale(1)' }],
        { duration: 420, easing: 'ease-out' }
      );
    }
  }

  function startHome() {
    clearTimers();
    state.run++;
    state.matchOver = true;
    state.locked = true;
    closeResult();
    showTurnBanner(false);
    showScreen('home');
    dom.battle.classList.remove('is-active');
    dom.clashResult.classList.remove('is-visible', 'is-loss', 'is-tie');
  }

  function startBattle() {
    clearTimers();
    state.run++;
    const run = state.run;
    state.round = 1;
    state.playerScore = 0;
    state.oppScore = 0;
    state.momentum = 0;
    state.lastRound = null;
    state.matchOver = false;
    state.selected = null;
    state.locked = true;
    state.usedPlayer = new Set();
    state.usedOpp = new Set();

    state.playerDeck = shuffle(PLAYER_IDS.map(id => ({ ...byId(id) }))).map((card, i) => ({
      ...card,
      uid: `p-${run}-${i}-${card.id}`
    }));
    const opponents = ROSTER.filter(card => !PLAYER_IDS.includes(card.id));
    state.opponentDeck = shuffle(opponents).map((card, i) => ({
      ...card,
      uid: `o-${run}-${i}-${card.id}`
    }));
    state.captain = state.opponentDeck.slice().sort((a, b) => b.ovr - a.ovr)[0];

    const first = pick(STAT_KEYS);
    const rest = shuffle(STAT_KEYS.filter(key => key !== first));
    state.spotlights = [first, ...rest, pick(STAT_KEYS)];

    closeResult();
    showScreen('battle');
    dom.clashResult.classList.remove('is-visible', 'is-loss', 'is-tie');
    dom.playerSlot.innerHTML = `<div class="slot-ghost player-ghost"><b>?</b><span>YOUR CARD</span><small>TAP BELOW</small></div>`;
    dom.opponentSlot.innerHTML = `<div class="slot-ghost opponent-ghost"><b>SC</b><span>OPPONENT</span><small>HIDDEN</small></div>`;
    dom.versusCore.classList.remove('is-clash');
    dom.versusSub.textContent = 'TAP A CARD';
    renderBattle();
    renderSlots(null, null);
    updateSpotlight();
    renderOpponentProfile();

    timer(() => {
      if (run !== state.run) return;
      state.locked = false;
      dom.roundStatus.textContent = 'CHOOSE YOUR CARD';
      dom.roundStatus.classList.add('is-live');
      dom.versusSub.textContent = 'TAP A CARD';
      showTurnBanner(true);
      bindHand();
      sfx('start');
    }, 680);
  }

  function currentSpotlight() {
    return state.spotlights[state.round - 1] || pick(STAT_KEYS);
  }

  function showTurnBanner(show = true) {
    dom.turnBanner?.classList.toggle('is-visible', show);
  }

  function updateSpotlight() {
    const key = currentSpotlight();
    const stat = STATS[key];
    dom.spotIcon.innerHTML = ICONS[key];
    dom.spotName.textContent = stat.label;
    const orb = $('#orbStat');
    if (orb) orb.innerHTML = `${ICONS[key]}<small>${stat.label}</small>`;
    const ribbon = $('#statRibbon');
    if (ribbon) ribbon.innerHTML = STAT_KEYS.map(k => `<span class="${k === key ? 'is-current' : ''}">${ICONS[k]}<b>${STATS[k].short}</b></span>`).join('');
    dom.spotlightChip.classList.add('is-hot');
    dom.spotlightChip.animate(
      [{ transform: 'scale(.94)', filter: 'brightness(1.7)' }, { transform: 'scale(1)', filter: 'brightness(1)' }],
      { duration: 420, easing: 'ease-out' }
    );
  }

  function renderOpponentProfile() {
    const cap = state.captain;
    if (!cap) return;
    dom.oppName.textContent = cap.name;
    dom.oppTier.textContent = cap.tier;
    dom.oppSub.textContent = `${cap.brand} · ${cap.ability}`;
    dom.oppAvatar.innerHTML = photo(cap);
    const playerCap = state.playerDeck.slice().sort((a, b) => b.ovr - a.ovr)[0] || byId('roman');
    dom.playerAvatar.innerHTML = photo(playerCap);
    dom.playerSub.textContent = `DECK POWER ${state.playerDeck.reduce((sum, card) => sum + card.ovr, 0) * 10}`;
  }

  function pipsMarkup(score, kind = '') {
    return Array.from({ length: 3 }, (_, i) => `<i class="${i < score ? `won ${kind}` : ''}"></i>`).join('');
  }

  function renderBattle() {
    dom.roundNo.textContent = Math.min(state.round, 5);
    dom.playerPips.innerHTML = pipsMarkup(state.playerScore);
    dom.oppPips.innerHTML = pipsMarkup(state.oppScore, 'opp');
    dom.roundTally.textContent = `${state.playerScore} — ${state.oppScore}`;
    dom.momentum.style.width = `${clamp(state.momentum / 3, 0, 1) * 100}%`;
    dom.opponentHand.innerHTML = state.opponentDeck.map(card => `<div class="card-back ${state.usedOpp.has(card.uid) ? 'is-used' : ''}"></div>`).join('');
    dom.playerHand.innerHTML = state.playerDeck.map(card => cardMarkup(card, {
      uid: card.uid,
      used: state.usedPlayer.has(card.uid),
      selected: state.selected === card.uid
    })).join('');
    bindHand();
  }

  function renderSlots(playerCard, oppCard) {
    dom.playerSlot.innerHTML = playerCard
      ? cardMarkup(playerCard, { uid: `${playerCard.uid}-slot` })
      : `<div class="slot-ghost player-ghost"><b>?</b><span>YOUR CARD</span><small>TAP BELOW</small></div>`;
    dom.opponentSlot.innerHTML = oppCard
      ? cardMarkup(oppCard, { uid: `${oppCard.uid}-slot` })
      : `<div class="slot-ghost opponent-ghost"><b>SC</b><span>OPPONENT</span><small>HIDDEN</small></div>`;
    if (playerCard) dom.playerSlot.querySelector('.card')?.classList.add('is-hot');
    if (oppCard) dom.opponentSlot.querySelector('.card')?.classList.add('is-hot');
  }

  function bindHand() {
    $$('.player-hand .card', dom.playerHand).forEach(el => {
      if (el.classList.contains('is-used')) return;
      const uid = el.dataset.uid;
      let start = null;
      let dragging = false;
      el.addEventListener('pointerdown', event => {
        if (state.locked || state.matchOver) return;
        start = { x: event.clientX, y: event.clientY };
        dragging = false;
        el.setPointerCapture?.(event.pointerId);
        el.classList.add('is-hot');
      });
      el.addEventListener('pointermove', event => {
        if (!start) return;
        const dy = event.clientY - start.y;
        if (dy < -8) {
          dragging = true;
          const lift = clamp(dy, -52, 0);
          el.style.transform = `translateY(${lift}px) scale(1.03) rotate(0deg)`;
          el.style.filter = `brightness(${1 + Math.abs(lift) / 150})`;
        }
      });
      const finish = event => {
        if (!start) return;
        const dy = event.clientY - start.y;
        const dx = event.clientX - start.x;
        const wasDragging = dragging;
        start = null;
        dragging = false;
        el.style.transform = '';
        el.style.filter = '';
        el.classList.remove('is-hot');
        if (state.locked || state.matchOver) return;
        if ((wasDragging && dy < -34) || (!wasDragging && Math.abs(dx) < 18 && Math.abs(dy) < 18)) {
          playCard(uid, el);
        }
      };
      el.addEventListener('pointerup', finish);
      el.addEventListener('pointercancel', () => {
        start = null;
        dragging = false;
        el.style.transform = '';
        el.style.filter = '';
        el.classList.remove('is-hot');
      });
    });
  }

  function chooseOpponentCard() {
    const available = state.opponentDeck.filter(card => !state.usedOpp.has(card.uid));
    if (!available.length) return state.opponentDeck[state.opponentDeck.length - 1];
    const key = currentSpotlight();
    const pressure = state.oppScore < state.playerScore ? 1.18 : 1;
    const scored = available.map(card => ({
      card,
      value: card.stats[key] * pressure + card.ovr * 0.32 + rand(0, 20)
    })).sort((a, b) => b.value - a.value);
    return scored[0].card;
  }

  function playCard(uid, el) {
    if (state.locked || state.matchOver) return;
    const playerCard = state.playerDeck.find(card => card.uid === uid);
    if (!playerCard || state.usedPlayer.has(uid)) return;
    state.locked = true;
    state.selected = uid;
    state.usedPlayer.add(uid);
    const oppCard = chooseOpponentCard();
    state.usedOpp.add(oppCard.uid);
    const run = state.run;
    const rect = el?.getBoundingClientRect();
    if (rect) burst(rect.left + rect.width / 2, rect.top + rect.height / 2, '#f6c453', 18);
    sfx('play');
    if (navigator.vibrate) navigator.vibrate(18);

    showTurnBanner(false);
    dom.roundStatus.textContent = 'CARD IN PLAY';
    dom.roundStatus.classList.remove('is-live');
    dom.versusSub.textContent = 'LOCKED IN';
    dom.versusCore.classList.add('is-clash');
    renderBattle();
    timer(() => {
      if (run !== state.run) return;
      renderSlots(playerCard, null);
      timer(() => {
        if (run !== state.run) return;
        renderSlots(playerCard, oppCard);
        dom.versusSub.textContent = 'REVEALED';
        sfx('reveal');
        burst(innerWidth / 2, innerHeight * 0.46, '#ff6b70', 16);
        timer(() => resolveRound(playerCard, oppCard), 520);
      }, 360);
    }, 210);
  }

  function resolveRound(playerCard, oppCard) {
    if (state.matchOver) return;
    const key = currentSpotlight();
    const pv = playerCard.stats[key];
    const ov = oppCard.stats[key];
    let winner;
    if (pv > ov) winner = 'player';
    else if (pv < ov) winner = 'opp';
    else winner = playerCard.ovr >= oppCard.ovr ? 'player' : 'opp';

    if (winner === 'player') {
      state.playerScore++;
      state.momentum = Math.min(3, state.momentum + 1);
      sfx('win-round');
      burst(innerWidth * 0.38, innerHeight * 0.47, '#f6c453', 34);
    } else {
      state.oppScore++;
      state.momentum = Math.max(0, state.momentum - 1);
      sfx('lose-round');
      burst(innerWidth * 0.62, innerHeight * 0.47, '#ff4b51', 26);
    }
    state.lastRound = { key, pv, ov, winner };

    dom.clashResult.classList.remove('is-loss', 'is-tie');
    if (winner === 'opp') dom.clashResult.classList.add('is-loss');
    dom.resultKicker.textContent = `ROUND ${state.round} · ${STATS[key].label}`;
    dom.resultScore.innerHTML = `${pv}<span> — </span>${ov}`;
    dom.resultLabel.textContent = winner === 'player' ? 'ROUND WON' : 'ROUND LOST';
    dom.clashResult.classList.add('is-visible');
    showTurnBanner(false);
    dom.versusSub.textContent = winner === 'player' ? 'YOU SCORE' : 'OPPONENT SCORES';
    renderBattle();

    const run = state.run;
    const matchDone = state.playerScore >= 3 || state.oppScore >= 3 || state.round >= 5;
    timer(() => {
      if (run !== state.run) return;
      if (matchDone) endMatch();
      else nextRound();
    }, 1480);
  }

  function nextRound() {
    state.round++;
    state.selected = null;
    state.locked = true;
    dom.clashResult.classList.remove('is-visible', 'is-loss', 'is-tie');
    dom.versusCore.classList.remove('is-clash');
    dom.versusSub.textContent = 'TAP A CARD';
    dom.roundStatus.textContent = 'NEXT ROUND';
    dom.roundStatus.classList.remove('is-live');
    renderSlots(null, null);
    renderBattle();
    updateSpotlight();
    const run = state.run;
    timer(() => {
      if (run !== state.run) return;
      state.locked = false;
      dom.roundStatus.textContent = 'CHOOSE YOUR CARD';
      dom.roundStatus.classList.add('is-live');
      showTurnBanner(true);
      bindHand();
    }, 480);
  }

  function endMatch() {
    state.matchOver = true;
    showTurnBanner(false);
    state.locked = true;
    const won = state.playerScore > state.oppScore;
    const reward = won ? 250 : 75;
    state.coins += reward;
    updateCoins(true);
    dom.matchKicker.textContent = won ? 'MATCH COMPLETE' : 'MATCH COMPLETE';
    dom.matchTitle.textContent = won ? 'VICTORY' : 'DEFEAT';
    dom.matchScore.textContent = `${state.playerScore} — ${state.oppScore}`;
    dom.resultPanel.classList.toggle('is-loss', !won);
    const mvp = state.playerDeck.slice().sort((a, b) => b.ovr - a.ovr)[0];
    dom.matchMvp.innerHTML = `<div class="match-mvp-label">MATCH MVP</div>${cardMarkup(mvp, { uid: `${mvp.uid}-mvp`, className: 'mvp-card' })}`;
    dom.resultOverlay.classList.add('is-open');
    dom.resultOverlay.setAttribute('aria-hidden', 'false');
    if (won) {
      sfx('victory');
      for (let i = 0; i < 4; i++) timer(() => burst(rand(innerWidth * .25, innerWidth * .75), rand(innerHeight * .2, innerHeight * .55), i % 2 ? '#f6c453' : '#ff6b70', 26), i * 170);
    } else {
      sfx('defeat');
    }
    if (navigator.vibrate) navigator.vibrate(won ? [30, 40, 60] : 120);
  }

  function closeResult() {
    dom.resultOverlay.classList.remove('is-open');
    dom.resultOverlay.setAttribute('aria-hidden', 'true');
  }

  function openDeck() {
    const deck = PLAYER_IDS.map(id => byId(id));
    dom.modalContent.innerHTML = `<div class="modal-inner">
      <div class="modal-kicker">YOUR COLLECTION</div>
      <h2 class="modal-title" id="modalTitle">THE MAIN EVENT</h2>
      <p class="modal-sub">Five superstars. Every stat matters. Pick the right card for the spotlight.</p>
      <div class="deck-grid">${deck.map((card, i) => cardMarkup(card, { uid: `deck-${card.id}-${i}` })).join('')}</div>
      <div class="deck-note"><span>DECK POWER <strong>${deck.reduce((sum, card) => sum + card.ovr, 0) * 10}</strong></span><span>AVG OVR <strong>${Math.round(deck.reduce((sum, card) => sum + card.ovr, 0) / deck.length)}</strong></span></div>
    </div>`;
    openModal();
  }

  function openSettings() {
    dom.modalContent.innerHTML = `<div class="modal-inner">
      <div class="modal-kicker">CONTROLS</div>
      <h2 class="modal-title" id="modalTitle">RING SETTINGS</h2>
      <p class="modal-sub">Built for touch. Optional tilt adds arena parallax on supported devices.</p>
      <div class="setting-row">
        <div class="setting-copy"><strong>TILT CONTROL</strong><span>Requests motion permission on iOS. Tilt your device to shift the arena and spotlight.</span></div>
        <button id="modalTilt" class="switch ${state.tilt ? 'is-on' : ''}" type="button" aria-label="Toggle tilt control" aria-pressed="${state.tilt}"></button>
      </div>
      <div class="setting-row">
        <div class="setting-copy"><strong>SOUND EFFECTS</strong><span>Impact hits, crowd swells, and card reveals.</span></div>
        <button id="modalSound" class="switch ${state.sound ? 'is-on' : ''}" type="button" aria-label="Toggle sound" aria-pressed="${state.sound}"></button>
      </div>
      <div class="setting-row">
        <div class="setting-copy"><strong>TOUCH CONTROLS</strong><span>Tap a card or swipe it upward to play. No keyboard required.</span></div>
        <span style="color:#f6c453;font-size:10px;letter-spacing:.14em">ACTIVE</span>
      </div>
    </div>`;
    openModal();
    $('#modalTilt')?.addEventListener('click', async event => {
      await toggleTilt();
      event.currentTarget.classList.toggle('is-on', state.tilt);
      event.currentTarget.setAttribute('aria-pressed', state.tilt);
    });
    $('#modalSound')?.addEventListener('click', event => {
      toggleSound();
      event.currentTarget.classList.toggle('is-on', state.sound);
      event.currentTarget.setAttribute('aria-pressed', state.sound);
    });
  }

  function openModal() {
    dom.modal.classList.add('is-open');
    dom.modal.setAttribute('aria-hidden', 'false');
  }
  function closeModal() {
    dom.modal.classList.remove('is-open');
    dom.modal.setAttribute('aria-hidden', 'true');
  }

  function toggleSound() {
    state.sound = !state.sound;
    document.body.classList.toggle('is-muted', !state.sound);
    if (state.sound) {
      ensureAudio();
      sfx('click');
      toast('SOUND ON');
    } else {
      toast('SOUND OFF');
    }
  }

  async function toggleTilt() {
    if (state.tilt) {
      state.tilt = false;
      state.tiltReady = false;
      window.removeEventListener('deviceorientation', handleOrientation);
      document.documentElement.style.setProperty('--tilt-x', '0deg');
      document.documentElement.style.setProperty('--tilt-y', '0deg');
      dom.tiltBtn.setAttribute('aria-pressed', 'false');
      dom.tiltState.textContent = 'OFF';
      toast('TILT CONTROL OFF');
      return;
    }
    if (!('DeviceOrientationEvent' in window)) {
      toast('TILT NOT SUPPORTED ON THIS DEVICE');
      return;
    }
    try {
      if (typeof DeviceOrientationEvent.requestPermission === 'function') {
        const permission = await DeviceOrientationEvent.requestPermission();
        if (permission !== 'granted') {
          toast('MOTION PERMISSION DENIED');
          return;
        }
      }
      window.addEventListener('deviceorientation', handleOrientation, { passive: true });
      state.tilt = true;
      state.tiltReady = true;
      dom.tiltBtn.setAttribute('aria-pressed', 'true');
      dom.tiltState.textContent = 'ON';
      toast('TILT CONTROL ON');
      sfx('click');
    } catch (error) {
      toast('MOTION PERMISSION UNAVAILABLE');
    }
  }

  function handleOrientation(event) {
    if (!state.tilt) return;
    const beta = Number.isFinite(event.beta) ? event.beta : 45;
    const gamma = Number.isFinite(event.gamma) ? event.gamma : 0;
    const x = clamp((beta - 48) * 0.075, -4.5, 4.5);
    const y = clamp(gamma * 0.075, -5.5, 5.5);
    document.documentElement.style.setProperty('--tilt-x', `${x.toFixed(2)}deg`);
    document.documentElement.style.setProperty('--tilt-y', `${y.toFixed(2)}deg`);
  }

  /* ---------- audio ---------- */
  let audioCtx = null;
  let master = null;
  function ensureAudio() {
    if (!state.sound) return null;
    try {
      if (!audioCtx) {
        const Ctx = window.AudioContext || window.webkitAudioContext;
        if (!Ctx) return null;
        audioCtx = new Ctx();
        master = audioCtx.createGain();
        master.gain.value = 0.24;
        master.connect(audioCtx.destination);
      }
      if (audioCtx.state === 'suspended') audioCtx.resume();
      return audioCtx;
    } catch {
      return null;
    }
  }
  function tone(freq, duration = 0.15, type = 'sine', volume = 0.22, delay = 0, endFreq = null) {
    const ctx = ensureAudio();
    if (!ctx) return;
    const t0 = ctx.currentTime + delay;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, t0);
    if (endFreq) osc.frequency.exponentialRampToValueAtTime(Math.max(30, endFreq), t0 + duration);
    gain.gain.setValueAtTime(0.0001, t0);
    gain.gain.exponentialRampToValueAtTime(volume, t0 + 0.012);
    gain.gain.exponentialRampToValueAtTime(0.0001, t0 + duration);
    osc.connect(gain).connect(master);
    osc.start(t0);
    osc.stop(t0 + duration + 0.02);
  }
  function noise(duration = 0.2, volume = 0.12, delay = 0, cutoff = 1400) {
    const ctx = ensureAudio();
    if (!ctx) return;
    const length = Math.max(1, Math.floor(ctx.sampleRate * duration));
    const buffer = ctx.createBuffer(1, length, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < length; i++) data[i] = (Math.random() * 2 - 1) * (1 - i / length);
    const source = ctx.createBufferSource();
    source.buffer = buffer;
    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = cutoff;
    const gain = ctx.createGain();
    gain.gain.value = volume;
    source.connect(filter).connect(gain).connect(master);
    source.start(ctx.currentTime + delay);
  }
  function sfx(name) {
    if (!state.sound) return;
    switch (name) {
      case 'click': tone(540, 0.07, 'square', 0.1); tone(760, 0.06, 'sine', 0.08, 0.04); break;
      case 'start': noise(0.32, 0.16, 0, 900); tone(130, 0.35, 'sawtooth', 0.08, 0, 260); break;
      case 'play': noise(0.26, 0.16, 0, 2100); tone(220, 0.22, 'sawtooth', 0.12, 0.02, 80); break;
      case 'reveal': noise(0.2, 0.12, 0, 1600); tone(440, 0.18, 'triangle', 0.08, 0, 880); break;
      case 'win-round': tone(330, 0.18, 'triangle', 0.13); tone(495, 0.2, 'triangle', 0.12, 0.08); tone(660, 0.32, 'triangle', 0.11, 0.16); break;
      case 'lose-round': tone(220, 0.22, 'sawtooth', 0.09, 0, 120); noise(0.2, 0.1, 0, 700); break;
      case 'victory': [0, .11, .22, .34].forEach((d, i) => tone([392, 523, 659, 784][i], 0.5, 'triangle', 0.13, d)); noise(0.7, 0.08, 0, 800); break;
      case 'defeat': [0, .14, .28].forEach((d, i) => tone([220, 185, 147][i], 0.45, 'sawtooth', 0.1, d)); break;
    }
  }

  /* ---------- particles ---------- */
  const canvas = $('#fx');
  const ctx = canvas.getContext('2d');
  let particles = [];
  let W = 0, H = 0, DPR = 1;
  function resizeCanvas() {
    DPR = Math.min(window.devicePixelRatio || 1, 2);
    W = window.innerWidth;
    H = window.innerHeight;
    canvas.width = Math.floor(W * DPR);
    canvas.height = Math.floor(H * DPR);
    canvas.style.width = `${W}px`;
    canvas.style.height = `${H}px`;
    ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
  }
  function makeParticle(burstParticle = false, x = 0, y = 0, color = null) {
    const base = burstParticle
      ? { x, y, vx: rand(-2.6, 2.6), vy: rand(-3.2, -0.4), life: rand(.5, 1.2), maxLife: 1.2 }
      : { x: rand(0, W), y: rand(H * .2, H * 1.1), vx: rand(-.18, .18), vy: rand(-.5, -.12), life: rand(3, 8), maxLife: 8 };
    return {
      ...base,
      r: burstParticle ? rand(.8, 2.6) : rand(.4, 1.8),
      color: color || pick(['#f6c453', '#ff7c52', '#ff4d55', '#ffe7a0', '#8bd6ff']),
      alpha: burstParticle ? 1 : rand(.12, .5)
    };
  }
  function burst(x, y, color = '#f6c453', count = 22) {
    for (let i = 0; i < count; i++) particles.push(makeParticle(true, x + rand(-6, 6), y + rand(-6, 6), Math.random() < .4 ? color : null));
    if (particles.length > 260) particles = particles.slice(-260);
  }
  let lastFrame = 0;
  function drawParticles(time) {
    requestAnimationFrame(drawParticles);
    if (time - lastFrame < 28) return;
    const dt = Math.min(3, (time - lastFrame) / 28) || 1;
    lastFrame = time;
    ctx.clearRect(0, 0, W, H);
    if (Math.random() < .3 && particles.length < 90) particles.push(makeParticle(false));
    ctx.globalCompositeOperation = 'lighter';
    for (let i = particles.length - 1; i >= 0; i--) {
      const p = particles[i];
      p.x += p.vx * dt;
      p.y += p.vy * dt;
      p.life -= .016 * dt;
      if (p.life <= 0 || p.y < -20 || p.x < -20 || p.x > W + 20) {
        particles.splice(i, 1);
        continue;
      }
      const alpha = clamp(p.life / p.maxLife, 0, 1) * p.alpha;
      ctx.globalAlpha = alpha;
      ctx.fillStyle = p.color;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1;
    ctx.globalCompositeOperation = 'source-over';
  }

  /* ---------- events ---------- */
  $('#playBtn').addEventListener('click', () => {
    ensureAudio();
    sfx('click');
    startBattle();
  });
  $('#deckBtn').addEventListener('click', () => {
    ensureAudio();
    sfx('click');
    openDeck();
  });
  $('#rematchBtn').addEventListener('click', () => {
    ensureAudio();
    sfx('click');
    startBattle();
  });
  $('#homeBtn').addEventListener('click', () => {
    sfx('click');
    startHome();
  });
  $('#quitBtn').addEventListener('click', () => {
    sfx('click');
    toast('MATCH FORFEITED');
    startHome();
  });
  $('#tiltBtn').addEventListener('click', toggleTilt);
  $('#soundBtn').addEventListener('click', toggleSound);
  $('#battleSoundBtn').addEventListener('click', toggleSound);
  $('.profile-chip').addEventListener('click', openSettings);
  dom.modal.addEventListener('click', event => {
    if (event.target.closest('[data-close-modal]')) closeModal();
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') {
      if (dom.modal.classList.contains('is-open')) closeModal();
      else if (dom.resultOverlay.classList.contains('is-open')) startHome();
    }
    if (event.key === ' ' && state.screen === 'home') {
      event.preventDefault();
      startBattle();
    }
  });
  window.addEventListener('resize', resizeCanvas);
  window.addEventListener('orientationchange', () => setTimeout(resizeCanvas, 200));

  // Subtle pointer parallax for the featured card.
  const feature = $('.feature-column');
  if (feature) {
    window.addEventListener('pointermove', event => {
      if (state.screen !== 'home' || window.innerWidth < 720) return;
      const nx = (event.clientX / window.innerWidth - .5) * 2;
      const ny = (event.clientY / window.innerHeight - .5) * 2;
      const card = $('#featureCard .card');
      if (card) card.style.transform = `rotateY(${(-11 + nx * 4).toFixed(2)}deg) rotateX(${(6 - ny * 3).toFixed(2)}deg) rotateZ(${(2 + nx).toFixed(2)}deg)`;
      const halo = $('.feature-halo');
      if (halo) halo.style.transform = `translate(${nx * 10}px, ${ny * 8}px)`;
    }, { passive: true });
  }

  function init() {
    resizeCanvas();
    requestAnimationFrame(drawParticles);
    dom.feature.innerHTML = cardMarkup(byId('roman'), { uid: 'feature-roman' });
    updateCoins();
    document.body.classList.toggle('is-muted', !state.sound);
    dom.tiltState.textContent = 'OFF';
    dom.playerAvatar.innerHTML = photo(byId('roman'));
    state.playerDeck = PLAYER_IDS.map(id => ({ ...byId(id) }));
    state.captain = byId('taker');
    renderOpponentProfile();
    updateSpotlight();
    // A tiny motion hint for desktop users.
    if (window.matchMedia('(pointer: fine)').matches) {
      dom.tiltBtn.title = 'Tilt control (best on phone or tablet)';
    }
    // Decorative card shine follow.
    $$('.card').forEach(card => {
      card.addEventListener('pointermove', event => {
        const rect = card.getBoundingClientRect();
        const px = (event.clientX - rect.left) / rect.width - .5;
        const py = (event.clientY - rect.top) / rect.height - .5;
        card.style.setProperty('--mx', `${px * 100}%`);
        card.style.setProperty('--my', `${py * 100}%`);
      });
    });
  }

  init();
})();
