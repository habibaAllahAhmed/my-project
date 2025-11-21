// ---------- button that takes you to books -----------
let btn = document.getElementById('stopBtn'),
overlay = document.getElementById('transitionOverlay');

btn.addEventListener('click', (e) => {
  overlay.classList.add('active');

  setTimeout(() => {
window.location.href = 'Books.html';
  }, 2000); 
});




