function hideSelf() {
  const buttonEl = document.querySelector('.hide-self-button');
  if(buttonEl) {

    buttonEl.addEventListener('click', () => {
        buttonEl.hidden= true;
    })
  }
}
