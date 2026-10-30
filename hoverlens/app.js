'use strict';
(() => {
  const entries = {
    curious: { phonetic: '/ˈkjʊəriəs/', pos: 'adj.', definition: '好奇的；求知欲强的', extra: 'eager to know or learn something' },
    repository: { phonetic: '/rɪˈpɒzɪtəri/', pos: 'n.', definition: '贮藏所；仓库；知识库', extra: 'a place where things are stored' },
    serendipity: { phonetic: '/ˌserənˈdɪpəti/', pos: 'n.', definition: '意外发现珍奇事物的本领；机缘巧合', extra: 'the chance discovery of something valuable' }
  };
  const words = [...document.querySelectorAll('.word')];
  function selectWord(word) {
    const entry = entries[word];
    if (!entry) return;
    document.getElementById('lookup-word').textContent = word;
    for (const key of ['phonetic', 'pos', 'definition', 'extra']) {
      document.getElementById('lookup-' + key).textContent = entry[key];
    }
    for (const button of words) {
      const active = button.dataset.word === word;
      button.classList.toggle('active', active);
      button.setAttribute('aria-pressed', String(active));
    }
  }
  for (const button of words) {
    button.addEventListener('click', () => selectWord(button.dataset.word));
  }
  const dialog = document.getElementById('speech-dialog');
  document.getElementById('speaker').addEventListener('click', () => dialog.showModal());
  document.getElementById('copy-checksum').addEventListener('click', async (event) => {
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
