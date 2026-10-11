(() => {
  const base = {
    id: 'an-profile-showcase-v56',
    title: 'An Lee · Profile',
    scenes: [
      {
        id: 'once-upon-a-time', number: '01', chapter: 'AN LEE', title: 'At a Glance', layout: 'showcase-hero', maxBeat: 0,
        elements: [
          { id: 'hero-bg', type: 'asset', asset: '/public/assets/story/backgrounds/background-systems.webp', alt: '', visibleFrom: 0, persist: true, className: 'showcase-backdrop showcase-backdrop--systems' },
          { id: 'hero-character', type: 'illustration', asset: '/public/assets/story/characters/an-idle.webp', alt: 'An Lee', visibleFrom: 0, persist: true, className: 'showcase-character showcase-character--hero' },
          { id: 'hero-kicker', type: 'text', content: 'Business context. Technical execution.', visibleFrom: 0, persist: true, className: 'showcase-kicker' },
          { id: 'hero-title', type: 'emphasis', content: 'Business-aware.\nSystems-minded.', visibleFrom: 0, persist: true, className: 'showcase-title showcase-title--hero' },
          { id: 'hero-copy', type: 'text', content: 'Accounting · Audit · Computer Science · Software', visibleFrom: 0, persist: true, className: 'showcase-copy showcase-copy--compact' },
          { id: 'hero-traits', type: 'chips', items: ['Analytical', 'Adaptable', 'Practical'], visibleFrom: 0, persist: true, className: 'showcase-tags showcase-tags--hero' }
        ]
      },
      {
        id: 'business', number: '02', chapter: 'BUSINESS FOUNDATION', title: 'Judgment Before Tools', layout: 'showcase-split', maxBeat: 0,
        elements: [
          { id: 'business-bg', type: 'asset', asset: '/public/assets/story/backgrounds/background-taiwan.webp', alt: '', visibleFrom: 0, persist: true, className: 'showcase-backdrop showcase-backdrop--business' },
          { id: 'business-character', type: 'illustration', asset: '/public/assets/story/characters/an-professional.webp', alt: 'An with an audit document', visibleFrom: 0, persist: true, className: 'showcase-character showcase-character--left' },
          { id: 'business-kicker', type: 'text', content: 'Accounting + PwC audit', visibleFrom: 0, persist: true, className: 'showcase-kicker showcase-kicker--right' },
          { id: 'business-title', type: 'emphasis', content: 'Understands what the numbers mean.', visibleFrom: 0, persist: true, className: 'showcase-title showcase-title--right' },
          { id: 'business-copy', type: 'text', content: 'Trained to trace evidence, assess risk, and understand how decisions affect an operation.', visibleFrom: 0, persist: true, className: 'showcase-copy showcase-copy--right' },
          { id: 'business-skills', type: 'chips', items: ['Business judgment', 'Risk awareness', 'Process analysis', 'Attention to detail'], visibleFrom: 0, persist: true, className: 'showcase-specs showcase-specs--right' }
        ]
      },
      {
        id: 'mimir', number: '03', chapter: 'TECHNICAL FOUNDATION', title: 'Build the Better Workflow', layout: 'showcase-tech', maxBeat: 0,
        elements: [
          { id: 'tech-bg', type: 'asset', asset: '/public/assets/story/backgrounds/background-workflow.webp', alt: '', visibleFrom: 0, persist: true, className: 'showcase-backdrop showcase-backdrop--tech' },
          { id: 'tech-character', type: 'illustration', asset: '/public/assets/story/characters/an-student-hoodie-v2.webp', alt: 'An working in computer science', visibleFrom: 0, persist: true, className: 'showcase-character showcase-character--right' },
          { id: 'tech-kicker', type: 'text', content: 'Software + data + automation', visibleFrom: 0, persist: true, className: 'showcase-kicker' },
          { id: 'tech-title', type: 'emphasis', content: 'Turns repeatable work into reliable systems.', visibleFrom: 0, persist: true, className: 'showcase-title showcase-title--left' },
          { id: 'tech-copy', type: 'text', content: 'Builds around real workflows—so the result is useful, explainable, and easier to trust.', visibleFrom: 0, persist: true, className: 'showcase-copy showcase-copy--left' },
          { id: 'tech-skills', type: 'chips', items: ['Python', 'SQL', 'JavaScript', 'Full-stack development', 'Workflow automation', 'AI integration'], visibleFrom: 0, persist: true, className: 'showcase-specs showcase-specs--left showcase-specs--technical' }
        ]
      },
      {
        id: 'adapt', number: '04', chapter: 'HOW I WORK', title: 'Clarity Across Functions', layout: 'showcase-workstyle', maxBeat: 0,
        elements: [
          { id: 'work-bg', type: 'asset', asset: '/public/assets/story/backgrounds/background-journey.webp', alt: '', visibleFrom: 0, persist: true, className: 'showcase-backdrop showcase-backdrop--work' },
          { id: 'work-character', type: 'illustration', asset: '/public/assets/story/characters/an-working.webp', alt: 'An working at a laptop', visibleFrom: 0, persist: true, className: 'showcase-character showcase-character--left showcase-character--working' },
          { id: 'work-kicker', type: 'text', content: 'Cross-functional by experience', visibleFrom: 0, persist: true, className: 'showcase-kicker showcase-kicker--right' },
          { id: 'work-title', type: 'emphasis', content: 'Clarifies.\nConnects.\nDelivers.', visibleFrom: 0, persist: true, className: 'showcase-title showcase-title--right showcase-title--stacked' },
          { id: 'work-copy', type: 'text', content: 'Comfortable translating business needs into technical decisions—and learning quickly when the context changes.', visibleFrom: 0, persist: true, className: 'showcase-copy showcase-copy--right' },
          { id: 'work-skills', type: 'chips', items: ['Structured problem solving', 'Clear communication', 'Ownership', 'Cross-functional collaboration', 'Learning agility'], visibleFrom: 0, persist: true, className: 'showcase-specs showcase-specs--right' }
        ]
      },
      {
        id: 'next-page', number: '05', chapter: 'WHAT I BRING', title: 'The Combination', layout: 'showcase-contact', maxBeat: 0,
        elements: [
          { id: 'final-bg', type: 'asset', asset: '/public/assets/story/backgrounds/background-systems.webp', alt: '', visibleFrom: 0, persist: true, className: 'showcase-backdrop showcase-backdrop--final' },
          { id: 'final-character', type: 'illustration', asset: '/public/assets/story/characters/an-next-page.webp', alt: 'An ready for what comes next', visibleFrom: 0, persist: true, className: 'showcase-character showcase-character--final' },
          { id: 'final-kicker', type: 'text', content: 'One profile. Three useful lenses.', visibleFrom: 0, persist: true, className: 'showcase-kicker' },
          { id: 'final-title', type: 'emphasis', content: 'Business sense.\nTechnical range.\nPractical execution.', visibleFrom: 0, persist: true, className: 'showcase-title showcase-title--final' },
          { id: 'final-copy', type: 'text', content: 'For products and systems that need both context and craft.', visibleFrom: 0, persist: true, className: 'showcase-copy showcase-copy--final' },
          { id: 'links', type: 'links', visibleFrom: 0, persist: true, className: 'showcase-links', items: [
            { eyebrow: 'CONNECT', label: 'LinkedIn', href: 'https://www.linkedin.com/in/an222/' },
            { eyebrow: 'CODE', label: 'GitHub', href: 'https://github.com/An022' },
            { eyebrow: 'PRODUCT', label: 'Applybook', href: 'https://applybook.applybook-app.workers.dev/' }
          ] }
        ]
      }
    ]
  };

  const locales = {
    en: {
      ui: {
        hint: 'Scroll, press ↓, →, or Space to explore', previous: 'Previous', reveal: 'Next', nextPage: 'Next',
        storyNavigation: 'Profile navigation', previousAria: 'Previous profile page', nextAria: 'Next profile page',
        progressAria: 'Profile progress', deckAria: 'An Lee’s profile. Use scroll, arrow keys, Space, or the navigation buttons to continue.',
        connectAria: 'Connect with An Lee', scene: 'Profile', applybookSuffix: '(app I built)'
      }, scenes: {}
    },
    'zh-Hant': {
      ui: {
        hint: '滑動頁面，或按 ↓、→、空白鍵瀏覽', previous: '上一頁', reveal: '下一頁', nextPage: '下一頁',
        storyNavigation: '個人簡介導覽', previousAria: '上一頁個人簡介', nextAria: '下一頁個人簡介',
        progressAria: '個人簡介進度', deckAria: 'An Lee 的個人簡介。可滑動頁面，或使用方向鍵、空白鍵與導覽按鈕繼續。',
        connectAria: '與 An Lee 聯絡', scene: '簡介', applybookSuffix: '（我開發的應用程式）'
      },
      scenes: {
        'once-upon-a-time': { chapter: 'AN LEE', title: '快速認識', elements: {
          'hero-kicker': '理解商業，也能落實技術。', 'hero-title': '具備商業視角。\n擅長系統思考。',
          'hero-copy': '會計 · 審計 · 資訊工程 · 軟體', 'hero-traits': ['分析力', '適應力', '務實執行'] } },
        business: { chapter: '商業基礎', title: '工具之前，先做判斷', elements: {
          'business-kicker': '會計 + PwC 審計', 'business-title': '不只看數字，也理解數字代表什麼。',
          'business-copy': '習慣追查證據、評估風險，並理解決策如何影響實際營運。',
          'business-skills': ['商業判斷', '風險意識', '流程分析', '重視細節'] } },
        mimir: { chapter: '技術基礎', title: '打造更好的工作流程', elements: {
          'tech-kicker': '軟體 + 資料 + 自動化', 'tech-title': '把重複工作，轉化成可靠系統。',
          'tech-copy': '從真實工作流程出發，讓成果實用、可解釋，也更值得信任。',
          'tech-skills': ['Python', 'SQL', 'JavaScript', '全端開發', '工作流程自動化', 'AI 整合'] } },
        adapt: { chapter: '工作方式', title: '跨職能的清楚溝通', elements: {
          'work-kicker': '跨領域經驗形成的方法', 'work-title': '釐清。\n連結。\n交付。',
          'work-copy': '能把商業需求轉化成技術決策，也能在情境改變時快速學習。',
          'work-skills': ['結構化解題', '清楚溝通', '主動負責', '跨職能協作', '快速學習'] } },
        'next-page': { chapter: '我能帶來的價值', title: '能力的組合', elements: {
          'final-kicker': '一個人，三種實用視角。', 'final-title': '商業理解。\n技術廣度。\n務實執行。',
          'final-copy': '適合需要兼顧情境理解與技術品質的產品與系統。',
          links: [{ eyebrow: '聯絡', label: 'LinkedIn' }, { eyebrow: '程式碼', label: 'GitHub' }, { eyebrow: '產品', label: 'Applybook' }]
        } }
      }
    },
    'zh-Hans': {
      ui: {
        hint: '滑动页面，或按 ↓、→、空格键浏览', previous: '上一页', reveal: '下一页', nextPage: '下一页',
        storyNavigation: '个人简介导航', previousAria: '上一页个人简介', nextAria: '下一页个人简介',
        progressAria: '个人简介进度', deckAria: 'An Lee 的个人简介。可滑动页面，或使用方向键、空格键与导航按钮继续。',
        connectAria: '与 An Lee 联系', scene: '简介', applybookSuffix: '（我开发的应用程序）'
      },
      scenes: {
        'once-upon-a-time': { chapter: 'AN LEE', title: '快速了解', elements: {
          'hero-kicker': '理解商业，也能落实技术。', 'hero-title': '具备商业视角。\n擅长系统思考。',
          'hero-copy': '会计 · 审计 · 计算机科学 · 软件', 'hero-traits': ['分析力', '适应力', '务实执行'] } },
        business: { chapter: '商业基础', title: '工具之前，先做判断', elements: {
          'business-kicker': '会计 + PwC 审计', 'business-title': '不只看数字，也理解数字代表什么。',
          'business-copy': '习惯追查证据、评估风险，并理解决策如何影响实际运营。',
          'business-skills': ['商业判断', '风险意识', '流程分析', '注重细节'] } },
        mimir: { chapter: '技术基础', title: '打造更好的工作流程', elements: {
          'tech-kicker': '软件 + 数据 + 自动化', 'tech-title': '把重复工作，转化成可靠系统。',
          'tech-copy': '从真实工作流程出发，让成果实用、可解释，也更值得信任。',
          'tech-skills': ['Python', 'SQL', 'JavaScript', '全栈开发', '工作流程自动化', 'AI 集成'] } },
        adapt: { chapter: '工作方式', title: '跨职能的清晰沟通', elements: {
          'work-kicker': '跨领域经验形成的方法', 'work-title': '厘清。\n连接。\n交付。',
          'work-copy': '能把商业需求转化成技术决策，也能在情境改变时快速学习。',
          'work-skills': ['结构化解题', '清晰沟通', '主动负责', '跨职能协作', '快速学习'] } },
        'next-page': { chapter: '我能带来的价值', title: '能力的组合', elements: {
          'final-kicker': '一个人，三种实用视角。', 'final-title': '商业理解。\n技术广度。\n务实执行。',
          'final-copy': '适合需要兼顾情境理解与技术质量的产品与系统。',
          links: [{ eyebrow: '联系', label: 'LinkedIn' }, { eyebrow: '代码', label: 'GitHub' }, { eyebrow: '产品', label: 'Applybook' }]
        } }
      }
    }
  };

  const supported = ['en', 'zh-Hant', 'zh-Hans'];
  const saved = localStorage.getItem('an-story-language');
  const locale = supported.includes(saved) ? saved : 'en';
  const language = locales[locale];
  const profile = JSON.parse(JSON.stringify(base));
  profile.id = `an-profile-showcase-v56-${locale}`;
  profile.ui = language.ui;

  Object.entries(language.scenes || {}).forEach(([sceneId, translation]) => {
    const scene = profile.scenes.find((item) => item.id === sceneId);
    if (!scene) return;
    if (translation.chapter) scene.chapter = translation.chapter;
    if (translation.title) scene.title = translation.title;
    Object.entries(translation.elements || {}).forEach(([elementId, value]) => {
      const element = scene.elements.find((item) => item.id === elementId);
      if (!element) return;
      if (Array.isArray(value)) {
        if (element.type === 'links') value.forEach((item, index) => Object.assign(element.items[index], item));
        else element.items = value;
      } else element.content = value;
    });
  });

  document.documentElement.lang = locale === 'zh-Hant' ? 'zh-Hant' : locale === 'zh-Hans' ? 'zh-Hans' : 'en';
  document.body.dataset.storyLanguage = locale;
  document.querySelector('[data-applybook-suffix]').textContent = language.ui.applybookSuffix;
  document.querySelector('.story-external-links').setAttribute('aria-label', language.ui.connectAria);
  document.querySelectorAll('[data-story-language]').forEach((button) => {
    const active = button.dataset.storyLanguage === locale;
    button.classList.toggle('is-active', active);
    button.setAttribute('aria-pressed', String(active));
    button.addEventListener('click', () => {
      if (button.dataset.storyLanguage === locale) return;
      localStorage.setItem('an-story-language', button.dataset.storyLanguage);
      sessionStorage.setItem('an-story-resume-after-language-change', 'true');
      window.location.reload();
    });
  });

  if (sessionStorage.getItem('an-story-resume-after-language-change') === 'true') {
    sessionStorage.removeItem('an-story-resume-after-language-change');
    window.requestAnimationFrame(() => document.getElementById('skipGame')?.click());
  }

  window.AN_STORY_FULL = profile;
})();
