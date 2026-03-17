function generateQR() {
  const text = document.getElementById('qrInput').value.trim();
  if (!text) {
    showNotif(window.LANG === 'en' ? 'Please enter text or URL!' : 'Lütfen metin veya URL girin!');
    return;
  }
  const container = document.getElementById('qrOutput');
  container.innerHTML = '';
  const size = parseInt(document.getElementById('qrSize').value) || 200;
  const url = `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodeURIComponent(text)}&bgcolor=ffffff&color=000000&margin=10`;
  const img = document.createElement('img');
  img.src = url;
  img.alt = 'QR Code';
  img.style.cssText = `max-width:100%;border-radius:8px;`;
  container.appendChild(img);

  const dlBtn = document.getElementById('dlBtn');
  if (dlBtn) {
    dlBtn.style.display = 'inline-block';
    dlBtn.onclick = () => {
      const a = document.createElement('a');
      a.href = url;
      a.download = 'qrcode.png';
      a.click();
    };
  }
  showNotif(window.LANG === 'en' ? 'QR Code created! 📱' : 'QR Kod oluşturuldu! 📱');
}

function showNotif(msg) {
  let n = document.getElementById('notif');
  if (!n) { n = document.createElement('div'); n.id = 'notif'; n.className = 'notif'; document.body.appendChild(n); }
  n.textContent = msg;
  n.classList.add('show');
  setTimeout(() => n.classList.remove('show'), 2500);
}
