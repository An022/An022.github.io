window.AN_STORY_FULL = {
  id: 'an-illustrated-story-condensed',
  title: "An's Story",
  scenes: [
    {
      id: 'once-upon-a-time', number: '01', chapter: 'Part I · Taiwan', title: 'Curious by Nature', layout: 'portrait-right', maxBeat: 3,
      elements: [
        { id: 'bg-taiwan', type: 'asset', asset: '/public/assets/story/backgrounds/background-taiwan.webp', alt: '', visibleFrom: 0, persist: true, className: 'art-backdrop art-backdrop--taiwan' },
        { id: 'curious', type: 'illustration', asset: '/public/assets/story/characters/an-curious.webp', alt: 'An pauses with a curious idea', visibleFrom: 0, persist: true, className: 'art-character art-curious' },
        { id: 'once', type: 'text', content: 'An grew up in Taiwan, curious about how things work.', visibleFrom: 0, persist: true, className: 'copy-eyebrow' },
        { id: 'accounting', type: 'emphasis', content: 'So she studied Accounting.', visibleFrom: 1, className: 'copy-title' },
        { id: 'recorded', type: 'text', content: 'At first, she learned how businesses were recorded.', visibleFrom: 2, className: 'copy-line' },
        { id: 'underneath', type: 'emphasis', content: 'Then she became curious about what was happening underneath.', visibleFrom: 3, className: 'copy-punch' }
      ]
    },
    {
      id: 'auditor', number: '02', chapter: 'Part I · PwC', title: 'Learning to Ask Why', layout: 'portrait-right', maxBeat: 3,
      elements: [
        { id: 'bg-audit', type: 'asset', asset: '/public/assets/story/backgrounds/background-taiwan.webp', alt: '', visibleFrom: 0, persist: true, className: 'art-backdrop art-backdrop--audit' },
        { id: 'professional', type: 'illustration', asset: '/public/assets/story/characters/an-professional.webp', alt: 'An as an auditor holding a folder', visibleFrom: 0, persist: true, className: 'art-character art-professional' },
        { id: 'joined-pwc', type: 'text', content: 'Then An joined PwC.', visibleFrom: 0, persist: true, className: 'copy-eyebrow' },
        { id: 'questions', type: 'chips', items: ['How does this work?', 'What could go wrong?', 'Does this number make sense?'], visibleFrom: 1, className: 'story-chips story-chips--questions' },
        { id: 'projects', type: 'emphasis', content: '70+ projects later,', visibleFrom: 2, className: 'copy-title copy-title--small' },
        { id: 'inside', type: 'text', content: 'she had seen businesses from the inside—and learned to turn curiosity into evidence.', visibleFrom: 3, className: 'copy-punch' }
      ]
    },
    {
      id: 'transformation', number: '03', chapter: 'Part I · PwC', title: 'Something Felt Wrong', layout: 'builder', maxBeat: 4,
      elements: [
        { id: 'bg-workflow', type: 'asset', asset: '/public/assets/story/backgrounds/background-workflow.webp', alt: '', visibleFrom: 0, persist: true, className: 'art-backdrop art-backdrop--workflow' },
        { id: 'working', type: 'illustration', asset: '/public/assets/story/characters/an-working.webp', alt: 'An works beside a laptop and spreadsheet', visibleFrom: 0, persist: true, className: 'art-character art-working-condensed' },
        { id: 'sheets', type: 'text', content: 'There were spreadsheets. More spreadsheets. And even more spreadsheets.', visibleFrom: 0, className: 'copy-eyebrow' },
        { id: 'why-hand', type: 'emphasis', content: 'Why are we doing this by hand?', visibleFrom: 1, className: 'copy-title copy-title--small' },
        { id: 'process', type: 'process', items: ['Task', 'Process', 'Workflow', 'Automation'], visibleFrom: 2, revealStep: false, className: 'story-process story-process--condensed' },
        { id: 'changed', type: 'text', content: 'So An started changing things.', visibleFrom: 3, className: 'copy-line' },
        { id: 'system-itself', type: 'emphasis', content: 'What if I could build the system itself?', visibleFrom: 4, className: 'copy-punch' }
      ]
    },
    {
      id: 'problem', number: '04', chapter: 'Part II · A Very Big Detour', title: 'The Realization', layout: 'portrait-right', maxBeat: 3,
      elements: [
        { id: 'bg-system-thought', type: 'asset', asset: '/public/assets/story/backgrounds/background-systems.webp', alt: '', visibleFrom: 0, persist: true, className: 'art-backdrop art-backdrop--thought' },
        { id: 'thinking', type: 'illustration', asset: '/public/assets/story/characters/an-thinking.webp', alt: 'An thinks beside a laptop', visibleFrom: 0, persist: true, className: 'art-character art-thinking' },
        { id: 'realized', type: 'emphasis', content: 'An realized she wanted to build systems.', visibleFrom: 0, persist: true, className: 'copy-title copy-title--small' },
        { id: 'one-problem', type: 'text', content: 'There was just one problem.', visibleFrom: 1, className: 'copy-line' },
        { id: 'didnt-know', type: 'emphasis', content: "She didn't know how.", visibleFrom: 2, className: 'copy-punch' },
        { id: 'question', type: 'prop', symbol: '?', label: '', visibleFrom: 3, className: 'story-prop story-prop--question' }
      ]
    },
    {
      id: 'start-over', number: '05', chapter: 'Part II · A Very Big Detour', title: 'Start Over', layout: 'journey', maxBeat: 4,
      elements: [
        { id: 'bg-journey', type: 'asset', asset: '/public/assets/story/backgrounds/background-journey.webp', alt: 'An illustrated route from Taiwan to New York', visibleFrom: 0, persist: true, className: 'art-backdrop art-backdrop--journey' },
        { id: 'traveler', type: 'illustration', asset: '/public/assets/story/characters/an-suitcase.webp', alt: 'An travels with a suitcase', visibleFrom: 0, persist: true, className: 'art-character art-traveler-condensed' },
        { id: 'did-something', type: 'text', content: 'So An did something she would do more than once in her life.', visibleFrom: 0, className: 'copy-eyebrow copy-eyebrow--journey' },
        { id: 'started-over', type: 'emphasis', content: 'She started over.', visibleFrom: 1, className: 'copy-title copy-title--journey-main' },
        { id: 'route', type: 'text', content: 'Taiwan → New York.', visibleFrom: 2, className: 'copy-line copy-line--journey-main' },
        { id: 'career-route', type: 'text', content: 'Accounting → Computer Science. Senior Associate → Student.', visibleFrom: 3, className: 'copy-punch copy-punch--journey-main' },
        { id: 'no-map', type: 'emphasis', content: 'No roadmap. No guarantee.', visibleFrom: 4, className: 'copy-caption copy-caption--journey-main' }
      ]
    },
    {
      id: 'changing-worlds', number: '06', chapter: 'Part II · New York', title: 'A New Set of Rules', layout: 'split', maxBeat: 3,
      elements: [
        { id: 'bg-ny', type: 'asset', asset: '/public/assets/story/backgrounds/background-journey.webp', alt: '', visibleFrom: 0, persist: true, className: 'art-backdrop art-backdrop--new-york' },
        { id: 'professional-old', type: 'illustration', asset: '/public/assets/story/characters/an-professional.webp', alt: 'An as an auditor', visibleFrom: 0, persist: true, className: 'art-character art-split-left' },
        { id: 'student-new', type: 'illustration', asset: '/public/assets/story/characters/an-student.webp', alt: 'An as a computer science student', visibleFrom: 0, persist: true, className: 'art-character art-split-right' },
        { id: 'new-list', type: 'chips', items: ['New city', 'New language', 'New field', 'New rules'], visibleFrom: 1, className: 'story-chips story-chips--worlds' },
        { id: 'unknown', type: 'emphasis', content: 'A familiar world became a completely unfamiliar one.', visibleFrom: 2, className: 'copy-title copy-title--split-condensed' },
        { id: 'where-lead', type: 'text', content: 'And she had no idea where it would lead.', visibleFrom: 3, className: 'copy-punch copy-punch--split' }
      ]
    },
    {
      id: 'adapt', number: '07', chapter: 'Part II · New York', title: 'Keep Moving', layout: 'sequence', maxBeat: 3,
      elements: [
        { id: 'bg-adapt', type: 'asset', asset: '/public/assets/story/backgrounds/background-systems.webp', alt: '', visibleFrom: 0, persist: true, className: 'art-backdrop art-backdrop--adapt' },
        { id: 'moving', type: 'illustration', asset: '/public/assets/story/characters/an-next-page.webp', alt: 'An keeps moving forward', visibleFrom: 0, persist: true, className: 'art-character art-moving-condensed' },
        { id: 'learned', type: 'text', content: 'But An had learned something about herself.', visibleFrom: 0, className: 'copy-eyebrow' },
        { id: 'everything', type: 'text', content: "She doesn't need to know everything before she starts.", visibleFrom: 1, className: 'copy-line' },
        { id: 'fast-enough', type: 'emphasis', content: 'She just needs to learn fast enough to keep moving.', visibleFrom: 2, className: 'copy-title copy-title--small' },
        { id: 'loop', type: 'process', items: ['Observe', 'Learn', 'Adapt', 'Build', 'Repeat'], visibleFrom: 3, revealStep: false, className: 'story-process story-process--loop-condensed' }
      ]
    },
    {
      id: 'not-zero', number: '08', chapter: 'Part II · The Thread', title: 'Not Starting from Zero', layout: 'blocks', maxBeat: 3,
      elements: [
        { id: 'bg-reuse', type: 'asset', asset: '/public/assets/story/backgrounds/background-systems.webp', alt: '', visibleFrom: 0, persist: true, className: 'art-backdrop art-backdrop--reuse' },
        { id: 'builder', type: 'illustration', asset: '/public/assets/story/characters/an-building.webp', alt: 'An combines business and technology into one system', visibleFrom: 0, persist: true, className: 'art-character art-reuse-condensed' },
        { id: 'not-zero-title', type: 'emphasis', content: "Maybe starting over isn't really starting from zero.", visibleFrom: 0, persist: true, className: 'copy-title copy-title--wide' },
        { id: 'old-blocks', type: 'chips', items: ['Accounting', 'Audit', 'Business', 'Risk', 'Processes'], visibleFrom: 1, className: 'story-chips story-chips--blocks-old' },
        { id: 'new-blocks', type: 'chips', items: ['Code', 'Data', 'Software', 'AI'], visibleFrom: 2, className: 'story-chips story-chips--blocks-new' },
        { id: 'different', type: 'text', content: 'You bring everything you learned before. You just learn how to use it differently.', visibleFrom: 3, className: 'copy-punch copy-punch--reuse' }
      ]
    },
    {
      id: 'mimir', number: '09', chapter: 'Part III · What I Build', title: 'Then She Built', layout: 'project', maxBeat: 4,
      elements: [
        { id: 'bg-projects', type: 'asset', asset: '/public/assets/story/backgrounds/background-workflow.webp', alt: '', visibleFrom: 0, persist: true, className: 'art-backdrop art-backdrop--projects' },
        { id: 'project-character', type: 'illustration', asset: '/public/assets/story/characters/an-working.webp', alt: 'An builds products and data systems', visibleFrom: 0, persist: true, className: 'art-character art-project-condensed' },
        { id: 'project-lead', type: 'text', content: 'Business judgment became part of how she builds.', visibleFrom: 0, persist: true, className: 'copy-eyebrow' },
        { id: 'mimir-title', type: 'emphasis', content: 'The Mimir', visibleFrom: 1, className: 'copy-title copy-title--project' },
        { id: 'mimir-copy', type: 'text', content: 'A language-learning platform built from scratch and shaped around how real learners listen, speak, and try again.', visibleFrom: 1, className: 'copy-line copy-line--project' },
        { id: 'boc-title', type: 'emphasis', content: 'BOC', visibleFrom: 2, className: 'copy-title copy-title--project-secondary' },
        { id: 'boc-copy', type: 'text', content: 'Nightly loan processing rebuilt in Python, FastAPI, Airflow, and Pandas—reliable while everyone else slept.', visibleFrom: 2, className: 'copy-line copy-line--project-secondary' },
        { id: 'project-stats', type: 'stats', items: [['4,500+', 'learners'], ['70%', 'less review'], ['30K+', 'records daily'], ['60%', 'faster resolution']], visibleFrom: 3, className: 'story-stats story-stats--combined' },
        { id: 'still-building', type: 'emphasis', content: 'Different systems. The same question: can this work better?', visibleFrom: 4, className: 'copy-punch copy-punch--projects' }
      ]
    },
    {
      id: 'next-page', number: '10', chapter: 'Epilogue · Still Building', title: 'The Next Page', layout: 'contact', maxBeat: 3,
      elements: [
        { id: 'bg-next', type: 'asset', asset: '/public/assets/story/backgrounds/background-systems.webp', alt: '', visibleFrom: 0, persist: true, className: 'art-backdrop art-backdrop--next' },
        { id: 'next-character', type: 'illustration', asset: '/public/assets/story/characters/an-next-page.webp', alt: 'An walks toward the next blank page', visibleFrom: 0, persist: true, className: 'art-character art-next' },
        { id: 'same-question', type: 'text', content: 'The setting changed. The question stayed.', visibleFrom: 0, className: 'copy-eyebrow' },
        { id: 'next-title', type: 'emphasis', content: 'Can I make this work better?', visibleFrom: 1, persist: true, className: 'copy-title' },
        { id: 'now', type: 'text', content: 'Today I work where business judgment and engineering meet—tracing evidence, asking one more why, and building systems people can trust.', visibleFrom: 2, className: 'copy-line' },
        { id: 'links', type: 'links', visibleFrom: 3, className: 'story-links', items: [
          { eyebrow: 'CONNECT', label: 'LinkedIn', href: 'https://www.linkedin.com/in/an222/' },
          { eyebrow: 'EXPLORE', label: 'GitHub', href: 'https://github.com/An022' },
          { eyebrow: 'TRY', label: 'Applybook', href: 'https://applybook.applybook-app.workers.dev/' }
        ] }
      ]
    }
  ]
};
