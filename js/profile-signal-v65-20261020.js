(() => {
  const root = document.querySelector('[data-story-deck]');
  if (!root) return;

  const locale = document.body.dataset.storyLanguage || 'en';
  const content = {
    en: {
      eyebrow: 'A cross-disciplinary profile',
      title: ['Business context', 'Technical execution'],
      domainLeft: 'BUSINESS',
      domainRight: 'TECHNOLOGY',
      intro: 'I connect business judgment with technical thinking—turning needs, risk, data, and systems into practical solutions.',
      bridge: 'Different disciplines. Shared strengths. One way of working.',
      pillars: [
        ['Understand the context', 'See the business need, risk, and consequence behind each decision.'],
        ['Connect the perspectives', 'Bring requirements, controls, data, and engineering into one clear direction.'],
        ['Build with purpose', 'Create systems that are reliable, useful, and easy to understand.']
      ],
      skillsLabel: 'Shared strengths',
      skills: 'Systems thinking · Risk awareness · Structured problem solving · Clear communication · Software development',
      credential: 'CISA examination passed',
      credentialNote: 'Certification application to follow',
      connect: 'Connect'
    },
    'zh-Hant': {
      eyebrow: '跨領域專業',
      title: ['商業理解', '技術執行'],
      domainLeft: '商業',
      domainRight: '技術',
      intro: '我連結商業判斷與技術思維，將需求、風險、資料與系統轉化為務實可行的解決方案。',
      bridge: '不同領域。共通能力。一套工作方法。',
      pillars: [
        ['理解情境', '看見每項決策背後的商業需求、風險與影響。'],
        ['串聯觀點', '將需求、控制、資料與工程整合成清楚方向。'],
        ['有目的地建構', '打造可靠、實用且容易理解的系統。']
      ],
      skillsLabel: '共通能力',
      skills: '系統思考 · 風險意識 · 結構化解題 · 清楚溝通 · 軟體開發',
      credential: '已通過 CISA 考試',
      credentialNote: '認證申請待提交',
      connect: '聯絡方式'
    },
    'zh-Hans': {
      eyebrow: '跨领域专业',
      title: ['商业理解', '技术执行'],
      domainLeft: '商业',
      domainRight: '技术',
      intro: '我连接商业判断与技术思维，将需求、风险、数据与系统转化为务实可行的解决方案。',
      bridge: '不同领域。共通能力。一套工作方法。',
      pillars: [
        ['理解情境', '看见每项决策背后的商业需求、风险与影响。'],
        ['连接观点', '将需求、控制、数据与工程整合成清晰方向。'],
        ['有目的地构建', '打造可靠、实用且容易理解的系统。']
      ],
      skillsLabel: '共通能力',
      skills: '系统思考 · 风险意识 · 结构化解题 · 清晰沟通 · 软件开发',
      credential: '已通过 CISA 考试',
      credentialNote: '认证申请待提交',
      connect: '联系方式'
    }
  }[locale] || null;

  const copy = content || {
    eyebrow: 'A cross-disciplinary profile',
    title: ['Business context', 'Technical execution'],
    domainLeft: 'BUSINESS',
    domainRight: 'TECHNOLOGY',
    intro: '', bridge: '', pillars: [], skillsLabel: 'Shared strengths', skills: '',
    credential: 'CISA examination passed', credentialNote: 'Certification application to follow', connect: 'Connect'
  };

  const make = (tag, className, value) => {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (value !== undefined) node.textContent = value;
    return node;
  };

  const page = make('section', 'profile-onepage profile-signal');
  page.id = 'profile-top';
  page.dataset.leftDomain = copy.domainLeft;
  page.dataset.rightDomain = copy.domainRight;
  page.setAttribute('aria-labelledby', 'profile-signal-title');

  const field = make('div', 'profile-signal__field');
  field.setAttribute('aria-hidden', 'true');
  field.append(make('span', 'profile-signal__route'), make('span', 'profile-signal__crossing', '×'));

  const intro = make('div', 'profile-signal__intro');
  const index = make('p', 'profile-signal__index');
  index.append(make('span', '', 'AN / 01'), make('span', '', 'NYC / 40.7°N'));
  intro.append(index, make('p', 'profile-signal__eyebrow', copy.eyebrow));
  const title = make('h1', 'profile-signal__title');
  title.id = 'profile-signal-title';
  title.append(make('span', 'profile-signal__title-top', copy.title[0]), make('span', 'profile-signal__title-bottom', copy.title[1]));
  intro.append(title, make('p', 'profile-signal__lead', copy.intro));

  const method = make('div', 'profile-signal__method');
  method.append(make('p', 'profile-signal__bridge', copy.bridge));
  const pillars = make('ol', 'profile-signal__pillars');
  copy.pillars.forEach(([heading, description], indexValue) => {
    const item = make('li');
    item.style.setProperty('--signal-index', indexValue);
    item.append(make('span', 'profile-signal__node', String(indexValue + 1).padStart(2, '0')));
    const text = make('div', 'profile-signal__pillar-copy');
    text.append(make('strong', '', heading), make('p', '', description));
    item.append(text);
    pillars.append(item);
  });
  method.append(pillars);

  const details = make('footer', 'profile-signal__details');
  const skills = make('div', 'profile-signal__skills');
  skills.append(make('small', '', copy.skillsLabel), make('p', '', copy.skills));
  const credential = make('div', 'profile-signal__credential');
  credential.append(make('small', '', 'CISA / STATUS'), make('strong', '', copy.credential), make('span', '', copy.credentialNote));
  const links = make('nav', 'profile-signal__links');
  links.setAttribute('aria-label', copy.connect);
  [
    ['LinkedIn', 'https://www.linkedin.com/in/an222/'],
    ['GitHub', 'https://github.com/An022'],
    ['Applybook', 'https://applybook.applybook-app.workers.dev/']
  ].forEach(([label, href]) => {
    const link = make('a', '', label);
    link.href = href;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    link.append(make('span', '', '↗'));
    links.append(link);
  });
  details.append(skills, credential, links);

  page.append(field, intro, method, details);
  root.replaceChildren(page);
  root.removeAttribute('tabindex');
  document.querySelector('.story-logo')?.setAttribute('href', '#profile-top');
  document.querySelector('.story-logo')?.removeAttribute('data-story-jump');

  let frame = 0;
  const update = () => {
    frame = 0;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
    page.style.setProperty('--page-progress', Math.max(0, Math.min(1, window.scrollY / max)).toFixed(3));
  };
  const requestUpdate = () => {
    if (!frame) frame = window.requestAnimationFrame(update);
  };
  window.addEventListener('scroll', requestUpdate, { passive: true });
  window.addEventListener('resize', requestUpdate, { passive: true });
  window.requestAnimationFrame(() => {
    page.classList.add('is-visible');
    update();
  });
})();
