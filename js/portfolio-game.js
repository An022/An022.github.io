(() => {
  const COLS = 10;
  const ROWS = 6;
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
  const resetLevel = document.getElementById('resetLevel');

  const levels = {
    1: {
      mode: 'sokoban',
      label: 'CHAPTER 01 / THE SIGNAL GARDEN',
      title: 'Pip finds what matters.',
      copy: 'A good decision begins with a question and ends with a call. Push each lost signal into its matching moon socket when its moment feels right.',
      player: 'business',
      start: { x: 1, y: 5 },
      boxes: [
        { x: 2, y: 3, label: 'Ask Why', target: { x: 2, y: 1 }, sprite: [11, 1] },
        { x: 4, y: 4, label: 'Read Data', target: { x: 4, y: 1 }, sprite: [12, 2] },
        { x: 6, y: 3, label: 'Spot Risk', target: { x: 6, y: 1 }, sprite: [16, 2] },
        { x: 8, y: 4, label: 'Make the Call', target: { x: 8, y: 1 }, sprite: [14, 4] }
      ],
      walls: [
        { x: 0, y: 2, label: 'NOISE' },
        { x: 3, y: 2, label: 'SILO' },
        { x: 5, y: 2, label: 'SILO' },
        { x: 7, y: 2, label: 'SILO' },
        { x: 9, y: 3, label: 'GUESS' }
      ]
    },
    2: {
      mode: 'sleepwalk',
      label: 'CHAPTER 02 / THE SLEEPING FACTORY',
      title: 'Bit builds a way through.',
      copy: 'Bit is sleepwalking toward the launch tower. Read each scene and use the arrow that makes the path safe. He will handle the walking. Probably.',
      player: 'tech',
      start: { x: 0, y: 4 },
      hazards: [
        { x: 2, label: 'A very inconvenient gap', key: 'ArrowDown', action: 'LOWER BRIDGE', sprite: [10, 6] },
        { x: 4, label: 'A fan facing the wrong way', key: 'ArrowLeft', action: 'TURN FAN', sprite: [15, 5] },
        { x: 6, label: 'A suspicious falling crate', key: 'ArrowUp', action: 'RAISE SHIELD', sprite: [6, 3] },
        { x: 8, label: 'A launch door with opinions', key: 'ArrowRight', action: 'SEND SIGNAL', sprite: [12, 4] }
      ]
    },
    3: {
      mode: 'switchboard',
      label: 'CHAPTER 03 / THE TWIN MOON STATION',
      title: 'They open the way for each other.',
      copy: 'Every moon switch changes a corridor on the other side. Pip carries the map. Bit carries the spark. Guide both toward the signal at the center.',
      starts: {
        business: { x: 0, y: 5 },
        tech: { x: 9, y: 5 }
      },
      walls: [
        { x: 0, y: 3, label: 'MOONWALL' },
        { x: 1, y: 3, label: 'MOONWALL' },
        { x: 2, y: 3, label: 'MOONWALL' },
        { x: 4, y: 3, label: 'MOONWALL' },
        { x: 5, y: 3, label: 'MOONWALL' },
        { x: 6, y: 3, label: 'MOONWALL' },
        { x: 7, y: 3, label: 'MOONWALL' },
        { x: 9, y: 3, label: 'MOONWALL' },
        { x: 4, y: 1, label: 'DIVIDE' },
        { x: 4, y: 2, label: 'DIVIDE' },
        { x: 5, y: 1, label: 'DIVIDE' },
        { x: 5, y: 2, label: 'DIVIDE' }
      ],
      gates: [
        { id: 'blue-lower', x: 8, y: 3, owner: 'tech' },
        { id: 'gold-lower', x: 3, y: 3, owner: 'business' },
        { id: 'blue-center', x: 6, y: 0, owner: 'tech' },
        { id: 'gold-center', x: 4, y: 0, owner: 'business' }
      ],
      switches: [
        { x: 1, y: 4, owner: 'business', opens: 'blue-lower', symbol: '☾' },
        { x: 7, y: 2, owner: 'tech', opens: 'gold-lower', symbol: '◐' },
        { x: 2, y: 1, owner: 'business', opens: 'blue-center', symbol: '◑' },
        { x: 7, y: 1, owner: 'tech', opens: 'gold-center', symbol: '☽' }
      ],
      meeting: {
        business: { x: 4, y: 0 },
        tech: { x: 5, y: 0 }
      }
    }
  };

  let stage = 0;
  let progress = 0;
  let transitioning = false;
  let charge = 0;
  let lastFrame = performance.now();
  let sleepwalkTimer = 0;
  let dualPulseUntil = 0;
  const lastFamilyPress = { business: -1000, tech: -1000 };
  const heldKeys = new Set();
  const openedGates = new Set();
  const players = {
    business: { x: 0, y: 0 },
    tech: { x: 0, y: 0 }
  };
  let boxes = [];
  let walls = [];
  let hazards = [];
  let switches = [];
  let gates = [];

  function samePoint(a, b) {
    return a.x === b.x && a.y === b.y;
  }

  function inside(point) {
    return point.x >= 0 && point.x < COLS && point.y >= 0 && point.y < ROWS;
  }

  function position(element, point) {
    element.style.left = String(point.x * 10) + '%';
    element.style.top = String(point.y * (100 / ROWS)) + '%';
  }

  function setSprite(element, sprite) {
    element.style.setProperty('--sx', sprite[0]);
    element.style.setProperty('--sy', sprite[1]);
  }

  function currentLevel() {
    return levels[stage];
  }

  function clearTimer() {
    if (sleepwalkTimer) window.clearInterval(sleepwalkTimer);
    sleepwalkTimer = 0;
  }

  function clearArena() {
    arena.querySelectorAll('.game-crate, .workshop-wall, .goal-socket, .scene-hazard, .moon-switch, .moon-gate, .meeting-signal').forEach((element) => element.remove());
  }

  function addWall(wall) {
    const element = document.createElement('div');
    element.className = 'workshop-wall';
    element.innerHTML = '<span aria-hidden="true"></span><small></small>';
    element.querySelector('small').textContent = wall.label;
    position(element, wall);
    arena.appendChild(element);
  }

  function addGoal(box, index) {
    const element = document.createElement('div');
    element.className = 'goal-socket is-' + (box.owner || currentLevel().player) + (box.locked ? ' is-filled' : '');
    element.dataset.goal = String(index);
    element.innerHTML = '<span aria-hidden="true"></span><small></small>';
    element.querySelector('small').textContent = box.label;
    position(element, box.target);
    arena.appendChild(element);
  }

  function addBox(box, index) {
    const element = document.createElement('div');
    element.className = 'game-crate is-' + (box.owner || currentLevel().player) + (box.locked ? ' is-locked' : '');
    element.dataset.box = String(index);
    element.innerHTML = '<span class="part-pixel" aria-hidden="true"></span><small></small>';
    element.querySelector('small').textContent = box.label;
    setSprite(element.querySelector('.part-pixel'), box.sprite);
    position(element, box);
    arena.appendChild(element);
  }

  function addHazard(hazard, index) {
    const element = document.createElement('div');
    element.className = 'scene-hazard' + (hazard.solved ? ' is-solved' : '') + (index === progress ? ' is-current' : '');
    element.dataset.hazard = String(index);
    element.innerHTML = '<span class="part-pixel" aria-hidden="true"></span><small></small>';
    element.querySelector('small').textContent = hazard.solved ? hazard.action : hazard.label;
    setSprite(element.querySelector('.part-pixel'), hazard.sprite);
    position(element, { x: hazard.x, y: 4 });
    arena.appendChild(element);
  }

  function addGate(gate) {
    const element = document.createElement('div');
    const open = openedGates.has(gate.id);
    element.className = 'moon-gate is-' + gate.owner + (open ? ' is-open' : '');
    element.dataset.gate = gate.id;
    element.innerHTML = '<span aria-hidden="true">' + (open ? '⌁' : '×') + '</span><small>' + (open ? 'OPEN' : 'PHASED') + '</small>';
    position(element, gate);
    arena.appendChild(element);
  }

  function addSwitch(item, index) {
    const element = document.createElement('div');
    element.className = 'moon-switch is-' + item.owner + (item.used ? ' is-used' : '');
    element.dataset.switch = String(index);
    element.innerHTML = '<span aria-hidden="true">' + item.symbol + '</span><small>MOON SWITCH</small>';
    position(element, item);
    arena.appendChild(element);
  }

  function addMeetingSignal() {
    const element = document.createElement('div');
    element.className = 'meeting-signal';
    element.innerHTML = '<span aria-hidden="true">✦</span><small>HOME SIGNAL</small>';
    element.style.left = '45%';
    element.style.top = '0';
    arena.appendChild(element);
  }

  function renderArena() {
    clearArena();
    walls.forEach(addWall);
    boxes.forEach(addGoal);
    boxes.forEach(addBox);
    hazards.forEach(addHazard);
    gates.forEach(addGate);
    switches.forEach(addSwitch);
    if (stage === 3) addMeetingSignal();
  }

  function renderProgress() {
    const labels = stage === 1
      ? boxes.map((box) => box.locked ? box.label : '')
      : stage === 2
        ? hazards.map((hazard) => hazard.solved ? hazard.action : '')
        : switches.map((item) => item.used ? 'Channel shifted' : '');
    partTray.innerHTML = '';
    labels.forEach((label) => {
      const slot = document.createElement('div');
      slot.className = 'part-slot' + (label ? ' collected' : '');
      slot.innerHTML = label ? '<b>◆</b><span></span>' : '<b>◇</b><span>Unknown signal</span>';
      if (label) slot.querySelector('span').textContent = label;
      partTray.appendChild(slot);
    });
  }

  function controlsFor(number) {
    if (number === 1) return '<span>PIP / PUSH</span><kbd>W</kbd><kbd>A</kbd><kbd>S</kbd><kbd>D</kbd>';
    if (number === 2) return '<span>BIT / CHANGE THE SCENE</span><kbd>↑</kbd><kbd>←</kbd><kbd>↓</kbd><kbd>→</kbd>';
    return '<span>PIP</span><kbd>WASD</kbd><span>+</span><span>BIT</span><kbd>ARROWS</kbd>';
  }

  function setTouchState(number) {
    document.querySelector('.business-pad').classList.toggle('is-inactive', number === 2);
    document.querySelector('.tech-pad').classList.toggle('is-inactive', number === 1);
  }

  function startLevel(number) {
    clearTimer();
    stage = number;
    progress = 0;
    transitioning = false;
    charge = 0;
    dualPulseUntil = 0;
    lastFamilyPress.business = -1000;
    lastFamilyPress.tech = -1000;
    heldKeys.clear();
    openedGates.clear();
    chargeFill.style.width = '0%';

    const config = currentLevel();
    arena.dataset.mode = config.mode;
    levelLabel.textContent = config.label;
    levelTitle.textContent = config.title;
    levelCopy.textContent = config.copy;
    stageCounter.textContent = 'CHAPTER 0' + String(number) + ' / 03';
    activeControls.innerHTML = controlsFor(number);
    chargePanel.hidden = true;
    walls = (config.walls || []).map((item) => ({ ...item }));
    boxes = (config.boxes || []).map((item, index) => ({
      ...item,
      target: { ...item.target },
      order: index,
      locked: false
    }));
    hazards = (config.hazards || []).map((item) => ({ ...item, solved: false }));
    switches = (config.switches || []).map((item) => ({ ...item, used: false }));
    gates = (config.gates || []).map((item) => ({ ...item }));

    if (number < 3) {
      players[config.player] = { ...config.start };
      businessPlayer.classList.toggle('is-hidden', config.player !== 'business');
      techPlayer.classList.toggle('is-hidden', config.player !== 'tech');
      position(config.player === 'business' ? businessPlayer : techPlayer, players[config.player]);
    } else {
      players.business = { ...config.starts.business };
      players.tech = { ...config.starts.tech };
      businessPlayer.classList.remove('is-hidden');
      techPlayer.classList.remove('is-hidden');
      position(businessPlayer, players.business);
      position(techPlayer, players.tech);
    }

    businessPlayer.querySelector('span').textContent = number === 3 ? 'PIP · WHY' : 'PIP';
    techPlayer.querySelector('span').textContent = number === 3 ? 'BIT · HOW' : 'BIT';
    renderProgress();
    renderArena();
    setTouchState(number);

    if (number === 1) {
      gameStatus.textContent = 'Crates can be pushed, never pulled. The story tells you more than the sockets do.';
    } else if (number === 2) {
      gameStatus.textContent = 'Bit is already moving. Watch the scene, then choose what the environment should do.';
      transitioning = true;
      window.setTimeout(walkToNextHazard, 650);
    } else {
      gameStatus.textContent = 'A moon switch never opens your own path. Help the traveler across from you.';
    }
    arena.focus({ preventScroll: true });
  }

  function wallAt(point) {
    return walls.some((wall) => samePoint(wall, point));
  }

  function closedGateAt(point) {
    return gates.find((gate) => samePoint(gate, point) && !openedGates.has(gate.id));
  }

  function boxIndexAt(point) {
    return boxes.findIndex((box) => samePoint(box, point));
  }

  function otherPlayerAt(point, type) {
    if (stage !== 3) return false;
    return Object.entries(players).some(([name, player]) => name !== type && samePoint(player, point));
  }

  function movement(key) {
    return {
      w: { x: 0, y: -1 },
      a: { x: -1, y: 0 },
      s: { x: 0, y: 1 },
      d: { x: 1, y: 0 },
      ArrowUp: { x: 0, y: -1 },
      ArrowLeft: { x: -1, y: 0 },
      ArrowDown: { x: 0, y: 1 },
      ArrowRight: { x: 1, y: 0 }
    }[key];
  }

  function bump(selector) {
    const element = arena.querySelector(selector);
    if (!element) return;
    element.classList.remove('is-bumped');
    window.requestAnimationFrame(() => element.classList.add('is-bumped'));
  }

  function finishRoom(message) {
    if (transitioning) return;
    transitioning = true;
    gameStatus.textContent = message;
    window.setTimeout(() => startLevel(stage + 1), 1400);
  }

  function tryPushBox(type, index, delta) {
    const box = boxes[index];
    if (box.locked) {
      gameStatus.textContent = 'That thought is already settled. Let it rest.';
      return false;
    }
    if (box.order !== progress) {
      gameStatus.textContent = 'The moon socket stays dark. This thought arrived too early.';
      bump('[data-box="' + String(index) + '"]');
      return false;
    }
    const destination = { x: box.x + delta.x, y: box.y + delta.y };
    if (!inside(destination) || wallAt(destination) || closedGateAt(destination) || boxIndexAt(destination) >= 0) {
      gameStatus.textContent = 'The signal crystal clicks against something solid.';
      bump('[data-box="' + String(index) + '"]');
      return false;
    }
    box.x = destination.x;
    box.y = destination.y;
    if (samePoint(box, box.target)) {
      box.locked = true;
      progress += 1;
      gameStatus.textContent = box.label + ' resonates with the Why Lens.';
      renderProgress();
      if (progress === boxes.length) {
        renderArena();
        finishRoom('The Why Lens is restored. Somewhere across Earth, the engine answers.');
      }
    }
    return true;
  }

  function activateSwitch(type) {
    const index = switches.findIndex((item) => !item.used && item.owner === type && samePoint(item, players[type]));
    if (index < 0) return;
    const item = switches[index];
    item.used = true;
    openedGates.add(item.opens);
    progress += 1;
    renderProgress();
    renderArena();
    gameStatus.textContent = (type === 'business' ? 'Pip' : 'Bit') + ' shifted a moon channel. A path moved on the other side.';
  }

  function atMeeting() {
    if (stage !== 3 || openedGates.size !== gates.length) return false;
    return samePoint(players.business, currentLevel().meeting.business) &&
      samePoint(players.tech, currentLevel().meeting.tech);
  }

  function movePlayer(type, key) {
    if (transitioning || atMeeting()) return;
    const delta = movement(key);
    const current = players[type];
    const next = { x: current.x + delta.x, y: current.y + delta.y };
    if (!inside(next)) {
      gameStatus.textContent = 'The edge of Earth. The ocean looks cold.';
      return;
    }
    const gate = closedGateAt(next);
    if (wallAt(next) || gate || otherPlayerAt(next, type)) {
      gameStatus.textContent = gate ? 'This moon channel is facing the wrong way.' : 'Old Earth machinery blocks the path.';
      if (gate) bump('[data-gate="' + gate.id + '"]');
      return;
    }

    const boxIndex = boxIndexAt(next);
    if (boxIndex >= 0 && !tryPushBox(type, boxIndex, delta)) return;
    players[type] = next;
    const playerElement = type === 'business' ? businessPlayer : techPlayer;
    position(playerElement, next);
    playerElement.classList.remove('is-stepping');
    window.requestAnimationFrame(() => playerElement.classList.add('is-stepping'));
    if (boxIndex >= 0) renderArena();
    if (stage === 3) activateSwitch(type);
    if (atMeeting()) {
      chargePanel.hidden = false;
      chargeText.textContent = 'Hold one WASD key and one arrow key together.';
      gameStatus.textContent = 'Map and spark reunited. Hold both controls to call the ship home.';
    }
  }

  function walkToNextHazard() {
    if (stage !== 2 || progress >= hazards.length) return;
    transitioning = true;
    const stopX = hazards[progress].x - 1;
    clearTimer();
    sleepwalkTimer = window.setInterval(() => {
      if (players.tech.x < stopX) {
        players.tech.x += 1;
        position(techPlayer, players.tech);
        techPlayer.classList.toggle('is-stepping');
      } else {
        clearTimer();
        transitioning = false;
        gameStatus.textContent = hazards[progress].label + '. Change the scene before Bit takes another step.';
      }
    }, 310);
  }

  function handleSleepwalk(key) {
    if (transitioning || progress >= hazards.length) return;
    const hazard = hazards[progress];
    if (key !== hazard.key) {
      gameStatus.textContent = 'The device makes a tiny, unhelpful beep. Look at what the scene needs.';
      bump('[data-hazard="' + String(progress) + '"]');
      return;
    }
    hazard.solved = true;
    progress += 1;
    renderProgress();
    renderArena();
    gameStatus.textContent = hazard.action + '. Bit continues sleeping with impressive confidence.';
    if (progress === hazards.length) {
      transitioning = true;
      players.tech.x = 9;
      position(techPlayer, players.tech);
      window.setTimeout(() => {
        transitioning = false;
        finishRoom('The How Spark is awake. Its signal points toward Pip.');
      }, 750);
    } else {
      transitioning = true;
      window.setTimeout(walkToNextHazard, 650);
    }
  }

  function pressKey(key) {
    if (!validKeys.has(key) || stage === 0 || complete.hidden === false) return;
    heldKeys.add(key);
    const now = performance.now();
    if (businessKeys.has(key)) lastFamilyPress.business = now;
    if (techKeys.has(key)) lastFamilyPress.tech = now;
    if (stage === 3 && atMeeting() && Math.abs(lastFamilyPress.business - lastFamilyPress.tech) < 550) {
      dualPulseUntil = now + 1650;
    }
    if (stage === 2) {
      if (techKeys.has(key)) handleSleepwalk(key);
      return;
    }
    if (businessKeys.has(key) && (stage === 1 || stage === 3)) movePlayer('business', key);
    if (techKeys.has(key) && stage === 3) movePlayer('tech', key);
  }

  function releaseKey(key) {
    heldKeys.delete(key);
  }

  function finishGame() {
    stage = 4;
    play.hidden = true;
    complete.hidden = false;
    stageCounter.textContent = 'SIGNAL FOUND / HOME';
    heldKeys.clear();
    complete.querySelector('.complete-button').focus({ preventScroll: true });
  }

  function unlockPortfolio(event) {
    if (event) event.preventDefault();
    clearTimer();
    document.body.classList.remove('portfolio-locked');
    gameShell.hidden = true;
    document.getElementById('home').scrollIntoView({ behavior: 'smooth' });
  }

  function normalizedKey(event) {
    const physicalKeys = {
      KeyW: 'w',
      KeyA: 'a',
      KeyS: 's',
      KeyD: 'd',
      ArrowUp: 'ArrowUp',
      ArrowLeft: 'ArrowLeft',
      ArrowDown: 'ArrowDown',
      ArrowRight: 'ArrowRight'
    };
    return physicalKeys[event.code] || (event.key.length === 1 ? event.key.toLowerCase() : event.key);
  }

  function chargeLoop(now) {
    const delta = Math.min(50, now - lastFrame);
    lastFrame = now;
    if (stage === 3 && atMeeting()) {
      const leftActive = [...heldKeys].some((key) => businessKeys.has(key));
      const rightActive = [...heldKeys].some((key) => techKeys.has(key));
      if ((leftActive && rightActive) || now < dualPulseUntil) {
        charge = Math.min(1, charge + delta / 1500);
        chargeFill.style.width = String(charge * 100) + '%';
        chargeText.textContent = charge < 1 ? 'Keep map and spark connected…' : 'Home signal acquired.';
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

  resetLevel.addEventListener('click', () => startLevel(stage));

  window.addEventListener('keydown', (event) => {
    const key = normalizedKey(event);
    if (!validKeys.has(key) || play.hidden) return;
    event.preventDefault();
    pressKey(key);
  });

  window.addEventListener('keyup', (event) => releaseKey(normalizedKey(event)));
  window.addEventListener('blur', () => heldKeys.clear());
  document.getElementById('skipGame').addEventListener('click', unlockPortfolio);
  document.getElementById('accessSkip').addEventListener('click', unlockPortfolio);
  document.querySelector('.complete-button').addEventListener('click', unlockPortfolio);

  document.querySelectorAll('.touch-pad button').forEach((button) => {
    const key = button.dataset.key;
    const down = (event) => {
      event.preventDefault();
      button.setPointerCapture?.(event.pointerId);
      pressKey(key);
    };
    const up = (event) => {
      event.preventDefault();
      releaseKey(key);
    };
    button.addEventListener('pointerdown', down);
    button.addEventListener('pointerup', up);
    button.addEventListener('pointercancel', up);
  });

  requestAnimationFrame(chargeLoop);
})();
