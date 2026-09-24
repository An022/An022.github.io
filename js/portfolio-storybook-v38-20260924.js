(() => {
  const pages = Array.from(document.querySelectorAll('[data-story-page]'));
  const previousButton = document.getElementById('storyPrev');
  const nextButton = document.getElementById('storyNext');
  const chapters = document.getElementById('storyChapters');
  const headerLinks = Array.from(document.querySelectorAll('.story-header a[href^="#"]'));
  const book = document.getElementById('main');

  if (!pages.length || !previousButton || !nextButton || !chapters || !book) return;

  let currentPage = 0;
  let pointerStartX = null;
  const shortLabels = ['Taiwan', 'PwC', 'The turn', 'Mimir', 'BOC', 'Now'];

  const pageForHash = (hash) => {
    if (!hash || hash === '#') return -1;
    const target = document.querySelector(hash);
    if (!target) return -1;
    const page = target.matches('[data-story-page]') ? target : target.closest('[data-story-page]');
    return pages.indexOf(page);
  };

  pages.forEach((page, index) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.setAttribute('aria-label', `Open chapter ${index + 1}: ${page.dataset.storyPage}`);
    button.innerHTML = `<i>${String(index + 1).padStart(2, '0')}</i><span>${shortLabels[index] || page.dataset.storyPage}</span>`;
    button.addEventListener('click', () => showPage(index, true));
    chapters.appendChild(button);
  });

  const chapterButtons = Array.from(chapters.querySelectorAll('button'));

  function showPage(index, updateHash = false) {
    const nextIndex = Math.max(0, Math.min(pages.length - 1, index));
    currentPage = nextIndex;
    book.dataset.currentPage = String(currentPage + 1);

    pages.forEach((page, pageIndex) => {
      const active = pageIndex === currentPage;
      page.classList.toggle('is-active', active);
      page.classList.toggle('is-before', pageIndex < currentPage);
      page.classList.toggle('is-after', pageIndex > currentPage);
      page.setAttribute('aria-hidden', String(!active));
      page.inert = !active;
      if (active) page.scrollTop = 0;
    });

    chapterButtons.forEach((button, buttonIndex) => {
      const active = buttonIndex === currentPage;
      button.classList.toggle('is-active', active);
      if (active) button.setAttribute('aria-current', 'step');
      else button.removeAttribute('aria-current');
    });

    previousButton.disabled = currentPage === 0;
    nextButton.disabled = currentPage === pages.length - 1;
    previousButton.setAttribute('aria-label', currentPage > 0 ? `Previous chapter: ${pages[currentPage - 1].dataset.storyPage}` : 'Previous chapter');
    nextButton.setAttribute('aria-label', currentPage < pages.length - 1 ? `Next chapter: ${pages[currentPage + 1].dataset.storyPage}` : 'Next chapter');

    headerLinks.forEach((link) => {
      const linkPage = pageForHash(link.getAttribute('href'));
      if (linkPage === currentPage) link.setAttribute('aria-current', 'page');
      else link.removeAttribute('aria-current');
    });

    if (updateHash) history.replaceState(null, '', `#${pages[currentPage].id}`);
  }

  previousButton.addEventListener('click', () => showPage(currentPage - 1, true));
  nextButton.addEventListener('click', () => showPage(currentPage + 1, true));

  document.addEventListener('click', (event) => {
    const link = event.target.closest('a[href^="#"]');
    if (!link) return;
    const index = pageForHash(link.getAttribute('href'));
    if (index < 0) return;
    event.preventDefault();
    showPage(index, true);
  });

  document.addEventListener('keydown', (event) => {
    if (document.body.classList.contains('portfolio-locked')) return;
    if (event.target.matches('input, textarea, select, [contenteditable="true"]')) return;
    if (event.key === 'ArrowRight' || event.key === 'PageDown') {
      event.preventDefault();
      showPage(currentPage + 1, true);
    } else if (event.key === 'ArrowLeft' || event.key === 'PageUp') {
      event.preventDefault();
      showPage(currentPage - 1, true);
    }
  });

  book.addEventListener('pointerdown', (event) => {
    if (event.pointerType === 'mouse') return;
    pointerStartX = event.clientX;
  });

  book.addEventListener('pointerup', (event) => {
    if (pointerStartX === null) return;
    const distance = event.clientX - pointerStartX;
    pointerStartX = null;
    if (Math.abs(distance) < 60) return;
    showPage(currentPage + (distance < 0 ? 1 : -1), true);
  });

  window.addEventListener('hashchange', () => {
    const index = pageForHash(window.location.hash);
    if (index >= 0 && index !== currentPage) showPage(index, false);
  });

  const initialPage = pageForHash(window.location.hash);
  showPage(initialPage >= 0 ? initialPage : 0, false);
})();
