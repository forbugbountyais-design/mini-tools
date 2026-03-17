function initColorPicker() {
  const picker = document.getElementById('colorInput');
  if (!picker) return;
  picker.addEventListener('input', updateColors);
  updateColors();
}

function updateColors() {
  const hex = document.getElementById('colorInput').value;
  document.getElementById('colorPreview').style.background = hex;
  document.getElementById('hexVal').textContent = hex.toUpperCase();
  const rgb = hexToRgb(hex);
  document.getElementById('rgbVal').textContent = `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
  document.getElementById('hslVal').textContent = rgbToHsl(rgb.r, rgb.g, rgb.b);
  document.getElementById('rgbRaw').textContent = `${rgb.r}, ${rgb.g}, ${rgb.b}`;
}

function hexToRgb(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : { r: 0, g: 0, b: 0 };
}

function rgbToHsl(r, g, b) {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h, s, l = (max + min) / 2;
  if (max === min) { h = s = 0; }
  else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch(max) {
      case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
      case g: h = ((b - r) / d + 2) / 6; break;
      case b: h = ((r - g) / d + 4) / 6; break;
    }
  }
  return `hsl(${Math.round(h*360)}, ${Math.round(s*100)}%, ${Math.round(l*100)}%)`;
}

function copyColor(id) {
  const text = document.getElementById(id).textContent;
  navigator.clipboard.writeText(text).then(() => {
    showNotif(window.LANG === 'en' ? 'Copied! ✅' : 'Kopyalandı! ✅');
  });
}

function showNotif(msg) {
  let n = document.getElementById('notif');
  if (!n) { n = document.createElement('div'); n.id = 'notif'; n.className = 'notif'; document.body.appendChild(n); }
  n.textContent = msg;
  n.classList.add('show');
  setTimeout(() => n.classList.remove('show'), 2500);
}

document.addEventListener('DOMContentLoaded', initColorPicker);
