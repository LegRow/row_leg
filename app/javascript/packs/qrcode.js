import QRCode from 'davidshimjs-qrcodejs'

document.addEventListener('turbolinks:load', function(){
  if (document.getElementById('qrcode')) {
  const $qrcode = document.getElementById('qrcode');
  const message = $qrcode.dataset.message;

  new QRCode($qrcode, {
    text: message,
    width: 128,
    height: 128,
    colorDark: "#000",
    colorLight: "#fff",
    correctLevel: QRCode.CorrectLevel.H,
  }
})
