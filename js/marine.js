// Pop-up book handler
document.querySelectorAll('.marine-categories a').forEach(link => {
  link.addEventListener('click', function (e) {
    e.preventDefault();
    const targetId = this.getAttribute('href').substring(1); // Remove #
    const book = document.getElementById(targetId);
    if (book) {
      book.classList.add('active');
      const pages = book.querySelectorAll('.page');
      pages.forEach(p => p.classList.remove('active')); // Clear any previous
      if (pages[0]) pages[0].classList.add('active'); // Show first page

      // Store index for each book instance
      book.dataset.currentIndex = 0;
    }
  });
});

// Close button
document.querySelectorAll('.close-book').forEach(button => {
  button.addEventListener('click', function () {
    const book = this.closest('.book-content');
    book.classList.remove('active');
    const pages = book.querySelectorAll('.page');
    pages.forEach(p => p.classList.remove('active'));
    book.dataset.currentIndex = 0;
  });
});

// Initialize navigation for EACH book separately
document.querySelectorAll('.book-content').forEach(book => {
  const pages = book.querySelectorAll('.page');
  let currentIndex = 0;

  const prevBtn = book.querySelector('.prev-page');
  const nextBtn = book.querySelector('.next-page');

  function updatePage(index) {
    pages.forEach((page, i) => {
      page.classList.toggle('active', i === index);
    });
    book.dataset.currentIndex = index;
  }

  prevBtn.addEventListener('click', () => {
    currentIndex = parseInt(book.dataset.currentIndex || '0');
    if (currentIndex > 0) {
      currentIndex--;
      updatePage(currentIndex);
    }
  });

  nextBtn.addEventListener('click', () => {
    currentIndex = parseInt(book.dataset.currentIndex || '0');
    if (currentIndex < pages.length - 1) {
      currentIndex++;
      updatePage(currentIndex);
    }
  });

  // Initialize
  updatePage(currentIndex);
});
