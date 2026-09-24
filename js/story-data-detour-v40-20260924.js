window.AN_STORY_DETOUR = {
  id: 'very-big-detour-prototype',
  title: 'A Very Big Detour',
  chapter: 'Chapter 02',
  finishHref: '#mimir',
  finishLabel: 'Continue to the next chapter',
  scenes: [
    {
      id: 'problem',
      number: '07',
      title: 'The Problem',
      layout: 'text-left-image-right',
      maxBeat: 3,
      elements: [
        {
          id: 'an-thinking',
          type: 'illustration',
          asset: '/public/assets/story/characters/an-thinking.webp',
          alt: 'An leans toward a laptop, thinking',
          visibleFrom: 0,
          className: 'story-layer--character story-layer--thinking'
        },
        {
          id: 'laptop',
          type: 'object',
          asset: '/public/assets/story/objects/laptop.webp',
          alt: 'A laptop',
          visibleFrom: 0,
          className: 'story-layer--laptop'
        },
        {
          id: 'problem-line',
          type: 'text',
          content: 'There was just one problem.',
          visibleFrom: 1,
          className: 'story-beat--lead'
        },
        {
          id: 'did-not-know',
          type: 'emphasis',
          content: "An didn't know how.",
          visibleFrom: 2,
          className: 'story-beat--hero'
        },
        {
          id: 'question-mark',
          type: 'object',
          asset: '/public/assets/story/objects/question-mark.webp',
          alt: 'A question mark appears beside An',
          visibleFrom: 3,
          className: 'story-layer--question'
        }
      ]
    },
    {
      id: 'start-over',
      number: '08',
      title: 'Start Over',
      layout: 'center-character',
      maxBeat: 4,
      elements: [
        {
          id: 'an-idle',
          type: 'illustration',
          asset: '/public/assets/story/characters/an-idle.webp',
          alt: 'An stands alone, ready for an unfamiliar next step',
          visibleFrom: 0,
          className: 'story-layer--character story-layer--idle'
        },
        {
          id: 'suitcase',
          type: 'object',
          asset: '/public/assets/story/objects/suitcase.webp',
          alt: 'A suitcase appears beside An',
          visibleFrom: 1,
          className: 'story-layer--suitcase'
        },
        {
          id: 'did-something',
          type: 'text',
          content: 'So An did something',
          visibleFrom: 2,
          className: 'story-beat--lead story-beat--center-top'
        },
        {
          id: 'more-than-once',
          type: 'text',
          content: 'she would do more than once.',
          visibleFrom: 3,
          className: 'story-beat--follow'
        },
        {
          id: 'started-over',
          type: 'emphasis',
          content: 'She started over.',
          visibleFrom: 4,
          className: 'story-beat--hero story-beat--started-over'
        }
      ]
    },
    {
      id: 'leaving',
      number: '09',
      title: 'Leaving',
      layout: 'split-world',
      maxBeat: 6,
      elements: [
        {
          id: 'an-suitcase',
          type: 'illustration',
          asset: '/public/assets/story/characters/an-suitcase.webp',
          alt: 'An waits with a backpack and suitcase',
          visibleFrom: 0,
          className: 'story-layer--character story-layer--traveler'
        },
        {
          id: 'taiwan',
          type: 'environment',
          asset: '/public/assets/story/environments/taiwan.webp',
          alt: 'Taiwan',
          visibleFrom: 1,
          className: 'story-layer--taiwan'
        },
        {
          id: 'airplane',
          type: 'object',
          asset: '/public/assets/story/objects/airplane.webp',
          alt: 'An airplane travels from Taiwan toward New York',
          visibleFrom: 2,
          className: 'story-layer--airplane',
          states: [{ from: 4, className: 'is-travelled' }]
        },
        {
          id: 'route',
          type: 'decoration',
          asset: '/public/assets/story/decorations/arrow.svg',
          alt: '',
          visibleFrom: 3,
          className: 'story-layer--route'
        },
        {
          id: 'new-york',
          type: 'environment',
          asset: '/public/assets/story/environments/new-york.webp',
          alt: 'New York',
          visibleFrom: 5,
          className: 'story-layer--new-york'
        },
        {
          id: 'taiwan-to-new-york',
          type: 'emphasis',
          content: 'Taiwan → New York.',
          visibleFrom: 6,
          className: 'story-beat--hero story-beat--journey'
        }
      ]
    }
  ]
};
