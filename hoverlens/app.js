'use strict';
(() => {
  const entries = {
    curious: { phonetic: '/ˈkjʊəriəs/', pos: 'adj.', definition: '好奇的；求知欲强的', extra: 'eager to know or learn something' },
    repository: { phonetic: '/rɪˈpɒzɪtəri/', pos: 'n.', definition: '贮藏所；仓库；知识库', extra: 'a place where things are stored' },
    serendipity: { phonetic: '/ˌserənˈdɪpəti/', pos: 'n.', definition: '意外发现珍奇事物的本领；机缘巧合', extra: 'the chance discovery of something valuable' }
  };
  const words = [...document.querySelectorAll('.word')];
  const stage = document.querySelector('.demo-stage');
  const panel = stage.querySelector('.lookup-panel');
  const cursor = stage.querySelector('.demo-cursor');
  const playButton = document.getElementById('demo-play');
  const stateLabel = stage.querySelector('.demo-state');
  const progress = stage.querySelector('.demo-progress>span');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const english = document.documentElement.lang === 'en';
  const labels = english ? {
    point: 'Point to a word', key: 'Tap Option',
    lookup: 'Meaning, right away', manual: 'Try another highlighted word',
    pause: 'Pause', play: 'Play', pauseLabel: 'Pause animation', playLabel: 'Play animation'
  } : {
    point: '指向下一个单词', key: '轻按 Option',
    lookup: '轻按，即刻看释义', manual: '还可以点击其他高亮单词',
    pause: '暂停', play: '播放', pauseLabel: '暂停动画', playLabel: '播放动画'
  };
  const duration = 2600;
  let elapsed = 0;
  let lastFrame = null;
  let frame = null;
  let currentPhase = '';
  let currentWord = '';
  let playing = !reducedMotion.matches;
  let inView = false;

  function selectWord(word, highlight = true) {
    const entry = entries[word];
    if (!entry) return;
    document.getElementById('lookup-word').textContent = word;
    for (const key of ['phonetic', 'pos', 'definition', 'extra']) {
      document.getElementById('lookup-' + key).textContent = entry[key];
    }
    for (const button of words) {
      const active = highlight && button.dataset.word === word;
      button.classList.toggle('active', active);
      button.setAttribute('aria-pressed', String(active));
    }
  }

  function moveCursor(word, atWord) {
    const bounds = stage.getBoundingClientRect();
    const rect = word.getBoundingClientRect();
    const x = atWord ? rect.left - bounds.left + rect.width * .45 : stage.clientWidth * .76;
    const y = atWord ? rect.top - bounds.top + rect.height * .65 : 135;
    cursor.style.transform = `translate(${x}px, ${y}px)`;
  }

  function render(force = false) {
    const cycle = Math.floor(elapsed / duration);
    const time = elapsed % duration;
    const word = words[cycle % words.length];
    const phase = time < 380 ? 'point' : time < 540 ? 'key' : 'lookup';
    if (force || phase !== currentPhase || word.dataset.word !== currentWord) {
      currentPhase = phase;
      currentWord = word.dataset.word;
      stage.dataset.phase = phase;
      stateLabel.textContent = labels[phase];
      selectWord(currentWord, phase === 'key' || phase === 'lookup');
      moveCursor(word, true);
      const step = phase;
      for (const item of stage.querySelectorAll('[data-step]')) {
        item.classList.toggle('current', item.dataset.step === step);
      }
    }
    progress.style.transform = `scaleX(${time / duration})`;
  }

  function shouldRun() { return playing && inView && !document.hidden; }
  function tick(timestamp) {
    frame = null;
    if (!shouldRun()) { lastFrame = null; return; }
    if (lastFrame !== null) elapsed += Math.min(timestamp - lastFrame, 100);
    lastFrame = timestamp;
    render();
    frame = requestAnimationFrame(tick);
  }
  function syncPlayback() {
    stage.dataset.playing = String(playing);
    playButton.querySelector('span').textContent = playing ? labels.pause : labels.play;
    playButton.setAttribute('aria-label', playing ? labels.pauseLabel : labels.playLabel);
    if (frame !== null) cancelAnimationFrame(frame);
    frame = null;
    lastFrame = null;
    if (shouldRun()) frame = requestAnimationFrame(tick);
  }

  stage.dataset.animated = '';
  panel.setAttribute('aria-live', 'off');
  if (reducedMotion.matches) {
    elapsed = 900;
    stage.dataset.instant = '';
  }
  render(true);
  syncPlayback();

  playButton.addEventListener('click', () => {
    playing = !playing;
    panel.setAttribute('aria-live', 'off');
    if (currentPhase === 'manual' && playing) {
      currentPhase = '';
      render(true);
    }
    syncPlayback();
  });
  document.getElementById('demo-replay').addEventListener('click', () => {
    elapsed = 0;
    currentPhase = '';
    playing = true;
    panel.setAttribute('aria-live', 'off');
    render(true);
    syncPlayback();
  });
  for (const button of words) {
    button.addEventListener('click', () => {
      playing = false;
      syncPlayback();
      currentPhase = 'manual';
      currentWord = button.dataset.word;
      stage.dataset.phase = 'manual';
      panel.setAttribute('aria-live', 'polite');
      selectWord(button.dataset.word);
      moveCursor(button, true);
      stateLabel.textContent = labels.manual;
      for (const item of stage.querySelectorAll('[data-step]')) {
        item.classList.toggle('current', item.dataset.step === 'lookup');
      }
    });
  }
  document.addEventListener('visibilitychange', syncPlayback);
  const observer = new IntersectionObserver(([entry]) => {
    inView = entry.isIntersecting;
    syncPlayback();
  }, { threshold: .15 });
  observer.observe(stage);
  window.addEventListener('resize', () => {
    const word = words.find(button => button.dataset.word === currentWord) || words[0];
    moveCursor(word, true);
  });
  reducedMotion.addEventListener('change', event => {
    if (event.matches) {
      playing = false;
      elapsed = 900;
      stage.dataset.instant = '';
      render(true);
      syncPlayback();
    } else {
      delete stage.dataset.instant;
    }
  });

  panel.addEventListener('focusin', () => {
    playing = false;
    syncPlayback();
  });

  const dialog = document.getElementById('speech-dialog');
  document.getElementById('speaker').addEventListener('click', () => {
    playing = false;
    syncPlayback();
    dialog.showModal();
  });
  document.getElementById('copy-checksum').addEventListener('click', async event => {
    const button = event.currentTarget;
    const status = document.getElementById('copy-status');
    try {
      await navigator.clipboard.writeText(document.getElementById('checksum-value').textContent.trim());
      status.textContent = button.dataset.copied;
    } catch {
      status.textContent = button.dataset.failed;
    }
  });
})();
