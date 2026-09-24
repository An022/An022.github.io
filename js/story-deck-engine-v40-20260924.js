(() => {
  const storyData = window.AN_STORY_DETOUR;
  const deckRoot = document.querySelector('[data-story-deck]');
  if (!storyData || !deckRoot) return;

  const createAsset = (element) => {
    const image = document.createElement('img');
    image.className = `story-layer ${element.className || ''}`.trim();
    image.src = element.asset;
    image.alt = element.alt || '';
    image.decoding = 'async';
    image.draggable = false;
    image.dataset.storyElement = element.id;
    image.dataset.visibleFrom = String(element.visibleFrom);
    return image;
  };

  const StoryIllustration = createAsset;
  const StoryObject = createAsset;

  const StoryText = (element) => {
    const text = document.createElement(element.type === 'emphasis' ? 'h2' : 'p');
    text.className = `story-beat ${element.className || ''}`.trim();
    text.textContent = element.content;
    text.dataset.storyElement = element.id;
    text.dataset.visibleFrom = String(element.visibleFrom);
    return text;
  };

  const StoryScene = (scene, sceneIndex, sceneCount) => {
    const article = document.createElement('article');
    article.className = `story-scene story-scene--${scene.layout}`;
    article.dataset.storyScene = scene.id;
    article.setAttribute('aria-label', `Scene ${scene.number}: ${scene.title}`);

    const label = document.createElement('header');
    label.className = 'story-scene__label';
    label.innerHTML = `<span>${storyData.title}</span><strong>Scene ${scene.number} · ${scene.title}</strong>`;

    const composition = document.createElement('div');
    composition.className = 'story-scene__composition';

    const visual = document.createElement('div');
    visual.className = 'story-scene__visual';
    visual.setAttribute('aria-label', `${scene.title} illustration`);

    const copy = document.createElement('div');
    copy.className = 'story-scene__copy';

    scene.elements.forEach((element) => {
      if (element.type === 'text' || element.type === 'emphasis') {
        copy.appendChild(StoryText(element));
      } else if (element.type === 'illustration') {
        visual.appendChild(StoryIllustration(element));
      } else {
        visual.appendChild(StoryObject(element));
      }
    });

    composition.append(visual, copy);
    article.append(label, composition);

    if (sceneIndex === sceneCount - 1) {
      const finish = document.createElement('a');
      finish.className = 'story-deck__finish';
      finish.href = storyData.finishHref;
      finish.innerHTML = `${storyData.finishLabel} <span>→</span>`;
      finish.dataset.deckFinish = '';
      finish.setAttribute('aria-hidden', 'true');
      article.appendChild(finish);
    }

    return article;
  };

  class StoryDeck {
    constructor(root, data) {
      this.root = root;
      this.page = root.closest('[data-story-page]');
      this.stage = root.querySelector('[data-deck-stage]');
      this.progress = root.querySelector('[data-deck-progress]');
      this.previousButton = root.querySelector('[data-deck-previous]');
      this.nextButton = root.querySelector('[data-deck-next]');
      this.hint = root.querySelector('[data-deck-hint]');
      this.data = data;
      this.sceneIndex = 0;
      this.beatIndex = 0;
      this.sceneNodes = [];
      this.wheelGestureActive = false;
      this.lastWheelAt = 0;
      this.wheelStartedAt = 0;
      this.wheelReleaseTimer = null;
      this.navigationLocked = false;
      this.pointerStart = null;
    }

    init() {
      this.render();
      this.bindEvents();
      this.update(false);
    }

    render() {
      this.data.scenes.forEach((scene, index) => {
        const node = StoryScene(scene, index, this.data.scenes.length);
        this.stage.appendChild(node);
        this.sceneNodes.push(node);
      });
    }

    isActive() {
      return Boolean(this.page && this.page.classList.contains('is-active'));
    }

    currentScene() {
      return this.data.scenes[this.sceneIndex];
    }

    forward() {
      const scene = this.currentScene();
      if (this.beatIndex < scene.maxBeat) {
        this.beatIndex += 1;
      } else if (this.sceneIndex < this.data.scenes.length - 1) {
        this.sceneIndex += 1;
        this.beatIndex = 0;
      } else {
        return false;
      }
      this.update(true);
      return true;
    }

    backward() {
      if (this.beatIndex > 0) {
        this.beatIndex -= 1;
      } else if (this.sceneIndex > 0) {
        this.sceneIndex -= 1;
        this.beatIndex = this.currentScene().maxBeat;
      } else {
        return false;
      }
      this.update(true);
      return true;
    }

    navigate(direction, useLock = true) {
      if (!this.isActive() || (useLock && this.navigationLocked)) return;
      const moved = direction > 0 ? this.forward() : this.backward();
      if (!moved || !useLock) return;
      this.navigationLocked = true;
      window.setTimeout(() => { this.navigationLocked = false; }, 460);
    }

    update(announce = true) {
      const scene = this.currentScene();
      const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const storybook = this.root.closest('.storybook');
      if (storybook) storybook.scrollTop = 0;
      this.root.dataset.scene = scene.id;
      this.root.dataset.beat = String(this.beatIndex);
      this.root.classList.toggle('is-reduced-motion', reducedMotion);

      this.sceneNodes.forEach((sceneNode, sceneNodeIndex) => {
        const active = sceneNodeIndex === this.sceneIndex;
        sceneNode.classList.toggle('is-active', active);
        sceneNode.setAttribute('aria-hidden', String(!active));
        sceneNode.inert = !active;

        sceneNode.querySelectorAll('[data-visible-from]').forEach((elementNode) => {
          const visibleFrom = Number(elementNode.dataset.visibleFrom);
          const visible = active && this.beatIndex >= visibleFrom;
          elementNode.classList.toggle('is-visible', visible);
          elementNode.setAttribute('aria-hidden', String(!visible));
          const elementData = this.data.scenes[sceneNodeIndex].elements.find((item) => item.id === elementNode.dataset.storyElement);
          (elementData?.states || []).forEach((state) => {
            elementNode.classList.toggle(state.className, active && this.beatIndex >= state.from);
          });
        });
      });

      const atBeginning = this.sceneIndex === 0 && this.beatIndex === 0;
      const atEnd = this.sceneIndex === this.data.scenes.length - 1 && this.beatIndex === scene.maxBeat;
      this.previousButton.disabled = atBeginning;
      this.nextButton.disabled = atEnd;
      this.nextButton.querySelector('span').textContent = this.beatIndex < scene.maxBeat ? 'Reveal' : 'Next scene';
      this.hint.classList.toggle('is-hidden', !(this.sceneIndex === 0 && this.beatIndex === 0));

      const finish = this.root.querySelector('[data-deck-finish]');
      if (finish) {
        finish.classList.toggle('is-visible', atEnd);
        finish.setAttribute('aria-hidden', String(!atEnd));
      }

      this.progress.innerHTML = `
        <span>${this.data.chapter}</span>
        <strong>${scene.number} / ${this.data.scenes[this.data.scenes.length - 1].number}</strong>
        <i aria-hidden="true">${this.data.scenes.map((_, index) => `<b class="${index === this.sceneIndex ? 'is-active' : ''}"></b>`).join('')}</i>
        <small>Beat ${this.beatIndex + 1} / ${scene.maxBeat + 1}</small>
      `;

      if (announce) {
        const newest = this.sceneNodes[this.sceneIndex].querySelector(`[data-visible-from="${this.beatIndex}"]`);
        if (newest && newest.textContent) this.stage.setAttribute('aria-label', newest.textContent.trim());
      }
    }

    handleWheel(event) {
      if (!this.isActive() || Math.abs(event.deltaY) < 8) return;
      event.preventDefault();
      const now = Date.now();
      this.lastWheelAt = now;

      if (!this.wheelGestureActive) {
        this.wheelGestureActive = true;
        this.wheelStartedAt = now;
        this.navigate(event.deltaY > 0 ? 1 : -1, false);
      }

      window.clearTimeout(this.wheelReleaseTimer);
      const elapsed = now - this.wheelStartedAt;
      const delay = Math.max(170, 520 - elapsed);
      this.wheelReleaseTimer = window.setTimeout(() => {
        if (Date.now() - this.lastWheelAt >= 160) this.wheelGestureActive = false;
      }, delay);
    }

    bindEvents() {
      this.previousButton.addEventListener('click', () => this.navigate(-1));
      this.nextButton.addEventListener('click', () => this.navigate(1));
      this.root.addEventListener('wheel', (event) => this.handleWheel(event), { passive: false });

      document.addEventListener('keydown', (event) => {
        if (!this.isActive() || event.target.matches('input, textarea, select, [contenteditable="true"]')) return;
        if (['ArrowDown', 'ArrowRight', ' '].includes(event.key)) {
          event.preventDefault();
          this.navigate(1);
        } else if (['ArrowUp', 'ArrowLeft'].includes(event.key)) {
          event.preventDefault();
          this.navigate(-1);
        }
      });

      this.root.addEventListener('pointerdown', (event) => {
        if (event.pointerType === 'mouse') return;
        this.pointerStart = { x: event.clientX, y: event.clientY };
      });

      this.root.addEventListener('pointerup', (event) => {
        if (!this.pointerStart) return;
        const deltaX = event.clientX - this.pointerStart.x;
        const deltaY = event.clientY - this.pointerStart.y;
        this.pointerStart = null;
        if (Math.max(Math.abs(deltaX), Math.abs(deltaY)) < 48) return;
        const direction = Math.abs(deltaY) >= Math.abs(deltaX) ? (deltaY < 0 ? 1 : -1) : (deltaX < 0 ? 1 : -1);
        this.navigate(direction);
      });

      if (this.page) {
        new MutationObserver(() => {
          if (this.isActive()) {
            const storybook = this.root.closest('.storybook');
            if (storybook) storybook.scrollTop = 0;
            this.root.focus({ preventScroll: true });
          }
        }).observe(this.page, { attributes: true, attributeFilter: ['class'] });
      }
    }
  }

  new StoryDeck(deckRoot, storyData).init();
})();
