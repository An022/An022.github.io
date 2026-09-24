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
      cols: 12,
      rows: 8,
      label: 'CHAPTER 01 / THE SIGNAL GARDEN',
      title: 'Restores the decision room.',
      copy: 'Push the four cargo crates onto any four docks in order: ask why, read the data, spot the risk, then make the call. Crates on docks remain movable.',
      player: 'business',
      start: { x: 4, y: 6 },
      techStart: { x: 10, y: 4 },
      storyPortal: { x: 0, y: 6 },
      key: { x: 10, y: 5 },
      exit: { x: 11, y: 4 },
      map: [
        '############',
        '#...#..#...#',
        '#..##..##..#',
        '#..#....#.##',
        '#.##.....#.D',
        '#.#..#...#.#',
        '#.........##',
        '############'
      ],
      goals: [
        { x: 6, y: 1, step: '01' },
        { x: 5, y: 1, step: '02' },
        { x: 6, y: 2, step: '03' },
        { x: 7, y: 3, step: '04' }
      ],
      boxes: [
        { x: 6, y: 3, label: 'ASK WHY', order: 0, target: { x: 6, y: 1 } },
        { x: 6, y: 5, label: 'READ DATA', order: 1, target: { x: 5, y: 1 } },
        { x: 5, y: 4, label: 'SPOT RISK', order: 2, target: { x: 6, y: 2 } },
        { x: 7, y: 5, label: 'MAKE CALL', order: 3, target: { x: 7, y: 3 } }
      ]
    },
    2: {
      mode: 'lasermaze',
      cols: 12,
      rows: 8,
      border: true,
      label: 'CHAPTER 02 / THE SIGNAL LAB',
      title: 'Routes the signal.',
      copy: 'Enter from the west and connect SOURCE to EXIT through DISCOVER → DESIGN → BUILD → DELIVER. Blue beacons turn red when the beam reaches them in order. Beacons are solid, so route around them.',
      player: 'tech',
      start: { x: 1, y: 6 },
      entry: { x: 0, y: 6 },
      walls: [
        { x: 1, y: 1, label: '' },
        { x: 5, y: 4, label: '' },
        { x: 10, y: 2, label: '' },
        { x: 11, y: 5, label: '', kind: 'exit' }
      ],
      emitter: { x: 1, y: 5, direction: { x: 1, y: 0 } },
      receiver: { x: 11, y: 5 },
      returnExit: { x: 11, y: 5 },
      targets: [
        { x: 2, y: 5, label: 'DISCOVER' },
        { x: 3, y: 3, label: 'DESIGN' },
        { x: 6, y: 2, label: 'BUILD' },
        { x: 9, y: 4, label: 'DELIVER' }
      ],
      mirrors: [
        { x: 5, y: 5, slash: false },
        { x: 4, y: 2, slash: true },
        { x: 9, y: 2, slash: true },
        { x: 8, y: 4, slash: true }
      ]
    },
    3: {
      mode: 'fusion',
      cols: 12,
      rows: 9,
      border: true,
      label: 'CHAPTER 03 / THE FROZEN RELAY',
      title: 'Charges the way home.',
      copy: 'Each tap slides until snow, rock, cargo, or your partner stops you. Push the green reflectors into the signal path and route the beam into the ship.',
      starts: {
        business: { x: 7, y: 2 },
        tech: { x: 2, y: 4 }
      },
      walls: [
        { x: 2, y: 1, label: '' },
        { x: 8, y: 1, label: '' },
        { x: 9, y: 2, label: '' },
        { x: 10, y: 6, label: '' },
        { x: 10, y: 7, label: '' },
        { x: 1, y: 7, label: '' }
      ],
      grip: [
        { x: 4, y: 3 },
        { x: 8, y: 7 }
      ],
      goals: [
        { x: 3, y: 3 },
        { x: 3, y: 2 },
        { x: 8, y: 2 },
        { x: 8, y: 3 }
      ],
      boxes: [
        { x: 3, y: 6, label: '', slash: true, owner: 'fusion', target: { x: 3, y: 3 } },
        { x: 6, y: 2, label: '', slash: true, owner: 'fusion', target: { x: 3, y: 2 } },
        { x: 8, y: 6, label: '', slash: false, owner: 'fusion', target: { x: 8, y: 2 } },
        { x: 5, y: 3, label: '', slash: false, owner: 'fusion', target: { x: 8, y: 3 } }
      ],
      emitter: { x: -1, y: 3, direction: { x: 1, y: 0 } },
      receiver: { x: 12, y: 3 },
      targets: [
        { x: 2, y: 3, label: 'ALIGN' },
        { x: 5, y: 2, label: 'ROUTE' },
        { x: 7, y: 2, label: 'CHARGE' },
        { x: 10, y: 3, label: 'HOME' }
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
  let spaceHeld = false;
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
  let techFacing = { x: -1, y: 0 };
  let laserSolved = false;
  let labExitReady = false;
  let returnMode = false;
  const returnEntered = new Set();
  let laserBlockedByBack = false;
  let laserHitOrder = [];
  let roomKeySpawned = false;
  let roomKeyCollected = false;
  let roomExitOpen = false;

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
    arena.querySelectorAll('.terrain-tile, .game-crate, .workshop-wall, .goal-socket, .scene-hazard, .moon-switch, .moon-gate, .meeting-signal, .laser-mirror, .laser-target, .laser-emitter, .laser-receiver, .laser-path, .lab-key, .lab-door, .story-portal, .ice-passage-tile, .lab-breach, .return-cave').forEach((element) => element.remove());
  }

  function addTerrain(tile) {
    const element = document.createElement('div');
    element.className = 'terrain-tile is-' + tile.kind;
    element.setAttribute('aria-hidden', 'true');
    element.dataset.pattern = String((tile.x + tile.y * 3) % 4);
    element.innerHTML = '<span></span><i></i>';
    position(element, tile);
    arena.appendChild(element);
  }

  function addWall(wall) {
    const element = document.createElement('div');
    element.className = 'workshop-wall' + (wall.kind === 'exit' ? ' is-exit-wall' : '');
    element.innerHTML = '<span aria-hidden="true"></span><i></i><small></small>';
    element.querySelector('small').textContent = wall.label;
    position(element, wall);
    arena.appendChild(element);
  }

  function addGoal(goal, index) {
    const element = document.createElement('div');
    const filled = stage === 1
      ? boxes.some((box) => samePoint(box, goal))
      : boxIndexAt(goal) >= 0;
    element.className = 'goal-socket is-' + (currentLevel().player || 'fusion') + (filled ? ' is-filled' : '');
    element.dataset.goal = String(index);
    element.innerHTML = '<span aria-hidden="true"></span>' + (goal.step && stage !== 1 ? '<small>STEP ' + goal.step + '</small>' : '');
    position(element, goal);
    arena.appendChild(element);
  }

  function addBox(box, index) {
    const element = document.createElement('div');
    const onGoal = stage === 1
      ? goalAt(box)
      : stage === 3 && box.target
        ? samePoint(box, box.target)
        : goalAt(box);
    const mirrorClass = box.slash === undefined ? '' : (box.slash ? ' is-slash' : ' is-backslash');
    const goalClass = onGoal ? ' is-on-goal' + (stage === 1 ? '' : ' is-locked') : '';
    element.className = 'game-crate is-' + (box.owner || currentLevel().player) + mirrorClass + goalClass;
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

  function addStoryPortal() {
    const portal = currentLevel().storyPortal;
    if (!portal) return;
    const element = document.createElement('div');
    element.className = 'story-portal';
    element.setAttribute('aria-hidden', 'true');
    position(element, portal);
    arena.appendChild(element);
  }

  function addReturnCave() {
    if (!returnMode) return;
    const cave = document.createElement('div');
    cave.className = 'return-cave';
    cave.setAttribute('role', 'img');
    cave.setAttribute('aria-label', 'Mountain passage to the frozen relay');
    position(cave, { x: 3, y: 0 });
    arena.appendChild(cave);
  }

  function addLabBreach() {
    if (!labExitReady || stage !== 2) return;
    const breach = document.createElement('div');
    breach.className = 'lab-breach';
    breach.setAttribute('aria-hidden', 'true');
    position(breach, currentLevel().receiver);
    arena.appendChild(breach);
  }

  function addLabKey() {
    const key = currentLevel().key;
    if (!key || !roomKeySpawned || roomKeyCollected) return;
    const element = document.createElement('div');
    element.className = 'lab-key';
    element.setAttribute('role', 'img');
    element.setAttribute('aria-label', 'Exit key');
    position(element, key);
    arena.appendChild(element);
  }

  function addLabDoor() {
    const exit = currentLevel().exit;
    if (!exit || roomExitOpen) return;
    const element = document.createElement('div');
    element.className = 'lab-door';
    element.setAttribute('role', 'img');
    element.setAttribute('aria-label', 'Locked keyhole block');
    position(element, exit);
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
    const element = document.createElement('div');
    const orientation = Number.isInteger(mirror.orientation) ? mirror.orientation : (mirror.slash ? 0 : 1);
    const names = ['lower-right', 'lower-left', 'upper-left', 'upper-right'];
    element.className = 'laser-mirror ' + (mirror.slash ? 'is-slash' : 'is-backslash') + ' is-dir-' + String(orientation) + (mirror.beamHit ? ' is-beam-hit' : '') + (index === selectedMirror ? ' is-selected' : '');
    element.dataset.mirror = String(index);
    element.dataset.orientation = String(orientation);
    element.setAttribute('role', 'img');
    element.setAttribute('aria-label', 'Reflector ' + String(index + 1) + '. ' + names[orientation] + ' triangle, ' + (mirror.slash ? 'slash' : 'backslash') + ' reflective edge.');
    element.innerHTML = '<span aria-hidden="true"></span>';
    element.querySelector('span').textContent = mirror.slash ? '/' : '\\';
    position(element, mirror);
    arena.appendChild(element);
  }

  function mirrorFacesBeam(mirror, direction) {
    const orientation = Number.isInteger(mirror.orientation) ? mirror.orientation : (mirror.slash ? 0 : 1);
    const frontNormals = [
      { x: -1, y: -1 },
      { x: 1, y: -1 },
      { x: 1, y: 1 },
      { x: -1, y: 1 }
    ];
    const normal = frontNormals[orientation];
    const sourceSide = { x: -direction.x, y: -direction.y };
    return sourceSide.x * normal.x + sourceSide.y * normal.y > 0;
  }

  function traceLaser() {
    const level = currentLevel();
    const points = [[level.emitter.x + 0.5, level.emitter.y + 0.5]];
    const visited = new Set();
    let point = { x: level.emitter.x, y: level.emitter.y };
    let direction = { ...level.emitter.direction };
    laserTargets.forEach((target) => { target.hit = false; });
    mirrors.forEach((mirror) => { mirror.beamHit = false; });
    laserHitOrder = [];
    laserBlockedByBack = false;
    let reachedReceiver = false;

    for (let step = 0; step < 120; step += 1) {
      point = { x: point.x + direction.x, y: point.y + direction.y };
      if (!inside(point)) {
        points.push([
          Math.max(0, Math.min(cols, point.x + 0.5)),
          Math.max(0, Math.min(rows, point.y + 0.5))
        ]);
        break;
      }

      points.push([point.x + 0.5, point.y + 0.5]);
      if (samePoint(point, level.receiver)) {
        reachedReceiver = true;
        points.push([cols, point.y + 0.5]);
        break;
      }
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
        if (!mirrorFacesBeam(mirror, direction)) {
          laserBlockedByBack = true;
          break;
        }
        mirror.beamHit = true;
        direction = mirror.slash
          ? { x: -direction.y, y: -direction.x }
          : { x: direction.y, y: direction.x };
      }
    }

    laserSolved = reachedReceiver && laserTargets.every((target) => target.hit) && laserHitOrder.every((value, index) => value === index);
    return points;
  }

  function renderLaserMaze() {
    for (let y = 0; y < rows; y += 1) {
      for (let x = 0; x < cols; x += 1) addTerrain({ x, y, kind: 'metal' });
    }
    const points = traceLaser();
    const exitWall = arena.querySelector('.is-exit-wall');
    if (exitWall) exitWall.classList.toggle('is-broken', laserSolved || labExitReady);
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
    emitter.innerHTML = '<span class="pixel-laser-cannon" aria-hidden="true"><i></i></span><small>SOURCE</small>';
    position(emitter, currentLevel().emitter);
    arena.appendChild(emitter);

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
    walls.forEach((wall) => {
      const openLabWall = stage === 2 && labExitReady && samePoint(wall, currentLevel().receiver);
      if (!openLabWall) addWall(wall);
    });
    goals.forEach(addGoal);
    boxes.forEach(addBox);
    hazards.forEach(addHazard);
    gates.forEach(addGate);
    switches.forEach(addSwitch);
    if (stage === 1) {
      if (!returnMode) addStoryPortal();
      addReturnCave();
      addLabKey();
      addLabDoor();
    }
    if (stage === 2) {
      renderLaserMaze();
      addLabBreach();
    }
    if (stage === 3 && currentLevel().mode === 'fusion') renderFusionLaser();
    else if (stage === 3) addMeetingSignal();
  }

  function renderProgress() {
    const labels = stage === 3 && currentLevel().mode === 'fusion'
      ? [
          boxes.slice(0, 2).every((box) => box.target && samePoint(box, box.target)) ? 'LEFT RELAY SET' : '',
          boxes.slice(2).every((box) => box.target && samePoint(box, box.target)) ? 'RIGHT RELAY SET' : '',
          laserTargets.slice(0, 3).every((target) => target.hit) ? 'BEAM ROUTED' : '',
          laserSolved ? 'SHIP CHARGED' : ''
        ]
      : stage === 1
      ? boxes.map((box, index) => box.sequenced ? box.label : index === progress ? '???' : 'LOCKED')
      : stage === 2
        ? laserTargets.map((target) => target.hit ? target.label : '')
        : switches.map((item) => item.used ? 'Channel shifted' : '');
    partTray.innerHTML = '';
    labels.forEach((label, index) => {
      const slot = document.createElement('div');
      const collected = stage === 1 ? boxes[index].sequenced : Boolean(label);
      const current = stage === 1 && index === progress;
      slot.className = 'part-slot' + (collected ? ' collected' : '') + (current ? ' is-current' : '');
      slot.innerHTML = stage === 1
        ? '<span></span>'
        : label ? '<b>◆</b><span></span>' : '<b>◇</b><span>Unknown signal</span>';
      if (label) slot.querySelector('span').textContent = label;
      partTray.appendChild(slot);
    });
  }

  function controlsFor(number) {
    if (number === 1) return '<span>PIP / PUSH</span><kbd>W</kbd><kbd>A</kbd><kbd>S</kbd><kbd>D</kbd>';
    if (number === 2) return '<span class="control-guide"><b>ARROWS</b> WALK + PUSH <b>SPACE</b> ROTATE NEARBY</span>';
    return '<span class="control-guide"><b>WASD</b> GREEN <b>ARROWS</b> BLUE <b>ONE TAP</b> SLIDE <b>WHITE SNOW</b> STOP</span>';
  }

  function setTouchState(number) {
    document.querySelector('.business-pad').classList.toggle('is-inactive', number === 2);
    document.querySelector('.tech-pad').classList.toggle('is-inactive', number === 1);
  }

  function startLevel(number) {
    clearTimer();
    returnMode = false;
    returnEntered.clear();
    arena.classList.remove('is-return-cinematic');
    arena.classList.remove('is-cave-revealing', 'is-cave-open');
    businessPlayer.classList.remove('is-entering-passage');
    techPlayer.classList.remove('is-entering-passage');
    resetLevel.disabled = false;
    stage = number;
    progress = 0;
    transitioning = false;
    charge = 0;
    dualPulseUntil = 0;
    lastFamilyPress.business = -1000;
    lastFamilyPress.tech = -1000;
    heldKeys.clear();
    openedGates.clear();
    roomKeySpawned = false;
    roomKeyCollected = false;
    roomExitOpen = false;
    chargeFill.style.width = '0%';

    const config = currentLevel();
    cols = config.cols || 10;
    rows = config.rows || 6;
    arena.style.setProperty('--game-cols', cols);
    arena.style.setProperty('--game-rows', rows);
    arena.style.aspectRatio = cols + ' / ' + rows;
    arena.dataset.mode = config.mode;
    play.dataset.mode = config.mode;
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
        if (cell === '.' || cell === 'D') terrain.push({ x, y, kind: 'floor' });
      }));
    }
    if (config.border) {
      const addBorderWall = (x, y) => {
        const beamOpening = config.mode === 'fusion' && y === config.emitter.y && (x === 0 || x === cols - 1);
        const roomEntry = config.entry && samePoint({ x, y }, config.entry);
        if (beamOpening || roomEntry) return;
        if (!walls.some((wall) => wall.x === x && wall.y === y)) walls.push({ x, y, label: '' });
      };
      for (let x = 0; x < cols; x += 1) {
        addBorderWall(x, 0);
        addBorderWall(x, rows - 1);
      }
      for (let y = 1; y < rows - 1; y += 1) {
        addBorderWall(0, y);
        addBorderWall(cols - 1, y);
      }
    }
    if (config.mode === 'fusion') {
      for (let y = 0; y < rows; y += 1) {
        for (let x = 0; x < cols; x += 1) {
          const grip = (config.grip || []).some((tile) => tile.x === x && tile.y === y);
          terrain.push({ x, y, kind: grip ? 'grip' : 'ice' });
        }
      }
    }
    boxes = (config.boxes || []).map((item) => ({
      ...item,
      target: item.target ? { ...item.target } : null,
      locked: false,
      sequenced: false
    }));
    moveHistory = [];
    mirrors = (config.mirrors || []).map((item) => {
      const orientation = Number.isInteger(item.orientation) ? item.orientation : (item.slash ? 0 : 1);
      return { ...item, orientation, slash: orientation % 2 === 0 };
    });
    laserTargets = (config.targets || []).map((item) => ({ ...item, hit: false }));
    selectedMirror = 0;
    techFacing = { x: -1, y: 0 };
    laserSolved = false;
    labExitReady = false;
    laserHitOrder = [];
    undoMove.disabled = number < 3;
    undoMove.hidden = number === 3;
    undoMove.textContent = 'Undo move Z';
    hazards = (config.hazards || []).map((item) => ({ ...item, solved: false }));
    switches = (config.switches || []).map((item) => ({ ...item, used: false }));
    gates = (config.gates || []).map((item) => ({ ...item }));

    if (number === 1 && config.techStart) {
      players.business = { ...config.start };
      players.tech = { ...config.techStart };
      businessPlayer.classList.remove('is-hidden');
      techPlayer.classList.remove('is-hidden');
      position(businessPlayer, players.business);
      position(techPlayer, players.tech);
    } else if (number < 3) {
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

    businessPlayer.querySelector('span').textContent = number === 3 ? 'WHY' : '';
    techPlayer.querySelector('span').textContent = number === 3 ? 'HOW' : '';
    renderArena();
    renderProgress();
    setTouchState(number);

    if (number === 1) {
      gameStatus.textContent = 'Any crate can use any dock. Follow the decision order; crates stay movable.';
    } else if (number === 2) {
      gameStatus.textContent = 'Enter from the west. Blue beacons are solid; turn them red in sequence.';
    } else {
      gameStatus.textContent = 'One tap slides to the next stop. Use white snow, rocks, reflectors, or your partner as brakes.';
    }
    arena.focus({ preventScroll: true });
  }

  function wallAt(point) {
    if (stage === 2 && labExitReady && samePoint(point, currentLevel().receiver)) return false;
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
      boxes: boxes.map((box) => ({ x: box.x, y: box.y, locked: box.locked, sequenced: box.sequenced })),
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

  function snapshotLaserMaze() {
    return {
      player: { ...players.tech },
      facing: { ...techFacing },
      mirrors: mirrors.map((mirror) => ({ x: mirror.x, y: mirror.y, slash: mirror.slash, orientation: mirror.orientation })),
      selectedMirror
    };
  }

  function restoreLaserMaze(snapshot) {
    players.tech = { ...snapshot.player };
    techFacing = { ...snapshot.facing };
    selectedMirror = snapshot.selectedMirror;
    mirrors.forEach((mirror, index) => Object.assign(mirror, snapshot.mirrors[index]));
    position(techPlayer, players.tech);
    evaluateLaserMaze('One signal-lab move rewound.');
    undoMove.disabled = moveHistory.length === 0;
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

  function playerAt(point) {
    return Object.values(players).some((player) => samePoint(player, point));
  }

  function iceAt(point) {
    return stage === 3 && currentLevel().mode === 'fusion' &&
      terrain.some((tile) => tile.kind === 'ice' && samePoint(tile, point));
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

  function transitionToLevel(number, message) {
    if (transitioning) return;
    transitioning = true;
    gameStatus.textContent = message;
    const overlay = document.createElement('div');
    overlay.className = 'chapter-transition';
    overlay.setAttribute('role', 'status');
    overlay.innerHTML = '<span>ACCESS GRANTED</span><strong>ENTERING LAB →</strong>';
    play.appendChild(overlay);
    window.setTimeout(() => {
      startLevel(number);
      transitioning = true;
      overlay.querySelector('span').textContent = 'CHAPTER 02';
      overlay.querySelector('strong').textContent = 'THE SIGNAL LAB';
      overlay.classList.add('is-leaving');
      window.setTimeout(() => {
        overlay.remove();
        transitioning = false;
        arena.focus({ preventScroll: true });
      }, 480);
    }, 720);
  }

  function transitionToFusion(message) {
    if (transitioning) return;
    transitioning = true;
    gameStatus.textContent = message;
    const overlay = document.createElement('div');
    overlay.className = 'chapter-transition return-transition';
    overlay.setAttribute('role', 'status');
    overlay.innerHTML = '<span>RETURN PATH OPEN</span><strong>BACK TO THE DECISION ROOM →</strong>';
    play.appendChild(overlay);

    window.setTimeout(() => {
      startLevel(1);
      returnMode = true;
      transitioning = true;
      resetLevel.disabled = true;
      undoMove.hidden = true;
      progress = boxes.length;
      boxes.forEach((box) => {
        box.x = box.target.x;
        box.y = box.target.y;
        box.locked = false;
        box.sequenced = true;
      });
      players.business = { x: 5, y: 6 };
      players.tech = { x: 1, y: 6 };
      roomExitOpen = true;
      const returnPortal = currentLevel().storyPortal;
      walls = walls.filter((wall) =>
        !((wall.x === 3 || wall.x === 4) && wall.y === 0) &&
        !(returnPortal && samePoint(wall, returnPortal))
      );
      terrain.push({ x: 3, y: 0, kind: 'floor' });
      terrain.push({ x: 4, y: 0, kind: 'floor' });
      if (returnPortal) terrain.push({ ...returnPortal, kind: 'floor' });
      levelLabel.textContent = 'INTERLUDE / THE OPEN MOUNTAIN';
      levelTitle.textContent = 'Finds the hidden passage.';
      stageCounter.textContent = 'HOMEBOUND / 03';
      activeControls.innerHTML = '<span class="control-guide"><b>WASD</b> GREEN <b>ARROWS</b> BLUE <b>GOAL</b> TOP CAVE</span>';
      gameStatus.textContent = 'The blue traveler returns. Guide both travelers into the cave in the top row.';
      document.querySelector('.business-pad').classList.remove('is-inactive');
      document.querySelector('.tech-pad').classList.remove('is-inactive');
      position(businessPlayer, players.business);
      position(techPlayer, players.tech);
      renderArena();
      renderProgress();
      overlay.querySelector('span').textContent = 'DECISION ROOM';
      overlay.querySelector('strong').textContent = 'THE WALL IS CHANGING';
      overlay.classList.add('is-leaving');
      window.setTimeout(() => {
        overlay.remove();
        arena.classList.add('is-cave-revealing');
        gameStatus.textContent = 'The old wall slowly opens into a two-tile mountain passage.';
        window.setTimeout(() => {
          arena.classList.remove('is-cave-revealing');
          arena.classList.add('is-cave-open');
          transitioning = false;
          gameStatus.textContent = 'Guide both travelers into either half of the cave in the top row.';
          arena.focus({ preventScroll: true });
        }, 1650);
      }, 500);
    }, 680);
  }

  function finishReturnRoom() {
    if (transitioning) return;
    transitioning = true;
    gameStatus.textContent = 'Both travelers enter the mountain. A frozen signal waits beyond.';
    const overlay = document.createElement('div');
    overlay.className = 'chapter-transition frozen-cave-transition';
    overlay.setAttribute('role', 'status');
    overlay.innerHTML = '<span>PASSAGE COMPLETE</span><strong>ENTERING THE FROZEN RELAY →</strong>';
    play.appendChild(overlay);
    window.setTimeout(() => {
      startLevel(3);
      transitioning = true;
      overlay.classList.add('is-leaving');
      businessPlayer.classList.add('is-landing');
      techPlayer.classList.add('is-landing');
      window.setTimeout(() => {
        overlay.remove();
        businessPlayer.classList.remove('is-landing');
        techPlayer.classList.remove('is-landing');
        transitioning = false;
        arena.focus({ preventScroll: true });
      }, 520);
    }, 820);
  }

  function moveReturnPlayer(type, key) {
    if (!returnMode || transitioning || returnEntered.has(type)) return;
    const delta = movement(key);
    const next = { x: players[type].x + delta.x, y: players[type].y + delta.y };
    const cave = [{ x: 3, y: 0 }, { x: 4, y: 0 }];
    const otherType = type === 'business' ? 'tech' : 'business';
    const otherBlocks = !returnEntered.has(otherType) && samePoint(players[otherType], next);
    if (!walkable(next) || boxIndexAt(next) >= 0 || otherBlocks) {
      gameStatus.textContent = 'The restored room is solid. Find a clear route to the cave above.';
      return;
    }
    players[type] = next;
    const actor = type === 'business' ? businessPlayer : techPlayer;
    position(actor, next);
    actor.classList.toggle('is-stepping');
    if (cave.some((tile) => samePoint(next, tile))) {
      returnEntered.add(type);
      actor.classList.add('is-entering-passage');
      gameStatus.textContent = returnEntered.size === 1
        ? 'One traveler is through. Guide the other into the same cave.'
        : 'Both travelers found the passage.';
      if (returnEntered.size === 2) window.setTimeout(finishReturnRoom, 280);
      return;
    }
    gameStatus.textContent = 'Guide both travelers to the two-tile cave in the top row.';
  }

  function beginChapterOneExit() {
    roomKeySpawned = true;
    roomKeyCollected = false;
    roomExitOpen = false;
    moveHistory = [];
    undoMove.disabled = true;
    activeControls.innerHTML = '<span class="control-guide"><b>ARROWS</b> BIT · KEY + EXIT</span>';
    document.querySelector('.business-pad').classList.add('is-inactive');
    document.querySelector('.tech-pad').classList.remove('is-inactive');
    renderArena();
    gameStatus.textContent = 'The Why Lens is restored. A key drops inside the brick room.';
  }

  function tryPushBox(type, index, delta) {
    const box = boxes[index];
    let destination = { x: box.x + delta.x, y: box.y + delta.y };
    if (!walkable(destination) || closedGateAt(destination) || boxIndexAt(destination) >= 0 || playerAt(destination)) {
      gameStatus.textContent = 'The cargo crate thunks against something solid.';
      bump('[data-box="' + String(index) + '"]');
      return false;
    }
    if (stage === 3 && currentLevel().mode === 'fusion') {
      while (iceAt(destination)) {
        const candidate = { x: destination.x + delta.x, y: destination.y + delta.y };
        if (!walkable(candidate) || closedGateAt(candidate) || boxIndexAt(candidate) >= 0 || playerAt(candidate)) break;
        destination = candidate;
      }
    }
    box.x = destination.x;
    box.y = destination.y;
    if (stage === 3 && currentLevel().mode === 'fusion') {
      gameStatus.textContent = box.target && samePoint(box, box.target)
        ? 'The reflector stops exactly on its frozen relay.'
        : 'The reflector skids until something catches it.';
      return true;
    }
    const reachedDock = goalAt(box);
    if (reachedDock && !box.sequenced && box.order === progress) {
      box.sequenced = true;
      progress += 1;
      gameStatus.textContent = box.label + ' is recorded. The crate remains movable.';
    } else if (reachedDock && !box.sequenced) {
      gameStatus.textContent = 'Wrong order. Move this crate off a dock, then return after the earlier decision.';
    } else if (reachedDock) {
      gameStatus.textContent = box.label + ' is on a dock—and can still be moved if the route needs it.';
    } else {
      gameStatus.textContent = 'The crate rolls. Keep enough room to get behind the next decision.';
    }
    renderProgress();
    const everyDockFilled = goals.every((goal) => boxIndexAt(goal) >= 0);
    if (progress === boxes.length && everyDockFilled) {
      beginChapterOneExit();
    } else if (progress === boxes.length) {
      gameStatus.textContent = 'The sequence is correct. Keep moving crates until all four docks are filled.';
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
    let next = { x: current.x + delta.x, y: current.y + delta.y };
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
    if (boxIndex < 0 && stage === 3 && currentLevel().mode === 'fusion') {
      while (iceAt(next)) {
        const candidate = { x: next.x + delta.x, y: next.y + delta.y };
        if (!walkable(candidate) || closedGateAt(candidate) || otherPlayerAt(candidate, type) || boxIndexAt(candidate) >= 0) break;
        next = candidate;
      }
    }
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
    const powered = true;
    chargePanel.hidden = true;
    const lit = laserTargets.filter((target) => target.hit).length;
    chargeFill.style.width = String((lit / laserTargets.length) * 100) + '%';
    chargeText.textContent = laserSolved ? 'Flight battery charged.' : lit + ' of ' + laserTargets.length + ' flight cells charged.';
    if (laserSolved && !transitioning) {
      transitioning = true;
      gameStatus.textContent = 'They became each other’s brakes. The frozen signal reaches the ship—home is ready.';
      window.setTimeout(finishGame, 1400);
    } else if (!laserSolved) {
      gameStatus.textContent = 'Push the green reflectors into the four sockets. They slide too, so use snow, rocks, cargo, and each other as stops.';
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

  function laserTargetAt(point) {
    return stage === 2 && laserTargets.some((target) => samePoint(target, point));
  }

  function laserDeviceAt(point) {
    return stage === 2 && (samePoint(point, currentLevel().emitter) || samePoint(point, currentLevel().receiver));
  }

  function evaluateLaserMaze(message) {
    renderArena();
    progress = laserTargets.filter((target) => target.hit).length;
    renderProgress();
    if (laserSolved) {
      labExitReady = true;
      undoMove.disabled = true;
      renderArena();
      gameStatus.textContent = 'The east wall is gone. Keep reflectors in place and walk to the glowing breach.';
    } else if (progress === laserTargets.length) {
      const ordered = laserHitOrder.every((value, index) => value === index);
      gameStatus.textContent = ordered
        ? 'All four relays are in order. Now aim the final beam through the east wall.'
        : 'Every relay lit, but the handshake order is wrong. Route DISCOVER → DESIGN → BUILD → DELIVER.';
    } else {
      gameStatus.textContent = laserBlockedByBack
        ? 'The signal stops against the reflector’s back. Turn its white edge toward the light.'
        : message || progress + ' of 4 relays lit. Follow the beam, then adjust the next reflection.';
    }
  }

  function moveSelectedMirror(key) {
    const mirror = mirrors[selectedMirror];
    const delta = movement(key);
    const destination = { x: mirror.x + delta.x, y: mirror.y + delta.y };
    if (!inside(destination) || wallAt(destination) || laserTargetAt(destination) || mirrorAt(destination, selectedMirror) || samePoint(destination, players.tech)) {
      gameStatus.textContent = 'That reflector has no room to move there.';
      bump('[data-mirror="' + String(selectedMirror) + '"]');
      return;
    }
    mirror.x = destination.x;
    mirror.y = destination.y;
    evaluateLaserMaze('Reflector moved. The beam recalculated instantly.');
  }

  function rotateMirror(index, message) {
    const mirror = mirrors[index];
    if (!mirror) return;
    mirror.orientation = (mirror.orientation + 1) % 4;
    mirror.slash = mirror.orientation % 2 === 0;
    selectedMirror = index;
    evaluateLaserMaze(message || 'Reflector rotated. The signal path changed.');
  }

  function nearbyMirrorIndex() {
    const facingPoint = {
      x: players.tech.x + techFacing.x,
      y: players.tech.y + techFacing.y
    };
    const facingIndex = mirrors.findIndex((mirror) => samePoint(mirror, facingPoint));
    if (facingIndex >= 0) return facingIndex;
    const adjacent = mirrors
      .map((mirror, index) => ({ mirror, index }))
      .filter(({ mirror }) => Math.abs(mirror.x - players.tech.x) + Math.abs(mirror.y - players.tech.y) === 1);
    return adjacent.length === 1 ? adjacent[0].index : -1;
  }

  function rotateNearbyMirror() {
    if (stage !== 2 || transitioning) return;
    if (labExitReady) {
      gameStatus.textContent = 'The route is complete. Reflectors stay fixed; walk to the glowing breach.';
      return;
    }
    const index = nearbyMirrorIndex();
    if (index < 0) {
      gameStatus.textContent = 'Stand beside a reflector, then press Space.';
      return;
    }
    moveHistory.push(snapshotLaserMaze());
    undoMove.disabled = false;
    rotateMirror(index, 'Reflector tuned. Watch the beam, then continue the route.');
  }

  function moveTechInLaser(key) {
    if (stage !== 2 || transitioning) return;
    const delta = movement(key);
    techFacing = delta;
    const next = { x: players.tech.x + delta.x, y: players.tech.y + delta.y };
    const returnExit = currentLevel().returnExit;
    if (labExitReady && returnExit && samePoint(next, returnExit)) {
      players.tech = next;
      position(techPlayer, players.tech);
      techPlayer.classList.add('is-entering-passage');
      transitionToFusion('The blue traveler steps through the breach and returns to the decision room.');
      return;
    }
    if (!inside(next) || wallAt(next) || laserDeviceAt(next) || laserTargetAt(next)) {
      gameStatus.textContent = laserTargetAt(next) ? 'The warning beacon is solid. Route around it.' : 'That side of the signal lab is sealed.';
      return;
    }
    const mirrorIndex = mirrors.findIndex((mirror) => samePoint(mirror, next));
    if (mirrorIndex >= 0) {
      if (labExitReady) {
        gameStatus.textContent = 'Reflectors stay solid. Go around it through the lower opening.';
        bump('[data-mirror="' + String(mirrorIndex) + '"]');
        return;
      }
      const destination = { x: next.x + delta.x, y: next.y + delta.y };
      if (!inside(destination) || wallAt(destination) || laserTargetAt(destination) || mirrorAt(destination, mirrorIndex) || samePoint(destination, players.tech) || laserDeviceAt(destination)) {
        gameStatus.textContent = 'The reflector needs an empty tile behind it before it can move.';
        bump('[data-mirror="' + String(mirrorIndex) + '"]');
        return;
      }
      moveHistory.push(snapshotLaserMaze());
      undoMove.disabled = false;
      mirrors[mirrorIndex].x = destination.x;
      mirrors[mirrorIndex].y = destination.y;
      selectedMirror = mirrorIndex;
      players.tech = next;
      position(techPlayer, players.tech);
      evaluateLaserMaze('Reflector pushed one tile. Stand beside it and press Space to rotate.');
      return;
    }
    moveHistory.push(snapshotLaserMaze());
    undoMove.disabled = false;
    players.tech = next;
    position(techPlayer, players.tech);
    techPlayer.classList.remove('is-stepping');
    window.requestAnimationFrame(() => techPlayer.classList.add('is-stepping'));
    renderArena();
    gameStatus.textContent = labExitReady
      ? 'The wall is open. Keep walking to the breach on the right.'
      : 'Walk into a reflector to push it, or press Space while facing one.';
  }

  function moveChapterOneTech(key) {
    if (stage !== 1 || !roomKeySpawned || transitioning) return;
    const delta = movement(key);
    const next = { x: players.tech.x + delta.x, y: players.tech.y + delta.y };
    const exit = currentLevel().exit;
    if (!inside(next) || wallAt(next) || !walkable(next)) {
      gameStatus.textContent = 'The brick room keeps the path narrow.';
      return;
    }
    if (samePoint(next, exit) && !roomExitOpen) {
      gameStatus.textContent = 'The yellow door needs the key that just dropped nearby.';
      bump('.lab-door');
      return;
    }
    players.tech = next;
    position(techPlayer, players.tech);
    techPlayer.classList.remove('is-stepping');
    window.requestAnimationFrame(() => techPlayer.classList.add('is-stepping'));
    if (!roomKeyCollected && samePoint(next, currentLevel().key)) {
      roomKeyCollected = true;
      roomExitOpen = true;
      renderArena();
      gameStatus.textContent = 'Key collected. The keyhole block vanishes—head right.';
      return;
    }
    if (samePoint(next, exit) && roomExitOpen) {
      renderArena();
      transitionToLevel(2, 'The open passage leads into the signal lab.');
      return;
    }
    renderArena();
    gameStatus.textContent = 'The open yellow door leads into the signal lab.';
  }

  function rotateSelectedMirror() {
    if (stage !== 2 || transitioning) return;
    rotateMirror(selectedMirror, 'Reflector rotated. Watch where the beam changes direction.');
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
    if (returnMode) {
      if (businessKeys.has(key)) moveReturnPlayer('business', key);
      if (techKeys.has(key)) moveReturnPlayer('tech', key);
      return;
    }
    if (stage === 1 && roomKeySpawned) {
      if (techKeys.has(key)) moveChapterOneTech(key);
      return;
    }
    if (stage === 2) {
      if (techKeys.has(key)) moveTechInLaser(key);
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
    spaceHeld = false;
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
      if (moveHistory.length === 0 || transitioning) return;
      restoreLaserMaze(moveHistory.pop());
      return;
    }
    if (stage !== 1 || roomKeySpawned || moveHistory.length === 0 || transitioning) return;
    restoreSokoban(moveHistory.pop());
  });

  window.addEventListener('keydown', (event) => {
    const key = normalizedKey(event);
    if (stage === 2 && !play.hidden && (event.code === 'Space' || event.key === ' ')) {
      event.preventDefault();
      if (spaceHeld || event.repeat) return;
      spaceHeld = true;
      rotateNearbyMirror();
      return;
    }
    if ((event.key === 'z' || event.key === 'Z') && (stage === 1 || stage === 2) && !play.hidden) {
      event.preventDefault();
      undoMove.click();
      return;
    }
    if (!validKeys.has(key) || play.hidden) return;
    event.preventDefault();
    pressKey(key);
  });

  window.addEventListener('keyup', (event) => {
    if (event.code === 'Space' || event.key === ' ') spaceHeld = false;
    releaseKey(normalizedKey(event));
  });
  window.addEventListener('blur', () => {
    heldKeys.clear();
    spaceHeld = false;
  });
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
