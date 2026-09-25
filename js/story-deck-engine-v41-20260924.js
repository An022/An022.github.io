(() => {
  const data = window.AN_STORY_FULL;
  const root = document.querySelector('[data-story-deck]');
  if (!data || !root) return;

  const makeBase = (node, element) => {
    node.className = `story-element ${element.className || ''}`.trim();
    node.dataset.storyElement = element.id;
    node.dataset.visibleFrom = String(element.visibleFrom || 0);
    if (element.persist) node.dataset.persist = 'true';
    return node;
  };

  const createElement = (element) => {
    if (['illustration', 'asset'].includes(element.type)) {
      const image = makeBase(document.createElement('img'), element);
      image.src = element.asset;
      image.alt = element.alt || '';
      image.decoding = 'async';
      image.draggable = false;
      return image;
    }

    if (element.type === 'text' || element.type === 'emphasis') {
      const node = makeBase(document.createElement(element.type === 'emphasis' ? 'h2' : 'p'), element);
      node.textContent = element.content;
      return node;
    }

    if (element.type === 'chips' || element.type === 'process') {
      const list = makeBase(document.createElement('div'), element);
      element.items.forEach((item, index) => {
        const chip = document.createElement('span');
        chip.textContent = item;
        if (element.revealStep) chip.dataset.childVisibleFrom = String((element.visibleFrom || 0) + index);
        list.appendChild(chip);
        if (element.type === 'process' && index < element.items.length - 1) {
          const arrow = document.createElement('i');
          arrow.textContent = '→';
          arrow.setAttribute('aria-hidden', 'true');
          if (element.revealStep) arrow.dataset.childVisibleFrom = String((element.visibleFrom || 0) + index + 1);
          list.appendChild(arrow);
        }
      });
      return list;
    }

    if (element.type === 'stats') {
      const list = makeBase(document.createElement('div'), element);
      element.items.forEach(([value, label]) => {
        const item = document.createElement('span');
        const strong = document.createElement('strong');
        const small = document.createElement('small');
        strong.textContent = value;
        small.textContent = label;
        item.append(strong, small);
        list.appendChild(item);
      });
      return list;
    }

    if (element.type === 'links') {
      const nav = makeBase(document.createElement('nav'), element);
      nav.setAttribute('aria-label', 'Connect with An Lee');
      element.items.forEach((item) => {
        const link = document.createElement('a');
        link.href = item.href;
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
        const small = document.createElement('small');
        const strong = document.createElement('strong');
        const arrow = document.createElement('span');
        small.textContent = item.eyebrow;
        strong.textContent = item.label;
        arrow.textContent = '↗';
        link.append(small, strong, arrow);
        nav.appendChild(link);
      });
      return nav;
    }

    if (element.type === 'prop') {
      const prop = makeBase(document.createElement('div'), element);
      const symbol = document.createElement('strong');
      const label = document.createElement('small');
      symbol.textContent = element.symbol || '';
      label.textContent = element.label || '';
      prop.append(symbol, label);
      return prop;
    }

    return makeBase(document.createElement('div'), element);
  };

  const createScene = (scene, index) => {
    const article = document.createElement('article');
    article.className = `story-scene story-scene--${scene.layout}`;
    article.dataset.storyScene = scene.id;
    article.id = `story-${scene.id}`;
    article.setAttribute('aria-label', `Scene ${scene.number}: ${scene.title}`);

    const label = document.createElement('header');
    label.className = 'story-scene__label';
    const chapter = document.createElement('span');
    const title = document.createElement('strong');
    chapter.textContent = scene.chapter;
    title.textContent = `${scene.number} · ${scene.title}`;
    label.append(chapter, title);

    const composition = document.createElement('div');
    composition.className = 'story-scene__composition';
    scene.elements.forEach((element) => composition.appendChild(createElement(element)));
    article.append(label, composition);
    return article;
  };

  class StoryDeck {
    constructor(deck, story) {
      this.root = deck;
      this.page = deck.closest('[data-story-page]');
      this.stage = deck.querySelector('[data-deck-stage]');
      this.progress = deck.querySelector('[data-deck-progress]');
      this.previousButton = deck.querySelector('[data-deck-previous]');
      this.nextButton = deck.querySelector('[data-deck-next]');
      this.hint = deck.querySelector('[data-deck-hint]');
      this.story = story;
      this.sceneIndex = 0;
      this.beatIndex = 0;
      this.sceneNodes = [];
      this.navigationLocked = false;
      this.wheelActive = false;
      this.wheelTimer = null;
      this.pointerStart = null;
    }

    init() {
      this.story.scenes.forEach((scene, index) => {
        const node = createScene(scene, index);
        this.stage.appendChild(node);
        this.sceneNodes.push(node);
      });
      this.bindEvents();
      this.openHash(false);
      this.update(false);
    }

    isActive() {
      return !document.body.classList.contains('portfolio-locked') && (!this.page || this.page.classList.contains('is-active'));
    }

    currentScene() { return this.story.scenes[this.sceneIndex]; }

    forward() {
      const scene = this.currentScene();
      if (this.beatIndex < scene.maxBeat) this.beatIndex += 1;
      else if (this.sceneIndex < this.story.scenes.length - 1) {
        this.sceneIndex += 1;
        this.beatIndex = 0;
      } else return false;
      this.update(true);
      return true;
    }

    backward() {
      if (this.beatIndex > 0) this.beatIndex -= 1;
      else if (this.sceneIndex > 0) {
        this.sceneIndex -= 1;
        this.beatIndex = this.currentScene().maxBeat;
      } else return false;
      this.update(true);
      return true;
    }

    navigate(direction, lock = true) {
      if (!this.isActive() || (lock && this.navigationLocked)) return;
      const moved = direction > 0 ? this.forward() : this.backward();
      if (moved && lock) {
        this.navigationLocked = true;
        window.setTimeout(() => { this.navigationLocked = false; }, 390);
      }
    }

    jumpTo(sceneId, reveal = 0) {
      const index = this.story.scenes.findIndex((scene) => scene.id === sceneId);
      if (index < 0) return;
      this.sceneIndex = index;
      this.beatIndex = Math.min(reveal, this.currentScene().maxBeat);
      this.update(false);
      this.root.focus({ preventScroll: true });
    }

    openHash(update = true) {
      const hash = window.location.hash.replace('#', '');
      const aliases = { home: 'once-upon-a-time', beginning: 'once-upon-a-time', building: 'mimir', contact: 'next-page', epilogue: 'next-page' };
      const target = aliases[hash] || hash;
      if (this.story.scenes.some((scene) => scene.id === target)) this.jumpTo(target, update ? 0 : this.beatIndex);
    }

    update(announce = true) {
      const scene = this.currentScene();
      this.root.dataset.scene = scene.id;
      this.root.dataset.beat = String(this.beatIndex);
      this.root.classList.toggle('is-reduced-motion', window.matchMedia('(prefers-reduced-motion: reduce)').matches);

      this.sceneNodes.forEach((node, index) => {
        const active = index === this.sceneIndex;
        node.classList.toggle('is-active', active);
        node.setAttribute('aria-hidden', String(!active));
        node.inert = !active;
        node.querySelectorAll('[data-visible-from]').forEach((elementNode) => {
          const visibleFrom = Number(elementNode.dataset.visibleFrom);
          const visible = active && this.beatIndex >= visibleFrom;
          const latest = visible && this.beatIndex === visibleFrom;
          const persistent = elementNode.dataset.persist === 'true';
          elementNode.classList.toggle('is-visible', visible);
          elementNode.classList.toggle('is-latest', latest);
          elementNode.classList.toggle('is-past', visible && !latest && !persistent);
          elementNode.setAttribute('aria-hidden', String(!visible));
          const elementData = this.story.scenes[index].elements.find((item) => item.id === elementNode.dataset.storyElement);
          (elementData?.states || []).forEach((state) => elementNode.classList.toggle(state.className, active && this.beatIndex >= state.from));
        });
        node.querySelectorAll('[data-child-visible-from]').forEach((child) => {
          child.classList.toggle('is-child-visible', active && this.beatIndex >= Number(child.dataset.childVisibleFrom));
        });
      });

      const atStart = this.sceneIndex === 0 && this.beatIndex === 0;
      const atEnd = this.sceneIndex === this.story.scenes.length - 1 && this.beatIndex === scene.maxBeat;
      this.previousButton.disabled = atStart;
      this.nextButton.disabled = atEnd;
      this.nextButton.querySelector('span').textContent = this.beatIndex < scene.maxBeat ? 'Reveal' : 'Next page';
      this.hint.classList.toggle('is-hidden', !atStart);

      this.progress.replaceChildren();
      const chapter = document.createElement('span');
      const count = document.createElement('strong');
      const dots = document.createElement('i');
      chapter.textContent = scene.chapter;
      count.textContent = `${scene.number} / ${this.story.scenes.length}`;
      dots.setAttribute('aria-hidden', 'true');
      this.story.scenes.forEach((_, index) => {
        const dot = document.createElement('b');
        dot.classList.toggle('is-active', index === this.sceneIndex);
        dots.appendChild(dot);
      });
      this.progress.append(chapter, count, dots);

      document.querySelectorAll('[data-story-jump]').forEach((link) => {
        link.classList.toggle('is-current', link.dataset.storyJump === scene.id ||
          (link.dataset.storyJump === 'mimir' && ['mimir', 'boc'].includes(scene.id)) ||
          (link.dataset.storyJump === 'next-page' && scene.id === 'next-page'));
      });

      if (announce) {
        const newest = this.sceneNodes[this.sceneIndex].querySelector(`[data-visible-from="${this.beatIndex}"]`);
        if (newest?.textContent) this.stage.setAttribute('aria-label', newest.textContent.trim());
      }
    }

    bindEvents() {
      this.previousButton.addEventListener('click', () => this.navigate(-1));
      this.nextButton.addEventListener('click', () => this.navigate(1));
      this.root.addEventListener('wheel', (event) => {
        if (!this.isActive() || Math.abs(event.deltaY) < 10) return;
        event.preventDefault();
        if (!this.wheelActive) {
          this.wheelActive = true;
          this.navigate(event.deltaY > 0 ? 1 : -1, false);
        }
        window.clearTimeout(this.wheelTimer);
        this.wheelTimer = window.setTimeout(() => { this.wheelActive = false; }, 240);
      }, { passive: false });

      document.addEventListener('keydown', (event) => {
        if (!this.isActive() || event.target.matches('input, textarea, select, [contenteditable="true"]')) return;
        if (['ArrowDown', 'ArrowRight', ' ', 'PageDown'].includes(event.key)) {
          event.preventDefault(); this.navigate(1);
        } else if (['ArrowUp', 'ArrowLeft', 'PageUp'].includes(event.key)) {
          event.preventDefault(); this.navigate(-1);
        }
      });

      this.root.addEventListener('pointerdown', (event) => {
        if (event.pointerType !== 'mouse') this.pointerStart = { x: event.clientX, y: event.clientY };
      });
      this.root.addEventListener('pointerup', (event) => {
        if (!this.pointerStart) return;
        const dx = event.clientX - this.pointerStart.x;
        const dy = event.clientY - this.pointerStart.y;
        this.pointerStart = null;
        if (Math.max(Math.abs(dx), Math.abs(dy)) < 44) return;
        this.navigate(Math.abs(dy) > Math.abs(dx) ? (dy < 0 ? 1 : -1) : (dx < 0 ? 1 : -1));
      });

      document.querySelectorAll('[data-story-jump]').forEach((link) => {
        link.addEventListener('click', (event) => {
          event.preventDefault();
          history.replaceState(null, '', `#${link.dataset.storyJump}`);
          this.jumpTo(link.dataset.storyJump);
        });
      });
      window.addEventListener('hashchange', () => this.openHash());
    }
  }

  new StoryDeck(root, data).init();
})();
