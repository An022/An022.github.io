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
      title: 'Understand what matters.',
      copy: 'Use your left hand to collect the pieces that turn a messy situation into a clear problem.',
      player: 'business',
      start: { x: 0, y: 4 },
      parts: [
        { x: 1, y: 3, label: 'Context' },
        { x: 4, y: 1, label: 'Process' },
        { x: 7, y: 2, label: 'Risk' }
      ],
      blockers: [{ x: 2, y: 3 }, { x: 3, y: 3 }, { x: 5, y: 1 }, { x: 5, y: 2 }]
    },
    2: {
      label: 'LEVEL 02 / TECHNICAL CRAFT',
      title: 'Build the working parts.',
      copy: 'Switch to your right hand. Collect the pieces that transform an idea into a dependable system.',
      player: 'tech',
      start: { x: 7, y: 4 },
      parts: [
        { x: 6, y: 3, label: 'Code' },
        { x: 3, y: 1, label: 'Data' },
        { x: 0, y: 2, label: 'Systems' }
      ],
      blockers: [{ x: 5, y: 3 }, { x: 4, y: 3 }, { x: 2, y: 1 }, { x: 2, y: 2 }]
    },
    3: {
      label: 'LEVEL 03 / BRING BOTH SIDES TOGETHER',
      title: 'Connect the whole system.',
      copy: 'Use both hands. Guide Business and Tech to their matching ports, then power the connection together.',
      blockers: [{ x: 3, y: 2 }, { x: 4, y: 2 }],
      ports: {
        business: { x: 2, y: 1 },
        tech: { x: 5, y: 1 }
      }
    }
  };

  let stage = 0;
  let transitioning = false;
  let charge = 0;
  let lastFrame = performance.now();
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

  function clearArena() {
    arena.querySelectorAll('.game-part, .blocker, .port').forEach((element) => element.remove());
  }

  function addBlocker(point) {
    const block = document.createElement('div');
    block.className = 'blocker';
    block.setAttribute('aria-hidden', 'true');
    position(block, point);
    arena.appendChild(block);
  }

  function renderParts(type) {
    partTray.innerHTML = '';
    parts.forEach((part, index) => {
      const slot = document.createElement('div');
      slot.className = `part-slot${part.collected ? ' collected' : ''}`;
      slot.textContent = part.label;
      slot.dataset.slot = String(index);
      partTray.appendChild(slot);

      if (!part.collected) {
        const element = document.createElement('div');
        element.className = `game-part is-${type}`;
        element.textContent = part.label;
        element.dataset.part = String(index);
        position(element, part);
        arena.appendChild(element);
      }
    });
  }

  function renderPort(type, point) {
    const port = document.createElement('div');
    port.className = `port ${type}-port`;
    port.textContent = type === 'business' ? 'B PORT' : 'T PORT';
    position(port, point);
    arena.appendChild(port);
  }

  function controlsFor(level) {
    if (level === 1) return '<span>MOVE WITH</span> <kbd>W</kbd><kbd>A</kbd><kbd>S</kbd><kbd>D</kbd>';
    if (level === 2) return '<span>MOVE WITH</span> <kbd>↑</kbd><kbd>←</kbd><kbd>↓</kbd><kbd>→</kbd>';
    return '<span>USE BOTH</span> <kbd>WASD</kbd> + <kbd>ARROWS</kbd>';
  }

  function startLevel(number) {
    stage = number;
    transitioning = false;
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

    if (number < 3) {
      players[config.player] = { ...config.start };
      parts = config.parts.map((part) => ({ ...part, collected: false }));
      businessPlayer.classList.toggle('is-hidden', config.player !== 'business');
      techPlayer.classList.toggle('is-hidden', config.player !== 'tech');
      position(config.player === 'business' ? businessPlayer : techPlayer, players[config.player]);
      renderParts(config.player);
      gameStatus.textContent = number === 1 ? 'Use W A S D to move.' : 'Use the arrow keys to move.';
    } else {
      partTray.innerHTML = '<div class="part-slot collected">Business lens</div><div class="part-slot collected">Technical craft</div>';
      players.business = { x: 0, y: 4 };
      players.tech = { x: 7, y: 4 };
      businessPlayer.classList.remove('is-hidden');
      techPlayer.classList.remove('is-hidden');
      position(businessPlayer, players.business);
      position(techPlayer, players.tech);
      renderPort('business', config.ports.business);
      renderPort('tech', config.ports.tech);
      chargeText.textContent = 'Move both players onto their matching ports.';
      gameStatus.textContent = 'WASD moves Business. Arrow keys move Tech.';
    }
    arena.focus({ preventScroll: true });
  }

  function isBlocked(point) {
    return blockers.some((block) => block.x === point.x && block.y === point.y);
  }

  function onBothPorts() {
    if (stage !== 3) return false;
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

  function collectAt(playerType) {
    const player = players[playerType];
    const found = parts.findIndex((part) => !part.collected && part.x === player.x && part.y === player.y);
    if (found < 0) return;

    parts[found].collected = true;
    const partElement = arena.querySelector(`[data-part="${found}"]`);
    const slotElement = partTray.querySelector(`[data-slot="${found}"]`);
    if (partElement) {
      partElement.classList.add('collected');
      window.setTimeout(() => partElement.remove(), 260);
    }
    if (slotElement) slotElement.classList.add('collected');
    gameStatus.textContent = `${parts[found].label} collected.`;

    if (parts.every((part) => part.collected)) {
      transitioning = true;
      gameStatus.textContent = stage === 1 ? 'Business sense assembled. Switching hands…' : 'Technical craft assembled. Time to use both hands…';
      window.setTimeout(() => startLevel(stage + 1), 1100);
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
    if (isBlocked(next)) {
      gameStatus.textContent = 'That route is blocked. Try another way.';
      return;
    }
    players[type] = next;
    position(type === 'business' ? businessPlayer : techPlayer, next);
    if (stage < 3) collectAt(type);
    if (onBothPorts()) {
      chargeText.textContent = 'Hold any WASD key and any arrow key together.';
      gameStatus.textContent = 'Both sides are ready. Power the connection with both hands.';
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
    stageCounter.textContent = 'COMPLETE / 03';
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
        charge = Math.min(1, charge + delta / 1800);
        chargeFill.style.width = `${charge * 100}%`;
        chargeText.textContent = charge < 1 ? 'Keep both hands connected…' : 'Connection complete.';
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
    const key = normalizedKey(event);
    releaseKey(key);
  });

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
