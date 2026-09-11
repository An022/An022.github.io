(() => {
  const COLS = 8;
  const ROWS = 5;
  const businessKeys = new Set(['w', 'a', 's', 'd']);
  const techKeys = new Set(['ArrowUp', 'ArrowLeft', 'ArrowDown', 'ArrowRight']);
  const validKeys = new Set([...businessKeys, ...techKeys]);

  const intro = document.getElementById('gameIntro');
  const play = document.getElementById('gamePlay');
  const complete = document.getElementById('gameComplete');
  const arena = document.getElementById('gameArena');
  const businessPlayer = document.getElementById('businessPlayer');
  const techPlayer = document.getElementById('techPlayer');
  const stageCounter = document.getElementById('stageCounter');
  const levelLabel = document.getElementById('levelLabel');
  const levelTitle = document.getElementById('levelTitle');
  const levelCopy = document.getElementById('levelCopy');
  const partTray = document.getElementById('partTray');
  const activeControls = document.getElementById('activeControls');
  const gameStatus = document.getElementById('gameStatus');
  const chargePanel = document.getElementById('chargePanel');
  const chargeFill = document.getElementById('chargeFill');
  const chargeText = document.getElementById('chargeText');
  const gameShell = document.getElementById('game');

  const levels = {
    1: {
      label: 'LEVEL 01 / BUSINESS SENSE',
      title: 'First, make the right problem.',
      copy: 'The machine wants a solution immediately. Rude. Collect the business pieces in the order a useful decision actually happens.',
      player: 'business',
      start: { x: 0, y: 4 },
      parts: [
        { x: 1, y: 3, label: 'Ask Why', sprite: [11, 1], wrong: 'A solution before a question? Consulting speedrun detected.' },
        { x: 5, y: 4, label: 'Read the Data', sprite: [12, 2], wrong: 'Reading the data later is how mystery charts are born.' },
        { x: 6, y: 1, label: 'Spot the Risk', sprite: [16, 2], wrong: 'Skipping risk? The audit part of my brain just woke up.' },
        { x: 2, y: 0, label: 'Make the Call', sprite: [14, 4], wrong: 'A decision without context? Bold strategy.' }
      ],
      blockers: [
        { x: 2, y: 3, label: 'SCOPE CREEP', sprite: [4, 1] },
        { x: 3, y: 3, label: 'ONE MORE THING', sprite: [5, 1] },
        { x: 4, y: 1, label: 'SURPRISE MEETING', sprite: [6, 1] },
        { x: 4, y: 2, label: 'NO AGENDA', sprite: [7, 1] },
        { x: 1, y: 1, label: 'final_v7.xlsx', sprite: [2, 2] }
      ]
    },
    2: {
      label: 'LEVEL 02 / TECHNICAL CRAFT',
      title: 'Now, build it without panic.',
      copy: 'Switch hands. Collect the technical pieces in order and resist the ancient urge to ship directly from localhost.',
      player: 'tech',
      start: { x: 7, y: 4 },
      parts: [
        { x: 6, y: 3, label: 'Define Input', sprite: [7, 2], wrong: 'Input later? Excellent plan for an output-shaped surprise.' },
        { x: 3, y: 4, label: 'Build Logic', sprite: [7, 4], wrong: 'There is currently nothing to build. The requirements are vibes.' },
        { x: 2, y: 1, label: 'Test It', sprite: [8, 4], wrong: 'There is currently nothing to test. Very peaceful, though.' },
        { x: 0, y: 2, label: 'Ship It', sprite: [12, 4], wrong: 'Deploying before testing? Fearless.' }
      ],
      blockers: [
        { x: 5, y: 3, label: 'WORKS ON MY MACHINE', sprite: [0, 2] },
        { x: 4, y: 3, label: 'NULL', sprite: [1, 2] },
        { x: 4, y: 2, label: 'LEGACY CODE', sprite: [6, 2] },
        { x: 1, y: 1, label: 'HOTFIX', sprite: [7, 2] },
        { x: 1, y: 2, label: 'CACHE?', sprite: [8, 2] }
      ]
    },
    3: {
      label: 'LEVEL 03 / PRODUCT MODE',
      title: 'Make both sides talk.',
      copy: 'Alternate between Business and Tech. The machine only works when each hand delivers the right piece at the right time.',
      parts: [
        { x: 1, y: 3, label: 'User Need', owner: 'business', sprite: [6, 4], wrong: 'Tech found a user need. Business would like to join the meeting.' },
        { x: 6, y: 3, label: 'Useful Data', owner: 'tech', sprite: [13, 2], wrong: 'Business has found raw data. Please keep Excel calm.' },
        { x: 3, y: 1, label: 'Priority', owner: 'business', sprite: [17, 4], wrong: 'The prototype is eager, but nobody picked a priority yet.' },
        { x: 4, y: 1, label: 'Prototype', owner: 'tech', sprite: [8, 5], wrong: 'Business cannot compile this piece. A developer has been paged.' }
      ],
      blockers: [
        { x: 3, y: 3, label: 'ALIGNMENT', sprite: [3, 2] },
        { x: 4, y: 3, label: 'SYNC MEETING', sprite: [4, 2] },
        { x: 2, y: 2, label: 'ASSUMPTION', sprite: [5, 2] },
        { x: 5, y: 2, label: 'EDGE CASE', sprite: [6, 2] }
      ],
      ports: {
        business: { x: 2, y: 0 },
        tech: { x: 5, y: 0 }
      }
    }
  };

  let stage = 0;
  let transitioning = false;
  let charge = 0;
  let lastFrame = performance.now();
  let wrongAttempts = 0;
  const heldKeys = new Set();
  const players = {
    business: { x: 0, y: 4 },
    tech: { x: 7, y: 4 }
  };
  let parts = [];
  let blockers = [];

  function position(element, point) {
    element.style.left = `${point.x * 12.5}%`;
    element.style.top = `${point.y * 20}%`;
  }

  function setSprite(element, sprite, prefix = '') {
    element.style.setProperty(`--${prefix}sx`, sprite[0]);
    element.style.setProperty(`--${prefix}sy`, sprite[1]);
  }

  function clearArena() {
    arena.querySelectorAll('.game-part, .blocker, .port').forEach((element) => element.remove());
  }

  function addBlocker(blockData) {
    const block = document.createElement('div');
    block.className = 'blocker';
    block.setAttribute('aria-label', `Obstacle: ${blockData.label}`);
    block.innerHTML = `<span class="blocker-pixel" aria-hidden="true"></span><small>${blockData.label}</small>`;
    setSprite(block.querySelector('.blocker-pixel'), blockData.sprite, 'c');
    position(block, blockData);
    arena.appendChild(block);
  }

  function nextPartIndex() {
    return parts.findIndex((part) => !part.collected);
  }

  function renderParts(type) {
    partTray.innerHTML = '';
    parts.forEach((part, index) => {
      const slot = document.createElement('div');
      slot.className = `part-slot${part.collected ? ' collected' : ''}`;
      slot.innerHTML = `<b>${String(index + 1).padStart(2, '0')}</b><span>${part.label}</span>${part.owner ? `<small>${part.owner}</small>` : ''}`;
      slot.dataset.slot = String(index);
      partTray.appendChild(slot);

      if (!part.collected) {
        const element = document.createElement('div');
        const owner = part.owner || type;
        element.className = `game-part is-${owner}${index === nextPartIndex() ? ' is-next' : ''}`;
        element.innerHTML = `<span class="part-pixel" aria-hidden="true"></span><small>${part.label}</small>`;
        element.dataset.part = String(index);
        setSprite(element.querySelector('.part-pixel'), part.sprite);
        position(element, part);
        arena.appendChild(element);
      }
    });
  }

  function renderPort(type, point, locked = false) {
    const port = document.createElement('div');
    port.className = `port ${type}-port${locked ? ' is-locked' : ''}`;
    port.innerHTML = `<span>${type === 'business' ? 'B' : 'T'}</span><small>${locked ? 'LOCKED' : 'PORT'}</small>`;
    port.dataset.port = type;
    position(port, point);
    arena.appendChild(port);
  }

  function unlockPorts() {
    arena.querySelectorAll('.port').forEach((port) => {
      port.classList.remove('is-locked');
      port.querySelector('small').textContent = 'PORT';
    });
    chargeText.textContent = 'Guide both characters onto their matching ports.';
    gameStatus.textContent = 'Parts aligned. Now park each character on its matching port.';
  }

  function controlsFor(level) {
    if (level === 1) return '<span>MOVE WITH</span> <kbd>W</kbd><kbd>A</kbd><kbd>S</kbd><kbd>D</kbd>';
    if (level === 2) return '<span>MOVE WITH</span> <kbd>↑</kbd><kbd>←</kbd><kbd>↓</kbd><kbd>→</kbd>';
    return '<span>USE BOTH</span> <kbd>WASD</kbd> + <kbd>ARROWS</kbd>';
  }

  function startLevel(number) {
    stage = number;
    transitioning = false;
    wrongAttempts = 0;
    heldKeys.clear();
    clearArena();
    charge = 0;
    chargeFill.style.width = '0%';
    chargePanel.hidden = number !== 3;

    const config = levels[number];
    levelLabel.textContent = config.label;
    levelTitle.textContent = config.title;
    levelCopy.textContent = config.copy;
    stageCounter.textContent = `LEVEL 0${number} / 03`;
    activeControls.innerHTML = controlsFor(number);
    blockers = config.blockers.map((item) => ({ ...item }));
    blockers.forEach(addBlocker);
    parts = config.parts.map((part) => ({ ...part, collected: false }));

    if (number < 3) {
      players[config.player] = { ...config.start };
      businessPlayer.classList.toggle('is-hidden', config.player !== 'business');
      techPlayer.classList.toggle('is-hidden', config.player !== 'tech');
      position(config.player === 'business' ? businessPlayer : techPlayer, players[config.player]);
      renderParts(config.player);
      gameStatus.textContent = number === 1 ? 'Start with Ask Why. Use W A S D.' : 'Start with Define Input. Use the arrow keys.';
    } else {
      players.business = { x: 0, y: 4 };
      players.tech = { x: 7, y: 4 };
      businessPlayer.classList.remove('is-hidden');
      techPlayer.classList.remove('is-hidden');
      position(businessPlayer, players.business);
      position(techPlayer, players.tech);
      renderParts('business');
      renderPort('business', config.ports.business, true);
      renderPort('tech', config.ports.tech, true);
      chargeText.textContent = 'Collect the four pieces in order to unlock the ports.';
      gameStatus.textContent = 'Business goes first: collect User Need with WASD.';
    }
    arena.focus({ preventScroll: true });
  }

  function blockerAt(point) {
    return blockers.find((block) => block.x === point.x && block.y === point.y);
  }

  function allPartsCollected() {
    return parts.length > 0 && parts.every((part) => part.collected);
  }

  function onBothPorts() {
    if (stage !== 3 || !allPartsCollected()) return false;
    const ports = levels[3].ports;
    return players.business.x === ports.business.x && players.business.y === ports.business.y && players.tech.x === ports.tech.x && players.tech.y === ports.tech.y;
  }

  function movement(key) {
    const directions = {
      w: { x: 0, y: -1 }, a: { x: -1, y: 0 }, s: { x: 0, y: 1 }, d: { x: 1, y: 0 },
      ArrowUp: { x: 0, y: -1 }, ArrowLeft: { x: -1, y: 0 }, ArrowDown: { x: 0, y: 1 }, ArrowRight: { x: 1, y: 0 }
    };
    return directions[key];
  }

  function pointToNextPart() {
    const index = nextPartIndex();
    arena.querySelectorAll('.game-part').forEach((element) => element.classList.remove('is-hinted'));
    const element = arena.querySelector(`[data-part="${index}"]`);
    if (element) element.classList.add('is-hinted');
  }

  function collectAt(playerType) {
    const player = players[playerType];
    const found = parts.findIndex((part) => !part.collected && part.x === player.x && part.y === player.y);
    if (found < 0) return;

    const expected = nextPartIndex();
    const part = parts[found];
    if (found !== expected || (part.owner && part.owner !== playerType)) {
      wrongAttempts += 1;
      gameStatus.textContent = part.wrong;
      const element = arena.querySelector(`[data-part="${found}"]`);
      element?.classList.remove('is-bumped');
      window.requestAnimationFrame(() => element?.classList.add('is-bumped'));
      if (wrongAttempts >= 2) {
        pointToNextPart();
        gameStatus.textContent += ` Hint: ${parts[expected].label} is glowing.`;
      }
      return;
    }

    wrongAttempts = 0;
    part.collected = true;
    const partElement = arena.querySelector(`[data-part="${found}"]`);
    const slotElement = partTray.querySelector(`[data-slot="${found}"]`);
    if (partElement) {
      partElement.classList.add('collected');
      window.setTimeout(() => partElement.remove(), 260);
    }
    if (slotElement) slotElement.classList.add('collected');
    const next = parts[expected + 1];
    gameStatus.textContent = next ? `${part.label} collected. Next: ${next.label}.` : `${part.label} collected. Sequence complete.`;

    window.setTimeout(() => {
      const nextElement = arena.querySelector(`[data-part="${expected + 1}"]`);
      nextElement?.classList.add('is-next');
    }, 280);

    if (allPartsCollected()) {
      if (stage < 3) {
        transitioning = true;
        gameStatus.textContent = stage === 1 ? 'Business plan assembled. Handing this to Engineering…' : 'Build passed. Time for the highly technical alignment meeting…';
        window.setTimeout(() => startLevel(stage + 1), 1200);
      } else {
        unlockPorts();
      }
    }
  }

  function movePlayer(type, key) {
    if (transitioning || onBothPorts()) return;
    const delta = movement(key);
    const current = players[type];
    const next = {
      x: Math.max(0, Math.min(COLS - 1, current.x + delta.x)),
      y: Math.max(0, Math.min(ROWS - 1, current.y + delta.y))
    };
    const blocker = blockerAt(next);
    if (blocker) {
      gameStatus.textContent = `${blocker.label} blocked the route. A realistic workplace simulation.`;
      return;
    }
    players[type] = next;
    const playerElement = type === 'business' ? businessPlayer : techPlayer;
    position(playerElement, next);
    playerElement.classList.remove('is-stepping');
    window.requestAnimationFrame(() => playerElement.classList.add('is-stepping'));
    collectAt(type);
    if (onBothPorts()) {
      chargeText.textContent = 'Hold any WASD key and any arrow key together.';
      gameStatus.textContent = 'Both sides are ready. Power the machine with both hands.';
    }
  }

  function pressKey(key) {
    if (!validKeys.has(key) || stage === 0 || complete.hidden === false) return;
    heldKeys.add(key);
    if (businessKeys.has(key) && (stage === 1 || stage === 3)) movePlayer('business', key);
    if (techKeys.has(key) && (stage === 2 || stage === 3)) movePlayer('tech', key);
  }

  function releaseKey(key) {
    heldKeys.delete(key);
  }

  function finishGame() {
    stage = 4;
    play.hidden = true;
    complete.hidden = false;
    stageCounter.textContent = 'MACHINE ONLINE / 03';
    heldKeys.clear();
    complete.querySelector('.complete-button').focus({ preventScroll: true });
  }

  function unlockPortfolio(event) {
    if (event) event.preventDefault();
    document.body.classList.remove('portfolio-locked');
    gameShell.hidden = true;
    document.getElementById('home').scrollIntoView({ behavior: 'smooth' });
  }

  function normalizedKey(event) {
    const physicalKeys = {
      KeyW: 'w', KeyA: 'a', KeyS: 's', KeyD: 'd',
      ArrowUp: 'ArrowUp', ArrowLeft: 'ArrowLeft', ArrowDown: 'ArrowDown', ArrowRight: 'ArrowRight'
    };
    return physicalKeys[event.code] || (event.key.length === 1 ? event.key.toLowerCase() : event.key);
  }

  function chargeLoop(now) {
    const delta = Math.min(50, now - lastFrame);
    lastFrame = now;
    if (stage === 3 && onBothPorts()) {
      const leftActive = [...heldKeys].some((key) => businessKeys.has(key));
      const rightActive = [...heldKeys].some((key) => techKeys.has(key));
      if (leftActive && rightActive) {
        charge = Math.min(1, charge + delta / 1500);
        chargeFill.style.width = `${charge * 100}%`;
        chargeText.textContent = charge < 1 ? 'Keep both hands connected…' : 'Machine repaired. Somehow.';
        if (charge >= 1) finishGame();
      }
    }
    requestAnimationFrame(chargeLoop);
  }

  document.getElementById('startGame').addEventListener('click', () => {
    intro.hidden = true;
    play.hidden = false;
    startLevel(1);
  });

  window.addEventListener('keydown', (event) => {
    const key = normalizedKey(event);
    if (!validKeys.has(key) || play.hidden) return;
    event.preventDefault();
    pressKey(key);
  });

  window.addEventListener('keyup', (event) => {
    releaseKey(normalizedKey(event));
  });

  window.addEventListener('blur', () => heldKeys.clear());
  document.getElementById('skipGame').addEventListener('click', unlockPortfolio);
  document.getElementById('accessSkip').addEventListener('click', unlockPortfolio);
  document.querySelector('.complete-button').addEventListener('click', unlockPortfolio);

  document.querySelectorAll('.touch-pad button').forEach((button) => {
    const key = button.dataset.key;
    const down = (event) => { event.preventDefault(); button.setPointerCapture?.(event.pointerId); pressKey(key); };
    const up = (event) => { event.preventDefault(); releaseKey(key); };
    button.addEventListener('pointerdown', down);
    button.addEventListener('pointerup', up);
    button.addEventListener('pointercancel', up);
  });

  requestAnimationFrame(chargeLoop);
})();
