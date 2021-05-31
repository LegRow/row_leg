import QRCode from "davidshimjs-qrcodejs";

document.addEventListener("turbolinks:load", function () {
  if (document.getElementById("qrcode")) {
    const Qrcode = document.getElementById("qrcode");
    const message = Qrcode.dataset.message;

    new QRCode(Qrcode, {
      text: message,
      width: 200,
      height: 200,
      colorDark: "#000",
      colorLight: "#fff",
      correctLevel: QRCode.CorrectLevel.H,
    });
  }
});
