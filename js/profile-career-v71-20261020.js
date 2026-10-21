(() => {
  const root = document.querySelector('[data-story-deck]');
  if (!root) return;

  const locale = document.body.dataset.storyLanguage || 'en';
  const copy = ({
    en: {
      overview: {
        eyebrow: 'Audit · Product · Financial technology',
        title: ['Business fluency', 'Technical range', 'Practical delivery'],
        lead: 'I bring the judgment of an auditor, the adaptability of a startup builder, and the discipline to make financial workflows reliable.',
        note: 'The tools changed. The way I work became stronger.',
        capabilityLabel: 'Capabilities carried across every role',
        capabilities: [
          ['Business & risk', 'Context, controls, evidence, financial processes'],
          ['Software & data', 'Python, SQL, JavaScript, APIs, automation'],
          ['Product thinking', 'User needs, workflow design, practical iteration'],
          ['Ways of working', 'Structured thinking, ownership, clarity, adaptability']
        ],
        credential: 'CISA examination passed',
        credentialNote: 'Certification application in progress',
        scroll: 'Explore the three chapters'
      },
      chapters: [
        {
          id: 'pwc', number: '01', company: 'PwC Taiwan', period: 'AUDIT · SENIOR ASSOCIATE',
          icon: 'audit', overline: 'Learning the business from the inside',
          title: ['Understand', 'before improving'],
          statement: 'Audit trained me to look beyond the number—to trace the evidence, understand the process, and explain why the risk matters.',
          hardLabel: 'Professional toolkit',
          hard: ['Financial audit', 'Risk & controls', 'Process analysis', 'Data validation'],
          softLabel: 'How I worked',
          soft: ['Professional judgment', 'Attention to detail', 'Stakeholder communication', 'Calm under pressure'],
          takeaway: 'A reliable answer starts with the right question.'
        },
        {
          id: 'mimir', number: '02', company: 'The Mimir', period: 'CODING STARTUP · PRODUCT ENGINEERING',
          icon: 'code', overline: 'Building when the map is still changing',
          title: ['Learn fast', 'Build clearly'],
          statement: 'At a coding startup, I turned new technical concepts into a working product—shaping features around how people actually learn and use them.',
          hardLabel: 'Technical toolkit',
          hard: ['Full-stack development', 'AI integration', 'APIs & cloud', 'Product iteration'],
          softLabel: 'How I worked',
          soft: ['Learning agility', 'End-to-end ownership', 'Resourcefulness', 'Cross-functional collaboration'],
          takeaway: 'Progress comes from learning, testing, and refining.'
        },
        {
          id: 'madison', number: '03', company: 'Madison Davis', period: 'FINANCIAL TECHNOLOGY · CURRENT',
          icon: 'workflow', overline: 'Bringing both sides together',
          title: ['Connect context', 'Build reliability'],
          statement: 'Now I combine financial context with software engineering to automate loan and risk workflows and make complex operations easier to run and understand.',
          hardLabel: 'Technical toolkit',
          hard: ['Workflow automation', 'Financial data', 'System integration', 'Process design'],
          softLabel: 'How I work',
          soft: ['Business–technical translation', 'Systems thinking', 'Prioritization', 'Trust & accountability'],
          takeaway: 'The strongest systems understand both the work and the people doing it.'
        }
      ],
      connect: 'Continue the conversation'
    },
    'zh-Hant': {
      overview: {
        eyebrow: '審計 · 產品 · 金融科技',
        title: ['理解商業', '掌握技術', '務實交付'],
        lead: '我結合審計工作的判斷力、初創環境的適應力，以及讓金融流程可靠運作的執行力。',
        note: '工具持續改變，而我的工作方法也更加完整。',
        capabilityLabel: '貫穿每段經歷的能力',
        capabilities: [
          ['商業與風險', '情境、控制、證據、金融流程'],
          ['軟體與資料', 'Python、SQL、JavaScript、API、自動化'],
          ['產品思維', '使用者需求、流程設計、務實迭代'],
          ['工作方法', '結構化思考、主動負責、清楚溝通、適應力']
        ],
        credential: '已通過 CISA 考試',
        credentialNote: '認證申請進行中',
        scroll: '往下閱讀三段經歷'
      },
      chapters: [
        {
          id: 'pwc', number: '01', company: 'PwC Taiwan', period: '審計 · 資深審計員', icon: 'audit',
          overline: '從內部理解商業如何運作', title: ['先理解', '再改善'],
          statement: '審計訓練我不只看數字，也追查證據、理解流程，並清楚說明風險為何重要。',
          hardLabel: '專業能力', hard: ['財務審計', '風險與控制', '流程分析', '資料驗證'],
          softLabel: '工作方式', soft: ['專業判斷', '注重細節', '利害關係人溝通', '壓力下保持穩定'],
          takeaway: '可靠的答案，始於正確的問題。'
        },
        {
          id: 'mimir', number: '02', company: 'The Mimir', period: '軟體新創 · 產品工程', icon: 'code',
          overline: '在方向持續變化時動手打造', title: ['快速學習', '清楚建構'],
          statement: '在軟體新創，我把新的技術概念做成真正可用的產品，並依照使用者實際學習與操作的方式調整功能。',
          hardLabel: '技術能力', hard: ['全端開發', 'AI 整合', 'API 與雲端', '產品迭代'],
          softLabel: '工作方式', soft: ['快速學習', '端到端負責', '靈活解題', '跨職能協作'],
          takeaway: '學習、測試、修正，讓想法持續前進。'
        },
        {
          id: 'madison', number: '03', company: 'Madison Davis', period: '金融科技 · 現職', icon: 'workflow',
          overline: '讓兩種背景真正結合', title: ['連結情境', '建立可靠性'],
          statement: '現在，我結合金融情境與軟體工程，自動化貸款與風險相關流程，讓複雜作業更容易執行與理解。',
          hardLabel: '技術能力', hard: ['流程自動化', '金融資料', '系統整合', '流程設計'],
          softLabel: '工作方式', soft: ['商業與技術轉譯', '系統思考', '優先順序判斷', '信任與責任感'],
          takeaway: '最好的系統，同時理解工作，也理解使用它的人。'
        }
      ],
      connect: '繼續交流'
    },
    'zh-Hans': {
      overview: {
        eyebrow: '审计 · 产品 · 金融科技',
        title: ['理解商业', '掌握技术', '务实交付'],
        lead: '我结合审计工作的判断力、初创环境的适应力，以及让金融流程可靠运行的执行力。',
        note: '工具持续改变，而我的工作方法也更加完整。',
        capabilityLabel: '贯穿每段经历的能力',
        capabilities: [
          ['商业与风险', '情境、控制、证据、金融流程'],
          ['软件与数据', 'Python、SQL、JavaScript、API、自动化'],
          ['产品思维', '用户需求、流程设计、务实迭代'],
          ['工作方法', '结构化思考、主动负责、清晰沟通、适应力']
        ],
        credential: '已通过 CISA 考试', credentialNote: '认证申请进行中', scroll: '向下阅读三段经历'
      },
      chapters: [
        {
          id: 'pwc', number: '01', company: 'PwC Taiwan', period: '审计 · 资深审计员', icon: 'audit',
          overline: '从内部理解商业如何运行', title: ['先理解', '再改善'],
          statement: '审计训练我不只看数字，也追查证据、理解流程，并清晰说明风险为何重要。',
          hardLabel: '专业能力', hard: ['财务审计', '风险与控制', '流程分析', '数据验证'],
          softLabel: '工作方式', soft: ['专业判断', '注重细节', '利益相关方沟通', '压力下保持稳定'],
          takeaway: '可靠的答案，始于正确的问题。'
        },
        {
          id: 'mimir', number: '02', company: 'The Mimir', period: '软件初创 · 产品工程', icon: 'code',
          overline: '在方向持续变化时动手构建', title: ['快速学习', '清晰构建'],
          statement: '在软件初创，我把新的技术概念做成真正可用的产品，并依据用户实际学习与操作的方式调整功能。',
          hardLabel: '技术能力', hard: ['全栈开发', 'AI 集成', 'API 与云端', '产品迭代'],
          softLabel: '工作方式', soft: ['快速学习', '端到端负责', '灵活解题', '跨职能协作'],
          takeaway: '学习、测试、修正，让想法持续前进。'
        },
        {
          id: 'madison', number: '03', company: 'Madison Davis', period: '金融科技 · 现职', icon: 'workflow',
          overline: '让两种背景真正结合', title: ['连接情境', '建立可靠性'],
          statement: '现在，我结合金融情境与软件工程，自动化贷款与风险相关流程，让复杂操作更容易执行与理解。',
          hardLabel: '技术能力', hard: ['流程自动化', '金融数据', '系统集成', '流程设计'],
          softLabel: '工作方式', soft: ['商业与技术转译', '系统思考', '优先级判断', '信任与责任感'],
          takeaway: '最好的系统，同时理解工作，也理解使用它的人。'
        }
      ],
      connect: '继续交流'
    },
    ja: {
      overview: {
        eyebrow: '監査 · プロダクト · 金融テクノロジー',
        title: ['ビジネスを理解', '技術を活用', '着実に実現'],
        lead: '監査で培った判断力、スタートアップで磨いた適応力、金融業務を安定した仕組みに変える実行力を組み合わせています。',
        note: '使うツールが変わるたびに、仕事の進め方も強くなりました。',
        capabilityLabel: 'すべての経験に共通する力',
        capabilities: [
          ['ビジネスとリスク', '背景、統制、証拠、金融プロセス'],
          ['ソフトウェアとデータ', 'Python、SQL、JavaScript、API、自動化'],
          ['プロダクト思考', '利用者のニーズ、業務設計、実践的な改善'],
          ['仕事の進め方', '構造的思考、主体性、明確な対話、適応力']
        ],
        credential: 'CISA 試験合格',
        credentialNote: '認定申請を準備中',
        scroll: '三つの経験を見る'
      },
      chapters: [
        {
          id: 'pwc', number: '01', company: 'PwC Taiwan', period: '監査 · シニアアソシエイト', icon: 'audit',
          overline: 'ビジネスを内側から理解する', title: ['理解してから', '改善する'],
          statement: '監査を通して、数字の先にある証拠と業務プロセスをたどり、リスクの意味を明確に伝える力を身につけました。',
          hardLabel: '専門スキル', hard: ['財務監査', 'リスクと統制', '業務分析', 'データ検証'],
          softLabel: '仕事の進め方', soft: ['専門的な判断', '細部への配慮', '関係者との対話', 'プレッシャー下の冷静さ'],
          takeaway: '信頼できる答えは、適切な問いから始まります。'
        },
        {
          id: 'mimir', number: '02', company: 'The Mimir', period: 'ソフトウェアスタートアップ · プロダクト開発', icon: 'code',
          overline: '変化の中で学び、形にする', title: ['素早く学び', '明確に作る'],
          statement: 'ソフトウェアスタートアップでは、新しい技術を実際に使えるプロダクトへ落とし込み、利用者の学び方に合わせて機能を磨きました。',
          hardLabel: '技術スキル', hard: ['フルスタック開発', 'AI 統合', 'API とクラウド', 'プロダクト改善'],
          softLabel: '仕事の進め方', soft: ['学習の速さ', '一貫したオーナーシップ', '柔軟な問題解決', '部門横断の協働'],
          takeaway: '学び、試し、整えることで、アイデアを前へ進めます。'
        },
        {
          id: 'madison', number: '03', company: 'Madison Davis', period: '金融テクノロジー · 現在', icon: 'workflow',
          overline: '二つの専門性をひとつにする', title: ['背景をつなぎ', '信頼性を築く'],
          statement: '現在は金融の知識とソフトウェア開発を組み合わせ、融資とリスクに関わるワークフローを自動化し、複雑な業務をわかりやすく整えています。',
          hardLabel: '技術スキル', hard: ['ワークフロー自動化', '金融データ', 'システム統合', '業務設計'],
          softLabel: '仕事の進め方', soft: ['ビジネスと技術の橋渡し', 'システム思考', '優先順位の判断', '信頼と責任感'],
          takeaway: '強いシステムは、業務と、それを使う人の両方を理解しています。'
        }
      ],
      connect: 'つながる'
    },
    es: {
      overview: {
        eyebrow: 'Auditoría · Producto · Tecnología financiera',
        title: ['Visión de negocio', 'Alcance técnico', 'Ejecución práctica'],
        lead: 'Combino el criterio de auditoría, la adaptabilidad de una startup y la disciplina necesaria para crear flujos financieros confiables.',
        note: 'Las herramientas cambiaron. Mi forma de trabajar se hizo más sólida.',
        capabilityLabel: 'Capacidades presentes en cada etapa',
        capabilities: [
          ['Negocio y riesgo', 'Contexto, controles, evidencia y procesos financieros'],
          ['Software y datos', 'Python, SQL, JavaScript, APIs y automatización'],
          ['Pensamiento de producto', 'Necesidades del usuario, diseño de flujos e iteración'],
          ['Forma de trabajar', 'Pensamiento estructurado, autonomía, claridad y adaptación']
        ],
        credential: 'Examen CISA aprobado',
        credentialNote: 'Solicitud de certificación en proceso',
        scroll: 'Explorar las tres etapas'
      },
      chapters: [
        {
          id: 'pwc', number: '01', company: 'PwC Taiwan', period: 'AUDITORÍA · SENIOR ASSOCIATE', icon: 'audit',
          overline: 'Entender el negocio desde dentro', title: ['Comprender', 'antes de mejorar'],
          statement: 'La auditoría me enseñó a mirar más allá de las cifras: seguir la evidencia, entender el proceso y explicar por qué importa el riesgo.',
          hardLabel: 'Herramientas profesionales', hard: ['Auditoría financiera', 'Riesgos y controles', 'Análisis de procesos', 'Validación de datos'],
          softLabel: 'Cómo trabajé', soft: ['Criterio profesional', 'Atención al detalle', 'Comunicación con equipos', 'Calma bajo presión'],
          takeaway: 'Una respuesta confiable comienza con la pregunta correcta.'
        },
        {
          id: 'mimir', number: '02', company: 'The Mimir', period: 'STARTUP DE SOFTWARE · PRODUCT ENGINEERING', icon: 'code',
          overline: 'Construir mientras cambia el camino', title: ['Aprender rápido', 'Construir con claridad'],
          statement: 'En una startup convertí conceptos técnicos nuevos en un producto funcional, ajustando cada función a la forma real en que las personas aprenden y la utilizan.',
          hardLabel: 'Herramientas técnicas', hard: ['Desarrollo full-stack', 'Integración de IA', 'APIs y nube', 'Iteración de producto'],
          softLabel: 'Cómo trabajé', soft: ['Agilidad para aprender', 'Responsabilidad integral', 'Ingenio práctico', 'Colaboración interdisciplinaria'],
          takeaway: 'Aprender, probar y ajustar convierte una idea en progreso.'
        },
        {
          id: 'madison', number: '03', company: 'Madison Davis', period: 'TECNOLOGÍA FINANCIERA · ACTUALIDAD', icon: 'workflow',
          overline: 'Unir las dos perspectivas', title: ['Conectar contexto', 'Crear confiabilidad'],
          statement: 'Hoy combino el contexto financiero con la ingeniería de software para automatizar flujos de préstamos y riesgo y facilitar operaciones complejas.',
          hardLabel: 'Herramientas técnicas', hard: ['Automatización de flujos', 'Datos financieros', 'Integración de sistemas', 'Diseño de procesos'],
          softLabel: 'Cómo trabajo', soft: ['Traducción entre negocio y tecnología', 'Pensamiento sistémico', 'Priorización', 'Confianza y responsabilidad'],
          takeaway: 'Los mejores sistemas entienden el trabajo y también a las personas que lo realizan.'
        }
      ],
      connect: 'Conectar'
    }
  })[locale] || null;

  if (!copy) return;

  const create = (tag, className, text) => {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = text;
    return node;
  };

  const iconPaths = {
    audit: 'M4 10v7h3v-7H4Zm6 0v7h4v-7h-4Zm7 0v7h3v-7h-3ZM2 22h20v-3H2v3ZM12 2 2 7v2h20V7L12 2Z',
    code: 'm8.7 16.6-1.4 1.4L1.3 12l6-6 1.4 1.4L4.1 12l4.6 4.6Zm6.6 0 4.6-4.6-4.6-4.6L16.7 6l6 6-6 6-1.4-1.4Z',
    workflow: 'M6 3a3 3 0 1 0 0 6 3 3 0 0 0 0-6Zm12 12a3 3 0 1 0 0 6 3 3 0 0 0 0-6ZM6 15a3 3 0 1 0 0 6 3 3 0 0 0 0-6Zm2-9h7a3 3 0 0 1 3 3v3h-2V9a1 1 0 0 0-1-1H8V6Zm0 11h5v2H8v-2Z',
    linkedin: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286ZM5.337 7.433a2.064 2.064 0 1 1 0-4.128 2.064 2.064 0 0 1 0 4.128Zm1.782 13.019H3.555V9H7.12v11.452ZM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0Z',
    github: 'M12 .297a12 12 0 0 0-3.79 23.388c.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.84 1.237 1.84 1.237 1.07 1.835 2.809 1.305 3.495.998.108-.776.418-1.305.762-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57A12.005 12.005 0 0 0 24 12.297C24 5.67 18.627.297 12 .297Z',
    // Font Awesome Free 5.15.4 fa-link, https://fontawesome.com/license/free
    link: 'M326.612 185.391c59.747 59.809 58.927 155.698.36 214.59-.11.12-.24.25-.36.37l-67.2 67.2c-59.27 59.27-155.699 59.262-214.96 0-59.27-59.26-59.27-155.7 0-214.96l37.106-37.106c9.84-9.84 26.786-3.3 27.294 10.606.648 17.722 3.826 35.527 9.69 52.721 1.986 5.822.567 12.262-3.783 16.612l-13.087 13.087c-28.026 28.026-28.905 73.66-1.155 101.96 28.024 28.579 74.086 28.749 102.325.51l67.2-67.19c28.191-28.191 28.073-73.757 0-101.83-3.701-3.694-7.429-6.564-10.341-8.569a16.037 16.037 0 0 1-6.947-12.606c-.396-10.567 3.348-21.456 11.698-29.806l21.054-21.055c5.521-5.521 14.182-6.199 20.584-1.731a152.482 152.482 0 0 1 20.522 17.197zM467.547 44.449c-59.261-59.262-155.69-59.27-214.96 0l-67.2 67.2c-.12.12-.25.25-.36.37-58.566 58.892-59.387 154.781.36 214.59a152.454 152.454 0 0 0 20.521 17.196c6.402 4.468 15.064 3.789 20.584-1.731l21.054-21.055c8.35-8.35 12.094-19.239 11.698-29.806a16.037 16.037 0 0 0-6.947-12.606c-2.912-2.005-6.64-4.875-10.341-8.569-28.073-28.073-28.191-73.639 0-101.83l67.2-67.19c28.239-28.239 74.3-28.069 102.325.51 27.75 28.3 26.872 73.934-1.155 101.96l-13.087 13.087c-4.35 4.35-5.769 10.79-3.783 16.612 5.864 17.194 9.042 34.999 9.69 52.721.509 13.906 17.454 20.446 27.294 10.606l37.106-37.106c59.271-59.259 59.271-155.699.001-214.959z',
    external: 'M14 3h7v7h-2V6.4l-9.3 9.3-1.4-1.4L17.6 5H14V3Zm5 16H5V5h6V3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-6h-2v6Z',
    down: 'm12 17.2 6.6-6.6 1.4 1.4-8 8-8-8 1.4-1.4 6.6 6.6V4h2v13.2Z'
  };

  const icon = (name, className = '') => {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('viewBox', name === 'link' ? '0 0 512 512' : '0 0 24 24');
    svg.setAttribute('aria-hidden', 'true');
    if (className) svg.setAttribute('class', className);
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('d', iconPaths[name]);
    svg.append(path);
    return svg;
  };

  document.querySelectorAll('.story-external-links a').forEach((link) => {
    if (link.querySelector('svg')) return;
    const label = link.textContent.trim().toLowerCase();
    if (label.startsWith('linkedin')) link.prepend(icon('linkedin', 'brand-icon'));
    else if (label.startsWith('github')) link.prepend(icon('github', 'brand-icon'));
    else link.prepend(icon('link', 'brand-icon'));
  });

  const languagePicker = document.querySelector('[data-language-picker]');
  const languageTrigger = document.querySelector('[data-language-trigger]');
  const languageMenu = document.querySelector('[data-language-menu]');
  const closeLanguageMenu = () => {
    if (!languageMenu || !languageTrigger) return;
    languageMenu.hidden = true;
    languageTrigger.setAttribute('aria-expanded', 'false');
    languagePicker?.classList.remove('is-open');
  };
  if (languagePicker && languageTrigger && languageMenu) {
    languageTrigger.addEventListener('click', () => {
      const willOpen = languageMenu.hidden;
      languageMenu.hidden = !willOpen;
      languageTrigger.setAttribute('aria-expanded', String(willOpen));
      languagePicker.classList.toggle('is-open', willOpen);
      if (willOpen) languageMenu.querySelector('.is-active')?.focus();
    });
    document.addEventListener('click', (event) => {
      if (!languagePicker.contains(event.target)) closeLanguageMenu();
    });
    document.addEventListener('keydown', (event) => {
      if (event.key !== 'Escape' || languageMenu.hidden) return;
      closeLanguageMenu();
      languageTrigger.focus();
    });
  }

  const shell = create('div', 'career-profile');
  shell.id = 'profile-top';

  const overview = create('section', 'career-overview reveal-section');
  overview.id = 'career-overview';
  overview.setAttribute('aria-labelledby', 'career-overview-title');
  const overviewCopy = create('div', 'career-overview__copy');
  overviewCopy.append(create('p', 'career-kicker', copy.overview.eyebrow));
  const overviewTitle = create('h1', 'career-overview__title');
  overviewTitle.id = 'career-overview-title';
  copy.overview.title.forEach((line, index) => overviewTitle.append(create('span', index === 1 ? 'is-accent' : '', line)));
  overviewCopy.append(overviewTitle, create('p', 'career-overview__lead', copy.overview.lead), create('p', 'career-overview__note', copy.overview.note));

  const capabilityPanel = create('div', 'career-capabilities');
  capabilityPanel.append(create('p', 'career-capabilities__label', copy.overview.capabilityLabel));
  const capabilityList = create('ol', 'career-capabilities__list');
  copy.overview.capabilities.forEach(([title, detail], index) => {
    const item = create('li');
    item.append(create('span', 'career-capabilities__number', String(index + 1).padStart(2, '0')));
    const itemCopy = create('div');
    itemCopy.append(create('strong', '', title), create('p', '', detail));
    item.append(itemCopy);
    capabilityList.append(item);
  });
  capabilityPanel.append(capabilityList);
  const credential = create('div', 'career-credential');
  credential.append(create('span', '', 'CISA'), create('strong', '', copy.overview.credential), create('small', '', copy.overview.credentialNote));
  capabilityPanel.append(credential);
  const scrollCue = create('a', 'career-scroll-cue');
  scrollCue.href = '#career-pwc';
  scrollCue.append(create('span', '', copy.overview.scroll), icon('down', 'material-icon'));
  overview.append(overviewCopy, capabilityPanel, scrollCue);
  shell.append(overview);

  const progress = create('nav', 'career-progress');
  progress.setAttribute('aria-label', copy.overview.scroll);
  copy.chapters.forEach((chapter) => {
    const link = create('a');
    link.href = `#career-${chapter.id}`;
    link.dataset.chapterLink = chapter.id;
    link.setAttribute('aria-label', chapter.company);
    link.append(icon(chapter.icon, 'material-icon'), create('span', '', chapter.number));
    progress.append(link);
  });
  shell.append(progress);

  const addSkillGroup = (parent, label, values, type) => {
    const group = create('div', `career-skill-group career-skill-group--${type}`);
    group.append(create('p', 'career-skill-group__label', label));
    const list = create('ul');
    values.forEach((value, index) => {
      const item = create('li');
      item.append(create('span', '', String(index + 1).padStart(2, '0')), create('strong', '', value));
      list.append(item);
    });
    group.append(list);
    parent.append(group);
  };

  copy.chapters.forEach((chapter, chapterIndex) => {
    const section = create('section', `career-chapter career-chapter--${chapter.id} reveal-section`);
    section.id = `career-${chapter.id}`;
    section.dataset.careerChapter = chapter.id;
    section.dataset.chapterNumber = chapter.number;
    section.style.setProperty('--chapter-index', chapterIndex);
    section.setAttribute('aria-labelledby', `career-title-${chapter.id}`);

    const meta = create('header', 'career-chapter__meta');
    const company = create('div', 'career-chapter__company');
    company.append(icon(chapter.icon, 'career-chapter__icon'), create('strong', '', chapter.company));
    meta.append(company, create('p', '', chapter.period), create('span', 'career-chapter__count', `${chapter.number} / 03`));

    const main = create('div', 'career-chapter__main');
    const narrative = create('div', 'career-chapter__narrative');
    narrative.append(create('p', 'career-kicker', chapter.overline));
    const title = create('h2', 'career-chapter__title');
    title.id = `career-title-${chapter.id}`;
    chapter.title.forEach((line, index) => title.append(create('span', index === 1 ? 'is-accent' : '', line)));
    narrative.append(title, create('p', 'career-chapter__statement', chapter.statement));

    const skills = create('div', 'career-chapter__skills');
    addSkillGroup(skills, chapter.hardLabel, chapter.hard, 'hard');
    addSkillGroup(skills, chapter.softLabel, chapter.soft, 'soft');
    main.append(narrative, skills);

    const footer = create('footer', 'career-chapter__footer');
    footer.append(create('span', '', '—'), create('p', '', chapter.takeaway));
    section.append(meta, main, footer);
    shell.append(section);
  });

  root.replaceChildren(shell);
  root.removeAttribute('tabindex');
  root.setAttribute('aria-label', 'An Lee career profile');
  document.querySelector('.story-logo')?.setAttribute('href', '#profile-top');
  document.querySelector('.story-logo')?.removeAttribute('data-story-jump');

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const sections = [...shell.querySelectorAll('.reveal-section')];
  if (reducedMotion) sections.forEach((section) => section.classList.add('is-visible'));
  else {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        const chapterId = entry.target.dataset.careerChapter;
        if (chapterId) {
          progress.querySelectorAll('a').forEach((link) => link.classList.toggle('is-active', link.dataset.chapterLink === chapterId));
        }
      });
    }, { threshold: .34, rootMargin: '-8% 0px -18% 0px' });
    sections.forEach((section) => observer.observe(section));
  }
  window.requestAnimationFrame(() => overview.classList.add('is-visible'));
})();
