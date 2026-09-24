(() => {
  const pages = Array.from(document.querySelectorAll('[data-book-page]'));
  const previousButton = document.getElementById('bookPrev');
  const nextButton = document.getElementById('bookNext');
  const pageLabel = document.getElementById('bookPageLabel');
  const pageCount = document.getElementById('bookPageCount');
  const dots = document.getElementById('bookDots');
  const navigationLinks = Array.from(document.querySelectorAll('.header nav a[href^="#"]'));

  if (!pages.length || !previousButton || !nextButton || !pageLabel || !pageCount || !dots) return;

  let currentPage = 0;
  let pointerStartX = null;

  const pageForHash = (hash) => {
    const target = hash && document.querySelector(hash);
    if (!target) return -1;
    const page = target.matches('[data-book-page]') ? target : target.closest('[data-book-page]');
    return pages.indexOf(page);
  };

  pages.forEach((page, index) => {
    const dot = document.createElement('button');
    dot.type = 'button';
    dot.setAttribute('aria-label', `Open ${page.dataset.bookPage} page`);
    dot.addEventListener('click', () => showPage(index, true));
    dots.appendChild(dot);
  });

  const dotButtons = Array.from(dots.querySelectorAll('button'));

  function showPage(index, updateHash = false) {
    const nextIndex = Math.max(0, Math.min(pages.length - 1, index));
    currentPage = nextIndex;

    pages.forEach((page, pageIndex) => {
      const active = pageIndex === currentPage;
      page.classList.toggle('is-active', active);
      page.classList.toggle('is-before', pageIndex < currentPage);
      page.classList.toggle('is-after', pageIndex > currentPage);
      page.setAttribute('aria-hidden', String(!active));
      page.inert = !active;
      if (active) page.scrollTop = 0;
    });

    dotButtons.forEach((dot, dotIndex) => {
      dot.classList.toggle('is-active', dotIndex === currentPage);
      dot.setAttribute('aria-current', dotIndex === currentPage ? 'page' : 'false');
    });

    previousButton.disabled = currentPage === 0;
    nextButton.disabled = currentPage === pages.length - 1;
    previousButton.setAttribute('aria-label', currentPage > 0 ? `Previous page: ${pages[currentPage - 1].dataset.bookPage}` : 'Previous page');
    nextButton.setAttribute('aria-label', currentPage < pages.length - 1 ? `Next page: ${pages[currentPage + 1].dataset.bookPage}` : 'Next page');
    pageLabel.textContent = pages[currentPage].dataset.bookPage;
    pageCount.textContent = `${String(currentPage + 1).padStart(2, '0')} / ${String(pages.length).padStart(2, '0')}`;

    navigationLinks.forEach((link) => {
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
    }
    if (event.key === 'ArrowLeft' || event.key === 'PageUp') {
      event.preventDefault();
      showPage(currentPage - 1, true);
    }
  });

  const book = document.getElementById('main');
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

  const initialPage = pageForHash(window.location.hash);
  showPage(initialPage >= 0 ? initialPage : 0, false);
})();
