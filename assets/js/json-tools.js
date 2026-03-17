function beautify() {
  const input = document.getElementById('jsonInput').value.trim();
  if (!input) { showNotif(window.LANG === 'en' ? 'Please enter JSON!' : 'Lütfen JSON girin!'); return; }
  try {
    const parsed = JSON.parse(input);
    document.getElementById('jsonOutput').textContent = JSON.stringify(parsed, null, 2);
    showNotif(window.LANG === 'en' ? 'JSON formatted! ✨' : 'JSON düzenlendi! ✨');
  } catch(e) {
    document.getElementById('jsonOutput').textContent = '❌ Hata: ' + e.message;
  }
}

function minify() {
  const input = document.getElementById('jsonInput').value.trim();
  if (!input) { showNotif(window.LANG === 'en' ? 'Please enter JSON!' : 'Lütfen JSON girin!'); return; }
  try {
    const parsed = JSON.parse(input);
    document.getElementById('jsonOutput').textContent = JSON.stringify(parsed);
    showNotif(window.LANG === 'en' ? 'JSON minified! 🗜️' : 'JSON sıkıştırıldı! 🗜️');
  } catch(e) {
    document.getElementById('jsonOutput').textContent = '❌ Hata: ' + e.message;
  }
}

function copyOutput() {
  const text = document.getElementById('jsonOutput').textContent;
  if (!text) return;
  navigator.clipboard.writeText(text).then(() => {
    showNotif(window.LANG === 'en' ? 'Copied! ✅' : 'Kopyalandı! ✅');
  });
}

function clearJSON() {
  document.getElementById('jsonInput').value = '';
  document.getElementById('jsonOutput').textContent = '';
}

function showNotif(msg) {
  let n = document.getElementById('notif');
  if (!n) { n = document.createElement('div'); n.id = 'notif'; n.className = 'notif'; document.body.appendChild(n); }
  n.textContent = msg;
  n.classList.add('show');
  setTimeout(() => n.classList.remove('show'), 2500);
}
