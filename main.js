(function() {
  'use strict';

  function bodau(str) {
    str = str.toLowerCase();

    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a');
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e');
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, 'i');
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o');
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u');
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y');
    str = str.replace(/đ/g, 'd');

    return str;
  }

  function modelcode(str) {
    str = bodau(str);

    str = str.replace(/b/g, 'ß');
    str = str.replace(/c/g, '\(');
    str = str.replace(/d/g, '\]\)');
    str = str.replace(/e/g, 'F_');
    str = str.replace(/g/g, '\(¬');
    str = str.replace(/h/g, '†\|');
    str = str.replace(/i/g, '\]');
    str = str.replace(/k/g, '\]<');
    str = str.replace(/l/g, '\]_');
    str = str.replace(/n/g, '\]\[');
    str = str.replace(/o/g, 'º');
    str = str.replace(/p/g, '\]º');
    str = str.replace(/q/g, 'º\[');
    str = str.replace(/s/g, '§');
    str = str.replace(/t/g, '†');
    str = str.replace(/u/g, 'µ');
    str = str.replace(/v/g, '\\\/');
    str = str.replace(/w/g, 'v\/');
    str = str.replace(/x/g, '><');
    str = str.replace(/y/g, '¥');
    str = str.replace(/a/g, 'Cl');
    str = str.replace(/r/g, 'Pv');
    str = str.replace(/m/g, '\/v');

    return str;
  }

  function teencode(str) {
    str = bodau(str);

    str = str.replace(/_/g, '..');
    str = str.replace(/-/g, '~');
    str = str.replace(/\bkhong\b/g, 'h0k');
    str = str.replace(/o/g, '0');
    str = str.replace(/e/g, '3');
    str = str.replace(/a/g, '4');
    str = str.replace(/s/g, '_x');
    str = str.replace(/x/g, 's');
    str = str.replace(/_s/g, 'x');
    str = str.replace(/v/g, 'z');
    str = str.replace(/y/g, 'ij');
    str = str.replace(/\bgi/g, 'j');
    str = str.replace(/i(?!j)/g, 'j');
    str = str.replace(/\Bch\b|c(?!h)/g, 'k');
    str = str.replace(/\bth\B/g, 'tk');
    str = str.replace(/\bngh\B/g, 'nG');
    str = str.replace(/\bnh\B/g, 'nK');
    str = str.replace(/\bph\B/g, 'f');
    str = str.replace(/\Bp\b/g, 'b');
    str = str.replace(/\bb\B/g, 'p');
    str = str.replace(/\Bnh\b/g, 'h');
    str = str.replace(/\Bng\b/g, 'g');
    str = str.replace(/\Bg\B/g, 'G');
    str = str.replace(/\Bt\B/g, 'T');
    str = str.replace(/\Bh\B/g, 'H');
    str = str.replace(/\Bk\B/g, 'K');
    str = str.replace(/\Bu\b/g, 'U');

    return str;
  }

  function skycode(str) {
    return str.replace(/(((?!(\.|,|:|\;|\?|\!|'|")(\s|$)?)[^\s])+)/g, '$1\'s');
  }

  function trans() {
    var val = input.value;

    if (teen.checked) val = teencode(val);
    if (model.checked) val = modelcode(val);
    if (sky.checked) val = skycode(val);

    output.textContent = val || 'Dành cho Fan của nghệ sĩ ❤ Sơn Tùng M-TP ❤';
  }

  function textreset() {
    if (btn.textContent === 'Sao chép vào Clipboard') return;
    btn.textContent = 'Sao chép vào Clipboard';
    btn.removeAttribute('style');
  }

  function timereset() {
    copytimeout = setTimeout(function() {
      textreset();
    }, 3000);
  }


  var input = document.getElementById('input'),
    output = document.getElementById('output'),
    teen = document.getElementById('teencode'),
    model = document.getElementById('modelcode'),
    sky = document.getElementById('skycode'),
    btn = document.getElementById('copybtn'),
    clipboard = new Clipboard('#copybtn'),
    copytimeout;

  input.oninput = trans;
  model.onchange = trans;
  teen.onchange = trans;
  sky.onchange = trans;


  btn.onmouseout = function() {
    textreset();
    clearTimeout(copytimeout);
  };

  clipboard.on('success', function(e) {
    e.trigger.textContent = 'Đã chép vào Clipboard';
    e.trigger.style.color = '#4caf50';
    e.clearSelection();
    timereset();
  });

  clipboard.on('error', function(e) {
    e.trigger.textContent = 'Lỗi! Trình duyệt không hỗ trợ.';
    e.trigger.style.color = '#f44336';
    timereset();
  });

})();