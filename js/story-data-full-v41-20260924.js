window.AN_STORY_FULL = {
  id: 'an-illustrated-story',
  title: "An's Story",
  scenes: [
    {
      id: 'once-upon-a-time', number: '01', chapter: 'Part I · Taiwan', title: 'Once Upon a Time', layout: 'portrait-right', maxBeat: 3,
      elements: [
        { id: 'curious', type: 'illustration', asset: '/public/assets/story/characters/an-curious.webp', alt: 'An pauses with a curious idea', visibleFrom: 0, className: 'art-character art-curious' },
        { id: 'once', type: 'text', content: 'Once upon a time, there was a girl named An.', visibleFrom: 0, persist: true, className: 'copy-eyebrow' },
        { id: 'curious-copy', type: 'emphasis', content: 'She was curious about how things work.', visibleFrom: 1, className: 'copy-title' },
        { id: 'not-computers', type: 'text', content: 'Not just computers.', visibleFrom: 2, className: 'copy-line' },
        { id: 'everything', type: 'emphasis', content: 'Everything.', visibleFrom: 3, className: 'copy-punch' }
      ]
    },
    {
      id: 'business', number: '02', chapter: 'Part I · Taiwan', title: 'Business', layout: 'portrait-left', maxBeat: 4,
      elements: [
        { id: 'student-business', type: 'illustration', asset: '/public/assets/story/characters/an-student.webp', alt: 'An studies with a notebook', visibleFrom: 0, className: 'art-character art-student' },
        { id: 'business-start', type: 'text', content: 'So An studied Accounting.', visibleFrom: 0, persist: true, className: 'copy-eyebrow' },
        { id: 'business-list', type: 'chips', items: ['Numbers', 'Businesses', 'Rules', 'Money'], visibleFrom: 1, className: 'story-chips story-chips--business' },
        { id: 'recorded', type: 'text', content: 'At first, she learned how businesses were recorded.', visibleFrom: 2, className: 'copy-line' },
        { id: 'underneath', type: 'emphasis', content: 'Then she became curious about what was happening underneath.', visibleFrom: 3, className: 'copy-title copy-title--small' },
        { id: 'ledger', type: 'prop', symbol: '▦', label: 'THE LEDGER', visibleFrom: 4, className: 'story-prop story-prop--ledger' }
      ]
    },
    {
      id: 'auditor', number: '03', chapter: 'Part I · Taiwan', title: 'The Auditor', layout: 'portrait-right', maxBeat: 5,
      elements: [
        { id: 'professional', type: 'illustration', asset: '/public/assets/story/characters/an-professional.webp', alt: 'An as an auditor holding a folder', visibleFrom: 0, className: 'art-character art-professional' },
        { id: 'joined-pwc', type: 'text', content: 'Then An joined PwC.', visibleFrom: 0, persist: true, className: 'copy-eyebrow' },
        { id: 'job', type: 'text', content: 'Her job was basically… asking questions.', visibleFrom: 1, className: 'copy-line' },
        { id: 'questions', type: 'chips', items: ['How does this work?', 'What could go wrong?', 'Does this number make sense?'], visibleFrom: 2, className: 'story-chips story-chips--questions' },
        { id: 'projects', type: 'emphasis', content: '70+ projects later,', visibleFrom: 3, className: 'copy-title copy-title--small' },
        { id: 'inside', type: 'text', content: 'An had seen a lot of businesses from the inside.', visibleFrom: 4, className: 'copy-line' },
        { id: 'noticed', type: 'emphasis', content: 'And she noticed something.', visibleFrom: 5, className: 'copy-punch' }
      ]
    },
    {
      id: 'spreadsheets', number: '04', chapter: 'Part I · Taiwan', title: 'Something Felt Wrong', layout: 'chaos', maxBeat: 4,
      elements: [
        { id: 'working', type: 'illustration', asset: '/public/assets/story/characters/an-working.webp', alt: 'An works at a laptop beside a spreadsheet', visibleFrom: 0, className: 'art-character art-working' },
        { id: 'sheets', type: 'chips', items: ['spreadsheet.xlsx', 'FINAL_v2.xlsx', 'FINAL_v2_REAL.xlsx', 'copy_of_final.xlsx'], visibleFrom: 1, className: 'story-chips story-chips--files' },
        { id: 'people', type: 'text', content: 'People copied. Checked. Repeated. Copied again.', visibleFrom: 2, className: 'copy-line' },
        { id: 'why-hand', type: 'emphasis', content: 'Why are we doing this by hand?', visibleFrom: 3, className: 'copy-title' },
        { id: 'thinking', type: 'text', content: 'An kept thinking.', visibleFrom: 4, persist: true, className: 'copy-caption' }
      ]
    },
    {
      id: 'transformation', number: '05', chapter: 'Part I · Taiwan', title: 'Transformation', layout: 'builder', maxBeat: 5,
      elements: [
        { id: 'building', type: 'illustration', asset: '/public/assets/story/characters/an-building.webp', alt: 'An connects pieces into a system', visibleFrom: 0, className: 'art-character art-building' },
        { id: 'changing', type: 'text', content: 'So An started changing things.', visibleFrom: 0, persist: true, className: 'copy-eyebrow' },
        { id: 'task', type: 'process', items: ['Repetitive task', 'Process', 'Workflow', 'Automation'], visibleFrom: 1, revealStep: true, className: 'story-process' },
        { id: 'bigger', type: 'text', content: 'And then came a bigger thought.', visibleFrom: 4, className: 'copy-line' },
        { id: 'build-system', type: 'emphasis', content: 'What if I could build the system itself?', visibleFrom: 5, className: 'copy-title' }
      ]
    },
    {
      id: 'realization', number: '06', chapter: 'Part II · A Very Big Detour', title: 'The Realization', layout: 'center', maxBeat: 1,
      elements: [
        { id: 'realize-character', type: 'illustration', asset: '/public/assets/story/characters/an-curious.webp', alt: 'An has an idea', visibleFrom: 0, className: 'art-character art-realization' },
        { id: 'at-some-point', type: 'text', content: 'At some point,', visibleFrom: 0, className: 'copy-eyebrow' },
        { id: 'wanted-build', type: 'emphasis', content: 'An realized she wanted to build systems.', visibleFrom: 1, className: 'copy-title copy-title--center' }
      ]
    },
    {
      id: 'problem', number: '07', chapter: 'Part II · A Very Big Detour', title: 'The Problem', layout: 'portrait-right', maxBeat: 2,
      elements: [
        { id: 'problem-character', type: 'illustration', asset: '/public/assets/story/characters/an-thinking.webp', alt: 'An thinks beside a laptop', visibleFrom: 0, className: 'art-character art-thinking' },
        { id: 'one-problem', type: 'text', content: 'There was just one problem.', visibleFrom: 0, className: 'copy-line' },
        { id: 'didnt-know', type: 'emphasis', content: "She didn't know how.", visibleFrom: 1, className: 'copy-title' },
        { id: 'question', type: 'prop', symbol: '?', label: '', visibleFrom: 2, className: 'story-prop story-prop--question' }
      ]
    },
    {
      id: 'start-over', number: '08', chapter: 'Part II · A Very Big Detour', title: 'Start Over', layout: 'center', maxBeat: 3,
      elements: [
        { id: 'start-character', type: 'illustration', asset: '/public/assets/story/characters/an-idle.webp', alt: 'An stands at the beginning of a new path', visibleFrom: 0, className: 'art-character art-idle' },
        { id: 'did-something', type: 'text', content: 'So An did something she would do more than once in her life.', visibleFrom: 1, className: 'copy-line copy-line--center' },
        { id: 'started-over', type: 'emphasis', content: 'She started over.', visibleFrom: 2, className: 'copy-title copy-title--center copy-title--giant' },
        { id: 'suitcase-prop', type: 'asset', asset: '/public/assets/story/objects/suitcase.webp', alt: 'A suitcase', visibleFrom: 3, className: 'art-prop art-suitcase' }
      ]
    },
    {
      id: 'leaving', number: '09', chapter: 'Part II · A Very Big Detour', title: 'Leaving', layout: 'journey', maxBeat: 5,
      elements: [
        { id: 'traveler', type: 'illustration', asset: '/public/assets/story/characters/an-suitcase.webp', alt: 'An travels with a suitcase', visibleFrom: 0, className: 'art-character art-traveler' },
        { id: 'taiwan', type: 'asset', asset: '/public/assets/story/environments/taiwan.webp', alt: 'Taiwan', visibleFrom: 1, className: 'art-environment art-taiwan' },
        { id: 'plane', type: 'asset', asset: '/public/assets/story/objects/airplane.webp', alt: 'Airplane', visibleFrom: 2, className: 'art-prop art-plane', states: [{ from: 4, className: 'is-travelled' }] },
        { id: 'new-york', type: 'asset', asset: '/public/assets/story/environments/new-york.webp', alt: 'New York', visibleFrom: 3, className: 'art-environment art-new-york' },
        { id: 'route-label', type: 'emphasis', content: 'Taiwan → New York.', visibleFrom: 4, className: 'copy-title copy-title--journey' },
        { id: 'far', type: 'text', content: 'A very big detour.', visibleFrom: 5, className: 'copy-caption copy-caption--journey' }
      ]
    },
    {
      id: 'changing-worlds', number: '10', chapter: 'Part II · A Very Big Detour', title: 'Changing Worlds', layout: 'split', maxBeat: 3,
      elements: [
        { id: 'professional-old', type: 'illustration', asset: '/public/assets/story/characters/an-professional.webp', alt: 'An as an auditor', visibleFrom: 0, className: 'art-character art-split-left' },
        { id: 'student-new', type: 'illustration', asset: '/public/assets/story/characters/an-student.webp', alt: 'An as a computer science student', visibleFrom: 0, className: 'art-character art-split-right' },
        { id: 'field-change', type: 'emphasis', content: 'Accounting → Computer Science.', visibleFrom: 1, className: 'copy-title copy-title--split' },
        { id: 'role-change', type: 'text', content: 'Senior Associate → Student.', visibleFrom: 2, className: 'copy-line copy-line--split' },
        { id: 'world-change', type: 'text', content: 'A familiar world → a completely unfamiliar one.', visibleFrom: 3, className: 'copy-punch copy-punch--split' }
      ]
    },
    {
      id: 'no-map', number: '11', chapter: 'Part II · A Very Big Detour', title: 'No Map', layout: 'portrait-left', maxBeat: 3,
      elements: [
        { id: 'no-map-character', type: 'illustration', asset: '/public/assets/story/characters/an-student.webp', alt: 'An faces unfamiliar paths', visibleFrom: 0, className: 'art-character art-no-map' },
        { id: 'signs', type: 'chips', items: ['CS?', 'Career?', 'USA?', 'Future?'], visibleFrom: 0, className: 'story-chips story-chips--signs' },
        { id: 'no-roadmap', type: 'emphasis', content: 'No roadmap.', visibleFrom: 1, className: 'copy-title' },
        { id: 'no-guarantee', type: 'text', content: 'No guarantee.', visibleFrom: 2, className: 'copy-line' },
        { id: 'no-idea', type: 'text', content: 'And definitely no idea where this would lead.', visibleFrom: 3, className: 'copy-punch' }
      ]
    },
    {
      id: 'keep-moving', number: '12', chapter: 'Part II · A Very Big Detour', title: 'Keep Moving', layout: 'portrait-right', maxBeat: 3,
      elements: [
        { id: 'moving-character', type: 'illustration', asset: '/public/assets/story/characters/an-next-page.webp', alt: 'An keeps walking forward', visibleFrom: 0, className: 'art-character art-moving' },
        { id: 'learned', type: 'text', content: 'But An had learned something about herself.', visibleFrom: 0, className: 'copy-line' },
        { id: 'everything', type: 'text', content: "She doesn't need to know everything before she starts.", visibleFrom: 1, className: 'copy-line' },
        { id: 'fast-enough', type: 'emphasis', content: 'She just needs to learn fast enough to keep moving.', visibleFrom: 2, className: 'copy-title' },
        { id: 'motion', type: 'process', items: ['Learn', 'Move', 'Learn', 'Move'], visibleFrom: 3, revealStep: false, className: 'story-process story-process--motion' }
      ]
    },
    {
      id: 'adapt', number: '13', chapter: 'Part II · A Very Big Detour', title: 'Adapt', layout: 'sequence', maxBeat: 4,
      elements: [
        { id: 'adapt-character', type: 'illustration', asset: '/public/assets/story/characters/an-working.webp', alt: 'An learns in a new city and field', visibleFrom: 0, className: 'art-character art-adapting' },
        { id: 'new-list', type: 'chips', items: ['New city.', 'New language.', 'New field.', 'New rules.'], visibleFrom: 1, className: 'story-chips story-chips--new' },
        { id: 'observe', type: 'process', items: ['Observe', 'Learn', 'Adapt', 'Build', 'Repeat'], visibleFrom: 2, revealStep: false, className: 'story-process story-process--loop' },
        { id: 'routine', type: 'text', content: 'Unfamiliar became a routine.', visibleFrom: 3, className: 'copy-line copy-line--center' },
        { id: 'rhythm', type: 'emphasis', content: 'Observe. Learn. Adapt. Build. Repeat.', visibleFrom: 4, className: 'copy-punch copy-punch--center' }
      ]
    },
    {
      id: 'not-zero', number: '14', chapter: 'Part II · A Very Big Detour', title: 'Not Zero', layout: 'blocks', maxBeat: 3,
      elements: [
        { id: 'not-zero-character', type: 'illustration', asset: '/public/assets/story/characters/an-curious.webp', alt: 'An looks at skills carried from earlier work', visibleFrom: 0, className: 'art-character art-not-zero' },
        { id: 'maybe', type: 'emphasis', content: "Maybe starting over isn't really starting from zero.", visibleFrom: 1, className: 'copy-title copy-title--wide' },
        { id: 'old-blocks', type: 'chips', items: ['Accounting', 'Audit', 'Business', 'Risk', 'Processes'], visibleFrom: 2, className: 'story-chips story-chips--blocks-old' },
        { id: 'carry', type: 'text', content: 'You bring everything you learned before.', visibleFrom: 3, className: 'copy-line copy-line--center' }
      ]
    },
    {
      id: 'reuse-everything', number: '15', chapter: 'Part II · A Very Big Detour', title: 'Reuse Everything', layout: 'builder', maxBeat: 3,
      elements: [
        { id: 'reuse-character', type: 'illustration', asset: '/public/assets/story/characters/an-building.webp', alt: 'An combines business and technology into one system', visibleFrom: 0, className: 'art-character art-reuse' },
        { id: 'old-new-blocks', type: 'chips', items: ['Audit', 'Business', 'Risk', 'Processes', 'Code', 'Data', 'Software', 'AI'], visibleFrom: 1, className: 'story-chips story-chips--blocks-mixed' },
        { id: 'differently', type: 'emphasis', content: 'You just learn how to use it differently.', visibleFrom: 2, className: 'copy-title copy-title--small' },
        { id: 'thread', type: 'text', content: 'Business judgment became part of how she builds.', visibleFrom: 3, className: 'copy-punch' }
      ]
    },
    {
      id: 'continue', number: '16', chapter: 'Part II · A Very Big Detour', title: 'Continue', layout: 'center', maxBeat: 2,
      elements: [
        { id: 'continue-character', type: 'illustration', asset: '/public/assets/story/characters/an-next-page.webp', alt: 'An walks toward the next chapter', visibleFrom: 0, className: 'art-character art-continue' },
        { id: 'getting-good', type: 'emphasis', content: 'And An was getting pretty good at that.', visibleFrom: 1, className: 'copy-title copy-title--center' },
        { id: 'continued', type: 'text', content: 'So she kept building.', visibleFrom: 2, className: 'copy-caption copy-caption--center' }
      ]
    },
    {
      id: 'mimir', number: '17', chapter: 'Part III · What I Build', title: 'The Mimir', layout: 'project', maxBeat: 3,
      elements: [
        { id: 'mimir-character', type: 'illustration', asset: '/public/assets/story/characters/an-working.webp', alt: 'An builds a language learning product', visibleFrom: 0, className: 'art-character art-project' },
        { id: 'mimir-intro', type: 'text', content: 'One system became a place to practice a new language.', visibleFrom: 0, className: 'copy-eyebrow' },
        { id: 'mimir-title', type: 'emphasis', content: 'The Mimir', visibleFrom: 1, persist: true, className: 'copy-title' },
        { id: 'mimir-copy', type: 'text', content: 'Built from scratch, then shaped around how real learners listen, speak, and try again.', visibleFrom: 2, className: 'copy-line' },
        { id: 'mimir-stats', type: 'stats', items: [['4,500+', 'learners'], ['68 → 92', 'Lighthouse'], ['70%', 'less manual review']], visibleFrom: 3, className: 'story-stats' }
      ]
    },
    {
      id: 'boc', number: '18', chapter: 'Part III · What I Build', title: 'BOC', layout: 'project', maxBeat: 3,
      elements: [
        { id: 'boc-character', type: 'illustration', asset: '/public/assets/story/characters/an-building.webp', alt: 'An assembles a reliable data system', visibleFrom: 0, className: 'art-character art-project' },
        { id: 'boc-intro', type: 'text', content: 'Then the systems grew quieter—and more consequential.', visibleFrom: 0, className: 'copy-eyebrow' },
        { id: 'boc-title', type: 'emphasis', content: 'Reliable after midnight.', visibleFrom: 1, persist: true, className: 'copy-title copy-title--small' },
        { id: 'boc-copy', type: 'text', content: 'Nightly loan processing moved from SSIS into Python, FastAPI, Airflow, and Pandas. Reliability became a promise kept while everyone else slept.', visibleFrom: 2, className: 'copy-line' },
        { id: 'boc-stats', type: 'stats', items: [['5+', 'data sources'], ['30K+', 'records daily'], ['60%', 'faster resolution']], visibleFrom: 3, className: 'story-stats' }
      ]
    },
    {
      id: 'next-page', number: '19', chapter: 'Epilogue · Still Building', title: 'The Next Page', layout: 'contact', maxBeat: 3,
      elements: [
        { id: 'next-character', type: 'illustration', asset: '/public/assets/story/characters/an-next-page.webp', alt: 'An walks toward the next blank page', visibleFrom: 0, className: 'art-character art-next' },
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
