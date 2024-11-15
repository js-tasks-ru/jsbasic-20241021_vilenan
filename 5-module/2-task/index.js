function toggleText() {
  const toggleButtonEl = document.querySelector('.toggle-text-button'),
    textEl = document.querySelector('#text');
  toggleButtonEl.addEventListener('click', () => {
    textEl.hasAttribute('hidden')? textEl.hidden = false : textEl.hidden = true;
  })
}
