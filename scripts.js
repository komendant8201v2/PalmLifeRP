// scripts.js — prosty skrypt do podświetlania aktywnego linku (nie blokuje nawigacji)
(function(){
  const links = document.querySelectorAll('.main-nav .nav-link');
  const pathname = window.location.pathname; // pełna ścieżka, np. /username/repo/regulamin.html
  const currentFile = pathname.split('/').pop() || 'index.html';

  links.forEach(link => {
    const href = link.getAttribute('href'); // np. 'regulamin.html' lub 'index.html'
    // jeśli ścieżka kończy się nazwą pliku z href — traktujemy jako dopasowanie
    if (pathname.endsWith(href) || (href === 'index.html' && currentFile === '')) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }

    // Dla pewności: nie blokujemy domyślnego działania anchorów.
    // (Jeśli masz inny skrypt, który używa e.preventDefault() — usuń go lub skomentuj.)
  });

  // Dodatkowe zabezpieczenie: jeśli strona otwierana jest jako "/repo-name/" (bez index.html)
  if (currentFile === '' || currentFile === 'index.html') {
    links.forEach(l => { if (l.getAttribute('href') === 'index.html') l.classList.add('active'); });
  }
})();
