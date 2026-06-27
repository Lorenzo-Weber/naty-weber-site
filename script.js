function updateCountdown() {
  var deadline = new Date('2025-07-07T23:59:59');
  var now = new Date();
  var diff = deadline - now;
  
  if (diff <= 0) {
    ['cd-days','cd-hours','cd-mins','cd-secs','ic-days','ic-hours','ic-mins','ic-secs'].forEach(function(id) {
      var el = document.getElementById(id); if(el) el.textContent = '00';
    });
    return;
  }
  
  var d = Math.floor(diff / 86400000);
  var h = Math.floor((diff % 86400000) / 3600000);
  var m = Math.floor((diff % 3600000) / 60000);
  var s = Math.floor((diff % 60000) / 1000);
  
  function pad(n) { return String(n).padStart(2,'0'); }
  
  var vals = [d, h, m, s];
  var sets = [['cd-days','ic-days'],['cd-hours','ic-hours'],['cd-mins','ic-mins'],['cd-secs','ic-secs']];
  
  vals.forEach(function(val, i) {
    sets[i].forEach(function(id) {
      var el = document.getElementById(id); if(el) el.textContent = pad(val);
    });
  });
}

updateCountdown();
setInterval(updateCountdown, 1000);

/* ===== IFRAME HEIGHT FIX =====
   Envia a altura real do conteúdo para o frame pai (Wix),
   eliminando a barra de scroll interna do iframe.
   No Wix, configure o iframe como:
     <iframe src="..." scrolling="no" id="metodo-base-iframe"></iframe>
   e no seu site Wix adicione no Custom Code:
     window.addEventListener('message', function(e) {
       if (e.data && e.data.type === 'iframeHeight') {
         document.getElementById('metodo-base-iframe').style.height = e.data.height + 'px';
       }
     });
============================= */
function sendHeight() {
  var height = document.body.scrollHeight;
  if (window.parent && window.parent !== window) {
    window.parent.postMessage({ type: 'iframeHeight', height: height }, '*');
  }
}

// Envia altura ao carregar e sempre que o conteúdo mudar
window.addEventListener('load', sendHeight);
window.addEventListener('resize', sendHeight);

// Observa mudanças no DOM (ex: imagens carregando)
if (window.MutationObserver) {
  var observer = new MutationObserver(sendHeight);
  observer.observe(document.body, { childList: true, subtree: true, attributes: true });
}

// Envio periódico de segurança nos primeiros 3s
var sends = 0;
var interval = setInterval(function() {
  sendHeight();
  sends++;
  if (sends >= 6) clearInterval(interval);
}, 500);