// Aktywne podświetlanie linku na podstawie aktualnej ścieżki
(function(){
  const links = document.querySelectorAll('.main-nav .nav-link');
  const path = location.pathname.split('/').pop() || 'index.html';

  links.forEach(link => {
    const href = link.getAttribute('href');
    // Gdy link prowadzi do tej samej strony (porównanie plików)
    if(href === path || (href === 'index.html' && path === '')) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }

    // Dla wygody: kliknięcie linku przenosi normalnie (strony separowane).
    // Jeśli chcesz płynne przewijanie dla linków do kotwic w tej samej stronie,
    // dopisz obsługę eventów dla href zaczynających się od '#'.
  });

  // (Opcjonalne) Ułatwienie: jeśli użytkownik otwiera "index.html" bez nazwy pliku,
  // location.pathname.split('/').pop() zwraca '', więc traktujemy to jako index.html:
  if(path === '' ) {
    links.forEach(l => {
      if(l.getAttribute('href') === 'index.html') l.classList.add('active');
    });
  }
})();
