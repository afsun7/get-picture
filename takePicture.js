var flag = true;
(function () {
  var width = 320; // We will scale the photo width to this
  var height = 0; // This will be computed based on the input stream
  var streaming = false;
  var video = null;
  var canvas = null;
  var startbutton = null;

  function startup() {
    video = document.getElementById("video");
    canvas = document.getElementById("canvas");
    startbutton = document.getElementById("startbutton");

    video.addEventListener(
      "canplay",
      function (ev) {
        if (!streaming) {
          height = video.videoHeight / (video.videoWidth / width);
          video.setAttribute("width", width);
          video.setAttribute("height", height);
          canvas.setAttribute("width", width);
          canvas.setAttribute("height", height);
          streaming = true;
        }
      },
      false
    );

    startbutton.addEventListener(
      "click",
      function (ev) {
        takepicture();
        ev.preventDefault();
      },
      false
    );
  }

  function takepicture() {
    var context = canvas.getContext("2d");

    if (flag) {
      canvas.width = width;
      canvas.height = height;
      context.drawImage(video, 0, 0, width, height);
      flag = false;
    }
  }

  window.addEventListener("load", startup, false);
})();

function loadCamera() {
  navigator.mediaDevices
    .getUserMedia({
      video: true,
      audio: false,
    })
    .then(function (stream) {
      video.srcObject = stream;
      video.play();
    })
    .catch(function (err) {
      console.log("An error occurred: " + err);
    });
}
function clearbtn() {
  flag = true;
  canvas = document.getElementById("canvas");
  var context = canvas.getContext("2d");
  context.fillStyle = "rgb(255, 221, 240)";
  context.fillRect(0, 0, canvas.width, canvas.height);
}
