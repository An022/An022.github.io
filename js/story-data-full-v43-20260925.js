window.AN_STORY_FULL = {
  id: 'an-illustrated-story-professional',
  title: "An's Story",
  scenes: [
    {
      id: 'once-upon-a-time', number: '01', chapter: 'Part I · Taiwan', title: 'Understanding Business', layout: 'portrait-right', maxBeat: 3,
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
      id: 'auditor', number: '02', chapter: 'Part I · PwC', title: 'Business from the Inside', layout: 'portrait-right', maxBeat: 3,
      elements: [
        { id: 'bg-audit', type: 'asset', asset: '/public/assets/story/backgrounds/background-taiwan.webp', alt: '', visibleFrom: 0, persist: true, className: 'art-backdrop art-backdrop--audit' },
        { id: 'professional', type: 'illustration', asset: '/public/assets/story/characters/an-professional.webp', alt: 'An reviewing evidence as an auditor', visibleFrom: 0, persist: true, className: 'art-character art-professional' },
        { id: 'joined-pwc', type: 'text', content: 'At PwC, An learned how organizations make decisions—and where processes break.', visibleFrom: 0, persist: true, className: 'copy-eyebrow' },
        { id: 'judgment', type: 'chips', items: ['Trace the evidence', 'Test the control', 'Explain the risk'], visibleFrom: 1, className: 'story-chips story-chips--questions story-type-list' },
        { id: 'projects', type: 'emphasis', content: 'Across 70+ engagements,', visibleFrom: 2, className: 'copy-title copy-title--small' },
        { id: 'inside', type: 'text', content: 'she developed business judgment grounded in evidence.', visibleFrom: 3, className: 'copy-punch' }
      ]
    },
    {
      id: 'transformation', number: '03', chapter: 'Part I · PwC', title: 'From Analysis to Improvement', layout: 'builder', maxBeat: 4,
      elements: [
        { id: 'bg-workflow', type: 'asset', asset: '/public/assets/story/backgrounds/background-workflow.webp', alt: '', visibleFrom: 0, persist: true, className: 'art-backdrop art-backdrop--workflow' },
        { id: 'working', type: 'illustration', asset: '/public/assets/story/characters/an-working.webp', alt: 'An redesigning a workflow', visibleFrom: 0, persist: true, className: 'art-character art-working-condensed' },
        { id: 'repeated', type: 'text', content: 'Repeated work exposed a larger opportunity.', visibleFrom: 0, className: 'copy-eyebrow' },
        { id: 'redesigned', type: 'emphasis', content: 'An began redesigning the process—not just completing the task.', visibleFrom: 1, className: 'copy-title copy-title--small' },
        { id: 'process', type: 'process', items: ['Task', 'Process', 'Workflow', 'Automation'], visibleFrom: 2, revealStep: false, className: 'story-process story-process--condensed story-process--type' },
        { id: 'changed', type: 'text', content: 'Manual steps became clearer, faster workflows.', visibleFrom: 3, className: 'copy-line' },
        { id: 'system-itself', type: 'emphasis', content: 'Improving the process led to a bigger ambition: build the system itself.', visibleFrom: 4, className: 'copy-punch' }
      ]
    },
    {
      id: 'problem', number: '04', chapter: 'Part II · A Very Big Detour', title: 'The Career Shift', layout: 'portrait-right', maxBeat: 2,
      elements: [
        { id: 'bg-system-thought', type: 'asset', asset: '/public/assets/story/backgrounds/background-systems.webp', alt: '', visibleFrom: 0, persist: true, className: 'art-backdrop art-backdrop--thought' },
        { id: 'shift', type: 'emphasis', content: 'An decided to move from evaluating systems to building them.', visibleFrom: 0, persist: true, className: 'copy-title copy-title--shift' },
        { id: 'foundation', type: 'text', content: 'That required a new technical foundation.', visibleFrom: 1, className: 'copy-line copy-line--shift' },
        { id: 'decision', type: 'emphasis', content: 'So she chose to begin again.', visibleFrom: 2, className: 'copy-punch copy-punch--shift' }
      ]
    },
    {
      id: 'start-over', number: '05', chapter: 'Part II · A Very Big Detour', title: 'A Deliberate Reset', layout: 'journey', maxBeat: 4,
      elements: [
        { id: 'bg-journey', type: 'asset', asset: '/public/assets/story/backgrounds/background-journey.webp', alt: 'An illustrated route from Taiwan to New York', visibleFrom: 0, persist: true, className: 'art-backdrop art-backdrop--journey' },
        { id: 'traveler', type: 'illustration', asset: '/public/assets/story/characters/an-suitcase.webp', alt: 'An travels with a suitcase', visibleFrom: 0, persist: true, className: 'art-character art-traveler-condensed' },
        { id: 'left-role', type: 'text', content: 'She left a senior role in Taiwan to study Computer Science in New York.', visibleFrom: 0, className: 'copy-eyebrow copy-eyebrow--journey' },
        { id: 'started-over', type: 'emphasis', content: 'She started over.', visibleFrom: 1, className: 'copy-title copy-title--journey-main' },
        { id: 'route', type: 'text', content: 'Taiwan → New York.', visibleFrom: 2, className: 'copy-line copy-line--journey-main' },
        { id: 'career-route', type: 'text', content: 'Accounting → Computer Science. Senior Associate → Student.', visibleFrom: 3, className: 'copy-punch copy-punch--journey-main' },
        { id: 'no-map', type: 'emphasis', content: 'A deliberate reset, without a guaranteed outcome.', visibleFrom: 4, className: 'copy-caption copy-caption--journey-main' }
      ]
    },
    {
      id: 'changing-worlds', number: '06', chapter: 'Part II · New York', title: 'Learning a New System', layout: 'split', maxBeat: 3,
      elements: [
        { id: 'bg-ny', type: 'asset', asset: '/public/assets/story/backgrounds/background-journey.webp', alt: '', visibleFrom: 0, persist: true, className: 'art-backdrop art-backdrop--new-york' },
        { id: 'new-list', type: 'chips', items: ['New city', 'New language', 'New field', 'New rules'], visibleFrom: 1, className: 'story-chips story-chips--worlds story-type-list story-type-list--center' },
        { id: 'unknown', type: 'emphasis', content: 'A familiar professional world became an unfamiliar technical one.', visibleFrom: 2, className: 'copy-title copy-title--split-condensed' },
        { id: 'where-lead', type: 'text', content: 'She built context by observing, learning quickly, and acting on what she learned.', visibleFrom: 3, className: 'copy-punch copy-punch--split' }
      ]
    },
    {
      id: 'adapt', number: '07', chapter: 'Part II · New York', title: 'How She Works', layout: 'sequence', maxBeat: 3,
      elements: [
        { id: 'bg-adapt', type: 'asset', asset: '/public/assets/story/backgrounds/background-systems.webp', alt: '', visibleFrom: 0, persist: true, className: 'art-backdrop art-backdrop--adapt' },
        { id: 'builder', type: 'illustration', asset: '/public/assets/story/characters/an-building.webp', alt: 'An assembling a software system', visibleFrom: 0, persist: true, className: 'art-character art-moving-condensed' },
        { id: 'learned', type: 'text', content: 'Starting over clarified how An works best.', visibleFrom: 0, className: 'copy-eyebrow' },
        { id: 'certainty', type: 'text', content: 'She does not wait for complete certainty.', visibleFrom: 1, className: 'copy-line' },
        { id: 'next-decision', type: 'emphasis', content: 'She learns enough to make the next sound decision.', visibleFrom: 2, className: 'copy-title copy-title--small' },
        { id: 'loop', type: 'process', items: ['Observe', 'Learn', 'Adapt', 'Build', 'Repeat'], visibleFrom: 3, revealStep: false, className: 'story-process story-process--loop-condensed story-process--type' }
      ]
    },
    {
      id: 'not-zero', number: '08', chapter: 'Part II · The Thread', title: 'Experience Carries Forward', layout: 'blocks', maxBeat: 3,
      elements: [
        { id: 'bg-reuse', type: 'asset', asset: '/public/assets/story/backgrounds/background-systems.webp', alt: '', visibleFrom: 0, persist: true, className: 'art-backdrop art-backdrop--reuse' },
        { id: 'not-zero-title', type: 'emphasis', content: 'Starting over did not erase what came before.', visibleFrom: 0, persist: true, className: 'copy-title copy-title--wide' },
        { id: 'old-blocks', type: 'chips', items: ['Accounting', 'Audit', 'Business', 'Risk', 'Process'], visibleFrom: 1, className: 'story-chips story-chips--blocks-old story-type-list story-type-list--business' },
        { id: 'new-blocks', type: 'chips', items: ['Code', 'Data', 'Software', 'AI'], visibleFrom: 2, className: 'story-chips story-chips--blocks-new story-type-list story-type-list--technical' },
        { id: 'different', type: 'text', content: 'Business judgment now shapes the systems she builds.', visibleFrom: 3, className: 'copy-punch copy-punch--reuse' }
      ]
    },
    {
      id: 'mimir', number: '09', chapter: 'Part III · What I Build', title: 'Putting Both Sides to Work', layout: 'project', maxBeat: 4,
      elements: [
        { id: 'bg-projects', type: 'asset', asset: '/public/assets/story/backgrounds/background-workflow.webp', alt: '', visibleFrom: 0, persist: true, className: 'art-backdrop art-backdrop--projects' },
        { id: 'project-lead', type: 'text', content: 'The domains changed. The discipline stayed consistent.', visibleFrom: 0, persist: true, className: 'copy-eyebrow' },
        { id: 'mimir-title', type: 'emphasis', content: 'The Mimir', visibleFrom: 1, className: 'copy-title copy-title--project' },
        { id: 'mimir-copy', type: 'text', content: 'A language-learning platform built around how real learners listen, speak, and improve.', visibleFrom: 1, className: 'copy-line copy-line--project' },
        { id: 'boc-title', type: 'emphasis', content: 'BOC', visibleFrom: 2, className: 'copy-title copy-title--project-secondary' },
        { id: 'boc-copy', type: 'text', content: 'Nightly loan processing rebuilt across 5+ sources and 30K+ daily records.', visibleFrom: 2, className: 'copy-line copy-line--project-secondary' },
        { id: 'project-stats', type: 'stats', items: [['4,500+', 'learners'], ['70%', 'less review'], ['30K+', 'records daily'], ['60%', 'faster resolution']], visibleFrom: 3, className: 'story-stats story-stats--combined' },
        { id: 'still-building', type: 'emphasis', content: 'Understand the operation. Then improve the system.', visibleFrom: 4, className: 'copy-punch copy-punch--projects' }
      ]
    },
    {
      id: 'next-page', number: '10', chapter: 'Epilogue · Still Building', title: 'The Next Page', layout: 'contact', maxBeat: 3,
      elements: [
        { id: 'bg-next', type: 'asset', asset: '/public/assets/story/backgrounds/background-systems.webp', alt: '', visibleFrom: 0, persist: true, className: 'art-backdrop art-backdrop--next' },
        { id: 'next-character', type: 'illustration', asset: '/public/assets/story/characters/an-next-page.webp', alt: 'An walks toward the next chapter', visibleFrom: 0, persist: true, className: 'art-character art-next' },
        { id: 'same-principle', type: 'text', content: 'The path changed. The operating principle did not.', visibleFrom: 0, className: 'copy-eyebrow' },
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
