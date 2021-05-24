document.addEventListener('turbolinks:load', function(){

    new QRCode(document.getElementById("qrcode"), "/qrcode?message=#{@target_url}");

   let qrcode = new QRCode(document.getElementById("qrcode"), {
      text: "/qrcode?message=#{@target_url}",
      width: 128,
      height: 128,
      colorDark: "#000000",
      colorLight: "#ffffff",
      correctLevel: QRCode.CorrectLevel.H
  });
})