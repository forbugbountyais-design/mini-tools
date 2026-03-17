const CHARS = {
  upper: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  lower: 'abcdefghijklmnopqrstuvwxyz',
  numbers: '0123456789',
  symbols: '!@#$%^&*()-_=+[]{}|;:,.<>?'
};

function generatePassword() {
  const length = parseInt(document.getElementById('pwLength').value) || 16;
  const useUpper = document.getElementById('useUpper').checked;
  const useLower = document.getElementById('useLower').checked;
  const useNumbers = document.getElementById('useNumbers').checked;
  const useSymbols = document.getElementById('useSymbols').checked;

  let charset = '';
  if (useUpper) charset += CHARS.upper;
  if (useLower) charset += CHARS.lower;
  if (useNumbers) charset += CHARS.numbers;
  if (useSymbols) charset += CHARS.symbols;

  if (!charset) {
    showNotif(window.LANG === 'en' ? 'Select at least one option!' : 'En az bir seçenek seçin!');
    return;
  }

  let password = '';
  const arr = new Uint32Array(length);
  crypto.getRandomValues(arr);
  for (let i = 0; i < length; i++) {
    password += charset[arr[i] % charset.length];
  }

  document.getElementById('pwOutput').textContent = password;
  updateStrength(password);
}

function updateStrength(pw) {
  const bars = document.querySelectorAll('.pw-strength-bar');
  let score = 0;
  if (pw.length >= 8) score++;
  if (pw.length >= 12) score++;
  if (/[A-Z]/.test(pw) && /[a-z]/.test(pw)) score++;
  if (/[0-9]/.test(pw)) score++;
  if (/[^A-Za-z0-9]/.test(pw)) score++;

  const colors = ['#ef4444','#f97316','#eab308','#22c55e','#10b981'];
  bars.forEach((bar, i) => {
    bar.style.background = i < score ? colors[Math.min(score-1, colors.length-1)] : 'var(--border)';
  });

  const labels = window.LANG === 'en'
    ? ['','Very Weak','Weak','Fair','Strong','Very Strong']
    : ['','Çok Zayıf','Zayıf','Orta','Güçlü','Çok Güçlü'];
  const el = document.getElementById('strengthLabel');
  if (el) el.textContent = labels[score] || '';
}

function copyPassword() {
  const pw = document.getElementById('pwOutput').textContent;
  if (!pw) return;
  navigator.clipboard.writeText(pw).then(() => {
    showNotif(window.LANG === 'en' ? 'Copied! ✅' : 'Kopyalandı! ✅');
  });
}

function updateLengthDisplay() {
  const val = document.getElementById('pwLength').value;
  const el = document.getElementById('pwLengthDisplay');
  if (el) el.textContent = val;
}

function showNotif(msg) {
  let n = document.getElementById('notif');
  if (!n) { n = document.createElement('div'); n.id = 'notif'; n.className = 'notif'; document.body.appendChild(n); }
  n.textContent = msg;
  n.classList.add('show');
  setTimeout(() => n.classList.remove('show'), 2500);
}
