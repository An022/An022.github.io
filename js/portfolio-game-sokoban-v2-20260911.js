(() => {
  let cols = 10;
  let rows = 6;
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
  const undoMove = document.getElementById('undoMove');

  const levels = {
    1: {
      mode: 'sokoban',
      cols: 10,
      rows: 10,
      label: 'CHAPTER 01 / THE SIGNAL GARDEN',
      title: 'Pip restores the decision room.',
      copy: 'Earth packed a business decision into four cargo crates. Restore the chain in order: ask why, read the data, spot the risk, then make the call. Each finished step locks in place.',
      player: 'business',
      start: { x: 4, y: 7 },
      map: [
        '##########',
        '#######.##',
        '#........#',
        '#....#...#',
        '#.######.#',
        '#..####..#',
        '#.#####..#',
        '#....##..#',
        '#........#',
        '##########'
      ],
      goals: [
        { x: 2, y: 7, step: '01' },
        { x: 6, y: 3, step: '02' },
        { x: 4, y: 2, step: '03' },
        { x: 1, y: 6, step: '04' }
      ],
      boxes: [
        { x: 3, y: 7, label: 'ASK WHY', order: 0, target: { x: 2, y: 7 } },
        { x: 7, y: 3, label: 'READ DATA', order: 1, target: { x: 6, y: 3 } },
        { x: 2, y: 2, label: 'SPOT RISK', order: 2, target: { x: 4, y: 2 } },
        { x: 3, y: 3, label: 'MAKE CALL', order: 3, target: { x: 1, y: 6 } }
      ]
    },
    2: {
      mode: 'lasermaze',
      label: 'CHAPTER 02 / THE SIGNAL LAB',
      title: 'Bit routes the impossible signal.',
      copy: 'Earth hardware scrambled the How Spark. Select each skill mirror, move it through the grid, and rotate its face until one beam reaches all four relays and the uplink.',
      player: 'tech',
      start: { x: 9, y: 5 },
      walls: [
        { x: 0, y: 0, label: '' },
        { x: 4, y: 3, label: '' },
        { x: 9, y: 1, label: '' },
        { x: 0, y: 5, label: '' }
      ],
      emitter: { x: -1, y: 4, direction: { x: 1, y: 0 } },
      receiver: { x: 10, y: 0 },
      targets: [
        { x: 2, y: 2, label: 'DISCOVER' },
        { x: 5, y: 1, label: 'DESIGN' },
        { x: 6, y: 3, label: 'BUILD' },
        { x: 8, y: 2, label: 'DELIVER' }
      ],
      mirrors: [
        { x: 1, y: 5, slash: false },
        { x: 3, y: 1, slash: true },
        { x: 5, y: 0, slash: true },
        { x: 6, y: 5, slash: true },
        { x: 9, y: 3, slash: true },
        { x: 7, y: 0, slash: false }
      ]
    },
    3: {
      mode: 'fusion',
      label: 'CHAPTER 03 / THE LAUNCH DECK',
      title: 'Two minds. One flight path.',
      copy: 'Pip and Bit must wake both power pads, then push the four reflector crates into place. Business aims the mission. Technology carries the signal. The ship needs both.',
      starts: {
        business: { x: 0, y: 5 },
        tech: { x: 9, y: 5 }
      },
      walls: [
        { x: 0, y: 0, label: '' },
        { x: 4, y: 3, label: '' },
        { x: 5, y: 3, label: '' },
        { x: 9, y: 0, label: '' }
      ],
      switches: [
        { x: 1, y: 4, owner: 'business', opens: 'why-power', symbol: 'W' },
        { x: 8, y: 4, owner: 'tech', opens: 'how-power', symbol: 'H' }
      ],
      goals: [
        { x: 2, y: 4 },
        { x: 2, y: 1 },
        { x: 7, y: 1 },
        { x: 7, y: 4 }
      ],
      boxes: [
        { x: 2, y: 3, label: 'WHY', slash: true, owner: 'fusion' },
        { x: 3, y: 1, label: 'WHY', slash: true, owner: 'fusion' },
        { x: 6, y: 1, label: 'HOW', slash: false, owner: 'fusion' },
        { x: 7, y: 3, label: 'HOW', slash: false, owner: 'fusion' }
      ],
      emitter: { x: -1, y: 4, direction: { x: 1, y: 0 } },
      receiver: { x: 10, y: 4 },
      targets: [
        { x: 2, y: 2, label: '01' },
        { x: 5, y: 1, label: '02' },
        { x: 7, y: 3, label: '03' },
        { x: 8, y: 4, label: 'HOME' }
      ]
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
  let goals = [];
  let terrain = [];
  let moveHistory = [];
  let mirrors = [];
  let laserTargets = [];
  let selectedMirror = 0;
  let laserSolved = false;
  let laserHitOrder = [];
  let dragState = null;

  function samePoint(a, b) {
    return a.x === b.x && a.y === b.y;
  }

  function inside(point) {
    return point.x >= 0 && point.x < cols && point.y >= 0 && point.y < rows;
  }

  function position(element, point) {
    element.style.left = String(point.x * (100 / cols)) + '%';
    element.style.top = String(point.y * (100 / rows)) + '%';
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
    arena.querySelectorAll('.terrain-tile, .game-crate, .workshop-wall, .goal-socket, .scene-hazard, .moon-switch, .moon-gate, .meeting-signal, .laser-mirror, .laser-target, .laser-emitter, .laser-receiver, .laser-path').forEach((element) => element.remove());
  }

  function addTerrain(tile) {
    const element = document.createElement('div');
    element.className = 'terrain-tile is-' + tile.kind;
    element.setAttribute('aria-hidden', 'true');
    element.innerHTML = '<span></span>';
    position(element, tile);
    arena.appendChild(element);
  }

  function addWall(wall) {
    const element = document.createElement('div');
    element.className = 'workshop-wall';
    element.innerHTML = '<span aria-hidden="true"></span><small></small>';
    element.querySelector('small').textContent = wall.label;
    position(element, wall);
    arena.appendChild(element);
  }

  function addGoal(goal, index) {
    const element = document.createElement('div');
    const filled = stage === 1
      ? boxes.some((box) => box.locked && samePoint(box, goal))
      : boxIndexAt(goal) >= 0;
    element.className = 'goal-socket is-' + (currentLevel().player || 'fusion') + (filled ? ' is-filled' : '');
    element.dataset.goal = String(index);
    element.innerHTML = '<span aria-hidden="true"></span>' + (goal.step ? '<small>STEP ' + goal.step + '</small>' : '');
    position(element, goal);
    arena.appendChild(element);
  }

  function addBox(box, index) {
    const element = document.createElement('div');
    const onGoal = stage === 1 ? box.locked : goalAt(box);
    element.className = 'game-crate is-' + (box.owner || currentLevel().player) + (onGoal ? ' is-on-goal is-locked' : '');
    element.dataset.box = String(index);
    element.innerHTML = box.slash !== undefined
      ? '<span class="crate-mirror" aria-hidden="true"></span><small></small>'
      : '<span class="part-pixel" aria-hidden="true"></span><small></small>';
    element.querySelector('small').textContent = box.label;
    if (box.sprite) setSprite(element.querySelector('.part-pixel'), box.sprite);
    if (box.slash !== undefined) element.querySelector('.crate-mirror').textContent = box.slash ? '/' : '\\';
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
    element.innerHTML = '<span aria-hidden="true">' + item.symbol + '</span><small>' + (currentLevel().mode === 'fusion' ? 'POWER PAD' : 'MOON SWITCH') + '</small>';
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

  function addLaserTarget(target, index) {
    const element = document.createElement('div');
    element.className = 'laser-target' + (target.hit ? ' is-hit' : '');
    element.dataset.target = String(index);
    element.innerHTML = '<span aria-hidden="true"></span><small></small>';
    element.querySelector('small').textContent = target.label;
    position(element, target);
    arena.appendChild(element);
  }

  function addMirror(mirror, index) {
    const element = document.createElement('button');
    element.type = 'button';
    element.className = 'laser-mirror' + (index === selectedMirror ? ' is-selected' : '');
    element.dataset.mirror = String(index);
    element.setAttribute('aria-label', 'Reflector ' + String(index + 1) + '. ' + (mirror.slash ? 'Slash' : 'Backslash') + ' orientation.');
    element.innerHTML = '<span aria-hidden="true"></span>';
    element.querySelector('span').textContent = mirror.slash ? '/' : '\\';
    position(element, mirror);
    element.addEventListener('click', () => {
      if (transitioning || stage !== 2) return;
      if (element.dataset.dragged === 'true') {
        element.dataset.dragged = 'false';
        return;
      }
      if (selectedMirror === index) rotateSelectedMirror();
      else {
        selectedMirror = index;
        gameStatus.textContent = 'Reflector ' + String(index + 1) + ' selected. Drag or use arrows; Space rotates.';
        renderArena();
      }
    });
    element.addEventListener('pointerdown', (event) => {
      if (transitioning || stage !== 2) return;
      event.preventDefault();
      selectedMirror = index;
      dragState = { pointerId: event.pointerId, element, moved: false };
      element.setPointerCapture?.(event.pointerId);
    });
    element.addEventListener('pointermove', (event) => {
      if (!dragState || dragState.pointerId !== event.pointerId || dragState.element !== element) return;
      const rect = arena.getBoundingClientRect();
      const next = {
        x: Math.max(0, Math.min(cols - 1, Math.floor((event.clientX - rect.left) / rect.width * cols))),
        y: Math.max(0, Math.min(rows - 1, Math.floor((event.clientY - rect.top) / rect.height * rows)))
      };
      if (samePoint(next, mirror) || wallAt(next) || mirrorAt(next, index) || samePoint(next, players.tech)) return;
      mirror.x = next.x;
      mirror.y = next.y;
      dragState.moved = true;
      position(element, mirror);
    });
    const finishDrag = (event) => {
      if (!dragState || dragState.pointerId !== event.pointerId || dragState.element !== element) return;
      const moved = dragState.moved;
      dragState = null;
      if (moved) {
        element.dataset.dragged = 'true';
        evaluateLaserMaze('Reflector moved. The beam recalculated instantly.');
      }
    };
    element.addEventListener('pointerup', finishDrag);
    element.addEventListener('pointercancel', finishDrag);
    arena.appendChild(element);
  }

  function traceLaser() {
    const level = currentLevel();
    const points = [[0, level.emitter.y + 0.5]];
    const visited = new Set();
    let point = { x: level.emitter.x, y: level.emitter.y };
    let direction = { ...level.emitter.direction };
    laserTargets.forEach((target) => { target.hit = false; });
    laserHitOrder = [];
    let reachedReceiver = false;

    for (let step = 0; step < 120; step += 1) {
      point = { x: point.x + direction.x, y: point.y + direction.y };
      if (!inside(point)) {
        points.push([
          Math.max(0, Math.min(cols, point.x + 0.5)),
          Math.max(0, Math.min(rows, point.y + 0.5))
        ]);
        reachedReceiver = samePoint(point, level.receiver);
        break;
      }

      points.push([point.x + 0.5, point.y + 0.5]);
      const state = point.x + ',' + point.y + ',' + direction.x + ',' + direction.y;
      if (visited.has(state) || wallAt(point)) break;
      visited.add(state);
      laserTargets.forEach((target) => {
        if (samePoint(target, point) && !target.hit) {
          target.hit = true;
          laserHitOrder.push(laserTargets.indexOf(target));
        }
      });

      const mirror = mirrors.find((item) => samePoint(item, point));
      if (mirror) {
        direction = mirror.slash
          ? { x: -direction.y, y: -direction.x }
          : { x: direction.y, y: direction.x };
      }
    }

    laserSolved = laserTargets.every((target) => target.hit) && laserHitOrder.every((value, index) => value === index);
    return points;
  }

  function renderLaserMaze() {
    for (let y = 0; y < rows; y += 1) {
      for (let x = 0; x < cols; x += 1) addTerrain({ x, y, kind: 'metal' });
    }
    const points = traceLaser();
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('class', 'laser-path');
    svg.setAttribute('viewBox', '0 0 ' + cols + ' ' + rows);
    svg.setAttribute('preserveAspectRatio', 'none');
    const polyline = document.createElementNS('http://www.w3.org/2000/svg', 'polyline');
    polyline.setAttribute('points', points.map((point) => point.join(',')).join(' '));
    svg.appendChild(polyline);
    arena.appendChild(svg);

    laserTargets.forEach(addLaserTarget);
    mirrors.forEach(addMirror);

    const emitter = document.createElement('div');
    emitter.className = 'laser-emitter';
    emitter.innerHTML = '<span aria-hidden="true">▶</span><small>HOW SPARK</small>';
    emitter.style.top = String(currentLevel().emitter.y * (100 / rows)) + '%';
    arena.appendChild(emitter);

    const receiver = document.createElement('div');
    receiver.className = 'laser-receiver' + (laserSolved ? ' is-live' : '');
    receiver.innerHTML = '<span aria-hidden="true">◉</span><small>UPLINK</small>';
    receiver.style.top = '0';
    arena.appendChild(receiver);
  }

  function traceFusionLaser() {
    const level = currentLevel();
    const points = [[0, level.emitter.y + 0.5]];
    laserTargets.forEach((target) => { target.hit = false; });
    if (!switches.every((item) => item.used)) return points;
    const visited = new Set();
    let point = { x: level.emitter.x, y: level.emitter.y };
    let direction = { ...level.emitter.direction };
    let reachedReceiver = false;
    for (let step = 0; step < 120; step += 1) {
      point = { x: point.x + direction.x, y: point.y + direction.y };
      if (!inside(point)) {
        points.push([Math.max(0, Math.min(cols, point.x + 0.5)), Math.max(0, Math.min(rows, point.y + 0.5))]);
        reachedReceiver = samePoint(point, level.receiver);
        break;
      }
      points.push([point.x + 0.5, point.y + 0.5]);
      const state = point.x + ',' + point.y + ',' + direction.x + ',' + direction.y;
      if (visited.has(state) || wallAt(point)) break;
      visited.add(state);
      laserTargets.forEach((target) => { if (samePoint(target, point)) target.hit = true; });
      const reflector = boxes.find((box) => samePoint(box, point));
      if (reflector) {
        direction = reflector.slash
          ? { x: -direction.y, y: -direction.x }
          : { x: direction.y, y: direction.x };
      }
    }
    laserSolved = reachedReceiver && laserTargets.every((target) => target.hit);
    return points;
  }

  function renderFusionLaser() {
    const points = traceFusionLaser();
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('class', 'laser-path fusion-beam' + (switches.every((item) => item.used) ? ' is-powered' : ''));
    svg.setAttribute('viewBox', '0 0 ' + cols + ' ' + rows);
    svg.setAttribute('preserveAspectRatio', 'none');
    const polyline = document.createElementNS('http://www.w3.org/2000/svg', 'polyline');
    polyline.setAttribute('points', points.map((point) => point.join(',')).join(' '));
    svg.appendChild(polyline);
    arena.appendChild(svg);
    laserTargets.forEach(addLaserTarget);
    const emitter = document.createElement('div');
    emitter.className = 'laser-emitter fusion-emitter' + (switches.every((item) => item.used) ? ' is-live' : '');
    emitter.innerHTML = '<span aria-hidden="true">▶</span><small>DUAL POWER</small>';
    emitter.style.top = String(currentLevel().emitter.y * (100 / rows)) + '%';
    arena.appendChild(emitter);
    const receiver = document.createElement('div');
    receiver.className = 'laser-receiver ship-receiver' + (laserSolved ? ' is-live' : '');
    receiver.innerHTML = '<span aria-hidden="true">◆</span><small>' + (laserSolved ? 'CHARGED' : 'SHIP') + '</small>';
    receiver.style.top = String(currentLevel().receiver.y * (100 / rows)) + '%';
    arena.appendChild(receiver);
  }

  function renderArena() {
    clearArena();
    terrain.forEach(addTerrain);
    walls.forEach(addWall);
    goals.forEach(addGoal);
    boxes.forEach(addBox);
    hazards.forEach(addHazard);
    gates.forEach(addGate);
    switches.forEach(addSwitch);
    if (stage === 2) renderLaserMaze();
    if (stage === 3 && currentLevel().mode === 'fusion') renderFusionLaser();
    else if (stage === 3) addMeetingSignal();
  }

  function renderProgress() {
    const labels = stage === 3 && currentLevel().mode === 'fusion'
      ? [
          switches[0]?.used ? 'WHY POWER' : '',
          switches[1]?.used ? 'HOW POWER' : '',
          laserTargets.some((target) => target.hit) ? 'BEAM ROUTED' : '',
          laserSolved ? 'SHIP CHARGED' : ''
        ]
      : stage === 1
      ? boxes.map((box) => box.locked ? box.label : '')
      : stage === 2
        ? laserTargets.map((target) => target.hit ? target.label : '')
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
    if (number === 2) return '<span>BIT / TAB SELECT · ARROWS MOVE · SPACE ROTATE</span>';
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
    cols = config.cols || 10;
    rows = config.rows || 6;
    arena.style.setProperty('--game-cols', cols);
    arena.style.setProperty('--game-rows', rows);
    arena.style.aspectRatio = cols + ' / ' + rows;
    arena.dataset.mode = config.mode;
    levelLabel.textContent = config.label;
    levelTitle.textContent = config.title;
    levelCopy.textContent = config.copy;
    stageCounter.textContent = 'CHAPTER 0' + String(number) + ' / 03';
    activeControls.innerHTML = controlsFor(number);
    chargePanel.hidden = true;
    terrain = [];
    walls = (config.walls || []).map((item) => ({ ...item }));
    goals = (config.goals || []).map((item) => ({ ...item }));
    if (config.map) {
      walls = [];
      config.map.forEach((line, y) => [...line].forEach((cell, x) => {
        if (cell === '#') walls.push({ x, y, label: '' });
        if (cell === '.') terrain.push({ x, y, kind: 'floor' });
      }));
    }
    if (config.mode === 'fusion') {
      for (let y = 0; y < rows; y += 1) {
        for (let x = 0; x < cols; x += 1) terrain.push({ x, y, kind: 'metal' });
      }
    }
    boxes = (config.boxes || []).map((item) => ({
      ...item,
      target: item.target ? { ...item.target } : null,
      locked: false
    }));
    moveHistory = [];
    mirrors = (config.mirrors || []).map((item) => ({ ...item }));
    laserTargets = (config.targets || []).map((item) => ({ ...item, hit: false }));
    selectedMirror = 0;
    laserSolved = false;
    laserHitOrder = [];
    dragState = null;
    undoMove.disabled = number === 1;
    undoMove.hidden = number === 3;
    undoMove.textContent = number === 2 ? 'Rotate mirror Space' : 'Undo move Z';
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
    renderArena();
    renderProgress();
    setTouchState(number);

    if (number === 1) {
      gameStatus.textContent = 'The docks remember sequence. Start with ASK WHY; completed steps lock in place. Z undoes a move.';
    } else if (number === 2) {
      gameStatus.textContent = 'Reflector 1 selected. Drag it with the mouse, or use arrows; Space rotates.';
    } else {
      gameStatus.textContent = 'Wake both power pads first. Then push the reflector crates until the beam reaches the ship.';
    }
    arena.focus({ preventScroll: true });
  }

  function wallAt(point) {
    return walls.some((wall) => samePoint(wall, point));
  }

  function goalAt(point) {
    return goals.some((goal) => samePoint(goal, point));
  }

  function walkable(point) {
    if (!inside(point) || wallAt(point)) return false;
    if (stage !== 1 || !currentLevel().map) return true;
    return terrain.some((tile) => samePoint(tile, point));
  }

  function snapshotSokoban() {
    return {
      player: { ...players.business },
      boxes: boxes.map((box) => ({ x: box.x, y: box.y, locked: box.locked })),
      progress
    };
  }

  function restoreSokoban(snapshot) {
    players.business = { ...snapshot.player };
    boxes.forEach((box, index) => Object.assign(box, snapshot.boxes[index]));
    progress = snapshot.progress;
    position(businessPlayer, players.business);
    renderProgress();
    renderArena();
    undoMove.disabled = moveHistory.length === 0;
    gameStatus.textContent = 'One move rewound. The warehouse remembers nothing.';
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
    if (stage === 1 && box.locked) {
      gameStatus.textContent = box.label + ' is locked into the decision chain. Plan around it.';
      bump('[data-box="' + String(index) + '"]');
      return false;
    }
    const destination = { x: box.x + delta.x, y: box.y + delta.y };
    if (!walkable(destination) || closedGateAt(destination) || boxIndexAt(destination) >= 0) {
      gameStatus.textContent = 'The cargo crate thunks against something solid.';
      bump('[data-box="' + String(index) + '"]');
      return false;
    }
    box.x = destination.x;
    box.y = destination.y;
    if (stage === 3 && currentLevel().mode === 'fusion') {
      gameStatus.textContent = goalAt(box) ? 'A reflector crate locks into its floor socket.' : 'The reflector crate rolls across the launch deck.';
      return true;
    }
    const reachedOwnDock = box.target && samePoint(box, box.target);
    if (reachedOwnDock && box.order === progress) {
      box.locked = true;
      progress += 1;
      gameStatus.textContent = box.label + ' locks in. Next: ' + (boxes[progress]?.label || 'launch the Why Lens') + '.';
    } else if (reachedOwnDock) {
      gameStatus.textContent = 'The logic chain skipped a step. Move this crate away; next comes ' + boxes[progress].label + '.';
    } else if (goalAt(box)) {
      gameStatus.textContent = 'Right kind of idea, wrong step. Match each crate to its numbered dock.';
    } else {
      gameStatus.textContent = 'The crate rolls. Keep enough room to get behind the next decision.';
    }
    renderProgress();
    if (progress === boxes.length) {
      renderArena();
      finishRoom('The decision room hums: why, data, risk, call. Pip has restored the Why Lens.');
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
    if (currentLevel().mode === 'fusion') {
      gameStatus.textContent = (type === 'business' ? 'Pip powered the Why circuit.' : 'Bit powered the How circuit.');
      return;
    }
    renderProgress();
    renderArena();
    gameStatus.textContent = (type === 'business' ? 'Pip' : 'Bit') + ' shifted a moon channel. A path moved on the other side.';
  }

  function atMeeting() {
    if (stage !== 3 || currentLevel().mode === 'fusion' || openedGates.size !== gates.length) return false;
    return samePoint(players.business, currentLevel().meeting.business) &&
      samePoint(players.tech, currentLevel().meeting.tech);
  }

  function movePlayer(type, key) {
    if (transitioning || atMeeting()) return;
    const delta = movement(key);
    const current = players[type];
    const next = { x: current.x + delta.x, y: current.y + delta.y };
    if (!walkable(next)) {
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
    const sokobanSnapshot = stage === 1 ? snapshotSokoban() : null;
    if (boxIndex >= 0 && !tryPushBox(type, boxIndex, delta)) return;
    players[type] = next;
    const playerElement = type === 'business' ? businessPlayer : techPlayer;
    position(playerElement, next);
    playerElement.classList.remove('is-stepping');
    window.requestAnimationFrame(() => playerElement.classList.add('is-stepping'));
    if (stage === 1) {
      moveHistory.push(sokobanSnapshot);
      undoMove.disabled = false;
    }
    if (boxIndex >= 0) renderArena();
    if (stage === 3) activateSwitch(type);
    if (stage === 3 && currentLevel().mode === 'fusion') {
      evaluateFusionState();
      return;
    }
    if (atMeeting()) {
      chargePanel.hidden = false;
      chargeText.textContent = 'Hold one WASD key and one arrow key together.';
      gameStatus.textContent = 'Map and spark reunited. Hold both controls to call the ship home.';
    }
  }

  function evaluateFusionState() {
    renderArena();
    renderProgress();
    const powered = switches.every((item) => item.used);
    chargePanel.hidden = !powered;
    if (!powered) {
      gameStatus.textContent = 'Both travelers must step on their own power pad before the emitter can wake.';
      return;
    }
    const lit = laserTargets.filter((target) => target.hit).length;
    chargeFill.style.width = String((lit / laserTargets.length) * 100) + '%';
    chargeText.textContent = laserSolved ? 'Flight battery charged.' : lit + ' of ' + laserTargets.length + ' flight cells charged.';
    if (laserSolved && !transitioning) {
      transitioning = true;
      gameStatus.textContent = 'Why chose the route. How carried the signal. Their ship is ready for home.';
      window.setTimeout(finishGame, 1400);
    } else if (!laserSolved) {
      gameStatus.textContent = 'Dual power online. Push the four reflector crates to complete the flight path.';
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

  function mirrorAt(point, exceptIndex) {
    return mirrors.some((mirror, index) => index !== exceptIndex && samePoint(mirror, point));
  }

  function evaluateLaserMaze(message) {
    renderArena();
    progress = laserTargets.filter((target) => target.hit).length;
    renderProgress();
    if (laserSolved) {
      finishRoom('DISCOVER → DESIGN → BUILD → DELIVER. The How Spark is online.');
    } else if (progress === laserTargets.length) {
      gameStatus.textContent = 'Every relay lit, but the handshake order is wrong. Route DISCOVER → DESIGN → BUILD → DELIVER.';
    } else {
      gameStatus.textContent = message || progress + ' of 4 relays lit. Follow the beam, then adjust the next reflection.';
    }
  }

  function moveSelectedMirror(key) {
    const mirror = mirrors[selectedMirror];
    const delta = movement(key);
    const destination = { x: mirror.x + delta.x, y: mirror.y + delta.y };
    if (!inside(destination) || wallAt(destination) || mirrorAt(destination, selectedMirror) || samePoint(destination, players.tech)) {
      gameStatus.textContent = 'That reflector has no room to move there.';
      bump('[data-mirror="' + String(selectedMirror) + '"]');
      return;
    }
    mirror.x = destination.x;
    mirror.y = destination.y;
    evaluateLaserMaze('Reflector moved. The beam recalculated instantly.');
  }

  function rotateSelectedMirror() {
    if (stage !== 2 || transitioning) return;
    const mirror = mirrors[selectedMirror];
    mirror.slash = !mirror.slash;
    evaluateLaserMaze('Reflector rotated. Watch where the beam changes direction.');
  }

  function selectNextMirror() {
    if (stage !== 2 || transitioning) return;
    selectedMirror = (selectedMirror + 1) % mirrors.length;
    renderArena();
    gameStatus.textContent = 'Reflector ' + String(selectedMirror + 1) + ' selected. Drag or use arrows; Space rotates.';
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
      if (techKeys.has(key)) moveSelectedMirror(key);
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
  undoMove.addEventListener('click', () => {
    if (stage === 2) {
      rotateSelectedMirror();
      return;
    }
    if (stage !== 1 || moveHistory.length === 0 || transitioning) return;
    restoreSokoban(moveHistory.pop());
  });

  window.addEventListener('keydown', (event) => {
    const key = normalizedKey(event);
    if (stage === 2 && !play.hidden && (event.code === 'Space' || event.key === ' ')) {
      event.preventDefault();
      rotateSelectedMirror();
      return;
    }
    if (stage === 2 && !play.hidden && event.key === 'Tab') {
      event.preventDefault();
      selectNextMirror();
      return;
    }
    if ((event.key === 'z' || event.key === 'Z') && stage === 1 && !play.hidden) {
      event.preventDefault();
      undoMove.click();
      return;
    }
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
