(function () {
  var C = window.DEMO;
  window.PRE = C.prefijo;
  window.wa = function (m) {
    return 'https://wa.me/' + C.whatsapp + '?text=' + encodeURIComponent(C.prefijo + ' ' + m);
  };
  window.fmt = function (n) { return 'RD$' + Number(n).toLocaleString('en-US'); };
  document.querySelectorAll('[data-wa]').forEach(function (a) { a.href = wa(a.dataset.wa); });

  // Formulario que arma un mensaje y lo abre en WhatsApp. armar recibe un objeto con los campos.
  window.formWa = function (form, armar) {
    var hoy = new Date(Date.now() - new Date().getTimezoneOffset() * 60000).toISOString().slice(0, 10);
    var f = form.querySelector('input[type=date]');
    if (f) f.min = hoy;
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!form.reportValidity()) return;
      var d = {};
      new FormData(form).forEach(function (v, k) {
        var el = form.elements[k];
        v = String(v).trim();
        d[k] = el && el.tagName === 'SELECT' ? v : v.replace(/[\s.,;:!?]+$/, '');
      });
      var url = wa(armar(d));
      form.dataset.enlace = url;
      window.open(url, '_blank', 'noopener');
    });
  };

  // Carrito guardado en el teléfono. Devuelve un objeto con items, total y métodos.
  window.guardado = {
    leer: function (k) { try { return JSON.parse(localStorage.getItem(k) || 'null'); } catch (e) { return null; } },
    escribir: function (k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} }
  };
})();
