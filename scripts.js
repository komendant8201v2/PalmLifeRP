// Prosty skrypt obsługujący aktywne linki i płynne przewijanie
document.querySelectorAll('.main-nav .nav-link').forEach(link => {
link.addEventListener('click', function(e){
e.preventDefault();
document.querySelectorAll('.main-nav .nav-link').forEach(l => l.classList.remove('active'));
this.classList.add('active');
const target = document.querySelector(this.getAttribute('href'));
if(target) target.scrollIntoView({behavior:'smooth', block:'start'});
});
});


// Dodatkowo: highlight linku w zależności od przewijania
const sections = document.querySelectorAll('main .section');
window.addEventListener('scroll', () => {
let current = '';
sections.forEach(section => {
const rect = section.getBoundingClientRect();
if(rect.top <= 120 && rect.bottom >= 120){ current = section.id; }
});
if(current){
document.querySelectorAll('.main-nav .nav-link').forEach(l => l.classList.toggle('active', l.getAttribute('href') === ('#'+current)));
}
});
