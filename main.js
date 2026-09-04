/* ============================================================
   AUTO-FIT — giữ MỌI dòng trong .info nằm gọn 1 DÒNG
   ------------------------------------------------------------
   CSS đã đặt white-space:nowrap cho .row/.note. Đoạn này đo bề ngang
   chữ THẬT trên chính máy đang xem; card nào có dòng dài quá thì hạ
   cỡ chữ của cả nhóm trong card đó cho vừa, thay vì để chữ xuống hàng.
     - Hạ theo TỪNG CARD, cả nhóm .row cùng một cỡ (nhìn đều, không
       dòng to dòng nhỏ); nhóm .note tính riêng.
     - Card nào đã vừa thì giữ nguyên, không đụng tới.
     - Sàn: không dưới 72% cỡ gốc, và không dưới MIN_PX (row 8.6px,
       note 7.6px) để còn đọc được.
     - Nếu xuống tới sàn mà VẪN không đủ chỗ (máy siêu nhỏ), dòng đó
       được cho xuống hàng lại — thà xuống hàng chứ không cắt mất chữ.
     - Tự chạy lại khi xoay máy / đổi cỡ cửa sổ / font tải xong.
   ============================================================ */
(function () {
  var MIN_RATIO = 0.72;

  function fitGroup(nodes, minPx) {
    if (!nodes.length) return;
    var i;
    for (i = 0; i < nodes.length; i++) {
      nodes[i].style.fontSize = '';
      nodes[i].style.whiteSpace = '';
    }

    var base  = parseFloat(getComputedStyle(nodes[0]).fontSize);
    var avail = nodes[0].clientWidth;
    if (!base || !avail) return;

    var ratio = 1;
    for (i = 0; i < nodes.length; i++)
      if (nodes[i].scrollWidth > avail + 0.5)
        ratio = Math.min(ratio, avail / nodes[i].scrollWidth);
    if (ratio >= 1) return;

    var floor = Math.max(minPx, base * MIN_RATIO);
    var size  = Math.max(floor, Math.floor(base * ratio * 100) / 100 - 0.05);

    for (var pass = 0; pass < 8; pass++) {
      for (i = 0; i < nodes.length; i++) nodes[i].style.fontSize = size + 'px';
      var over = false;
      for (i = 0; i < nodes.length; i++)
        if (nodes[i].scrollWidth > nodes[i].clientWidth + 0.5) { over = true; break; }
      if (!over || size <= floor) break;
      size = Math.max(floor, size - 0.2);
    }

    /* chạm sàn mà vẫn không đủ chỗ -> cho xuống hàng, không cắt chữ */
    for (i = 0; i < nodes.length; i++)
      if (nodes[i].scrollWidth > nodes[i].clientWidth + 0.5)
        nodes[i].style.whiteSpace = 'normal';
  }

  /* Giữ đúng bậc chữ trong từng card: divider > row > lead > note.
     Khi auto-fit phải hạ .row xuống (card có dòng dài), thì .lead và .note
     của card đó cũng hạ theo cho khỏi bị lớn hơn row. Chỉ hạ, không phóng to. */
  function capBelow(nodes, ceiling) {
    for (var i = 0; i < nodes.length; i++) {
      var cur = parseFloat(getComputedStyle(nodes[i]).fontSize);
      if (cur > ceiling) nodes[i].style.fontSize = (Math.round(ceiling * 100) / 100) + 'px';
    }
  }
  function minFont(nodes) {
    var m = Infinity;
    for (var i = 0; i < nodes.length; i++)
      m = Math.min(m, parseFloat(getComputedStyle(nodes[i]).fontSize));
    return m;
  }

  function fitAll() {
    var cards = document.querySelectorAll('.card');
    for (var i = 0; i < cards.length; i++) {
      var card  = cards[i];
      var leads = card.querySelectorAll('.lead');
      for (var k = 0; k < leads.length; k++) leads[k].style.fontSize = '';   // về cỡ gốc

      var rows  = card.querySelectorAll('.info .row');
      var notes = card.querySelectorAll('.info .note');
      fitGroup(rows,  8.6);
      fitGroup(notes, 7.6);

      if (rows.length && leads.length) capBelow(leads, minFont(rows) * 0.95);
      if (leads.length && notes.length) capBelow(notes, minFont(leads) * 0.95);
    }
  }

  var t;
  function fitLater() { clearTimeout(t); t = setTimeout(fitAll, 120); }

  window.addEventListener('DOMContentLoaded', fitAll);
  window.addEventListener('load', fitAll);
  window.addEventListener('resize', fitLater);
  window.addEventListener('orientationchange', fitLater);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(fitAll);
})();