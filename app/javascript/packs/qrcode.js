document.addEventListener('turbolinks:load', function(){

    const $qrcode = document.getElementById('qrcode');

    const message = $qrcode.dataset.message

    new QRCode($qrcode, {
      text: message,
      width: 128,
      height: 128,
      colorDark: '#000',
      colorLight: '#fff',
      correctLevel: QRCode.CorrectLevel.H
    })
})