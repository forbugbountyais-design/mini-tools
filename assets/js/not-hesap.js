function calculate() {
  const gradeInputs = document.querySelectorAll('.grade-input');
  const weightInputs = document.querySelectorAll('.weight-input');
  let totalWeight = 0, weightedSum = 0, valid = true;
  gradeInputs.forEach((g, i) => {
    const grade = parseFloat(g.value);
    const weight = parseFloat(weightInputs[i].value);
    if (isNaN(grade) || isNaN(weight)) { valid = false; return; }
    weightedSum += grade * (weight / 100);
    totalWeight += weight;
  });
  if (!valid || totalWeight === 0) { showNotif('Lütfen tüm alanları doldurun!'); return; }
  const avg = (weightedSum / totalWeight) * 100;
  const result = Math.round(avg * 10) / 10;
  document.getElementById('resultScore').innerHTML = result + '<span> / 100</span>';
  document.getElementById('resultLetter').textContent = getLetter(result);
  document.getElementById('resultBox').style.display = 'block';
}

function getLetter(score) {
  if (score >= 90) return '✅ Harf Notu: AA (Mükemmel)';
  if (score >= 85) return '✅ Harf Notu: BA (Çok İyi)';
  if (score >= 80) return '✅ Harf Notu: BB (İyi)';
  if (score >= 75) return '⚡ Harf Notu: CB (Orta-İyi)';
  if (score >= 70) return '⚡ Harf Notu: CC (Orta)';
  if (score >= 65) return '⚠️ Harf Notu: DC (Geçer)';
  if (score >= 60) return '⚠️ Harf Notu: DD (Geçer - Sınır)';
  return '❌ Harf Notu: FF (Başarısız)';
}

function addRow() {
  const container = document.getElementById('gradeRows');
  const row = document.createElement('div');
  row.className = 'grade-row';
  const count = container.children.length + 1;
  row.innerHTML = `
    <label>Sınav ${count}</label>
    <input type="number" placeholder="Not (0-100)" min="0" max="100" class="grade-input">
    <input type="number" placeholder="Ağırlık %" min="0" max="100" class="weight-input" value="20">
    <button onclick="this.parentElement.remove()" style="background:none;border:none;color:var(--muted);cursor:pointer;font-size:1.2rem;padding:0 0.5rem;">×</button>
  `;
  container.appendChild(row);
}

function clearAll() {
  document.querySelectorAll('.grade-input').forEach(i => i.value = '');
  document.getElementById('resultBox').style.display = 'none';
}

function showNotif(msg) {
  const n = document.getElementById('notif');
  n.textContent = msg;
  n.classList.add('show');
  setTimeout(() => n.classList.remove('show'), 2500);
}
