import QRCode from 'davidshimjs-qrcodejs'

document.addEventListener('turbolinks:load', function(){

  const $qrcode = document.getElementById('qrcode');
  const message = $qrcode.dataset.message;

  new QRCode($qrcode, {
    text: message,
    width: 200,
    height: 200,
    colorDark: '#805300',
    colorLight: '#fff',
    correctLevel: QRCode.CorrectLevel.H
  });
})