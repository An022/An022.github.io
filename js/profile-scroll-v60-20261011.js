(() => {
  const data = window.AN_STORY_FULL;
  const root = document.querySelector('[data-story-deck]');
  if (!data || !root) return;

  const scene = (id) => data.scenes.find((item) => item.id === id);
  const element = (sceneData, id) => sceneData?.elements.find((item) => item.id === id);
  const text = (sceneData, id) => element(sceneData, id)?.content || '';
  const items = (sceneData, id) => element(sceneData, id)?.items || [];
  const headline = (value) => value.split('\n').map((line) => line.replace(/[.。]+\s*$/, '')).join('\n');

  const make = (tag, className, content) => {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (content !== undefined) node.textContent = content;
    return node;
  };

  const addLabel = (section, sceneData) => {
    const label = make('p', 'profile-scroll__label');
    label.append(make('span', '', sceneData.number), make('span', '', sceneData.chapter));
    section.append(label);
  };

  const addSpecs = (parent, values, className = 'profile-scroll__specs') => {
    const list = make('ul', className);
    values.forEach((value, index) => {
      const item = make('li');
      item.append(make('span', 'profile-scroll__spec-number', String(index + 1).padStart(2, '0')), make('strong', '', value));
      list.append(item);
    });
    parent.append(list);
    return list;
  };

  const makeSection = (sceneData, modifier) => {
    const section = make('section', `profile-scroll__section profile-scroll__section--${modifier}`);
    section.id = `profile-${sceneData.id}`;
    section.dataset.profileSection = sceneData.id;
    section.setAttribute('aria-labelledby', `profile-title-${sceneData.id}`);
    addLabel(section, sceneData);
    return section;
  };

  const heroData = scene('once-upon-a-time');
  const hero = makeSection(heroData, 'hero');
  const heroInner = make('div', 'profile-scroll__hero-inner');
  heroInner.append(make('p', 'profile-scroll__eyebrow', text(heroData, 'hero-kicker')));
  const heroTitle = make('h1', 'profile-scroll__hero-title', headline(text(heroData, 'hero-title')));
  heroTitle.id = `profile-title-${heroData.id}`;
  heroInner.append(heroTitle, make('p', 'profile-scroll__foundation', text(heroData, 'hero-copy')));
  const lenses = make('div', 'profile-scroll__lenses');
  items(heroData, 'hero-traits').forEach((value, index) => {
    const lens = make('div', 'profile-scroll__lens');
    lens.append(make('span', '', `0${index + 1}`), make('strong', '', value));
    lenses.append(lens);
  });
  heroInner.append(lenses);
  const heroVisual = make('div', 'profile-scroll__hero-visual');
  heroVisual.setAttribute('aria-hidden', 'true');
  heroVisual.append(make('span', '', 'BUSINESS'), make('i'), make('span', '', 'SYSTEMS'));
  hero.append(heroInner, heroVisual);
  hero.classList.add('is-visible');

  const businessData = scene('business');
  const business = makeSection(businessData, 'light');
  const businessGrid = make('div', 'profile-scroll__split');
  const businessCopy = make('div', 'profile-scroll__copy');
  businessCopy.append(make('p', 'profile-scroll__eyebrow', text(businessData, 'business-kicker')));
  const businessTitle = make('h2', 'profile-scroll__title', headline(text(businessData, 'business-title')));
  businessTitle.id = `profile-title-${businessData.id}`;
  businessCopy.append(businessTitle, make('p', 'profile-scroll__body', text(businessData, 'business-copy')));
  const judgment = make('div', 'profile-scroll__wordmark', 'JUDGMENT');
  judgment.setAttribute('aria-hidden', 'true');
  businessGrid.append(businessCopy, judgment);
  addSpecs(businessGrid, items(businessData, 'business-skills'));
  business.append(businessGrid);

  const techData = scene('mimir');
  const tech = makeSection(techData, 'dark');
  const techGrid = make('div', 'profile-scroll__split profile-scroll__split--tech');
  const techCopy = make('div', 'profile-scroll__copy');
  techCopy.append(make('p', 'profile-scroll__eyebrow', text(techData, 'tech-kicker')));
  const techTitle = make('h2', 'profile-scroll__title', headline(text(techData, 'tech-title')));
  techTitle.id = `profile-title-${techData.id}`;
  techCopy.append(techTitle, make('p', 'profile-scroll__body', text(techData, 'tech-copy')));
  const system = make('div', 'profile-scroll__system');
  const core = make('div', 'profile-scroll__system-core');
  core.append(make('small', '', 'BUILD'), make('strong', '', 'SYSTEM'));
  system.append(core);
  items(techData, 'tech-skills').forEach((value, index) => {
    const node = make('span', `profile-scroll__system-node profile-scroll__system-node--${index + 1}`, value);
    system.append(node);
  });
  techGrid.append(techCopy, system);
  tech.append(techGrid);

  const workData = scene('adapt');
  const work = makeSection(workData, 'gray');
  const workGrid = make('div', 'profile-scroll__work-grid');
  const workCopy = make('div', 'profile-scroll__copy');
  workCopy.append(make('p', 'profile-scroll__eyebrow', text(workData, 'work-kicker')));
  const workTitle = make('h2', 'profile-scroll__title profile-scroll__title--verbs', headline(text(workData, 'work-title')));
  workTitle.id = `profile-title-${workData.id}`;
  workCopy.append(workTitle, make('p', 'profile-scroll__body', text(workData, 'work-copy')));
  workGrid.append(workCopy);
  addSpecs(workGrid, items(workData, 'work-skills'), 'profile-scroll__specs profile-scroll__specs--work');
  work.append(workGrid);

  const finalData = scene('next-page');
  const final = makeSection(finalData, 'contact');
  const finalInner = make('div', 'profile-scroll__contact-inner');
  finalInner.append(make('p', 'profile-scroll__eyebrow', text(finalData, 'final-kicker')));
  const finalTitle = make('h2', 'profile-scroll__title profile-scroll__title--contact', headline(text(finalData, 'final-title')));
  finalTitle.id = `profile-title-${finalData.id}`;
  finalInner.append(finalTitle, make('p', 'profile-scroll__body', text(finalData, 'final-copy')));
  const links = make('nav', 'profile-scroll__links');
  links.setAttribute('aria-label', data.ui?.connectAria || 'Connect with An Lee');
  items(finalData, 'links').forEach((item) => {
    const link = make('a');
    link.href = item.href;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    link.append(make('small', '', item.eyebrow), make('strong', '', item.label), make('span', '', '↗'));
    links.append(link);
  });
  finalInner.append(links);
  final.append(finalInner, make('p', 'profile-scroll__footer', 'An Lee · New York'));

  const shell = make('div', 'profile-scroll');
  shell.id = 'profile-top';
  shell.append(hero, business, tech, work, final);
  root.replaceChildren(shell);
  root.removeAttribute('tabindex');
  root.setAttribute('aria-label', data.ui?.deckAria || 'An Lee profile');

  document.querySelector('.story-logo')?.setAttribute('href', '#profile-top');
  document.querySelector('.story-logo')?.removeAttribute('data-story-jump');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add('is-visible');
    });
  }, { threshold: 0.2, rootMargin: '0px 0px -8% 0px' });
  document.querySelectorAll('[data-profile-section]').forEach((section) => observer.observe(section));

  const revealVisible = () => {
    document.querySelectorAll('[data-profile-section]').forEach((section) => {
      const bounds = section.getBoundingClientRect();
      if (bounds.top < window.innerHeight * .88 && bounds.bottom > 0) section.classList.add('is-visible');
    });
  };
  let scrollFrame = 0;
  const updateScrollEffects = () => {
    scrollFrame = 0;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const viewport = window.innerHeight || 1;
    document.querySelectorAll('[data-profile-section]').forEach((section) => {
      const bounds = section.getBoundingClientRect();
      const center = bounds.top + bounds.height / 2;
      const progress = Math.max(-1, Math.min(1, (center - viewport / 2) / viewport));
      section.style.setProperty('--section-progress', progress.toFixed(3));
    });
  };
  const requestScrollEffects = () => {
    if (!scrollFrame) scrollFrame = window.requestAnimationFrame(updateScrollEffects);
  };
  window.addEventListener('scroll', revealVisible, { passive: true });
  window.addEventListener('scroll', requestScrollEffects, { passive: true });
  window.addEventListener('resize', requestScrollEffects, { passive: true });
  window.addEventListener('portfolio:unlocked', revealVisible);
  new MutationObserver(revealVisible).observe(document.body, { attributes: true, attributeFilter: ['class'] });
  window.requestAnimationFrame(() => { revealVisible(); updateScrollEffects(); });
})();
