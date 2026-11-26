// Semua DOM: HUD, panel, toast, layar menang.
import { PLAYER_STATE } from '../state.js';
import { MAPS_DATA } from './world.js';
import { RARITY, CATEGORIES, findItem } from '../data/items.js';
import { SKILLS, xpToNextLevel } from '../data/skills.js';
import { upgradeSkill } from './progression.js';

const $ = (id) => document.getElementById(id);

let pullHandler = null;
let activeDialogue = null;
let lastComboCount = -1;
let lastComboPercent = -1;
export function setPullHandler(fn) { pullHandler = fn; }

export function anyPanelOpen() {
  return activeDialogue !== null ||
    [...document.querySelectorAll('.panel')].some((p) => p.classList.contains('show'));
}
export function closeAll() {
  document.querySelectorAll('.panel').forEach((p) => p.classList.remove('show'));
  closeDialogue();
}
export function isDialogueOpen() {
  return activeDialogue !== null;
}
export function showDialogue(name, lines) {
  activeDialogue = { name, lines, index: 0 };
  $('dialogue-name').textContent = name;
  $('dialogue-text').textContent = lines[0];
  $('dialogue').classList.add('show');
}
export function advanceDialogue() {
  if (!activeDialogue) return;
  activeDialogue.index++;
  if (activeDialogue.index >= activeDialogue.lines.length) {
    closeDialogue();
    return;
  }
  $('dialogue-text').textContent = activeDialogue.lines[activeDialogue.index];
}
export function closeDialogue() {
  activeDialogue = null;
  $('dialogue').classList.remove('show');
}
export function setPrompt(text) {
  const el = $('prompt');
  if (!text) { el.style.display = 'none'; return; }
  el.style.display = 'block';
  el.textContent = text;
}

export function toast(msg) {
  const t = document.createElement('div');
  t.className = 'tst';
  t.textContent = msg;
  $('toast').appendChild(t);
  setTimeout(() => t.remove(), 1900);
}

export function updateHUD() {
  $('c-organik').textContent = PLAYER_STATE.stock.organik;
  $('c-anorganik').textContent = PLAYER_STATE.stock.anorganik;
  $('c-b3').textContent = PLAYER_STATE.stock.b3;
  const m = Object.values(PLAYER_STATE.mythics).filter(Boolean).length;
  $('c-mythic').textContent = m + '/3';
  updateLevelHUD();
  if ($('panel-inv').classList.contains('show')) renderInv();
  if ($('panel-skills').classList.contains('show')) renderSkills();
}

export function updateLevelHUD() {
  const { level, xp } = PLAYER_STATE.progression;
  const next = xpToNextLevel(level);
  $('level-value').textContent = level;
  $('level-xp').textContent = xp;
  $('level-next').textContent = next;
  $('level-fill').style.width = Math.min(100, (xp / next) * 100) + '%';
}

export function updateComboHUD(count, progress) {
  const meter = $('combo-meter');
  if (!meter) return;
  const active = count > 0;
  meter.classList.toggle('active', active);
  if (!active) {
    lastComboCount = 0;
    lastComboPercent = 0;
    return;
  }
  const percent = Math.max(0, Math.min(100, Math.round(progress * 100)));
  if (lastComboCount !== count) {
    $('combo-value').textContent = 'x' + count;
    lastComboCount = count;
  }
  if (lastComboPercent !== percent) {
    $('combo-fill').style.width = percent + '%';
    lastComboPercent = percent;
  }
}

export function renderInv() {
  const body = $('inv-body');
  const buffs = PLAYER_STATE.inventory.map(findItem).filter((i) => i && i.c === 'buff');
  const cols = PLAYER_STATE.collectors.map((c) => ({ ...findItem(c.id), ...c })).filter(Boolean);
  const decos = PLAYER_STATE.decor.map(findItem).filter(Boolean);

  let h = '<h3 style="color:#bcd0f5;font-size:11px;margin:0 0 6px">BUFF (dapat di-equip)</h3>';
  h += buffs.length ? '' : '<p style="color:#7d8aa8">Belum ada.</p>';
  for (const b of buffs) {
    const on = PLAYER_STATE.equipped[b.slot] === b.id;
    h += `<div class="itemrow"><div class="nm">${b.n}<small>${b.d}</small></div>
      <button class="equip ${on ? 'on' : ''}" data-eq="${b.slot}" data-id="${b.id}">${on ? 'AKTIF' : 'PAKAI'}</button></div>`;
  }
  h += '<h3 style="color:#bcd0f5;font-size:11px;margin:12px 0 6px">PENGUMPUL OTOMATIS</h3>';
  h += cols.length ? '' : '<p style="color:#7d8aa8">Belum ada.</p>';
  for (const c of cols) {
    const col = RARITY[c.rarity].color;
    h += `<div class="itemrow"><div class="nm">${c.n}<small>Radius ${c.radius}px${c.gen ? ' - +1 tiap 8s' : ''}</small></div>
      <span class="tag" style="color:${col};border-color:${col}">${RARITY[c.rarity].name}</span></div>`;
  }
  h += '<h3 style="color:#bcd0f5;font-size:11px;margin:12px 0 6px">PAJANGAN TERPASANG</h3>';
  h += decos.length ? '' : '<p style="color:#7d8aa8">Belum ada.</p>';
  const uniq = {};
  decos.forEach((d) => { uniq[d.n] = (uniq[d.n] || 0) + 1; });
  for (const n in uniq) h += `<div class="itemrow"><div class="nm">${n} <small>x${uniq[n]}</small></div></div>`;

  body.innerHTML = h;
  body.querySelectorAll('[data-eq]').forEach((btn) => {
    btn.onclick = () => {
      const s = btn.dataset.eq, id = btn.dataset.id;
      PLAYER_STATE.equipped[s] = PLAYER_STATE.equipped[s] === id ? null : id;
      renderInv();
      updateHUD();
    };
  });
}

export function renderSkills() {
  const progression = PLAYER_STATE.progression;
  $('skill-summary').innerHTML =
    `<strong>Level ${progression.level}</strong><span>${progression.xp}/${xpToNextLevel(progression.level)} XP</span>` +
    `<b>${progression.skillPoints} poin skill tersedia</b>`;
  $('skill-list').innerHTML = Object.entries(SKILLS).map(([id, skill]) => {
    const rank = progression.skills[id];
    const maxed = rank >= skill.maxRank;
    return `<article class="skill-card">
      <div class="skill-copy">
        <h3>${skill.name}</h3>
        <p>${skill.description}</p>
        <small>RANK ${rank}/${skill.maxRank}</small>
        <div class="skill-ranks">${Array.from({ length: skill.maxRank }, (_, i) =>
          `<i class="${i < rank ? 'filled' : ''}"></i>`).join('')}</div>
      </div>
      <button class="skill-up" data-skill="${id}" ${maxed || progression.skillPoints < 1 ? 'disabled' : ''}>
        ${maxed ? 'MAKS' : 'TINGKATKAN'}
      </button>
    </article>`;
  }).join('');
  $('skill-list').querySelectorAll('[data-skill]').forEach((button) => {
    button.onclick = () => {
      if (!upgradeSkill(button.dataset.skill)) return;
      const skill = SKILLS[button.dataset.skill];
      toast(`${skill.name} meningkat ke rank ${PLAYER_STATE.progression.skills[button.dataset.skill]}.`);
      updateHUD();
    };
  });
}

export function renderMapGrid() {
  const g = $('map-grid');
  g.innerHTML = '';
  for (const id in MAPS_DATA) {
    const m = MAPS_DATA[id];
    const b = document.createElement('button');
    b.textContent = m.name;
    if (id === PLAYER_STATE.map) b.classList.add('here');
    b.onclick = () => { closeAll(); travelHandler && travelHandler(id); };
    g.appendChild(b);
  }
}

let travelHandler = null;
export function setTravelHandler(fn) { travelHandler = fn; }

export function renderResult(list) {
  const box = $('gacha-result');
  box.innerHTML = '';
  for (const it of list) {
    const d = document.createElement('div');
    d.className = 'card';
    d.style.borderColor = RARITY[it.r].color;
    d.style.boxShadow = `0 0 12px ${RARITY[it.r].color}55`;
    d.innerHTML = `<div class="rc" style="color:${RARITY[it.r].color}">${RARITY[it.r].name}</div>
      <div class="cn">${it.n}</div>
      <div class="rc" style="color:#7d8aa8;margin-top:4px">${CATEGORIES[it.c]}</div>`;
    box.appendChild(d);
  }
}

export function showWin(stats) {
  $('win-stats').textContent =
    `Total sampah terpilah: ${stats.picked} - Total tarikan gacha: ${stats.pulls}`;
  $('win').classList.add('show');
}

export function bindUI() {
  $('btn-inv').onclick = () => { renderInv(); $('panel-inv').classList.add('show'); };
  $('btn-skills').onclick = () => { renderSkills(); $('panel-skills').classList.add('show'); };
  $('btn-map').onclick = () => { renderMapGrid(); $('panel-map').classList.add('show'); };
  document.querySelectorAll('[data-close]').forEach((b) => { b.onclick = closeAll; });
  $('dialogue-next').onclick = advanceDialogue;
  $('pull1').onclick = () => pullHandler && pullHandler(1);
  $('pull10').onclick = () => pullHandler && pullHandler(10);
  $('btn-roam').onclick = () => {
    PLAYER_STATE.freeRoam = true;
    $('win').classList.remove('show');
  };
}