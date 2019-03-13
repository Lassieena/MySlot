'use strict';
{
  const panels = document.getElementsByClassName('panel');
  const spin = document.getElementById('spin');

  const cards = [
    'seven.png',
    'bell.png',
    'cherry.png',
  ];

  let timers = [];
  let stopCount = 0;

  function runSlot(n) {
    timers[n] = setTimeout(() => {
      panels[n].children[0].src =
        'img/' +
        cards[Math.floor(Math.random() * cards.length)];
        runSlot(n);
    }, 50);
  }

  function initPanel(e) {
    let i;
    for(i = 0; i < panels.length; i++) {
      panels[i].children[1].addEventListener('click',(e) =>{
        if(e.target.className.indexOf('inactive') !== -1) return;
        console.log(e.target);
        clearTimeout(timers[e.target.dataset.index]);
        e.target.classList.add('inactive');
        stopCount++;
        if (stopCount === panels.length) {
          stopCount = 0;
          checkResults();
          spin.classList.remove('inactive');
        }
      });
    }
  }

  function checkResults() {
    const img0 = panels[0].children[0];
    const img1 = panels[1].children[0];
    const img2 = panels[2].children[0];

    if (img0.src !== img1.src && img0.src !== img2.src) {
      img0.classList.add('unmatched');
    }
    if (img1.src !== img0.src && img1.src !== img2.src) {
      img1.classList.add('unmatched');
    }
    if (img2.src !== img0.src && img2.src !== img1.src) {
      img2.classList.add('unmatched');
    }
  }

  initPanel();


  spin.addEventListener('click', (e) => {
    let i;
    if(e.target.className.indexOf('inactive') !== -1) return;
    e.target.classList.add('inactive');
    for(i = 0; i < panels.length; i++) {
      runSlot(i);
      panels[i].children[0].classList.remove('unmatched');
      panels[i].children[1].classList.remove('inactive');
    }
  });































}
