(() => {
  const DETOUR_ASSETS = {
    oldWorld: {
      src: '/images/storybook-detour/an_an_old_world.svg',
      alt: 'An in her established professional world in Taiwan'
    },
    suitcase: {
      src: '/images/storybook-detour/an_suitcase.svg',
      alt: 'An packs a suitcase before starting over'
    },
    route: {
      src: '/images/storybook-detour/taiwan_to_new_york.svg',
      alt: 'An illustrated route from Taiwan to New York'
    },
    newYork: {
      src: '/images/storybook-detour/an_new_york.svg',
      alt: 'An arrives in an unfamiliar New York'
    },
    student: {
      src: '/images/storybook-detour/an_student.svg',
      alt: 'An studies among books, code, and unfamiliar concepts'
    },
    adapting: {
      src: '/images/storybook-detour/an_adapting.svg',
      alt: 'The new environment gradually becomes organized around An'
    },
    building: {
      src: '/images/storybook-detour/an_building.svg',
      alt: 'Accounting and audit knowledge become pieces of a software system'
    },
    nextPage: {
      src: '/images/storybook-detour/an_next_page.svg',
      alt: 'An walks toward an unfinished page and the next chapter'
    }
  };

  class StoryChapter {
    constructor(root, assets) {
      this.root = root;
      this.scrollRoot = root.closest('.story-page');
      this.scenes = Array.from(root.querySelectorAll('[data-scene]'));
      this.artFrame = root.querySelector('[data-story-art]');
      this.progress = root.querySelector('[data-story-progress]');
      this.assets = assets;
      this.activeIndex = -1;
      this.images = [];
      this.progressButtons = [];
      this.observer = null;
    }

    init() {
      if (!this.scrollRoot || !this.scenes.length || !this.artFrame || !this.progress) return;
      this.buildArtwork();
      this.buildProgress();
      this.observeScenes();
      this.showScene(0);
    }

    buildArtwork() {
      this.scenes.forEach((scene, index) => {
        const asset = this.assets[scene.dataset.scene];
        if (!asset) return;
        const image = document.createElement('img');
        image.src = asset.src;
        image.alt = asset.alt;
        image.dataset.sceneArt = String(index);
        image.loading = index < 2 ? 'eager' : 'lazy';
        image.decoding = 'async';
        this.artFrame.appendChild(image);
        this.images[index] = image;
      });
    }

    buildProgress() {
      this.scenes.forEach((scene, index) => {
        const button = document.createElement('button');
        button.type = 'button';
        button.setAttribute('aria-label', `Go to story moment ${index + 1} of ${this.scenes.length}`);
        button.addEventListener('click', () => this.scrollToScene(index));
        this.progress.appendChild(button);
        this.progressButtons.push(button);
      });
    }

    observeScenes() {
      this.observer = new IntersectionObserver((entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (!visible.length) return;
        const index = this.scenes.indexOf(visible[0].target);
        if (index >= 0) this.showScene(index);
      }, {
        root: this.scrollRoot,
        rootMargin: '-28% 0px -28% 0px',
        threshold: [0, .2, .45, .7]
      });

      this.scenes.forEach((scene) => this.observer.observe(scene));
    }

    showScene(index) {
      if (index === this.activeIndex) return;
      this.activeIndex = index;
      this.root.dataset.activeScene = String(index);

      this.scenes.forEach((scene, sceneIndex) => {
        const active = sceneIndex === index;
        scene.classList.toggle('is-active', active);
        scene.setAttribute('aria-current', active ? 'step' : 'false');
      });

      this.images.forEach((image, imageIndex) => {
        if (image) image.classList.toggle('is-active', imageIndex === index);
      });

      this.progressButtons.forEach((button, buttonIndex) => {
        const active = buttonIndex === index;
        button.classList.toggle('is-active', active);
        if (active) button.setAttribute('aria-current', 'step');
        else button.removeAttribute('aria-current');
      });
    }

    scrollToScene(index) {
      const scene = this.scenes[index];
      if (!scene) return;
      const rootRect = this.scrollRoot.getBoundingClientRect();
      const sceneRect = scene.getBoundingClientRect();
      const top = this.scrollRoot.scrollTop + sceneRect.top - rootRect.top;
      const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      this.scrollRoot.scrollTo({ top, behavior: reducedMotion ? 'auto' : 'smooth' });
    }
  }

  document.querySelectorAll('[data-story-chapter]').forEach((chapter) => {
    new StoryChapter(chapter, DETOUR_ASSETS).init();
  });
})();
