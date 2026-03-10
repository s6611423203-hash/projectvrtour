// ============================================
// audio-warp-tab.js — โหลดหลัง index.js เสมอ
// ============================================

// สร้าง flash overlay
var warpFlashEl = document.createElement('div');
warpFlashEl.id = 'warpFlash';
warpFlashEl.style.cssText = 'pointer-events:none;position:fixed;inset:0;background:rgba(230,57,70,0.25);opacity:0;z-index:9998;transition:opacity 0.2s;';
document.body.appendChild(warpFlashEl);

// ---- Toggle panel ----
function toggleAudioNav() {
  var list = document.getElementById('audioNavList');
  var btn  = document.getElementById('audioNavToggle');
  if (!list || !btn) return;
  list.classList.toggle('visible');
  btn.classList.toggle('open');
}

function closeAudioNav() {
  var list = document.getElementById('audioNavList');
  var btn  = document.getElementById('audioNavToggle');
  if (list) list.classList.remove('visible');
  if (btn)  btn.classList.remove('open');
}

// ---- วาร์ปไป scene ----
function warpToAudioScene(sceneId) {
  // หยุดเสียงที่เล่นอยู่
  if (typeof currentAudio !== 'undefined' && currentAudio) {
    currentAudio.pause();
    currentAudio.currentTime = 0;
  }

  // Flash effect
  var flash = document.getElementById('warpFlash');
  if (flash) {
    flash.style.opacity = '1';
    setTimeout(function() { flash.style.opacity = '0'; }, 200);
  }

  setTimeout(function() {
    // วิธี 1: มีปุ่มใน sceneList → คลิกตรงๆ
    var btn = document.querySelector('#sceneList .scene[data-id="' + sceneId + '"]');
    if (btn) {
      btn.click();
    }
    // วิธี 2: ไม่มีปุ่ม → ใช้ __warpToScene จาก index.js
    else if (window.__warpToScene) {
      window.__warpToScene(sceneId);
    }

    closeAudioNav();
  }, 150);
}

// ปิด panel เมื่อคลิกนอก
document.addEventListener('click', function(e) {
  var nav = document.getElementById('audioNav');
  if (nav && !nav.contains(e.target)) {
    closeAudioNav();
  }
});
