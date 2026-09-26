window.AN_STORY_FULL = {
  id: 'an-illustrated-story-six-chapters-v47',
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
        { id: 'career-route', type: 'text', content: 'Accounting → Computer Science. Senior Associate → Student.', visibleFrom: 3, className: 'copy-punch copy-punch--journey-main' }
      ]
    },
    {
      id: 'adapt', number: '04', chapter: 'New York · The Method', title: 'Experience Carries Forward', layout: 'sequence', maxBeat: 3,
      elements: [
        { id: 'bg-adapt', type: 'asset', asset: '/public/assets/story/backgrounds/background-systems.webp', alt: '', visibleFrom: 0, persist: true, className: 'art-backdrop art-backdrop--adapt' },
        { id: 'builder', type: 'illustration', asset: '/public/assets/story/characters/an-building.webp', alt: 'An assembling a software system', visibleFrom: 0, persist: true, className: 'art-character art-moving-condensed' },
        { id: 'new-world', type: 'text', content: 'New city. New language. New field. New rules.', visibleFrom: 0, persist: true, className: 'copy-eyebrow' },
        { id: 'not-zero', type: 'emphasis', content: 'Starting over did not mean starting from zero.', visibleFrom: 1, className: 'copy-title copy-title--small' },
        { id: 'carried', type: 'text', content: 'Business judgment became part of how she learned, adapted, and built.', visibleFrom: 2, className: 'copy-punch copy-punch--adapt' },
        { id: 'loop', type: 'process', items: ['Observe', 'Learn', 'Adapt', 'Build', 'Repeat'], visibleFrom: 3, revealStep: false, className: 'story-process story-process--loop-condensed story-process--type' }
      ]
    },
    {
      id: 'mimir', number: '05', chapter: 'What I Build', title: 'Putting Both Sides to Work', layout: 'project', maxBeat: 3,
      elements: [
        { id: 'bg-projects', type: 'asset', asset: '/public/assets/story/backgrounds/background-workflow.webp', alt: '', visibleFrom: 0, persist: true, className: 'art-backdrop art-backdrop--projects' },
        { id: 'project-lead', type: 'text', content: 'Different domains. The same discipline: understand the operation, then improve the system.', visibleFrom: 0, persist: true, className: 'copy-eyebrow' },
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
        { id: 'same-principle', type: 'text', content: 'The path changed. The operating principle did not.', visibleFrom: 0, persist: true, className: 'copy-eyebrow' },
        { id: 'next-title', type: 'emphasis', content: 'Understand the business. Build the system. Improve the outcome.', visibleFrom: 1, persist: true, className: 'copy-title copy-title--final' },
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
