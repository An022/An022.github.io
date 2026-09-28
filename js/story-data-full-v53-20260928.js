(() => {
  const base = {
  id: 'an-illustrated-story-six-chapters-v50',
  title: "An's Story",
  scenes: [
    {
      id: 'once-upon-a-time', number: '01', chapter: 'Taiwan · The Foundation', title: 'Understanding Business', layout: 'portrait-right', maxBeat: 3,
      elements: [
        { id: 'bg-taiwan', type: 'asset', asset: '/public/assets/story/backgrounds/background-taiwan.webp', alt: '', visibleFrom: 0, persist: true, className: 'art-backdrop art-backdrop--taiwan' },
        { id: 'business', type: 'illustration', asset: '/public/assets/story/characters/an-idle.webp', alt: 'An beginning her career in Taiwan', visibleFrom: 0, persist: true, className: 'art-character art-curious' },
        { id: 'taiwan', type: 'text', content: 'An grew up in Taiwan with a clear interest in business.', visibleFrom: 0, persist: true, className: 'copy-eyebrow' },
        { id: 'accounting', type: 'emphasis', content: 'Accounting gave her a disciplined way to understand how organizations operate.', visibleFrom: 1, className: 'copy-title copy-title--small' },
        { id: 'numbers', type: 'text', content: 'Numbers recorded the outcome.', visibleFrom: 2, className: 'copy-line' },
        { id: 'system', type: 'emphasis', content: 'Decisions, incentives, and risk explained the system behind it.', visibleFrom: 3, className: 'copy-punch' }
      ]
    },
    {
      id: 'transformation', number: '02', chapter: 'PwC · Business in Practice', title: 'From Judgment to Systems', layout: 'builder', maxBeat: 3,
      elements: [
        { id: 'bg-workflow', type: 'asset', asset: '/public/assets/story/backgrounds/background-workflow.webp', alt: '', visibleFrom: 0, persist: true, className: 'art-backdrop art-backdrop--workflow' },
        { id: 'working', type: 'illustration', asset: '/public/assets/story/characters/an-working.webp', alt: 'An redesigning a business workflow', visibleFrom: 0, persist: true, className: 'art-character art-working-condensed' },
        { id: 'pwc', type: 'text', content: 'At PwC, An learned how organizations make decisions—and where processes break.', visibleFrom: 0, persist: true, className: 'copy-eyebrow' },
        { id: 'judgment', type: 'chips', items: ['Trace the evidence', 'Test the control', 'Explain the risk'], visibleFrom: 1, className: 'story-chips story-chips--questions story-type-list story-type-list--pwc' },
        { id: 'opportunity', type: 'emphasis', content: 'Repeated work revealed a larger opportunity.', visibleFrom: 2, className: 'copy-title copy-title--small' },
        { id: 'redesigned', type: 'emphasis', content: 'She began turning manual steps into clearer workflows and automation.', visibleFrom: 3, className: 'copy-punch copy-punch--pwc' }
      ]
    },
    {
      id: 'start-over', number: '03', chapter: 'A Very Big Detour', title: 'A Deliberate Reset', layout: 'journey', maxBeat: 3,
      elements: [
        { id: 'bg-journey', type: 'asset', asset: '/public/assets/story/backgrounds/background-journey.webp', alt: 'An illustrated route from Taiwan to New York', visibleFrom: 0, persist: true, className: 'art-backdrop art-backdrop--journey' },
        { id: 'traveler', type: 'illustration', asset: '/public/assets/story/characters/an-suitcase.webp', alt: 'An travels with a suitcase', visibleFrom: 0, persist: true, className: 'art-character art-traveler-condensed' },
        { id: 'build-systems', type: 'text', content: 'An wanted to move from evaluating systems to building them.', visibleFrom: 0, persist: true, className: 'copy-eyebrow copy-eyebrow--journey' },
        { id: 'started-over', type: 'emphasis', content: 'That meant starting over.', visibleFrom: 1, className: 'copy-title copy-title--journey-main' },
        { id: 'route', type: 'text', content: 'Taiwan → New York.', visibleFrom: 2, className: 'copy-line copy-line--journey-main' },
        { id: 'career-route', type: 'text', content: 'Accounting → Computer Science.\nSenior Associate → Student.', visibleFrom: 3, className: 'copy-punch copy-punch--journey-main' }
      ]
    },
    {
      id: 'adapt', number: '04', chapter: 'New York · The Method', title: 'Experience Carries Forward', layout: 'sequence', maxBeat: 3,
      elements: [
        { id: 'bg-adapt', type: 'asset', asset: '/public/assets/story/backgrounds/background-systems.webp', alt: '', visibleFrom: 0, persist: true, className: 'art-backdrop art-backdrop--adapt' },
        { id: 'student', type: 'illustration', asset: '/public/assets/story/characters/an-student-hoodie-v2.webp', alt: 'An beginning computer science studies in New York', visibleFrom: 0, persist: true, className: 'art-character art-moving-condensed art-student-hoodie' },
        { id: 'new-world', type: 'text', content: 'A new city, language, field, and set of rules.', visibleFrom: 0, persist: true, className: 'copy-eyebrow' },
        { id: 'not-zero', type: 'emphasis', content: 'Starting over did not mean starting from zero.', visibleFrom: 1, className: 'copy-title copy-title--small' },
        { id: 'carried', type: 'text', content: 'Business judgment became part of how she learned, adapted, and built.', visibleFrom: 2, className: 'copy-punch copy-punch--adapt' },
        { id: 'loop', type: 'process', items: ['Observe', 'Learn', 'Adapt', 'Build', 'Repeat'], visibleFrom: 3, revealStep: false, className: 'story-process story-process--loop-condensed story-process--type' }
      ]
    },
    {
      id: 'mimir', number: '05', chapter: 'What I Build', title: 'Putting Both Sides to Work', layout: 'project', maxBeat: 3,
      elements: [
        { id: 'bg-projects', type: 'asset', asset: '/public/assets/story/backgrounds/background-workflow.webp', alt: '', visibleFrom: 0, persist: true, className: 'art-backdrop art-backdrop--projects' },
        { id: 'project-lead', type: 'text', content: 'Different domains; the same discipline: understand the operation, then improve the system.', visibleFrom: 0, persist: true, className: 'copy-eyebrow' },
        { id: 'mimir-title', type: 'emphasis', content: 'The Mimir', visibleFrom: 1, className: 'copy-title copy-title--project' },
        { id: 'mimir-copy', type: 'text', content: 'A language-learning platform built around how real learners listen, speak, and improve.', visibleFrom: 1, className: 'copy-line copy-line--project' },
        { id: 'boc-title', type: 'emphasis', content: 'Madison Davis', visibleFrom: 2, className: 'copy-title copy-title--project-secondary' },
        { id: 'boc-copy', type: 'text', content: 'Financial operations supported by a reliable, traceable data workflow for nightly loan processing.', visibleFrom: 2, className: 'copy-line copy-line--project-secondary' },
        { id: 'project-strengths', type: 'chips', items: ['Clarify ambiguity', 'Connect business & technology', 'Communicate tradeoffs', 'Adapt and deliver'], visibleFrom: 3, className: 'story-chips story-soft-skills story-type-list' }
      ]
    },
    {
      id: 'next-page', number: '06', chapter: 'Now · Still Building', title: 'The Next Page', layout: 'contact', maxBeat: 3,
      elements: [
        { id: 'bg-next', type: 'asset', asset: '/public/assets/story/backgrounds/background-systems.webp', alt: '', visibleFrom: 0, persist: true, className: 'art-backdrop art-backdrop--next' },
        { id: 'next-character', type: 'illustration', asset: '/public/assets/story/characters/an-next-page.webp', alt: 'An walks toward the next chapter', visibleFrom: 0, persist: true, className: 'art-character art-next' },
        { id: 'same-principle', type: 'text', content: 'The path changed; the operating principle did not.', visibleFrom: 0, persist: true, className: 'copy-eyebrow' },
        { id: 'next-title', type: 'emphasis', content: 'Understand the business.\nBuild the system.\nImprove the outcome.', visibleFrom: 1, persist: true, className: 'copy-title copy-title--final' },
        { id: 'now', type: 'text', content: 'Today An works at the intersection of business judgment, data, and software.', visibleFrom: 2, className: 'copy-line' },
        { id: 'links', type: 'links', visibleFrom: 3, className: 'story-links', items: [
          { eyebrow: 'CONNECT', label: 'LinkedIn', href: 'https://www.linkedin.com/in/an222/' },
          { eyebrow: 'EXPLORE', label: 'GitHub', href: 'https://github.com/An022' },
          { eyebrow: 'TRY', label: 'Applybook', href: 'https://applybook.applybook-app.workers.dev/' }
        ] }
      ]
    }
  ]
};

  const locales = {
    en: {
      ui: {
        hint: 'Scroll, press ↓, →, or Space to turn the page', previous: 'Previous', reveal: 'Reveal', nextPage: 'Next page',
        storyNavigation: 'Story navigation', previousAria: 'Previous story beat', nextAria: 'Next story beat',
        progressAria: 'Story progress', deckAria: "An’s story. Use scroll, arrow keys, Space, or the navigation buttons to continue.",
        connectAria: 'Connect with An Lee', scene: 'Scene', applybookSuffix: '(app I built)'
      }, scenes: {}
    },
    'zh-Hant': {
      ui: {
        hint: '滑動頁面，或按 ↓、→、空白鍵繼續', previous: '上一段', reveal: '繼續', nextPage: '下一頁',
        storyNavigation: '故事導覽', previousAria: '上一段故事', nextAria: '下一段故事',
        progressAria: '故事進度', deckAria: 'An 的故事。可滑動頁面，或使用方向鍵、空白鍵與導覽按鈕繼續。',
        connectAria: '與 An Lee 聯絡', scene: '場景', applybookSuffix: '（我開發的應用程式）'
      },
      scenes: {
        'once-upon-a-time': { chapter: '台灣 · 基礎', title: '理解商業', elements: {
          taiwan: 'An 從台灣出發，一直對商業運作抱有明確興趣。',
          accounting: '會計訓練讓她用有紀律的方法理解組織如何運作。',
          numbers: '數字記錄結果。', system: '決策、誘因與風險，解釋了背後的系統。' } },
        transformation: { chapter: 'PwC · 商業實務', title: '從判斷到系統', elements: {
          pwc: '在 PwC，An 學會理解組織如何決策，以及流程會在哪裡失效。',
          judgment: ['追查證據', '檢驗控制', '說明風險'], opportunity: '重複的工作，讓她看見更大的改善空間。',
          redesigned: '她開始把繁瑣的手動步驟，轉化成更清楚的流程與自動化工具。' } },
        'start-over': { chapter: '一次很大的繞路', title: '有意識的重啟', elements: {
          'build-systems': 'An 想從評估系統，轉向親手打造系統。', 'started-over': '這代表重新開始。',
          route: '台灣 → 紐約。', 'career-route': '會計 → 資訊工程。\n資深審計員 → 學生。' } },
        adapt: { chapter: '紐約 · 新方法', title: '經驗會跟著你', elements: {
          'new-world': '新的城市、語言、領域與規則。', 'not-zero': '重新開始，不代表從零開始。',
          carried: '商業判斷力，成為她學習、適應與建構系統的方法。', loop: ['觀察', '學習', '適應', '建構', '重複'] } },
        mimir: { chapter: '我打造的作品', title: '讓兩種經驗一起發揮', elements: {
          'project-lead': '領域不同，方法一致：先理解實際運作，再改善系統。',
          'mimir-copy': '一個依照真實學習者如何聆聽、開口與進步而設計的語言學習平台。',
          'boc-copy': '以可靠、可追溯的資料流程，支援金融業務的夜間貸款處理。',
          'project-strengths': ['釐清模糊問題', '連結商業與技術', '說明取捨', '快速適應並交付'] } },
        'next-page': { chapter: '現在 · 持續建構', title: '下一頁', elements: {
          'same-principle': '路徑改變了，做事的原則沒有。',
          'next-title': '理解商業。\n打造系統。\n改善結果。',
          now: '現在，An 在商業判斷、資料與軟體的交會處工作。',
          links: [{ eyebrow: '聯絡', label: 'LinkedIn' }, { eyebrow: '作品', label: 'GitHub' }, { eyebrow: '體驗', label: 'Applybook' }]
        } }
      }
    },
    'zh-Hans': {
      ui: {
        hint: '滑动页面，或按 ↓、→、空格键继续', previous: '上一段', reveal: '继续', nextPage: '下一页',
        storyNavigation: '故事导航', previousAria: '上一段故事', nextAria: '下一段故事',
        progressAria: '故事进度', deckAria: 'An 的故事。可滑动页面，或使用方向键、空格键与导航按钮继续。',
        connectAria: '与 An Lee 联系', scene: '场景', applybookSuffix: '（我开发的应用程序）'
      },
      scenes: {
        'once-upon-a-time': { chapter: '台湾 · 基础', title: '理解商业', elements: {
          taiwan: 'An 从台湾出发，一直对商业运作抱有明确兴趣。',
          accounting: '会计训练让她用有纪律的方法理解组织如何运作。',
          numbers: '数字记录结果。', system: '决策、激励与风险，解释了背后的系统。' } },
        transformation: { chapter: 'PwC · 商业实践', title: '从判断到系统', elements: {
          pwc: '在 PwC，An 学会理解组织如何决策，以及流程会在哪里失效。',
          judgment: ['追查证据', '检验控制', '说明风险'], opportunity: '重复的工作，让她看见更大的改进空间。',
          redesigned: '她开始把繁琐的手动步骤，转化成更清晰的流程与自动化工具。' } },
        'start-over': { chapter: '一次很大的绕路', title: '有意识的重启', elements: {
          'build-systems': 'An 想从评估系统，转向亲手打造系统。', 'started-over': '这代表重新开始。',
          route: '台湾 → 纽约。', 'career-route': '会计 → 计算机科学。\n资深审计员 → 学生。' } },
        adapt: { chapter: '纽约 · 新方法', title: '经验会跟着你', elements: {
          'new-world': '新的城市、语言、领域与规则。', 'not-zero': '重新开始，不代表从零开始。',
          carried: '商业判断力，成为她学习、适应与构建系统的方法。', loop: ['观察', '学习', '适应', '构建', '重复'] } },
        mimir: { chapter: '我打造的作品', title: '让两种经验一起发挥', elements: {
          'project-lead': '领域不同，方法一致：先理解实际运作，再改进系统。',
          'mimir-copy': '一个依照真实学习者如何聆听、开口与进步而设计的语言学习平台。',
          'boc-copy': '以可靠、可追溯的数据流程，支持金融业务的夜间贷款处理。',
          'project-strengths': ['厘清模糊问题', '连接商业与技术', '说明取舍', '快速适应并交付'] } },
        'next-page': { chapter: '现在 · 持续构建', title: '下一页', elements: {
          'same-principle': '路径改变了，做事的原则没有。',
          'next-title': '理解商业。\n打造系统。\n改善结果。',
          now: '现在，An 在商业判断、数据与软件的交汇处工作。',
          links: [{ eyebrow: '联系', label: 'LinkedIn' }, { eyebrow: '作品', label: 'GitHub' }, { eyebrow: '体验', label: 'Applybook' }]
        } }
      }
    }
  };

  const supported = ['en', 'zh-Hant', 'zh-Hans'];
  const saved = localStorage.getItem('an-story-language');
  const locale = supported.includes(saved) ? saved : 'en';
  const language = locales[locale];
  const story = JSON.parse(JSON.stringify(base));
  story.id = `an-illustrated-story-six-chapters-v53-${locale}`;
  story.ui = language.ui;

  Object.entries(language.scenes || {}).forEach(([sceneId, translation]) => {
    const scene = story.scenes.find((item) => item.id === sceneId);
    if (!scene) return;
    if (translation.chapter) scene.chapter = translation.chapter;
    if (translation.title) scene.title = translation.title;
    Object.entries(translation.elements || {}).forEach(([elementId, value]) => {
      const element = scene.elements.find((item) => item.id === elementId);
      if (!element) return;
      if (Array.isArray(value)) {
        if (element.type === 'links') {
          value.forEach((item, index) => Object.assign(element.items[index], item));
        } else element.items = value;
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

  window.AN_STORY_FULL = story;
})();
